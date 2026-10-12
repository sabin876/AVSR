import { useState, useEffect, useRef } from 'react';

/**
 * GlitchText – renders text that scrambles with random characters
 * then resolves letter-by-letter into the real text.
 *
 * Props:
 *  text        – the final string to display
 *  className   – additional Tailwind / CSS classes
 *  delay       – ms before the effect starts (default 0)
 *  duration    – total ms for the resolve sweep (default 1200)
 *  glitchChars – character pool to scramble from
 *  tag         – HTML tag to render as ('span' | 'h1' | 'p' …)
 *  loop        – if true, repeat glitch → resolve every `loopInterval` ms
 *  loopInterval – ms between loop iterations (default 6000)
 */
const DEFAULT_CHARS = '!<>-_\\/[]{}—=+*^?#........ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function GlitchText({
  text = '',
  className = '',
  delay = 0,
  duration = 1200,
  glitchChars = DEFAULT_CHARS,
  tag: Tag = 'span',
  loop = false,
  loopInterval = 6000,
}) {
  const [displayed, setDisplayed] = useState('');
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  const randomChar = () =>
    glitchChars[Math.floor(Math.random() * glitchChars.length)];

  const runGlitch = (startDelay = 0) => {
    // Phase 1: fill with scrambled characters immediately
    const scrambled = text.split('').map((c) => (c === ' ' ? ' ' : randomChar())).join('');
    setDisplayed(scrambled);

    const delayTimer = setTimeout(() => {
      startTimeRef.current = performance.now();

      const tick = (now) => {
        const elapsed = now - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);
        // Resolve left-to-right: chars before resolvedCount are locked in
        const resolvedCount = Math.floor(progress * text.length);

        const next = text
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' ';
            if (i < resolvedCount) return c;
            // Unresolved: scramble with decaying probability
            return Math.random() < 0.35 + 0.6 * progress ? randomChar() : c;
          })
          .join('');

        setDisplayed(next);

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayed(text); // lock final resolved text
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    }, startDelay);

    return delayTimer;
  };

  useEffect(() => {
    let initialTimer;
    let loopTimer;

    initialTimer = setTimeout(() => {
      runGlitch(0);

      if (loop) {
        loopTimer = setInterval(() => {
          if (frameRef.current) cancelAnimationFrame(frameRef.current);
          runGlitch(0);
        }, loopInterval);
      }
    }, delay);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopTimer);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, duration, loop, loopInterval]);

  return (
    <Tag
      className={`font-mono tracking-tighter select-none ${className}`}
      aria-label={text}
    >
      {displayed || text}
    </Tag>
  );
}

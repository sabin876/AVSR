import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronRight, Repeat } from 'lucide-react';
import { HERO_REELS } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import PhotoViewfinderCard from './PhotoViewfinderCard';
import GlitchText from './GlitchText';

const CRICKET_VIDEO = '/videos/cricket.mp4';
const HERO_VIDEO = '/videos/hero.MP4';

/**
 * GlitchScanLines – a purely decorative overlay rendered over the headline.
 * Shows brief RGB-offset horizontal bars that flash twice on mount then disappear.
 */
function GlitchScanLines() {
  const [active, setActive] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // First glitch flash
    const t1 = setTimeout(() => setActive(true), 400);
    const t2 = setTimeout(() => setActive(false), 580);
    // Second glitch flash
    const t3 = setTimeout(() => setActive(true), 1100);
    const t4 = setTimeout(() => setActive(false), 1250);
    // Hide permanently
    const t5 = setTimeout(() => setShow(false), 2000);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-10 overflow-hidden transition-opacity duration-150 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* RGB channel offset bars */}
      <div
        className="absolute left-0 right-0 h-[3px] bg-[#ff0000] mix-blend-screen"
        style={{ top: '18%', transform: 'translateX(-6px)', opacity: 0.7 }}
      />
      <div
        className="absolute left-0 right-0 h-[2px] bg-[#00ffff] mix-blend-screen"
        style={{ top: '24%', transform: 'translateX(8px)', opacity: 0.6 }}
      />
      <div
        className="absolute left-0 right-0 h-[4px] bg-[#ffffff]"
        style={{ top: '55%', opacity: 0.08 }}
      />
      <div
        className="absolute left-0 right-0 h-[2px] bg-[#00ff00] mix-blend-screen"
        style={{ top: '68%', transform: 'translateX(-4px)', opacity: 0.4 }}
      />
      {/* Full-width pixel noise strip */}
      <div
        className="absolute left-0 right-0 h-[6px] bg-[#e6b980]"
        style={{ top: '38%', opacity: 0.12 }}
      />
    </div>
  );
}

export default function Hero({ onExploreWork, onBookShoot }) {
  // 0: cricket.mp4, 1: hero.MP4
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const video0Ref = useRef(null); // cricket.mp4
  const video1Ref = useRef(null); // hero.MP4

  const activeReel = HERO_REELS[activeReelIndex] || HERO_REELS[0] || {};

  // Helper to reliably play a video element with browser policy fallbacks
  const safePlay = useCallback((vid) => {
    if (!vid) return;
    vid.defaultMuted = true;
    vid.muted = isMuted;
    const promise = vid.play();
    if (promise !== undefined) {
      promise.catch(() => {
        // Fallback: strictly force mute and try again
        vid.muted = true;
        vid.play().catch(() => {});
      });
    }
  }, [isMuted]);

  // Switch between reels with smooth crossfade
  const switchReel = useCallback((newIndex) => {
    sounds.playWhoosh();
    setActiveReelIndex(newIndex);
    setIsPlaying(true);

    const activeVid = newIndex === 0 ? video0Ref.current : video1Ref.current;
    const inactiveVid = newIndex === 0 ? video1Ref.current : video0Ref.current;

    if (inactiveVid) {
      inactiveVid.pause();
    }

    if (activeVid) {
      activeVid.currentTime = 0;
      safePlay(activeVid);
    }
  }, [safePlay]);

  // Synchronize playback and mute state when active reel or mute toggles
  useEffect(() => {
    const activeVid = activeReelIndex === 0 ? video0Ref.current : video1Ref.current;
    const inactiveVid = activeReelIndex === 0 ? video1Ref.current : video0Ref.current;

    if (inactiveVid) {
      inactiveVid.muted = true;
      inactiveVid.pause();
    }

    if (activeVid) {
      activeVid.muted = isMuted;
      if (isPlaying) {
        safePlay(activeVid);
      } else {
        activeVid.pause();
      }
    }
  }, [activeReelIndex, isMuted, isPlaying, safePlay]);

  // Initial mount: ensure immediate autoplay
  useEffect(() => {
    const v0 = video0Ref.current;
    if (v0) {
      v0.defaultMuted = true;
      v0.muted = true;
      safePlay(v0);
    }

    // Also preload video1 so it is ready for instant seamless transition
    const v1 = video1Ref.current;
    if (v1) {
      v1.defaultMuted = true;
      v1.muted = true;
      v1.load();
    }
  }, [safePlay]);

  // Unconditional user gesture listener: if browser blocks initial autoplay before interaction,
  // the first click, touch, or scroll unlocks and autoplays immediately
  useEffect(() => {
    const handleFirstGesture = () => {
      const activeVid = activeReelIndex === 0 ? video0Ref.current : video1Ref.current;
      if (activeVid && activeVid.paused) {
        safePlay(activeVid);
      }
    };

    window.addEventListener('click', handleFirstGesture, { passive: true });
    window.addEventListener('touchstart', handleFirstGesture, { passive: true });
    window.addEventListener('scroll', handleFirstGesture, { passive: true });
    window.addEventListener('pointerdown', handleFirstGesture, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('pointerdown', handleFirstGesture);
    };
  }, [activeReelIndex, safePlay]);

  // Timeupdate handler: smoothly switch when video reaches near the end
  const handleTimeUpdate = (e, index) => {
    if (index !== activeReelIndex) return;
    const vid = e.currentTarget;
    if (vid.duration && vid.currentTime >= vid.duration - 0.3) {
      const nextIndex = index === 0 ? 1 : 0;
      switchReel(nextIndex);
    }
  };

  const handleVideoError = () => {
    // If a video fails to play, smoothly advance to the next reel in the sequence
    const nextIndex = (activeReelIndex + 1) % HERO_REELS.length;
    switchReel(nextIndex);
  };

  const togglePlay = () => {
    sounds.playClick();
    const activeVid = activeReelIndex === 0 ? video0Ref.current : video1Ref.current;
    if (activeVid) {
      if (isPlaying) {
        activeVid.pause();
        setIsPlaying(false);
      } else {
        safePlay(activeVid);
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    sounds.playClick();
    const newMute = !isMuted;
    setIsMuted(newMute);
    const activeVid = activeReelIndex === 0 ? video0Ref.current : video1Ref.current;
    if (activeVid) {
      activeVid.muted = newMute;
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0a0a0a]">
      {/* =========================================================================
          DUAL BACKGROUND VIDEOS: cricket.mp4 and hero.MP4 (Looping & Crossfading)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Video 1: cricket.mp4 */}
        <video
          ref={(el) => {
            if (el) {
              el.defaultMuted = true;
              el.muted = isMuted || activeReelIndex !== 0;
            }
            video0Ref.current = el;
          }}
          src={CRICKET_VIDEO}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out transform-gpu ${
            activeReelIndex === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
          preload="auto"
          autoPlay
          muted={isMuted}
          playsInline
          onError={handleVideoError}
          onTimeUpdate={(e) => handleTimeUpdate(e, 0)}
          onEnded={() => switchReel(1)}
        />

        {/* Video 2: hero.MP4 */}
        <video
          ref={(el) => {
            if (el) {
              el.defaultMuted = true;
              el.muted = isMuted || activeReelIndex !== 1;
            }
            video1Ref.current = el;
          }}
          src={HERO_VIDEO}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out transform-gpu ${
            activeReelIndex === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
          preload="auto"
          autoPlay
          muted
          playsInline
          onTimeUpdate={(e) => handleTimeUpdate(e, 1)}
          onEnded={() => switchReel(0)}
        />

        {/* Cinematic Vignette & Ambient Gradient Overlays */}
        <div className="absolute inset-0 z-20 bg-black/30 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-[#0a0a0a]/50 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-radial-vignette opacity-60 pointer-events-none" />
      </div>

      {/* Top Spacer for Navbar */}
      <div className="h-24 sm:h-28" />

      {/* Hero Content Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Brand & CTAs */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Hero Tagline and Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="relative"
            >
              {/* Cinematic scan-line glitch overlay — purely decorative, flashes twice then stops */}
              <GlitchScanLines />

              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase">
                <GlitchText
                  text="Capturing Moments,"
                  tag="span"
                  delay={200}
                  duration={1000}
                  loop={true}
                  loopInterval={8000}
                  className="block text-white !font-display !text-4xl !sm:text-6xl !md:text-7xl !font-black !tracking-tight !uppercase !leading-[1.05]"
                />
                <br />
                <span className="bg-gradient-to-r from-white via-[#f5e6d3] to-[#e6b980] bg-clip-text text-transparent italic font-serif">
                  <GlitchText
                    text="Creating Legends."
                    tag="span"
                    delay={900}
                    duration={1100}
                    loop={true}
                    loopInterval={10000}
                    glitchChars="!<>-_\/[]{}—=+*^?#.•◆▪▸◈░▓█CREATINGLEGENDS"
                    className="bg-gradient-to-r from-white via-[#f5e6d3] to-[#e6b980] bg-clip-text text-transparent italic !font-serif !font-black !tracking-tight !uppercase !leading-[1.05]"
                  />
                </span>
              </h1>

              <p className="mt-6 text-sm sm:text-base md:text-lg text-neutral-300 max-w-xl font-light leading-relaxed">
                Elite visual storytelling by AVSR Vision. From high-impact brand commercials to intimate heirloom wedding films and cinematic aerials—crafted with precision optics and master color science.
              </p>
            </motion.div>

            {/* Call to Actions & Media Controls */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              {/* Primary CTA */}
              <button
                onClick={() => {
                  sounds.playWhoosh();
                  if (onExploreWork) onExploreWork();
                  else {
                    document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="group relative px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-black bg-gradient-to-r from-[#e6b980] via-[#f59e0b] to-[#e6b980] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_35px_rgba(230,185,128,0.4)] hover:shadow-[0_0_50px_rgba(230,185,128,0.7)] active:scale-95 flex items-center gap-2.5"
                data-cursor="EXPLORE"
              >
                <span>View Our Work</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => {
                  sounds.playShutter();
                  if (onBookShoot) onBookShoot();
                  else {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-[0.18em] text-white bg-white/[0.05] border border-white/20 hover:border-[#e6b980] hover:bg-white/[0.1] backdrop-blur-md transition-all duration-300 active:scale-95"
                data-cursor="BOOK"
              >
                Book a Shoot
              </button>

              {/* Video Reel Controls (Play/Pause & Mute/Unmute) */}
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                  title={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
                  data-cursor="PLAY"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#e6b980]" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                  title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                  data-cursor={isMuted ? 'SOUND' : 'MUTE'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#e6b980]" />}
                </button>
                <div className="hidden sm:block px-2.5 text-[10px] font-mono text-neutral-400 border-l border-white/10">
                  {activeReelIndex === 0 ? 'cricket.mp4 • 4K 120fps' : 'hero.MP4 • 8K Master'}
                </div>
              </div>
            </motion.div>

            {/* Background Looping Videos Switcher & Status Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <div className="px-3.5 py-1.5 rounded-xl bg-black/80 border border-[#e6b980]/40 text-white shadow-[0_0_20px_rgba(230,185,128,0.2)] flex items-center gap-2 text-xs font-mono backdrop-blur-md">
                <Repeat className="w-3.5 h-3.5 text-[#e6b980] animate-spin" style={{ animationDuration: '6s' }} />
                <span className="text-[#e6b980] font-bold">AUTO-LOOP:</span>
                <span className="text-neutral-200">
                  {activeReelIndex === 0 ? 'cricket.mp4' : 'hero.MP4'}
                </span>
                <span className="text-[10px] text-neutral-400">
                  ({activeReelIndex === 0 ? 'Up next: hero.MP4' : 'Up next: cricket.mp4'})
                </span>
              </div>

              {/* Interactive Video Switcher Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-black/60 border border-white/10 rounded-xl backdrop-blur-md text-[11px] font-mono">
                <button
                  onClick={() => switchReel(0)}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeReelIndex === 0
                      ? 'bg-[#e6b980] text-black font-bold shadow-[0_0_15px_rgba(230,185,128,0.5)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeReelIndex === 0 ? 'bg-black' : 'bg-neutral-500'}`} />
                  <span>cricket.mp4</span>
                </button>
                <button
                  onClick={() => switchReel(1)}
                  className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
                    activeReelIndex === 1
                      ? 'bg-[#e6b980] text-black font-bold shadow-[0_0_15px_rgba(230,185,128,0.5)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeReelIndex === 1 ? 'bg-black' : 'bg-neutral-500'}`} />
                  <span>hero.MP4</span>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Unique Interactive Photo & Stills Viewfinder Showcase */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <PhotoViewfinderCard 
              onBookShoot={onBookShoot} 
              activeReelIndex={activeReelIndex}
              onSelectReel={switchReel}
              reels={HERO_REELS}
            />
          </div>
        </div>
      </div>

      {/* Bottom Live Metrics & Award Ticker Bar */}
      <div className="relative z-30 w-full border-t border-white/[0.08] bg-black/70 backdrop-blur-xl py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:border-r border-white/10 pr-4">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                140+
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 mt-0.5">
                Films & Commercials
              </span>
            </div>

            <div className="flex flex-col md:border-r border-white/10 pr-4">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#e6b980] tracking-tight">
                12
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 mt-0.5">
                International Cinema Awards
              </span>
            </div>

            <div className="flex flex-col md:border-r border-white/10 pr-4">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                99.8%
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 mt-0.5">
                Five-Star Client Rating
              </span>
            </div>

            <div className="flex flex-col pl-0 md:pl-2">
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                8K RAW
              </span>
              <span className="text-[11px] uppercase tracking-wider text-neutral-400 mt-0.5">
                Cinema Deliverables
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

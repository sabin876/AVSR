import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    setIsVisible(true);

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if hovering over an element with data-cursor attribute
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const val = target.getAttribute('data-cursor');
        setCursorText(val || '');
        setCursorVariant(val ? 'text' : 'hover');
      } else if (e.target.closest('button, a, input, select, textarea, [role="button"]')) {
        setCursorText('');
        setCursorVariant('hover');
      } else {
        setCursorText('');
        setCursorVariant('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: '#e6b980',
      border: '1px solid #e6b980',
      transition: { type: 'spring', damping: 28, stiffness: 400, mass: 0.1 }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: 'rgba(230, 185, 128, 0.15)',
      border: '1.5px solid #e6b980',
      transition: { type: 'spring', damping: 24, stiffness: 350, mass: 0.1 }
    },
    text: {
      x: mousePosition.x - 42,
      y: mousePosition.y - 42,
      width: 84,
      height: 84,
      backgroundColor: '#e6b980',
      border: '2px solid #ffffff',
      transition: { type: 'spring', damping: 22, stiffness: 320, mass: 0.1 }
    }
  };

  return (
    <>
      {/* Outer reactive ring / label */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full flex items-center justify-center text-[10px] font-bold uppercase tracking-wider text-black select-none shadow-2xl backdrop-blur-[1px]"
        variants={variants}
        animate={cursorVariant}
      >
        {cursorText && <span>{cursorText}</span>}
      </motion.div>

      {/* Tiny center follower dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-white select-none shadow-sm"
        animate={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
          opacity: cursorVariant === 'text' ? 0 : 0.9
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 600, mass: 0.05 }}
      />
    </>
  );
}

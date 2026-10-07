import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e6b980] via-[#f59e0b] to-[#e6b980] origin-left z-[100] shadow-[0_0_12px_rgba(230,185,128,0.8)]"
      style={{ scaleX }}
    />
  );
}

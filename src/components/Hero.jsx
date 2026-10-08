import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronRight, Sparkles, ArrowUpRight, ExternalLink } from 'lucide-react';
import { HERO_REELS } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import logoImg from '../assets/logo.png';
import PhotoViewfinderCard from './PhotoViewfinderCard';

export default function Hero({ onExploreWork, onBookShoot }) {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const activeReel = HERO_REELS[activeReelIndex] || HERO_REELS[0] || {};

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }
  }, [activeReelIndex]);

  const togglePlay = () => {
    sounds.playClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    sounds.playClick();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const lastSwitchTimeRef = useRef(0);

  const switchReel = (index) => {
    const now = Date.now();
    if (now - lastSwitchTimeRef.current < 500) return;
    lastSwitchTimeRef.current = now;
    sounds.playWhoosh();
    setActiveReelIndex(index);
    setIsPlaying(true);
  };

  const handleVideoEnded = () => {
    const nextIndex = (activeReelIndex + 1) % HERO_REELS.length;
    switchReel(nextIndex);
  };

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0a0a0a]">
      {/* Background Video Reel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          key={activeReel?.videoUrl || activeReel?.id || 'reel-master'}
          className="w-full h-full object-cover transform-gpu"
          preload="auto"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={activeReel?.poster}
          onEnded={handleVideoEnded}
        >
          <source src={activeReel?.videoUrl || '/videos/IMG_5914.mp4'} type="video/mp4" />
        </video>

        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/35 to-[#0a0a0a]/50 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none" />
      </div>

      {/* Top Spacer for Navbar */}
      <div className="h-24 sm:h-28" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headline, Brand & CTAs */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Official Brand Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3.5 px-4 py-2 rounded-2xl bg-black/80 border border-[#e6b980]/40 backdrop-blur-md mb-6 w-fit shadow-[0_0_25px_rgba(230,185,128,0.2)]"
            >
              <img src={logoImg} alt="AVSR Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 filter contrast-110 drop-shadow" />
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-extrabold text-white">
                  AVSR VISION
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#e6b980] font-medium">
                  We Frame Moments, We Tell Stories
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#e6b980] animate-ping ml-1" />
            </motion.div>

            {/* Hero Tagline and Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.05] uppercase">
                Capturing Moments, <br />
                <span className="bg-gradient-to-r from-white via-[#f5e6d3] to-[#e6b980] bg-clip-text text-transparent italic font-serif">
                  Creating Legends.
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

              {/* Video Reel Controls */}
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/60 border border-white/10 backdrop-blur-md">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                  title={isPlaying ? 'Pause Reel' : 'Play Reel'}
                  data-cursor="PLAY"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#e6b980]" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                  title={isMuted ? 'Unmute Reel Audio' : 'Mute Reel Audio'}
                  data-cursor={isMuted ? 'SOUND' : 'MUTE'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#e6b980]" />}
                </button>
                <div className="hidden sm:block px-2.5 text-[10px] font-mono text-neutral-400 border-l border-white/10">
                  {activeReel?.stats || '8K Master • Directed by AVSR'}
                </div>
              </div>
            </motion.div>

            {/* Signature Reel Feature Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mt-8 flex items-center gap-3"
            >
              <div className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-[#e6b980]/40 text-white shadow-[0_0_20px_rgba(230,185,128,0.2)] flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#e6b980] animate-pulse" />
                <span className="text-[#e6b980] font-bold">MASTER REEL:</span>
                <span className="text-neutral-200">IMG_5914.mp4 (8K Cinema Master)</span>
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
      <div className="relative z-10 w-full border-t border-white/[0.08] bg-black/70 backdrop-blur-xl py-5">
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

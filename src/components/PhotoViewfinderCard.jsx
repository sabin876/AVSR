import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Maximize2, 
  Focus, 
  Zap, 
  X,
  Layers,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Play,
  Pause
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

// Default reels matching hero background videos
const DEFAULT_STILLS = [
  {
    id: 'reel-img5914',
    title: 'AVSR Master Reel (IMG_5914)',
    subtitle: 'Signature Narrative & Commercial Film',
    genre: 'Master Cinema Reel',
    badge: 'IMG_5914 • 8K Master',
    camera: 'RED V-Raptor 8K VV',
    lens: 'Cooke 50mm Anamorphic /i',
    settings: {
      shutter: '1/48s',
      aperture: 'T2.0',
      iso: 'ISO 800',
      kelvin: '5600K',
      format: '8K DCI RAW'
    },
    location: 'AVSR Vision Studio',
    video: '/videos/IMG_5914.mp4',
    videoUrl: '/videos/IMG_5914.mp4',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=85',
    poster: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1920&q=80',
    colorPalette: ['#1c1917', '#e6b980', '#d97706', '#44403c'],
    accentColor: '#e6b980'
  },
  {
    id: 'reel-cricket',
    title: 'Cricket Cinema Reel',
    subtitle: 'High-Speed Action & Sports Cinematography',
    genre: 'Sports Action Cinema',
    badge: 'cricket.mp4 • 4K RAW',
    camera: 'Sony FX6 Cinema Line',
    lens: 'Sony FE 200-600mm f/5.6-6.3 G OSS',
    settings: {
      shutter: '1/2000s',
      aperture: 'f/5.6',
      iso: 'ISO 500',
      kelvin: '5600K',
      format: '4K DCI 120fps'
    },
    location: 'International Cricket Stadium',
    video: '/videos/cricket.mp4',
    videoUrl: '/videos/cricket.mp4',
    image: 'https://images.unsplash.com/photo-1531415074868-836332ff4296?auto=format&fit=crop&w=1200&q=85',
    poster: 'https://images.unsplash.com/photo-1531415074868-836332ff4296?auto=format&fit=crop&w=1920&q=80',
    colorPalette: ['#064e3b', '#10b981', '#34d399', '#022c22'],
    accentColor: '#10b981'
  }
];

export default function PhotoViewfinderCard({ 
  onBookShoot, 
  activeReelIndex, 
  onSelectReel, 
  reels 
}) {
  const stillsList = reels || DEFAULT_STILLS;
  const [internalIndex, setInternalIndex] = useState(0);

  const currentIndex = typeof activeReelIndex === 'number' ? activeReelIndex : internalIndex;
  const currentStill = stillsList[currentIndex] || stillsList[0];

  const [isRawLog, setIsRawLog] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [shotCount, setShotCount] = useState(142);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const timecodeDisplayRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  // Auto-play when active video changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false);
      });
    }
  }, [currentIndex]);

  // Zero-rerender DOM text update for buttery smooth 60fps video playback
  const handleTimeUpdate = () => {
    if (!videoRef.current || !timecodeDisplayRef.current) return;
    const current = videoRef.current.currentTime || 0;
    const mins = String(Math.floor(current / 60)).padStart(2, '0');
    const secs = String(Math.floor(current % 60)).padStart(2, '0');
    const frames = String(Math.floor((current % 1) * 24)).padStart(2, '0');
    timecodeDisplayRef.current.textContent = `00:${mins}:${secs}:${frames}`;
  };

  const handleVideoEnded = () => {
    if (onSelectReel) {
      onSelectReel((currentIndex + 1) % stillsList.length);
    } else {
      nextStill();
    }
  };

  const togglePlayPause = () => {
    sounds.playClick();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    sounds.playClick();
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const triggerShutter = () => {
    sounds.playShutter();
    setIsFlashing(true);
    setShotCount((prev) => prev + 1);
    setTimeout(() => {
      setIsFlashing(false);
    }, 140);
  };

  const selectStill = (index) => {
    sounds.playClick();
    if (onSelectReel) {
      onSelectReel(index);
    } else {
      setInternalIndex(index);
    }
    sounds.playShutter();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 90);
  };

  const nextStill = () => {
    selectStill((currentIndex + 1) % stillsList.length);
  };

  const prevStill = () => {
    selectStill((currentIndex - 1 + stillsList.length) % stillsList.length);
  };

  return (
    <>
      <div className="relative w-full max-w-[440px] mx-auto select-none">
        {/* Glow ambient background aura */}
        <div 
          className="absolute -inset-2.5 rounded-[32px] opacity-40 blur-2xl transition-colors duration-1000 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${currentStill.accentColor || '#e6b980'}33 0%, transparent 70%)` }}
        />

        {/* Director's Viewfinder Monitor Chassis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#18181b] via-[#111113] to-[#09090b] border border-[#e6b980]/35 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
        >
          {/* Top Camera Monitor Hardware Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/90 border-b border-white/[0.08] text-[10px] font-mono tracking-wider">
            {/* Left: Tally & Live Telemetry */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold tracking-widest text-[9px]">REC LIVE</span>
              </div>
              <span ref={timecodeDisplayRef} className="text-neutral-300 font-mono text-[10px] hidden sm:inline">00:00:00:00</span>
            </div>

            {/* Center: Camera Model */}
            <div className="flex items-center gap-1.5 text-neutral-300 font-sans text-[11px] font-medium">
              <Camera className="w-3.5 h-3.5 text-[#e6b980]" />
              <span className="truncate max-w-[130px] sm:max-w-none">{currentStill.camera || 'RED V-Raptor 8K'}</span>
            </div>

            {/* Right: Format Indicator & Maximize */}
            <div className="flex items-center gap-2">
              <span className="text-[#e6b980] font-bold text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#e6b980]/10 border border-[#e6b980]/20">
                4K RAW
              </span>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Fullscreen Video Playback"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Viewfinder Screen Display */}
          <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-black group">
            {/* High-Performance Direct Video Player */}
            <video
              ref={videoRef}
              key={currentStill.video || currentStill.videoUrl || currentStill.id}
              src={currentStill.video || currentStill.videoUrl}
              poster={currentStill.image || currentStill.poster}
              autoPlay
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover transform-gpu"
            />

            {/* RAW Log / Graded Overlay (Zero shader pass on video) */}
            {isRawLog && (
              <div className="absolute inset-0 bg-[#dedede]/15 mix-blend-color pointer-events-none" />
            )}

            {/* Real Optical Shutter Flash Overlay */}
            {isFlashing && (
              <motion.div 
                initial={{ opacity: 0.95 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="absolute inset-0 bg-white pointer-events-none z-30"
              />
            )}

            {/* Vignette & Anamorphic Grading Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

            {/* 35mm Rule-of-Thirds Grid Overlay */}
            {showGrid && (
              <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-3 grid-rows-3 opacity-20">
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-b border-white" />
                <div className="border-r border-b border-white" />
                <div />
              </div>
            )}

            {/* Camera Viewfinder Reticle Framing Brackets */}
            <div className="absolute inset-4 pointer-events-none z-10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-5 h-5 border-t-2 border-l-2 border-[#e6b980]/80 rounded-tl-sm" />
                <div className="w-5 h-5 border-t-2 border-r-2 border-[#e6b980]/80 rounded-tr-sm" />
              </div>
              <div className="flex justify-between items-end">
                <div className="w-5 h-5 border-b-2 border-l-2 border-[#e6b980]/80 rounded-bl-sm" />
                <div className="w-5 h-5 border-b-2 border-r-2 border-[#e6b980]/80 rounded-br-sm" />
              </div>
            </div>

            {/* Center Autofocus Reticle [ + ] */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div 
                animate={{ scale: [1, 1.06, 1], opacity: [0.65, 0.9, 0.65] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-lg border border-dashed border-[#e6b980]/70 flex items-center justify-center relative">
                  <div className="w-2.5 h-[1.5px] bg-[#e6b980]" />
                  <div className="h-2.5 w-[1.5px] bg-[#e6b980] absolute" />
                </div>
                <span className="text-[9px] font-mono text-[#e6b980] tracking-widest bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  AF-LOCK • CINEMA 24FPS
                </span>
              </motion.div>
            </div>

            {/* Top Overlay Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/75 border border-white/15 text-[10px] font-semibold tracking-wider uppercase text-white backdrop-blur-md">
                {currentStill.genre || 'Cinematic Film'}
              </span>

              {/* RAW vs Graded Badge Indicator */}
              <div className="px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[9px] font-mono text-neutral-300 backdrop-blur-md">
                {isRawLog ? 'RAW LOG PROFILE' : 'AVSR 35MM PRINT'}
              </div>
            </div>

            {/* Navigation Arrows on Hover */}
            <div className="absolute inset-y-0 left-2 flex items-center z-20">
              <button
                onClick={(e) => { e.stopPropagation(); prevStill(); }}
                className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white/80 hover:text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
                title="Previous Video"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center z-20">
              <button
                onClick={(e) => { e.stopPropagation(); nextStill(); }}
                className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white/80 hover:text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                title="Next Video"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom In-Screen Metadata HUD */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-1.5">
              <div className="p-2.5 rounded-xl bg-black/80 border border-white/15 backdrop-blur-md text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm tracking-tight text-white drop-shadow">
                    {currentStill.title}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {/* Audio Mute/Unmute */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMute();
                      }}
                      className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-[#e6b980] transition-colors"
                      title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    {/* Play/Pause */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlayPause();
                      }}
                      className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title={isPlaying ? "Pause Video" : "Play Video"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                    <span className="text-[10px] text-[#e6b980] font-mono font-medium ml-1">
                      {currentStill.badge || '8K MASTER'}
                    </span>
                  </div>
                </div>
                
                {/* Camera Exif Telemetry row */}
                {currentStill.settings && (
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-mono text-neutral-300 border-t border-white/10 pt-1.5">
                    <span className="text-white font-semibold">{currentStill.lens || 'Cooke 50mm'}</span>
                    <span className="text-neutral-500">•</span>
                    <span>{currentStill.settings.shutter}</span>
                    <span className="text-neutral-500">•</span>
                    <span className="text-[#e6b980]">{currentStill.settings.aperture}</span>
                    <span className="text-neutral-500">•</span>
                    <span>{currentStill.settings.iso}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Control Console (RAW/Grade, Grid Toggle, Shutter Trigger) */}
          <div className="p-3 bg-[#111113] border-t border-white/[0.08] flex items-center justify-between gap-2">
            {/* RAW Log vs Graded Master Toggle */}
            <div className="flex items-center bg-black/60 rounded-xl p-0.5 border border-white/10 text-[10px] font-medium">
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsRawLog(false);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  !isRawLog 
                    ? 'bg-[#e6b980] text-black font-bold shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Hollywood Master Grade LUT"
              >
                Graded
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsRawLog(true);
                }}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  isRawLog 
                    ? 'bg-neutral-200 text-black font-bold shadow-sm' 
                    : 'text-neutral-400 hover:text-white'
                }`}
                title="Flat Unprocessed RAW Sensor Output"
              >
                RAW Log
              </button>
            </div>

            {/* Grid Guideline Switch */}
            <button
              onClick={() => {
                sounds.playClick();
                setShowGrid(!showGrid);
              }}
              className={`p-1.5 rounded-lg border text-[10px] transition-colors flex items-center gap-1 ${
                showGrid
                  ? 'bg-white/10 border-[#e6b980]/40 text-[#e6b980]'
                  : 'bg-black/40 border-white/10 text-neutral-400 hover:text-white'
              }`}
              title="Toggle Rule-of-Thirds Grid"
            >
              <Focus className="w-3.5 h-3.5" />
              <span className="text-[10px] hidden sm:inline">Grid</span>
            </button>

            {/* Physical Shutter Click Trigger */}
            <button
              onClick={triggerShutter}
              className="group px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-mono text-[10px] font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95 flex items-center gap-1.5"
              data-cursor="SNAP"
              title="Trigger Cinema Shutter"
            >
              <Zap className="w-3 h-3 text-yellow-300 group-hover:scale-110 transition-transform" />
              <span>Snap #{shotCount}</span>
            </button>
          </div>

          {/* 35mm Film Slide Thumbnails Contact Sheet */}
          <div className="p-3 bg-black/90 border-t border-white/[0.08]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#e6b980]" />
                Synchronized Reels ({stillsList.length})
              </span>
              <span className="text-[9px] font-mono text-neutral-500">
                0{currentIndex + 1} / 0{stillsList.length}
              </span>
            </div>

            {/* Video Thumbnails Grid */}
            <div className={`grid ${stillsList.length >= 5 ? 'grid-cols-5' : 'grid-cols-4'} gap-1.5`}>
              {stillsList.map((still, idx) => (
                <button
                  key={still.id}
                  onClick={() => selectStill(idx)}
                  className={`group relative rounded-xl overflow-hidden aspect-[4/3] border transition-all ${
                    currentIndex === idx
                      ? 'border-[#e6b980] ring-2 ring-[#e6b980]/40 scale-[1.03] shadow-[0_0_15px_rgba(230,185,128,0.3)]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img
                    src={still.image || still.poster}
                    alt={still.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Top-left Video Badge */}
                  <div className="absolute top-1 left-1 px-1 py-0.5 rounded bg-black/80 text-[7px] font-mono text-[#e6b980] font-bold flex items-center gap-0.5">
                    <Play className="w-2 h-2 fill-[#e6b980]" />
                    <span>PLAY</span>
                  </div>
                  {/* Sprocket frame number */}
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-mono font-bold text-white drop-shadow">
                    #{idx + 1}
                  </span>
                  {currentIndex === idx && (
                    <div className="absolute inset-0 bg-[#e6b980]/15 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Studio Guarantee Footer Banner */}
          <div className="px-4 py-2 bg-gradient-to-r from-black via-[#141414] to-black border-t border-white/[0.06] flex items-center justify-between text-[10px]">
            <span className="text-neutral-400 font-sans truncate">
              AVSR Vision Cinema Studio • 8K & Master Stills
            </span>
            <button
              onClick={() => {
                if (onBookShoot) onBookShoot();
                else document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[#e6b980] font-bold hover:underline flex items-center gap-0.5 shrink-0 ml-2"
            >
              <span>Book Shoot</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* High-Res Video Lightbox Inspection Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div 
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-0 right-0 sm:-top-12 sm:-right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Video Player */}
              <div className="relative rounded-2xl overflow-hidden border border-[#e6b980]/40 shadow-2xl max-h-[75vh] w-full bg-black flex items-center justify-center">
                <video
                  src={currentStill.video || currentStill.videoUrl}
                  poster={currentStill.image || currentStill.poster}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>

              {/* Photo Caption & Specs */}
              <div className="mt-4 text-center">
                <h4 className="font-display font-bold text-lg text-white">
                  {currentStill.title}
                </h4>
                {currentStill.settings && (
                  <p className="text-xs text-neutral-400 mt-1 font-mono">
                    {currentStill.camera} • {currentStill.lens} • {currentStill.settings.shutter} • {currentStill.settings.aperture} • {currentStill.settings.iso}
                  </p>
                )}
                <p className="text-[11px] text-[#e6b980] mt-0.5">
                  Location: {currentStill.location}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

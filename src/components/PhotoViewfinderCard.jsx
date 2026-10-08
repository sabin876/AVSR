import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Maximize2, 
  Focus, 
  Zap, 
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Film
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

const MASTER_REEL = {
  id: 'reel-img5914',
  title: 'AVSR Master Reel (IMG_5914)',
  fileLabel: 'IMG_5914.mp4',
  subtitle: 'Signature Narrative & Behind The Scenes Film',
  genre: '8K Master Cinema Reel',
  badge: 'IMG_5914 • 8K RAW',
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
  poster: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1920&q=80',
  accentColor: '#e6b980'
};

export default function PhotoViewfinderCard() {
  const reel = MASTER_REEL;
  const videoRef = useRef(null);
  const timecodeRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [isRawLog, setIsRawLog] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Guarantee autoplay & loop on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  // Live SMPTE timecode ticker without re-rendering React component
  const handleTimeUpdate = () => {
    if (!videoRef.current || !timecodeRef.current) return;
    const current = videoRef.current.currentTime || 0;
    const mins = String(Math.floor(current / 60)).padStart(2, '0');
    const secs = String(Math.floor(current % 60)).padStart(2, '0');
    const frames = String(Math.floor((current % 1) * 24)).padStart(2, '0');
    timecodeRef.current.textContent = `00:${mins}:${secs}:${frames}`;
  };

  const togglePlay = () => {
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
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
  };

  const triggerShutterFlash = () => {
    sounds.playShutter();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 140);
  };

  return (
    <>
      <div className="relative w-full max-w-[460px] mx-auto select-none">
        {/* Dynamic Warm Ambient Glow */}
        <div 
          className="absolute -inset-3 rounded-[34px] opacity-40 blur-2xl transition-all duration-1000 pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(230,185,128,0.35) 0%, transparent 70%)' 
          }}
        />

        {/* Master Cinema Viewfinder Chassis */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative rounded-[28px] overflow-hidden bg-gradient-to-b from-[#18181b] via-[#111113] to-[#09090b] border border-[#e6b980]/40 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
        >
          {/* Top Hardware Telemetry Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-black/90 border-b border-white/[0.08] text-[10px] font-mono tracking-wider">
            {/* Left: Tally & Live Timecode */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                <span className="font-bold tracking-widest text-[9px]">REC LIVE</span>
              </div>
              <span ref={timecodeRef} className="text-neutral-300 font-mono text-[10px] hidden sm:inline">
                00:00:00:00
              </span>
            </div>

            {/* Center: Camera Model */}
            <div className="flex items-center gap-1.5 text-neutral-300 font-sans text-[11px] font-medium truncate max-w-[150px]">
              <Camera className="w-3.5 h-3.5 text-[#e6b980] shrink-0" />
              <span className="truncate">{reel.camera}</span>
            </div>

            {/* Right: Format Badge & Maximize */}
            <div className="flex items-center gap-2">
              <span className="text-[#e6b980] font-bold text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#e6b980]/10 border border-[#e6b980]/20">
                8K RAW
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
            {/* Single Video Player Playing IMG_5914.mp4 in Continuous Loop */}
            <video
              ref={videoRef}
              src={reel.video || reel.videoUrl}
              poster={reel.poster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              className="w-full h-full object-cover transform-gpu"
            />

            {/* RAW Log / Graded Overlay */}
            {isRawLog && (
              <div className="absolute inset-0 bg-[#dedede]/15 mix-blend-color pointer-events-none" />
            )}

            {/* Optical Shutter Flash Overlay */}
            {isFlashing && (
              <motion.div 
                initial={{ opacity: 0.95 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="absolute inset-0 bg-white pointer-events-none z-30"
              />
            )}

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

            {/* 35mm Rule-of-Thirds Grid */}
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

            {/* Framing Reticle Corners */}
            <div className="absolute inset-3.5 pointer-events-none z-10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="w-5 h-5 border-t-2 border-l-2 border-[#e6b980]/80 rounded-tl-sm" />
                <div className="w-5 h-5 border-t-2 border-r-2 border-[#e6b980]/80 rounded-tr-sm" />
              </div>
              <div className="flex justify-between items-end">
                <div className="w-5 h-5 border-b-2 border-l-2 border-[#e6b980]/80 rounded-bl-sm" />
                <div className="w-5 h-5 border-b-2 border-r-2 border-[#e6b980]/80 rounded-br-sm" />
              </div>
            </div>

            {/* Center Focus Reticle */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], opacity: [0.65, 0.9, 0.65] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-11 h-11 rounded-lg border border-dashed border-[#e6b980]/70 flex items-center justify-center relative">
                  <div className="w-2.5 h-[1.5px] bg-[#e6b980]" />
                  <div className="h-2.5 w-[1.5px] bg-[#e6b980] absolute" />
                </div>
                <span className="text-[8px] font-mono text-[#e6b980] tracking-widest bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm">
                  8K DCI RAW • 24FPS
                </span>
              </motion.div>
            </div>

            {/* Top Reel Badge */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/80 border border-white/20 text-[10px] font-bold tracking-wider uppercase text-white backdrop-blur-md">
                IMG_5914.mp4
              </span>
              <span className="px-2 py-0.5 rounded bg-black/75 border border-[#e6b980]/30 text-[9px] font-mono font-bold text-[#e6b980] backdrop-blur-md">
                CONTINUOUS LOOP
              </span>
            </div>

            {/* Bottom In-Screen HUD */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-1.5">
              <div className="p-2.5 rounded-xl bg-black/85 border border-white/15 backdrop-blur-md text-white">
                <div className="flex items-center justify-between">
                  <div className="truncate pr-2">
                    <h4 className="font-display font-bold text-sm tracking-tight text-white drop-shadow truncate">
                      {reel.title}
                    </h4>
                    <p className="text-[10px] text-[#e6b980] font-mono truncate">
                      {reel.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Audio Mute/Unmute */}
                    <button
                      onClick={toggleMute}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[#e6b980] transition-colors"
                      title={isMuted ? "Unmute Audio" : "Mute Audio"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title={isPlaying ? "Pause Reel" : "Play Reel"}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                  </div>
                </div>

                {/* Camera Exif Telemetry row */}
                <div className="mt-1.5 flex flex-wrap items-center justify-between text-[10px] font-mono text-neutral-300 border-t border-white/10 pt-1.5">
                  <span className="text-white font-semibold truncate max-w-[140px]">{reel.lens}</span>
                  <span className="text-[#e6b980]">{reel.settings.aperture}</span>
                  <span>{reel.settings.shutter}</span>
                  <span>{reel.settings.iso}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Interactive Control Console */}
          <div className="p-3 bg-black/90 border-t border-white/[0.08] flex items-center justify-between gap-2">
            {/* RAW vs Graded Toggle */}
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
              >
                RAW Log
              </button>
            </div>

            {/* Grid Switch */}
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

            {/* Optical Shutter Click Trigger */}
            <button
              onClick={triggerShutterFlash}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-mono text-[10px] font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] active:scale-95 flex items-center gap-1.5"
              title="Trigger Cinema Shutter"
            >
              <Zap className="w-3 h-3 text-yellow-300" />
              <span>Snap</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* High-Res Video Lightbox Modal */}
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
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-0 right-0 sm:-top-12 sm:-right-2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative rounded-2xl overflow-hidden border border-[#e6b980]/40 shadow-2xl max-h-[75vh] w-full bg-black flex items-center justify-center">
                <video
                  src={reel.video || reel.videoUrl}
                  poster={reel.poster}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>

              <div className="mt-4 text-center">
                <h4 className="font-display font-bold text-lg text-white">
                  {reel.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  {reel.camera} • {reel.lens} • {reel.settings.shutter} • {reel.settings.aperture} • {reel.settings.format}
                </p>
                <p className="text-[11px] text-[#e6b980] mt-0.5">
                  File: {reel.fileLabel} • 8K Master Deliverable
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

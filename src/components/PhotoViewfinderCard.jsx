import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  Aperture, 
  Sliders, 
  Maximize2, 
  Sparkles, 
  Focus, 
  Zap, 
  Check, 
  Eye,
  X,
  Layers,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

// Curated high-end photography & photoshoot projects
const PHOTOSHOOT_STILLS = [
  {
    id: 'fashion-editorial',
    title: 'Haute Couture: Ethereal Shadows',
    genre: 'Editorial Portrait',
    badge: 'Vogue Milano Spread',
    camera: 'Hasselblad X2D 100C',
    lens: 'XCD 90V f/2.5 Prime',
    settings: {
      shutter: '1/250s',
      aperture: 'f/2.5',
      iso: 'ISO 64',
      kelvin: '5600K',
      format: '100MP 16-Bit RAW'
    },
    location: 'Studio Milano • Italy',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    colorPalette: ['#1c1917', '#e6b980', '#d97706', '#44403c'],
    accentColor: '#e6b980'
  },
  {
    id: 'auto-commercial',
    title: 'Porsche GT3 RS: Midnight Apex',
    genre: 'Commercial Motion & Stills',
    badge: 'Awwwards Feature',
    camera: 'RED V-Raptor 8K VV',
    lens: 'Cooke 50mm Anamorphic /i',
    settings: {
      shutter: '1/1000s',
      aperture: 'T2.3',
      iso: 'ISO 800',
      kelvin: '4200K',
      format: '8K DCI RAW 120fps'
    },
    location: 'Yas Marina Circuit • Abu Dhabi',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=85',
    colorPalette: ['#0f172a', '#38bdf8', '#0284c7', '#1e293b'],
    accentColor: '#38bdf8'
  },
  {
    id: 'lake-como-wedding',
    title: 'Lake Como Heirloom Romance',
    genre: 'Luxury Destination Wedding',
    badge: 'Harper’s Bazaar Weddings',
    camera: 'Leica M6 35mm + Sony FX6',
    lens: 'Summilux 35mm f/1.4 ASPH',
    settings: {
      shutter: '1/500s',
      aperture: 'f/1.4',
      iso: 'ISO 400',
      kelvin: 'Golden Hour',
      format: 'Kodak Portra 400 Film'
    },
    location: 'Villa d’Este • Lake Como',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    colorPalette: ['#1c1917', '#fde047', '#f59e0b', '#78350f'],
    accentColor: '#f59e0b'
  },
  {
    id: 'nordic-expedition',
    title: 'Nordic Solitude: Volcanic Glaciers',
    genre: 'Aerial Drone & Landscape',
    badge: 'NatGeo Expeditions',
    camera: 'DJI Inspire 3 (Zenmuse X9)',
    lens: 'DL 24mm F2.8 LS ASPH',
    settings: {
      shutter: '1/1600s',
      aperture: 'f/2.8',
      iso: 'ISO 100',
      kelvin: '5400K',
      format: '8K CinemaDNG RAW'
    },
    location: 'Vatnajökull Highlands • Iceland',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85',
    colorPalette: ['#0c4a6e', '#bae6fd', '#38bdf8', '#0369a1'],
    accentColor: '#38bdf8'
  }
];

export default function PhotoViewfinderCard({ onBookShoot }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRawLog, setIsRawLog] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [shotCount, setShotCount] = useState(142);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [timecode, setTimecode] = useState('01:24:32:14');

  const currentStill = PHOTOSHOOT_STILLS[currentIndex];

  // Dynamic live 24fps camera timecode simulation
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    }, 1000 / 24);
    return () => clearInterval(timer);
  }, []);

  const triggerShutter = () => {
    sounds.playShutter();
    setIsFlashing(true);
    setShotCount((prev) => prev + 1);
    setTimeout(() => {
      setIsFlashing(false);
    }, 140);
  };

  const selectStill = (index) => {
    if (index === currentIndex) return;
    sounds.playClick();
    setCurrentIndex(index);
    // Subtle shutter click on photo switch
    sounds.playShutter();
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 90);
  };

  const nextStill = () => {
    selectStill((currentIndex + 1) % PHOTOSHOOT_STILLS.length);
  };

  const prevStill = () => {
    selectStill((currentIndex - 1 + PHOTOSHOOT_STILLS.length) % PHOTOSHOOT_STILLS.length);
  };

  return (
    <>
      <div className="relative w-full max-w-[420px] mx-auto select-none">
        {/* Glow ambient background aura */}
        <div 
          className="absolute -inset-2.5 rounded-[32px] opacity-40 blur-2xl transition-colors duration-1000 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${currentStill.accentColor}33 0%, transparent 70%)` }}
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
                <span className="font-bold tracking-widest text-[9px]">LIVE STILLS</span>
              </div>
              <span className="text-neutral-400 hidden sm:inline">{timecode}</span>
            </div>

            {/* Center: Camera Model */}
            <div className="flex items-center gap-1.5 text-neutral-300 font-sans text-[11px] font-medium">
              <Camera className="w-3.5 h-3.5 text-[#e6b980]" />
              <span className="truncate max-w-[140px] sm:max-w-none">{currentStill.camera}</span>
            </div>

            {/* Right: Battery & Format Indicator */}
            <div className="flex items-center gap-2">
              <span className="text-[#e6b980] font-bold text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#e6b980]/10 border border-[#e6b980]/20">
                100MP RAW
              </span>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Inspect High-Res Photo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Main Viewfinder Screen Display */}
          <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-black group">
            {/* Photoshoot Image with Log/Graded Filter */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentStill.id}
                src={currentStill.image}
                alt={currentStill.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  filter: isRawLog 
                    ? 'saturate(0.4) contrast(0.85) brightness(1.1) sepia(0.08)' 
                    : 'saturate(1.15) contrast(1.08) brightness(0.96)'
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="w-full h-full object-cover transition-[filter] duration-500"
              />
            </AnimatePresence>

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
                <div className="border-r border-white" />
                <div className="border-r border-white" />
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
                  AF-LOCK • EYE DETECT
                </span>
              </motion.div>
            </div>

            {/* Top Overlay Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-black/75 border border-white/15 text-[10px] font-semibold tracking-wider uppercase text-white backdrop-blur-md">
                {currentStill.genre}
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
                title="Previous Still"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center z-20">
              <button
                onClick={(e) => { e.stopPropagation(); nextStill(); }}
                className="p-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 text-white/80 hover:text-white transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
                title="Next Still"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom In-Screen Metadata HUD */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-1.5">
              <div className="p-2.5 rounded-xl bg-black/75 border border-white/15 backdrop-blur-md text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm tracking-tight text-white drop-shadow">
                    {currentStill.title}
                  </h3>
                  <span className="text-[10px] text-[#e6b980] font-mono font-medium">
                    {currentStill.badge}
                  </span>
                </div>
                
                {/* Camera Exif Telemetry row */}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] font-mono text-neutral-300 border-t border-white/10 pt-1.5">
                  <span className="text-white font-semibold">{currentStill.lens}</span>
                  <span className="text-neutral-500">•</span>
                  <span>{currentStill.settings.shutter}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-[#e6b980]">{currentStill.settings.aperture}</span>
                  <span className="text-neutral-500">•</span>
                  <span>{currentStill.settings.iso}</span>
                </div>
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
              title="Trigger Camera Shutter"
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
                Shoot Contact Reel (35mm)
              </span>
              <span className="text-[9px] font-mono text-neutral-500">
                0{currentIndex + 1} / 0{PHOTOSHOOT_STILLS.length}
              </span>
            </div>

            {/* Film Slide Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {PHOTOSHOOT_STILLS.map((still, idx) => (
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
                    src={still.image}
                    alt={still.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
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
              AVSR Vision Stills Studio • 8K Cinema & 35mm
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

      {/* High-Res Photo Lightbox Inspection Modal */}
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

              {/* Lightbox Image */}
              <div className="relative rounded-2xl overflow-hidden border border-[#e6b980]/40 shadow-2xl max-h-[75vh]">
                <img
                  src={currentStill.image}
                  alt={currentStill.title}
                  className="w-full h-full object-contain max-h-[75vh]"
                />
              </div>

              {/* Photo Caption & Specs */}
              <div className="mt-4 text-center">
                <h4 className="font-display font-bold text-lg text-white">
                  {currentStill.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  {currentStill.camera} • {currentStill.lens} • {currentStill.settings.shutter} • {currentStill.settings.aperture} • {currentStill.settings.iso}
                </p>
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

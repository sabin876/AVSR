import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Camera, Award, Shield, Eye, ArrowUpRight,
  Layers, Compass, ZoomIn, X, Play, Pause, Volume2, VolumeX, Film
} from 'lucide-react';
import { PHILOSOPHY_PILLARS, TEAM_MEMBERS, BTS_GALLERY } from '../data/teamAndGearData';
import { sounds } from '../utils/soundEffects';

const btsVideoUrl = '/videos/cricket.mp4';
const FALLBACK_VIDEO = '/videos/cricket.mp4';

export default function AboutSection() {
  const [selectedBtsImage, setSelectedBtsImage] = useState(null);
  const [isBtsVideoMuted, setIsBtsVideoMuted] = useState(true);
  const [isBtsVideoPlaying, setIsBtsVideoPlaying] = useState(true);
  const btsVideoRef = useRef(null);

  const [btsVideoSrc, setBtsVideoSrc] = useState(btsVideoUrl);

  const handleBtsVideoError = () => {
    if (btsVideoSrc !== FALLBACK_VIDEO) {
      setBtsVideoSrc(FALLBACK_VIDEO);
    }
  };

  const toggleBtsPlay = () => {
    sounds.playClick();
    if (!btsVideoRef.current) return;
    if (btsVideoRef.current.paused) {
      btsVideoRef.current.play().then(() => setIsBtsVideoPlaying(true)).catch(() => {});
    } else {
      btsVideoRef.current.pause();
      setIsBtsVideoPlaying(false);
    }
  };

  const toggleBtsMute = () => {
    sounds.playClick();
    const nextMuted = !isBtsVideoMuted;
    setIsBtsVideoMuted(nextMuted);
    if (btsVideoRef.current) {
      btsVideoRef.current.muted = nextMuted;
    }
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Philosophy & Vision Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#e6b980] mb-3">
              <span className="w-6 h-[1.5px] bg-[#e6b980]" />
              <span>Our Philosophy</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              Visual Excellence <br />
              <span className="text-neutral-400 font-serif italic">Without Compromise.</span>
            </h2>
            <p className="mt-6 text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              AYUV Studios is an elite collective of directors, cinematographers, drone pilots, and master colorists. We reject generic templates in favor of bespoke visual identity that resonates with discerning audiences worldwide.
            </p>
            <div className="mt-8 flex items-center gap-6">
              <div>
                <span className="font-display text-2xl font-bold text-white block">10+</span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Years Active</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <span className="font-display text-2xl font-bold text-[#e6b980] block">24</span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Countries Filmed</span>
              </div>
              <div className="w-[1px] h-8 bg-white/10" />
              <div>
                <span className="font-display text-2xl font-bold text-white block">100%</span>
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">In-House Color</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PHILOSOPHY_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-2xl bg-[#121212] border border-white/[0.06] hover:border-[#e6b980]/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs text-[#e6b980] font-bold tracking-widest block mb-4">
                    {pillar.number}
                  </span>
                  <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-[#e6b980] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Creative Crew */}
        <div className="mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#e6b980] font-bold block mb-2">
                The Masterminds
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase">
                The Directors & Crew
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-md font-light">
              Seasoned industry pioneers with credentials in feature cinema, fashion covers, and extreme commercial aviation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className="group rounded-3xl overflow-hidden bg-gradient-to-b from-[#18181b] via-[#121214] to-[#0a0a0c] border border-white/[0.08] hover:border-[#e6b980]/50 transition-all shadow-xl hover:shadow-[0_20px_50px_rgba(230,185,128,0.15)]"
                data-cursor="DIRECTOR"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#e6b980] font-semibold block">
                      {member.role}
                    </span>
                    <h4 className="font-display text-xl font-bold text-white">
                      {member.name}
                    </h4>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="pt-3 border-t border-white/5 space-y-1 text-[11px] font-mono">
                    <div className="flex items-center justify-between text-neutral-300">
                      <span className="text-neutral-500">Gear:</span>
                      <span className="text-[#e6b980] truncate max-w-[150px]">{member.signatureGear}</span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-400">
                      <span className="text-neutral-500">Award:</span>
                      <span className="truncate max-w-[150px]">{member.awards}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visually Striking 'Behind the Scenes' Gallery */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#e6b980] font-bold block mb-2">
              On Set
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white uppercase">
              Behind The Scenes
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-light">
              Raw documentary moments from remote glaciers, high-speed night circuits, and private European villas.
            </p>
          </div>

          {/* Featured Behind The Scenes Video Card (IMG_5914.mp4) */}
          <div className="mb-10 max-w-4xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-b from-[#18181b] to-[#0c0c0e] border border-[#e6b980]/35 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* BTS Card Top Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-black/90 border-b border-white/[0.08] text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-950/80 border border-red-500/40 text-red-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  <span className="font-bold text-[9px]">BTS REC LIVE</span>
                </div>
                <span className="text-[#e6b980] font-bold text-[10px] hidden sm:inline">IMG_5914.MP4</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300 text-[10px] sm:text-[11px]">
                <Camera className="w-3.5 h-3.5 text-[#e6b980]" />
                <span className="truncate">RED V-Raptor 8K • Cooke 50mm Anamorphic</span>
              </div>
            </div>

            {/* BTS Video Player */}
            <div className="relative aspect-[16/9] w-full bg-black overflow-hidden group">
              <video
                ref={btsVideoRef}
                src={btsVideoSrc}
                poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1920&q=80"
                autoPlay
                loop
                muted={isBtsVideoMuted}
                playsInline
                onError={handleBtsVideoError}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

              {/* In-Video Telemetry & Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#e6b980]/20 text-[#e6b980] text-[9px] font-mono font-bold uppercase mb-1">
                    <Film className="w-2.5 h-2.5" />
                    <span>Featured On-Set BTS Footage</span>
                  </div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-white">
                    AVSR Master Production Reel (IMG_5914)
                  </h4>
                  <p className="text-xs text-neutral-300 font-light hidden sm:block">
                    Director's raw lens capturing live cinema rigging, precision lighting, and anamorphic optics.
                  </p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <button
                    onClick={toggleBtsMute}
                    className="p-2.5 rounded-xl bg-black/80 hover:bg-black border border-white/20 text-[#e6b980] backdrop-blur-md transition-colors shadow-lg"
                    title={isBtsVideoMuted ? "Unmute BTS Audio" : "Mute BTS Audio"}
                  >
                    {isBtsVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleBtsPlay}
                    className="p-2.5 rounded-xl bg-black/80 hover:bg-black border border-white/20 text-white backdrop-blur-md transition-colors shadow-lg"
                    title={isBtsVideoPlaying ? "Pause BTS Video" : "Play BTS Video"}
                  >
                    {isBtsVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BTS_GALLERY.map((bts) => (
              <div
                key={bts.id}
                onClick={() => {
                  sounds.playShutter();
                  setSelectedBtsImage(bts);
                }}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-neutral-900 border border-white/10 shadow-lg"
                data-cursor="BTS"
              >
                <img
                  src={bts.image}
                  alt={bts.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4 text-[#e6b980]" />
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono text-[#e6b980] block">
                    {bts.location}
                  </span>
                  <h4 className="font-display text-sm font-bold text-white leading-tight mt-0.5">
                    {bts.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox for BTS */}
        <AnimatePresence>
          {selectedBtsImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBtsImage(null)}
              className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[90vh] bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              >
                <button
                  onClick={() => setSelectedBtsImage(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:text-[#e6b980] z-10"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={selectedBtsImage.image}
                  alt={selectedBtsImage.title}
                  className="max-h-[75vh] w-full object-cover"
                />
                <div className="p-4 bg-black/90 border-t border-white/10">
                  <span className="text-xs font-mono text-[#e6b980]">{selectedBtsImage.location}</span>
                  <h4 className="font-display text-base font-bold text-white mt-0.5">{selectedBtsImage.title}</h4>
                  <p className="text-xs text-neutral-400 mt-1">{selectedBtsImage.caption}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Play, Pause, Volume2, VolumeX, Maximize2, Camera, Film,
  Sparkles, Calendar, Award, ChevronLeft, ChevronRight, CheckCircle2,
  Share2, ArrowUpRight
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function ProjectModal({ project, onClose, onBookShoot }) {
  const [activeTab, setActiveTab] = useState('video'); // 'video' | 'stills' | 'specs' | 'story'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00');
  const [durationStr, setDurationStr] = useState('00:00');
  const [copied, setCopied] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const curr = videoRef.current.currentTime;
      const dur = videoRef.current.duration || 1;
      setProgress((curr / dur) * 100);
      setCurrentTimeStr(formatTime(curr));
      setDurationStr(formatTime(dur));
    }
  };

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

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * videoRef.current.duration;
      setProgress(pos * 100);
    }
  };

  const handleFullscreen = () => {
    sounds.playClick();
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleShare = () => {
    sounds.playClick();
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0e0e0e] border border-white/10 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#141414]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#e6b980]/15 text-[#e6b980] border border-[#e6b980]/30">
                {project.categoryLabel}
              </span>
              <h3 className="font-display text-lg font-bold text-white truncate max-w-[280px] sm:max-w-md">
                {project.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Copy Project Link"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-[#e6b980]" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Lightbox"
                data-cursor="CLOSE"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 pb-1 border-b border-white/[0.05] bg-[#0e0e0e] text-xs font-mono uppercase tracking-wider">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('video');
              }}
              className={`pb-2 px-3 border-b-2 transition-all ${
                activeTab === 'video'
                  ? 'border-[#e6b980] text-white font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Cinematic Film
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('specs');
              }}
              className={`pb-2 px-3 border-b-2 transition-all ${
                activeTab === 'specs'
                  ? 'border-[#e6b980] text-white font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Camera & Specs
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('story');
              }}
              className={`pb-2 px-3 border-b-2 transition-all ${
                activeTab === 'story'
                  ? 'border-[#e6b980] text-white font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Production Story
            </button>
          </div>

          {/* Modal Body Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#0a0a0a]">
            {/* TAB 1: Cinematic Video Player */}
            {activeTab === 'video' && (
              <div className="flex flex-col gap-4">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 group shadow-2xl">
                  <video
                    ref={videoRef}
                    src={project.videoUrl}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                  />

                  {/* Custom Controls Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    {/* Scrubber Bar */}
                    <div
                      onClick={handleSeek}
                      className="w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer relative mb-3 transition-all"
                    >
                      <div
                        className="h-full bg-[#e6b980] rounded-full relative"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                    </div>

                    {/* Controls Row */}
                    <div className="flex items-center justify-between text-white text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <button onClick={togglePlay} className="p-1.5 hover:text-[#e6b980]">
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                        <button onClick={toggleMute} className="p-1.5 hover:text-[#e6b980]">
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <span>
                          {currentTimeStr} / {durationStr}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] bg-white/10 font-sans uppercase">
                          {project.format}
                        </span>
                        <button onClick={handleFullscreen} className="p-1.5 hover:text-[#e6b980]">
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Info bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div>
                    <h4 className="text-sm font-semibold text-white">{project.tagline}</h4>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Client: {project.client} • Location: {project.metadata?.location || 'Global'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      sounds.playShutter();
                      onClose();
                      if (onBookShoot) onBookShoot(project.category);
                    }}
                    className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#e6b980] hover:bg-[#f59e0b] shadow-lg flex items-center justify-center gap-2 self-start sm:self-auto"
                  >
                    <span>Commission Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: Camera & Equipment Specs */}
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#e6b980]">
                    <Camera className="w-4 h-4" />
                    <span>Camera Rig & Optics</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Primary System</span>
                      <span className="text-white font-medium">{project.cameraGear}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Cinema Format</span>
                      <span className="text-white font-medium">{project.format}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Target Aspect Ratio</span>
                      <span className="text-white font-medium">{project.aspectRatio}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Runtime / Length</span>
                      <span className="text-white font-medium">{project.runtime}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#e6b980]">
                    <Film className="w-4 h-4" />
                    <span>Crew & Post Production</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Director</span>
                      <span className="text-white font-medium">{project.director}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Director of Photography</span>
                      <span className="text-white font-medium">{project.dop}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Lead Colorist</span>
                      <span className="text-white font-medium">{project.colorist}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-neutral-400">Sound Master</span>
                      <span className="text-white font-medium">{project.metadata?.audioScore}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Production Story */}
            {activeTab === 'story' && (
              <div className="space-y-6 text-sm leading-relaxed text-neutral-300 max-w-3xl">
                <div>
                  <h4 className="text-base font-display font-bold text-white mb-2 uppercase tracking-wide">
                    Executive Overview
                  </h4>
                  <p className="font-light">{project.overview}</p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border-l-2 border-[#e6b980]">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#e6b980] mb-1">
                    The Creative & Technical Challenge
                  </h4>
                  <p className="font-light text-neutral-300">{project.challenge}</p>
                </div>

                <div>
                  <h4 className="text-base font-display font-bold text-white mb-2 uppercase tracking-wide">
                    Global Outcome & Reception
                  </h4>
                  <p className="font-light">{project.outcome}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

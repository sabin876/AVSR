import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Sparkles, Grid, LayoutGrid, Search, Camera, ArrowUpRight,
  Film, Palette, Eye, ZoomIn, SlidersHorizontal, CheckCircle2, Layers
} from 'lucide-react';
import {
  VIDEO_PROJECTS,
  PHOTO_PROJECTS,
  GRAPHICS_PROJECTS,
  VIDEO_CATEGORIES,
  PHOTO_CATEGORIES,
  GRAPHICS_CATEGORIES,
  GALLERY_SECTIONS
} from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

/* =========================================================================
   1. VIDEO CARD
   ========================================================================= */
function VideoCard({ project, onSelect, isMasonry }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [project.hoverVideo]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onClick={() => {
        sounds.playShutter();
        onSelect(project);
      }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#121212] border border-white/[0.08] hover:border-[#e6b980]/50 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
        isMasonry ? project.aspectRatio || 'aspect-[16/10]' : 'aspect-[16/10]'
      }`}
      data-cursor="PLAY"
    >
      {/* Background Auto-Playing Card Video */}
      <video
        ref={videoRef}
        src={project.hoverVideo || project.videoUrl}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/30 opacity-80 group-hover:opacity-85 transition-opacity" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/75 backdrop-blur-md text-[#e6b980] border border-[#e6b980]/30 shadow-md">
          <Film className="w-2.5 h-2.5" />
          <span>{project.categoryLabel}</span>
        </span>

        {project.badge && (
          <span className="px-3 py-1 rounded-full text-[10px] font-sans font-medium bg-black/70 backdrop-blur-md text-white border border-white/15 flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3 text-[#e6b980]" />
            <span>{project.badge}</span>
          </span>
        )}
      </div>

      {/* Center Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-[#e6b980] text-black flex items-center justify-center shadow-[0_0_30px_rgba(230,185,128,0.8)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-6 h-6 fill-black ml-0.5" />
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 mb-1.5">
          <span>{project.client}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#e6b980] transition-colors leading-tight">
          {project.title}
        </h3>

        <p className="mt-1 text-xs text-neutral-300 line-clamp-1 font-light opacity-80 group-hover:opacity-100 transition-opacity">
          {project.tagline}
        </p>

        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 truncate max-w-[200px]">
            <Camera className="w-3 h-3 text-[#e6b980] flex-shrink-0" />
            <span className="truncate">{project.cameraGear?.split('+')[0] || 'Cinema Camera'}</span>
          </span>
          <span className="text-[#e6b980] font-semibold flex items-center gap-1 flex-shrink-0">
            <span>Play Film</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   2. PHOTO CARD (IMAGE / PHOTO)
   ========================================================================= */
function PhotoCard({ project, onSelect, isMasonry }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onClick={() => {
        sounds.playShutter();
        onSelect(project);
      }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#121212] border border-white/[0.08] hover:border-[#e6b980]/50 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
        isMasonry ? project.aspectRatio || 'aspect-[3/4]' : 'aspect-[3/4]'
      }`}
      data-cursor="VIEW"
    >
      {/* High-Resolution Stills Image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Photography Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/25 opacity-75 group-hover:opacity-85 transition-opacity" />

      {/* Viewfinder Target Brackets (Camera HUD aesthetic) */}
      <div className="absolute inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#e6b980]/80" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#e6b980]/80" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#e6b980]/80" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#e6b980]/80" />
      </div>

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/75 backdrop-blur-md text-[#e6b980] border border-[#e6b980]/30 shadow-md">
          <Camera className="w-2.5 h-2.5" />
          <span>{project.categoryLabel}</span>
        </span>

        {project.badge && (
          <span className="px-3 py-1 rounded-full text-[10px] font-sans font-medium bg-black/70 backdrop-blur-md text-white border border-white/15 flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3 text-[#e6b980]" />
            <span>{project.badge}</span>
          </span>
        )}
      </div>

      {/* Center Zoom Shutter Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md text-black flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.6)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <ZoomIn className="w-6 h-6 text-black" />
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 mb-1.5">
          <span>{project.client}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#e6b980] transition-colors leading-tight">
          {project.title}
        </h3>

        <p className="mt-1 text-xs text-neutral-300 line-clamp-1 font-light opacity-80 group-hover:opacity-100 transition-opacity">
          {project.tagline}
        </p>

        {/* Technical EXIF Specs */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 truncate max-w-[210px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e6b980]" />
            <span className="truncate">{project.settings || project.cameraGear?.split('+')[0]}</span>
          </span>
          <span className="text-[#e6b980] font-semibold flex items-center gap-1 flex-shrink-0">
            <span>View Still</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   3. GRAPHICS CARD
   ========================================================================= */
function GraphicCard({ project, onSelect, isMasonry }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onClick={() => {
        sounds.playShutter();
        onSelect(project);
      }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#121212] border border-white/[0.08] hover:border-[#e6b980]/50 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
        isMasonry ? project.aspectRatio || 'aspect-[4/5]' : 'aspect-[4/5]'
      }`}
      data-cursor="DESIGN"
    >
      {/* High-Resolution Graphic Artwork Image */}
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Graphic Ambient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 opacity-80 group-hover:opacity-85 transition-opacity" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/75 backdrop-blur-md text-[#e6b980] border border-[#e6b980]/30 shadow-md">
          <Palette className="w-2.5 h-2.5" />
          <span>{project.categoryLabel}</span>
        </span>

        {project.badge && (
          <span className="px-3 py-1 rounded-full text-[10px] font-sans font-medium bg-black/70 backdrop-blur-md text-white border border-white/15 flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3 text-[#e6b980]" />
            <span>{project.badge}</span>
          </span>
        )}
      </div>

      {/* Center Inspect Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-[#e6b980] text-black flex items-center justify-center shadow-[0_0_30px_rgba(230,185,128,0.8)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Eye className="w-6 h-6 text-black" />
        </div>
      </div>

      {/* Bottom Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 mb-1.5">
          <span>{project.client}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-white group-hover:text-[#e6b980] transition-colors leading-tight">
          {project.title}
        </h3>

        <p className="mt-1 text-xs text-neutral-300 line-clamp-1 font-light opacity-80 group-hover:opacity-100 transition-opacity">
          {project.tagline}
        </p>

        {/* Design Tools & Lead Footer */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="flex items-center gap-1.5 truncate max-w-[210px]">
            <Layers className="w-3 h-3 text-[#e6b980] flex-shrink-0" />
            <span className="truncate">{project.tools?.split('•')[0] || 'Design Suite'}</span>
          </span>
          <span className="text-[#e6b980] font-semibold flex items-center gap-1 flex-shrink-0">
            <span>Inspect Art</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* =========================================================================
   MAIN PORTFOLIO GRID WITH 3 SECTIONS
   ========================================================================= */
export default function PortfolioGrid({ onSelectProject }) {
  // 'video' | 'photo' | 'graphics' | 'all'
  const [activeSection, setActiveSection] = useState('video');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMasonry, setIsMasonry] = useState(true);

  // When changing major section, reset subcategory filter
  const handleSectionChange = (sectionId) => {
    sounds.playClick();
    setActiveSection(sectionId);
    setActiveCategory('all');
  };

  // Get active categories based on current section
  const getCurrentCategories = () => {
    switch (activeSection) {
      case 'video':
        return VIDEO_CATEGORIES;
      case 'photo':
        return PHOTO_CATEGORIES;
      case 'graphics':
        return GRAPHICS_CATEGORIES;
      default:
        return [];
    }
  };

  // Filter projects helper
  const filterList = (items) => {
    return items.filter((item) => {
      const matchesCategory =
        activeSection === 'all' || activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.cameraGear?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tools?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tagline?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  const filteredVideos = filterList(VIDEO_PROJECTS);
  const filteredPhotos = filterList(PHOTO_PROJECTS);
  const filteredGraphics = filterList(GRAPHICS_PROJECTS);

  const totalCurrentCount =
    activeSection === 'video'
      ? filteredVideos.length
      : activeSection === 'photo'
      ? filteredPhotos.length
      : activeSection === 'graphics'
      ? filteredGraphics.length
      : filteredVideos.length + filteredPhotos.length + filteredGraphics.length;

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =========================================================================
            HEADER & THREE DISCIPLINE HIGHLIGHT
            ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#e6b980] mb-3">
              <span className="w-6 h-[1.5px] bg-[#e6b980]" />
              <span>Studio Showcase</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              The Film & Stills Gallery
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-2xl font-light">
              Explore our three core creative disciplines: high-impact commercial films & aerials, fine-art editorial & bridal stills, and bespoke brand graphic design systems.
            </p>
          </div>

          {/* Controls: Counter & Layout Toggle */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <span className="text-xs font-mono text-neutral-400">
              Showing <span className="text-white font-bold">{totalCurrentCount}</span> Works
            </span>
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsMasonry(true);
                }}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  isMasonry ? 'bg-white/15 text-white' : 'text-neutral-500 hover:text-white'
                }`}
                title="Dynamic Aspect Masonry"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsMasonry(false);
                }}
                className={`p-2 rounded-lg text-xs transition-colors ${
                  !isMasonry ? 'bg-white/15 text-white' : 'text-neutral-500 hover:text-white'
                }`}
                title="Strict Cinema Grid"
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            THE THREE SECTION SELECTOR TABS (Video | Image/Photo | Graphics | All)
            ========================================================================= */}
        <div className="mb-8 p-1.5 sm:p-2 bg-[#121212] border border-white/[0.08] rounded-2xl sm:rounded-3xl shadow-xl flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            {/* 1. VIDEO SECTION TAB */}
            <button
              onClick={() => handleSectionChange('video')}
              className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 sm:gap-2.5 ${
                activeSection === 'video'
                  ? 'bg-[#e6b980] text-black shadow-[0_0_25px_rgba(230,185,128,0.4)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>Video</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeSection === 'video' ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                }`}
              >
                {VIDEO_PROJECTS.length}
              </span>
            </button>

            {/* 2. IMAGE / PHOTO SECTION TAB */}
            <button
              onClick={() => handleSectionChange('photo')}
              className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 sm:gap-2.5 ${
                activeSection === 'photo'
                  ? 'bg-[#e6b980] text-black shadow-[0_0_25px_rgba(230,185,128,0.4)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Image / Photo</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeSection === 'photo' ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                }`}
              >
                {PHOTO_PROJECTS.length}
              </span>
            </button>

            {/* 3. GRAPHICS SECTION TAB */}
            <button
              onClick={() => handleSectionChange('graphics')}
              className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 sm:gap-2.5 ${
                activeSection === 'graphics'
                  ? 'bg-[#e6b980] text-black shadow-[0_0_25px_rgba(230,185,128,0.4)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Graphics</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeSection === 'graphics' ? 'bg-black/20 text-black' : 'bg-white/10 text-neutral-400'
                }`}
              >
                {GRAPHICS_PROJECTS.length}
              </span>
            </button>

            {/* 4. ALL SECTIONS VIEW */}
            <button
              onClick={() => handleSectionChange('all')}
              className={`relative px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium tracking-wide transition-all flex items-center gap-1.5 sm:gap-2 ${
                activeSection === 'all'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white hover:bg-white/[0.05]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#e6b980]" />
              <span>All Sections</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            SUBCATEGORY FILTER PILLS & SEARCH (When viewing an individual section)
            ========================================================================= */}
        {activeSection !== 'all' && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
            {/* Category tabs for current section */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {getCurrentCategories().map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sounds.playClick();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-white/20 text-white font-semibold border border-[#e6b980]/40'
                      : 'bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                  }`}
                  data-cursor="FILTER"
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Quick Search */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  activeSection === 'video'
                    ? 'Search films by title, gear, client...'
                    : activeSection === 'photo'
                    ? 'Search photos by style, lens, client...'
                    : 'Search graphics by tool, typography...'
                }
                className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#e6b980]/60 focus:bg-white/[0.06] transition-all"
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            GRID DISPLAY: TABBED VIEW (Single Section Active)
            ========================================================================= */}
        {activeSection === 'video' && (
          <motion.div
            layout
            className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredVideos.map((project) => (
                <VideoCard
                  key={project.id}
                  project={project}
                  onSelect={onSelectProject}
                  isMasonry={isMasonry}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {activeSection === 'photo' && (
          <motion.div
            layout
            className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredPhotos.map((project) => (
                <PhotoCard
                  key={project.id}
                  project={project}
                  onSelect={onSelectProject}
                  isMasonry={isMasonry}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {activeSection === 'graphics' && (
          <motion.div
            layout
            className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {filteredGraphics.map((project) => (
                <GraphicCard
                  key={project.id}
                  project={project}
                  onSelect={onSelectProject}
                  isMasonry={isMasonry}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* =========================================================================
            GRID DISPLAY: ALL 3 SECTIONS STACKED
            ========================================================================= */}
        {activeSection === 'all' && (
          <div className="space-y-20">
            {/* SUB-SECTION 1: VIDEO */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e6b980]/15 text-[#e6b980] flex items-center justify-center border border-[#e6b980]/30">
                    <Film className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
                      <span>Video & Cinema Works</span>
                      <span className="text-xs font-mono font-normal text-neutral-400">
                        ({filteredVideos.length})
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Commercial campaigns, narrative films, luxury weddings, and high-speed aerials
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSectionChange('video')}
                  className="text-xs font-mono text-[#e6b980] hover:underline flex items-center gap-1"
                >
                  <span>Filter Videos</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredVideos.map((project) => (
                  <VideoCard
                    key={project.id}
                    project={project}
                    onSelect={onSelectProject}
                    isMasonry={isMasonry}
                  />
                ))}
              </div>
            </div>

            {/* SUB-SECTION 2: IMAGE / PHOTO */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e6b980]/15 text-[#e6b980] flex items-center justify-center border border-[#e6b980]/30">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
                      <span>Image / Photo & Editorial Stills</span>
                      <span className="text-xs font-mono font-normal text-neutral-400">
                        ({filteredPhotos.length})
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Haute couture fashion, heirloom bridal jewelry, and athletic commercial photography
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSectionChange('photo')}
                  className="text-xs font-mono text-[#e6b980] hover:underline flex items-center gap-1"
                >
                  <span>Filter Photos</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredPhotos.map((project) => (
                  <PhotoCard
                    key={project.id}
                    project={project}
                    onSelect={onSelectProject}
                    isMasonry={isMasonry}
                  />
                ))}
              </div>
            </div>

            {/* SUB-SECTION 3: GRAPHICS */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e6b980]/15 text-[#e6b980] flex items-center justify-center border border-[#e6b980]/30">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
                      <span>Graphics & Visual Design</span>
                      <span className="text-xs font-mono font-normal text-neutral-400">
                        ({filteredGraphics.length})
                      </span>
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Film key art, luxury brand identities, 3D motion graphics & campaign creatives
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleSectionChange('graphics')}
                  className="text-xs font-mono text-[#e6b980] hover:underline flex items-center gap-1"
                >
                  <span>Filter Graphics</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredGraphics.map((project) => (
                  <GraphicCard
                    key={project.id}
                    project={project}
                    onSelect={onSelectProject}
                    isMasonry={isMasonry}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {totalCurrentCount === 0 && (
          <div className="py-20 text-center text-neutral-500">
            <p className="text-base font-light">No works match the selected search or filter criteria.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-full text-xs bg-white/5 text-white hover:bg-white/10"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

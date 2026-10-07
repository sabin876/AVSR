import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Filter, Grid, LayoutGrid, Search, Eye, Camera, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_CATEGORIES, PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

function ProjectCard({ project, onSelect, isMasonry }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    sounds.playWhoosh();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        sounds.playShutter();
        onSelect(project);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-[#121212] border border-white/[0.08] hover:border-[#e6b980]/50 transition-all duration-500 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.9)] ${
        isMasonry ? project.aspectRatio : 'aspect-[16/10]'
      }`}
      data-cursor="PLAY"
    >
      {/* Base Still Image */}
      <img
        src={project.heroImage}
        alt={project.title}
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
          isHovered ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Hover-Triggered Video Preview */}
      <video
        ref={videoRef}
        src={project.hoverVideo}
        muted
        loop
        playsInline
        preload="none"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isHovered ? 'opacity-100 scale-105' : 'opacity-0'
        }`}
      />

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-[#e6b980] border border-[#e6b980]/30 shadow-md">
          {project.categoryLabel}
        </span>

        {project.badge && (
          <span className="px-3 py-1 rounded-full text-[10px] font-sans font-medium bg-white/10 backdrop-blur-md text-white border border-white/15 flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3 h-3 text-[#e6b980]" />
            <span>{project.badge}</span>
          </span>
        )}
      </div>

      {/* Center Hover Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <div className="w-14 h-14 rounded-full bg-[#e6b980] text-black flex items-center justify-center shadow-[0_0_30px_rgba(230,185,128,0.8)] transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-6 h-6 fill-black ml-0.5" />
        </div>
      </div>

      {/* Bottom Content Metadata */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 mb-1.5">
          <span>{project.client}</span>
          <span>•</span>
          <span>{project.year}</span>
        </div>

        <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#e6b980] transition-colors leading-tight">
          {project.title}
        </h3>

        <p className="mt-1 text-xs text-neutral-300 line-clamp-1 font-light opacity-80 group-hover:opacity-100 transition-opacity">
          {project.tagline}
        </p>

        {/* Technical Specs Footer */}
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Camera className="w-3 h-3 text-[#e6b980]" />
            <span className="truncate max-w-[200px]">{project.cameraGear.split('+')[0]}</span>
          </span>
          <span className="text-[#e6b980] font-semibold flex items-center gap-1">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PortfolioGrid({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMasonry, setIsMasonry] = useState(true);

  const filteredProjects = PORTFOLIO_PROJECTS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cameraGear.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#e6b980] mb-3">
              <span className="w-6 h-[1.5px] bg-[#e6b980]" />
              <span>Selected Works</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              The Film & Stills Gallery
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base max-w-xl font-light">
              Filter through our commercial campaigns, narrative films, luxury weddings, and aerial cinematography. Hover over any work to preview live footage.
            </p>
          </div>

          {/* Layout Controls & Counter */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <span className="text-xs font-mono text-neutral-400">
              Showing <span className="text-white font-bold">{filteredProjects.length}</span> Projects
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

        {/* Filter Pills and Search Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-white/[0.06]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#e6b980] text-black font-semibold shadow-[0_0_20px_rgba(230,185,128,0.3)]'
                    : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
                data-cursor="FILTER"
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by client, title, gear..."
              className="w-full pl-10 pr-4 py-2 bg-white/[0.03] border border-white/10 rounded-full text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#e6b980]/60 focus:bg-white/[0.06] transition-all"
            />
          </div>
        </div>

        {/* Portfolio Masonry / Grid */}
        <motion.div
          layout
          className={`grid gap-6 sm:gap-8 ${
            isMasonry ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={onSelectProject}
                isMasonry={isMasonry}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-neutral-500">
            <p className="text-base font-light">No projects match the selected filter criteria.</p>
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

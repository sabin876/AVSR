import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { CLIENT_TESTIMONIALS, BRAND_LOGOS } from '../data/teamAndGearData';
import { sounds } from '../utils/soundEffects';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    sounds.playWhoosh();
    setCurrentIndex((prev) => (prev === 0 ? CLIENT_TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    sounds.playWhoosh();
    setCurrentIndex((prev) => (prev === CLIENT_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = CLIENT_TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="relative py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/[0.06] overflow-hidden">
      {/* Brand Logos Marquee */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <p className="text-center text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 mb-8 font-semibold">
          Trusted By Global Brands & Discerning Creators
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70">
          {BRAND_LOGOS.map((brand, idx) => (
            <div
              key={idx}
              className="font-display font-black tracking-widest text-sm sm:text-base text-neutral-400 hover:text-[#e6b980] hover:scale-105 transition-all cursor-default select-none"
            >
              {brand.label}
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-white/10 p-8 sm:p-14 shadow-2xl">
          {/* Subtle Quote Icon Watermark */}
          <Quote className="absolute top-8 right-8 w-24 h-24 text-white/[0.03] pointer-events-none" />

          {/* Testimonial Content */}
          <div className="relative z-10">
            {/* Stars & Tag */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-1.5">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#e6b980] text-[#e6b980]" />
                ))}
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/[0.05] border border-white/10 text-[#e6b980]">
                {current.tag}
              </span>
            </div>

            {/* Quote Text */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed italic"
              >
                "{current.quote}"
              </motion.blockquote>
            </AnimatePresence>

            {/* Author Information */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#e6b980]"
                />
                <div>
                  <h4 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <span>{current.author}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#e6b980]" />
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {current.title} • <span className="text-white font-medium">{current.company}</span>
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-500 mr-2">
                  0{currentIndex + 1} / 0{CLIENT_TESTIMONIALS.length}
                </span>

                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-white hover:border-[#e6b980] hover:bg-white/10 transition-colors"
                  aria-label="Previous Testimonial"
                  data-cursor="PREV"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-white/[0.04] border border-white/10 text-white hover:border-[#e6b980] hover:bg-white/10 transition-colors"
                  aria-label="Next Testimonial"
                  data-cursor="NEXT"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

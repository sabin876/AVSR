import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import logoImg from '../assets/logo.png';

export default function Navbar({ onBookClick, onSocialClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#portfolio' },
    { name: 'Services & Pricing', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
    { name: 'Social Connect', href: '/social-media', isSocial: true },
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    sounds.playClick();
    setMobileMenuOpen(false);

    if (link.isSocial || link.href === '/social-media') {
      if (onSocialClick) {
        onSocialClick();
      } else {
        window.history.pushState({}, '', '/social-media');
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
      return;
    }

    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3.5 bg-[#0a0a0a]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'py-6 bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="group flex items-center gap-3.5 text-white tracking-widest transition-transform active:scale-95"
          data-cursor="AVSR"
        >
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shrink-0">
            <img src={logoImg} alt="AVSR VISION Logo" className="w-full h-full object-contain filter contrast-110 drop-shadow-md" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl sm:text-2xl tracking-[0.22em] font-black text-white group-hover:text-[#e6b980] transition-colors leading-tight">
              AVSR VISION
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#e6b980] font-semibold mt-0.5">
              We Frame Moments
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link)}
              className="relative py-1 hover:text-[#e6b980] transition-colors group"
              data-cursor="GO"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#e6b980] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Primary CTA Button */}
          <button
            onClick={() => {
              sounds.playShutter();
              if (onBookClick) onBookClick();
              else {
                const el = document.querySelector('#contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-gradient-to-r from-[#e6b980] via-[#f59e0b] to-[#e6b980] bg-[length:200%_auto] hover:bg-right transition-all duration-500 shadow-[0_0_20px_rgba(230,185,128,0.3)] hover:shadow-[0_0_30px_rgba(230,185,128,0.6)] active:scale-95"
            data-cursor="BOOK"
          >
            <span>Book a Shoot</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-[#0c0c0c]/98 backdrop-blur-2xl border-b border-neutral-800 px-6 py-8"
          >
            <div className="flex flex-col gap-5 text-sm uppercase tracking-widest font-medium">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="text-neutral-300 hover:text-[#e6b980] py-2 border-b border-white/[0.04] flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500" />
                </motion.a>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    sounds.playShutter();
                    setMobileMenuOpen(false);
                    const el = document.querySelector('#contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-widest text-black bg-[#e6b980] shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Book a Shoot Now</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

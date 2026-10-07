import { ArrowUp, Globe, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import logoImg from '../assets/logo.png';

export default function Footer({ onSocialClick }) {
  const scrollToTop = () => {
    sounds.playWhoosh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const locations = [
    { city: 'New York', address: 'Tribeca Cinema Arts, 54 Franklin St' },
    { city: 'Los Angeles', address: 'Culver City Soundstages, Studio B' },
    { city: 'Dubai', address: 'D3 Design District, Tower 2' },
    { city: 'Kathmandu', address: 'Patan Heritage Studio Quarter' }
  ];

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.08] text-white pt-20 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Studio Locations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-16 border-b border-white/[0.06]">
          {locations.map((loc) => (
            <div key={loc.city} className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e6b980] font-bold block">
                {loc.city} Hub
              </span>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                {loc.address}
              </p>
            </div>
          ))}
        </div>

        {/* Main Footer Row */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-5">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center shrink-0">
                <img src={logoImg} alt="AVSR VISION Logo" className="w-full h-full object-contain filter contrast-110 drop-shadow-md" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl sm:text-3xl tracking-[0.2em] font-black text-white">
                  AVSR VISION
                </span>
                <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#e6b980] font-semibold mt-1">
                  We Frame Moments, We Tell Stories
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed">
              Award-winning visual agency specializing in high-end commercial films, luxury weddings, aerial cinematography, and editorial portraits. Crafted on 8K cinema cameras and medium format stills.
            </p>

            <div className="flex items-center gap-3 pt-2 text-neutral-400">
              {/* Instagram SVG */}
              <a
                href="https://www.instagram.com/avsr421/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#e6b980] hover:text-[#e6b980] transition-colors"
                title="Follow @avsr421 on Instagram"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* YouTube SVG */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#e6b980] hover:text-[#e6b980] transition-colors"
                title="YouTube Showreels"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <polygon points="10 15 15 12 10 9" fill="currentColor" />
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#e6b980] hover:text-[#e6b980] transition-colors"
                title="LinkedIn"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/971523406989"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full bg-white/[0.03] border border-white/5 hover:border-[#25D366] hover:text-[#25D366] transition-colors"
                title="Chat on WhatsApp (+971 52 340 6989)"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e6b980] font-bold block mb-4">
              Explore
            </span>
            <ul className="space-y-2.5 text-neutral-400">
              <li><a href="#portfolio" className="hover:text-white transition-colors">Commercial Works</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Luxury Weddings</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Drone & FPV Reel</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">Our Philosophy</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Pricing Calculator</a></li>
              <li>
                <a
                  href="/social-media"
                  onClick={(e) => {
                    e.preventDefault();
                    sounds.playClick();
                    if (onSocialClick) {
                      onSocialClick();
                    } else {
                      window.history.pushState({}, '', '/social-media');
                      window.dispatchEvent(new PopStateEvent('popstate'));
                    }
                  }}
                  className="text-[#e6b980] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Social Media & Digital Card</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Direct Inquiry */}
          <div className="md:col-span-4 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#e6b980] font-bold block">
              Director's Dispatch
            </span>
            <p className="text-xs text-neutral-400 font-light">
              Receive private screening invitations, seasonal filming availability, and camera equipment teardowns.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#e6b980]"
              />
              <button
                onClick={() => sounds.playShutter()}
                className="px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-[#e6b980] hover:bg-[#f59e0b] transition-colors"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Back to Top */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} AYUV STUDIOS. All Rights Reserved. Cinematic Storytelling.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-400 hover:text-[#e6b980] transition-colors group"
            data-cursor="TOP"
          >
            <span>Back to Summit</span>
            <div className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-[#e6b980]">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}

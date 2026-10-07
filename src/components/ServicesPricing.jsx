import { motion } from 'framer-motion';
import {
  Video, Camera, Plane, Sliders, Check, ArrowRight, Sparkles
} from 'lucide-react';
import { SERVICES_LIST } from '../data/servicesData';
import { sounds } from '../utils/soundEffects';

export default function ServicesPricing() {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Video':
        return <Video className="w-5 h-5 text-[#e6b980]" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-[#e6b980]" />;
      case 'Plane':
        return <Plane className="w-5 h-5 text-[#e6b980]" />;
      case 'Sliders':
        return <Sliders className="w-5 h-5 text-[#e6b980]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#e6b980]" />;
    }
  };

  const handleInquireClick = () => {
    sounds.playShutter();
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#0a0a0a] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#e6b980] mb-3">
            <span className="w-6 h-[1.5px] bg-[#e6b980]" />
            <span>Production Capabilities</span>
            <span className="w-6 h-[1.5px] bg-[#e6b980]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Services & Production Capabilities
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base font-light">
            We operate end-to-end cinema production from creative concept and heavy-lift flight to master color science. Tailored for commercial, fashion, and heirloom stories.
          </p>
        </div>

        {/* 4 Pillars Breakdown (Interactive Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {SERVICES_LIST.map((service) => (
            <motion.div
              key={service.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl bg-[#121212] border border-white/[0.08] hover:border-[#e6b980]/40 transition-all flex flex-col justify-between group shadow-xl hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 group-hover:border-[#e6b980]/50 transition-colors">
                  {getServiceIcon(service.icon)}
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider text-[#e6b980] font-semibold">
                  {service.category}
                </span>

                <h3 className="font-display text-lg font-bold text-white mt-1 mb-2 group-hover:text-[#e6b980] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed font-light mb-5">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2 pt-4 border-t border-white/5">
                  {service.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-[#e6b980] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer without public pricing */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Scope</span>
                  <span className="font-medium text-white text-xs">Custom Production</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Turnaround</span>
                  <span className="font-mono text-neutral-300 text-[11px]">{service.turnaround}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bespoke Production Inquiries CTA Card */}
        <div className="rounded-3xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e6b980]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#e6b980] font-bold">
              Bespoke Productions
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Have a Project in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light leading-relaxed">
              Every brand campaign, cinematic narrative, and high-fashion editorial requires custom optics, crew scaling, and post-production workflows. Connect with our team to discuss your scope and receive a tailored proposal.
            </p>
          </div>
          <button
            onClick={handleInquireClick}
            className="w-full md:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.18em] text-black bg-[#e6b980] hover:bg-[#f59e0b] transition-all shadow-[0_0_25px_rgba(230,185,128,0.4)] hover:shadow-[0_0_35px_rgba(230,185,128,0.6)] flex items-center justify-center gap-3 shrink-0 active:scale-95 relative z-10"
            data-cursor="INQUIRE"
          >
            <span>Inquire Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

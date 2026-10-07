import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Video, Camera, Plane, Sliders, Check, ArrowRight,
  Sparkles, Clock, ShieldCheck, Zap, Plus, DollarSign
} from 'lucide-react';
import { SERVICES_LIST, PRICING_TIERS, PRICING_ADDONS } from '../data/servicesData';
import { sounds } from '../utils/soundEffects';

export default function ServicesPricing({ onSelectPackage }) {
  const [selectedTierId, setSelectedTierId] = useState('signature');
  const [selectedAddons, setSelectedAddons] = useState(['fpv']);
  const [activeServiceTab, setActiveServiceTab] = useState('videography');

  const selectedTier = PRICING_TIERS.find((t) => t.id === selectedTierId) || PRICING_TIERS[1];

  const toggleAddon = (addonId) => {
    sounds.playClick();
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter((id) => id !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  const calculateTotal = () => {
    let total = selectedTier.price;
    selectedAddons.forEach((addonId) => {
      const addon = PRICING_ADDONS.find((a) => a.id === addonId);
      if (addon) total += addon.price;
    });
    return total;
  };

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

  const handleApplyToBooking = () => {
    sounds.playShutter();
    if (onSelectPackage) {
      onSelectPackage({
        tier: selectedTier.name,
        price: calculateTotal(),
        addons: selectedAddons.map((id) => PRICING_ADDONS.find((a) => a.id === id)?.name).filter(Boolean)
      });
    }
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
            <span>Offerings & Investment</span>
            <span className="w-6 h-[1.5px] bg-[#e6b980]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Services & Production Packages
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base font-light">
            We operate end-to-end cinema production from concept and heavy-lift flight to master color science. Choose an all-inclusive tier or customize your deliverables.
          </p>
        </div>

        {/* 4 Pillars Breakdown (Interactive Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
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

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Starts at</span>
                  <span className="font-display font-bold text-white text-base">{service.startingPrice}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Turnaround</span>
                  <span className="font-mono text-neutral-300 text-[11px]">{service.turnaround}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Pricing Estimator & Package Selector */}
        <div className="rounded-3xl bg-gradient-to-b from-[#141414] to-[#0c0c0c] border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow in Corner */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#e6b980]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#e6b980] font-bold">
              Interactive Estimator
            </span>
            <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white mt-1">
              Select Your Production Tier
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light">
              Toggle tiers and modular add-ons below to preview the exact investment quote for your campaign or event.
            </p>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            {PRICING_TIERS.map((tier) => {
              const isSelected = selectedTierId === tier.id;
              return (
                <div
                  key={tier.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedTierId(tier.id);
                  }}
                  className={`relative p-6 sm:p-8 rounded-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1a1a1a] border-2 border-[#e6b980] shadow-[0_0_35px_rgba(230,185,128,0.2)]'
                      : 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                  data-cursor="SELECT"
                >
                  {/* Badge */}
                  {tier.popular && (
                    <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#e6b980] text-black text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      {tier.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                        {tier.name}
                      </span>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-[#e6b980] text-black flex items-center justify-center">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-display text-3xl sm:text-4xl font-black text-white">
                        {tier.priceLabel}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono">/ base project</span>
                    </div>

                    <p className="mt-3 text-xs text-neutral-300 font-light leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="mt-6 space-y-2.5 pt-6 border-t border-white/10">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#e6b980] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/5">
                    <span className="text-[11px] text-neutral-400 font-light italic">
                      Best for: {tier.recommendedFor}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Optional Add-Ons Selection */}
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300 mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#e6b980]" />
              <span>Available Production Add-Ons & Acceleration</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRICING_ADDONS.map((addon) => {
                const checked = selectedAddons.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                      checked
                        ? 'bg-[#e6b980]/10 border-[#e6b980]/50 text-white'
                        : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          checked ? 'bg-[#e6b980] border-[#e6b980] text-black' : 'border-neutral-600'
                        }`}
                      >
                        {checked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="font-medium">{addon.name}</span>
                    </div>
                    <span className="font-mono text-[#e6b980] shrink-0">+${addon.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Quote Summary & Apply to Booking */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#1a1a1a] border border-[#e6b980]/30 shadow-xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono block">
                Estimated Project Investment
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                  ${calculateTotal().toLocaleString()}
                </span>
                <span className="text-xs text-[#e6b980] font-mono">
                  ({selectedTier.name} + {selectedAddons.length} Add-ons)
                </span>
              </div>
            </div>

            <button
              onClick={handleApplyToBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.18em] text-black bg-[#e6b980] hover:bg-[#f59e0b] transition-all shadow-[0_0_25px_rgba(230,185,128,0.4)] flex items-center justify-center gap-3 active:scale-95"
              data-cursor="BOOK"
            >
              <span>Lock In & Proceed to Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

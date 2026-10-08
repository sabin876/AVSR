import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MessageCircle,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function ContactForm() {
  const [copiedType, setCopiedType] = useState(null);

  const contactData = {
    phone: '0523406989',
    phoneFormatted: '+971 52 340 6989',
    email: 'ayuvbastola14@gmail.com',
    whatsapp: '0523406989',
    whatsappLink: 'https://wa.me/971523406989?text=Hello%20AYUV%20Studios!%20I%20would%20like%20to%20inquire%20about%20a%20production%20project.'
  };

  const handleCopy = (text, type) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#080808] border-t border-white/[0.06] overflow-hidden">
      {/* Background Cinematic Glow Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#e6b980]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#25D366]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#e6b980] mb-3"
          >
            <span className="w-6 h-[1.5px] bg-[#e6b980]" />
            <span>Direct Inquiries & Bookings</span>
            <span className="w-6 h-[1.5px] bg-[#e6b980]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-neutral-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed"
          >
            We are ready to bring your visual story to life. Reach out directly via Phone, Email, or WhatsApp for project commissions, dates, and customized production quotes.
          </motion.p>
        </div>

        {/* 3 Core Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. WHATSAPP CARD (Highlighted Primary Direct Contact) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative rounded-3xl p-7 bg-gradient-to-b from-[#141d17] via-[#0f1411] to-[#0a0d0b] border border-[#25D366]/30 hover:border-[#25D366] transition-all duration-300 shadow-[0_15px_40px_rgba(37,211,102,0.1)] hover:shadow-[0_20px_50px_rgba(37,211,102,0.25)] flex flex-col justify-between"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[10px] font-mono font-bold tracking-widest text-[#25D366] uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                Fastest Reply
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
                WhatsApp Direct
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-1 group-hover:text-[#25D366] transition-colors">
                {contactData.phone}
              </h3>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                Connect directly for instant replies, project references, and custom quotes.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-2">
              <a
                href={contactData.whatsappLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => sounds.playClick()}
                className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleCopy(contactData.whatsapp, 'whatsapp')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                title="Copy WhatsApp Number"
              >
                {copiedType === 'whatsapp' ? <Check className="w-4 h-4 text-[#25D366]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* 2. PHONE CALL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative rounded-3xl p-7 bg-gradient-to-b from-[#18181b] via-[#121214] to-[#0a0a0c] border border-[#e6b980]/30 hover:border-[#e6b980] transition-all duration-300 shadow-[0_15px_40px_rgba(230,185,128,0.1)] hover:shadow-[0_20px_50px_rgba(230,185,128,0.25)] flex flex-col justify-between"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#e6b980]/15 border border-[#e6b980]/40 flex items-center justify-center text-[#e6b980] group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-medium tracking-widest text-neutral-400 uppercase">
                Direct Line
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
                Phone Number
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-1 group-hover:text-[#e6b980] transition-colors">
                {contactData.phone}
              </h3>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                Direct telephone call for scheduling, shoot logistics, and client consultations.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-2">
              <a
                href={`tel:${contactData.phone}`}
                onClick={() => sounds.playClick()}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#e6b980] to-[#f59e0b] hover:from-[#f59e0b] hover:to-[#e6b980] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Call Now</span>
                <Phone className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => handleCopy(contactData.phone, 'phone')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                title="Copy Phone Number"
              >
                {copiedType === 'phone' ? <Check className="w-4 h-4 text-[#e6b980]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* 3. EMAIL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative rounded-3xl p-7 bg-gradient-to-b from-[#18181b] via-[#121214] to-[#0a0a0c] border border-white/15 hover:border-white/35 transition-all duration-300 shadow-xl hover:shadow-2xl flex flex-col justify-between"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-medium tracking-widest text-neutral-400 uppercase">
                Official Studio
              </span>
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest font-mono text-neutral-400">
                Email Address
              </span>
              <h3 className="font-display font-bold text-base text-white mt-1 break-all group-hover:text-[#e6b980] transition-colors">
                {contactData.email}
              </h3>
              <p className="mt-2 text-xs text-neutral-400 font-light leading-relaxed">
                Send creative briefs, commercial requests, and event proposals via email.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center gap-2">
              <a
                href={`mailto:${contactData.email}`}
                onClick={() => sounds.playClick()}
                className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/15"
              >
                <span>Send Email</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleCopy(contactData.email, 'email')}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors"
                title="Copy Email Address"
              >
                {copiedType === 'email' ? <Check className="w-4 h-4 text-[#e6b980]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Studio Operating Notes & Guarantee Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-[#121214] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#e6b980]/10 text-[#e6b980] shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white">
                Fast Response Guarantee
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">
                All WhatsApp messages, calls, and email inquiries receive direct responses within 24 hours.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-neutral-300">
              <ShieldCheck className="w-4 h-4 text-[#e6b980]" />
              <span>AVSR Studio Production</span>
            </span>
          </div>
        </motion.div>
      </div>

      {/* 
        ========================================================================
        ORIGINAL MULTI-STEP BOOKING FORM (COMMENTED OUT AS REQUESTED)
        To restore the full multi-step booking form in the future, 
        simply uncomment the JSX block below:
        ========================================================================
      */}
      {/* 
      <div className="max-w-4xl mx-auto px-4 mt-16 hidden">
        <div className="rounded-3xl bg-[#121212] border border-white/10 p-6 sm:p-12 shadow-2xl">
          <form>
            <p>Step 1: Project Type (Commercial, Wedding, Drone, Editorial)</p>
            <p>Step 2: Date & Venue</p>
            <p>Step 3: Investment Budget Tier</p>
            <p>Step 4: Contact Information & Creative Vision Brief</p>
          </form>
        </div>
      </div>
      */}
    </section>
  );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MessageCircle, Globe, Mail, MapPin, Clock,
  ArrowLeft, Share2, Check, ExternalLink, Sparkles,
  Download, QrCode, X, Copy, Camera, ShieldCheck
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import logoImg from '../assets/logo.png';

export default function SocialMediaPage({ onBackToHome }) {
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleShare = async () => {
    sounds.playClick();
    const shareData = {
      title: 'AVSR VISION | Social Connect & Direct Hub',
      text: 'Connect with AVSR VISION (Ayuv Studios) - Commercial Films, Photography & Cinematography Studio.',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // User dismissed or share failed, fallback to copy
      }
    }

    // Fallback: Copy to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      showToast('Failed to copy link');
    }
  };

  // Generate & download vCard (.vcf)
  const handleDownloadVCard = () => {
    sounds.playClick();
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:AVSR VISION (Ayuv Studios)',
      'ORG:AVSR Vision Studio',
      'TITLE:Cinematic Media & Production Studio',
      'TEL;TYPE=CELL,VOICE:0523406989',
      'EMAIL;TYPE=INTERNET:ayuvbastola14@gmail.com',
      'URL:https://www.instagram.com/avsr421/',
      'ADR;TYPE=WORK:;;D3 Design District, Tower 2;Dubai;;;United Arab Emirates',
      'NOTE:Premium Visual Storytelling, Commercial Films, 8K Cinema & Photography.',
      'END:VCARD',
    ].join('\r\n');

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'AVSR_VISION_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Contact card downloaded!');
  };

  const primaryActions = [
    {
      id: 'instagram',
      title: 'Follow on Instagram',
      subtitle: '@avsr421',
      description: 'Daily Commercial Films, BTS Footage & Photography',
      icon: ExternalLink,
      href: 'https://www.instagram.com/avsr421/',
      gradient: 'from-[#833ab4] via-[#fd1d1d] to-[#fcb045]',
      borderHover: 'hover:border-pink-400/60',
      badge: 'Official Feed'
    },
    {
      id: 'phone',
      title: 'Call AVSR Studio',
      subtitle: '0523406989',
      description: 'Direct Studio & Lead Producer Line',
      icon: Phone,
      href: 'tel:0523406989',
      gradient: 'from-[#1e3a8a] via-[#2563eb] to-[#3b82f6]',
      borderHover: 'hover:border-blue-400/50',
      badge: 'Direct Call'
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp Consultation',
      subtitle: '0523406989',
      description: 'Instant Project Inquiry & 24/7 Availability',
      icon: MessageCircle,
      href: 'https://wa.me/971523406989?text=Hello%20AVSR%20VISION!%20I%20would%20like%20to%20inquire%20about%20booking%20a%20commercial/photography%20project.',
      gradient: 'from-[#065f46] via-[#059669] to-[#10b981]',
      borderHover: 'hover:border-emerald-400/50',
      badge: 'Quick Chat'
    },
    {
      id: 'website',
      title: 'Visit Official Studio',
      subtitle: 'AVSR Vision Portfolio',
      description: 'Explore 8K Showreels, Film Works & Capabilities',
      icon: Globe,
      onClick: onBackToHome,
      href: '#',
      gradient: 'from-white/[0.08] via-white/[0.05] to-white/[0.02]',
      borderHover: 'hover:border-[#e6b980]/50',
      badge: 'Portfolio'
    },
    {
      id: 'email',
      title: 'Email Production Studio',
      subtitle: 'ayuvbastola14@gmail.com',
      description: 'Send Pitch Decks, Briefs & Enterprise Inquiries',
      icon: Mail,
      href: 'mailto:ayuvbastola14@gmail.com?subject=Creative%20Production%20Inquiry%20-%20AVSR%20VISION',
      gradient: 'from-white/[0.07] via-white/[0.04] to-white/[0.02]',
      borderHover: 'hover:border-[#e6b980]/40',
      badge: 'Official Briefs'
    }
  ];

  const instagramChannel = {
    name: 'Instagram',
    handle: '@avsr421',
    href: 'https://www.instagram.com/avsr421/',
    color: '#E4405F',
    icon: (
      <svg className="w-8 h-8 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    )
  };

  return (
    <div className="relative min-h-screen bg-[#06080e] text-[#f5f5f5] flex flex-col justify-between overflow-x-hidden selection:bg-[#e6b980]/30 selection:text-white">
      {/* Ambient background glows with moving gradient particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.3, 0.15],
            x: ['-50%', '-48%', '-50%'],
            y: ['0%', '-5%', '0%']
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[-10%] left-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#e6b980]/20 via-[#f59e0b]/10 to-transparent rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.25, 0.1],
            y: ['0%', '5%', '0%']
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-t from-blue-600/15 via-indigo-600/10 to-transparent rounded-full blur-[140px]" 
        />
        {/* Floating animated sparkles/orbs in background */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#e6b980]/40 blur-[1px]"
            style={{
              top: `${15 + i * 14}%`,
              left: `${10 + (i * 27) % 80}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Main Container */}
      <motion.div 
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 }
          }
        }}
        className="relative z-10 w-full max-w-lg mx-auto px-4 sm:px-6 pt-6 pb-16 flex-1 flex flex-col"
      >
        {/* Top Floating Controls */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: -15 },
            show: { opacity: 1, y: 0 }
          }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              sounds.playClick();
              if (onBackToHome) onBackToHome();
            }}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/10 hover:border-[#e6b980]/50 hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-all backdrop-blur-md"
            aria-label="Back to main website"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#e6b980]" />
            <span>Back to Studio</span>
          </motion.button>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                sounds.playClick();
                setShowQrModal(true);
              }}
              className="p-2 rounded-full bg-white/[0.06] border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white transition-all backdrop-blur-md"
              title="Show QR Code"
              aria-label="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="group flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.06] border border-white/10 hover:border-[#e6b980]/50 hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-all backdrop-blur-md"
              title="Share this page"
              aria-label="Share this page"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#e6b980] group-hover:rotate-12 transition-transform" />
                  <span>Share</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Profile / Brand Header */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } }
          }}
          className="text-center mb-8"
        >
          {/* Glowing Avatar Emblem with Animated Pulse Ring */}
          <div className="relative inline-block mb-4">
            {/* Outer Pulsing Glow Ring */}
            <motion.div 
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#e6b980] via-[#f59e0b] to-[#2563eb] blur-md"
            />
            
            <motion.div 
              whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
              transition={{ duration: 0.4 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#e6b980] via-[#f59e0b] to-[#141414] shadow-[0_0_40px_rgba(230,185,128,0.3)] mx-auto flex items-center justify-center cursor-pointer"
            >
              <div className="w-full h-full rounded-full bg-[#0c0d14] flex items-center justify-center overflow-hidden border border-white/10 relative">
                <img
                  src={logoImg}
                  alt="AVSR VISION Logo"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter contrast-125 drop-shadow-md"
                />
              </div>
            </motion.div>
            
            {/* Verified icon pill with bounce */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, delay: 0.5 }}
              whileHover={{ scale: 1.25, rotate: 15 }}
              className="absolute bottom-1 right-1 p-1.5 rounded-full bg-[#0a0a0a] border border-[#e6b980] text-[#e6b980] shadow-lg cursor-pointer"
              title="Verified Creative Studio"
            >
              <ShieldCheck className="w-3.5 h-3.5 fill-[#e6b980]/20" />
            </motion.div>
          </div>

          {/* Studio Name */}
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-[0.18em] uppercase flex items-center justify-center gap-2">
            <motion.span
              animate={{ textShadow: ['0 0 10px rgba(230,185,128,0.2)', '0 0 25px rgba(230,185,128,0.6)', '0 0 10px rgba(230,185,128,0.2)'] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              AVSR VISION
            </motion.span>
          </h1>

          {/* Subtitle / Profession Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e6b980]/10 border border-[#e6b980]/30 text-[#e6b980] text-[11px] font-mono font-semibold uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(230,185,128,0.15)] cursor-default"
          >
            <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Creative Media & Production Studio</span>
          </motion.div>

          {/* Short Bio */}
          <p className="mt-3.5 text-neutral-300 text-xs sm:text-sm font-light leading-relaxed max-w-sm mx-auto">
            We Frame Moments, We Tell Stories. Award-winning commercial cinema, luxury weddings, aerial FPV & editorial photography.
          </p>

          {/* Studio Locations Pill Row */}
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-400">
            <MapPin className="w-3 h-3 text-[#e6b980] animate-bounce" />
            <span>Dubai (UAE) • International Operations</span>
          </div>
        </motion.div>

        {/* Primary Stacked Action Cards */}
        <motion.div 
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } }
          }}
          className="space-y-3.5 mb-10"
        >
          {primaryActions.map((action) => {
            const Icon = action.icon;
            const isExternal = action.href.startsWith('http') || action.href.startsWith('tel:') || action.href.startsWith('mailto:');

            return (
              <motion.a
                key={action.id}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.97 },
                  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
                }}
                whileHover={{ scale: 1.025, y: -3 }}
                whileTap={{ scale: 0.98 }}
                href={action.href}
                onClick={(e) => {
                  sounds.playClick();
                  if (action.onClick) {
                    e.preventDefault();
                    action.onClick();
                  }
                }}
                target={isExternal && !action.href.startsWith('tel:') && !action.href.startsWith('mailto:') ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`group relative overflow-hidden flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r ${action.gradient} border border-white/10 ${action.borderHover} backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(230,185,128,0.2)] transition-all duration-300`}
                data-cursor="GO"
              >
                {/* Shimmer Light Sweep on Hover */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" 
                />

                <div className="flex items-center gap-3.5 min-w-0 relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                    <Icon className="w-5 h-5 group-hover:rotate-6 transition-transform" />
                  </div>
                  <div className="text-left truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm sm:text-base font-bold text-white tracking-wide truncate group-hover:text-[#e6b980] transition-colors">
                        {action.title}
                      </span>
                      {action.badge && (
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white/15 text-[10px] font-mono uppercase tracking-wider text-white/90">
                          {action.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono font-medium text-white/90 truncate mt-0.5">
                      {action.subtitle}
                    </div>
                    <div className="text-[11px] text-white/60 truncate font-light mt-0.5">
                      {action.description}
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/25 transition-all shrink-0 ml-2 relative z-10">
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Section Divider: OFFICIAL INSTAGRAM HUB */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 }
          }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#e6b980] font-bold">
            Official Instagram
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </motion.div>

        {/* Featured Instagram Hero Card */}
        <motion.a
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 15 },
            show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } }
          }}
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          href={instagramChannel.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playClick()}
          className="group relative overflow-hidden flex flex-col p-5 rounded-3xl bg-gradient-to-br from-[#833ab4]/20 via-[#fd1d1d]/15 to-[#fcb045]/10 border border-pink-500/30 hover:border-pink-500/60 backdrop-blur-xl transition-all duration-300 shadow-[0_15px_35px_rgba(228,64,95,0.15)] mb-8"
          title="Follow @avsr421 on Instagram"
        >
          {/* Shimmer Light Sweep on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] p-[2px] shadow-lg group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-[14px] bg-[#0c0d14] flex items-center justify-center text-white">
                  {instagramChannel.icon}
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-black text-white tracking-wide group-hover:text-pink-400 transition-colors">
                    Instagram Feed
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Official
                  </span>
                </div>
                <div className="text-sm font-mono font-semibold text-[#e6b980] mt-0.5">
                  {instagramChannel.handle}
                </div>
                <div className="text-xs text-neutral-300 font-light mt-0.5">
                  Commercial Reels, BTS Shots & Editorial Work
                </div>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-pink-500 group-hover:text-white flex items-center justify-center text-neutral-300 transition-all shrink-0 ml-3">
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
        </motion.a>

        {/* Studio Info & Quick Details Card */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
          }}
          className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md mb-6 text-xs space-y-3.5 relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#e6b980] font-bold">
              Studio Details & Hub
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Accepting Bookings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-300">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#e6b980] shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-medium">Headquarters</span>
                <span className="text-[11px] text-neutral-400">D3 Design District, Tower 2, Dubai, UAE</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#e6b980] shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-medium">Working Hours</span>
                <span className="text-[11px] text-neutral-400">Mon – Sat: 9:00 AM – 7:00 PM GST</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-[#e6b980] shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-medium">Phone & WhatsApp</span>
                <a href="tel:0523406989" className="text-[11px] text-[#e6b980] hover:underline font-mono">
                  0523406989 (+971 52 340 6989)
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-[#e6b980] shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-medium">Direct Email</span>
                <a href="mailto:ayuvbastola14@gmail.com" className="text-[11px] text-[#e6b980] hover:underline font-mono">
                  ayuvbastola14@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Camera className="w-4 h-4 text-[#e6b980] shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-medium">Production Scope</span>
                <span className="text-[11px] text-neutral-400">8K Cinema, Drone FPV, Commercial Stills</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="pt-2 border-t border-white/5 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleDownloadVCard}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <Download className="w-3.5 h-3.5 text-[#e6b980]" />
              <span>Save Contact Card (.vcf)</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                sounds.playClick();
                if (onBackToHome) {
                  onBackToHome();
                  setTimeout(() => {
                    const el = document.querySelector('#services');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }
              }}
              className="py-2.5 px-4 rounded-xl bg-[#e6b980] hover:bg-[#f59e0b] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-lg active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Packages</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1 }
          }}
          className="text-center text-[11px] font-mono text-neutral-500 space-y-1"
        >
          <div>© {new Date().getFullYear()} AVSR VISION (AYUV STUDIOS)</div>
          <div className="text-neutral-600">All Rights Reserved • Crafted for Cinematic Excellence</div>
        </motion.div>
      </motion.div>

      {/* QR Code Modal */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-3xl bg-[#12141c] border border-white/15 p-6 text-center shadow-2xl space-y-4"
            >
              <button
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 p-2 mx-auto flex items-center justify-center">
                <img src={logoImg} alt="AVSR Logo" className="w-full h-full object-contain" />
              </div>

              <div>
                <h3 className="font-display text-lg font-bold text-white uppercase tracking-wider">
                  AVSR VISION Digital Card
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-1">
                  Scan with your mobile camera to open this connect page instantly.
                </p>
              </div>

              {/* QR Image rendering via quick api */}
              <div className="p-4 bg-white rounded-2xl inline-block shadow-inner">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(window.location.href)}&color=050505`}
                  alt="QR Code"
                  className="w-44 h-44 mx-auto"
                />
              </div>

              <div className="text-xs font-mono text-neutral-400 truncate bg-white/5 p-2 rounded-xl border border-white/5">
                {window.location.href}
              </div>

              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(window.location.href);
                    showToast('Link copied to clipboard!');
                    setShowQrModal(false);
                  } catch {
                    // Ignore
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-[#e6b980] hover:bg-[#f59e0b] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Page Link</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-[#1b1e2a] border border-[#e6b980]/50 text-white text-xs font-medium shadow-2xl flex items-center gap-2"
          >
            <Check className="w-3.5 h-3.5 text-[#e6b980]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
      'URL:https://avsrfilms.com',
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
      title: 'Visit Official Website',
      subtitle: 'avsrfilms.com',
      description: 'Explore 8K Showreels, Film Works & Live Pricing',
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

  const socialChannels = [
    {
      name: 'Instagram',
      handle: '@avsr421',
      href: 'https://www.instagram.com/avsr421/',
      color: '#E4405F',
      hoverBg: 'hover:bg-[#E4405F]/15 hover:border-[#E4405F]/40',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      )
    },
    {
      name: 'YouTube',
      handle: 'AVSR Vision',
      href: 'https://youtube.com',
      color: '#FF0000',
      hoverBg: 'hover:bg-[#FF0000]/15 hover:border-[#FF0000]/40',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <polygon points="10 15 15 12 10 9" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      handle: 'AVSR Vision',
      href: 'https://linkedin.com',
      color: '#0A66C2',
      hoverBg: 'hover:bg-[#0A66C2]/15 hover:border-[#0A66C2]/40',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: 'WhatsApp',
      handle: '+971 52 340 6989',
      href: 'https://wa.me/971523406989',
      color: '#25D366',
      hoverBg: 'hover:bg-[#25D366]/15 hover:border-[#25D366]/40',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    },
    {
      name: 'TikTok',
      handle: '@avsrfilms',
      href: 'https://www.tiktok.com',
      color: '#00F2FE',
      hoverBg: 'hover:bg-cyan-500/15 hover:border-cyan-400/40',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    },
    {
      name: 'X (Twitter)',
      handle: '@avsr_vision',
      href: 'https://x.com',
      color: '#FFFFFF',
      hoverBg: 'hover:bg-white/15 hover:border-white/40',
      icon: (
        <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
          <path d="M4 4l11.733 16h4.267l-11.733-16z" />
          <path d="M4 20l6.768-6.768m2.464-2.464L20 4" />
        </svg>
      )
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#06080e] text-[#f5f5f5] flex flex-col justify-between overflow-x-hidden selection:bg-[#e6b980]/30 selection:text-white">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#e6b980]/15 via-[#f59e0b]/5 to-transparent rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-t from-blue-600/10 via-indigo-600/5 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4 sm:px-6 pt-6 pb-16 flex-1 flex flex-col">
        {/* Top Floating Controls */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => {
              sounds.playClick();
              if (onBackToHome) onBackToHome();
            }}
            className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.06] border border-white/10 hover:border-[#e6b980]/50 hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-all backdrop-blur-md active:scale-95"
            aria-label="Back to main website"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-[#e6b980]" />
            <span>Back to Studio</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setShowQrModal(true);
              }}
              className="p-2 rounded-full bg-white/[0.06] border border-white/10 hover:border-white/30 text-neutral-300 hover:text-white transition-all backdrop-blur-md active:scale-95"
              title="Show QR Code"
              aria-label="Show QR Code"
            >
              <QrCode className="w-4 h-4" />
            </button>

            <button
              onClick={handleShare}
              className="group flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/[0.06] border border-white/10 hover:border-[#e6b980]/50 hover:bg-white/10 text-xs font-medium text-neutral-300 hover:text-white transition-all backdrop-blur-md active:scale-95"
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
            </button>
          </div>
        </div>

        {/* Profile / Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Glowing Avatar Emblem */}
          <div className="relative inline-block mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-[#e6b980] via-[#f59e0b] to-[#141414] shadow-[0_0_40px_rgba(230,185,128,0.25)] mx-auto flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0c0d14] flex items-center justify-center overflow-hidden border border-white/10">
                <img
                  src={logoImg}
                  alt="AVSR VISION Logo"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter contrast-125 drop-shadow-md"
                />
              </div>
            </div>
            {/* Verified icon pill */}
            <div
              className="absolute bottom-1 right-1 p-1.5 rounded-full bg-[#0a0a0a] border border-[#e6b980] text-[#e6b980] shadow-md"
              title="Verified Creative Studio"
            >
              <ShieldCheck className="w-3.5 h-3.5 fill-[#e6b980]/20" />
            </div>
          </div>

          {/* Studio Name */}
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-[0.18em] uppercase flex items-center justify-center gap-2">
            <span>AVSR VISION</span>
          </h1>

          {/* Subtitle / Profession Badge */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e6b980]/10 border border-[#e6b980]/30 text-[#e6b980] text-[11px] font-mono font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3" />
            <span>Creative Media & Production Studio</span>
          </div>

          {/* Short Bio */}
          <p className="mt-3.5 text-neutral-300 text-xs sm:text-sm font-light leading-relaxed max-w-sm mx-auto">
            We Frame Moments, We Tell Stories. Award-winning commercial cinema, luxury weddings, aerial FPV & editorial photography.
          </p>

          {/* Studio Locations Pill Row */}
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-400">
            <MapPin className="w-3 h-3 text-[#e6b980]" />
            <span>Dubai (UAE) • International Operations</span>
          </div>
        </motion.div>

        {/* Primary Stacked Action Cards */}
        <div className="space-y-3.5 mb-10">
          {primaryActions.map((action, idx) => {
            const Icon = action.icon;
            const isExternal = action.href.startsWith('http') || action.href.startsWith('tel:') || action.href.startsWith('mailto:');

            return (
              <motion.a
                key={action.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * idx }}
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
                className={`group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r ${action.gradient} border border-white/10 ${action.borderHover} backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 transition-all duration-300`}
                data-cursor="GO"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-sm sm:text-base font-bold text-white tracking-wide truncate">
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

                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/20 transition-all shrink-0 ml-2">
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Section Divider: CONNECT SOCIALLY */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#e6b980] font-bold">
            Connect Socially
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        {/* Social Media 6-Tile Grid (Just like drulhasorthopedic.com/social-media) */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {socialChannels.map((soc, idx) => (
            <motion.a
              key={soc.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + idx * 0.04 }}
              href={soc.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sounds.playClick()}
              className={`group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 ${soc.hoverBg} backdrop-blur-md hover:-translate-y-1 transition-all duration-300 text-center`}
              title={`${soc.name} - ${soc.handle}`}
            >
              <div
                className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"
                style={{ color: soc.color }}
              >
                {soc.icon}
              </div>
              <span className="font-display text-xs font-bold text-white group-hover:text-[#e6b980] transition-colors">
                {soc.name}
              </span>
              <span className="text-[10px] font-mono text-neutral-400 truncate w-full mt-0.5">
                {soc.handle}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Studio Info & Quick Details Card */}
        <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md mb-6 text-xs space-y-3.5">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#e6b980] font-bold">
              Studio Details & Hub
            </span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
            <button
              onClick={handleDownloadVCard}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5 text-[#e6b980]" />
              <span>Save Contact Card (.vcf)</span>
            </button>

            <button
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
              className="py-2.5 px-4 rounded-xl bg-[#e6b980] hover:bg-[#f59e0b] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Packages</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center text-[11px] font-mono text-neutral-500 space-y-1">
          <div>© {new Date().getFullYear()} AVSR VISION (AYUV STUDIOS)</div>
          <div className="text-neutral-600">All Rights Reserved • Crafted for Cinematic Excellence</div>
        </div>
      </div>

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

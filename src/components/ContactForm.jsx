import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, DollarSign, Send, CheckCircle2, ChevronRight,
  ChevronLeft, Sparkles, MessageCircle, AlertCircle, Film,
  Clock, MapPin, User, Mail, Phone, Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../utils/soundEffects';

export default function ContactForm({ initialPackageData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    eventType: 'commercial',
    customEventNote: '',
    date: '',
    location: '',
    timeline: 'Standard (2-3 Weeks)',
    budget: '$6,000 - $12,000',
    selectedPackage: '',
    selectedAddons: [],
    fullName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  // Pre-fill if coming from Pricing package selection
  useEffect(() => {
    if (initialPackageData) {
      setFormData((prev) => ({
        ...prev,
        selectedPackage: initialPackageData.tier || '',
        budget: initialPackageData.price ? `$${initialPackageData.price.toLocaleString()}` : prev.budget,
        selectedAddons: initialPackageData.addons || []
      }));
    }
  }, [initialPackageData]);

  const eventTypes = [
    { id: 'commercial', label: 'Commercial & Brand Film', icon: '🎬' },
    { id: 'wedding', label: 'Luxury Destination Wedding', icon: '💍' },
    { id: 'drone', label: 'Aerial & High-Speed FPV', icon: '🛸' },
    { id: 'editorial', label: 'Fashion & Editorial Stills', icon: '📸' },
    { id: 'documentary', label: 'Documentary / Narrative', icon: '🎞️' },
  ];

  const budgetTiers = [
    { label: '$3,500 – $6,000', desc: 'Boutique single-day shoots & portraits' },
    { label: '$6,000 – $12,000', desc: 'Signature commercial campaigns & weddings' },
    { label: '$12,000 – $25,000', desc: 'Multi-day productions & heavy aerials' },
    { label: '$25,000+ Masterpiece', desc: 'Full cinema crew, global travel & feature scale' },
  ];

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.eventType) newErrors.eventType = 'Please select a project type';
    }

    if (step === 2) {
      if (!formData.date) newErrors.date = 'Please select an estimated date';
      if (!formData.location.trim()) newErrors.location = 'Please specify shoot location or city';
    }

    if (step === 3) {
      if (!formData.budget) newErrors.budget = 'Please select an anticipated investment range';
    }

    if (step === 4) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please provide a valid email address';
      }
      if (!formData.message.trim()) newErrors.message = 'Please provide brief details about your vision';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      sounds.playClick();
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    sounds.playClick();
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    sounds.playShutter();
    setIsSubmitted(true);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#e6b980', '#ffffff', '#f59e0b', '#ffd700']
      });
    } catch {
      // Fallback
    }
  };

  const handleWhatsAppDirect = () => {
    sounds.playClick();
    const text = `Hello AYUV Studios! I would like to inquire about booking a ${formData.eventType} project on ${formData.date || 'TBD'} in ${formData.location || 'TBD'}. Budget: ${formData.budget}. Name: ${formData.fullName || 'Prospective Client'}.`;
    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#080808] border-t border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-[#e6b980] mb-3">
            <span className="w-6 h-[1.5px] bg-[#e6b980]" />
            <span>Commission & Inquiries</span>
            <span className="w-6 h-[1.5px] bg-[#e6b980]" />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            Book Your Shoot
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            Tell us about your production vision, timeline, and location. Our directors review inquiries within 24 hours.
          </p>
        </div>

        {/* Multi-Step Wizard Container */}
        <div className="rounded-3xl bg-[#121212] border border-white/10 p-6 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#e6b980]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Stepper Progress Bar */}
          {!isSubmitted && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3 text-xs font-mono uppercase tracking-wider text-neutral-400">
                <span className={currentStep >= 1 ? 'text-[#e6b980] font-bold' : ''}>1. Project Type</span>
                <span className={currentStep >= 2 ? 'text-[#e6b980] font-bold' : ''}>2. Date & Venue</span>
                <span className={currentStep >= 3 ? 'text-[#e6b980] font-bold' : ''}>3. Investment</span>
                <span className={currentStep >= 4 ? 'text-[#e6b980] font-bold' : ''}>4. Brief & Info</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#e6b980] to-[#f59e0b]"
                  initial={{ width: '25%' }}
                  animate={{ width: `${(currentStep / 4) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}

          {/* Form Content / Multi-Step Wizard */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* STEP 1: Project Type */}
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        What type of visual production are you planning?
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Select the primary format so we can assign the specialized director and gear package.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {eventTypes.map((type) => (
                        <div
                          key={type.id}
                          onClick={() => {
                            sounds.playClick();
                            setFormData({ ...formData, eventType: type.id });
                          }}
                          className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-4 transition-all ${
                            formData.eventType === type.id
                              ? 'bg-[#e6b980]/15 border-[#e6b980] text-white shadow-[0_0_20px_rgba(230,185,128,0.2)]'
                              : 'bg-white/[0.02] border-white/5 text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]'
                          }`}
                        >
                          <span className="text-2xl">{type.icon}</span>
                          <span className="font-medium text-sm">{type.label}</span>
                        </div>
                      ))}
                    </div>

                    {errors.eventType && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.eventType}</span>
                      </p>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: Date, Location & Timeline */}
                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        When and where is the production taking place?
                      </h3>
                      <p className="text-xs text-neutral-400">
                        We travel globally. Let us know the location so we can check airspace and logistics.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                          Estimated Date or Shoot Window *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#e6b980] transition-colors"
                          />
                        </div>
                        {errors.date && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.date}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                          Location / Venue / City *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g., Lake Como, Italy or Studio NY"
                            className="w-full pl-10 pr-4 py-3 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#e6b980] transition-colors"
                          />
                        </div>
                        {errors.location && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.location}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
                        Delivery Speed Preference
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-4 py-3 bg-[#181818] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#e6b980]"
                      >
                        <option value="Standard (2-3 Weeks)">Standard Delivery (2-3 Weeks Post-Production)</option>
                        <option value="Priority (7 Days)">Priority Express (7 Days Rough Cut)</option>
                        <option value="Rush (48-72 Hours)">VIP Rush (48-72 Hours Master)</option>
                      </select>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Investment Budget */}
                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        What is your anticipated production investment?
                      </h3>
                      <p className="text-xs text-neutral-400">
                        This helps us tailor camera packages, crew size, and aerial permissions.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {budgetTiers.map((tier) => (
                        <div
                          key={tier.label}
                          onClick={() => {
                            sounds.playClick();
                            setFormData({ ...formData, budget: tier.label });
                          }}
                          className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                            formData.budget === tier.label
                              ? 'bg-[#e6b980]/15 border-[#e6b980] text-white shadow-[0_0_20px_rgba(230,185,128,0.2)]'
                              : 'bg-white/[0.02] border-white/5 text-neutral-300 hover:border-white/20 hover:bg-white/[0.04]'
                          }`}
                        >
                          <span className="font-display font-bold text-base text-white block">
                            {tier.label}
                          </span>
                          <span className="text-xs text-neutral-400 font-light mt-1 block">
                            {tier.desc}
                          </span>
                        </div>
                      ))}
                    </div>

                    {formData.selectedPackage && (
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-[#e6b980]/30 flex items-center justify-between text-xs">
                        <span className="text-neutral-400 font-mono">Selected Base Tier:</span>
                        <span className="text-[#e6b980] font-bold">{formData.selectedPackage}</span>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 4: Contact Details & Creative Brief */}
                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-display text-xl font-bold text-white mb-2">
                        Your Contact Information & Vision Brief
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Direct communication with our director of photography.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder="e.g. Elena Moreau"
                          className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#e6b980]"
                        />
                        {errors.fullName && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.fullName}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="elena@company.com"
                          className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#e6b980]"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                          Phone / WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#e6b980]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                          Brand / Organization / Couple Name
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Porsche Media or Sarah & David"
                          className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#e6b980]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Creative Brief & Specific Requests *
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about the narrative vibe, specific shots needed (e.g. FPV chase, 100MP stills), reference films, or special deliverables..."
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#e6b980]"
                      />
                      {errors.message && (
                        <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-300 hover:text-white bg-white/5 hover:bg-white/10 flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="text-xs font-mono text-[#e6b980] hover:underline flex items-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Or Chat Directly via WhatsApp</span>
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-black bg-[#e6b980] hover:bg-[#f59e0b] shadow-lg flex items-center gap-2"
                  >
                    <span>Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-[0.18em] text-black bg-gradient-to-r from-[#e6b980] via-[#f59e0b] to-[#e6b980] hover:shadow-[0_0_30px_rgba(230,185,128,0.6)] flex items-center gap-2 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Commission Inquiry</span>
                  </button>
                )}
              </div>
            </form>
          ) : (
            /* Submission Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-6"
            >
              <div className="w-20 h-20 rounded-full bg-[#e6b980]/20 border-2 border-[#e6b980] flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(230,185,128,0.4)]">
                <CheckCircle2 className="w-10 h-10 text-[#e6b980]" />
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  Commission Inquiry Received!
                </h3>
                <p className="mt-2 text-sm text-neutral-300 max-w-md mx-auto font-light">
                  Thank you, <span className="text-[#e6b980] font-semibold">{formData.fullName}</span>. Our lead director has logged your {formData.eventType} shoot request for {formData.location || 'your venue'}.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-md mx-auto text-xs font-mono text-neutral-400 space-y-1">
                <div>Reference ID: <span className="text-white font-bold">#AYUV-{Math.floor(100000 + Math.random() * 900000)}</span></div>
                <div>Review Window: <span className="text-[#e6b980]">Within 24 Hours</span></div>
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={handleWhatsAppDirect}
                  className="px-6 py-3 rounded-full text-xs font-bold text-black bg-[#e6b980] flex items-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation to WhatsApp</span>
                </button>

                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setCurrentStep(1);
                  }}
                  className="px-6 py-3 rounded-full text-xs font-medium text-white bg-white/10 hover:bg-white/15"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

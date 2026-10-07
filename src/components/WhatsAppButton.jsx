import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    sounds.playClick();
    const message = encodeURIComponent(
      "Hello AYUV Studios! I'm interested in commissioning a photography/videography project. Could you share your availability?"
    );
    window.open(`https://wa.me/1234567890?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Interactive Tooltip bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#141414] border border-[#25D366]/40 text-xs text-white shadow-2xl backdrop-blur-md animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Quick Chat with Lead Producer</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-neutral-400 hover:text-white ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative w-14 h-14 rounded-full bg-[#121212] border-2 border-[#25D366] flex items-center justify-center text-[#25D366] shadow-[0_10px_30px_rgba(0,0,0,0.8)] hover:bg-[#25D366] hover:text-black transition-all duration-300 active:scale-95"
        title="Chat on WhatsApp"
        data-cursor="CHAT"
      >
        <MessageCircle className="w-7 h-7" />

        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-30 pointer-events-none" />
      </button>
    </div>
  );
}

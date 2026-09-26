import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Send } from 'lucide-react';

interface FloatingCTAProps {
  onOpenBooking: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 sm:left-auto sm:right-6 max-w-md animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2 p-2 rounded-2xl bg-[#0F1A2E]/95 backdrop-blur-md border border-sky-500/30 shadow-2xl">
        <a
          href="tel:+380678904433"
          className="flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold border border-white/10 transition-colors"
          aria-label="Зателефонувати"
        >
          <Phone className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="font-mono-numbers tracking-tight sm:inline">067 890 44 33</span>
        </a>

        <a
          href="https://t.me/plaksa_sergiy"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-sky-950 hover:bg-sky-900 text-sky-400 border border-sky-800 flex items-center justify-center transition-colors"
          aria-label="Telegram"
        >
          <Send className="w-4 h-4" />
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-sky-500/25 transition-all active:scale-95"
        >
          <Calendar className="w-4 h-4 shrink-0" />
          <span>На замір</span>
        </button>
      </div>
    </div>
  );
};

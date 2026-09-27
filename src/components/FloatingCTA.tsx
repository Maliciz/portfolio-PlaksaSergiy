import React, { useState, useEffect } from 'react';
import { Phone, ArrowUpRight, Send } from 'lucide-react';

interface FloatingCTAProps {
  onOpenBooking: () => void;
}

export const FloatingCTA: React.FC<FloatingCTAProps> = ({ onOpenBooking }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-neutral-900/90 dark:bg-black/90 backdrop-blur-xl border border-white/15 shadow-2xl text-white">
        <a
          href="tel:+380678904433"
          className="hidden sm:flex items-center gap-2 py-2 px-3.5 rounded-full hover:bg-white/10 transition-colors text-xs font-mono-numbers text-neutral-300 hover:text-white"
          aria-label="Зателефонувати"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>(067) 890-44-33</span>
        </a>

        <a
          href="https://t.me/plaksasergiy"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-neutral-300 hover:text-white"
          aria-label="Telegram"
        >
          <Send className="w-3.5 h-3.5" />
        </a>

        <button
          onClick={onOpenBooking}
          className="flex items-center gap-2 py-2 px-4 rounded-full bg-white text-neutral-900 hover:bg-neutral-200 transition-colors text-xs font-bold uppercase tracking-wider shadow-sm"
        >
          <span>Замовити замір</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

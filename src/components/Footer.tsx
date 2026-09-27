import React from 'react';
import { Phone, MapPin, Send, MessageCircle, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacts" className="bg-white border-t border-neutral-200 py-16 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-neutral-200">
          
          {/* Col 1: Plumber Bio */}
          <div>
            <span className="font-display font-extrabold text-xl uppercase tracking-tight block">
              «Ваш Сантехнік»
            </span>
            <span className="font-mono-numbers text-xs text-neutral-500 uppercase tracking-architectural block mt-1 mb-4">
              Сергій Плакса • Приватний майстер
            </span>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              Професійний монтаж та заміна бойлерів, насосних станцій, розведення мідних та PEX труб, встановлення інсталяцій, підвісних унітазів та систем опалення по Києву та області.
            </p>
          </div>

          {/* Col 2: Contacts & Messengers */}
          <div>
            <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 block mb-3 font-bold">
              Прямий контакт
            </span>
            
            <a 
              href="tel:+380678904433" 
              className="text-lg font-mono-numbers font-bold text-black hover:underline flex items-center gap-2 mb-2"
            >
              <Phone className="w-4 h-4" />
              <span>(067) 890-44-33</span>
            </a>

            <p className="text-xs text-neutral-600 mb-4 font-mono-numbers">
              Графік виїздів: щодня з 08:00 до 20:00 (без вихідних)
            </p>

            <div className="flex gap-2">
              <a
                href="https://t.me/plaksasergiy"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono-numbers uppercase tracking-wider flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>

              <a
                href="viber://chat?number=%2B380678904433"
                className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-mono-numbers uppercase tracking-wider flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Viber</span>
              </a>
            </div>
          </div>

          {/* Col 3: Coverage */}
          <div>
            <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 block mb-3 font-bold">
              Географія виїздів
            </span>

            <div className="space-y-1.5 text-xs text-neutral-600 font-mono-numbers">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Правий та лівий берег Києва (всі райони)</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Ірпінь, Буча, Гостомель, Ворзель</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Софіївська та Петропавлівська Борщагівка</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Бровари, Бориспіль, Вишгород, Козин</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-numbers text-neutral-500">
          <div>
            © {new Date().getFullYear()} Сергій Плакса — Сантехнічні роботи в Києві.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-black hover:underline uppercase tracking-wider font-bold"
          >
            <span>Нагору</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

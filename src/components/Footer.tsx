import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  ShieldCheck, 
  Wrench,
  Calendar,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const coverageAreas = [
    'Київ (усі райони: Печерськ, Оболонь, Позняки, Поділ, Шевченківський)',
    'Ірпінь та Буча',
    'Софіївська та Петропавлівська Борщагівка',
    'Вишневе та Крюківщина',
    'Бровари та Бориспіль',
    'Вишгород, Козин, Обухів',
  ];

  return (
    <footer id="contacts" className="bg-[#070D17] border-t border-white/10 pt-20 pb-12 relative text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency & Booking Banner inside Footer */}
        <div className="rounded-2xl p-8 bg-gradient-to-r from-sky-950/70 via-slate-900 to-amber-950/50 border border-sky-500/20 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="max-w-2xl text-center lg:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-2">
              Потрібна консультація на об'єкті?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Замовте безкоштовний виїзд та точний кошторис
            </h3>
            <p className="text-slate-300 text-sm mt-2">
              Приїду в зручний для вас час із лазерним рівнем та тепловізором. Обговоримо розводку, траси та оптимізацію витрат.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-xl shadow-sky-500/30 flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Записатися на замір</span>
            </button>
            <a
              href="tel:+380678904433"
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-white/10 transition-all font-mono-numbers"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>(067) 890-44-33</span>
            </a>
          </div>
        </div>

        {/* 4-column footer body */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/5">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold text-white block">Сергій Плакса</span>
                <span className="text-xs text-slate-400">Інженерна сантехніка</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Монтаж систем опалення, водопостачання, котелень та систем очистки води за стандартами DIN та ДБН. Більше 10 років бездоганного досвіду.
            </p>

            <div className="pt-2">
              <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4" /> Робота за офіційним договором та гарантія 5 років
              </span>
            </div>
          </div>

          {/* Col 2: Direct Contacts & Messengers */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Контакти майстра
            </h4>
            
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="tel:+380678904433" 
                  className="flex items-center gap-2.5 text-white hover:text-sky-400 transition-colors font-mono-numbers font-semibold"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>+38 (067) 890-44-33</span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:plaksa.sergiy.pro@gmail.com" 
                  className="flex items-center gap-2.5 text-slate-300 hover:text-sky-400 transition-colors text-xs"
                >
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span>plaksa.sergiy.pro@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-200 block">Пн–Сб: 08:00 – 20:00</span>
                  <span className="text-amber-400 font-medium">Аварійні виклики — 24/7</span>
                </div>
              </li>
            </ul>

            {/* Messengers buttons */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href="https://t.me/plaksa_sergiy"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-sky-950/80 hover:bg-sky-900 border border-sky-800 text-sky-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
              <a
                href="viber://chat?number=%2B380678904433"
                className="px-3 py-1.5 rounded-lg bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Viber</span>
              </a>
            </div>
          </div>

          {/* Col 3: Service Geography */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Географія виїзду
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              {coverageAreas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Розділи сайту
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a href="#services" className="hover:text-sky-400 transition-colors">Послуги</a>
              <a href="#portfolio" className="hover:text-sky-400 transition-colors">Портфоліо</a>
              <a href="#advantages" className="hover:text-sky-400 transition-colors">Переваги</a>
              <a href="#calculator" className="hover:text-sky-400 transition-colors">Калькулятор</a>
              <a href="#pricing" className="hover:text-sky-400 transition-colors">Прайс</a>
              <a href="#reviews" className="hover:text-sky-400 transition-colors">Відгуки</a>
            </div>
            
            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Вгору сторінки</span>
              </button>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Сергій Плакса. Всі права захищено. Професійна інженерна сантехніка.
          </div>
          <div className="flex items-center gap-6">
            <span>Договір публічної оферти</span>
            <span>Політика конфіденційності</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

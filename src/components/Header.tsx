import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Wrench } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Послуги', href: '#services' },
    { label: 'Портфоліо', href: '#portfolio' },
    { label: 'Переваги', href: '#advantages' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'Прайс', href: '#pricing' },
    { label: 'Відгуки', href: '#reviews' },
    { label: 'Контакти', href: '#contacts' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Emergency notification bar */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 text-xs sm:text-sm font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-sm">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900"></span>
        </span>
        <span>Терміновий аварійний виїзд по Києву та області — прибуття від 45 хв</span>
        <span className="hidden md:inline text-slate-900 font-bold">| Без вихідних</span>
        <a 
          href="tel:+380678904433" 
          className="ml-2 underline font-bold hover:text-white transition-colors"
        >
          067 890 44 33
        </a>
      </div>

      {/* Main sticky navigation */}
      <div 
        className={`transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-[#0B1320]/95 backdrop-blur-md border-white/10 shadow-xl py-3' 
            : 'bg-[#0B1320]/80 backdrop-blur-sm border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 group-hover:scale-105 transition-transform duration-200">
                <Wrench className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-sky-400 transition-colors">
                    Сергій Плакса
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
                    Pro
                  </span>
                </div>
                <span className="text-xs text-slate-400 tracking-wider font-medium">
                  Інженерна сантехніка та монтаж
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-sky-400 transition-colors duration-150 py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions: Quick call & CTA */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="tel:+380678904433"
                className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-sky-400 transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/50"
              >
                <Phone className="w-4 h-4 text-sky-400 animate-pulse" />
                <span className="font-mono-numbers tracking-tight">(067) 890-44-33</span>
              </a>

              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white text-sm font-bold shadow-lg shadow-sky-600/25 transition-all duration-200 active:scale-95 border border-sky-400/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Викликати майстра</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => onOpenBooking()}
                className="p-2 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20"
                aria-label="Викликати майстра"
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800/80 text-slate-200 hover:text-white hover:bg-slate-800"
                aria-label="Меню"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0B1320] border-b border-white/10 px-5 pt-3 pb-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800/60 hover:text-sky-400"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-3">
            <a
              href="tel:+380678904433"
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/90 text-white font-semibold text-base"
            >
              <Phone className="w-5 h-5 text-sky-400" />
              <span className="font-mono-numbers">+38 (067) 890-44-33</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-base shadow-lg shadow-sky-500/25"
            >
              <Calendar className="w-5 h-5" />
              <span>Записатися на замір</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

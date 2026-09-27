import React, { useState } from 'react';
import { Phone, ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Роботи', href: '#works' },
    { label: 'Як це працює', href: '#how-it-works' },
    { label: 'Послуги та ціни', href: '#services' },
    { label: 'Запис на виїзд', href: '#booking' },
    { label: 'Контакти', href: '#contacts' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white border-b border-neutral-200">
      {/* Top subtle bar */}
      <div className="bg-neutral-100 border-b border-neutral-200 py-1.5 px-4 text-xs font-mono-numbers text-neutral-600 flex items-center justify-between max-w-7xl mx-auto">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-black" />
          <span>«Ваш Сантехнік» — Київ та область • Виїзд щодня з 08:00 до 20:00</span>
        </span>
        <a 
          href="tel:+380678904433" 
          className="font-bold text-neutral-900 hover:underline font-mono-numbers"
        >
          (067) 890-44-33
        </a>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="bg-black text-white px-2.5 py-1.5 font-display font-extrabold text-lg tracking-tight uppercase border border-black group-hover:bg-neutral-800 transition-colors">
            ВС
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg sm:text-xl text-black tracking-tight uppercase flex items-center gap-2 leading-none">
              <span>Ваш Сантехнік</span>
              <span className="text-[10px] font-mono-numbers font-semibold border border-black px-1.5 py-0.5 text-neutral-900 tracking-normal hidden sm:inline-block">
                СЕРГІЙ ПЛАКСА
              </span>
            </span>
            <span className="font-mono-numbers text-[10px] sm:text-[11px] text-neutral-500 uppercase tracking-architectural mt-1">
              Бойлери • Насоси • Труби • Опалення
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs uppercase font-mono-numbers tracking-wider text-neutral-700 hover:text-black transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:+380678904433"
            className="flex items-center gap-1.5 text-xs font-mono-numbers text-neutral-800 hover:text-black font-semibold"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>067 890 44 33</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 transition-colors flex items-center gap-1.5"
          >
            <span>Записатися</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-black border border-black"
          aria-label="Меню"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-black p-5 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase font-mono-numbers text-neutral-800 hover:text-black py-1 border-b border-neutral-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full bg-black text-white text-xs font-bold uppercase py-3 flex items-center justify-center gap-2"
            >
              <span>Записатися на виїзд</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+380678904433"
              className="text-center font-mono-numbers text-xs text-neutral-800 py-2 border border-neutral-300"
            >
              (067) 890-44-33
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

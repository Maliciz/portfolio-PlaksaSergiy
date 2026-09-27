import React from 'react';
import { ArrowUpRight, ArrowDown, Check } from 'lucide-react';

interface HeroProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="bg-white border-b border-neutral-200 pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Top Tag */}
        <div className="mb-6 flex flex-wrap items-center gap-2 font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500">
          <span className="bg-black text-white px-2 py-0.5 font-bold">ВАШ САНТЕХНІК</span>
          <span>•</span>
          <span>Сергій Плакса</span>
          <span>/</span>
          <span>Київ та передмістя</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-black tracking-tight leading-[1.02] uppercase mb-6">
              «Ваш Сантехнік» у Києві: бойлери, насоси, труби, унітази
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl mb-8">
              Приватний майстер Сергій Плакса. Професійний монтаж та заміна бойлерів, насосних станцій, прихованих інсталяцій, підвісних унітазів, колекторного розведення труб та систем опалення. Без посередників, акуратно та за фіксованим кошторисом.
            </p>

            {/* Quick Specialization Tags */}
            <div className="flex flex-wrap gap-2 mb-10">
              {[
                'Встановлення бойлерів',
                'Насоси та автоматика',
                'Колектори та труби',
                'Підвісні унітази та інсталяції',
                'Опалення та радіатори',
              ].map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-neutral-100 border border-neutral-300 text-xs font-mono-numbers text-neutral-800 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons (0px radius) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => onOpenBooking('Консультація / Замір')}
                className="bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Викликати майстра</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href="#how-it-works"
                className="border border-black text-black hover:bg-neutral-100 text-xs font-bold uppercase tracking-wider px-8 py-4 flex items-center justify-center gap-2 transition-colors"
              >
                <span>Як це працює</span>
                <ArrowDown className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Plumber Guarantees */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-neutral-200 w-full text-xs font-mono-numbers text-neutral-700">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black shrink-0" />
                <span>10+ років досвіду</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black shrink-0" />
                <span>Прямий контакт</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black shrink-0" />
                <span>Фіксована ціна</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-black shrink-0" />
                <span>Гарантія 3 роки</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sharp Plumber Photography Card */}
          <div className="lg:col-span-5">
            <div className="border border-black p-2 bg-neutral-50 shadow-none">
              <div className="relative aspect-[4/4] overflow-hidden bg-neutral-200">
                <img
                  src={`${import.meta.env.BASE_URL}images/boiler-system.jpg`}
                  alt="«Ваш Сантехнік» — монтаж водонагрівача, бойлера та мідних труб"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-black p-4 text-black">
                  <div className="flex items-center justify-between text-xs font-mono-numbers uppercase tracking-wider">
                    <span className="font-bold">«Ваш Сантехнік» • Обв'язка бойлера</span>
                    <span>Київ</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-1">
                    Монтаж бойлера непрямого нагріву, мідних магістралей, циркуляційних насосів та групи безпеки.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

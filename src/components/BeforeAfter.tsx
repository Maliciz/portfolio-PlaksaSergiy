import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, Check, X } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-28 sm:py-36 bg-transparent border-t border-neutral-200 dark:border-neutral-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 dark:text-neutral-400 block mb-4">
            05 / Visual Proof
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-serif text-neutral-900 dark:text-white tracking-editorial leading-tight">
            Інженерна культура проти типового ремонту
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            Перетягніть повзунок праворуч чи ліворуч, щоб оцінити різницю між хаотичною розводкою від забудовника та прецизійним інженерним вузлом.
          </p>
        </div>

        {/* Minimalist Slider Container */}
        <div className="max-w-5xl mx-auto">
          <div 
            ref={containerRef}
            className="relative h-[360px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-neutral-300 dark:border-neutral-800 shadow-2xl bg-neutral-950"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* AFTER Layer (Right side underneath) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=80"
                alt="Після: Преміальний інженерний вузол"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-5 right-5 bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-mono-numbers tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-lg">
                Стандарт Сергія Плакси
              </div>
            </div>

            {/* BEFORE Layer (Left side clipped via CSS clip-path) */}
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
                alt="До: Монтаж від забудовника"
                className="w-full h-full object-cover filter contrast-110 grayscale-[0.4]"
              />
              <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-md border border-white/15 text-neutral-300 text-xs font-mono-numbers tracking-widest uppercase px-3.5 py-1.5 rounded-full shadow-lg">
                Монтаж від забудовника
              </div>
            </div>

            {/* Hairline Divider & Minimalist Handle */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow-xl border border-neutral-300">
                <SlidersHorizontal className="w-4 h-4 rotate-90" />
              </div>
            </div>
          </div>

          {/* Minimalist Comparison Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="p-6 sm:p-8 rounded-xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800">
              <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-400 dark:text-neutral-500 block mb-3">
                Типовий монтаж від забудовника
              </span>
              <ul className="space-y-3 font-light text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Трійникова схема: перепад тиску при одночасному включенні душу й кухні</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Дешевий поліпропілен із ризиком завуження прохідного перерізу під час пайки</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <X className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>Відсутність редукторів тиску, захисту від гідроударів та датчиків протікання</span>
                </li>
              </ul>
            </div>

            <div className="p-6 sm:p-8 rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80 border border-neutral-300 dark:border-neutral-700">
              <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-900 dark:text-white font-medium block mb-3">
                Інженерний стандарт Сергія Плакси
              </span>
              <ul className="space-y-3 font-light text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Променевий розподіл FAR: стабільні 3.0 бар у всіх 14 точках одночасно</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Труби Rehau Rautitan Stabil з натяжною гільзою — 50 років безаварійної служби</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Інтеграція бездротових електрокранів Ajax WaterStop: перекриття за 3 секунди</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

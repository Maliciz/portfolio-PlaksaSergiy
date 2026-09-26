import React, { useState, useRef, useCallback } from 'react';
import { SlidersHorizontal, AlertTriangle, ShieldCheck, Check } from 'lucide-react';

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
    <section className="py-24 bg-[#0B1320] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Наочна різниця в деталях</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Інженерна точність проти типового ремонту
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Перетягніть повзунок, щоб побачити трансформацію розподільчого вузла в ЖК «Варшавський Плюс».
          </p>
        </div>

        {/* Interactive Slider Container */}
        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="relative h-[340px] sm:h-[480px] lg:h-[540px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-white/20 shadow-2xl"
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* "AFTER" Layer (Full width behind) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1400&q=80"
                alt="ПІСЛЯ: Професійний інженерний вузол"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-sky-950/90 border border-sky-400/40 text-sky-300 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>ПІСЛЯ: Монтаж Сергія Плакси</span>
              </div>
            </div>

            {/* "BEFORE" Layer (Clipped width based on slider) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full" style={{ width: containerRef.current?.clientWidth || '100%' }}>
                <img
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1400&q=80"
                  alt="ДО: Хаотична розводка від забудовника"
                  className="w-full h-full object-cover filter contrast-125 sepia-[0.3]"
                />
                <div className="absolute top-4 left-4 bg-rose-950/90 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>ДО: Труби від забудовника</span>
                </div>
              </div>
            </div>

            {/* Divider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)] z-20"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xl border-2 border-sky-500 cursor-ew-resize">
                <SlidersHorizontal className="w-5 h-5 text-sky-600 rotate-90" />
              </div>
            </div>
          </div>

          {/* Comparison Details Underneath */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="rounded-xl p-5 bg-rose-950/20 border border-rose-900/30">
              <h4 className="text-base font-bold text-rose-400 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-4 h-4" /> Типовий дешевий монтаж:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                <li className="flex items-center gap-2">✕ Трійникова схема — падіння напору під час миття посуду</li>
                <li className="flex items-center gap-2">✕ Відсутність редукторів — ризик прориву під тиском міськводоканалу</li>
                <li className="flex items-center gap-2">✕ Дешеві крани силумін, які розсипаються через 2 роки</li>
                <li className="flex items-center gap-2">✕ Жодної гарантії та відповідальності майстра</li>
              </ul>
            </div>

            <div className="rounded-xl p-5 bg-sky-950/30 border border-sky-800/40">
              <h4 className="text-base font-bold text-sky-400 flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4" /> Інженерний стандарт Сергія:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
                <li className="flex items-center gap-2 text-sky-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Колектори FAR — однаковий тиск у всіх точках одночасно
                </li>
                <li className="flex items-center gap-2 text-sky-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Захист Ajax — автоматичне перекриття за 3 секунди
                </li>
                <li className="flex items-center gap-2 text-sky-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Зшитий поліетилен Rehau з натяжною гільзою без протікань
                </li>
                <li className="flex items-center gap-2 text-sky-300">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" /> Гарантія 5 років за офіційним договором
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

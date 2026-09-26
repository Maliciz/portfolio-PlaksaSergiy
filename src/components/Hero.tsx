import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  CheckCircle2
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const trustStats = [
    { value: '10+', label: 'років досвіду в інженерних мережах' },
    { value: '500+', label: 'зданих об\'єктів без рекламацій' },
    { value: '100%', label: 'дотримання термінів за договором' },
    { value: '10 бар', label: 'обов\'язкове гідравлічне опресування' },
  ];

  return (
    <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden bg-[#0B1320] bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-sky-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <motion.div 
            className="lg:col-span-7 flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Experience & Trust Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-950/70 border border-sky-400/30 text-sky-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
              <span>✓ Понад 10 років досвіду | Гарантія на монтаж 5 років</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12] mb-6">
              Надійні сантехнічні рішення{' '}
              <span className="bg-gradient-to-r from-sky-400 via-sky-300 to-amber-300 bg-clip-text text-transparent">
                під ключ
              </span>{' '}
              у вашому домі
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Монтаж опалення, водопостачання, котелень та систем очистки води без протікань і пилу. Робота за офіційним договором, з фіксованим кошторисом та європейськими стандартами DIN і ДБН.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-base shadow-xl shadow-sky-600/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-5 h-5" />
                <span>Записатися на замір</span>
              </button>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 font-semibold text-base border border-slate-700/80 transition-all duration-200"
              >
                <span>Дивитися роботи</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </a>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Офіційний договір</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Знижка на Rehau до 25%</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Штроблення без пилу</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Engineering Showcase Card */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden tech-card border border-white/15 p-2 shadow-2xl">
              <div className="relative rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                  alt="Інженерний розподільчий вузол сантехніка Сергія Плакси"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Visual dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-transparent to-transparent opacity-80" />

                {/* Floating badge top right: Rehau Certified */}
                <div className="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md border border-amber-500/40 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-semibold text-amber-300 shadow-lg">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Сертифікований Rehau & TECE</span>
                </div>

                {/* Floating badge bottom left: 10 Bar Testing */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md border border-sky-400/30 rounded-xl p-3 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <p className="text-xs font-bold text-white uppercase tracking-wider">
                          Контроль якості
                        </p>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Гідравлічний тест: <span className="text-sky-300 font-semibold">10.0 bar / 24 години</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-amber-400 font-mono-numbers font-bold text-sm">
                        0 протікань
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Serhii Plaksa Quick Profile Signature */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-400 to-amber-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center font-bold text-sky-400 text-sm">
                      СП
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Сергій Плакса</h3>
                    <p className="text-xs text-slate-400">Провідний майстер-інженер</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono-numbers bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-white/5">
                  <ShieldCheck className="w-4 h-4 text-sky-400" />
                  <span>Київ та область</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Trust Proof Bar */}
        <motion.div 
          className="mt-16 pt-10 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trustStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center md:items-start text-center md:text-left">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300 font-mono-numbers">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 mt-1 max-w-[200px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

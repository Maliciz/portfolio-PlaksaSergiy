import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Wrench, 
  FileSpreadsheet, 
  Sparkles, 
  CheckCircle, 
  Cpu, 
  Gauge, 
  Crosshair 
} from 'lucide-react';

export const Advantages: React.FC = () => {
  const advantages = [
    {
      icon: ShieldCheck,
      title: 'Офіційна гарантія на всі вузли',
      description: '5 років безумовної гарантії на монтажні роботи за офіційним договором. Додатково діє офіційна гарантія виробників труб Rehau та TECE до 50 років.',
      badge: 'Гарантія 5 років',
      highlightColor: 'sky',
    },
    {
      icon: Wrench,
      title: 'Професійний прес-інструмент',
      description: 'Монтаж проводиться оригінальним акумуляторним інструментом Rems, Rehau Rautool та Milwaukee. Це повністю виключає людський фактор і забезпечує 100% герметичність з\'єднань.',
      badge: 'Rems & Rehau Tools',
      highlightColor: 'amber',
    },
    {
      icon: FileSpreadsheet,
      title: 'Фіксований кошторис до початку робіт',
      description: 'Жодних прихованих доплат у процесі монтажу. Ви отримуєте прозору специфікацію з деталізацією вартості кожного фітинга та виду робіт до старту.',
      badge: 'Точність до гривні',
      highlightColor: 'sky',
    },
    {
      icon: Sparkles,
      title: 'Акуратність та чистота на об\'єкті',
      description: 'Використання будівельного пилососа класу M під час штроблення, захист чистових поверхонь плівкою, чітке маркування всіх труб та прибирання сміття після завершення.',
      badge: 'Робота без пилу',
      highlightColor: 'amber',
    },
  ];

  const standards = [
    { label: 'Лазерне нівелювання', desc: 'Виставлення всіх випусків за лазером з точністю до ±1 мм', icon: Crosshair },
    { label: 'Опресування 10–12 бар', desc: 'Добовий гідравлічний стрес-тест перед заливкою стяжки', icon: Gauge },
    { label: 'Колекторна розводка', desc: 'Окремий промінь на кожну точку без трійників у підлозі', icon: Cpu },
    { label: 'Термоізоляція K-Flex', desc: 'Захист від конденсату та втрат теплової енергії', icon: CheckCircle },
  ];

  return (
    <section id="advantages" className="py-24 bg-[#0B1320] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-sky-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Інженерний підхід та стандарти</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Чому клієнти обирають мене для складних завдань
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Без компромісів щодо безпеки, довговічності та естетики. Кожен вузол монтується з розрахунком на десятиліття безтурботної експлуатації.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {advantages.map((item, index) => {
            const Icon = item.icon;
            const isAmber = item.highlightColor === 'amber';

            return (
              <motion.div
                key={index}
                className={`rounded-2xl p-8 transition-all duration-300 relative group overflow-hidden ${
                  isAmber ? 'tech-card-copper' : 'tech-card'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Top Badge and Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 ${
                    isAmber ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                  }`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    isAmber ? 'bg-amber-950/60 text-amber-300 border-amber-500/30' : 'bg-sky-950/60 text-sky-300 border-sky-500/30'
                  }`}>
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Engineering Checklist Bar */}
        <div className="rounded-2xl bg-slate-900/90 border border-white/10 p-6 sm:p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <h4 className="text-lg font-bold text-white">Технічний кодекс монтажу</h4>
              <p className="text-xs sm:text-sm text-slate-400">Стандарти, які я неухильно дотримуюся на кожному об'єкті</p>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-numbers text-sky-400 bg-sky-950/60 px-3 py-1.5 rounded-lg border border-sky-800 self-start md:self-auto">
              <span>DIN EN 806 • ДБН В.2.5-67</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {standards.map((std, i) => {
              const StdIcon = std.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-sky-400 shrink-0 mt-0.5 border border-slate-700">
                    <StdIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-slate-200">{std.label}</h5>
                    <p className="text-xs text-slate-400 mt-0.5 leading-snug">{std.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

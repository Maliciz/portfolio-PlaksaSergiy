import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Wrench, Crosshair, FileCheck2, ArrowUpRight } from 'lucide-react';

export const Advantages: React.FC = () => {
  const pillars = [
    {
      number: '01',
      title: 'Гідравлічний стрес-тест 10.0 bar',
      description: 'Перед заливкою стяжки кожен контур та вузол витримується під надлишковим тиском 10–12 бар протягом 24 годин із фото- та відеофіксацією манометрів у договорі.',
      metric: '24-годинний протокол випробувань',
      icon: Shield,
    },
    {
      number: '02',
      title: 'Акумуляторний прес-інструмент Rems & Rehau',
      description: 'Монтаж нерозбірних гільзових з’єднань проводиться оригінальними автоматичними пресами. Це на 100% унеможливлює людський фактор і гарантує герметичність на 50+ років.',
      metric: 'Оригінальні німецькі прес-клещі',
      icon: Wrench,
    },
    {
      number: '03',
      title: 'Лазерна вивірка геометрії до ±0.5 мм',
      description: 'Усі водорозетні планки, інсталяції та трапи виставляються за 3D-лазерними нівелірами. Жодних перекосів або щілин під час чистового монтажу керамограніту та змішувачів.',
      metric: 'Ювелірна точність під плитку',
      icon: Crosshair,
    },
    {
      number: '04',
      title: 'Фіксований кошторис та 5 років гарантії',
      description: 'Ви отримуєте прозору специфікацію робіт та матеріалів до початку робіт. Сума договору не збільшується під час процесу, а на всі виконані вузли діє 5-річна гарантія.',
      metric: 'Офіційний договір ФОП',
      icon: FileCheck2,
    },
  ];

  const standards = [
    { code: 'DIN 1988', label: 'Європейський стандарт проєктування питних мереж' },
    { code: 'EN 1264', label: 'Теплотехнічний розрахунок водяної теплої підлоги' },
    { code: 'REHAU & TECE', label: 'Офіційна сертифікація монтажних технологій' },
    { code: 'K-FLEX PE', label: 'Безшовна термоізоляція та акустичний демпфер' },
  ];

  return (
    <section id="advantages" className="py-28 sm:py-36 bg-transparent relative border-t border-neutral-200 dark:border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 dark:text-neutral-400 block mb-4">
            03 / Standards & Code
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-serif text-neutral-900 dark:text-white tracking-editorial leading-tight">
            Інженерний кодекс та безкомпромісна якість
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            Сантехніка — це найкритичніша інфраструктура житла. Вона схована в стінах і стяжці на десятиліття, тому тут немає місця компромісам, випадковим матеріалам чи поспіху.
          </p>
        </div>

        {/* 4 Architectural Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 sm:p-10 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono-numbers text-2xl font-light text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      {pillar.number}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 dark:text-white mb-3 leading-snug">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between font-mono-numbers text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  <span>{pillar.metric}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Standards Tape */}
        <div className="mt-16 pt-12 border-t border-neutral-200 dark:border-neutral-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          {standards.map((std, i) => (
            <div key={i} className="flex flex-col">
              <span className="font-mono-numbers text-sm font-semibold tracking-architectural text-neutral-900 dark:text-white uppercase">
                {std.code}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-light mt-1">
                {std.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

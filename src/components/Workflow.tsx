import React from 'react';
import { motion } from 'framer-motion';
import { Compass, FileText, Wrench, Gauge, ShieldCheck } from 'lucide-react';

export const Workflow: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Compass,
      title: 'Аудит об\'єкта та технічне завдання',
      desc: 'Безкоштовний виїзд інженера в Києві та області. Огляд дизайн-проєкту, вимірювання тиску, теплотехнічний аналіз приміщень.',
    },
    {
      step: '02',
      icon: FileText,
      title: 'Фіксована специфікація та договір',
      desc: 'Прозорий кошторис з деталізацією кожного фітинга та дилерськими знижками до -25%. Фіксація термінів та вартості в офіційному договорі.',
    },
    {
      step: '03',
      icon: Wrench,
      title: 'Чистий монтаж інструментом Rems & Rehau',
      desc: 'Штроблення з промисловим пиловідведенням Hilti, лазерне позиціонування випусків та термоізоляція трас K-Flex PE.',
    },
    {
      step: '04',
      icon: Gauge,
      title: 'Гідравлічний тест 10.0 bar (24 години)',
      desc: 'Стрес-випробування підвищеним тиском перед стяжкою або облицюванням. Фото- та відеофіксація манометрів для гарантійного акта.',
    },
    {
      step: '05',
      icon: ShieldCheck,
      title: 'Маркування, акт та гарантія 5 років',
      desc: 'Фінальне маркування всіх кранів та контурів, підписання акта виконаних робіт та видача гарантійного сертифіката.',
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-transparent border-t border-neutral-200 dark:border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 dark:text-neutral-400 block mb-4">
            07 / Process & Delivery
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-serif text-neutral-900 dark:text-white tracking-editorial leading-tight">
            Чіткий алгоритм реалізації
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            Жодних непередбачуваних витрат чи затримок — стандартизований інженерний протокол від первинного аудиту до передачі ключів від сервісного люка.
          </p>
        </div>

        {/* 5-step Minimalist Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group p-7 rounded-2xl bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono-numbers text-2xl font-light text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <h3 className="text-base font-serif font-normal text-neutral-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

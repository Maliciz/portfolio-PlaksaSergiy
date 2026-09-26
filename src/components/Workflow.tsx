import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  FileText, 
  Wrench, 
  Gauge, 
  Award, 
  Workflow as WorkflowIcon
} from 'lucide-react';

export const Workflow: React.FC = () => {
  const steps = [
    {
      step: '01',
      icon: Compass,
      title: 'Консультація та виїзд на замір',
      desc: 'Безкоштовний огляд об\'єкта в Києві або передмісті. Аналіз дизайн-проєкту, ревізія стояків, перевірка вхідного тиску води.',
    },
    {
      step: '02',
      icon: FileText,
      title: 'Фіксований кошторис та договір',
      desc: 'Складаю детальну специфікацію матеріалів з моєю партнерською знижкою (15–25%). Фіксуємо кінцеву вартість робіт і дату здачі.',
    },
    {
      step: '03',
      icon: Wrench,
      title: 'Монтаж інструментом Rems & Rehau',
      desc: 'Штроблення з промисловим пилососом, прокладання труб у теплоізоляції K-Flex, збирання розподільчого колектора за лазером.',
    },
    {
      step: '04',
      icon: Gauge,
      title: 'Опресування 10–12 бар (24 години)',
      desc: 'Гідравлічний стрес-тест підвищеним тиском перед заливкою стяжки або зашиванням стін. Надаю відеозвіт та підписуємо проміжний акт.',
    },
    {
      step: '05',
      icon: Award,
      title: 'Здача об\'єкта та гарантія 5 років',
      desc: 'Підписання фінального акта виконаних робіт, маркування всіх контурів і видача персонального гарантійного сертифіката.',
    },
  ];

  return (
    <section className="py-24 bg-[#0B1320] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
            <WorkflowIcon className="w-3.5 h-3.5" />
            <span>Прозорий процес співпраці</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            5 кроків до бездоганної інженерії
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Жодних сюрпризів чи затримок — чіткий алгоритм дій від першого дзвінка до передачі гарантійного талона.
          </p>
        </div>

        {/* 5-step Horizontal/Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="relative rounded-2xl p-6 bg-slate-900/80 border border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Step number watermark */}
                <div className="text-4xl font-extrabold text-slate-700/60 font-mono-numbers group-hover:text-sky-500/40 transition-colors mb-4">
                  {item.step}
                </div>

                <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-sky-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

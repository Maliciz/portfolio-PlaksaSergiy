import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  Droplets, 
  Bath, 
  Filter, 
  Gauge, 
  AlertTriangle, 
  Check, 
  ArrowRight,
  Shield,
  Layers
} from 'lucide-react';
import { servicesData } from '../data/servicesData';
import type { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-amber-400" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-sky-400" />;
      case 'Bath':
        return <Bath className="w-6 h-6 text-sky-300" />;
      case 'Filter':
        return <Filter className="w-6 h-6 text-cyan-400" />;
      case 'Gauge':
        return <Gauge className="w-6 h-6 text-amber-500" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-6 h-6 text-rose-400" />;
      default:
        return <Droplets className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0B1320] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-800 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Layers className="w-3.5 h-3.5" />
              <span>Повний спектр інженерних послуг</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Послуги монтажу та сервісу
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg">
              Професійний підхід від окремої заміни крана до комплексної інженерії заміських резиденцій під ключ.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs text-slate-400">Всі матеріали зі знижкою майстра до</span>
            <span className="text-lg font-bold font-mono-numbers text-amber-400 bg-amber-950/40 px-3 py-1 rounded-lg border border-amber-800/60">
              -25%
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service: ServiceItem, index: number) => {
            const isPopular = service.popular;

            return (
              <motion.div
                key={service.id}
                className={`flex flex-col rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden ${
                  isPopular 
                    ? 'tech-card border-sky-500/40 shadow-lg shadow-sky-900/10' 
                    : 'tech-card'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-sky-500 to-sky-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl tracking-wider uppercase shadow-md">
                    Популярна послуга
                  </div>
                )}

                {/* Top Row: Icon & Price */}
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-white/10 flex items-center justify-center">
                    {getIcon(service.iconName)}
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-medium">Вартість</span>
                    <span className="text-lg sm:text-xl font-extrabold text-amber-400 font-mono-numbers">
                      від {service.priceFrom.toLocaleString('uk-UA')} {service.priceUnit}
                    </span>
                  </div>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Included Works List */}
                <div className="space-y-2.5 mb-8 flex-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Що входить у послугу:
                  </span>
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                      <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Standards tags */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/5">
                  {service.standards.map((std, sIndex) => (
                    <span key={sIndex} className="text-[11px] font-mono-numbers px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-white/5">
                      {std}
                    </span>
                  ))}
                  <span className="text-[11px] font-mono-numbers px-2 py-0.5 rounded bg-amber-950/40 text-amber-400 border border-amber-900/50 flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Гарантія {service.warrantyYears} р.
                  </span>
                </div>

                {/* Order Button */}
                <button
                  onClick={() => onSelectService(service.title)}
                  className="w-full mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/90 hover:bg-sky-600 text-white font-semibold text-sm transition-all duration-200 border border-white/10 hover:border-sky-500 group"
                >
                  <span>Замовити розрахунок</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

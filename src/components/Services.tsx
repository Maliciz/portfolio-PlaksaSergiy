import React from 'react';
import { Check, ArrowUpRight } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import type { ServiceItem } from '../types';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 sm:py-28 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 pb-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 block mb-2">
              Прайс сантехнічних робіт
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-black uppercase tracking-tight">
              Послуги та орієнтовні ціни
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base font-normal">
              Фіксовані розцінки без накруток після початку монтажу. Безкоштовний прорахунок по фото або кресленнях.
            </p>
          </div>

          <div className="text-xs font-mono-numbers text-neutral-700 bg-white border border-neutral-300 p-3 shrink-0">
            Остаточна ціна фіксується до початку робіт
          </div>
        </div>

        {/* Services Grid (0px radius) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((service: ServiceItem, index: number) => (
            <div
              key={service.id}
              className="bg-white border border-neutral-300 p-6 sm:p-8 flex flex-col justify-between hover:border-black transition-colors"
            >
              <div>
                {/* Header with index & price */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
                  <span className="font-mono-numbers text-xs text-neutral-400">
                    0{index + 1}
                  </span>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono-numbers text-neutral-500 block">
                      Вартість робіт
                    </span>
                    <span className="font-mono-numbers text-lg font-bold text-black">
                      від {service.priceFrom.toLocaleString('uk-UA')} {service.priceUnit}
                    </span>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold font-display uppercase tracking-tight text-black mb-2">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 mb-6 font-normal leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Features List */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <Check className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Button */}
              <button
                onClick={() => onSelectService(service.title)}
                className="w-full py-3 px-4 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Замовити цю послугу</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

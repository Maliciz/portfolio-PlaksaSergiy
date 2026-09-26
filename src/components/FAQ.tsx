import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { faqData } from '../data/faqData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#0B1320] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Відповіді на важливі питання</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Часті запитання
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Усе, що потрібно знати перед початком інженерних сантехнічних робіт.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3 pr-4">
                    <span className="text-xs font-mono-numbers text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-950 border border-sky-800 shrink-0">
                      {item.tag}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-white leading-snug">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-sky-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/5 bg-slate-950/40">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

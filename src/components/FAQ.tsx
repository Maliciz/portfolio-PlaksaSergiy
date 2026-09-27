import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { faqData } from '../data/faqData';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 sm:py-36 bg-transparent border-t border-neutral-200 dark:border-neutral-800/80 relative">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 dark:text-neutral-400 block mb-4">
            09 / Inquiry & Answers
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-serif text-neutral-900 dark:text-white tracking-editorial leading-tight">
            Часті запитання
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
            Ключові технічні нюанси щодо матеріалів, опресування, гарантійних зобов'язань та організації процесу.
          </p>
        </div>

        {/* Clean Hairline Accordion */}
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border-y border-neutral-200 dark:border-neutral-800">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div key={index} className="py-6">
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-start justify-between text-left gap-6 group"
                >
                  <div className="flex flex-col">
                    <span className="font-mono-numbers text-[10px] uppercase tracking-architectural text-neutral-400 dark:text-neutral-500 mb-1">
                      {item.tag}
                    </span>
                    <span className="text-lg sm:text-xl font-serif text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {item.question}
                    </span>
                  </div>
                  
                  <div className="w-8 h-8 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center shrink-0 text-neutral-700 dark:text-neutral-300 group-hover:border-neutral-900 dark:group-hover:border-white transition-colors mt-1">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pr-12 text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light leading-relaxed animate-in fade-in duration-200">
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

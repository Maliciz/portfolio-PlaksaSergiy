import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, Quote } from 'lucide-react';
import { reviewsData } from '../data/reviewsData';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-28 sm:py-36 bg-transparent border-t border-neutral-200 dark:border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 dark:text-neutral-400 block mb-4">
              08 / Client Endorsements
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-serif text-neutral-900 dark:text-white tracking-editorial leading-tight">
              Репутація, перевірена роками
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Відгуки власників нерухомості та авторів дизайн-проєктів про бездоганну точність, терміни та довговічність виконаних вузлів.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3 font-mono-numbers text-xs text-neutral-600 dark:text-neutral-400">
            <span className="text-neutral-900 dark:text-white font-bold text-lg">5.0</span>
            <div className="flex text-neutral-900 dark:text-white">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span>• 100% задоволених клієнтів</span>
          </div>
        </div>

        {/* Editorial Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsData.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="p-8 sm:p-9 rounded-2xl bg-neutral-100/40 dark:bg-neutral-900/30 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between"
            >
              <div>
                {/* Complex / Location */}
                <div className="flex items-center justify-between font-mono-numbers text-xs uppercase tracking-architectural text-neutral-400 dark:text-neutral-500 mb-6">
                  <span>{review.location}</span>
                  <span>{review.date}</span>
                </div>

                <Quote className="w-8 h-8 text-neutral-300 dark:text-neutral-700 mb-4" />

                <p className="text-sm text-neutral-700 dark:text-neutral-300 font-light leading-relaxed mb-8">
                  "{review.reviewText}"
                </p>
              </div>

              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-serif font-normal text-neutral-900 dark:text-white">
                    {review.authorName}
                  </h4>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-light">
                    {review.serviceType}
                  </span>
                </div>

                {review.verified && (
                  <span className="text-[11px] font-mono-numbers text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Перевірено
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

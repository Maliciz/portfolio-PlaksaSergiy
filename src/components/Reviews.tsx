import React from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MessageSquare, Quote } from 'lucide-react';
import { reviewsData } from '../data/reviewsData';

export const Reviews: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-[#0B1320] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Репутація, перевірена часом</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Відгуки замовників
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl">
              Справжні враження власників квартир і котеджів після здачі сантехнічних вузлів та опалювальних систем.
            </p>
          </div>

          {/* Google 5.0 Rating Badge */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 font-extrabold text-xl font-mono-numbers">
              5.0
            </div>
            <div>
              <div className="flex text-amber-400 gap-0.5 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-400 font-medium">
                100% позитивних відгуків (48 зданих об'єктів)
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviewsData.map((item, index) => (
            <motion.div
              key={item.id}
              className="rounded-2xl p-7 bg-slate-900/70 border border-white/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between relative shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <div>
                {/* Top: Stars and quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-700" />
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 italic">
                  "{item.reviewText}"
                </p>
              </div>

              {/* Author & Location */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{item.authorName}</span>
                    {item.verified && (
                      <span title="Підтверджений замовник">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </span>
                    )}
                  </h4>
                  <span className="text-xs text-slate-400">{item.location}</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-sky-400 font-mono-numbers block font-medium">
                    {item.date}
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 max-w-[120px]">
                    {item.serviceType}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

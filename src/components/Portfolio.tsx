import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import type { ServiceCategory } from '../types';

interface PortfolioProps {
  onBookProject: (projectName: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onBookProject }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const categories = [
    { id: 'all' as ServiceCategory, label: 'Всі роботи' },
    { id: 'boilers' as ServiceCategory, label: 'Бойлери' },
    { id: 'pumps' as ServiceCategory, label: 'Насоси' },
    { id: 'pipes' as ServiceCategory, label: 'Труби та колектори' },
    { id: 'bathrooms' as ServiceCategory, label: 'Унітази та інсталяції' },
    { id: 'underfloor' as ServiceCategory, label: 'Опалення' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? portfolioData
    : portfolioData.filter((item) => item.category === activeCategory);

  return (
    <section id="works" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-neutral-200">
          <div>
            <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 block mb-2">
              Портфоліо • «Ваш Сантехнік»
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-black uppercase tracking-tight">
              Виконані роботи майстра
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base max-w-xl font-normal">
              Реальні фотографії встановлених бойлерів, інсталяцій, унітазів, насосних станцій, труб та систем опалення в Києві та області.
            </p>
          </div>

          {/* Minimal Sharp Filters */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-mono-numbers uppercase tracking-wider transition-colors border ${
                    isActive
                      ? 'bg-black text-white border-black font-bold'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-black'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sharp Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="border border-neutral-300 bg-white hover:border-black transition-colors flex flex-col justify-between group"
            >
              <div>
                {/* Photo (0px radius) */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100 border-b border-neutral-200">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute top-0 right-0 bg-black text-white text-[11px] font-mono-numbers px-3 py-1 uppercase tracking-wider font-semibold">
                    {project.categoryLabel}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-mono-numbers text-neutral-500 mb-2 uppercase">
                    <span>{project.location}</span>
                    <span>#{String(index + 1).padStart(2, '0')}</span>
                  </div>

                  <h3 className="text-lg font-bold text-black font-display uppercase tracking-tight mb-3">
                    {project.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Materials */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-neutral-100">
                    {project.materials.map((mat, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono-numbers bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200"
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onBookProject(project.title)}
                  className="w-full py-3 px-4 border border-black bg-white hover:bg-black hover:text-white text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Замовити таку роботу</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

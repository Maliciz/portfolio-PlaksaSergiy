import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderKanban, 
  MapPin, 
  Clock, 
  Eye, 
  X, 
  CheckCircle2, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import type { PortfolioProject, ServiceCategory } from '../types';

interface PortfolioProps {
  onBookProject: (projectName: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onBookProject }) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const categories = [
    { id: 'all' as ServiceCategory, label: 'Всі роботи' },
    { id: 'boilers' as ServiceCategory, label: 'Котельні' },
    { id: 'underfloor' as ServiceCategory, label: 'Тепла підлога' },
    { id: 'bathrooms' as ServiceCategory, label: 'Санвузли' },
    { id: 'filtration' as ServiceCategory, label: 'Фільтрація' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? portfolioData
    : portfolioData.filter((item) => item.category === activeCategory);

  const handleOpenModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedProject.galleryImages.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => 
      prev === 0 ? selectedProject.galleryImages.length - 1 : prev - 1
    );
  };

  return (
    <section id="portfolio" className="py-24 bg-[#0B1320] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
              <FolderKanban className="w-3.5 h-3.5" />
              <span>Реальні інженерні кейси</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Виконані об'єкти
            </h2>
            <p className="mt-3 text-slate-300 text-base sm:text-lg max-w-2xl">
              Жодного візуального шуму — тільки прецизійна геометрія, сертифіковані матеріали та задокументовані випробування.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 border border-sky-400'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-white/5'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-sky-500/50 transition-all duration-300 shadow-xl flex flex-col"
              >
                {/* Image Container with Hover Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-white/10">
                    {project.categoryLabel}
                  </div>

                  {/* Dark hover overlay with quick info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-[#0B1320]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                    <span className="text-xs text-sky-400 font-semibold mb-1">
                      {project.residentialComplex}
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                      {project.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    <button
                      onClick={() => handleOpenModal(project)}
                      className="w-full py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Переглянути вузол та характеристики</span>
                    </button>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{project.residentialComplex}, {project.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors line-clamp-1 mb-3">
                      {project.title}
                    </h3>

                    {/* Materials tags preview */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.materials.slice(0, 3).map((mat, i) => (
                        <span key={i} className="text-[11px] font-mono-numbers px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                          {mat}
                        </span>
                      ))}
                      {project.materials.length > 3 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          +{project.materials.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-mono-numbers">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      {project.durationDays} дні монтажу
                    </span>
                    <button
                      onClick={() => handleOpenModal(project)}
                      className="text-sky-400 hover:text-sky-300 font-semibold"
                    >
                      Детальніше →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox / Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0F1A2E] rounded-2xl border border-sky-500/30 shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200">
              
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Header */}
              <div className="pr-12 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-sky-950 text-sky-400 border border-sky-800">
                    {selectedProject.categoryLabel}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono-numbers">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" /> {selectedProject.residentialComplex}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Photo Carousel */}
              <div className="relative rounded-xl overflow-hidden aspect-[16/9] mb-4 bg-black">
                <img
                  src={selectedProject.galleryImages[activeImageIndex]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />

                {selectedProject.galleryImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-sm border border-white/20 transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-sm border border-white/20 transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono-numbers text-white border border-white/10">
                  {activeImageIndex + 1} / {selectedProject.galleryImages.length}
                </div>
              </div>

              {/* Thumbnails */}
              {selectedProject.galleryImages.length > 1 && (
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {selectedProject.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === i ? 'border-sky-400 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description & Engineering Results */}
              <div className="space-y-6 text-sm text-slate-300">
                <p className="text-base text-slate-200 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                    Досягнуті інженерні показники:
                  </h4>
                  <div className="space-y-2">
                    {selectedProject.results.map((res, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specs Table */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                    Технічні специфікації:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.systemSpecs.map((spec, i) => (
                      <div key={i} className="p-3 rounded-xl bg-slate-900/70 border border-white/5 flex flex-col">
                        <span className="text-xs text-slate-400">{spec.label}</span>
                        <span className="text-sm font-semibold text-white font-mono-numbers mt-0.5">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Used Materials */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-2">
                    Використані матеріали:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.materials.map((mat, i) => (
                      <span key={i} className="text-xs font-mono-numbers px-2.5 py-1 rounded-lg bg-sky-950/50 text-sky-300 border border-sky-800/40">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer CTA */}
                <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Бажаєте реалізувати схожу систему у своїй квартирі чи будинку?
                  </div>
                  <button
                    onClick={() => {
                      const title = selectedProject.title;
                      handleCloseModal();
                      onBookProject(title);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Замовити аналогічне рішення</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Clock, 
  Search
} from 'lucide-react';
import { pricingItems, pricingCategories } from '../data/pricingData';

interface PriceCalculatorProps {
  onBookWithEstimate: (estimateDetails: { service: string; budget: string }) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onBookWithEstimate }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'table'>('calculator');
  const [selectedTableCategory, setSelectedTableCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculator State
  const [propertyType, setPropertyType] = useState<'apartment-new' | 'apartment-old' | 'house'>('apartment-new');
  const [waterPoints, setWaterPoints] = useState<number>(10);
  const [underfloorArea, setUnderfloorArea] = useState<number>(45);
  const [includeUnderfloor, setIncludeUnderfloor] = useState<boolean>(true);
  const [includeLeakProtection, setIncludeLeakProtection] = useState<boolean>(true);
  const [includeFiltration, setIncludeFiltration] = useState<boolean>(true);
  const [includeBoiler, setIncludeBoiler] = useState<boolean>(false);

  // Calculations
  const pointRate = propertyType === 'apartment-old' ? 2000 : 1800;
  const manifoldBase = 4500;
  const pointsCost = waterPoints * pointRate;
  const underfloorCost = includeUnderfloor ? underfloorArea * 350 + 3200 : 0;
  const leakCost = includeLeakProtection ? 2500 : 0;
  const filtrationCost = includeFiltration ? 3800 : 0;
  const boilerCost = includeBoiler ? 2800 : 0;

  const totalEstimate = manifoldBase + pointsCost + underfloorCost + leakCost + filtrationCost + boilerCost;
  const estimatedDays = Math.max(3, Math.ceil(waterPoints / 4) + (includeUnderfloor ? 2 : 0) + (propertyType === 'house' ? 2 : 0));

  const filteredPricingItems = pricingItems.filter((i) => {
    const matchesCategory = selectedTableCategory === 'all' || i.category === selectedTableCategory;
    const matchesSearch = !searchQuery.trim() || 
      i.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (i.note && i.note.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleApplyEstimate = () => {
    const serviceName = includeUnderfloor 
      ? 'Комплексний інженерний монтаж: водопостачання + тепла підлога'
      : 'Монтаж розподільчого вузла водопостачання та розведення точок';
    
    onBookWithEstimate({
      service: serviceName,
      budget: `~${totalEstimate.toLocaleString('uk-UA')} грн (${waterPoints} точок, ${includeUnderfloor ? underfloorArea + ' м² теплої підлоги' : 'без теплої підлоги'})`,
    });
  };

  return (
    <section id="calculator" className="py-28 sm:py-36 bg-transparent border-t border-neutral-200 dark:border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-3xl">
            <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 dark:text-neutral-400 block mb-4">
              06 / Investment & Specification
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal font-serif text-neutral-900 dark:text-white tracking-editorial leading-tight">
              Прозорий розрахунок вартості
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Сконфігуруйте попередній бюджет робіт для вашого типу нерухомості або перегляньте детальний прейскурант з фіксованими розцінками.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="inline-flex p-1 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 shrink-0">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-5 py-2 rounded-full text-xs font-mono-numbers uppercase tracking-wider transition-all ${
                activeTab === 'calculator'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Калькулятор
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-5 py-2 rounded-full text-xs font-mono-numbers uppercase tracking-wider transition-all ${
                activeTab === 'table'
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Прейскурант
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Minimalist Configurator */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-10">
              
              {/* Property Type Radio Selector */}
              <div>
                <label className="block text-xs font-mono-numbers uppercase tracking-architectural text-neutral-500 dark:text-neutral-400 mb-4">
                  01 / Тип нерухомості
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'apartment-new', label: 'Новобудова', sub: 'Вільне планування' },
                    { id: 'apartment-old', label: 'Вторинний фонд', sub: 'Заміна стояків' },
                    { id: 'house', label: 'Приватний котедж', sub: 'Автономна котельня' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPropertyType(t.id as any)}
                      className={`p-4 rounded-xl text-left border transition-all ${
                        propertyType === t.id
                          ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/40 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{t.label}</span>
                      <span className={`block text-xs mt-1 ${propertyType === t.id ? 'opacity-80' : 'text-neutral-500 dark:text-neutral-400'}`}>
                        {t.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Points Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-mono-numbers uppercase tracking-architectural text-neutral-500 dark:text-neutral-400">
                    02 / Кількість точок водорозбору
                  </label>
                  <span className="font-mono-numbers text-base font-semibold text-neutral-900 dark:text-white">
                    {waterPoints} точок
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={waterPoints}
                  onChange={(e) => setWaterPoints(Number(e.target.value))}
                  className="w-full h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
                />
                <div className="flex justify-between text-[11px] font-mono-numbers text-neutral-400 mt-2">
                  <span>4 (Студія)</span>
                  <span>10 (2 санвузли)</span>
                  <span>24 (Резиденція)</span>
                </div>
              </div>

              {/* Radiant Underfloor Heating Toggle & Slider */}
              <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800/80">
                <div className="flex items-center justify-between mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeUnderfloor}
                      onChange={(e) => setIncludeUnderfloor(e.target.checked)}
                      className="w-4 h-4 rounded border-neutral-400 text-neutral-900 accent-neutral-900 dark:accent-white"
                    />
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                      Водяна тепла підлога
                    </span>
                  </label>
                  {includeUnderfloor && (
                    <span className="font-mono-numbers text-sm font-semibold text-neutral-900 dark:text-white">
                      {underfloorArea} м²
                    </span>
                  )}
                </div>

                {includeUnderfloor && (
                  <div className="pl-7 space-y-2">
                    <input
                      type="range"
                      min="10"
                      max="180"
                      step="5"
                      value={underfloorArea}
                      onChange={(e) => setUnderfloorArea(Number(e.target.value))}
                      className="w-full h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
                    />
                    <div className="flex justify-between text-[11px] font-mono-numbers text-neutral-400">
                      <span>10 м² (Зона санвузлів)</span>
                      <span>60 м² (Квартира)</span>
                      <span>180 м² (Будинок)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Engineering Modules */}
              <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800/80 space-y-3">
                <label className="block text-xs font-mono-numbers uppercase tracking-architectural text-neutral-500 dark:text-neutral-400 mb-3">
                  03 / Додаткові інженерні модулі
                </label>

                {[
                  {
                    checked: includeLeakProtection,
                    onChange: setIncludeLeakProtection,
                    title: 'Система захисту від протікань Ajax WaterStop',
                    desc: 'Електрокрани, інтеграція в систему та датчики',
                    price: '+2 500 грн',
                  },
                  {
                    checked: includeFiltration,
                    onChange: setIncludeFiltration,
                    title: 'Багатоступенева магістральна фільтрація',
                    desc: 'Самопромивні колби 100мкм та редуктори тиску FAR',
                    price: '+3 800 грн',
                  },
                  {
                    checked: includeBoiler,
                    onChange: setIncludeBoiler,
                    title: 'Монтаж бойлера непрямого нагріву',
                    desc: 'Група безпеки, розширювальний бак, термоманометри',
                    price: '+2 800 грн',
                  },
                ].map((mod, i) => (
                  <label
                    key={i}
                    className="flex items-start justify-between p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 cursor-pointer bg-neutral-100/30 dark:bg-neutral-900/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={mod.checked}
                        onChange={(e) => mod.onChange(e.target.checked)}
                        className="w-4 h-4 rounded border-neutral-400 text-neutral-900 accent-neutral-900 dark:accent-white mt-0.5"
                      />
                      <div>
                        <span className="block text-xs sm:text-sm font-semibold text-neutral-900 dark:text-white">
                          {mod.title}
                        </span>
                        <span className="block text-xs text-neutral-500 dark:text-neutral-400 font-light mt-0.5">
                          {mod.desc}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono-numbers text-xs text-neutral-600 dark:text-neutral-300 font-medium shrink-0 ml-4">
                      {mod.price}
                    </span>
                  </label>
                ))}
              </div>

            </div>

            {/* Right Summary Column (Architectural Receipt Card) */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="p-8 rounded-2xl bg-neutral-900 text-white dark:bg-neutral-900/90 border border-neutral-800 shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-400">
                      Specification Estimate
                    </span>
                    <span className="text-xs font-mono-numbers text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Фіксований тариф
                    </span>
                  </div>

                  <div className="py-6 space-y-3 font-mono-numbers text-xs">
                    <div className="flex justify-between text-neutral-300">
                      <span>Колекторний вузол вводу Rehau</span>
                      <span>{manifoldBase.toLocaleString('uk-UA')} грн</span>
                    </div>
                    <div className="flex justify-between text-neutral-300">
                      <span>Розведення ({waterPoints} точок)</span>
                      <span>{pointsCost.toLocaleString('uk-UA')} грн</span>
                    </div>
                    {includeUnderfloor && (
                      <div className="flex justify-between text-neutral-300">
                        <span>Тепла підлога ({underfloorArea} м²)</span>
                        <span>{underfloorCost.toLocaleString('uk-UA')} грн</span>
                      </div>
                    )}
                    {includeLeakProtection && (
                      <div className="flex justify-between text-neutral-300">
                        <span>Антипотоп Ajax</span>
                        <span>{leakCost.toLocaleString('uk-UA')} грн</span>
                      </div>
                    )}
                    {includeFiltration && (
                      <div className="flex justify-between text-neutral-300">
                        <span>Магістральна фільтрація</span>
                        <span>{filtrationCost.toLocaleString('uk-UA')} грн</span>
                      </div>
                    )}
                    {includeBoiler && (
                      <div className="flex justify-between text-neutral-300">
                        <span>Бойлер непрямого нагріву</span>
                        <span>{boilerCost.toLocaleString('uk-UA')} грн</span>
                      </div>
                    )}
                  </div>

                  {/* Total Amount */}
                  <div className="pt-6 border-t border-white/10">
                    <span className="text-xs uppercase font-mono-numbers text-neutral-400 block mb-1">
                      Орієнтовна вартість робіт
                    </span>
                    <div className="font-mono-numbers text-3xl sm:text-4xl font-normal text-white">
                      ~{totalEstimate.toLocaleString('uk-UA')} <span className="text-base text-neutral-400">грн</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono-numbers text-neutral-400 mt-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Орієнтовний термін монтажу: ~{estimatedDays} робочих днів</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <button
                    onClick={handleApplyEstimate}
                    className="w-full py-4 rounded-full bg-white text-neutral-900 font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <span>Зафіксувати кошторис та запросити інженера</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-neutral-400 text-center font-light leading-relaxed">
                    Матеріали розраховуються індивідуально після 3D-заміру з дилерською знижкою до -25%.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Itemized Transparent Price List */}
        {activeTab === 'table' && (
          <div className="space-y-8">
            
            {/* Search and Category Filter */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTableCategory('all')}
                  className={`px-4 py-2 rounded-full text-xs font-mono-numbers uppercase transition-colors ${
                    selectedTableCategory === 'all'
                      ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold'
                      : 'border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  Всі категорії
                </button>
                {pricingCategories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedTableCategory(c)}
                    className={`px-4 py-2 rounded-full text-xs font-mono-numbers uppercase transition-colors ${
                      selectedTableCategory === c
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold'
                        : 'border border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative max-w-xs">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Пошук операції..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full border border-neutral-300 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/50 text-xs font-mono-numbers text-neutral-900 dark:text-white focus:outline-none focus:border-neutral-900 dark:focus:border-white"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
              <table className="w-full text-left font-mono-numbers text-xs">
                <thead className="bg-neutral-100 dark:bg-neutral-900/80 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 uppercase tracking-architectural">
                  <tr>
                    <th className="py-3.5 px-6 font-medium">Найменування операції</th>
                    <th className="py-3.5 px-6 font-medium">Одиниця</th>
                    <th className="py-3.5 px-6 font-medium text-right">Вартість</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800/60 font-light">
                  {filteredPricingItems.map((item) => (
                    <tr key={item.id} className="hover:bg-neutral-100/40 dark:hover:bg-neutral-900/40 transition-colors">
                      <td className="py-4 px-6 text-neutral-900 dark:text-white font-sans font-normal">
                        <div className="font-medium">{item.serviceName}</div>
                        {item.note && (
                          <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                            {item.note}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-neutral-500 dark:text-neutral-400">
                        {item.unit}
                      </td>
                      <td className="py-4 px-6 text-right font-semibold text-neutral-900 dark:text-white">
                        {item.priceUah.toLocaleString('uk-UA')} грн
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};

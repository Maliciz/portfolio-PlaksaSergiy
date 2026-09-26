import React, { useState } from 'react';
import { 
  Calculator, 
  TableProperties, 
  Calendar,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';
import { pricingItems, pricingCategories } from '../data/pricingData';

interface PriceCalculatorProps {
  onBookWithEstimate: (estimateDetails: { service: string; budget: string }) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onBookWithEstimate }) => {
  const [activeTab, setActiveTab] = useState<'calculator' | 'table'>('calculator');
  const [selectedTableCategory, setSelectedTableCategory] = useState<string>('all');

  // Calculator State
  const [propertyType, setPropertyType] = useState<'apartment-new' | 'apartment-old' | 'house'>('apartment-new');
  const [waterPoints, setWaterPoints] = useState<number>(8); // points
  const [underfloorArea, setUnderfloorArea] = useState<number>(30); // sq meters
  const [includeUnderfloor, setIncludeUnderfloor] = useState<boolean>(true);
  const [includeLeakProtection, setIncludeLeakProtection] = useState<boolean>(true);
  const [includeFiltration, setIncludeFiltration] = useState<boolean>(false);
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
  const estimatedDays = Math.max(2, Math.ceil(waterPoints / 4) + (includeUnderfloor ? 2 : 0) + (propertyType === 'house' ? 2 : 0));

  const filteredPricingItems = selectedTableCategory === 'all'
    ? pricingItems
    : pricingItems.filter((i) => i.category === selectedTableCategory);

  const handleApplyEstimate = () => {
    const serviceName = includeUnderfloor 
      ? 'Комплексний монтаж: водопостачання + тепла підлога'
      : 'Монтаж вузла водопостачання та розведення точок';
    
    onBookWithEstimate({
      service: serviceName,
      budget: `~${totalEstimate.toLocaleString('uk-UA')} грн (${waterPoints} точок, ${includeUnderfloor ? underfloorArea + 'м² підлоги' : 'без теплої підлоги'})`,
    });
  };

  return (
    <section id="calculator" className="py-24 bg-[#0B1320] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/70 border border-sky-800 text-sky-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Чесні ціни без сюрпризів</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Калькулятор вартості та відкритий прайс
          </h2>
          <p className="mt-3 text-slate-300 text-base sm:text-lg">
            Отримайте швидкий попередній прорахунок вартості робіт або перегляньте детальні розцінки на кожну операцію.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/10 mt-8">
            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Швидкий калькулятор</span>
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'table'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableProperties className="w-4 h-4" />
              <span>Повний прайс-лист</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Interactive Calculator */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Controls */}
            <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-6 sm:p-8 border border-white/10 tech-card space-y-7">
              
              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  1. Тип вашого об'єкта
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'apartment-new', label: 'Новобудова' },
                    { id: 'apartment-old', label: 'Вторинне житло' },
                    { id: 'house', label: 'Будинок / Котедж' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPropertyType(p.id as any)}
                      className={`py-3 px-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                        propertyType === p.id
                          ? 'bg-sky-500/20 border-sky-400 text-white shadow-sm'
                          : 'bg-slate-800/60 border-white/5 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Points Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    2. Кількість точок водопостачання та каналізації
                  </label>
                  <span className="text-base font-extrabold text-sky-400 font-mono-numbers bg-sky-950/80 px-2.5 py-0.5 rounded border border-sky-800">
                    {waterPoints} точок
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-4">
                  (Змішувач умивальника, душ/ванна, унітаз, гіг. душ, пралка, посудомийка, мийка кухні, бойлер)
                </p>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={waterPoints}
                  onChange={(e) => setWaterPoints(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-300 font-mono-numbers mt-1.5">
                  <span>4 точки (мінімум)</span>
                  <span>14 точок (середня 3к)</span>
                  <span>24 точки (котедж)</span>
                </div>
              </div>

              {/* Underfloor Heating Toggle & Slider */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-bold uppercase tracking-wider text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeUnderfloor}
                      onChange={(e) => setIncludeUnderfloor(e.target.checked)}
                      className="w-4 h-4 rounded text-sky-500 accent-sky-500 cursor-pointer"
                    />
                    <span>3. Монтаж водяної теплої підлоги</span>
                  </label>
                  {includeUnderfloor && (
                    <span className="text-sm font-extrabold text-amber-400 font-mono-numbers bg-amber-950/60 px-2 py-0.5 rounded border border-amber-900">
                      {underfloorArea} м²
                    </span>
                  )}
                </div>

                {includeUnderfloor && (
                  <div className="pl-6 space-y-2">
                    <input
                      type="range"
                      min="10"
                      max="180"
                      step="5"
                      value={underfloorArea}
                      onChange={(e) => setUnderfloorArea(parseInt(e.target.value, 10))}
                      className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                    />
                    <div className="flex justify-between text-[11px] text-slate-300 font-mono-numbers">
                      <span>10 м² (санвузли)</span>
                      <span>60 м² (квартира)</span>
                      <span>180 м² (будинок)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Extra Addons */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  4. Додаткові інженерні опції
                </label>
                
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-white/5 hover:border-sky-500/30 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeLeakProtection}
                      onChange={(e) => setIncludeLeakProtection(e.target.checked)}
                      className="w-4 h-4 rounded accent-sky-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-semibold text-white block">Система захисту від протікань (Ajax / Neptun)</span>
                      <span className="text-xs text-slate-400">Монтаж сервоприводів та налаштування датчиків</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono-numbers font-bold text-sky-400 shrink-0">+2 500 грн</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-white/5 hover:border-sky-500/30 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeFiltration}
                      onChange={(e) => setIncludeFiltration(e.target.checked)}
                      className="w-4 h-4 rounded accent-sky-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-semibold text-white block">Система очищення / пом'якшення води</span>
                      <span className="text-xs text-slate-400">Монтаж магістральних колб або зворотного осмосу</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono-numbers font-bold text-sky-400 shrink-0">+3 800 грн</span>
                </label>

                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-white/5 hover:border-sky-500/30 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={includeBoiler}
                      onChange={(e) => setIncludeBoiler(e.target.checked)}
                      className="w-4 h-4 rounded accent-sky-500 cursor-pointer"
                    />
                    <div>
                      <span className="text-sm font-semibold text-white block">Монтаж накопичувального бойлера</span>
                      <span className="text-xs text-slate-400">Підключення з групою безпеки та зливом</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono-numbers font-bold text-sky-400 shrink-0">+2 800 грн</span>
                </label>
              </div>

            </div>

            {/* Live Estimate Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-[#111F36] to-[#0F1A2E] rounded-2xl p-6 sm:p-8 border border-sky-400/30 shadow-2xl relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-600/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Орієнтовний розрахунок</span>
              </div>

              <div className="mb-6">
                <span className="text-xs text-slate-400 block mb-1">Орієнтовна вартість робіт:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-mono-numbers tracking-tight">
                    ≈ {totalEstimate.toLocaleString('uk-UA')}
                  </span>
                  <span className="text-xl font-bold text-sky-400">грн</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  * Точна вартість фіксується в договорі після огляду та вимірювання об'єкта
                </p>
              </div>

              {/* Estimate Breakdown list */}
              <div className="space-y-2.5 py-5 border-y border-white/10 text-xs sm:text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Збирання колекторного вузла вводу:</span>
                  <span className="font-mono-numbers font-semibold text-white">{manifoldBase.toLocaleString('uk-UA')} грн</span>
                </div>
                <div className="flex justify-between">
                  <span>Розведення точок ({waterPoints} шт):</span>
                  <span className="font-mono-numbers font-semibold text-white">{pointsCost.toLocaleString('uk-UA')} грн</span>
                </div>
                {includeUnderfloor && (
                  <div className="flex justify-between">
                    <span>Тепла підлога ({underfloorArea} м²):</span>
                    <span className="font-mono-numbers font-semibold text-white">{underfloorCost.toLocaleString('uk-UA')} грн</span>
                  </div>
                )}
                {includeLeakProtection && (
                  <div className="flex justify-between">
                    <span>Монтаж системи «Антипотоп»:</span>
                    <span className="font-mono-numbers font-semibold text-white">{leakCost.toLocaleString('uk-UA')} грн</span>
                  </div>
                )}
                {includeFiltration && (
                  <div className="flex justify-between">
                    <span>Система фільтрації:</span>
                    <span className="font-mono-numbers font-semibold text-white">{filtrationCost.toLocaleString('uk-UA')} грн</span>
                  </div>
                )}
                {includeBoiler && (
                  <div className="flex justify-between">
                    <span>Монтаж бойлера:</span>
                    <span className="font-mono-numbers font-semibold text-white">{boilerCost.toLocaleString('uk-UA')} грн</span>
                  </div>
                )}
              </div>

              {/* Highlights */}
              <div className="grid grid-cols-2 gap-3 py-5">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Термін виконання</span>
                    <span className="text-xs font-bold text-white font-mono-numbers">{estimatedDays}–{estimatedDays + 1} дні</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center gap-2.5">
                  <Shield className="w-5 h-5 text-sky-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">Гарантія за договором</span>
                    <span className="text-xs font-bold text-white font-mono-numbers">5 років</span>
                  </div>
                </div>
              </div>

              {/* Transfer to Booking CTA */}
              <button
                onClick={handleApplyEstimate}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold text-base shadow-xl shadow-sky-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                <span>Зафіксувати ціну та викликати майстра</span>
              </button>
            </div>

          </div>
        )}

        {/* Tab 2: Full Transparent Pricing Table */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            
            {/* Category filter tabs */}
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedTableCategory('all')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedTableCategory === 'all'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                Всі позиції
              </button>
              {pricingCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTableCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    selectedTableCategory === cat
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-900 text-slate-300 hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-slate-950/60 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Найменування роботи</th>
                    <th className="py-4 px-6">Категорія</th>
                    <th className="py-4 px-4 text-center">Од. виміру</th>
                    <th className="py-4 px-6 text-right">Ціна (грн)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-slate-300">
                  {filteredPricingItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-semibold text-white">{item.serviceName}</div>
                        {item.note && (
                          <div className="text-xs text-slate-400 mt-0.5">{item.note}</div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-xs text-slate-400">
                        {item.category}
                      </td>
                      <td className="py-4 px-4 text-center font-mono-numbers text-xs">
                        {item.unit}
                      </td>
                      <td className="py-4 px-6 text-right font-extrabold text-amber-400 font-mono-numbers text-base">
                        {item.priceUah.toLocaleString('uk-UA')} ₴
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

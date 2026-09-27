import React from 'react';
import { ArrowUpRight, ShieldCheck, Zap, Droplets, Gauge, Flame, Sparkles } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: (serviceName?: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'Ввід води та редуктор тиску',
      desc: 'Міська мережа часто дає скачки тиску до 8-10 бар, що рве гнучкі шланги та псує бойлери. Редуктор тиску Caleffi / Honeywell стабілізує напір на безпечних 3.5 bar.',
      icon: Gauge,
    },
    {
      num: '02',
      title: 'Багаторівнева фільтрація',
      desc: 'Грязьовик затримує пісок і окалину з магістралі, а самопромивний фільтр 100 мкм та колби тонкої очистки продовжують ресурс керамічних картриджів змішувачів у 3-4 рази.',
      icon: Droplets,
    },
    {
      num: '03',
      title: 'Бойлер та лінія рециркуляції ГВП',
      desc: 'Водонагрівач накопичує гарячу воду, а завдяки циркуляційному насосу вона постійно рухається замкненим колом: відкриваєте кран — і окріп тече миттєво, без очікування.',
      icon: Flame,
    },
    {
      num: '04',
      title: 'Колекторна розводка (променева схема)',
      desc: 'Замість послідовних трійників у стінах — окрема цільна труба до кожного споживача. Коли хтось вмикає пралку або набирає воду на кухні, ви в душі не отримуєте опіків.',
      icon: Zap,
    },
    {
      num: '05',
      title: 'Циркуляційні насоси та опалення',
      desc: 'Енергоефективні насоси Wilo / Grundfos безшумно прокачують теплоносій крізь контури теплої підлоги та радіатори з точним регулюванням температури на витратомірах.',
      icon: ShieldCheck,
    },
    {
      num: '06',
      title: 'Підвісні унітази та інсталяції',
      desc: 'Самонесуча сталева рама Geberit витримує до 400 кг навантаження. Бачок захований у стіні з безшумною арматурою, а підлога під унітазом залишається ідеально чистою.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-black text-white px-2 py-0.5 text-xs font-mono-numbers font-bold uppercase tracking-wider">
              Інженерний підхід
            </span>
            <span className="text-xs font-mono-numbers uppercase tracking-wider text-neutral-500">
              «Ваш Сантехнік»
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-black uppercase tracking-tight leading-[1.08]">
            Як працює сучасна сантехніка: від вводу води до змішувача
          </h2>
          <p className="mt-4 text-base text-neutral-600 leading-relaxed font-normal">
            Грамотна інженерія робить так, щоб ви взагалі не думали про труби: відсутні перепади тиску, вода в душі не змінює температуру, бойлер працює роками без поломок, а унітаз змиває практично безшумно.
          </p>
        </div>

        {/* Master Cutaway Visualization Card */}
        <div className="border border-black bg-neutral-50 p-2 sm:p-4 mb-16 shadow-none">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200 border border-neutral-300">
            <img
              src={`${import.meta.env.BASE_URL}images/how-system-works.jpg`}
              alt="Схема та принцип роботи сантехніки: ввід, очистка, бойлер, колектори, опалення, інсталяція"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-black p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-xs font-mono-numbers uppercase tracking-wider font-bold text-black">
                Схема інженерного вузла «Ваш Сантехнік» • Гаряча вода (60°C) + Холодна (21°C) + Опалення
              </span>
              <span className="text-[11px] font-mono-numbers text-neutral-600">
                Київ • Монтаж за стандартами DIN / ДБН
              </span>
            </div>
          </div>
        </div>

        {/* 6 Structural System Nodes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="border border-neutral-300 p-6 bg-white hover:border-black transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200">
                    <span className="font-mono-numbers text-2xl font-black text-black">
                      [{step.num}]
                    </span>
                    <Icon className="w-5 h-5 text-neutral-700" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-black uppercase tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 border border-black bg-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono-numbers uppercase text-neutral-500 tracking-wider block mb-1">
              Індивідуальний підбір обладнання
            </span>
            <h4 className="text-xl sm:text-2xl font-display font-bold uppercase text-black">
              Бажаєте грамотну систему у власній квартирі чи будинку?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
              Прорахую схему під ваш об'єкт, допоможу купити якісні бойлери, труби, насоси та інсталяції зі знижкою майстра.
            </p>
          </div>

          <button
            onClick={() => onOpenBooking('Проектування / Монтаж системи')}
            className="bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider px-8 py-4 shrink-0 flex items-center gap-2 transition-colors"
          >
            <span>Замовити консультацію</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

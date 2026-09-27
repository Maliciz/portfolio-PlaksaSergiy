import React, { useState } from 'react';
import { Phone, CheckCircle2, ArrowUpRight, Shield, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitBooking } from '../services/api';

interface BookingSectionProps {
  initialService?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ initialService = '' }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || 'Встановлення бойлера');
  const [district, setDistrict] = useState('');
  const [comment, setComment] = useState('');

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: { name?: string; phone?: string } = {};
    if (!name.trim()) errs.name = 'Вкажіть ваше ім\'я';
    
    const phoneClean = phone.replace(/[\s\-()+]/g, '');
    if (!phone.trim()) {
      errs.phone = 'Вкажіть контактний телефон';
    } else if (phoneClean.length < 9) {
      errs.phone = 'Введіть коректний номер (наприклад, 067 123 45 67)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await submitBooking({
        name: name.trim(),
        phone: phone.trim(),
        propertyType: district.trim() || 'Київ',
        service,
        comment: comment.trim(),
        date: null,
      });

      if (res.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#000000', '#555555', '#e5e5e5'],
        });
      }
    } catch {
      alert('Помилка надсилання. Зателефонуйте майстру напряму: (067) 890-44-33');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-20 sm:py-28 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with sharp black border */}
        <div className="border-2 border-black p-8 sm:p-12 bg-white">
          
          <div className="mb-8 pb-6 border-b border-neutral-200">
            <span className="font-mono-numbers text-xs uppercase tracking-architectural text-neutral-500 block mb-2">
              «Ваш Сантехнік» • Онлайн-запис
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-black uppercase tracking-tight">
              Запис на виїзд майстра та консультацію
            </h2>
            <p className="mt-2 text-neutral-600 text-sm sm:text-base font-normal">
              Залиште номер телефону та вкажіть ваше завдання (бойлер, насос, труби, унітаз, опалення). Сергій Плакса передзвонить протягом 15 хвилин.
            </p>
          </div>

          {isSuccess ? (
            <div className="py-10 text-center space-y-4 bg-neutral-50 border border-neutral-200 p-6">
              <div className="w-12 h-12 mx-auto bg-black text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display uppercase text-black">
                Заявку прийнято!
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto">
                Дякую, <span className="font-bold text-black">{name}</span>! Я вже отримав заявку і зателефоную на номер <span className="font-mono-numbers font-bold text-black">{phone}</span> найближчим часом.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white text-xs font-mono-numbers uppercase tracking-wider transition-colors"
                >
                  Надіслати ще одну заявку
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono-numbers uppercase tracking-wider text-black mb-2 font-bold">
                    Ваше ім'я *
                  </label>
                  <input
                    type="text"
                    placeholder="Олександр"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    className="w-full sq-input"
                  />
                  {errors.name && (
                    <span className="text-xs text-red-600 font-mono-numbers mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-mono-numbers uppercase tracking-wider text-black mb-2 font-bold">
                    Номер телефону *
                  </label>
                  <input
                    type="tel"
                    placeholder="+38 (067) 123-45-67"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    className="w-full sq-input font-mono-numbers"
                  />
                  {errors.phone && (
                    <span className="text-xs text-red-600 font-mono-numbers mt-1 block">
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Service Selector */}
                <div>
                  <label className="block text-xs font-mono-numbers uppercase tracking-wider text-black mb-2 font-bold">
                    Що потрібно зробити?
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full sq-input bg-white cursor-pointer"
                  >
                    <option value="Встановлення бойлера">Встановлення / заміна бойлера</option>
                    <option value="Монтаж насоса чи насосної станції">Монтаж насоса / насосної станції</option>
                    <option value="Розведення або заміна труб">Розведення / заміна труб (Rehau/поліпропілен)</option>
                    <option value="Монтаж опалення або теплої підлоги">Монтаж опалення або теплої підлоги</option>
                    <option value="Встановлення сантехніки чи інсталяції">Встановлення сантехніки / інсталяції</option>
                    <option value="Фільтрація або очищення води">Фільтрація води / зворотний осмос</option>
                    <option value="Інші сантехнічні роботи">Інші сантехнічні роботи</option>
                  </select>
                </div>

                {/* District / Address */}
                <div>
                  <label className="block text-xs font-mono-numbers uppercase tracking-wider text-black mb-2 font-bold">
                    Район Києва чи населений пункт
                  </label>
                  <input
                    type="text"
                    placeholder="Наприклад: Позняки, або с. Гореничі"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full sq-input"
                  />
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-mono-numbers uppercase tracking-wider text-black mb-2 font-bold">
                  Короткий опис задачі (необов'язково)
                </label>
                <textarea
                  rows={3}
                  placeholder="Опишіть деталі: який бойлер або насос потрібно встановити, чи потрібен демонтаж старого тощо..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full sq-input resize-none"
                />
              </div>

              {/* Plumber note */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs font-mono-numbers text-neutral-600 border-t border-neutral-200">
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-black shrink-0" />
                  <span>Без передоплат. Оплата після перевірки виконаної роботи.</span>
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-black shrink-0" />
                  <span>Відповідь протягом 15 хвилин</span>
                </span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{isSubmitting ? 'Надсилання...' : 'Надіслати заявку на виїзд майстра'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {/* Direct call alternative */}
              <div className="text-center pt-2">
                <span className="text-xs text-neutral-500 font-mono-numbers">
                  Або зателефонуйте прямо зараз:{' '}
                </span>
                <a
                  href="tel:+380678904433"
                  className="text-xs font-bold font-mono-numbers text-black hover:underline"
                >
                  <Phone className="w-3.5 h-3.5 inline mr-1" />
                  (067) 890-44-33
                </a>
              </div>
            </form>
          )}

        </div>

      </div>
    </section>
  );
};

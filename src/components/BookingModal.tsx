import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/uk';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';
import { submitBooking } from '../services/api';
import type { BookingFormValues } from '../types';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  initialService?: string;
  initialBudget?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  initialService = '',
  initialBudget = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [propertyType, setPropertyType] = useState('Квартира в новобудові');
  const [service, setService] = useState('Монтаж систем опалення');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs().add(1, 'day'));
  const [comment, setComment] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  // Loading & Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync initial service if passed from CTA
  useEffect(() => {
    if (initialService) {
      setService(initialService);
    }
    if (initialBudget) {
      setComment((prev) => (prev ? `${prev}\nБюджет: ${initialBudget}` : `Бюджет з калькулятора: ${initialBudget}`));
    }
  }, [initialService, initialBudget, open]);

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Будь ласка, вкажіть ваше ім\'я';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Ім\'я повинно містити щонайменше 2 символи';
    }

    // Phone validation (standard Ukrainian numbers format)
    const phoneClean = phone.replace(/[\s\-\(\)\+]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Вкажіть номер телефону для зв\'язку';
    } else if (phoneClean.length < 9) {
      newErrors.phone = 'Введіть коректний номер телефону (наприклад, 067 123 45 67)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload: BookingFormValues = {
      name: name.trim(),
      phone: phone.trim(),
      propertyType,
      service,
      date: selectedDate ? selectedDate.format('YYYY-MM-DD') : null,
      comment: comment.trim(),
      estimatedBudget: initialBudget || undefined,
    };

    try {
      const response = await submitBooking(payload);
      if (response.success) {
        setIsSuccess(true);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0284c7', '#38bdf8', '#d97706', '#f59e0b', '#10b981'],
        });
      }
    } catch (err) {
      setToastMessage('Сталася помилка при відправці. Спробуйте зателефонувати безпосередньо.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setComment('');
    setErrors({});
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="uk">
      <Dialog
        open={open}
        onClose={handleResetAndClose}
        maxWidth="sm"
        fullWidth
        scroll="body"
        slotProps={{
          paper: {
            className: 'bg-[#0F1A2E] text-white border border-sky-500/30 rounded-2xl shadow-2xl overflow-hidden',
          },
        }}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-white/10 bg-gradient-to-r from-slate-900 to-[#111F36]">
          <IconButton
            onClick={handleResetAndClose}
            size="small"
            className="absolute top-5 right-5 text-slate-400 hover:text-white"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </IconButton>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-400 text-xs font-bold border border-sky-800 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Безкоштовний виїзд та замір</span>
          </div>

          <DialogTitle className="p-0 text-2xl font-extrabold text-white tracking-tight">
            Запис на консультацію майстра
          </DialogTitle>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Сергій Плакса зв'яжеться з вами протягом 15 хвилин для уточнення деталей.
          </p>
        </div>

        <DialogContent className="p-6 sm:p-8">
          {/* Success State */}
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-white">Заявку успішно прийнято!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Дякую, <span className="font-semibold text-white">{name}</span>! Я отримав ваше повідомлення та вже ознайомлююся з деталями. Зателефоную на номер <span className="font-mono-numbers text-sky-400 font-semibold">{phone}</span> протягом кількох хвилин.
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 max-w-sm mx-auto text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Об'єкт:</span>
                  <span className="font-semibold text-slate-200">{propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span>Послуга:</span>
                  <span className="font-semibold text-slate-200">{service}</span>
                </div>
                {selectedDate && (
                  <div className="flex justify-between">
                    <span>Бажана дата:</span>
                    <span className="font-semibold text-sky-300 font-mono-numbers">
                      {selectedDate.format('DD.MM.YYYY')}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleResetAndClose}
                  variant="contained"
                  fullWidth
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 rounded-xl shadow-lg"
                >
                  Зрозуміло, чекаю дзвінка
                </Button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name */}
              <div>
                <TextField
                  label="Ваше ім'я *"
                  placeholder="Олександр"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                  }}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  disabled={isSubmitting}
                />
              </div>

              {/* Phone */}
              <div>
                <TextField
                  label="Номер телефону *"
                  placeholder="+380 (67) 123-45-67"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  disabled={isSubmitting}
                />
              </div>

              {/* Property Type Select */}
              <FormControl fullWidth>
                <InputLabel id="property-type-label">Тип об'єкта</InputLabel>
                <Select
                  labelId="property-type-label"
                  value={propertyType}
                  label="Тип об'єкта"
                  onChange={(e) => setPropertyType(e.target.value)}
                  disabled={isSubmitting}
                >
                  <MenuItem value="Квартира в новобудові">Квартира в новобудові</MenuItem>
                  <MenuItem value="Вторинне житло (реконструкція)">Вторинне житло (реконструкція)</MenuItem>
                  <MenuItem value="Приватний будинок / Котедж">Приватний будинок / Котедж</MenuItem>
                  <MenuItem value="Комерційне приміщення">Комерційне приміщення / Офіс</MenuItem>
                </Select>
              </FormControl>

              {/* Service Select */}
              <FormControl fullWidth>
                <InputLabel id="service-select-label">Необхідна послуга</InputLabel>
                <Select
                  labelId="service-select-label"
                  value={service}
                  label="Необхідна послуга"
                  onChange={(e) => setService(e.target.value)}
                  disabled={isSubmitting}
                >
                  <MenuItem value="Монтаж систем опалення">Монтаж систем опалення (тепла підлога, радіатори)</MenuItem>
                  <MenuItem value="Розведення водопостачання та каналізації">Розведення водопостачання та каналізації (Rehau)</MenuItem>
                  <MenuItem value="Встановлення чистової сантехніки">Встановлення чистової сантехніки (інсталяції, трапи)</MenuItem>
                  <MenuItem value="Системи пом'якшення та очищення води">Системи пом'якшення та очищення води</MenuItem>
                  <MenuItem value="Монтаж котелень та теплопунктів">Монтаж котелень та теплопунктів під ключ</MenuItem>
                  <MenuItem value="Терміновий аварійний виклик">Терміновий виклик / усунення несправностей</MenuItem>
                </Select>
              </FormControl>

              {/* DatePicker */}
              <div>
                <DatePicker
                  label="Бажана дата огляду / заміру"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  minDate={dayjs()}
                  disabled={isSubmitting}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      helperText: 'Огляд проводиться безкоштовно у зручний для вас час',
                    },
                  }}
                />
              </div>

              {/* Comment / Note */}
              <div>
                <TextField
                  label="Короткий опис задачі (необов'язково)"
                  placeholder="Наприклад: 2 санвузли, ЖК Варшавський, розведення Rehau та тепла підлога 45 кв.м."
                  multiline
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Guarantee notice */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Конфіденційність гарантовано. Жодного спаму.</span>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                className="py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-extrabold text-base shadow-xl rounded-xl transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <CircularProgress size={20} color="inherit" />
                    <span>Відправка заявки...</span>
                  </div>
                ) : (
                  <span>Підтвердити запис на замір</span>
                )}
              </Button>
            </form>
          )}
        </DialogContent>

        {/* Snackbar notification */}
        <Snackbar
          open={Boolean(toastMessage)}
          autoHideDuration={6000}
          onClose={() => setToastMessage(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setToastMessage(null)} severity="error" sx={{ width: '100%' }}>
            {toastMessage}
          </Alert>
        </Snackbar>
      </Dialog>
    </LocalizationProvider>
  );
};

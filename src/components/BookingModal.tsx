import React, { useState } from 'react';
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
  IconButton,
} from '@mui/material';
import confetti from 'canvas-confetti';
import { X, CheckCircle2, ArrowUpRight, Phone } from 'lucide-react';
import { submitBooking } from '../services/api';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  initialService?: string;
}

interface BookingFormContentProps {
  onClose: () => void;
  initialService?: string;
}

const BookingFormContent: React.FC<BookingFormContentProps> = ({
  onClose,
  initialService = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || 'Встановлення бойлера');
  const [comment, setComment] = useState('');

  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: { name?: string; phone?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Вкажіть ваше ім\'я';
    }

    const phoneClean = phone.replace(/[\s\-()+]/g, '');
    if (!phone.trim()) {
      newErrors.phone = 'Вкажіть номер телефону';
    } else if (phoneClean.length < 9) {
      newErrors.phone = 'Введіть коректний номер (наприклад, 067 123 45 67)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await submitBooking({
        name: name.trim(),
        phone: phone.trim(),
        propertyType: 'Київ / Область',
        service,
        comment: comment.trim(),
        date: null,
      });

      if (response.success) {
        setIsSuccess(true);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#000000', '#555555', '#e5e5e5'],
        });
      }
    } catch {
      alert('Помилка відправки. Зателефонуйте майстру напряму: (067) 890-44-33');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-black p-6 sm:p-8 border border-black">
      {/* Header */}
      <div className="relative pb-4 mb-6 border-b border-neutral-200">
        <IconButton
          onClick={onClose}
          size="small"
          className="absolute top-0 right-0 text-black"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </IconButton>

        <span className="font-mono-numbers text-[10px] uppercase tracking-architectural text-neutral-500 block mb-1">
          Запис до сантехніка
        </span>

        <DialogTitle className="p-0 text-2xl font-display font-bold text-black uppercase tracking-tight">
          Виклик майстра на замір
        </DialogTitle>
        
        <p className="text-xs text-neutral-600 mt-1 font-normal">
          Сергій Плакса зв'яжеться з вами протягом 15 хвилин для узгодження виїзду.
        </p>
      </div>

      <DialogContent className="p-0">
        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 mx-auto bg-black text-white flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-display font-bold uppercase text-black">
              Заявку прийнято
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto leading-relaxed">
              Дякую, <span className="font-bold text-black">{name}</span>! Зателефоную на номер <span className="font-mono-numbers font-bold text-black">{phone}</span> найближчим часом.
            </p>

            <div className="pt-2">
              <Button
                onClick={onClose}
                variant="contained"
                fullWidth
                className="bg-black hover:bg-neutral-800 text-white font-bold py-3 text-xs uppercase tracking-wider"
              >
                Закрити
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
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
              />
            </div>

            {/* Phone */}
            <div>
              <TextField
                label="Номер телефону *"
                placeholder="+38 (067) 123-45-67"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
              />
            </div>

            {/* Service */}
            <FormControl fullWidth>
              <InputLabel id="service-modal-label">Що потрібно зробити?</InputLabel>
              <Select
                labelId="service-modal-label"
                value={service}
                label="Що потрібно зробити?"
                onChange={(e) => setService(e.target.value)}
              >
                <MenuItem value="Встановлення бойлера">Встановлення / заміна бойлера</MenuItem>
                <MenuItem value="Монтаж насоса чи насосної станції">Монтаж насоса / насосної станції</MenuItem>
                <MenuItem value="Розведення або заміна труб">Розведення / заміна труб</MenuItem>
                <MenuItem value="Монтаж опалення або теплої підлоги">Монтаж опалення або теплої підлоги</MenuItem>
                <MenuItem value="Встановлення сантехніки чи інсталяції">Встановлення сантехніки / інсталяції</MenuItem>
                <MenuItem value="Фільтрація або очищення води">Фільтрація або очищення води</MenuItem>
                <MenuItem value="Інші сантехнічні роботи">Інші сантехнічні роботи</MenuItem>
              </Select>
            </FormControl>

            {/* Comment */}
            <div>
              <TextField
                label="Район або короткий опис задачі"
                placeholder="Наприклад: Позняки, встановити бойлер 80л..."
                multiline
                rows={2}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                className="bg-black hover:bg-neutral-800 text-white font-bold py-3.5 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <CircularProgress size={18} color="inherit" />
                ) : (
                  <>
                    <span>Надіслати заявку</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>

            <div className="text-center pt-1">
              <a
                href="tel:+380678904433"
                className="text-xs font-mono-numbers text-neutral-600 hover:text-black"
              >
                <Phone className="w-3 h-3 inline mr-1" />
                (067) 890-44-33
              </a>
            </div>
          </form>
        )}
      </DialogContent>
    </div>
  );
};

export const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onClose,
  initialService = '',
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          style: {
            borderRadius: 0,
            border: '1px solid black',
          },
        },
      }}
    >
      {open && (
        <BookingFormContent
          onClose={onClose}
          initialService={initialService}
        />
      )}
    </Dialog>
  );
};

import axios from 'axios';
import type { BookingFormValues } from '../types';

// Axios instance configured for lead/booking requests
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface BookingResponse {
  success: boolean;
  message: string;
  leadId?: string;
}

export const submitBooking = async (formData: BookingFormValues): Promise<BookingResponse> => {
  try {
    // Attempt real backend call if configured
    const response = await apiClient.post<BookingResponse>('/leads', {
      ...formData,
      timestamp: new Date().toISOString(),
      source: window.location.hostname,
    });
    return response.data;
  } catch (err) {
    console.warn('API call fallback mode active (demonstration/static hosting):', err);
    
    // Save to localStorage for demo persistence
    try {
      const existingLeads = JSON.parse(localStorage.getItem('plaksa_leads') || '[]');
      const newLead = {
        ...formData,
        id: `LEAD-${Date.now().toString().slice(-6)}`,
        createdAt: new Date().toLocaleString('uk-UA'),
      };
      existingLeads.unshift(newLead);
      localStorage.setItem('plaksa_leads', JSON.stringify(existingLeads));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }

    // Simulate realistic network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: 'Дякуємо! Ваша заявка успішно зареєстрована. Сергій зв\'яжеться з вами протягом 15 хвилин.',
      leadId: `PLK-${Date.now().toString().slice(-5)}`,
    };
  }
};

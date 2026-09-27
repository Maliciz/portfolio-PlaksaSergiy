export type ServiceCategory = 'all' | 'boilers' | 'pumps' | 'pipes' | 'underfloor' | 'bathrooms';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  priceFrom: number;
  priceUnit: string;
  features: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  location: string;
  materials: string[];
  coverImage: string;
  description: string;
}

export interface BookingFormValues {
  name: string;
  phone: string;
  service: string;
  propertyType?: string;
  date?: string | null;
  comment?: string;
  estimatedBudget?: string;
}

export interface PriceItem {
  id: string;
  serviceName: string;
  unit: string;
  priceUah: number;
  category: string;
  note?: string;
}

export interface Testimonial {
  id: string;
  authorName: string;
  location: string;
  avatar?: string;
  rating: number;
  date: string;
  serviceType: string;
  reviewText: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

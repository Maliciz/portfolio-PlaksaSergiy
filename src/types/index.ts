export type ServiceCategory = 'all' | 'boilers' | 'underfloor' | 'bathrooms' | 'filtration';

export interface ServiceItem {
  id: string;
  title: string;
  category: ServiceCategory;
  shortDesc: string;
  fullDesc: string;
  priceFrom: number;
  priceUnit: string;
  iconName: string;
  popular?: boolean;
  features: string[];
  warrantyYears: number;
  standards: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  location: string;
  residentialComplex: string;
  year: string;
  durationDays: number;
  materials: string[];
  coverImage: string;
  galleryImages: string[];
  description: string;
  results: string[];
  systemSpecs: {
    label: string;
    value: string;
  }[];
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

export interface BookingFormValues {
  name: string;
  phone: string;
  propertyType: string;
  service: string;
  date: string | null;
  comment: string;
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

export interface FAQItem {
  question: string;
  answer: string;
  tag: string;
}

import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { darkMuiTheme } from './theme/muiTheme';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Advantages } from './components/Advantages';
import { Services } from './components/Services';
import { BeforeAfter } from './components/BeforeAfter';
import { Portfolio } from './components/Portfolio';
import { PriceCalculator } from './components/PriceCalculator';
import { Workflow } from './components/Workflow';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingCTA } from './components/FloatingCTA';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [estimatedBudget, setEstimatedBudget] = useState<string>('');

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedService(serviceName || 'Монтаж систем опалення');
    setEstimatedBudget('');
    setIsBookingOpen(true);
  };

  const handleBookWithEstimate = ({ service, budget }: { service: string; budget: string }) => {
    setSelectedService(service);
    setEstimatedBudget(budget);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <ThemeProvider theme={darkMuiTheme}>
      <div className="min-h-screen bg-[#0B1320] text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
        
        {/* Navigation & Emergency Bar */}
        <Header onOpenBooking={handleOpenBooking} />

        {/* Hero Section */}
        <main className="flex-grow">
          <Hero onOpenBooking={() => handleOpenBooking()} />

          {/* Advantages / Why Serhii */}
          <Advantages />

          {/* Services Grid */}
          <Services onSelectService={(serviceTitle) => handleOpenBooking(serviceTitle)} />

          {/* Interactive Before / After Slider */}
          <BeforeAfter />

          {/* Dynamic Portfolio with Gallery Modal */}
          <Portfolio onBookProject={(title) => handleOpenBooking(`Об'єкт схожий на: ${title}`)} />

          {/* Interactive Price Calculator & Transparent Price Table */}
          <div id="pricing">
            <PriceCalculator onBookWithEstimate={handleBookWithEstimate} />
          </div>

          {/* 5-Step Workflow Process */}
          <Workflow />

          {/* Reviews & Testimonials */}
          <Reviews />

          {/* FAQ Accordion */}
          <FAQ />
        </main>

        {/* Footer */}
        <Footer onOpenBooking={() => handleOpenBooking()} />

        {/* Floating Quick Action CTA for mobile and scroll */}
        <FloatingCTA onOpenBooking={() => handleOpenBooking()} />

        {/* Interactive MUI Booking Modal with DatePicker & Axios Submission */}
        <BookingModal
          open={isBookingOpen}
          onClose={handleCloseBooking}
          initialService={selectedService}
          initialBudget={estimatedBudget}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;

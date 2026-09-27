import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { whiteMuiTheme } from './theme/muiTheme';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';

export const App: React.FC = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Встановлення бойлера');

  const handleOpenBooking = (serviceName?: string) => {
    setSelectedService(serviceName || 'Встановлення бойлера');
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <ThemeProvider theme={whiteMuiTheme}>
      <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white">
        
        {/* Navigation */}
        <Header onOpenBooking={handleOpenBooking} />

        {/* Main Content */}
        <main className="flex-grow">
          {/* Hero Section */}
          <Hero onOpenBooking={handleOpenBooking} />

          {/* Real Plumber Works Showcase (Pumps, Boilers, Pipes, Heating) */}
          <Portfolio onBookProject={(title) => handleOpenBooking(`Робота схожа на: ${title}`)} />

          {/* Core Services & Transparent Prices */}
          <Services onSelectService={(serviceTitle) => handleOpenBooking(serviceTitle)} />

          {/* Fast On-Page Client Booking Form */}
          <BookingSection initialService={selectedService} />
        </main>

        {/* Minimal Plumber Footer */}
        <Footer />

        {/* Direct Booking Modal for buttons */}
        <BookingModal
          open={isBookingOpen}
          onClose={handleCloseBooking}
          initialService={selectedService}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;

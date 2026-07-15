import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Info, Calendar, X, AlertCircle } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import WhyChooseUs from './components/WhyChooseUs';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

import Customizer from './components/Customizer';
import ReservationModal from './components/ReservationModal';
import { Reservation, CustomDrink } from './types';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  
  // Active currency setting: Default to INR as requested
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  
  // List of active table bookings in cache
  const [activeReservations, setActiveReservations] = useState<Reservation[]>([]);
  
  // Custom toast alert
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // Load active bookings on start
  useEffect(() => {
    const saved = localStorage.getItem('midnight_brew_reservations');
    if (saved) {
      try {
        setActiveReservations(JSON.parse(saved));
      } catch (e) {
        setActiveReservations([]);
      }
    }
  }, []);

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Callback to store a table booking
  const handleSaveReservation = (res: Reservation) => {
    const updated = [...activeReservations, res];
    setActiveReservations(updated);
    localStorage.setItem('midnight_brew_reservations', JSON.stringify(updated));
    triggerToast(`Table successfully reserved! Confirmed Code: ${res.id.toUpperCase()}`, 'success');
  };

  // Callback to delete/cancel a booking
  const handleCancelReservation = (id: string) => {
    const updated = activeReservations.filter(res => res.id !== id);
    setActiveReservations(updated);
    localStorage.setItem('midnight_brew_reservations', JSON.stringify(updated));
    triggerToast('Table reservation cancelled.', 'info');
  };

  // Callback when they compile a custom signature drink
  const handleOrderCustomDrink = (drink: CustomDrink, name: string, price: number) => {
    const priceString = currency === 'INR' ? `₹${price.toFixed(0)}` : `$${price.toFixed(2)}`;
    triggerToast(`"${name}" (${priceString}) was successfully compiled and added to your favorites!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 antialiased selection:bg-amber-800/15 selection:text-amber-900 font-sans">
      
      {/* Navigation Header */}
      <Navbar 
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenCustomizer={() => setIsCustomizerOpen(true)}
        activeReservationsCount={activeReservations.length}
        currency={currency}
        onToggleCurrency={() => setCurrency(prev => prev === 'INR' ? 'USD' : 'INR')}
      />

      {/* Main Sections */}
      <main className="overflow-x-hidden">
        <Hero 
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
        
        <About />
        
        <Menu 
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
          currency={currency}
        />
        
        <WhyChooseUs />
        
        <Gallery />
        
        {/* Dynamic active reservation manager */}
        {activeReservations.length > 0 && (
          <section className="py-12 bg-amber-950 text-white relative border-y border-amber-500/15">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-amber-400" size={20} />
                <h3 className="font-serif text-lg tracking-wider uppercase text-amber-100">Your Active Bookings</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AnimatePresence mode="popLayout">
                  {activeReservations.map(res => (
                    <motion.div 
                      key={res.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-stone-900 rounded-2xl p-5 border border-amber-500/20 flex flex-col justify-between relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 blur-xl rounded-full" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-xs font-mono text-stone-400 uppercase">GUEST PASS</p>
                          <h4 className="font-serif text-amber-300 text-base">{res.name}</h4>
                        </div>
                        <button 
                          onClick={() => handleCancelReservation(res.id)}
                          className="p-1 rounded-lg text-stone-500 hover:text-rose-400 transition"
                          title="Cancel Reservation"
                        >
                          <X size={16} />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-xs font-sans pb-3 border-b border-stone-800">
                        <div>
                          <span className="text-[9px] font-mono text-stone-500 block">DATE</span>
                          <span className="font-medium text-stone-200">{res.date}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-stone-500 block">HOUR</span>
                          <span className="font-medium text-stone-200">{res.time}</span>
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-stone-500 block">TABLE</span>
                          <span className="font-medium text-amber-200">{res.seatingArea}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-3 text-[10px] font-mono text-stone-400">
                        <span>SIZE: {res.guests} GUESTS</span>
                        <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/30">
                          CONFIRMED: {res.id.toUpperCase()}
                        </span>
                      </div>

                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        <Reviews />
        
        <FAQ />
        
        <Contact />
      </main>

      {/* Footer credits & quick connections */}
      <Footer />

      {/* Slide-out / Pop-up Dialog Modals */}
      <AnimatePresence>
        {isCustomizerOpen && (
          <Customizer 
            isOpen={isCustomizerOpen}
            onClose={() => setIsCustomizerOpen(false)}
            onOrderCustom={handleOrderCustomDrink}
            currency={currency}
          />
        )}

        {isReservationOpen && (
          <ReservationModal 
            isOpen={isReservationOpen}
            onClose={() => setIsReservationOpen(false)}
            onSave={handleSaveReservation}
          />
        )}
      </AnimatePresence>

      {/* Luxurious Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 max-w-sm bg-stone-900 border border-amber-400/30 text-white rounded-2xl p-4 shadow-2xl flex gap-3 items-center"
          >
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/15">
              {toast.type === 'success' ? <Check size={18} /> : <Info size={18} />}
            </div>
            <div className="flex-grow">
              <p className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold leading-none mb-1">
                {toast.type === 'success' ? 'Midnight Alert' : 'Notification'}
              </p>
              <p className="text-xs text-stone-300 font-sans leading-relaxed">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToast(null)}
              className="text-stone-500 hover:text-white transition"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

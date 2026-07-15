import React, { useState, useEffect } from 'react';
import { Coffee, Menu, X, Sparkles, CalendarDays } from 'lucide-react';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenCustomizer: () => void;
  activeReservationsCount: number;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
}

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'Our Story' },
  { href: '#menu', label: 'Menu' },
  { href: '#why-us', label: 'Why Midnight' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' }
];

export default function Navbar({ onOpenReservation, onOpenCustomizer, activeReservationsCount, currency, onToggleCurrency }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple scroll spy
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-amber-50/80 backdrop-blur-md border-b border-amber-100/50 shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
      id="main-navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-amber-200/50 shadow-sm bg-amber-50/20">
              <img 
                src="/logo.svg" 
                alt="Midnight Brew Logo" 
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider uppercase text-stone-900 leading-none">Midnight Brew</span>
              <span className="text-[9px] font-mono tracking-widest text-amber-800 uppercase leading-none mt-1">Café &amp; Roastery</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a 
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-sans font-semibold uppercase tracking-wider transition hover:text-amber-800 ${
                    isActive ? 'text-amber-900 border-b-2 border-amber-900/50 pb-1' : 'text-stone-600'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Nav Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 text-stone-800 text-[11px] font-mono transition border border-amber-200/50 shadow-xs"
              title="Switch currency"
            >
              <span className={currency === 'INR' ? 'text-amber-900 font-bold' : 'text-stone-400 font-normal'}>₹ INR</span>
              <span className="text-stone-300">|</span>
              <span className={currency === 'USD' ? 'text-amber-900 font-bold' : 'text-stone-400 font-normal'}>$ USD</span>
            </button>

            {/* Custom Drink Builder */}
            <button
              onClick={onOpenCustomizer}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-amber-200/60 text-amber-900 text-xs font-semibold hover:bg-amber-900 hover:text-amber-50 transition shadow-xs"
            >
              <Sparkles size={13} className="text-amber-800 animate-pulse" />
              <span>Brew Lab</span>
            </button>

            {/* Table Reservation */}
            <button
              onClick={onOpenReservation}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold tracking-wider uppercase transition shadow-md hover:shadow-amber-900/10"
            >
              <CalendarDays size={14} />
              <span>Reserve Table</span>
              {activeReservationsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {activeReservationsCount}
                </span>
              )}
            </button>
          </div>

          {/* Hamburger Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Short-path brew button on mobile header */}
            <button
              onClick={onOpenCustomizer}
              className="p-2 rounded-full bg-white border border-amber-100 text-amber-800 shadow-xs hover:bg-amber-50"
              aria-label="Open Brew Lab"
            >
              <Sparkles size={16} />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-stone-700 hover:bg-amber-50 focus:outline-none transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <div 
        className={`lg:hidden fixed inset-x-0 bg-amber-50/98 backdrop-blur-lg border-b border-amber-100 shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-30 ${
          isOpen ? 'top-[72px] max-h-screen opacity-100 py-6' : 'top-[-400px] max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 space-y-4">
          {/* Currency Switcher (Mobile) */}
          <div className="flex justify-between items-center pb-2 border-b border-amber-100/50">
            <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500">Active Currency</span>
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-amber-200/60 text-stone-800 text-[11px] font-mono transition shadow-xs"
            >
              <span className={currency === 'INR' ? 'text-amber-900 font-bold' : 'text-stone-400'}>₹ INR</span>
              <span className="text-stone-300">|</span>
              <span className={currency === 'USD' ? 'text-amber-900 font-bold' : 'text-stone-400'}>$ USD</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-amber-100">
            <button
              onClick={() => { onOpenCustomizer(); setIsOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-amber-200 text-amber-900 text-xs font-semibold hover:bg-amber-900 hover:text-amber-50 transition"
            >
              <Sparkles size={13} className="text-amber-800" />
              <span>Brew Lab</span>
            </button>

            <button
              onClick={() => { onOpenReservation(); setIsOpen(false); }}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-900 text-amber-50 text-xs font-bold uppercase tracking-wider hover:bg-amber-950 transition"
            >
              <CalendarDays size={13} />
              <span>Book Table</span>
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {NAV_LINKS.map(link => (
              <a 
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-stone-700 hover:text-amber-900 py-1.5 px-3 rounded-lg hover:bg-amber-900/5 transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

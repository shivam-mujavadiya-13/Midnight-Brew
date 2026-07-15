import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, MapPin } from 'lucide-react';

interface HeroProps {
  onOpenReservation: () => void;
  onOpenCustomizer: () => void;
}

export default function Hero({ onOpenReservation, onOpenCustomizer }: HeroProps) {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-stone-900"
    >
      {/* Background Image with warm overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1600" 
          alt="Midnight Brew Cozy Café Interior" 
          className="w-full h-full object-cover object-center opacity-40 scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-50 via-stone-950/70 to-stone-950/90" />
      </div>

      {/* Floating decorative coffee beans */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div 
          animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] text-amber-100/10 text-4xl hidden md:block"
        >
          ☕
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[30%] right-[12%] text-amber-100/10 text-5xl hidden md:block"
        >
          🫘
        </motion.div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Little badge */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2 bg-amber-500/10 text-amber-200 border border-amber-500/20 px-4 py-1.5 rounded-full mb-6"
        >
          <Sparkles size={12} className="text-amber-300" />
          <span className="text-[10px] font-mono uppercase tracking-widest font-semibold">In-House Micro Roastery</span>
        </motion.div>

        {/* Brand Main Slogan Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-amber-50 font-medium tracking-tight max-w-4xl leading-[1.1] mb-6"
        >
          Crafted with <span className="text-amber-300 italic">Passion</span>,<br />
          Served with <span className="text-amber-200 font-normal">Love</span>.
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-stone-300 font-sans text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-10"
        >
          Experience freshly brewed artisanal coffee, delicious daily-baked French pastries, and a warm, luxurious atmosphere tailored for quiet moments and deep connections.
        </motion.p>

        {/* Hero Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md"
        >
          {/* Menu Trigger */}
          <a 
            href="#menu"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-800 hover:bg-amber-900 text-amber-50 font-bold uppercase tracking-wider text-xs shadow-xl hover:shadow-amber-900/30 active:translate-y-0.5 transition flex items-center justify-center gap-2"
          >
            <Compass size={14} />
            Explore Our Menu
          </a>

          {/* Visit trigger / location info */}
          <a 
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold uppercase tracking-wider text-xs border border-white/20 backdrop-blur-xs transition flex items-center justify-center gap-2"
          >
            <MapPin size={14} className="text-amber-300" />
            Visit Us Today
          </a>
        </motion.div>

        {/* Micro-Features banner at the bottom */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 sm:mt-24 grid grid-cols-3 gap-4 sm:gap-12 w-full border-t border-white/10 pt-8"
        >
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-serif text-amber-300 font-bold">100%</p>
            <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-stone-400">Ethical Beans</p>
          </div>
          <div className="text-center border-x border-white/10 px-2">
            <p className="text-xl sm:text-2xl font-serif text-amber-300 font-bold">7am - 11pm</p>
            <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-stone-400">Daily Serve</p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-serif text-amber-300 font-bold">15+</p>
            <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-stone-400">Specialty Roasts</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

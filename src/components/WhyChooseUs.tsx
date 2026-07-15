import React from 'react';
import { Sparkles, UserCheck, Coffee, Wifi, Clock, Award } from 'lucide-react';
import { WHY_CHOOSE_US_ITEMS } from '../data';

// Map icon string to Lucide component
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Sparkles,
  UserCheck,
  Coffee,
  Wifi,
  Clock,
  Award
};

export default function WhyChooseUs() {
  return (
    <section 
      id="why-us" 
      className="py-24 sm:py-32 bg-amber-50/10 relative overflow-hidden"
    >
      {/* Decorative ambient background blur */}
      <div className="absolute bottom-[10%] right-[-15%] w-[35%] h-[35%] bg-amber-200/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-3 block">Elevated Standards</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight font-medium mb-4">Why Select Midnight Brew?</h2>
          <p className="text-stone-500 font-sans text-sm sm:text-base">
            We are dedicated to refining every micro-interaction, ensuring that every sip is perfect and every visit feels like a luxury retreat.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US_ITEMS.map((item, idx) => {
            const IconComponent = ICON_MAP[item.icon] || Coffee;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-8 border border-stone-150/80 hover:border-amber-900/10 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col items-start"
              >
                {/* Icon Badge */}
                <div className="p-3.5 rounded-2xl bg-amber-100/50 text-amber-900 group-hover:bg-amber-900 group-hover:text-amber-50 transition-all duration-500 mb-6 shadow-xs">
                  <IconComponent size={22} className="stroke-[1.75]" />
                </div>

                {/* Title & Description */}
                <h3 className="font-serif text-xl font-semibold text-stone-900 mb-3 group-hover:text-amber-800 transition duration-300">
                  {item.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Micro banner for cozy beans quality */}
        <div className="mt-16 text-center border-t border-stone-200/60 pt-8 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-xs font-mono text-stone-400">
          <span className="flex items-center gap-1.5">🛡️ Certified Fair-Trade Beans Only</span>
          <span className="hidden sm:inline-block">|</span>
          <span className="flex items-center gap-1.5">🥛 100% Organic Plant & Dairy Milks</span>
          <span className="hidden sm:inline-block">|</span>
          <span className="flex items-center gap-1.5">✨ Zero Artificial Additives</span>
        </div>

      </div>
    </section>
  );
}

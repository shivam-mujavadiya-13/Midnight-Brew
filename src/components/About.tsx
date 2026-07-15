import React from 'react';
import { Award, Leaf, Users, Quote } from 'lucide-react';

export default function About() {
  return (
    <section 
      id="about" 
      className="py-24 sm:py-32 bg-amber-50/30 relative overflow-hidden"
    >
      {/* Decorative wood grain tone blob */}
      <div className="absolute top-[10%] left-[-10%] w-[30%] h-[30%] bg-amber-200/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Images Collage */}
          <div className="relative group">
            {/* Soft gold backdrop frame */}
            <div className="absolute -inset-4 rounded-3xl bg-amber-200/20 blur-lg group-hover:scale-105 transition duration-500" />
            
            <div className="relative space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-4/3 relative">
                <img 
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800" 
                  alt="Midnight Brew Bright Café Setting" 
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-amber-900/5" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg h-36">
                  <img 
                    src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400" 
                    alt="Barista brewing coffee" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg h-36 relative flex items-center justify-center bg-stone-900 text-amber-100 p-4 border border-amber-500/10">
                  <div className="text-center">
                    <p className="text-2xl font-serif font-bold text-amber-300">Est. 2024</p>
                    <p className="text-[9px] font-mono uppercase tracking-widest text-stone-400 mt-1">Roasting Daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Text & Brand Slogan */}
          <div className="flex flex-col">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-semibold mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-amber-800" />
              Our Sacred Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight font-medium mb-6">
              A Symphony of Coffee, Art, and Quiet Luxury.
            </h2>
            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed mb-6">
              Born from a vision to elevate everyday coffee encounters into memorable therapeutic rituals, <strong className="text-stone-800">Midnight Brew</strong> blends old-world European charm with modern roasting science.
            </p>
            <p className="text-stone-600 font-sans text-sm sm:text-base leading-relaxed mb-8">
              Whether you are catching up with loved ones, discovering rare single-origins, or seeking a quiet sanctuary to focus on remote work, our warm velvet benches, ambient jazz, and comforting aromas provide the perfect luxurious backdrop.
            </p>

            {/* Micro Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-amber-100">
              {/* Pillar 1 */}
              <div className="flex flex-col items-start">
                <div className="p-2 rounded-lg bg-amber-100/50 text-amber-950 mb-3">
                  <Leaf size={16} />
                </div>
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">Ethical Beans</h4>
                <p className="text-[11px] text-stone-500">Sourced directly from sustainable micro-lots in Ethiopia & Peru.</p>
              </div>

              {/* Pillar 2 */}
              <div className="flex flex-col items-start">
                <div className="p-2 rounded-lg bg-amber-100/50 text-amber-950 mb-3">
                  <Award size={16} />
                </div>
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">In-House Roast</h4>
                <p className="text-[11px] text-stone-500">Roasted in small-batches weekly to lock in intricate flavor profiles.</p>
              </div>

              {/* Pillar 3 */}
              <div className="flex flex-col items-start">
                <div className="p-2 rounded-lg bg-amber-100/50 text-amber-950 mb-3">
                  <Users size={16} />
                </div>
                <h4 className="text-xs font-semibold text-stone-800 uppercase tracking-wider mb-1">Cozy Sanctuary</h4>
                <p className="text-[11px] text-stone-500">Optimally equipped with high-speed Wi-Fi & deep reading nooks.</p>
              </div>
            </div>

            {/* Custom Quote banner */}
            <div className="mt-8 bg-amber-100/30 rounded-2xl p-5 border border-amber-200/20 flex gap-4 items-start relative overflow-hidden">
              <Quote className="text-amber-800/20 absolute -right-2 -bottom-2 w-16 h-16 pointer-events-none" />
              <div className="text-xs text-stone-700 italic font-serif leading-relaxed">
                "We do not just roast beans; we curate slow, meaningful morning rituals that nourish the soul and set a gentle tone for your entire day."
                <span className="block text-[10px] font-mono tracking-widest uppercase text-amber-800 font-bold not-italic mt-2">— Chef & Head Roaster, Clara Dupont</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

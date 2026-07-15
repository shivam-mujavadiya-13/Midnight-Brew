import React, { useState } from 'react';
import { Coffee, Facebook, Instagram, Twitter, Mail, CheckCircle, ArrowUp } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-white pt-20 pb-12 relative overflow-hidden border-t border-amber-500/10">
      
      {/* Decorative ambient lighting */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Segment: Brand & News */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          {/* Column 1: Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 overflow-hidden rounded-full border border-amber-500/20 bg-stone-900/40">
                <img 
                  src="./logo.svg" 
                  alt="Midnight Brew Logo" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider uppercase text-amber-100 leading-none">Midnight Brew</span>
                <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase mt-1">Café &amp; Roastery</span>
              </div>
            </div>
            
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Cultivating cozy therapeutic encounters, artisan roasting, and delicate morning pastries to nourish your everyday coffee rituals.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-400/30 transition duration-300">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-400/30 transition duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-400/30 transition duration-300">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Quick Navigation</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <a href="#home" className="text-stone-400 hover:text-amber-300 transition">Home</a>
              <a href="#about" className="text-stone-400 hover:text-amber-300 transition">Our Story</a>
              <a href="#menu" className="text-stone-400 hover:text-amber-300 transition">The Menu</a>
              <a href="#why-us" className="text-stone-400 hover:text-amber-300 transition">Why Us</a>
              <a href="#gallery" className="text-stone-400 hover:text-amber-300 transition">Gallery</a>
              <a href="#reviews" className="text-stone-400 hover:text-amber-300 transition">Reviews</a>
              <a href="#faq" className="text-stone-400 hover:text-amber-300 transition">FAQ</a>
              <a href="#contact" className="text-stone-400 hover:text-amber-300 transition">Contact</a>
            </div>
          </div>

          {/* Column 3: Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">The Roaster Newsletter</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Subscribe to unlock early access invitations to our monthly bean roasting workshops, dessert tastings, and holiday specials.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/40 border border-emerald-900/50 p-3 rounded-xl">
                <CheckCircle size={16} />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="bg-stone-900 border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 flex-grow"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-4 rounded-xl text-xs uppercase tracking-widest transition"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Segment: Credits */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-stone-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Midnight Brew. All rights reserved. Crafted for slow rituals & quiet luxuries.
          </p>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-400/30 transition-all duration-300 flex items-center justify-center gap-1.5 text-xs font-mono uppercase"
          >
            Top of Page
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}

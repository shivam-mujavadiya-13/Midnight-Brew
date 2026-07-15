import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ZoomIn, X, Image as ImageIcon } from 'lucide-react';
import { GALLERY_ITEMS } from '../data';

export default function Gallery() {
  const [activeImageIdx, setActiveImageIdx] = useState<number | null>(null);

  return (
    <section 
      id="gallery" 
      className="py-24 sm:py-32 bg-stone-100 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-3 block">Visual Whispers</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight font-medium mb-4">Capturing the Ambiance</h2>
          <p className="text-stone-500 font-sans text-sm sm:text-base">
            Take a glance inside our micro-roastery, watch our skilled baristas at work, and view our curated sweet delicacies.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div 
              key={item.id}
              onClick={() => setActiveImageIdx(idx)}
              className="group relative rounded-3xl overflow-hidden aspect-square bg-stone-200 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700"
                referrerPolicy="no-referrer"
              />
              
              {/* Elegant overlay on hover */}
              <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-6" />
              
              {/* Floating text elements */}
              <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold bg-amber-900/40 px-2 py-0.5 rounded-md border border-amber-500/20 whitespace-nowrap">
                  {item.tag}
                </span>
                <h3 className="font-serif text-lg text-white font-medium mt-2 flex items-center justify-between">
                  {item.title}
                  <ZoomIn size={16} className="text-amber-400" />
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox / Viewer */}
      <AnimatePresence>
        {activeImageIdx !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95" id="gallery-lightbox">
            
            {/* Dark backdrop click */}
            <div 
              className="absolute inset-0 cursor-zoom-out"
              onClick={() => setActiveImageIdx(null)}
            />

            {/* Lightbox container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-5xl w-full max-h-[85vh] flex flex-col items-center"
            >
              {/* Top Bar controls */}
              <div className="w-full flex justify-between items-center text-white mb-4">
                <div className="flex items-center gap-2">
                  <ImageIcon size={16} className="text-amber-400" />
                  <span className="font-serif text-sm font-medium">{GALLERY_ITEMS[activeImageIdx].title}</span>
                  <span className="text-xs font-mono text-stone-500">({GALLERY_ITEMS[activeImageIdx].tag})</span>
                </div>
                <button 
                  onClick={() => setActiveImageIdx(null)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/15 text-white transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* High-res Image rendering */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-900 flex-grow max-h-[70vh]">
                <img 
                  src={GALLERY_ITEMS[activeImageIdx].image.replace('w=800', 'w=1400')} 
                  alt={GALLERY_ITEMS[activeImageIdx].title} 
                  className="max-h-[70vh] w-auto object-contain max-w-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Slider Controls */}
              <div className="flex gap-4 mt-6">
                <button
                  disabled={activeImageIdx === 0}
                  onClick={() => setActiveImageIdx(activeImageIdx - 1)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-mono uppercase tracking-widest text-white transition ${activeImageIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/15'}`}
                >
                  ← Prev
                </button>
                <button
                  disabled={activeImageIdx === GALLERY_ITEMS.length - 1}
                  onClick={() => setActiveImageIdx(activeImageIdx + 1)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-mono uppercase tracking-widest text-white transition ${activeImageIdx === GALLERY_ITEMS.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-white/10 hover:bg-white/15'}`}
                >
                  Next →
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

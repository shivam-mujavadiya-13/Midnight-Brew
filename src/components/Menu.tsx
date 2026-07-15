import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, SlidersHorizontal, Info, Heart, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem } from '../types';

interface MenuProps {
  onOpenCustomizer: () => void;
  currency: 'INR' | 'USD';
}

const CATEGORIES = [
  { id: 'all', label: 'Complete Menu' },
  { id: 'coffee-hot', label: 'Warm Espresso' },
  { id: 'coffee-cold', label: 'Over Ice' },
  { id: 'other-beverages', label: 'Teas & Cocoa' },
  { id: 'pastries', label: 'Morning Pastries' },
  { id: 'cakes-desserts', label: 'Specialty Desserts' }
];

export default function Menu({ onOpenCustomizer, currency }: MenuProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState('all'); // all, vegan, gluten-free, vegetarian
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Toggle favorite helper
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Filter items
  const filteredItems = MENU_ITEMS.filter(item => {
    // 1. Category filter
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    // 2. Search query filter
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));

    // 3. Dietary tag filter
    const lowerTags = item.tags?.map(t => t.toLowerCase()) || [];
    let matchesDietary = true;
    if (dietaryFilter === 'vegan') {
      matchesDietary = lowerTags.includes('vegan');
    } else if (dietaryFilter === 'gluten-free') {
      matchesDietary = lowerTags.includes('gluten-free');
    } else if (dietaryFilter === 'vegetarian') {
      matchesDietary = lowerTags.includes('vegetarian') || lowerTags.includes('vegan');
    }

    return matchesCategory && matchesSearch && matchesDietary;
  });

  return (
    <section 
      id="menu" 
      className="py-24 sm:py-32 bg-stone-100 relative overflow-hidden"
    >
      {/* Subtle details */}
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-amber-100/40 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-3 block">Indulge Your Senses</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight font-medium mb-4">Our Curated Offerings</h2>
          <p className="text-stone-500 font-sans text-sm sm:text-base">
            Every cup is dialed in with culinary precision, and every pastry is rolled by hand each morning in our master kitchen.
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-200/60 p-5 sm:p-6 mb-12 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search specialty drinks, treats, or ingredients..."
                className="w-full pl-11 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-800/20 focus:border-amber-800 text-sm text-stone-800 font-sans"
              />
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            </div>

            {/* Quick Dietary Selectors */}
            <div className="flex flex-wrap gap-2 items-center w-full md:w-auto justify-start md:justify-end">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <SlidersHorizontal size={12} />
                Dietary:
              </span>
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${dietaryFilter === 'all' ? 'bg-amber-900 text-amber-50' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                All
              </button>
              <button
                onClick={() => setDietaryFilter('vegan')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${dietaryFilter === 'vegan' ? 'bg-emerald-800 text-emerald-50' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                Vegan
              </button>
              <button
                onClick={() => setDietaryFilter('gluten-free')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${dietaryFilter === 'gluten-free' ? 'bg-amber-800 text-amber-50' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'}`}
              >
                Gluten-Free
              </button>
            </div>

          </div>

          {/* Categorical Scrollbar */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none border-t border-stone-100 pt-4">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${selectedCategory === cat.id ? 'bg-amber-800 text-amber-50 shadow-md shadow-amber-900/10 scale-102' : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Items Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div 
              layout 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredItems.map(item => {
                const isFavorite = favorites.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedItem(item)}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200/50 hover:shadow-xl hover:border-amber-900/15 transition-all duration-500 cursor-pointer flex flex-col justify-between"
                  >
                    
                    {/* Card Thumbnail */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                      
                      {/* Price Tag badge */}
                      <span className="absolute bottom-4 right-4 bg-amber-50/95 backdrop-blur-xs text-stone-900 font-serif font-bold text-sm px-3 py-1 rounded-full shadow-md border border-amber-100">
                        {currency === 'INR' ? `₹${item.inrPrice}` : `$${item.price.toFixed(2)}`}
                      </span>

                      {/* Heart Button */}
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-xs text-stone-500 hover:text-rose-600 hover:bg-white transition shadow-sm"
                      >
                        <Heart size={16} className={isFavorite ? 'fill-rose-600 stroke-rose-600' : ''} />
                      </button>

                      {/* Item Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                          {item.tags.map(tag => (
                            <span key={tag} className="bg-amber-900/90 backdrop-blur-xs text-amber-100 text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full border border-amber-800/30">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-lg text-stone-900 font-semibold mb-2 group-hover:text-amber-800 transition duration-300">
                          {item.name}
                        </h3>
                        <p className="text-stone-500 text-xs font-sans line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      {/* Card Footer info */}
                      <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-400">
                        <span>{item.calories} Calories</span>
                        <span className="text-amber-800 font-sans font-bold group-hover:underline flex items-center gap-1">
                          View details
                          <ArrowRight size={12} className="group-hover:translate-x-1 transition duration-300" />
                        </span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-200">
              <p className="text-stone-400 font-serif text-lg">No culinary treasures found matching your query.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setDietaryFilter('all'); }} 
                className="mt-4 text-xs font-mono uppercase tracking-widest text-amber-800 underline font-bold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </AnimatePresence>

        {/* Brew Lab Banner CTA */}
        <div className="mt-16 bg-stone-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-amber-500/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-3xl rounded-full" />
          <div className="relative z-10 max-w-xl">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <Sparkles size={14} />
              Craft Your Signature Blend
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight mt-3 mb-4">
              Not finding your exact flavor profile?
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed">
              Step inside our digital **Midnight Brew Lab**. Choose your temperature, select specialty plant milks, dial in sweetness syrup pumps, and stack organic toppings to compile your absolute dream beverage.
            </p>
          </div>
          <button
            onClick={onOpenCustomizer}
            className="relative z-10 whitespace-nowrap bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold px-8 py-4 rounded-full text-xs uppercase tracking-wider shadow-lg hover:shadow-amber-400/10 active:translate-y-0.5 transition"
          >
            Open Interactive Brew Lab
          </button>
        </div>

      </div>

      {/* Menu Detail Popup Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="menu-detail-modal">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
              onClick={() => setSelectedItem(null)}
            />

            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative transform overflow-hidden rounded-3xl bg-amber-50 p-6 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-amber-100"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 transition shadow-xs"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Hero Image */}
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-md bg-stone-100">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-amber-400 text-stone-900 text-[10px] font-mono tracking-wider font-bold uppercase px-3 py-1 rounded-full">
                    Category: {selectedItem.category.replace('-', ' ')}
                  </span>
                </div>

                {/* Details */}
                <h3 className="font-serif text-2xl text-stone-900 font-bold mb-2">
                  {selectedItem.name}
                </h3>
                
                <p className="text-sm text-stone-600 leading-relaxed mb-6 font-sans">
                  {selectedItem.description}
                </p>

                {/* Info block */}
                <div className="grid grid-cols-2 gap-4 bg-white rounded-2xl p-4 border border-stone-200/60 mb-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Nutritional Calories</span>
                    <p className="text-lg font-serif font-semibold text-stone-800">{selectedItem.calories} kcal</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Gourmet Price</span>
                    <p className="text-lg font-serif font-bold text-amber-800">
                      {currency === 'INR' ? `₹${selectedItem.inrPrice}` : `$${selectedItem.price.toFixed(2)}`}
                    </p>
                  </div>
                </div>

                {/* Ingredient details */}
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-stone-500 mb-2 block flex items-center gap-1.5">
                    <Info size={12} className="text-amber-800" />
                    Fine Ingredient Breakdown:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.ingredients.map((ingredient, idx) => (
                      <span key={idx} className="bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-lg border border-stone-200/50">
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Order Notice */}
                <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-bold uppercase tracking-wider transition"
                  >
                    Back to Menu
                  </button>
                  <button
                    onClick={() => { setSelectedItem(null); onOpenCustomizer(); }}
                    className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-amber-900/10 transition"
                  >
                    Personalize Drink
                  </button>
                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}

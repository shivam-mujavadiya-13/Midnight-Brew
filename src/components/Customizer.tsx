import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Flame, IceCream, Plus, Sparkles, Check, Trash2 } from 'lucide-react';
import { CustomDrink } from '../types';

interface CustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCustom: (drink: CustomDrink, name: string, price: number) => void;
  currency: 'INR' | 'USD';
}

const BASES = [
  { id: 'espresso', name: 'Signature Espresso', price: 3.50, inrPrice: 240, calories: 5, color: 'bg-amber-950' },
  { id: 'coldbrew', name: 'Slow-Cold Brew', price: 4.50, inrPrice: 320, calories: 5, color: 'bg-amber-900' },
  { id: 'matcha', name: 'Uji Organic Matcha', price: 5.00, inrPrice: 360, calories: 40, color: 'bg-emerald-800' },
  { id: 'chocolate', name: 'Belgian Cocoa', price: 4.50, inrPrice: 320, calories: 180, color: 'bg-amber-800' },
];

const MILKS = [
  { id: 'none', name: 'No Milk (Black)', price: 0.00, inrPrice: 0, calories: 0, color: 'bg-transparent' },
  { id: 'whole', name: 'Organic Whole Milk', price: 0.00, inrPrice: 0, calories: 120, color: 'bg-amber-50/90' },
  { id: 'oat', name: 'Creamy Oat Milk', price: 0.60, inrPrice: 50, calories: 90, color: 'bg-orange-50/80' },
  { id: 'almond', name: 'Roasted Almond Milk', price: 0.60, inrPrice: 50, calories: 60, color: 'bg-yellow-50/70' },
  { id: 'coconut', name: 'Organic Coconut Milk', price: 0.75, inrPrice: 60, calories: 75, color: 'bg-stone-50/90' },
];

const SWEETENERS = [
  { id: 'none', name: 'Unsweetened', price: 0, inrPrice: 0, calories: 0 },
  { id: 'low', name: 'Subtle Sweet (1 Pump)', price: 0.25, inrPrice: 20, calories: 25 },
  { id: 'medium', name: 'Balanced Sweet (2 Pumps)', price: 0.40, inrPrice: 35, calories: 50 },
  { id: 'extra', name: 'Rich Sweet (3 Pumps)', price: 0.50, inrPrice: 45, calories: 75 },
];

const TOPPINGS = [
  { id: 'caramel-drizzle', name: 'Warm Caramel Drizzle', price: 0.50, inrPrice: 45, calories: 45, color: 'bg-yellow-600' },
  { id: 'chocolate-curls', name: 'Belgian Chocolate Shavings', price: 0.60, inrPrice: 50, calories: 50, color: 'bg-amber-950' },
  { id: 'whipped-cream', name: 'Organic Whipped Cream', price: 0.75, inrPrice: 60, calories: 110, color: 'bg-amber-50/40' },
  { id: 'cinnamon-dust', name: 'Ceylon Cinnamon Dust', price: 0.25, inrPrice: 20, calories: 5, color: 'bg-orange-800/60' },
];

export default function Customizer({ isOpen, onClose, onOrderCustom, currency }: CustomizerProps) {
  const [drinkName, setDrinkName] = useState('My Midnight Signature');
  const [base, setBase] = useState('espresso');
  const [milk, setMilk] = useState('none');
  const [sweetness, setSweetness] = useState('none');
  const [temperature, setTemperature] = useState<'hot' | 'iced'>('hot');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [isOrdered, setIsOrdered] = useState(false);

  if (!isOpen) return null;

  // Find active data objects
  const activeBase = BASES.find(b => b.id === base) || BASES[0];
  const activeMilk = MILKS.find(m => m.id === milk) || MILKS[0];
  const activeSweetener = SWEETENERS.find(s => s.id === sweetness) || SWEETENERS[0];
  const activeToppingObjects = TOPPINGS.filter(t => selectedToppings.includes(t.id));

  // Compute stats based on selected currency
  const totalUSDPrice = activeBase.price + activeMilk.price + activeSweetener.price + activeToppingObjects.reduce((acc, t) => acc + t.price, 0);
  const totalINRPrice = activeBase.inrPrice + activeMilk.inrPrice + activeSweetener.inrPrice + activeToppingObjects.reduce((acc, t) => acc + t.inrPrice, 0);

  const totalPrice = currency === 'INR' ? totalINRPrice : totalUSDPrice;
  const totalCalories = activeBase.calories + activeMilk.calories + activeSweetener.calories + activeToppingObjects.reduce((acc, t) => acc + t.calories, 0);

  const toggleTopping = (id: string) => {
    setSelectedToppings(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const resetDrink = () => {
    setBase('espresso');
    setMilk('none');
    setSweetness('none');
    setTemperature('hot');
    setSelectedToppings([]);
    setDrinkName('My Midnight Signature');
    setIsOrdered(false);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const customDrink: CustomDrink = {
      base,
      milk,
      sweetness,
      temperature,
      toppings: selectedToppings
    };
    onOrderCustom(customDrink, drinkName, totalPrice);
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      resetDrink();
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="customizer-modal">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative transform overflow-hidden rounded-3xl bg-amber-50/95 p-6 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-4xl border border-amber-100 flex flex-col md:flex-row gap-8"
        >
          {/* Visual Coffee Cup Preview Pane */}
          <div className="w-full md:w-1/2 bg-stone-900 rounded-2xl p-6 flex flex-col items-center justify-between text-white relative overflow-hidden shadow-inner min-h-[360px] md:min-h-[480px]">
            {/* Ambient gold glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="w-full flex justify-between items-center z-10">
              <span className="text-xs tracking-wider uppercase font-mono text-amber-200/60">Midnight Craft Lab</span>
              <div className="flex gap-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${temperature === 'hot' ? 'bg-orange-950 text-orange-300 border border-orange-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'}`}>
                  {temperature === 'hot' ? <Flame size={12} /> : <IceCream size={12} />}
                  {temperature === 'hot' ? 'HOT' : 'ICED'}
                </span>
              </div>
            </div>

            {/* Coffee Cup Container */}
            <div className="relative my-8 flex items-center justify-center w-full flex-grow">
              {/* Cup Design */}
              <div className="relative w-44 h-48 bg-stone-800/40 rounded-b-3xl border-t-0 border-x border-b border-stone-700 overflow-hidden flex flex-col-reverse items-center justify-start p-1 shadow-2xl">
                
                {/* Steaming effect for Hot drinks */}
                {temperature === 'hot' && (
                  <div className="absolute top-[-30px] flex gap-2 justify-center w-full z-20">
                    <motion.div 
                      animate={{ y: [-10, -35], opacity: [0, 0.7, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-6 bg-white/30 rounded-full blur-xs"
                    />
                    <motion.div 
                      animate={{ y: [-10, -40], opacity: [0, 0.7, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, delay: 0.5 }}
                      className="w-1.5 h-8 bg-white/30 rounded-full blur-xs"
                    />
                    <motion.div 
                      animate={{ y: [-10, -32], opacity: [0, 0.7, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-6 bg-white/30 rounded-full blur-xs"
                    />
                  </div>
                )}

                {/* Ice Cubes for Iced drinks */}
                {temperature === 'iced' && (
                  <div className="absolute inset-0 flex flex-wrap justify-around p-4 z-20 pointer-events-none">
                    <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="w-8 h-8 bg-white/20 border border-white/30 rounded-md backdrop-blur-xs flex items-center justify-center text-[10px] text-white/50">🧊</motion.div>
                    <motion.div animate={{ rotate: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4.5, delay: 1 }} className="w-7 h-7 bg-white/25 border border-white/30 rounded-md backdrop-blur-xs mt-8">🧊</motion.div>
                    <motion.div className="w-6 h-6 bg-white/20 border border-white/30 rounded-md backdrop-blur-xs mt-16">🧊</motion.div>
                  </div>
                )}

                {/* Layer 3: Toppings */}
                <AnimatePresence>
                  {selectedToppings.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="absolute top-0 inset-x-0 h-10 rounded-t-lg bg-amber-100/50 backdrop-blur-xs border-b border-amber-200/20 z-10 flex items-center justify-center text-xs text-amber-900 font-medium"
                    >
                      <div className="flex gap-1 overflow-x-auto max-w-full px-2 py-1 scrollbar-none">
                        {activeToppingObjects.map(topping => (
                          <span key={topping.id} className="text-[10px] bg-stone-900/80 text-amber-200 px-1.5 py-0.5 rounded border border-amber-800/30 whitespace-nowrap">
                            {topping.name.split(' ').pop()}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Layer 2: Milk */}
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: milk === 'none' ? 0 : '45%' }}
                  transition={{ duration: 0.5 }}
                  className={`absolute bottom-0 inset-x-0 z-5 transition-all duration-500 rounded-b-2xl ${activeMilk.color}`}
                />

                {/* Layer 1: Coffee Base */}
                <motion.div 
                  initial={{ height: '30%' }}
                  animate={{ height: milk === 'none' ? '90%' : '75%' }}
                  transition={{ duration: 0.5 }}
                  className={`w-full rounded-b-2xl ${activeBase.color} transition-all duration-500 border-t border-stone-900/50 shadow-inner`}
                />
              </div>

              {/* Cup Handle */}
              <div className="w-10 h-24 border-4 border-l-0 border-stone-700 rounded-r-3xl absolute right-16 top-[40%] translate-y-[-50%] z-0" />
            </div>

            {/* Price & Calories Display */}
            <div className="w-full bg-stone-800/60 rounded-xl p-4 border border-stone-700/50 grid grid-cols-2 gap-4 z-10 backdrop-blur-xs">
              <div className="text-center border-r border-stone-700/50">
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Estimated Price</p>
                <p className="text-2xl font-serif text-amber-300 font-medium">
                  {currency === 'INR' ? `₹${totalPrice.toFixed(0)}` : `$${totalPrice.toFixed(2)}`}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Calories</p>
                <p className="text-2xl font-serif text-amber-100 font-medium">{totalCalories} kcal</p>
              </div>
            </div>
          </div>

          {/* Interactive Options Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-serif text-stone-900 tracking-tight" id="customizer-heading">Midnight Brew Lab</h2>
                  <p className="text-sm text-stone-500 font-sans">Handcraft your absolute signature beverage with our premium organic ingredients.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1 text-stone-400 hover:text-stone-700 transition"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleOrderSubmit} className="space-y-6">
                {/* Custom Drink Name */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">Signature Drink Name</label>
                  <input 
                    type="text" 
                    value={drinkName}
                    onChange={(e) => setDrinkName(e.target.value)}
                    maxLength={32}
                    className="w-full px-4 py-2 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 font-serif text-lg"
                    placeholder="E.g., Amber Sunrise"
                    required
                  />
                </div>

                {/* 1. Base Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">Step 1: Select Coffee Base</label>
                  <div className="grid grid-cols-2 gap-2">
                    {BASES.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setBase(item.id)}
                        className={`px-3 py-2.5 rounded-xl border text-left flex items-center justify-between transition ${base === item.id ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'}`}
                      >
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-xs font-mono opacity-80">
                          {currency === 'INR' ? `₹${item.inrPrice}` : `$${item.price.toFixed(2)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Temperature selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">Step 2: Choose Temperature</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTemperature('hot')}
                      className={`px-4 py-2.5 rounded-xl border text-center flex items-center justify-center gap-2 transition ${temperature === 'hot' ? 'bg-orange-900 text-orange-50 border-orange-950 shadow-sm' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'}`}
                    >
                      <Flame size={16} />
                      <span className="text-sm font-medium">Hot Serve</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTemperature('iced')}
                      className={`px-4 py-2.5 rounded-xl border text-center flex items-center justify-center gap-2 transition ${temperature === 'iced' ? 'bg-cyan-900 text-cyan-50 border-cyan-950 shadow-sm' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'}`}
                    >
                      <IceCream size={16} />
                      <span className="text-sm font-medium">Over Ice</span>
                    </button>
                  </div>
                </div>

                {/* 3. Milk selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">Step 3: Select Milk Base</label>
                  <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
                    {MILKS.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setMilk(item.id)}
                        className={`px-3 py-2 rounded-xl border text-left flex items-center justify-between transition ${milk === item.id ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'}`}
                      >
                        <span className="text-xs font-medium">{item.name}</span>
                        <span className="text-xs font-mono opacity-80">
                          {item.price > 0 ? (currency === 'INR' ? `+₹${item.inrPrice}` : `+$${item.price.toFixed(2)}`) : 'Free'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Sweetness selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">Step 4: Sweetness Level</label>
                  <div className="grid grid-cols-2 gap-2">
                    {SWEETENERS.map(item => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSweetness(item.id)}
                        className={`px-3 py-2 rounded-xl border text-left flex items-center justify-between transition ${sweetness === item.id ? 'bg-amber-800 text-amber-50 border-amber-900 shadow-sm' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'}`}
                      >
                        <span className="text-xs font-medium">{item.name.split(' (')[0]}</span>
                        <span className="text-[10px] font-mono opacity-80">
                          {item.price > 0 ? (currency === 'INR' ? `+₹${item.inrPrice}` : `+$${item.price.toFixed(2)}`) : 'Free'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Topping Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">Step 5: Artisanal Toppings (Optional)</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TOPPINGS.map(item => {
                      const isSelected = selectedToppings.includes(item.id);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleTopping(item.id)}
                          className={`px-3 py-2 rounded-xl border text-left flex items-center justify-between transition ${isSelected ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs' : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'}`}
                        >
                          <span className="text-xs font-medium flex items-center gap-1.5">
                            {isSelected ? <Check size={12} className="text-amber-800" /> : <Plus size={12} className="text-stone-400" />}
                            {item.name.split(' ').slice(1).join(' ')}
                          </span>
                          <span className="text-xs font-mono opacity-80">
                            {currency === 'INR' ? `+₹${item.inrPrice}` : `+$${item.price.toFixed(2)}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer buttons */}
            <div className="mt-8 pt-4 border-t border-stone-200 flex gap-3">
              <button
                type="button"
                onClick={resetDrink}
                className="px-4 py-2 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-600 transition flex items-center gap-2 text-sm"
              >
                <Trash2 size={16} />
                Reset
              </button>
              <button
                type="button"
                onClick={handleOrderSubmit}
                disabled={isOrdered}
                className="flex-1 bg-amber-800 hover:bg-amber-900 text-amber-50 px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-amber-900/20 active:translate-y-0.5 transition flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
              >
                {isOrdered ? (
                  <>
                    <Sparkles size={16} className="animate-spin" />
                    Adding Custom Drink...
                  </>
                ) : (
                  <>
                    <Coffee size={16} />
                    Add Signature Drink
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

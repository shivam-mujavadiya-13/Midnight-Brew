import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS } from '../data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section 
      id="faq" 
      className="py-24 sm:py-32 bg-stone-100 relative overflow-hidden"
    >
      {/* Decorative details */}
      <div className="absolute top-[20%] right-[-15%] w-[35%] h-[35%] bg-amber-200/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-3 block">Got Queries?</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight font-medium mb-4">Curious Minds Want to Know</h2>
          <p className="text-stone-500 font-sans text-sm sm:text-base">
            Everything you need to know about our reservation guidelines, payment modes, study policies, and logistics.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-stone-200/50 shadow-xs overflow-hidden transition-all duration-300"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left transition hover:bg-stone-50/50"
                >
                  <span className="text-xs font-mono text-amber-800 font-bold uppercase tracking-widest block mb-1 opacity-65">
                    {item.category}
                  </span>
                  <div className="flex gap-3 items-center flex-grow pr-4">
                    <span className="text-stone-900 font-serif font-semibold text-sm sm:text-base">
                      {item.question}
                    </span>
                  </div>
                  <span className="text-stone-400 p-1 bg-stone-100 rounded-full group-hover:text-stone-700 transition">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {/* Dropdown Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-stone-100"
                    >
                      <div className="px-6 py-5 bg-amber-50/20 text-stone-600 font-sans text-xs sm:text-sm leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            );
          })}
        </div>

        {/* Extra contact trigger notice */}
        <div className="mt-12 text-center p-6 bg-white/50 rounded-2xl border border-stone-200/40 text-xs text-stone-500">
          Have an unlisted question regarding private venue booking or customized dessert catering? 
          <a href="#contact" className="text-amber-800 font-bold underline ml-1">Connect with our Concierge</a>.
        </div>

      </div>
    </section>
  );
}

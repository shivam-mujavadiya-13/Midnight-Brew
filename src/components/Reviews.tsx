import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, Check, Sparkles, UserPlus } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data';
import { Review } from '../types';

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Load reviews from localStorage or initial on mount
  useEffect(() => {
    const saved = localStorage.getItem('midnight_brew_reviews');
    if (saved) {
      try {
        setReviews(JSON.parse(saved));
      } catch (e) {
        setReviews(INITIAL_REVIEWS);
      }
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, []);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !comment) return;

    // Use a lovely random food blogger avatar as placeholder
    const randAvatarNum = Math.floor(Math.random() * 70);
    const newReview: Review = {
      id: `rev-custom-${Math.random().toString(36).substr(2, 9)}`,
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      avatar: `https://i.pravatar.cc/150?img=${randAvatarNum}`,
      isVerified: true
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem('midnight_brew_reviews', JSON.stringify(updatedReviews));
    
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setRating(5);
      setComment('');
      setSubmitted(false);
      setIsFormOpen(false);
    }, 2000);
  };

  return (
    <section 
      id="reviews" 
      className="py-24 sm:py-32 bg-amber-50/30 relative overflow-hidden"
    >
      {/* Decorative details */}
      <div className="absolute top-[10%] left-[-10%] w-[35%] h-[35%] bg-amber-100/30 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-3 block">Guest Stories</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight font-medium">Whispers of Satfaction</h2>
            <p className="text-stone-500 font-sans text-sm sm:text-base mt-2">
              Hear what our community of coffee lovers, morning seekers, and remote creators are saying about their Midnight Brew moments.
            </p>
          </div>
          
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="whitespace-nowrap px-6 py-3 rounded-full bg-amber-900 hover:bg-amber-950 text-amber-50 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md flex items-center gap-2"
          >
            <UserPlus size={14} />
            Write a Review
          </button>
        </div>

        {/* Interactive Review Entry Form Dropdown */}
        <AnimatePresence>
          {isFormOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12 bg-white rounded-3xl border border-stone-200/80 shadow-md max-w-2xl"
            >
              <div className="p-6 sm:p-8">
                <h3 className="font-serif text-xl text-stone-950 mb-2">Share Your Midnight Brew Story</h3>
                <p className="text-xs text-stone-500 font-sans mb-6">We read every review carefully! Your words fuel our passion.</p>

                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-8 text-center flex flex-col items-center justify-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                      <Check size={24} />
                    </div>
                    <h4 className="text-lg font-serif text-stone-900">Review Received with Gratitude!</h4>
                    <p className="text-xs text-stone-500">Your feedback is now live on our board.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">Your Name</label>
                        <input 
                          type="text" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Eleanor Vance"
                          required
                          className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                        />
                      </div>

                      {/* Star select */}
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">Your Rating</label>
                        <div className="flex gap-1 py-1.5">
                          {[1, 2, 3, 4, 5].map(stars => (
                            <button
                              key={stars}
                              type="button"
                              onClick={() => setRating(stars)}
                              className="text-amber-400 hover:scale-110 transition duration-150"
                            >
                              <Star size={20} className={stars <= rating ? 'fill-amber-400' : 'text-stone-300'} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review text comment */}
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-1.5">Your Review Comments</label>
                      <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us what you ordered, and how you enjoyed the ambiance..."
                        rows={4}
                        required
                        className="w-full px-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold transition"
                    >
                      Post Review Instantly
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Board Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {reviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl p-6 border border-stone-200/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex gap-0.5 text-amber-400 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={15} className={i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-200'} />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className="text-stone-600 font-sans text-xs sm:text-sm leading-relaxed italic mb-6">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 border border-stone-200 shadow-inner">
                    <img 
                      src={rev.avatar} 
                      alt={rev.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-stone-900 flex items-center gap-1">
                      {rev.name}
                      {rev.isVerified && (
                        <span className="bg-amber-100 text-amber-900 text-[8px] font-mono font-bold px-1 rounded-sm flex items-center gap-0.5" title="Verified Customer">
                          <Check size={8} />
                          VERIFIED
                        </span>
                      )}
                    </h4>
                    <span className="text-[9px] font-mono text-stone-400">{rev.date}</span>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

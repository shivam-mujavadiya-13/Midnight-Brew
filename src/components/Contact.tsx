import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Navigation } from 'lucide-react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('Inquiry');
  const [submitted, setSubmitted] = useState(false);
  const [mapZoom, setMapZoom] = useState(15);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Simulate submission
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section 
      id="contact" 
      className="py-24 sm:py-32 bg-amber-50/30 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-800 font-bold mb-3 block">Join Us In Person</span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight font-medium mb-4">Let’s Start a Conversation</h2>
          <p className="text-stone-500 font-sans text-sm sm:text-base">
            Drop us a line online, call our front desk for event planning, or follow the brass markings straight to our front doors.
          </p>
        </div>

        {/* Contact Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Form & Info (7 Cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/50 shadow-sm">
              <h3 className="font-serif text-2xl text-stone-900 font-semibold mb-6">Send a Digital Message</h3>
              
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center justify-center gap-3 bg-stone-50 rounded-2xl border border-dashed border-stone-200"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                    <CheckCircle size={28} />
                  </div>
                  <h4 className="text-xl font-serif text-stone-900">Message Dispatched Successfully</h4>
                  <p className="text-xs text-stone-500 max-w-sm px-6">Our café concierge will review your message and reply via email within the next 12 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Your Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Marcus Sterling"
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-sans"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="marcus@example.com"
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Subject Matter</label>
                    <select 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-sans appearance-none"
                    >
                      <option value="Inquiry">General Inquiry</option>
                      <option value="Event">Private Venue & Corporate Events</option>
                      <option value="Catering">Custom Coffee & Dessert Catering</option>
                      <option value="Careers">Careers / Join the Barista Team</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Your Message</label>
                    <textarea 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder="Share your ideas or let us know how we can curate the perfect experience for you..."
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm font-sans"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 py-3.5 rounded-xl font-medium shadow-md hover:shadow-amber-900/10 active:translate-y-0.5 transition flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold"
                  >
                    <Send size={14} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Contact Details & Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Quick Details Card */}
            <div className="bg-stone-900 rounded-3xl p-6 sm:p-8 border border-amber-500/10 shadow-xl text-white">
              <h3 className="font-serif text-xl text-amber-100 tracking-wide mb-6">Concierge Details</h3>
              
              <div className="space-y-6">
                {/* Phone */}
                <a href="tel:+15550192834" className="flex items-start gap-4 group">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-stone-900 transition duration-300">
                    <Phone size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Call Concierge</p>
                    <p className="text-sm font-medium text-stone-200 font-sans group-hover:text-amber-300 transition">+1 (555) 019-2834</p>
                  </div>
                </a>

                {/* Email */}
                <a href="mailto:concierge@midnightbrew.com" className="flex items-start gap-4 group">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:bg-amber-400 group-hover:text-stone-900 transition duration-300">
                    <Mail size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Send Email</p>
                    <p className="text-sm font-medium text-stone-200 font-sans group-hover:text-amber-300 transition">concierge@midnightbrew.com</p>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <MapPin size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Our Address</p>
                    <p className="text-sm font-medium text-stone-200 font-sans">420 Velvet Lane, Suite B, Old Town, Metropolis</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
                    <Clock size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-stone-400">Operating Hours</p>
                    <p className="text-sm font-medium text-stone-200 font-sans">07:00 AM - 11:00 PM Daily</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stylized Interactive Custom HTML Map */}
            <div className="bg-white rounded-3xl overflow-hidden border border-stone-200/60 shadow-sm relative h-64 flex flex-col justify-between">
              
              {/* Styled Mock Map Grid representing street blocks */}
              <div className="absolute inset-0 bg-stone-100 flex flex-col justify-around p-4 pointer-events-none opacity-90">
                <div className="w-full h-px bg-stone-200" />
                <div className="w-full h-px bg-stone-200" />
                <div className="w-full h-px bg-stone-200" />
                
                {/* Diagonal blocks */}
                <div className="absolute inset-y-0 left-1/3 w-px bg-stone-200" />
                <div className="absolute inset-y-0 left-2/3 w-px bg-stone-200" />

                {/* Styled Central Park area */}
                <div className="absolute top-[25%] left-[45%] w-[40%] h-[35%] bg-emerald-100/50 rounded-2xl border border-emerald-200 flex items-center justify-center text-[10px] font-mono text-emerald-800">
                  Velvet Park
                </div>

                {/* Styled Street name */}
                <span className="absolute bottom-6 left-8 text-[9px] font-mono text-stone-400 uppercase tracking-widest rotate-[-5deg]">Velvet Lane</span>
                <span className="absolute top-12 left-1/2 text-[9px] font-mono text-stone-400 uppercase tracking-widest rotate-90">Metropolitan Avenue</span>
              </div>

              {/* Pin Marker */}
              <div className="absolute top-[48%] left-[38%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Golden pulsating wave */}
                <span className="absolute inline-flex h-8 w-8 rounded-full bg-amber-500/30 animate-ping" />
                <div className="bg-amber-900 border border-amber-300 text-amber-100 p-2 rounded-full shadow-lg relative flex items-center justify-center">
                  ☕
                </div>
                {/* Tooltip speech balloon */}
                <div className="bg-stone-900 text-white border border-amber-500/20 px-3 py-1 rounded-lg shadow-md text-[10px] font-bold font-serif whitespace-nowrap mt-1 uppercase tracking-widest">
                  Midnight Brew
                </div>
              </div>

              {/* Map controls */}
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xs border border-stone-200/60 p-1.5 rounded-xl shadow-xs flex flex-col gap-1">
                <button 
                  onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                  className="w-7 h-7 text-xs font-bold bg-white text-stone-700 rounded-lg hover:bg-stone-100 active:scale-95 transition"
                >
                  +
                </button>
                <button 
                  onClick={() => setMapZoom(prev => Math.max(prev - 1, 12))}
                  className="w-7 h-7 text-xs font-bold bg-white text-stone-700 rounded-lg hover:bg-stone-100 active:scale-95 transition"
                >
                  -
                </button>
              </div>

              {/* Map Footer indicators */}
              <div className="relative w-full bg-stone-900/90 text-stone-300 p-3 flex justify-between items-center z-10 border-t border-stone-800 text-[10px] font-mono">
                <span className="flex items-center gap-1">
                  <Navigation size={11} className="text-amber-400 animate-pulse" />
                  Coords: 42.1283° N, 71.0594° W
                </span>
                <span className="text-amber-400 font-bold">Zoom: {mapZoom}x</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

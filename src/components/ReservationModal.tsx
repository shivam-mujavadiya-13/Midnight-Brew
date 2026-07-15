import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, MapPin, Sparkles, Check, Clock, ShieldCheck } from 'lucide-react';
import { Reservation } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (res: Reservation) => void;
}

const SEATING_AREAS = [
  { id: 'window-alcove', name: 'Window Alcove (Street View & Soft Light)', description: 'Perfect for couples, scenic natural lighting.' },
  { id: 'fireside', name: 'Fireside Lounge (Deep Velvet Seating)', description: 'Cozy, warm luxury hearth space.' },
  { id: 'library', name: 'The Library Nook (Quiet & Studious)', description: 'Surrounded by books, low ambient chatter.' },
  { id: 'bar-counter', name: 'Espresso Bar Counter (Barista View)', description: 'Immersive experience watching the craft.' },
  { id: 'garden-veranda', name: 'Garden Veranda (Heated Outdoor)', description: 'Beautiful floral layout under soft canopy.' }
];

export default function ReservationModal({ isOpen, onClose, onSave }: ReservationModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('14:00');
  const [guests, setGuests] = useState(2);
  const [seatingArea, setSeatingArea] = useState('window-alcove');
  const [specialRequests, setSpecialRequests] = useState('');
  const [ticket, setTicket] = useState<Reservation | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const activeAreaObj = SEATING_AREAS.find(a => a.id === seatingArea);
    const newReservation: Reservation = {
      id: `res-${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone,
      date,
      time,
      guests,
      seatingArea: activeAreaObj ? activeAreaObj.name.split(' (')[0] : 'Main Lounge',
      status: 'confirmed',
      specialRequests,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    onSave(newReservation);
    setTicket(newReservation);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTime('14:00');
    setGuests(2);
    setSeatingArea('window-alcove');
    setSpecialRequests('');
    setTicket(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="reservation-modal">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={handleReset}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
        <AnimatePresence mode="wait">
          {!ticket ? (
            <motion.div 
              key="booking-form"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative transform overflow-hidden rounded-3xl bg-amber-50/95 p-6 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-amber-100"
            >
              {/* Form Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-xs font-mono tracking-wider uppercase text-amber-800">Secure Your Table</span>
                  <h2 className="text-3xl font-serif text-stone-900 tracking-tight" id="reservation-title">Midnight Reservations</h2>
                  <p className="text-sm text-stone-500 font-sans mt-1">Book an elegant private sanctuary inside our coffee house.</p>
                </div>
                <button 
                  onClick={handleReset}
                  className="p-1 text-stone-400 hover:text-stone-700 transition"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Eleanor Vance"
                      className="w-full px-4 py-2 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm font-sans"
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
                      placeholder="eleanor@example.com"
                      className="w-full px-4 py-2 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Phone Number</label>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-4 py-2 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm font-sans"
                    />
                  </div>

                  {/* Guest count */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Number of Guests</label>
                    <div className="relative">
                      <select 
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-4 py-2 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm appearance-none font-sans"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                        ))}
                      </select>
                      <Users size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Date</label>
                    <div className="relative">
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm font-sans"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Preferred Hour</label>
                    <div className="relative">
                      <select 
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-2 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm appearance-none font-sans"
                      >
                        {['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'].map(hr => (
                          <option key={hr} value={hr}>{hr}</option>
                        ))}
                      </select>
                      <Clock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Seating Areas */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-2">Select Cozy Seating Nook</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {SEATING_AREAS.map(area => (
                      <label 
                        key={area.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition ${seatingArea === area.id ? 'bg-amber-100/60 border-amber-300' : 'bg-white border-stone-100 hover:bg-stone-50'}`}
                      >
                        <input 
                          type="radio" 
                          name="seating"
                          value={area.id}
                          checked={seatingArea === area.id}
                          onChange={() => setSeatingArea(area.id)}
                          className="mt-1 accent-amber-800"
                        />
                        <div>
                          <p className="text-xs font-semibold text-stone-800">{area.name}</p>
                          <p className="text-[10px] text-stone-500">{area.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-stone-500 mb-1.5">Special Requests (Optional)</label>
                  <textarea 
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    rows={2}
                    placeholder="E.g., Celebrating an anniversary, allergies to nuts, require highchair, etc."
                    className="w-full px-4 py-2 bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm font-sans"
                  />
                </div>

                {/* Terms disclaimer */}
                <div className="flex items-center gap-2 text-[10px] text-stone-400 font-mono">
                  <ShieldCheck size={12} className="text-amber-700" />
                  <span>Free cancellation up to 1 hour before scheduled arrival.</span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-amber-800 hover:bg-amber-900 text-amber-50 py-3 rounded-xl font-medium shadow-lg hover:shadow-amber-900/10 active:translate-y-0.5 transition uppercase tracking-wider text-xs"
                >
                  Reserve Elegant Table
                </button>
              </form>
            </motion.div>
          ) : (
            /* Golden Reservation Ticket Layout */
            <motion.div 
              key="booking-ticket"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative transform overflow-hidden rounded-3xl bg-neutral-900 p-8 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-md border border-amber-500/30 font-sans text-white"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full" />
              
              <div className="text-center mb-6">
                <span className="text-amber-400 text-3xl">☕</span>
                <h3 className="text-xl font-serif text-amber-100 tracking-widest uppercase mt-2">Midnight Brew</h3>
                <p className="text-[10px] font-mono tracking-widest text-stone-400 mt-1">ACCESS CODE GRANTED</p>
              </div>

              {/* Gold border decorative box */}
              <div className="border border-amber-500/30 p-5 rounded-2xl bg-stone-900/40 relative">
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t border-l border-amber-400" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t border-r border-amber-400" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b border-l border-amber-400" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b border-r border-amber-400" />

                <div className="flex justify-between items-center pb-3 border-b border-stone-800 mb-4">
                  <span className="text-[10px] font-mono text-stone-400">TABLE RECEIPT</span>
                  <span className="text-xs font-semibold bg-amber-900/40 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-800/50 flex items-center gap-1">
                    <Check size={10} />
                    CONFIRMED
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-stone-500 block">GUEST OF HONOR</span>
                    <span className="text-sm font-serif font-medium text-amber-100">{ticket.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-stone-500 block">DATE</span>
                      <span className="text-xs font-medium text-stone-200">{ticket.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-stone-500 block">HOUR</span>
                      <span className="text-xs font-medium text-stone-200">{ticket.time}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-mono text-stone-500 block">TABLE SIZE</span>
                      <span className="text-xs font-medium text-stone-200">{ticket.guests} {ticket.guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-stone-500 block">SEATING NOOK</span>
                      <span className="text-xs font-medium text-amber-200">{ticket.seatingArea}</span>
                    </div>
                  </div>

                  {ticket.specialRequests && (
                    <div className="pt-2 border-t border-stone-800">
                      <span className="text-[10px] font-mono text-stone-500 block">SPECIAL DIRECTIONS</span>
                      <p className="text-[11px] text-stone-300 italic">"{ticket.specialRequests}"</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Dashed ticket divider */}
              <div className="relative my-6 flex items-center justify-between">
                <div className="absolute left-[-40px] w-5 h-10 bg-neutral-950 rounded-r-full border-r border-amber-500/20" />
                <div className="w-full border-t border-dashed border-stone-800" />
                <div className="absolute right-[-40px] w-5 h-10 bg-neutral-950 rounded-l-full border-l border-amber-500/20" />
              </div>

              {/* Interactive Ticket Footer */}
              <div className="flex flex-col items-center">
                {/* Mock QR code container using HTML grids */}
                <div className="w-20 h-20 bg-amber-50/5 p-1 rounded-lg border border-amber-500/20 grid grid-cols-5 gap-0.5 mb-3">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`rounded-xs ${((i * 7 + 13) % 5 === 0 || i % 4 === 0 || (i > 5 && i < 11) || i === 22) ? 'bg-amber-300' : 'bg-transparent'}`} 
                    />
                  ))}
                </div>
                <p className="text-[10px] font-mono text-stone-400">ID: {ticket.id.toUpperCase()}</p>
                <p className="text-[9px] text-stone-500 mt-0.5">Please show this pass at the front counter.</p>
              </div>

              <button
                onClick={handleReset}
                className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 mt-6 py-2.5 rounded-xl text-xs uppercase tracking-widest transition"
              >
                Close Receipt
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

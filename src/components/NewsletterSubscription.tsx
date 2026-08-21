import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from '../lib/realtimeFirestore';
import { Mail, Sparkles, Loader2, CheckCircle2, ShieldCheck, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState('WELCOME-15OFF');

  const generateClientUniqueCode = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude easily confused chars: I, O, 1, 0
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `WELCOME-${code}`;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const emailToSave = email.trim().toLowerCase();
    const uniquePromo = generateClientUniqueCode();
    
    // Set matching promo code, and resolve UI state instantly (under 1ms)!
    setPromoCode(uniquePromo);
    setIsSuccess(true);
    setEmail('');
    setErrorMessage(null);

    // 1. Persist lead and custom code to Firestore in the background
    addDoc(collection(db, 'leads'), {
      email: emailToSave,
      source: 'homepage_newsletter',
      promoCode: uniquePromo,
      createdAt: new Date(),
    }).catch((error) => {
      console.error('Background subscription logging error:', error);
    });

    // 2. Call SMTP emailing route in the background to dispatch welcome message
    fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailToSave,
        code: uniquePromo,
      }),
    }).catch((error) => {
      console.error('Background email dispatch trigger failed:', error);
    });
  };

  return (
    <div id="newsletter-section" className="bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-slate-50 text-slate-900 rounded-3xl overflow-hidden relative shadow-md border border-amber-200/50 p-8 sm:p-12 md:p-16 my-16">
      {/* Decorative premium background elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-xs">
          <Sparkles size={14} className="text-amber-600" />
          <span>JOIN OUR ELITE ACADEMIC CLUB</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Unlock Professional Guides & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">15% Welcome Discount</span>
        </h3>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Subscribe to our verified study guides and career insights newsletter. Receive high-scoring dissertation templates, custom formatting checklists, and an instant coupon code.
        </p>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="subscribe-form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubscribe} 
              className="mt-8 max-w-md mx-auto space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-white p-2 rounded-2xl border border-slate-300/80 shadow-sm focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all duration-300">
                <div className="relative flex-1 flex items-center px-3.5">
                  <Mail className="text-slate-400 mr-2 shrink-0" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your student or personal email"
                    required
                    className="w-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-slate-900 placeholder-slate-400 text-sm py-2.5 font-medium"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <span>Subscribe & Claim 15%</span>
                  )}
                </button>
              </div>

              {errorMessage && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-red-600 text-xs font-bold text-center"
                >
                  {errorMessage}
                </motion.p>
              )}

              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 pt-3 text-xs text-slate-500 font-bold">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-600" /> 100% Privacy Protected</span>
                <span className="flex items-center gap-1.5"><Gift size={14} className="text-amber-600" /> Instant Coupon Code</span>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success-message"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="mt-8 max-w-md mx-auto p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-4 shadow-sm"
            >
              <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900">Welcome to the Club!</h4>
                <p className="text-sm text-slate-600 mt-1">We've sent your exclusive academic guidelines to your inbox.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-emerald-300/60 flex flex-col items-center justify-center gap-1.5 shadow-xs">
                <span className="text-[11px] font-extrabold text-emerald-700 uppercase tracking-widest">Your 15% Welcome Coupon</span>
                <span className="text-2xl font-black tracking-widest text-slate-900 uppercase select-all bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-lg">{promoCode}</span>
                <span className="text-[10px] text-slate-500 font-bold">Apply this code during your next order checkout!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

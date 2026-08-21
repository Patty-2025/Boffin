import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  Paperclip, 
  Calendar, 
  Award, 
  CircleDollarSign, 
  CalendarClock, 
  Headphones, 
  Shield, 
  Plus, 
  Minus, 
  ChevronDown, 
  Trash2, 
  Loader2,
  CheckCircle2,
  Ticket,
  AlertCircle
} from 'lucide-react';

import { collection, addDoc, serverTimestamp } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export default function NewAssignment() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [taskType, setTaskType] = useState<'writing' | 'rewriting' | 'editing'>('writing');
  const [subject, setSubject] = useState('');
  const [pages, setPages] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:59 PM');
  const [referenceStyle, setReferenceStyle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showCouponInput, setShowCouponInput] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const pricePerPage = taskType === 'editing' ? 8 : 15;
  const totalPrice = pages * pricePerPage;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!subject) newErrors.subject = "Subject/Course is required";
    if (!date) newErrors.date = "A deadline date is required";
    if (!description) newErrors.description = "Please provide detailed instructions";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login?redirect=new-assignment');
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const docRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        taskType,
        subject,
        pages,
        totalCost: totalPrice,
        deadlineDate: date,
        deadlineTime: time,
        description,
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setOrderId(docRef.id);
      setShowPayment(true);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Error submitting assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentSuccess = async () => {
    if (!orderId) return;
    setIsSubmitting(true);
    try {
      // Simulate payment delay
      await new Promise(r => setTimeout(r, 1500));
      // Update order status in Firestore
      const { doc, updateDoc, addDoc, collection } = await import('../lib/realtimeFirestore');
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'in_progress',
        paymentStatus: 'paid',
        paidAt: new Date().toISOString(),
        updatedAt: serverTimestamp()
      });

      // Create transaction record
      await addDoc(collection(db, 'transactions'), {
        userId: user.uid,
        orderId: orderId,
        transactionId: `AB-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        amount: totalPrice,
        paymentType: 'Card',
        source: 'Buyer Protection',
        description: `Payment for ${subject} assignment`,
        createdAt: serverTimestamp()
      });

      navigate('/portal/assignments');
    } catch (error) {
      console.error("Payment sync failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  return (
    <div className="max-w-6xl mx-auto w-full animate-in fade-in duration-500 pb-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-emerald-500 rounded-xl text-white">
          <FileText size={24} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Project Genesis</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN - FORM */}
        <div className="w-full lg:w-[60%] bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          
          {/* Task Type */}
          <div className="mb-8">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Service Category</label>
            <div className="grid grid-cols-3 p-1.5 bg-slate-50 rounded-2xl border border-slate-100">
              {(['writing', 'rewriting', 'editing'] as const).map((type) => (
                <button 
                  key={type}
                  type="button"
                  onClick={() => setTaskType(type)}
                  className={`py-3 text-sm font-bold rounded-xl transition-all ${
                    taskType === type 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200' 
                    : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 mb-8">
            {/* Subject */}
            <div className="flex-1">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Subject / Course Name</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. Behavioral Economics"
                  className={`w-full px-4 py-3.5 bg-slate-50/50 border rounded-2xl text-sm font-medium outline-none transition-all ${
                    errors.subject ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-[10b981]/5 focus:bg-white'
                  }`}
                  value={subject}
                  onChange={e => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors({...errors, subject: ''});
                  }}
                />
                {errors.subject && <AlertCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500" size={18} />}
              </div>
              {errors.subject && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.subject}</p>}
            </div>

            {/* Pages */}
            <div className="w-full sm:w-48">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Volume (Pages)</label>
              <div className="flex items-center bg-slate-50/50 border border-slate-200 rounded-2xl overflow-hidden px-2 py-1">
                <button type="button" onClick={() => setPages(p => Math.max(1, p-1))} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Minus size={18} /></button>
                <input 
                  type="number" 
                  min={1} 
                  value={pages} 
                  onChange={e => setPages(parseInt(e.target.value) || 1)} 
                  className="w-full text-center text-sm font-bold bg-transparent outline-none" 
                />
                <button type="button" onClick={() => setPages(p => p+1)} className="p-2 text-slate-400 hover:text-emerald-500 transition-colors"><Plus size={18} /></button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 mb-8">
            {/* Deadline */}
            <div className="flex-1">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Target Deadline</label>
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1">
                  <input 
                    type="date" 
                    ref={dateInputRef}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full pl-4 pr-12 py-3.5 bg-slate-50/50 border rounded-2xl text-sm font-medium outline-none transition-all ${
                      errors.date ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-[#f47321]/5 focus:bg-white'
                    } [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
                    value={date}
                    onChange={e => {
                      setDate(e.target.value);
                      if (errors.date) setErrors({...errors, date: ''});
                    }}
                  />
                  <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative w-36">
                  <select 
                    className="w-full pl-4 pr-10 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium outline-none appearance-none focus:border-emerald-500"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                  >
                    <option>11:59 PM</option>
                    <option>12:00 PM</option>
                    <option>09:00 AM</option>
                  </select>
                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              {errors.date && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.date}</p>}
            </div>

            {/* Reference Style */}
            <div className="flex-1">
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Style Preference</label>
              <div className="relative">
                <select 
                  className="w-full pl-4 pr-10 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm font-medium outline-none appearance-none focus:border-emerald-500"
                  value={referenceStyle}
                  onChange={e => setReferenceStyle(e.target.value)}
                >
                  <option value="">Select Citation Style</option>
                  <option value="apa">APA 7th Edition</option>
                  <option value="mla">MLA 9th Edition</option>
                  <option value="harvard">Harvard</option>
                  <option value="chicago">Chicago/Turabian</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Project Brief & Instructions</label>
            <div className={`overflow-hidden flex flex-col border rounded-3xl transition-all bg-slate-50/50 ${
                errors.description ? 'border-red-500 bg-red-50/10' : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-[#f47321]/5 focus-within:bg-white'
              }`}>
              <textarea 
                rows={6}
                placeholder="Describe your assignment requirements in detail..."
                className="w-full p-6 text-sm font-medium outline-none resize-none bg-transparent"
                value={description}
                onChange={e => {
                  setDescription(e.target.value);
                  if (errors.description) setErrors({...errors, description: ''});
                }}
              />
              <div className="border-t border-slate-100 p-4 flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {files.length > 0 ? (
                    <div className="flex gap-2">
                      {files.slice(0, 2).map((f, i) => (
                        <div key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 flex items-center gap-1">
                          <Paperclip size={10} /> {f.name.slice(0, 10)}...
                        </div>
                      ))}
                      {files.length > 2 && <span className="text-xs font-bold text-slate-400">+{files.length - 2} more</span>}
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 italic">No files attached yet</span>
                  )}
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  type="button"
                  className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl transition-all text-xs font-bold shadow-lg"
                >
                  <Paperclip size={14} /> Attach Materials
                </button>
                <input type="file" hidden multiple ref={fileInputRef} onChange={handleFileChange} />
              </div>
            </div>
            {errors.description && <p className="text-red-500 text-xs font-bold mt-1 ml-1">{errors.description}</p>}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-slate-100">
             <div className="flex items-center gap-4">
                <div>
                   <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Pricing Model</div>
                   <div className="text-2xl font-black text-slate-900">${totalPrice.toFixed(2)}</div>
                </div>
                <div className="h-10 w-px bg-slate-100 mx-2"></div>
                <button 
                  type="button"
                  onClick={() => setShowCouponInput(!showCouponInput)}
                  className="text-xs font-bold text-emerald-500 hover:underline flex items-center gap-1.5"
                >
                  <Ticket size={14} /> {showCouponInput ? 'Cancel' : 'Add Coupon'}
                </button>
             </div>

             <button 
               type="submit"
               disabled={isSubmitting}
               className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
             >
               {isSubmitting ? (
                 <Loader2 className="animate-spin w-5 h-5" />
               ) : (
                 <>
                   Secure Order Submission
                   <Award size={18} />
                 </>
               )}
             </button>
          </div>

          {showCouponInput && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-3"
            >
              <input 
                type="text" 
                placeholder="PROMO CODE" 
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 text-xs font-bold outline-none focus:border-emerald-500"
                value={coupon}
                onChange={e => setCoupon(e.target.value.toUpperCase())}
              />
              <button 
                type="button"
                className="bg-slate-900 text-white px-5 py-2 rounded-xl text-xs font-bold"
              >
                Apply
              </button>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN - TRUST & GUARANTEES */}
        <div className="w-full lg:w-[40%] space-y-6">
          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-xl font-black text-slate-900 mb-4">Elite Scholar Status</h3>
                <p className="text-sm text-slate-700 font-medium leading-relaxed mb-6">
                  Join 1.2M+ global scholars who trust Boffin Global Services for high-stakes academic solutions.
                </p>
                <div className="space-y-4">
                   {[
                     { label: 'Originality Report', icon: Shield },
                     { label: 'Unlimited Revisions', icon: Award },
                     { label: 'Direct Writer Messaging', icon: Headphones }
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg text-emerald-500 shadow-sm">
                           <item.icon size={16} />
                        </div>
                        <span className="text-xs font-bold text-slate-700">{item.label}</span>
                     </div>
                   ))}
                </div>
             </div>
             <div className="absolute -bottom-6 -right-6 text-9xl opacity-5 grayscale select-none">🎓</div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Process Timeline</h4>
             <div className="space-y-8 relative">
                <div className="absolute left-[7px] top-6 bottom-6 w-0.5 bg-slate-100"></div>
                {[
                  { title: 'Project Initiation', sub: 'Submission & secure encryption', color: 'bg-indigo-500' },
                  { title: 'Expert Matching', sub: 'Selected based on domain knowledge', color: 'bg-blue-600' },
                  { title: 'Quality Assurance', sub: 'Triple-layer verification cycle', color: 'bg-emerald-500' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 relative">
                     <div className={`w-4 h-4 rounded-full ${step.color} border-4 border-white shadow-sm mt-1 z-10`}></div>
                     <div>
                        <div className="text-sm font-extrabold text-slate-900">{step.title}</div>
                        <div className="text-xs font-medium text-slate-500">{step.sub}</div>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </form>

      {/* Payment Modal/Overlay */}
      <AnimatePresence>
        {showPayment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              <button 
                 onClick={() => setShowPayment(false)}
                 className="absolute top-4 right-4 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
              >
                <Minus className="rotate-45" size={20} />
              </button>

              <div className="bg-slate-900 p-8 text-white text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20 rotate-3 group-hover:rotate-0 transition-transform">
                  <Award size={32} />
                </div>
                <h3 className="text-2xl font-black mb-1">Final Authorization</h3>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Secure Payment Gateway</p>
              </div>
              
              <div className="p-10">
                <div className="mb-10 flex justify-between items-end border-b border-slate-100 pb-6">
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-black tracking-widest mb-1">Checkout Amount</div>
                    <div className="text-4xl font-black text-slate-900">${totalPrice.toFixed(2)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Account Ref</div>
                    <div className="text-xs font-mono font-bold text-emerald-500">#{orderId?.slice(-8).toUpperCase()}</div>
                  </div>
                </div>

                <div className="space-y-4 mb-10">
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                    <div className="text-xs font-bold text-slate-700 leading-tight">Instant Expert Matching across 80+ disciplines.</div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Shield className="text-indigo-500 shrink-0" size={20} />
                    <div className="text-xs font-bold text-slate-700 leading-tight">Fraud Prevention & Secure SSL Encryption enabled.</div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={handlePaymentSuccess}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center gap-3 text-lg"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin w-6 h-6" />
                  ) : (
                    <>
                      Confirm & Pay
                      <ArrowUpRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-center gap-4 mt-8 opacity-20 filter grayscale">
                   <div className="text-xs font-black italic">VISA</div>
                   <div className="text-xs font-black italic">MasterCard</div>
                   <div className="text-xs font-black italic">Stripe</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FileText({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 15h6"/><path d="M9 11h6"/>
    </svg>
  );
}

function ArrowUpRight({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M7 7h10v10"/><path d="M7 17 17 7"/>
    </svg>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { 
  Calculator, Check, CheckCircle2, Code, Layout, Smartphone, Globe, 
  BookOpen, GraduationCap, Clock, FileText, CreditCard, 
  Landmark, ArrowLeft, ArrowRight, ShieldCheck, Briefcase, Wallet
} from 'lucide-react';

// --- Types & Constants ---
// Academic Options
type AcademicTask = 'coursework' | 'course' | 'exam' | 'dissertation';
type AcademicSubject = 'humanities' | 'social_sciences' | 'business' | 'law' | 'medical' | 'sciences' | 'math' | 'engineering' | 'cs_it' | 'other';
type AcademicLevel = 'highschool' | 'undergrad' | 'masters' | 'phd';
type AcademicUrgency = 'standard' | 'days_5' | 'hours_48' | 'hours_24' | 'hours_12';

type PaymentMethod = 'stripe' | 'crypto' | 'wise';

export default function CostCalculator() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Academic State
  const [academicTask, setAcademicTask] = useState<AcademicTask>('coursework');
  const [academicSubject, setAcademicSubject] = useState<AcademicSubject>('business');
  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>('undergrad');
  const [academicUrgency, setAcademicUrgency] = useState<AcademicUrgency>('standard');
  const [pages, setPages] = useState<number>(5);
  const [weeks, setWeeks] = useState<number>(4);

  // Checkout State
  const [isCheckout, setIsCheckout] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

  // --- Logic & Calculations ---
  const generateReceipt = () => {
    let items: { name: string; cost: number; detail?: string }[] = [];
    let total = 0;

    // Academic Pricing
    let subjectMult = 1;
    let subjectLabel = '';
    if (academicSubject === 'humanities') { subjectMult = 1.0; subjectLabel = 'Humanities & Arts'; }
    else if (academicSubject === 'social_sciences') { subjectMult = 1.05; subjectLabel = 'Social Sciences & Psychology'; }
    else if (academicSubject === 'business') { subjectMult = 1.1; subjectLabel = 'Business & Management'; }
    else if (academicSubject === 'law') { subjectMult = 1.2; subjectLabel = 'Law & Legal Studies'; }
    else if (academicSubject === 'medical') { subjectMult = 1.25; subjectLabel = 'Nursing & Medical'; }
    else if (academicSubject === 'sciences') { subjectMult = 1.3; subjectLabel = 'Natural & Hard Sciences'; }
    else if (academicSubject === 'engineering') { subjectMult = 1.4; subjectLabel = 'Engineering & Architecture'; }
    else if (academicSubject === 'math') { subjectMult = 1.45; subjectLabel = 'Mathematics & Statistics'; }
    else if (academicSubject === 'cs_it') { subjectMult = 1.5; subjectLabel = 'Computer Science & IT'; }
    else if (academicSubject === 'other') { subjectMult = 1.15; subjectLabel = 'General / Other'; }
    else { subjectMult = 1.0; subjectLabel = 'General Subject'; } // Fallback

    let levelMult = 1;
    let levelLabel = '';
    if (academicLevel === 'highschool') { levelMult = 0.8; levelLabel = 'High School'; }
    if (academicLevel === 'undergrad') { levelMult = 1.0; levelLabel = 'Undergraduate'; }
    if (academicLevel === 'masters') { levelMult = 1.4; levelLabel = "Master's Degree"; }
    if (academicLevel === 'phd') { levelMult = 1.8; levelLabel = 'PhD / Doctorate'; }

    let urgeMult = 1;
    let urgeLabel = '';
    if (academicUrgency === 'standard') { urgeMult = 1.0; urgeLabel = 'Standard (7+ Days)'; }
    if (academicUrgency === 'days_5') { urgeMult = 1.2; urgeLabel = '3-6 Days'; }
    if (academicUrgency === 'hours_48') { urgeMult = 1.5; urgeLabel = '48 Hours'; }
    if (academicUrgency === 'hours_24') { urgeMult = 2.0; urgeLabel = '24 Hours'; }
    if (academicUrgency === 'hours_12') { urgeMult = 2.8; urgeLabel = '12 Hours Express'; }

    if (academicTask === 'coursework' || academicTask === 'dissertation') {
      const basePageRate = academicTask === 'coursework' ? 14 : 22;
      const taskLabel = academicTask === 'coursework' ? 'Coursework / Essay' : 'Dissertation / Thesis';
      const costPerPage = basePageRate * subjectMult * levelMult * urgeMult;
      const finalCost = Math.round(costPerPage * pages);
      
      items.push({ name: taskLabel, detail: `${pages} pages • ${levelLabel} • ${subjectLabel}`, cost: finalCost });
      if (urgeMult > 1) items.push({ name: 'Urgency Surcharge', detail: urgeLabel, cost: 0 }); // Cost is baked into the page rate, but good to show
      total += finalCost;
    } 
    else if (academicTask === 'course') {
      const baseWeekRate = 120;
      const costPerWeek = Math.round(baseWeekRate * subjectMult * levelMult);
      const finalCost = costPerWeek * weeks;
      
      items.push({ name: 'Full Online Course Completion', detail: `${weeks} weeks • ${levelLabel} • ${subjectLabel}`, cost: finalCost });
      total += finalCost;
    }
    else if (academicTask === 'exam') {
      const baseExamRate = 90;
      const finalCost = Math.round(baseExamRate * subjectMult * levelMult * urgeMult);
      
      items.push({ name: 'Exam / Quiz Assistance', detail: `${levelLabel} • ${subjectLabel} • ${urgeLabel}`, cost: finalCost });
      total += finalCost;
    }

    return { items, total };
  };

  const receipt = generateReceipt();

  const handleProceedToPayment = async () => {
    if (!user) {
      // Not logged in: Save current quote intention and redirect
      const pendingOrder = {
        taskType: academicTask,
        subject: academicSubject,
        level: academicLevel,
        urgency: academicUrgency,
        pages: pages,
        weeks: weeks,
        totalCost: receipt.total
      };
      localStorage.setItem('pendingOrder', JSON.stringify(pendingOrder));
      navigate('/login?redirect=calculator');
      return;
    }

    // Logged in: Save to Firestore
    setIsLoading(true);
    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        taskType: academicTask,
        subject: academicSubject,
        level: academicLevel,
        urgency: academicUrgency,
        pages: pages,
        weeks: weeks,
        totalCost: receipt.total,
        status: 'draft',
        createdAt: serverTimestamp()
      });
      setIsCheckout(true);
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Failed to save order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  // Auto-save pending order after login
  useEffect(() => {
    const savePendingOrder = async () => {
      const stored = localStorage.getItem('pendingOrder');
      if (user && stored && !isLoading) {
        setIsLoading(true);
        try {
          const orderData = JSON.parse(stored);
          await addDoc(collection(db, 'orders'), {
            userId: user.uid,
            ...orderData,
            status: 'draft',
            createdAt: serverTimestamp()
          });
          localStorage.removeItem('pendingOrder');
          setIsCheckout(true);
        } catch (err) {
          console.error('Failed to save pending order:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    savePendingOrder();
  }, [user]);

  // --- Partial Renderers ---
  
  const renderCheckout = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-left animate-in fade-in zoom-in-95 duration-300">
      <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsCheckout(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-300 hover:text-white">
            <ArrowLeft size={20} />
          </button>
          <h3 className="text-xl font-bold">Secure Checkout</h3>
        </div>
        <ShieldCheck size={24} className="text-green-400" />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Order Summary */}
        <div className="w-full lg:w-5/12 p-8 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50">
          <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Order Summary</h4>
          <div className="space-y-4 mb-8">
            {receipt.items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-start pb-4 border-b border-slate-200 last:border-0 last:pb-0">
                <div>
                  <p className="font-semibold text-slate-900 leading-tight">{item.name}</p>
                  {item.detail && <p className="text-sm text-slate-500 mt-1">{item.detail}</p>}
                </div>
                {item.cost > 0 && <span className="font-medium text-slate-900 whitespace-now">${item.cost.toLocaleString()}</span>}
              </div>
            ))}
          </div>
          <div className="pt-4 border-t-2 border-slate-900 flex justify-between items-center">
            <span className="text-lg font-bold text-slate-900 font-display">Total</span>
            <span className="text-2xl font-extrabold text-slate-900">${receipt.total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            By proceeding, you agree to the terms of service. This quote is valid for 14 days. Final price may fluctuate slightly if project scope expands.
          </p>
        </div>

        {/* Payment Methods */}
        <div className="w-full lg:w-7/12 p-8 lg:p-10">
          <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Select Payment Method</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { id: 'stripe', label: 'Credit Card', icon: CreditCard },
              { id: 'crypto', label: 'Crypto', icon: Wallet },
              { id: 'wise', label: 'Wise Transfer', icon: Landmark },
            ].map(method => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                className={`flex flex-col items-center justify-center p-5 border-2 rounded-xl transition-all duration-300 relative ${
                  paymentMethod === method.id 
                    ? 'border-amber-500 bg-amber-50/60 text-slate-900 shadow-md ring-2 ring-amber-500/50' 
                    : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-0.5'
                }`}
              >
                {paymentMethod === method.id && (
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-slate-950 p-1 rounded-full shadow-sm">
                    <CheckCircle2 size={16} strokeWidth={3} />
                  </div>
                )}
                <method.icon size={28} className={`mb-3 ${paymentMethod === method.id ? 'text-amber-600' : 'text-slate-400'}`} />
                <span className="text-sm font-bold">{method.label}</span>
              </button>
            ))}
          </div>

          {/* Dynamic Payment Details */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            {paymentMethod === 'stripe' && (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-blue-50/50">
                  <CreditCard size={36} />
                </div>
                <h5 className="text-xl font-bold text-slate-900 mb-3">Pay securely with Stripe</h5>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto">You will be redirected to a secure Stripe Checkout portal to process your credit or debit card.</p>
                <a href="#stripe-payment-link" className="inline-block w-full sm:w-auto min-w-[250px] bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold py-4 px-8 rounded-xl transition-all shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 active:scale-[0.99]">
                  Proceed to Stripe checkout
                </a>
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                   <div className="p-2 bg-slate-100 rounded-lg"><Wallet size={20} className="text-slate-700" /></div> 
                   Cryptocurrency Payment
                </h5>
                <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                   Send the equivalent of <strong className="text-slate-900 font-extrabold text-lg mx-1">${receipt.total.toLocaleString()} USD</strong> to one of the secure wallet addresses below.
                </p>
                
                <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl text-sm mb-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 gap-3">
                    <span className="text-slate-500 font-bold flex items-center shrink-0 uppercase tracking-wider text-xs">Bitcoin (BTC)</span>
                    <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex-1 sm:max-w-[280px]">
                      <span className="font-bold text-slate-800 font-mono text-xs break-all leading-relaxed tracking-tight" title="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh">bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 gap-3">
                     <span className="text-slate-500 font-bold flex items-center shrink-0 uppercase tracking-wider text-xs">Ethereum (ERC-20)</span>
                     <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex-1 sm:max-w-[280px]">
                       <span className="font-bold text-slate-800 font-mono text-xs break-all leading-relaxed tracking-tight" title="0x71C7656EC7ab88b098defB751B7401B5f6d8976F">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
                     </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                     <span className="text-slate-500 font-bold flex items-center shrink-0 uppercase tracking-wider text-xs">USDT (TRC-20)</span>
                     <div className="bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex-1 sm:max-w-[280px]">
                       <span className="font-bold text-slate-800 font-mono text-xs break-all leading-relaxed tracking-tight" title="TXJ9x6P88k2FzBKVL4wT3QyRQ8XJ9kR8m3K">TXJ9x6P88k2FzBKVL4wT3QyRQ8XJ9kR8m3K</span>
                     </div>
                  </div>
                </div>

                <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:-translate-y-0.5">
                  I have sent the transaction
                </button>
              </div>
            )}

            {paymentMethod === 'wise' && (
              <div className="text-left animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h5 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                   <div className="p-2 bg-slate-100 rounded-lg"><Landmark size={20} className="text-slate-700" /></div>
                   Direct Bank Transfer (Wise)
                </h5>
                <p className="text-sm text-slate-500 mb-6 bg-slate-50 p-4 rounded-lg border border-slate-100">
                   Please transfer <strong className="text-slate-900 font-extrabold text-lg mx-1">${receipt.total.toLocaleString()} USD</strong> to the bank account below. Ensure your name is in the reference.
                </p>
                
                <div className="space-y-4 bg-white p-6 border border-slate-200 rounded-xl text-sm mb-8 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-100 pb-4 gap-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Account Name</span>
                    <span className="font-bold text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">Your Business Name</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-slate-100 pb-4 gap-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">IBAN / Route Code</span>
                    <span className="font-bold text-slate-900 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 tracking-tight">US00 XXXX XXXX XXXX</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-xs">Routing / Sort Code</span>
                    <span className="font-bold text-slate-900 font-mono bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">123456</span>
                  </div>
                </div>

                <button className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:-translate-y-0.5">
                  I have completed the transfer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      
      {isCheckout ? (
        renderCheckout()
      ) : (
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden text-left flex flex-col lg:flex-row animate-in fade-in duration-500">
          
          {/* Left Side: Builder */}
          <div className="w-full lg:w-2/3 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-200">
            

            {/* --- ACADEMIC VIEW --- */}
              <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Academic Task Type */}
                <div>
                  <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                    1. Task Type
                  </label>
                  <select 
                    value={academicTask} 
                    onChange={e => setAcademicTask(e.target.value as AcademicTask)}
                    className="w-full p-4 border-2 border-slate-200 rounded-xl font-semibold text-slate-700 bg-white outline-none focus:border-slate-900 transition-colors"
                  >
                    <option value="coursework">Coursework / Essay Writing</option>
                    <option value="course">Full Online Course Completion</option>
                    <option value="exam">Exam / Quiz Assistance</option>
                    <option value="dissertation">Dissertation / Master's Thesis</option>
                  </select>
                </div>

                {/* Sub-selectors row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                      Subject Domain
                    </label>
                    <select 
                      value={academicSubject} 
                      onChange={e => setAcademicSubject(e.target.value as AcademicSubject)}
                      className="w-full h-12 px-4 border border-slate-300 rounded-lg font-semibold text-slate-700 bg-white outline-none focus:border-slate-900 transition-colors"
                    >
                      <option value="humanities">Humanities & Arts</option>
                      <option value="social_sciences">Social Sciences & Psychology</option>
                      <option value="business">Business & Management</option>
                      <option value="law">Law & Legal Studies</option>
                      <option value="medical">Nursing & Medical</option>
                      <option value="sciences">Natural & Hard Sciences</option>
                      <option value="math">Mathematics & Statistics</option>
                      <option value="engineering">Engineering & Architecture</option>
                      <option value="cs_it">Computer Science & IT</option>
                      <option value="other">Other / General</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                      Academic Level
                    </label>
                    <select 
                      value={academicLevel} 
                      onChange={e => setAcademicLevel(e.target.value as AcademicLevel)}
                      className="w-full h-12 px-4 border border-slate-300 rounded-lg font-semibold text-slate-700 bg-white outline-none focus:border-slate-900 transition-colors"
                    >
                      <option value="highschool">High School</option>
                      <option value="undergrad">Undergraduate Degree</option>
                      <option value="masters">Master's Degree</option>
                      <option value="phd">PhD / Doctorate</option>
                    </select>
                  </div>
                </div>

                {/* Length & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {academicTask === 'course' ? (
                     <div>
                       <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                         Course Length (Weeks)
                       </label>
                       <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden h-12 bg-white">
                           <button onClick={() => setWeeks(p => Math.max(1, p-1))} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border-r border-slate-300 text-slate-600 h-full font-bold">-</button>
                           <input type="number" min={1} value={weeks} onChange={e => setWeeks(parseInt(e.target.value) || 1)} className="w-full text-center font-bold text-lg outline-none" />
                           <button onClick={() => setWeeks(p => p+1)} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border-l border-slate-300 text-slate-600 h-full font-bold">+</button>
                       </div>
                    </div>
                  ) : academicTask !== 'exam' ? (
                    <div>
                       <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                         <FileText size={16} className="inline mr-1" /> Number of Pages
                       </label>
                       <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden h-12 bg-white">
                           <button onClick={() => setPages(p => Math.max(1, p-1))} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border-r border-slate-300 text-slate-600 h-full font-bold">-</button>
                           <input type="number" min={1} value={pages} onChange={e => setPages(parseInt(e.target.value) || 1)} className="w-full text-center font-bold text-lg outline-none" />
                           <button onClick={() => setPages(p => p+1)} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border-l border-slate-300 text-slate-600 h-full font-bold">+</button>
                       </div>
                       <p className="text-xs text-slate-500 mt-2 text-center">~275 words per page</p>
                    </div>
                  ) : <div /> /* spacing filler for exam */}

                  {academicTask !== 'course' && (
                    <div>
                      <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
                        <Clock size={16} className="inline mr-1" /> Deadline / Urgency
                      </label>
                      <select 
                        value={academicUrgency} 
                        onChange={e => setAcademicUrgency(e.target.value as AcademicUrgency)}
                        className="w-full h-12 px-4 border border-slate-300 rounded-lg font-semibold text-slate-700 bg-white outline-none focus:border-slate-900 transition-colors"
                      >
                        <option value="standard">Standard (7+ Days)</option>
                        <option value="days_5">3 - 6 Days</option>
                        <option value="hours_48">48 Hours</option>
                        <option value="hours_24">24 Hours</option>
                        <option value="hours_12">12 Hours Express</option>
                      </select>
                    </div>
                  )}

                </div>

              </div>
          </div>

          {/* Right Side: Floating Summary */}
          <div className="w-full lg:w-1/3 bg-slate-900 text-white p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <h4 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-8 flex items-center gap-2">
                <Calculator size={18} /> Live Quote
              </h4>
              
              <div className="space-y-4 mb-8">
                {receipt.items.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-start text-sm border-b border-slate-800 pb-3">
                     <span className="text-slate-300 font-medium pr-4">{item.name}</span>
                     {item.cost > 0 && <span className="text-white font-bold whitespace-now">${item.cost}</span>}
                  </div>
                ))}
                {receipt.items.length > 3 && (
                   <p className="text-xs text-slate-500 italic">+ {receipt.items.length - 3} more items...</p>
                )}
              </div>

              <div className="pt-2">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Estimate</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-extrabold text-white">${receipt.total.toLocaleString()}</span>
                  <span className="text-slate-400 font-medium">USD</span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Prices are estimates. Final quote provided upon full review of materials and specs.
                </p>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-800">
              <button 
                onClick={handleProceedToPayment}
                disabled={isLoading}
                className="w-full py-4 rounded font-bold flex items-center justify-center gap-2 transition-colors bg-white text-slate-900 hover:bg-slate-200 border border-slate-200 shadow-xl uppercase text-xs tracking-widest disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : 'Proceed to Payment'} <ArrowRight size={18} />
              </button>
            </div>
          </div>
          
        </div>
      )}

    </div>
  );
}

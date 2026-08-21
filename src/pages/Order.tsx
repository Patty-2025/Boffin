import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  CheckCircle2, 
  ChevronRight, 
  User, 
  Mail, 
  Phone, 
  ArrowLeft, 
  Sparkles, 
  Upload, 
  X, 
  Paperclip, 
  ShieldCheck, 
  Clock, 
  Calculator, 
  Award, 
  Check, 
  Zap, 
  MessageSquare,
  CreditCard
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ALL_SUBJECTS } from '../constants/subjects';
import { addDoc, collection, doc, setDoc, serverTimestamp } from '../lib/realtimeFirestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, auth, storage } from '../lib/firebase';
import StripeCheckoutForm from '../components/StripeCheckoutForm';
import ErrorBoundary from '../components/ErrorBoundary';
import writersData from '../data/topWriters.json';
import { fetchLoyaltySettings, userIdFromReferralCode } from '../lib/loyalty';

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File;
}

const URGENCY_OPTIONS = [
  { id: '3 Hours', label: '3 Hours', multiplier: 1.8, badge: 'Urgent' },
  { id: '6 Hours', label: '6 Hours', multiplier: 1.6 },
  { id: '12 Hours', label: '12 Hours', multiplier: 1.4 },
  { id: '24 Hours', label: '24 Hours', multiplier: 1.25, badge: 'Popular' },
  { id: '3 Days', label: '3 Days', multiplier: 1.1 },
  { id: '7 Days', label: '7 Days', multiplier: 1.0 },
  { id: '14 Days', label: '14 Days', multiplier: 0.9 },
];

const PAPER_TYPES = [
  // Academic Writing
  'Assignment Writing',
  'Dissertation Writing',
  'Thesis Writing',
  'Coursework Writing',
  'Research Paper',
  'IB Extended Essay',
  'College Essay Help',
  'Admission Essay',
  'Personal Statement Help',
  'SOP Writing',
  'Editing Proofreading',

  // Professional & Business
  'MBA Project Assignment',
  'DBA Writing Help',
  'Accounting Assignment',
  'CIPD Assignment Help',
  'CIPP Assignment Help',
  'ILM Assignment Help',
  'ATHE Assignment Help',
  'OTHM Assignment Help',
  'BTEC Assignment Help',
  'CDR Report',
  'CV Writing',

  // Technical & Regional
  'Code Debugging & Optimization',
  'Data Analysis & Visualization',
  'Engineering Simulations',
  'Software Architecture Plan',
  'Technical Documentation',
  'Technical Assignment Guidance',
  'Homework Help Dubai',
  'Oman Assignment Essay',
  'University Assignment Help',
  'Open University Assignment',
  'Online Exam Help',
  'Powerpoint Presentation'
];

export default function Order() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [step, setStep] = useState(1);
  const [selectedWriter, setSelectedWriter] = useState<string | null>(null);
  const chosenWriter = writersData.find((writer) => writer.id.toString() === selectedWriter);
  
  // Extract initial query parameters if present
  const initialSubject = searchParams.get('subject') || searchParams.get('type') || '';
  const initialLevel = searchParams.get('level') || 'Undergraduate';
  const initialUrgency = searchParams.get('urgency') || '24 Hours';
  const initialPages = parseInt(searchParams.get('pages') || '2', 10);

  const [formData, setFormData] = useState({
    academicLevel: initialLevel,
    paperType: PAPER_TYPES.includes(initialSubject)
      ? initialSubject
      : initialSubject.includes('Coding')
      ? 'Code Debugging & Optimization'
      : initialSubject.includes('CAD')
      ? 'Engineering Simulations'
      : initialSubject.includes('SPSS') || initialSubject.includes('Data')
      ? 'Data Analysis & Visualization'
      : 'Assignment Writing',
    subject: initialSubject || '',
    pages: initialPages || 2,
    urgency: initialUrgency,
    deadline: '',
    topic: '',
    instructions: '',
    files: [] as UploadedFile[],
    email: auth.currentUser?.email || '',
    fullName: auth.currentUser?.displayName || '',
    phone: '',
    preferredContact: 'WhatsApp & Email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Price Calculation
  const calculatePrice = () => {
    let baseRate = 18;
    if (formData.academicLevel === 'Masters') baseRate = 24;
    if (formData.academicLevel === 'Doctoral') baseRate = 32;

    const technicalServices = [
      'Code Debugging & Optimization',
      'Data Analysis & Visualization',
      'Engineering Simulations',
      'Software Architecture Plan',
      'Technical Documentation',
      'Technical Assignment Guidance'
    ];

    if (
      technicalServices.includes(formData.paperType) || 
      formData.paperType.includes('Coding') || 
      formData.paperType.includes('CAD') || 
      formData.paperType.includes('Data Analysis')
    ) {
      baseRate += 6;
    }

    const urgencyObj = URGENCY_OPTIONS.find(u => u.id === formData.urgency) || URGENCY_OPTIONS[3];
    const rawTotal = baseRate * formData.pages * urgencyObj.multiplier;
    const originalTotal = Math.round(rawTotal);
    const discountedTotal = Math.round(rawTotal * 0.5); // 50% discount promo

    return { originalTotal, discountedTotal, savings: originalTotal - discountedTotal };
  };

  const { originalTotal, discountedTotal, savings } = calculatePrice();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validFiles: UploadedFile[] = [];
    Array.from(files).forEach(file => {
      if (file.size > 200 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 200MB.`);
        return;
      }
      validFiles.push({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      });
    });

    if (validFiles.length > 0) {
      setFormData(prev => ({ ...prev, files: [...prev.files, ...validFiles] }));
    }
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, index) => index !== indexToRemove)
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleOrderSubmission = async (paymentId?: string) => {
    setIsSubmitting(true);
    try {
      const orderRef = doc(collection(db, 'orders'));
      const uid = auth.currentUser ? auth.currentUser.uid : 'guest_' + Date.now();
      const referralCode = localStorage.getItem('boffinReferralCode') || '';
      const referrerId = userIdFromReferralCode(referralCode);
      const loyaltySettings = await fetchLoyaltySettings();

      const uploadedAttachments = [];
      for (const f of formData.files) {
        try {
          const fileRef = ref(storage, `order-attachments/${uid}/${orderRef.id}/${f.name}`);
          await uploadBytesResumable(fileRef, f.file);
          const url = await getDownloadURL(fileRef);
          uploadedAttachments.push({
            name: f.name,
            size: f.size,
            type: f.type,
            url: url
          });
        } catch (fileErr) {
          console.warn("Storage upload warning:", fileErr);
          uploadedAttachments.push({
            name: f.name,
            size: f.size,
            type: f.type,
            url: '#'
          });
        }
      }

      await setDoc(orderRef, {
        userId: uid,
        fullName: formData.fullName || 'Valued Student',
        email: formData.email,
        taskType: formData.paperType,
        subject: formData.subject || formData.paperType,
        writerId: chosenWriter?.id || null,
        writerName: chosenWriter?.name || 'Best available expert',
        level: formData.academicLevel,
        pages: formData.pages,
        deadline: formData.urgency,
        status: paymentId ? 'in_progress' : 'pending',
        paymentStatus: paymentId ? 'paid' : 'unpaid',
        paidAt: paymentId ? new Date().toISOString() : null,
        paymentMethod: 'Stripe',
        paymentId: paymentId || 'pi_pending',
        referralCode: referrerId && referrerId !== uid ? referralCode : null,
        totalCost: discountedTotal,
        originalCost: originalTotal,
        createdAt: serverTimestamp(),
        details: {
          academicLevel: formData.academicLevel,
          subject: formData.subject,
          pages: formData.pages,
          urgency: formData.urgency,
          deadline: formData.deadline,
          topic: formData.topic,
          instructions: formData.instructions,
          phone: formData.phone,
          preferredContact: formData.preferredContact
        },
        attachments: uploadedAttachments
      });

      if (referrerId && referrerId !== uid && paymentId) {
        await addDoc(collection(db, 'referralEvents'), { referrerId, referredUserId: uid, orderId: orderRef.id, points: loyaltySettings.pointsPerReferral, status: 'pending', createdAt: serverTimestamp() });
        localStorage.removeItem('boffinReferralCode');
      }

      navigate('/order-placed');
    } catch (err) {
      console.error("Error saving order: ", err);
      alert("There was an issue saving your order details. Please ensure your inputs are valid.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-800">
      <header className="header-v2 bg-slate-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center min-h-[72px] px-4 lg:px-6">
          <Link to="/" className="shrink-0">
            <img className="shark-logo" src="/_redesign/assets/img/logo.svg" alt="BoffinGlobal(TM)" width="180" height="32" />
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-transparent pb-24 font-sans text-slate-800 relative overflow-hidden">

      {/* Page Header Header Container */}
      <section className="relative z-10 mt-2 border-b border-slate-200 bg-[#d9e0ed] px-4 pb-3 pt-2 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles size={15} className="text-amber-600 animate-pulse" />
            <span>50% NEW STUDENT DISCOUNT AUTOMATICALLY APPLIED</span>
          </div>

          <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 sm:text-3xl">
            Place Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">Academic & Technical</span> Order
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get step-by-step assistance from accredited PhD & Industry specialists in SPSS, MATLAB, AutoCAD, Python, and Research Papers.
          </p>

          {/* Quick Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs font-bold text-slate-600">
            <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-amber-600" /> 100% Confidentiality</span>
            <span className="flex items-center gap-1.5"><Zap size={16} className="text-teal-600" /> Free Turnitin & AI Report</span>
            <span className="flex items-center gap-1.5"><Award size={16} className="text-emerald-600" /> Money-Back Guarantee</span>
          </div>

        </div>
      </section>

      {/* Main Order Form Container */}
      <div className="max-w-6xl mx-auto mt-8 px-4 sm:px-6 relative z-10">
        
        {/* Step Progress Tracker */}
        <div className="mb-6 flex items-center justify-between overflow-x-auto border border-black bg-transparent p-4">
          {[
            { num: 1, label: 'Order Details', icon: FileText, desc: 'Subject, date & files' },
            { num: 2, label: 'Choose Your Expert', icon: Award, desc: 'Browse writers' },
            { num: 3, label: 'Checkout', icon: CreditCard, desc: 'Secure payment' }
          ].map((s, idx) => {
            const Icon = s.icon;
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <React.Fragment key={s.num}>
                <button
                  type="button"
                  onClick={() => s.num < step && setStep(s.num)}
                  disabled={s.num > step}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                    isCurrent 
                      ? 'bg-amber-50 border border-amber-300 text-amber-900 shadow-sm' 
                      : isCompleted 
                      ? 'text-slate-700 hover:text-slate-900 cursor-pointer' 
                      : 'text-slate-400 opacity-60'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-xs transition-all ${
                    isCompleted 
                      ? 'bg-emerald-600 text-white shadow-sm' 
                      : isCurrent 
                      ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 text-slate-950 font-black shadow-md shadow-amber-500/20' 
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    {isCompleted ? <Check size={18} strokeWidth={3} /> : <Icon size={18} />}
                  </div>
                  
                  <div className="text-left hidden md:block">
                    <span className={`block text-xs font-black uppercase tracking-wider ${isCurrent ? 'text-amber-900' : isCompleted ? 'text-slate-900' : 'text-slate-500'}`}>
                      Step {s.num}: {s.label}
                    </span>
                    <span className="text-[10px] text-slate-500 block">{s.desc}</span>
                  </div>
                </button>

                {idx < 2 && (
                  <ChevronRight size={20} className="text-slate-300 shrink-0 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Order Card Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Interactive Form Column */}
          <div className="border border-black bg-transparent p-6 sm:p-8 lg:col-span-8">
            <div className="order-form-container">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: PAPER & SCOPE REQUIREMENTS */}
                {step === 1 && (
                  <motion.div 
                    key="step1" 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }} 
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                      <div>
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                          <FileText className="text-amber-600" size={22} /> Step 1: Confirm Your Order
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">Select your discipline, work type, and scope to configure your order.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* Academic Level */}
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Academic Level
                        </label>
                        <select 
                          value={formData.academicLevel}
                          onChange={(e) => setFormData({...formData, academicLevel: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold"
                        >
                          <option value="High School">High School</option>
                          <option value="Diploma">Diploma / Foundation</option>
                          <option value="Undergraduate">Undergraduate (Bachelor's)</option>
                          <option value="Masters">Master's Degree</option>
                          <option value="Doctoral">Doctoral (Ph.D.)</option>
                        </select>
                      </div>

                      {/* Type of Paper / Service */}
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Assignment Type
                        </label>
                        <select 
                          value={formData.paperType}
                          onChange={(e) => setFormData({...formData, paperType: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold"
                        >
                          {PAPER_TYPES.map((pt, idx) => (
                            <option key={idx} value={pt}>{pt}</option>
                          ))}
                        </select>
                      </div>

                      {/* Subject / Discipline */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Subject / Area of Study
                        </label>
                        <input 
                          type="text"
                          list="subjects"
                          placeholder="e.g. SPSS Data Analysis, MATLAB Signal Processing, Business Management, Civil Engineering"
                          required
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold placeholder:text-slate-400"
                        />
                        <datalist id="subjects">
                           {ALL_SUBJECTS.map((sub, i) => <option key={i} value={sub} />)}
                        </datalist>
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Preferred delivery date and time
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={formData.deadline}
                          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold"
                        />
                      </div>

                      {/* Pages Counter */}
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Number of Pages / Scope
                        </label>
                        <div className="flex bg-slate-50 border border-slate-300 rounded-xl overflow-hidden p-1">
                           <button 
                             type="button" 
                             onClick={() => setFormData({...formData, pages: Math.max(1, formData.pages - 1)})} 
                             className="px-4 py-2 hover:bg-slate-200 font-black text-amber-600 rounded-lg transition-colors text-lg"
                           >
                             -
                           </button>
                           <input 
                             type="number" 
                             min="1"
                             value={formData.pages}
                             onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value) || 1})}
                             className="w-full text-center bg-transparent focus:outline-none font-extrabold text-slate-900 text-base"
                           />
                           <button 
                             type="button" 
                             onClick={() => setFormData({...formData, pages: formData.pages + 1})} 
                             className="px-4 py-2 hover:bg-slate-200 font-black text-amber-600 rounded-lg transition-colors text-lg"
                           >
                             +
                           </button>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1.5 font-medium flex items-center justify-between">
                          <span>Approx. {formData.pages * 275} words</span>
                          <span className="text-teal-700 font-semibold">Double Spaced</span>
                        </p>
                      </div>

                      {/* Urgency Selection Grid */}
                      <div className="md:col-span-2">
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Urgency / Delivery Timeline
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {URGENCY_OPTIONS.map((urg) => {
                            const isSelected = formData.urgency === urg.id;
                            return (
                              <button
                                key={urg.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, urgency: urg.id })}
                                className={`p-3.5 rounded-xl border text-center transition-all relative ${
                                  isSelected 
                                    ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm ring-2 ring-amber-500/30' 
                                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                                }`}
                              >
                                {urg.badge && (
                                  <span className="absolute -top-2.5 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase shadow-sm">
                                    {urg.badge}
                                  </span>
                                )}
                                <span className="block text-xs font-black">{urg.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Upload your files <span className="text-slate-400 font-medium normal-case">(optional)</span>
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-5 bg-slate-50 text-center hover:border-amber-500 hover:bg-amber-50/30 transition-all relative cursor-pointer">
                          <input type="file" multiple className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} ref={fileInputRef} />
                          <Upload size={22} className="mx-auto mb-2 text-amber-600" />
                          <p className="text-xs font-extrabold text-slate-800">Click to upload or drag files here</p>
                          <p className="text-[11px] text-slate-500 mt-1">Images, documents, ZIP and RAR files up to 200MB each</p>
                        </div>
                        {formData.files.length > 0 && (
                          <p className="text-[11px] text-emerald-700 font-bold mt-2">{formData.files.length} file(s) attached</p>
                        )}
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* STEP 2: TASK DETAILS & FILE ATTACHMENTS */}
                {step === 2 && (
                  <motion.div 
                    key="step2" 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }} 
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                      <div>
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                          <Award className="text-amber-600" size={22} /> Step 2: Choose Your Expert
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">Choose from the same rated, active writers shown on our Writers page.</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {writersData.slice(0, 6).map((writer) => {
                        const isSelected = selectedWriter === writer.id.toString();
                        return (
                          <button
                            key={writer.id}
                            type="button"
                            onClick={() => setSelectedWriter(writer.id.toString())}
                            className={`text-left p-3 rounded-2xl border transition-all ${isSelected ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-500/20' : 'border-slate-200 bg-white hover:border-amber-300'}`}
                          >
                            <div className="flex items-center gap-3">
                              <img src={writer.avatar} alt={writer.name} className="w-12 h-12 rounded-full object-cover" />
                              <div className="min-w-0">
                                <p className="font-extrabold text-sm text-slate-900 truncate">{writer.name}</p>
                                <p className="text-xs text-slate-500">{writer.discipline}</p>
                                <p className="text-xs font-bold text-amber-600">{writer.rating}/10 · {writer.orders.toLocaleString()} orders</p>
                              </div>
                              {isSelected && <CheckCircle2 size={18} className="ml-auto text-emerald-600 shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Assignment Title / Topic
                        </label>
                        <input 
                          type="text"
                          placeholder="e.g. SPSS Regression Analysis on Employee Retention Data, or Writer's Choice"
                          value={formData.topic}
                          onChange={(e) => setFormData({...formData, topic: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Detailed Instructions & Guidelines <span className="text-amber-600">*</span>
                        </label>
                        <textarea 
                          placeholder="Please enter all specific instructions, dataset descriptions, required referencing style (APA, Harvard, IEEE), software versions, or professor rubrics..."
                          required
                          value={formData.instructions}
                          onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all h-36 resize-none leading-relaxed placeholder:text-slate-400 font-medium"
                        />
                      </div>

                      {/* File Upload Box */}
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Attach Files & Datasets (Optional)
                        </label>

                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 bg-slate-50 text-center hover:border-amber-500 hover:bg-amber-50/30 transition-all relative cursor-pointer group">
                          <input 
                            type="file" 
                            multiple 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            onChange={handleFileUpload} 
                            ref={fileInputRef}
                          />
                          <div className="w-12 h-12 bg-white border border-slate-200 shadow-sm rounded-xl flex items-center justify-center mx-auto mb-3 text-amber-600 group-hover:scale-110 transition-transform">
                            <Upload size={24} />
                          </div>
                          <p className="text-xs font-extrabold text-slate-800">Click to upload or drag files here</p>
                          <p className="text-[11px] text-slate-500 mt-1">PDF, DOCX, SAV (SPSS), CSV, ZIP, CAD (.DWG), MAT files up to 200MB</p>
                        </div>

                        {/* List of Attached Files */}
                        {formData.files.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <p className="text-[11px] font-black text-amber-800 uppercase tracking-wider">
                              Attached Files ({formData.files.length}):
                            </p>
                            <ul className="space-y-2 max-h-48 overflow-y-auto pr-1">
                              {formData.files.map((file, idx) => (
                                <li key={idx} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                                  <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0">
                                      <Paperclip size={16} />
                                    </div>
                                    <div className="overflow-hidden">
                                      <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                                      <p className="text-[10px] text-slate-500">{formatFileSize(file.size)}</p>
                                    </div>
                                  </div>
                                  <button 
                                    type="button" 
                                    onClick={() => removeFile(idx)} 
                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                                  >
                                    <X size={16} />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CONTACT INFORMATION & STRIPE CHECKOUT */}
                {step === 3 && (
                  <motion.div 
                    key="step3" 
                    initial={{ opacity: 0, x: 20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    exit={{ opacity: 0, x: -20 }} 
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                      <div>
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                          <User className="text-amber-600" size={22} /> Step 3: Contact & Secure Payment
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">Provide your contact details and pay securely via Stripe.</p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                          Full Name <span className="text-amber-600">*</span>
                        </label>
                        <div className="relative">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g. Alex Morgan"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold placeholder:text-slate-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                            Email Address <span className="text-amber-600">*</span>
                          </label>
                          <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                              type="email" 
                              required 
                              placeholder="alex@university.edu"
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold placeholder:text-slate-400"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                            Phone / WhatsApp <span className="text-slate-400 font-medium normal-case">(Optional)</span>
                          </label>
                          <div className="relative">
                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                              type="tel" 
                              placeholder="+1 (555) 000-0000"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all font-semibold placeholder:text-slate-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Integrated Stripe Payment Section */}
                      <div className="pt-2">
                        <ErrorBoundary fallbackMessage="Stripe payment gateway could not be loaded. Please ensure you have a valid network connection or try again later.">
                          <StripeCheckoutForm
                            amount={discountedTotal}
                            email={formData.email}
                            fullName={formData.fullName}
                            onPaymentSuccess={(paymentId) => handleOrderSubmission(paymentId)}
                            isSubmittingOrder={isSubmitting}
                          />
                        </ErrorBoundary>
                      </div>

                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Navigation Actions */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={prevStep} 
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={16} /> Previous Step
                  </button>
                ) : <div />}

                {step < 3 && (
                  <button 
                    type="button" 
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 active:scale-95 cursor-pointer"
                  >
                    <span>Continue to Step {step + 1}</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Right Column: Live Cost & Order Summary Card */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="sticky top-28 border border-black bg-transparent p-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <Calculator size={18} className="text-amber-600" /> Order Summary
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-300 px-2.5 py-0.5 rounded-full font-black">
                  50% OFF
                </span>
              </div>

              {/* Summary Items Breakdown */}
              <div className="space-y-3 text-xs border-b border-slate-200 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-500">Academic Level:</span>
                  <span className="font-bold text-slate-900">{formData.academicLevel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service Type:</span>
                  <span className="font-bold text-slate-900 max-w-[170px] truncate text-right">{formData.paperType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Discipline:</span>
                  <span className="font-bold text-amber-700 max-w-[170px] truncate text-right">{formData.subject || 'General'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pages / Words:</span>
                  <span className="font-bold text-slate-900">{formData.pages} page(s) (~{formData.pages * 275} words)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Urgency:</span>
                  <span className="font-bold text-teal-700">{formData.urgency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expert:</span>
                  <span className="font-bold text-slate-900 max-w-[170px] truncate text-right">{chosenWriter?.name || 'Choose in Step 2'}</span>
                </div>
              </div>

              {/* Price Calculation Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-5">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs text-slate-600 font-bold">Total Price:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-600">${discountedTotal}</span>
                    <span className="text-xs text-slate-400 line-through font-medium ml-2">${originalTotal}</span>
                  </div>
                </div>
                <p className="text-[10px] text-emerald-700 font-bold text-right">
                  You Save: ${savings} (50% Auto-Applied)
                </p>
              </div>

              {/* Included Free Perks List */}
              <div className="space-y-2 text-xs text-slate-700 mb-6">
                <p className="text-[11px] font-black uppercase text-slate-500 tracking-wider mb-2">
                  Free Perks Included With Your Order:
                </p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Turnitin Plagiarism Report ($15 Value) — FREE</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>AI Content Verification Report — FREE</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>APA / Harvard Bibliography — FREE</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span>Unlimited Revisions for 14 Days — FREE</span>
                </div>
              </div>

              {/* Help & Support Banner */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3 text-xs text-amber-900">
                <MessageSquare size={18} className="text-amber-600 shrink-0" />
                <div>
                  <span className="font-extrabold block">Need Help Ordering?</span>
                  <span className="text-[10px] text-slate-600">Our 24/7 academic support desk is ready to assist.</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      </main>
    </div>
  );
}

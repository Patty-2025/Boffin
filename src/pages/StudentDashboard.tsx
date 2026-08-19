import React, { useEffect, useState } from 'react';
import { Award, CalendarDays, CheckCircle2, ChevronDown, FileText, Headphones, LoaderCircle, LockKeyhole, Minus, Paperclip, Plus, Search, ShieldCheck, Star, Trash2, Upload, User, Wallet, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { ALL_SUBJECTS } from '../constants/subjects';
import { SERVICE_MENU_ITEMS } from '../constants/serviceMenu';
import writersData from '../data/topWriters.json';
import StripeCheckoutForm from '../components/StripeCheckoutForm';
import ErrorBoundary from '../components/ErrorBoundary';
import { db } from '../lib/firebase';
import { POINTS_PER_REFERRAL, userIdFromReferralCode } from '../lib/loyalty';

export default function StudentDashboard() {
  const { user } = useAuth();
    const navigate = useNavigate();
  const displayName = user?.displayName || user?.email?.split('@')[0] || 'there';
  const generatedPassword = localStorage.getItem('boffinGeneratedPassword');
  const verificationKey = user?.uid ? `boffinEmailVerified:${user.uid}` : '';
  const [isWelcomeVisible, setIsWelcomeVisible] = useState(true);
  const [isVerified, setIsVerified] = useState(Boolean(verificationKey && sessionStorage.getItem(verificationKey)) || Boolean(user?.emailVerified));
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [orderStep, setOrderStep] = useState(1);
  const [topic, setTopic] = useState('');
  const [paperType, setPaperType] = useState('Essay (any type)');
  const [discipline, setDiscipline] = useState('');
  const [pages, setPages] = useState(2);
  const [deadline, setDeadline] = useState('');
  const [instructions, setInstructions] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [citationFormat, setCitationFormat] = useState('APA');
  const [apaEdition, setApaEdition] = useState('APA 7th edition');
  const [serviceType, setServiceType] = useState('Sample writing');
  const [specificWriter, setSpecificWriter] = useState('');
  const [writerFinder, setWriterFinder] = useState(false);
  const [selectedWriterId, setSelectedWriterId] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'paid'>('unpaid');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWalletBalance, setUseWalletBalance] = useState(false);
  const selectedWriter = writersData.find((writer) => writer.id === selectedWriterId);
  const orderTotal = Math.max(15, pages * 15);
  const walletAmountUsed = useWalletBalance ? Math.min(walletBalance, orderTotal) : 0;
  const amountDue = Math.max(0, orderTotal - walletAmountUsed);
  const orderRequirementsComplete = Boolean(topic.trim() && discipline && deadline);
  const additionalInformationComplete = Boolean(instructions.trim() || uploadedFiles.length > 0 || specificWriter.trim() || writerFinder || orderStep > 2);

  const disciplineGroups = [
    { label: 'Engineering & Design', matches: /engineering|autocad|cad|catia|bim|architecture|architectural|civil 3d|solidworks|matlab|simulation/i },
    { label: 'Computer Science & IT', matches: /computer|programming|coding|software|cyber|security|data |database|algorithm|bash|shell|c\+\+|c programming|artificial intelligence|machine learning|robotics/i },
    { label: 'Accounting & Finance', matches: /account|finance|economics|econometrics|actuarial|business analytics/i },
    { label: 'Business & Management', matches: /business|management|marketing|consumer behavior|communications|corporate|entrepreneur|human resource|mba/i },
    { label: 'Mathematics & Sciences', matches: /math|calculus|physics|chemistry|biology|biochemistry|biomedical|astronomy|astrophysics|earth science|ecology|statistics|biostatistics|agriculture/i },
    { label: 'Law & Criminal Justice', matches: /law|legal|criminal|criminology|justice|constitutional/i },
    { label: 'Health & Nursing', matches: /nurs|medical|medicine|dentistry|anatomy|psychology|counseling|clinical|health|neuroscience/i },
    { label: 'Arts & Humanities', matches: /literature|history|anthropology|archaeology|art |biblical|classics|cultural|drama|education|linguistics|philosophy|religion|social science/i }
  ];

  const getDisciplineGroup = (value: string) => disciplineGroups.find((group) => group.matches.test(value))?.label || 'Other subjects';
  const groupedDisciplines = [...SERVICE_MENU_ITEMS.map((service) => service.label), ...ALL_SUBJECTS].reduce<Record<string, string[]>>((groups, value) => {
    const group = getDisciplineGroup(value);
    groups[group] = groups[group] || [];
    if (!groups[group].includes(value)) groups[group].push(value);
    return groups;
  }, {});

  const editionLabels: Record<string, [string, string]> = {
    APA: ['APA 6th edition', 'APA 7th edition'],
    MLA: ['MLA 8th edition', 'MLA 9th edition'],
    Harvard: ['Cite Them Right 11th edition', 'Cite Them Right 12th edition'],
    Chicago: ['Chicago 16th edition', 'Chicago 17th edition'],
    IEEE: ['IEEE Editorial Style Manual', 'IEEE Reference Guide'],
    None: ['Not required', 'No citation style']
  };
  const [firstEdition, secondEdition] = editionLabels[citationFormat] || ['Edition 1', 'Edition 2'];

  useEffect(() => {
    setApaEdition(firstEdition);
  }, [citationFormat, firstEdition]);

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, 'studentProfiles', user.uid)).then((snapshot) => {
      setWalletBalance(snapshot.exists() ? snapshot.data().balance || 0 : 0);
    }).catch(() => setWalletBalance(0));
  }, [user]);

  const addFiles = (files: FileList | File[]) => {
    setUploadedFiles((current) => [...current, ...Array.from(files).filter((file) => file.size <= 50 * 1024 * 1024)]);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };

  const saveOrderDraft = () => {
    localStorage.setItem('boffinOrderDraft', JSON.stringify({
      topic,
      paperType,
      discipline,
      pages,
      deadline,
      instructions,
      uploadedFiles: uploadedFiles.map((file) => ({ name: file.name, size: file.size, type: file.type })),
      citationFormat,
      edition: apaEdition,
      serviceType,
      specificWriter,
      writerFinder,
      savedAt: new Date().toISOString()
    }));
  };

  const continueOrder = () => {
    if (orderStep === 1 && !orderRequirementsComplete) {
      setOrderError('Please add a topic, choose a discipline, and select a deadline before continuing.');
      return;
    }
    if (orderStep === 2 && !selectedWriterId && !writerFinder) {
      setOrderError('Choose an expert or select Writer Finder before continuing.');
      return;
    }
    setOrderError('');
    saveOrderDraft();
    setOrderStep(Math.min(4, orderStep + 1));
  };

  const completePayment = async (paymentId: string) => {
    if (!user) return;
    const referralCode = localStorage.getItem('boffinReferralCode') || '';
    const referrerId = userIdFromReferralCode(referralCode);
    if (walletAmountUsed > 0) {
      await runTransaction(db, async (transaction) => {
        const profileRef = doc(db, 'studentProfiles', user.uid);
        const profileSnapshot = await transaction.get(profileRef);
        const currentBalance = profileSnapshot.exists() ? profileSnapshot.data().balance || 0 : 0;
        if (currentBalance < walletAmountUsed) throw new Error('Your wallet balance changed. Please try again.');
        transaction.set(profileRef, { balance: currentBalance - walletAmountUsed }, { merge: true });
      });
    }
    const order = await addDoc(collection(db, 'orders'), {
      userId: user.uid,
      email: user.email,
      topic,
      paperType,
      discipline,
      pages,
      deadline,
      instructions,
      citationFormat,
      edition: apaEdition,
      serviceType,
      specificWriter,
      writerFinder,
      selectedWriterId: selectedWriter?.id || null,
      selectedWriterName: selectedWriter?.name || null,
      totalCost: orderTotal,
      paymentId,
      balanceUsed: walletAmountUsed,
      referralCode: referrerId && referrerId !== user.uid ? referralCode : null,
      status: 'paid',
      createdAt: serverTimestamp()
    });
    if (referrerId && referrerId !== user.uid) {
      await addDoc(collection(db, 'referralEvents'), { referrerId, referredUserId: user.uid, orderId: order.id, points: POINTS_PER_REFERRAL, status: 'pending', createdAt: serverTimestamp() });
      localStorage.removeItem('boffinReferralCode');
    }
    setOrderId(order.id);
    setPaymentStatus('paid');
    navigate('/order-placed');
  };

  useEffect(() => {
    if (!user?.email || isVerified) return;
    let cancelled = false;
    const sendCode = async () => {
      setIsSendingCode(true);
      try {
        const response = await fetch('/api/send-email-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email }) });
        if (!response.ok) throw new Error('Unable to send verification code.');
        if (!cancelled) setVerificationMessage(`We sent a 6-digit code to ${user.email}.`);
      } catch (error) {
        if (!cancelled) setVerificationMessage(error instanceof Error ? error.message : 'Unable to send verification code.');
      } finally {
        if (!cancelled) setIsSendingCode(false);
      }
    };
    sendCode();
    return () => { cancelled = true; };
  }, [user?.email, isVerified]);

  const verifyEmail = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user?.email) return;
    setIsSendingCode(true);
    try {
      const response = await fetch('/api/verify-email-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: user.email, code: verificationCode }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Verification failed.');
      if (verificationKey) sessionStorage.setItem(verificationKey, 'true');
      setIsVerified(true);
      setVerificationMessage('Email verified successfully.');
    } catch (error) {
      setVerificationMessage(error instanceof Error ? error.message : 'Verification failed.');
    } finally {
      setIsSendingCode(false);
    }
  };

  return (
    <div className="space-y-6">
      {!isVerified && isWelcomeVisible && <section className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <button type="button" onClick={() => setIsWelcomeVisible(false)} aria-label="Dismiss welcome banner" className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button>
        <div className="grid items-center gap-8 px-6 py-10 lg:grid-cols-[1fr_360px] lg:px-12">
          <div>
            <p className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Welcome to BoffinGlobal</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Welcome, {displayName}!</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">Verify your email before continuing to use your account.</p>
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-extrabold">Verify your email</p>
              <form onSubmit={verifyEmail} className="mt-3 flex max-w-md flex-col gap-2 sm:flex-row">
                <input type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} placeholder="Enter 6-digit code" className="min-w-0 flex-1 rounded-lg border border-amber-300 bg-white px-3 py-2 text-sm font-bold tracking-[0.2em] outline-none focus:border-[#0080d1]" />
                <button type="submit" disabled={isSendingCode} className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0080d1] px-4 py-2 text-sm font-extrabold text-white disabled:opacity-60">{isSendingCode && <LoaderCircle size={16} className="animate-spin" />} Verify email</button>
              </form>
              {verificationMessage && <p className="mt-2 text-xs font-semibold">{verificationMessage}</p>}
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <img src="/next/img/illustration/shark-curious.svg" alt="Welcome to BoffinGlobal" className="max-h-48 w-auto" />
          </div>
        </div>
      </section>}
      {!isVerified && !isWelcomeVisible && <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900">Verify your email to continue. Use the code sent to {user?.email}.</div>}

      <section className={`mx-auto w-full max-w-7xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm ${!isVerified ? 'relative' : ''}`}>
        {!isVerified && <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-[1px] px-6 text-center"><div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"><LockKeyhole className="mx-auto text-[#0080d1]" size={30} /><h2 className="mt-3 text-lg font-extrabold text-slate-900">Verify your email to start an order</h2><p className="mt-2 text-sm text-slate-500">Enter the verification code above before submitting your requirements.</p></div></div>}

        <div className="border-b border-slate-200 bg-[#d9e0ed] px-4 py-3 lg:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">Create new order</h2>
            <div className="grid flex-1 grid-cols-4 gap-1 lg:max-w-[680px] lg:gap-2">
              {[['Submit instructions', 1], ['Select a writer', 2], ['Reserve money', 3], ['Keep track of the progress', 4]].map(([label, number]) => (
                <button key={number} type="button" onClick={() => Number(number) <= orderStep && setOrderStep(Number(number))} className="relative flex items-center gap-1.5 rounded-lg px-1.5 py-1.5 text-left text-[11px] font-semibold text-slate-400 hover:bg-slate-50">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] ${orderStep === number ? 'border-emerald-500 bg-emerald-500 font-bold text-white' : orderStep > Number(number) ? 'border-emerald-500 text-emerald-600' : 'border-slate-300 text-slate-500'}`}>{number}</span>
                  <span className={orderStep === number ? 'text-emerald-700' : ''}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <aside className="flex gap-2 border-b border-slate-200 bg-slate-50 px-3 py-2">
            <button type="button" onClick={() => setOrderStep(1)} className={`flex flex-1 items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs font-bold ${orderStep === 1 ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-white'}`}><span>Requirements &amp; deadline</span>{orderRequirementsComplete && <CheckCircle2 size={15} className="text-emerald-600" />}</button>
            <button type="button" onClick={() => orderStep >= 2 && setOrderStep(2)} className={`flex flex-1 items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs font-bold ${orderStep === 2 ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-600 hover:bg-white'}`}><span>Additional information</span>{additionalInformationComplete && <CheckCircle2 size={15} className="text-emerald-600" />}</button>
          </aside>

          <div className="min-w-0 px-4 py-5 lg:px-8 lg:py-6">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">Order requirements</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {orderStep === 1 && <>
              <label className="block text-sm font-medium text-slate-700">Topic
                <div className="relative mt-2"><input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Tell us your topic" className="w-full border border-slate-200 px-4 py-3 text-base outline-none focus:border-[#0080d1]" /><FileText size={19} className="absolute right-3 top-3.5 text-slate-400" /></div>
              </label>

              <label className="block text-sm font-medium text-slate-700">Type of paper
                <div className="relative mt-2"><Search size={19} className="absolute left-3 top-3.5 text-slate-400" /><select value={paperType} onChange={(event) => setPaperType(event.target.value)} className="w-full appearance-none border border-slate-200 bg-white py-3 pl-10 pr-10 text-base outline-none focus:border-[#0080d1]"><option>Essay (any type)</option><option>Research paper</option><option>Coursework</option><option>Dissertation</option><option>Thesis</option><option>Research proposal</option><option>Literature review</option><option>Case study</option><option>Reflective essay</option><option>Editing and proofreading</option><option>Technical report</option><option>Technical assignment</option><option>Lab report</option><option>Programming or coding project</option><option>Data analysis project</option><option>Engineering project</option><option>CAD or technical drawing</option><option>Architectural drawing</option><option>Presentation or poster</option></select><ChevronDown size={18} className="absolute right-3 top-3.5 text-slate-400" /></div>
              </label>

              <label className="block text-sm font-medium text-slate-700 md:col-span-2">Discipline
                <div className="relative mt-2"><Search size={19} className="pointer-events-none absolute left-3 top-3.5 text-slate-400" /><select value={discipline} onChange={(event) => setDiscipline(event.target.value)} className="w-full appearance-none border border-slate-200 bg-white py-3 pl-10 pr-10 text-base outline-none focus:border-[#0080d1]"><option value="">Select a discipline...</option>{disciplineGroups.map((group) => <optgroup key={group.label} label={group.label}>{(groupedDisciplines[group.label] || []).map((value) => <option key={value} value={value}>{value}</option>)}</optgroup>)}<optgroup label="Other subjects">{(groupedDisciplines['Other subjects'] || []).map((value) => <option key={value} value={value}>{value}</option>)}</optgroup></select><ChevronDown size={18} className="pointer-events-none absolute right-3 top-3.5 text-slate-400" /></div>
              </label>

                <div className="grid min-w-0 gap-4 md:col-span-2 md:grid-cols-2">
                <div className="min-w-0">
                  <label className="text-sm font-medium text-slate-700">Paper size</label>
                  <div className="mt-2 grid grid-cols-[52px_minmax(0,1fr)_52px]">
                    <button type="button" aria-label="Decrease pages" className="flex items-center justify-center border border-slate-200 py-2 text-slate-500 hover:bg-slate-50" onClick={() => setPages(Math.max(1, pages - 1))}><Minus size={16} /></button>
                    <div className="flex min-w-0 items-center justify-center border-y border-slate-200 px-2 py-2 text-center text-sm font-semibold">{pages} Page{pages === 1 ? '' : 's'}</div>
                    <button type="button" aria-label="Increase pages" className="flex items-center justify-center border border-slate-200 py-2 text-slate-500 hover:bg-slate-50" onClick={() => setPages(pages + 1)}><Plus size={16} /></button>
                  </div>
                  <div className="mt-2 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">~ {pages * 275} words</div>
                </div>

                <label className="block min-w-0 text-sm font-medium text-slate-700">Deadline
                  <div className="relative mt-2"><input type="datetime-local" value={deadline} onChange={(event) => setDeadline(event.target.value)} className="block w-full min-w-0 border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" /><CalendarDays size={17} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" /></div>
                </label>
              </div>
              </>}

              {orderStep === 2 && <div className="border-t border-slate-200 pt-8 md:col-span-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-3xl font-normal tracking-tight text-slate-900">Additional information</h4>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">This step is optional</span>
                </div>

                <label className="mt-8 block text-sm font-medium text-slate-700">Paper instructions and files <span className="font-normal italic">(optional)</span>
                  <textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} placeholder="Describe in detail, what you need. Add anything that you think will be useful." className="mt-2 min-h-[150px] w-full resize-y border border-slate-200 px-4 py-3 text-base outline-none focus:border-[#0080d1]" />
                </label>

                <label onDragOver={(event) => event.preventDefault()} onDrop={handleFileDrop} className="mt-6 flex min-h-[82px] cursor-pointer items-center justify-center border-2 border-dashed border-emerald-600 px-4 text-center text-sm text-slate-600 transition hover:bg-emerald-50">
                  <input type="file" multiple className="sr-only" onChange={(event) => event.target.files && addFiles(event.target.files)} />
                  <span className="flex items-center gap-2"><Upload size={20} className="text-emerald-600" /> Drag & Drop or <span className="font-bold text-emerald-700 underline">Browse</span> files to upload</span>
                </label>
                <p className="mt-2 text-xs text-slate-500">Size of file uploaded should not exceed 50 MB.</p>
                {uploadedFiles.length > 0 && <ul className="mt-3 space-y-2">{uploadedFiles.map((file, index) => <li key={`${file.name}-${index}`} className="flex items-center justify-between border border-slate-200 px-3 py-2 text-xs"><span className="flex min-w-0 items-center gap-2 truncate"><Paperclip size={14} className="shrink-0 text-[#0080d1]" />{file.name}</span><button type="button" onClick={() => setUploadedFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Remove ${file.name}`} className="text-slate-400 hover:text-red-600"><Trash2 size={15} /></button></li>)}</ul>}

                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <label className="block text-sm font-medium text-slate-700">Format or citation
                    <div className="relative mt-2"><select value={citationFormat} onChange={(event) => setCitationFormat(event.target.value)} className="w-full appearance-none border border-slate-200 bg-white px-4 py-3 text-base outline-none focus:border-[#0080d1]"><option>APA</option><option>MLA</option><option>Harvard</option><option>Chicago</option><option>IEEE</option><option>None</option></select><ChevronDown size={18} className="pointer-events-none absolute right-3 top-3.5 text-slate-400" /></div>
                  </label>

                  <div>
                    <span className="block text-sm font-medium text-slate-700">Specify edition</span>
                    <div className="mt-2 grid grid-cols-2"><button type="button" onClick={() => setApaEdition(firstEdition)} className={`border px-4 py-3 text-sm font-semibold ${apaEdition === firstEdition ? 'border-[#0080d1] bg-slate-50 text-[#0080d1]' : 'border-slate-200 text-slate-600'}`}>{firstEdition}</button><button type="button" onClick={() => setApaEdition(secondEdition)} className={`border px-4 py-3 text-sm font-semibold ${apaEdition === secondEdition ? 'border-[#0080d1] bg-slate-50 text-[#0080d1]' : 'border-slate-200 text-slate-600'}`}>{secondEdition}</button></div>
                  </div>
                </div>

                <div className="mt-7">
                  <span className="block text-sm font-medium text-slate-700">Type of service</span>
                  <div className="mt-2 grid grid-cols-2"><button type="button" onClick={() => setServiceType('Sample writing')} className={`border px-4 py-3 text-sm font-semibold ${serviceType === 'Sample writing' ? 'border-[#0080d1] bg-slate-50 text-[#0080d1]' : 'border-slate-200 text-slate-600'}`}>Sample writing</button><button type="button" onClick={() => setServiceType('Editing or rewriting')} className={`border px-4 py-3 text-sm font-semibold ${serviceType === 'Editing or rewriting' ? 'border-[#0080d1] bg-slate-50 text-[#0080d1]' : 'border-slate-200 text-slate-600'}`}>Editing or rewriting</button></div>
                  <p className="mt-3 bg-slate-50 px-4 py-3 text-sm text-slate-600">All created samples are provided for educational purposes only.</p>
                </div>

                <label className="mt-7 block text-sm font-medium text-slate-700">Request a specific writer
                  <div className="relative mt-2"><Search size={19} className="absolute left-3 top-3.5 text-slate-400" /><input value={specificWriter} onChange={(event) => setSpecificWriter(event.target.value)} placeholder="Enter writer's pen name..." className="w-full border border-slate-200 py-3 pl-10 pr-4 text-base outline-none focus:border-[#0080d1]" /></div>
                </label>

                <div className="mt-8 border-t border-slate-200 pt-7">
                  <span className="block text-sm font-medium text-slate-700">Additional features</span>
                  <label className="mt-2 block cursor-pointer border border-slate-200 bg-slate-50 p-5"><span className="flex items-start gap-3"><input type="checkbox" checked={writerFinder} onChange={(event) => setWriterFinder(event.target.checked)} className="mt-1 h-5 w-5 accent-[#0080d1]" /><span><span className="block text-lg font-bold text-slate-900">Writer Finder</span><span className="text-sm text-slate-600">Auto-select best matching writer in <em>English</em>.</span></span></span><span className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-2"><span><strong className="block text-slate-800">Hassle-free</strong>Skip the step of selecting a writer</span><span><strong className="block text-slate-800">Risk-free</strong>Get 100% matching writer in discipline</span></span></label>
                </div>

                <div className="mt-8 border-t border-slate-200 pt-7">
                  <h4 className="text-2xl font-normal tracking-tight text-slate-900">Select a writer</h4>
                  <p className="mt-2 text-sm text-slate-500">Choose a specialist or let Writer Finder match the best available expert.</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {writersData.slice(0, 6).map((writer) => (
                      <button type="button" key={writer.id} onClick={() => setSelectedWriterId(writer.id)} className={`flex items-center gap-3 border p-3 text-left transition ${selectedWriterId === writer.id ? 'border-[#0080d1] bg-sky-50 ring-1 ring-[#0080d1]' : 'border-slate-200 hover:border-[#0080d1]'}`}>
                        <img src={writer.avatar} alt={writer.name} className="h-12 w-12 rounded-full object-cover" />
                        <span className="min-w-0"><strong className="block truncate text-sm text-slate-900">{writer.name}</strong><span className="block truncate text-xs text-slate-500">{writer.discipline}</span><span className="mt-1 flex items-center gap-1 text-xs font-bold text-amber-600"><Star size={12} fill="currentColor" /> {writer.rating}/10</span></span>
                      </button>
                    ))}
                  </div>
                  {selectedWriter && <p className="mt-4 text-sm font-bold text-emerald-700">Selected expert: {selectedWriter.name}</p>}
                </div>
              </div>}

              {orderStep === 3 && <div className="border-t border-slate-200 pt-8 md:col-span-2">
                <div className="flex items-center gap-3"><ShieldCheck className="text-emerald-600" size={28} /><div><h4 className="text-2xl font-normal tracking-tight text-slate-900">Reserve money</h4><p className="mt-1 text-sm text-slate-500">Your payment is held securely until the order is accepted.</p><span className="mt-2 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">Secure checkout powered by Stripe Elements</span></div></div>
                {!showStripeCheckout ? <div className="mt-6 grid gap-0 overflow-hidden border border-slate-200 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                  <div className="border-b border-slate-200 bg-white p-6 lg:border-b-0 lg:border-r lg:p-8">
                    <h5 className="text-2xl font-normal tracking-tight text-slate-900">Total</h5>
                    <dl className="mt-7 space-y-5 text-sm">
                      <div><dt className="font-semibold text-slate-700">Topic</dt><dd className="mt-1 break-words text-slate-500">{topic || 'Not specified'}</dd></div>
                      <div><dt className="font-semibold text-slate-700">Discipline</dt><dd className="mt-1 text-slate-500">{discipline || 'Not specified'}</dd></div>
                      <div><dt className="font-semibold text-slate-700">Paper type</dt><dd className="mt-1 text-slate-500">{paperType}</dd></div>
                      <div><dt className="font-semibold text-slate-700">Pages</dt><dd className="mt-1 text-slate-500">{pages} page{pages === 1 ? '' : 's'} / {pages * 275} words</dd></div>
                      <div><dt className="font-semibold text-slate-700">Deadline</dt><dd className="mt-1 text-slate-500">{deadline || 'Not specified'}</dd></div>
                    </dl>
                  </div>
                  <div className="bg-white p-6 lg:p-8">
                    <div className="flex items-center justify-between gap-4"><h5 className="text-2xl font-normal tracking-tight text-slate-900">Payment summary</h5><span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">Stripe</span></div>
                    <div className="mt-6 flex items-center justify-between bg-slate-50 px-4 py-4"><span className="font-semibold text-slate-700">Amount due</span><span className="text-2xl font-black text-slate-900">${amountDue.toFixed(2)}</span></div>
                    {walletBalance > 0 && <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"><input type="checkbox" checked={useWalletBalance} onChange={(event) => setUseWalletBalance(event.target.checked)} className="h-4 w-4 accent-[#0080d1]" /> Use wallet balance (${walletBalance.toFixed(2)} available)</label>}
                    <div className="mt-6 border-b border-slate-200 pb-6"><p className="font-semibold text-slate-700">Your payment splits in 2 parts</p><div className="mt-3 grid grid-cols-2 overflow-hidden border border-slate-200 text-center text-sm"><div className="bg-slate-50 px-3 py-4"><span className="block text-slate-500">Part 1</span><strong className="mt-1 block text-slate-900">${(orderTotal / 2).toFixed(2)}</strong></div><div className="px-3 py-4"><span className="block text-slate-500">Part 2</span><strong className="mt-1 block text-slate-900">${(orderTotal / 2).toFixed(2)}</strong></div></div></div>
                    <div className="mt-6"><p className="font-semibold text-slate-700">Payment method</p><div className="mt-3 flex items-center gap-3 border border-emerald-300 bg-emerald-50/40 px-4 py-3 text-sm font-semibold text-slate-700"><span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-600"><span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /></span>Credit / Debit card</div><div className="mt-4 flex flex-wrap items-center gap-2" aria-label="Accepted payment cards"><span className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-black italic text-[#1434CB] shadow-sm">VISA</span><span className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-black text-[#EB001B] shadow-sm">Mastercard</span><span className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-black italic text-[#006FCF] shadow-sm">AMEX</span><span className="rounded border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-black text-[#F58220] shadow-sm">Discover</span></div></div>
                    {!showStripeCheckout && paymentStatus !== 'paid' && <button type="button" onClick={() => { saveOrderDraft(); if (amountDue === 0) { completePayment('balance'); } else { setShowStripeCheckout(true); } }} className="mt-7 inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700">{amountDue === 0 ? 'Place order using balance' : 'Continue to payment'} <span className="ml-2">-&gt;</span></button>}
                    {paymentStatus === 'paid' && <div className="mt-7 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800"><CheckCircle2 size={18} /> Payment reserved successfully.</div>}
                  </div>
                </div> : <div className="mt-6 border border-slate-200 bg-white p-6 lg:p-8"><div className="flex items-center justify-between gap-4"><h5 className="text-2xl font-normal tracking-tight text-slate-900">Card payment</h5><span className="text-sm font-semibold text-slate-500">${amountDue.toFixed(2)}</span></div><div className="mt-6"><ErrorBoundary fallbackMessage="Card payment could not be loaded. Please try again."><StripeCheckoutForm compact amount={amountDue} email={user?.email || ''} fullName={displayName} onPaymentSuccess={completePayment} isSubmittingOrder={false} /></ErrorBoundary></div><button type="button" onClick={() => setShowStripeCheckout(false)} className="mt-4 text-sm font-semibold text-slate-500 hover:text-slate-800">Back to payment summary</button></div>}
              </div>}

              {orderStep === 4 && <div className="border-t border-slate-200 pt-8 md:col-span-2"><div className="border border-emerald-200 bg-emerald-50 p-6"><h4 className="text-2xl font-black text-emerald-900">Keep track of the progress</h4><p className="mt-2 text-sm text-emerald-800">Your order is ready for the next stage. You can follow messages, files, and delivery updates from All orders.</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-emerald-200 bg-white p-3 text-sm"><strong className="block">Requirements</strong><span className="text-emerald-700">Complete</span></div><div className="border border-emerald-200 bg-white p-3 text-sm"><strong className="block">Expert</strong><span className="text-emerald-700">{selectedWriter?.name || 'Finder matching'}</span></div><div className="border border-emerald-200 bg-white p-3 text-sm"><strong className="block">Payment</strong><span className="text-emerald-700">{paymentStatus === 'paid' ? 'Reserved' : 'Pending'}</span></div></div>{orderId && <p className="mt-5 text-xs font-bold text-emerald-800">Order reference: {orderId}</p>}</div></div>}

              {orderStep < 3 && <button type="button" onClick={continueOrder} className="rounded-full bg-[#0080d1] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#004695] md:col-span-2">{orderStep === 1 ? 'Continue to additional information' : 'Continue to reserve money'}</button>}
              {orderStep === 3 && paymentStatus !== 'paid' && <p className="text-sm font-semibold text-slate-500 md:col-span-2">Complete the secure payment above to continue to order tracking.</p>}
              {orderStep === 4 && <Link to="/portal/assignments" className="inline-flex w-fit rounded-full bg-[#0080d1] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#004695]">View all orders</Link>}
              {orderError && <p className="text-sm font-semibold text-red-600 md:col-span-2" role="alert">{orderError}</p>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

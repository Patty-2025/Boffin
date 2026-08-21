import React, { useEffect, useState } from 'react';
import { Award, CalendarDays, CheckCircle2, ChevronDown, FileText, Headphones, LoaderCircle, LockKeyhole, Minus, Paperclip, Plus, Search, ShieldCheck, Star, Trash2, Upload, User, Wallet, X } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, getDocs, query, runTransaction, serverTimestamp, setDoc, where } from '../lib/realtimeFirestore';
import { useAuth } from '../context/AuthContext';
import { ALL_SUBJECTS } from '../constants/subjects';
import { SERVICE_MENU_ITEMS } from '../constants/serviceMenu';
import writersData from '../data/topWriters.json';
import StripeCheckoutForm from '../components/StripeCheckoutForm';
import ErrorBoundary from '../components/ErrorBoundary';
import { db } from '../lib/firebase';
import { fetchLoyaltySettings, userIdFromReferralCode } from '../lib/loyalty';
import GoogleDrivePicker from '../components/GoogleDrivePicker';

type SelectedDriveItem = { id: string; name: string; mimeType: string; url: string };

export default function PlaceOrder() {
  const { user } = useAuth();
    const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
  const [paperTypeSearch, setPaperTypeSearch] = useState('Essay (any type)');
  const [showPaperTypeSuggestions, setShowPaperTypeSuggestions] = useState(false);
  const [discipline, setDiscipline] = useState('');
  const [disciplineSearch, setDisciplineSearch] = useState('');
  const [showDisciplineSuggestions, setShowDisciplineSuggestions] = useState(false);
  const [pages, setPages] = useState(2);
  const [deadline, setDeadline] = useState('');
  const [instructions, setInstructions] = useState('');
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [googleDriveLink, setGoogleDriveLink] = useState('');
  const [googleDriveItems, setGoogleDriveItems] = useState<SelectedDriveItem[]>([]);
  const [citationFormat, setCitationFormat] = useState('APA');
  const [apaEdition, setApaEdition] = useState('APA 7th edition');
  const [serviceType, setServiceType] = useState('Sample writing');
  const [specificWriter, setSpecificWriter] = useState('');
  const [writerFinder, setWriterFinder] = useState(false);
  const [selectedWriterId, setSelectedWriterId] = useState<number | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'paid'>('unpaid');
  const [orderId, setOrderId] = useState<string | null>(null);
  const [draftOrderId, setDraftOrderId] = useState<string | null>(null);
  const [draftLookupReady, setDraftLookupReady] = useState(false);
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [useWalletBalance, setUseWalletBalance] = useState(false);
  const selectedWriter = writersData.find((writer) => writer.id === selectedWriterId);
  const orderTotal = Math.max(15, pages * 15);
  const walletAmountUsed = useWalletBalance ? Math.min(walletBalance, orderTotal) : 0;
  const amountDue = Math.max(0, orderTotal - walletAmountUsed);
  const orderRequirementsComplete = Boolean(topic.trim() && discipline && deadline);
  const additionalInformationComplete = Boolean(instructions.trim() || uploadedFiles.length > 0 || specificWriter.trim() || writerFinder || orderStep > 2);
  const formatDeadline = (value: string) => {
    if (!value) return 'Not specified';
    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) return value;
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(parsedDate);
  };

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
  const disciplineOptions = Object.values(groupedDisciplines).flat().filter((value, index, values) => values.indexOf(value) === index);
  const matchingDisciplines = disciplineOptions.filter((value) => value.toLowerCase().includes(disciplineSearch.trim().toLowerCase())).slice(0, 12);
  const paperTypeOptions = ['Essay (any type)', 'Research paper', 'Coursework', 'Dissertation', 'Thesis', 'Research proposal', 'Literature review', 'Case study', 'Reflective essay', 'Editing and proofreading', 'Technical report', 'Technical assignment', 'Lab report', 'Programming or coding project', 'Data analysis project', 'Engineering project', 'CAD or technical drawing', 'Architectural drawing', 'Presentation or poster'];
  const matchingPaperTypes = paperTypeOptions.filter((value) => value.toLowerCase().includes(paperTypeSearch.trim().toLowerCase())).slice(0, 12);

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

  useEffect(() => {
    if (!user) {
      setDraftLookupReady(false);
      return;
    }

    setDraftLookupReady(false);
    getDocs(query(collection(db, 'orders'), where('userId', '==', user.uid))).then((snapshot) => {
      const existingDraft = snapshot.docs
        .map((document: any) => ({ id: document.id, ...document.data() }))
        .find((order: any) => order.status === 'pending' && order.isDraft === true);
      if (existingDraft) {
        setDraftOrderId(existingDraft.id);
        localStorage.setItem('boffinDraftOrderId', existingDraft.id);
      } else {
        localStorage.removeItem('boffinDraftOrderId');
        localStorage.removeItem('boffinOrderDraft');
      }
    }).catch((error) => {
      console.error('Error checking for an existing pending order:', error);
    }).finally(() => setDraftLookupReady(true));
  }, [user]);

  const addFiles = (files: FileList | File[]) => {
    setUploadedFiles((current) => [...current, ...Array.from(files).filter((file) => file.size <= 50 * 1024 * 1024)]);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  };

  const handleDriveSelection = (items: SelectedDriveItem[]) => {
    setGoogleDriveItems(items);
    setGoogleDriveLink(items.map((item) => item.url).join(', '));
    setOrderError('');
  };

  const draftHasStarted = Boolean(topic.trim() || discipline || deadline || instructions.trim() || uploadedFiles.length || googleDriveLink.trim() || specificWriter.trim() || writerFinder);

  const saveOrderDraft = async () => {
    if (isSavingDraft) return;
    setIsSavingDraft(true);
    try {
      const localDraft = {
        topic,
        paperType,
        discipline,
        pages,
        deadline,
        instructions,
        uploadedFiles: uploadedFiles.map((file) => ({ name: file.name, size: file.size, type: file.type })),
        googleDriveLink,
        googleDriveItems,
        citationFormat,
        edition: apaEdition,
        serviceType,
        specificWriter,
        writerFinder,
        selectedWriterId: selectedWriterId || null,
        orderStep,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('boffinOrderDraft', JSON.stringify(localDraft));
      if (!user || !isVerified || !draftHasStarted || paymentStatus === 'paid' || !draftLookupReady) return;

      const draftRef = draftOrderId ? doc(db, 'orders', draftOrderId) : doc(collection(db, 'orders'));
      await setDoc(draftRef, {
        userId: user.uid,
        email: user.email || '',
        fullName: user.displayName || displayName,
        taskType: paperType,
        topic,
        paperType,
        discipline,
        pages,
        deadline,
        instructions,
        uploadedFiles: uploadedFiles.map((file) => ({ name: file.name, size: file.size, type: file.type })),
        googleDriveLink,
        googleDriveItems,
        citationFormat,
        edition: apaEdition,
        serviceType,
        specificWriter,
        writerFinder,
        selectedWriterId: selectedWriter?.id || null,
        selectedWriterName: selectedWriter?.name || null,
        totalCost: orderTotal,
        checkoutStep: orderStep,
        paymentStatus: 'pending',
        status: 'pending',
        isDraft: true,
        updatedAt: serverTimestamp(),
        ...(draftOrderId ? {} : { createdAt: serverTimestamp() })
      }, { merge: true });
      if (!draftOrderId) setDraftOrderId(draftRef.id);
      localStorage.setItem('boffinDraftOrderId', draftRef.id);
    } finally {
      setIsSavingDraft(false);
    }
  };

  // Restore draft from localStorage on mount
  useEffect(() => {
    if (!user) return;
    if (!draftLookupReady) return;
    const savedDraft = localStorage.getItem('boffinOrderDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTopic(draft.topic || '');
        setPaperType(draft.paperType || 'Essay (any type)');
        setPaperTypeSearch(draft.paperType || 'Essay (any type)');
        setDiscipline(draft.discipline || '');
        setDisciplineSearch(draft.discipline || '');
        setPages(draft.pages || 2);
        setDeadline(draft.deadline || '');
        setInstructions(draft.instructions || '');
        setGoogleDriveLink(draft.googleDriveLink || '');
        setGoogleDriveItems(draft.googleDriveItems || []);
        setCitationFormat(draft.citationFormat || 'APA');
        setApaEdition(draft.edition || 'APA 7th edition');
        setServiceType(draft.serviceType || 'Sample writing');
        setSpecificWriter(draft.specificWriter || '');
        setWriterFinder(Boolean(draft.writerFinder));
        setSelectedWriterId(draft.selectedWriterId || null);
        setOrderStep(draft.orderStep === 2 ? 3 : draft.orderStep || 1);
      } catch (e) {
        console.error('Error parsing saved draft:', e);
      }
    }
  }, [user, draftLookupReady]);

  // Resume order from URL parameter
  useEffect(() => {
    const resumeOrderId = searchParams.get('resumeOrder');
    if (!user || !resumeOrderId) return;
    getDoc(doc(db, 'orders', resumeOrderId)).then((snapshot) => {
      if (!snapshot.exists() || snapshot.data().userId !== user.uid || snapshot.data().status !== 'pending') return;
      const saved = snapshot.data();
      setDraftOrderId(snapshot.id);
      setTopic(saved.topic || '');
      setPaperType(saved.paperType || saved.taskType || 'Essay (any type)');
      setPaperTypeSearch(saved.paperType || saved.taskType || 'Essay (any type)');
      setDiscipline(saved.discipline || '');
      setDisciplineSearch(saved.discipline || '');
      setPages(saved.pages || 2);
      setDeadline(saved.deadline || '');
      setInstructions(saved.instructions || '');
      setCitationFormat(saved.citationFormat || 'APA');
      setApaEdition(saved.edition || 'APA 7th edition');
      setServiceType(saved.serviceType || 'Sample writing');
      setSpecificWriter(saved.specificWriter || '');
      setWriterFinder(Boolean(saved.writerFinder));
      setSelectedWriterId(saved.selectedWriterId || null);
      setOrderStep(saved.checkoutStep === 2 ? 3 : saved.checkoutStep || 1);
    }).catch((error) => console.error('Error resuming order draft:', error));
  }, [user, searchParams]);

  const continueOrder = async () => {
    if (isSavingDraft) return;
    if (orderStep === 1 && !orderRequirementsComplete) {
      setOrderError('Please add a topic, choose a discipline, and select a deadline before continuing.');
      return;
    }
    setOrderError('');
    await saveOrderDraft();
    setOrderStep(orderStep === 1 ? 3 : Math.min(4, orderStep + 1));
  };

  const completePayment = async (paymentId: string) => {
    if (!user || isSubmittingPayment || paymentStatus === 'paid') return;
    setIsSubmittingPayment(true);
    try {
      const referralCode = localStorage.getItem('boffinReferralCode') || '';
      const referrerId = userIdFromReferralCode(referralCode);
      const loyaltySettings = await fetchLoyaltySettings();
      if (walletAmountUsed > 0) {
        await runTransaction(db, async (transaction) => {
          const profileRef = doc(db, 'studentProfiles', user.uid);
          const profileSnapshot = await transaction.get(profileRef);
          const currentBalance = profileSnapshot.exists() ? profileSnapshot.data().balance || 0 : 0;
          if (currentBalance < walletAmountUsed) throw new Error('Your wallet balance changed. Please try again.');
          transaction.set(profileRef, { balance: currentBalance - walletAmountUsed }, { merge: true });
        });
      }
      const orderRef = draftOrderId ? doc(db, 'orders', draftOrderId) : doc(collection(db, 'orders'));
      await setDoc(orderRef, {
        userId: user.uid,
        email: user.email,
        fullName: user.displayName || displayName,
        taskType: paperType,
        topic,
        paperType,
        discipline,
        pages,
        deadline,
        instructions,
        uploadedFiles: uploadedFiles.map((file) => ({ name: file.name, size: file.size, type: file.type })),
        googleDriveLink,
        googleDriveItems,
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
        status: 'in_progress',
        paymentStatus: 'paid',
        paidAt: new Date().toISOString(),
        isDraft: false,
        updatedAt: serverTimestamp(),
        ...(draftOrderId ? {} : { createdAt: serverTimestamp() })
      }, { merge: true });
      if (referrerId && referrerId !== user.uid) {
        await addDoc(collection(db, 'referralEvents'), { referrerId, referredUserId: user.uid, orderId: orderRef.id, points: loyaltySettings.pointsPerReferral, status: 'pending', createdAt: serverTimestamp() });
        localStorage.removeItem('boffinReferralCode');
      }
      const orderLabel = `Order #${orderRef.id.slice(-8).toUpperCase()}`;
      await addDoc(collection(db, `notifications/${user.uid}`), {
        title: 'Order placed successfully',
        description: `${orderLabel} has been received. Follow its progress in Track your order. A support agent has been notified and will join the live chat shortly.`,
        orderId: orderRef.id,
        type: 'order_placed',
        createdAt: Date.now(),
        read: false
      });
      const chatRef = await addDoc(collection(db, 'chats'), {
        userId: user.uid,
        orderId: orderRef.id,
        status: 'active',
        agentStatus: 'waiting',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      await addDoc(collection(db, `chats/${chatRef.id}/messages`), {
        chatId: chatRef.id,
        orderId: orderRef.id,
        senderId: 'system',
        senderRole: 'system',
        content: `Your ${orderLabel} has been placed successfully. A support agent has been notified and will join this chat shortly.`,
        createdAt: new Date().toISOString()
      });
      localStorage.removeItem('boffinOrderDraft');
      setOrderId(orderRef.id);
      setPaymentStatus('paid');
      navigate(`/portal/track?orderId=${encodeURIComponent(orderRef.id)}&chat=open`);
    } catch (error) {
      console.error('Error completing payment:', error);
      setOrderError(error instanceof Error ? error.message : 'Payment failed. Please try again.');
    } finally {
      setIsSubmittingPayment(false);
    }
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
    <div className="-mb-8 space-y-6">
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

      <section className={`mx-auto mt-2 w-full max-w-7xl bg-transparent ${!isVerified ? 'relative' : ''}`}>
        {!isVerified && <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/75 backdrop-blur-[1px] px-6 text-center"><div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"><LockKeyhole className="mx-auto text-[#0080d1]" size={30} /><h2 className="mt-3 text-lg font-extrabold text-slate-900">Verify your email to start an order</h2><p className="mt-2 text-sm text-slate-500">Enter the verification code above before submitting your requirements.</p></div></div>}

        <div className="border border-slate-200 bg-white px-5 py-4 shadow-sm lg:px-6">
          <h2 className="text-xl font-black tracking-tight text-slate-900">Create new order</h2>
          <p className="mt-1 text-sm text-slate-600">Share your requirements and set up your order in a few simple steps.</p>
        </div>

        <div className="mt-2 bg-transparent">
          <div className="bg-transparent">
            <div className="grid grid-cols-3 gap-1 border-b border-slate-200 px-3 py-2 lg:gap-2 lg:px-6">
              {[['Submit instructions', 1], ['Reserve money', 3], ['Keep track of the progress', 4]].map(([label, number]) => (
                <button key={number} type="button" onClick={() => Number(number) <= orderStep && setOrderStep(Number(number))} className="relative flex items-center gap-1.5 px-1.5 py-1.5 text-left text-[11px] font-semibold text-slate-400 hover:bg-slate-50">
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] ${orderStep === number ? 'border-emerald-500 bg-emerald-500 font-bold text-white' : orderStep > Number(number) ? 'border-emerald-500 text-emerald-600' : 'border-slate-300 text-slate-500'}`}>{number}</span>
                  <span className={orderStep === number ? 'text-emerald-700' : ''}>{label}</span>
                </button>
              ))}
            </div>

          <div className={`min-w-0 px-4 ${orderStep === 3 ? 'pb-6 lg:px-8' : 'py-5 lg:px-8 lg:py-6'}`}>
            <div className={`${orderStep === 3 ? 'mt-0 gap-0' : 'mt-2 gap-6'} grid md:grid-cols-2`}>
              <div className="min-w-0">
              <div className="grid gap-x-5 gap-y-3 md:grid-cols-2">
              {orderStep === 1 && <>
                <div className="grid gap-3 md:col-span-2 md:max-w-[560px] md:grid-cols-2 md:gap-4">
              <label className="block text-xs font-semibold text-slate-700">Topic
                <div className="relative mt-1"><input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Tell us your topic" className="w-full border border-slate-200 px-3 py-2 text-xs font-medium outline-none focus:border-[#0080d1]" /><FileText size={16} className="absolute right-3 top-2.5 text-slate-400" /></div>
              </label>

              <label className="block text-xs font-semibold text-slate-700">Type of paper
                <div className="relative mt-1"><Search size={16} className="pointer-events-none absolute left-3 top-2 text-slate-400" /><input value={paperTypeSearch} onFocus={() => setShowPaperTypeSuggestions(true)} onChange={(event) => { setPaperTypeSearch(event.target.value); setPaperType(event.target.value); setShowPaperTypeSuggestions(true); }} onBlur={() => setTimeout(() => setShowPaperTypeSuggestions(false), 150)} placeholder="Search or enter paper type" className="w-full border border-slate-200 bg-white px-3 py-1.5 pl-9 text-xs font-medium outline-none focus:border-[#0080d1]" />{showPaperTypeSuggestions && paperTypeSearch.trim() && <div className="absolute left-0 right-0 top-full z-30 max-h-64 overflow-y-auto border border-slate-200 bg-white shadow-lg">{matchingPaperTypes.map((value) => <button type="button" key={value} onMouseDown={() => { setPaperType(value); setPaperTypeSearch(value); setShowPaperTypeSuggestions(false); }} className="block w-full border-b border-slate-100 px-4 py-2 text-left text-sm hover:bg-slate-50">{value}</button>)}{matchingPaperTypes.length === 0 && <p className="px-4 py-3 text-sm text-slate-500">No matching paper type. Your entry will be used.</p>}</div>}</div>
              </label>
              </div>

              <label className="block text-xs font-semibold text-slate-700 md:col-span-2 md:max-w-[560px]">Discipline
                <div className="relative mt-1"><Search size={16} className="pointer-events-none absolute left-3 top-2 text-slate-400" /><input value={disciplineSearch} onFocus={() => setShowDisciplineSuggestions(true)} onChange={(event) => { setDisciplineSearch(event.target.value); setDiscipline(event.target.value); setShowDisciplineSuggestions(true); }} onBlur={() => setTimeout(() => setShowDisciplineSuggestions(false), 150)} placeholder="Search or enter your discipline" className="w-full border border-slate-200 bg-white px-3 py-1.5 pl-9 text-xs font-medium outline-none focus:border-[#0080d1]" />{showDisciplineSuggestions && disciplineSearch.trim() && <div className="absolute left-0 right-0 top-full z-30 max-h-64 overflow-y-auto border border-slate-200 bg-white shadow-lg">{matchingDisciplines.map((value) => <button type="button" key={value} onMouseDown={() => { setDiscipline(value); setDisciplineSearch(value); setShowDisciplineSuggestions(false); }} className="block w-full border-b border-slate-100 px-4 py-2 text-left text-sm hover:bg-slate-50">{value}</button>)}{matchingDisciplines.length === 0 && <p className="px-4 py-3 text-sm text-slate-500">No matching discipline. Your entry will be used.</p>}</div>}</div>
              </label>

                <div className="grid gap-4 md:col-span-2 md:max-w-[560px] md:grid-cols-2">
                <label className="block text-xs font-semibold text-slate-700">Format or citation
                  <div className="relative mt-1"><select value={citationFormat} onChange={(event) => setCitationFormat(event.target.value)} className="w-full appearance-none border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0080d1]"><option>APA</option><option>MLA</option><option>Harvard</option><option>Chicago</option><option>IEEE</option><option>None</option></select><ChevronDown size={16} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" /></div>
                </label>
                <div>
                  <span className="block text-xs font-semibold text-slate-700">Specify edition</span>
                  <div className="mt-1 grid grid-cols-2"><button type="button" onClick={() => setApaEdition(firstEdition)} className={`border px-3 py-2 text-xs font-semibold ${apaEdition === firstEdition ? 'border-[#0080d1] bg-slate-50 text-[#0080d1]' : 'border-slate-200 text-slate-600'}`}>{firstEdition}</button><button type="button" onClick={() => setApaEdition(secondEdition)} className={`border px-3 py-2 text-xs font-semibold ${apaEdition === secondEdition ? 'border-[#0080d1] bg-slate-50 text-[#0080d1]' : 'border-slate-200 text-slate-600'}`}>{secondEdition}</button></div>
                </div>
              </div>

                <div className="grid min-w-0 gap-3 md:col-span-2 md:max-w-[560px] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-4">
                <div className="w-full min-w-0">
                  <label className="block text-xs font-semibold text-slate-700">Paper size</label>
                  <div className="mt-1 grid grid-cols-[40px_minmax(0,1fr)_40px]">
                    <button type="button" aria-label="Decrease pages" className="flex items-center justify-center border border-slate-200 py-1.5 text-slate-500 hover:bg-slate-50" onClick={() => setPages(Math.max(1, pages - 1))}><Minus size={14} /></button>
                    <div className="flex min-w-0 items-center justify-center border-y border-slate-200 px-2 py-1.5 text-center text-xs font-medium">{pages} Page{pages === 1 ? '' : 's'}</div>
                    <button type="button" aria-label="Increase pages" className="flex items-center justify-center border border-slate-200 py-1.5 text-slate-500 hover:bg-slate-50" onClick={() => setPages(pages + 1)}><Plus size={14} /></button>
                  </div>
                </div>

                <label className="block w-full min-w-0 text-xs font-semibold text-slate-700">Deadline
                  <div className="relative mt-1"><input type="datetime-local" value={deadline} onChange={(event) => setDeadline(event.target.value)} className="block w-full min-w-0 border border-slate-200 px-3 py-2 text-xs font-medium outline-none focus:border-[#0080d1]" /><CalendarDays size={16} className="pointer-events-none absolute right-3 top-2.5 text-slate-400" /></div>
                </label>
              </div>
              <label onDragOver={(event) => event.preventDefault()} onDrop={handleFileDrop} className="mt-6 flex min-h-[88px] w-full cursor-pointer items-center justify-center border-2 border-dashed border-emerald-600 px-4 text-center text-xs text-slate-600 transition hover:bg-emerald-50 md:col-span-2 md:max-w-none">
                <input type="file" multiple className="sr-only" onChange={(event) => event.target.files && addFiles(event.target.files)} />
                <span className="flex flex-wrap items-center justify-center gap-2"><Upload size={17} className="text-emerald-600" /> Drag &amp; Drop or <span className="font-bold text-emerald-700 underline">Browse</span> files <span className="text-slate-300">|</span> <GoogleDrivePicker onSelect={handleDriveSelection} /></span>
              </label>
              </>}
              </div>
              </div>

              {orderStep === 1 && <div className="min-w-0 border-l border-slate-200 pl-5 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="text-3xl font-normal tracking-tight text-slate-900">Additional information</h4>
                </div>

                <div className="mt-3">
                <label className="block text-xs font-semibold text-slate-700">Paper instructions <span className="font-normal italic">(optional)</span>
                  <textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} placeholder="Describe what you need." className="mt-1 h-24 w-full resize-none border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#0080d1]" />
                </label>
                {(uploadedFiles.length > 0 || googleDriveItems.length > 0) && (
                  <div className="mt-3 space-y-2">
                    {uploadedFiles.length > 0 && (
                      <ul className="space-y-1">
                        {uploadedFiles.map((file, index) => (
                          <li key={`${file.name}-${index}`} className="flex items-center justify-between border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                            <span className="flex min-w-0 items-center gap-2 truncate">
                              <Paperclip size={14} className="shrink-0 text-[#0080d1]" />
                              <span className="truncate">{file.name}</span>
                            </span>
                            <button type="button" onClick={() => setUploadedFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))} aria-label={`Remove ${file.name}`} className="ml-2 shrink-0 text-slate-400 hover:text-red-600">
                              <Trash2 size={15} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                    {googleDriveItems.length > 0 && (
                      <ul className="space-y-1">
                        {googleDriveItems.map((item) => (
                          <li key={item.id} className="flex items-center gap-2 border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-slate-700">
                            <span className="h-2 w-2 shrink-0 rounded-full bg-[#4285f4]" />
                            <span className="truncate">{item.name}</span>
                            <span className="ml-auto shrink-0 text-[10px] font-bold uppercase text-[#4285f4]">
                              {item.mimeType === 'application/vnd.google-apps.folder' ? 'Folder' : 'Drive file'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
                <div className="mt-4 flex justify-end">
                  <button type="button" onClick={() => void continueOrder()} disabled={isSavingDraft} className="bg-[#0080d1] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#004695] disabled:cursor-not-allowed disabled:opacity-60">{isSavingDraft ? 'Saving...' : 'Next'}</button>
                </div>
                </div>
                </div>}

              {orderStep === 3 && <div className="mb-6 pt-0 md:col-span-2">
                {!showStripeCheckout ? <div className="mt-px grid gap-0 overflow-hidden border border-slate-200 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                  <div className="border-b border-slate-200 bg-white p-4 md:border-b-0 md:border-r md:p-5">
                    <h5 className="text-xl font-normal tracking-tight text-slate-900">Total</h5>
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
                      <div className="min-w-0"><dt className="font-semibold text-slate-700">Topic</dt><dd className="mt-1 break-words text-slate-500">{topic || 'Not specified'}</dd></div>
                      <div className="min-w-0"><dt className="font-semibold text-slate-700">Discipline</dt><dd className="mt-1 break-words text-slate-500">{discipline || 'Not specified'}</dd></div>
                      <div className="min-w-0"><dt className="font-semibold text-slate-700">Paper type</dt><dd className="mt-1 break-words text-slate-500">{paperType}</dd></div>
                      <div className="min-w-0"><dt className="font-semibold text-slate-700">Pages</dt><dd className="mt-1 break-words text-slate-500">{pages} page{pages === 1 ? '' : 's'} / {pages * 275} words</dd></div>
                      <div className="min-w-0"><dt className="font-semibold text-slate-700">Deadline</dt><dd className="mt-1 break-words text-slate-500">{formatDeadline(deadline)}</dd></div>
                      <div className="min-w-0"><dt className="font-semibold text-slate-700">Citation</dt><dd className="mt-1 break-words text-slate-500">{citationFormat} - {apaEdition}</dd></div>
                      <div className="col-span-2 min-w-0"><dt className="font-semibold text-slate-700">Instructions</dt><dd className="mt-1 whitespace-pre-wrap break-words text-slate-500">{instructions ? (showFullInstructions || instructions.length <= 280 ? instructions : `${instructions.slice(0, 280).trimEnd()}...`) : 'Not specified'}{instructions.length > 280 && <button type="button" onClick={() => setShowFullInstructions((current) => !current)} className="ml-2 whitespace-nowrap font-bold text-[#0080d1] hover:text-[#004695]">{showFullInstructions ? 'Show less' : 'Read more'}</button>}</dd></div>
                      {(uploadedFiles.length > 0 || googleDriveItems.length > 0) && <div className="col-span-2 min-w-0"><dt className="font-semibold text-slate-700">Attached files</dt><dd className="mt-1 grid gap-1 text-slate-500">{uploadedFiles.map((file, index) => <span key={`${file.name}-${index}`} className="flex min-w-0 items-center gap-2 break-words"><Paperclip size={13} className="shrink-0 text-[#0080d1]" /><span className="truncate">{file.name}</span></span>)}{googleDriveItems.map((item) => <span key={item.id} className="flex min-w-0 items-center gap-2 break-words"><Paperclip size={13} className="shrink-0 text-[#4285f4]" /><span className="truncate">{item.name}</span></span>)}</dd></div>}
                    </dl>
                  </div>
                  <div className="bg-white p-4 md:p-5">
                    <div className="flex items-center justify-between gap-4"><h5 className="text-2xl font-normal tracking-tight text-slate-900">Payment summary</h5></div>
                    <div className="mt-4 flex items-center justify-between bg-slate-50 px-4 py-3"><span className="font-semibold text-slate-700">Amount due</span><span className="text-2xl font-black text-slate-900">${amountDue.toFixed(2)}</span></div>
                    {walletBalance > 0 && <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700"><input type="checkbox" checked={useWalletBalance} onChange={(event) => setUseWalletBalance(event.target.checked)} className="h-4 w-4 accent-[#0080d1]" /> Use wallet balance (${walletBalance.toFixed(2)} available)</label>}
                    <div className="mt-4 grid gap-4 border-b border-slate-200 pb-4 sm:grid-cols-2"><div><p className="font-semibold text-slate-700">Payment splits in 2 parts</p><div className="mt-2 grid grid-cols-2 overflow-hidden border border-slate-200 text-center text-sm"><div className="bg-slate-50 px-2 py-3"><span className="block text-slate-500">Part 1</span><strong className="mt-1 block text-slate-900">${(orderTotal / 2).toFixed(2)}</strong></div><div className="px-2 py-3"><span className="block text-slate-500">Part 2</span><strong className="mt-1 block text-slate-900">${(orderTotal / 2).toFixed(2)}</strong></div></div></div><div><p className="font-semibold text-slate-700">Payment method</p><div className="mt-2 flex items-center gap-2 border border-emerald-300 bg-emerald-50/40 px-3 py-2 text-sm font-semibold text-slate-700"><span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-emerald-600"><span className="h-2.5 w-2.5 rounded-full bg-emerald-600" /></span>Credit / Debit card</div><div className="mt-2 flex flex-wrap items-center gap-1.5" aria-label="Accepted payment cards"><span className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-black italic text-[#1434CB] shadow-sm">VISA</span><span className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-black text-[#EB001B] shadow-sm">Mastercard</span><span className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-black italic text-[#006FCF] shadow-sm">AMEX</span><span className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-black text-[#F58220] shadow-sm">Discover</span></div></div></div>
                    <p className="mt-3 text-xs font-semibold text-slate-500">Payment is released to the writer only after your order is completed.</p>
                    {!showStripeCheckout && paymentStatus !== 'paid' && <div className="mt-4 flex justify-end"><button type="button" onClick={() => { void saveOrderDraft().then(() => { if (amountDue === 0) { void completePayment('balance'); } else { setShowStripeCheckout(true); } }); }} disabled={isSubmittingPayment || isSavingDraft} className="inline-flex items-center justify-center bg-[#0080d1] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#004695] disabled:cursor-not-allowed disabled:opacity-60">{isSubmittingPayment || isSavingDraft ? 'Processing...' : amountDue === 0 ? 'Place order using balance' : 'Continue to payment'}</button></div>}
                    {paymentStatus === 'paid' && <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800"><CheckCircle2 size={18} /> Payment reserved successfully.</div>}
                  </div>
                </div> : <div className="mt-px grid border border-slate-200 bg-white md:grid-cols-2"><div className="border-b border-slate-200 bg-slate-50 p-5 md:border-b-0 md:border-r"><h5 className="text-2xl font-normal tracking-tight text-slate-900">What happens after payment?</h5><p className="mt-2 text-sm leading-relaxed text-slate-600">Your order is sent to our team for review and a suitable writer is assigned after the order is placed successfully.</p><ol className="mt-5 space-y-4 text-sm"><li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#0080d1] text-xs font-bold text-white">1</span><span className="text-slate-600"><strong className="text-slate-800">The writer works from your instructions.</strong><br />Your topic, deadline, files, and formatting requirements remain attached to the order.</span></li><li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#0080d1] text-xs font-bold text-white">2</span><span className="text-slate-600"><strong className="text-slate-800">You review the delivered work.</strong><br />The order is delivered by the deadline, and you can request revisions when the delivered work does not meet the original requirements.</span></li><li className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center bg-[#0080d1] text-xs font-bold text-white">3</span><span className="text-slate-600"><strong className="text-slate-800">You complete the order when satisfied.</strong><br />Payment is released to the writer only after the order is completed. Please review carefully because revisions are not available after completion.</span></li></ol><p className="mt-5 border-t border-slate-200 pt-4 text-xs font-semibold leading-relaxed text-slate-500">Your payment is securely processed, and the amount may be divided into parts according to the order details.</p></div><div className="p-5"><div className="flex items-center justify-between gap-4"><h5 className="text-2xl font-normal tracking-tight text-slate-900">Card payment</h5><span className="text-sm font-semibold text-slate-500">${amountDue.toFixed(2)}</span></div><div className="mt-4"><ErrorBoundary fallbackMessage="Card payment could not be loaded. Please try again."><StripeCheckoutForm compact amount={amountDue} email={user?.email || ''} fullName={displayName} onPaymentSuccess={completePayment} isSubmittingOrder={false} onBack={() => setShowStripeCheckout(false)} /></ErrorBoundary></div></div></div>}
              </div>}

              {orderStep === 4 && <div className="border-t border-slate-200 pt-8 md:col-span-2"><div className="border border-emerald-200 bg-emerald-50 p-6"><h4 className="text-2xl font-black text-emerald-900">Keep track of the progress</h4><p className="mt-2 text-sm text-emerald-800">Your order is ready for the next stage. You can follow messages, files, and delivery updates from All orders.</p><div className="mt-5 grid gap-3 sm:grid-cols-3"><div className="border border-emerald-200 bg-white p-3 text-sm"><strong className="block">Requirements</strong><span className="text-emerald-700">Complete</span></div><div className="border border-emerald-200 bg-white p-3 text-sm"><strong className="block">Expert</strong><span className="text-emerald-700">{selectedWriter?.name || 'Finder matching'}</span></div><div className="border border-emerald-200 bg-white p-3 text-sm"><strong className="block">Payment</strong><span className="text-emerald-700">{paymentStatus === 'paid' ? 'Reserved' : 'Pending'}</span></div></div>{orderId && <p className="mt-5 text-xs font-bold text-emerald-800">Order reference: {orderId}</p>}</div></div>}

              {orderStep === 4 && <Link to="/portal/assignments" className="inline-flex w-fit rounded-full bg-[#0080d1] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#004695]">View all orders</Link>}
              {orderError && <p className="text-sm font-semibold text-red-600 md:col-span-2" role="alert">{orderError}</p>}
            </div>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}

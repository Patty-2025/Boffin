import React, { useEffect, useState } from 'react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { collection, addDoc } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';

interface EnquiryFormValues {
  name: string;
  phone: string;
  email: string;
  country: string;
  orderType: string;
}

const initialValues: EnquiryFormValues = {
  name: '',
  phone: '',
  email: '',
  country: '',
  orderType: '',
};

export default function EnquiryAttentionGrabber() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasDismissed, setHasDismissed] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('enquiryAttentionDismissed') === 'true') {
      setHasDismissed(true);
      return;
    }

    const timer = window.setTimeout(() => setIsOpen(true), 12000);
    const handleExitIntent = (event: MouseEvent) => {
      if (event.clientY <= 0) setIsOpen(true);
    };

    window.addEventListener('mouseleave', handleExitIntent);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('mouseleave', handleExitIntent);
    };
  }, []);

  const dismiss = () => {
    setIsOpen(false);
    setHasDismissed(true);
    sessionStorage.setItem('enquiryAttentionDismissed', 'true');
  };

  const updateField = (field: keyof EnquiryFormValues, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const submitEnquiry = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'leads'), {
        ...formValues,
        source: 'website-enquiry-attention-grabber',
        createdAt: new Date().toISOString(),
      });

      const emailResponse = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });
      const emailResult = await emailResponse.json().catch(() => ({}));
      if (!emailResponse.ok) throw new Error(emailResult.error || 'We could not send your enquiry.');

      setIsSubmitted(true);
    } catch (submitError) {
      console.error('Error submitting website enquiry:', submitError);
      setError('We could not send your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasDismissed) return null;

  return (
    <>
      {!isOpen && (
        <button type="button" onMouseEnter={() => setIsOpen(true)} onFocus={() => setIsOpen(true)} onClick={() => setIsOpen(true)} className="fixed right-0 top-1/2 z-[999] -translate-y-1/2 rounded-l-xl bg-[#1e2d78] px-3 py-5 text-xs font-extrabold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-[#263b91]" aria-label="Open enquiry form">
          Enquire
        </button>
      )}

      {isOpen && <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0f1d2d]/65 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="enquiry-title">
      <div className="relative max-h-[calc(100vh-2rem)] w-full max-w-[510px] overflow-y-auto rounded-[20px] bg-[#1e2d78] px-5 py-7 text-white shadow-2xl sm:px-10 sm:py-9">
        <button type="button" onClick={dismiss} className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-bl-2xl rounded-tr-[20px] bg-white text-[#1e2d78] transition hover:bg-[#f5f7ff]" aria-label="Close enquiry form">
          <X size={22} />
        </button>

        {isSubmitted ? (
          <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
            <CheckCircle2 size={52} className="mb-5 text-[#f6c453]" />
            <h2 className="font-display text-3xl font-black">Thanks for reaching out</h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-blue-100">Our academic support team will contact you shortly.</p>
            <button type="button" onClick={dismiss} className="mt-7 rounded-full bg-[#c39a20] px-9 py-3 text-sm font-extrabold text-white transition hover:bg-[#d5ad31]">Close</button>
          </div>
        ) : (
          <>
            <h2 id="enquiry-title" className="font-display text-3xl font-black tracking-tight sm:text-4xl">Enquire Now</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-blue-100">Tell us what you need and we will connect you with the right expert.</p>
            <div className="my-6 h-px bg-white/20" />

            <form onSubmit={submitEnquiry} className="space-y-4">
              <input value={formValues.name} onChange={(event) => updateField('name', event.target.value)} placeholder="Name" aria-label="Name" required className="h-16 w-full rounded-xl border-0 bg-white px-5 text-base text-slate-800 outline-none placeholder:text-[#8cabca] focus:ring-2 focus:ring-[#f6c453]" />
              <div className="flex h-16 overflow-hidden rounded-xl bg-white">
                <span className="flex w-28 shrink-0 items-center border-r border-slate-200 px-5 text-sm font-semibold text-[#1e2d78]">Phone</span>
                <input value={formValues.phone} onChange={(event) => updateField('phone', event.target.value)} type="tel" placeholder="Mobile number" aria-label="Mobile number" required className="min-w-0 flex-1 border-0 bg-transparent px-5 text-base text-slate-800 outline-none placeholder:text-[#8cabca] focus:ring-0" />
              </div>
              <input value={formValues.email} onChange={(event) => updateField('email', event.target.value)} type="email" placeholder="Email address" aria-label="Email address" required className="h-16 w-full rounded-xl border-0 bg-white px-5 text-base text-slate-800 outline-none placeholder:text-[#8cabca] focus:ring-2 focus:ring-[#f6c453]" />
              <input value={formValues.country} onChange={(event) => updateField('country', event.target.value)} placeholder="Country" aria-label="Country" required className="h-16 w-full rounded-xl border-0 bg-white px-5 text-base text-slate-800 outline-none placeholder:text-[#8cabca] focus:ring-2 focus:ring-[#f6c453]" />
              <select value={formValues.orderType} onChange={(event) => updateField('orderType', event.target.value)} aria-label="Type of order" required className={`h-16 w-full rounded-xl border-0 bg-white px-5 text-base outline-none focus:ring-2 focus:ring-[#f6c453] ${formValues.orderType ? 'text-slate-800' : 'text-[#8cabca]'}`}>
                <option value="" disabled>Select type of order</option>
                <option value="Essay or coursework">Essay or coursework</option>
                <option value="Research paper or dissertation">Research paper or dissertation</option>
                <option value="Coding or technical project">Coding or technical project</option>
                <option value="Proofreading or editing">Proofreading or editing</option>
              </select>

              {error && <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-100">{error}</p>}

              <button type="submit" disabled={isSubmitting} className="group flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#c39a20] text-base font-extrabold text-white shadow-lg transition hover:bg-[#d5ad31] disabled:cursor-not-allowed disabled:opacity-60">
                {isSubmitting ? 'Sending...' : 'Submit enquiry'}
                {!isSubmitting && <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          </>
        )}
      </div>
      </div>}
    </>
  );
}
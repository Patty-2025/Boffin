import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx';
const stripePromise = loadStripe(stripePublishableKey);

interface StripeCheckoutFormProps {
  amount: number;
  email: string;
  fullName: string;
  onPaymentSuccess: (paymentId: string) => Promise<void> | void;
  isSubmittingOrder: boolean;
  compact?: boolean;
  onBack?: () => void;
}

function InnerForm({ amount, email, fullName, onPaymentSuccess, isSubmittingOrder, onBack, fallbackMode = false, compact = false }: StripeCheckoutFormProps & { fallbackMode?: boolean }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [useCardElementFallback, setUseCardElementFallback] = useState(fallbackMode);

  // Fallback state for manual card input if test keys/mock mode is active
  const [cardName, setCardName] = useState(fullName);
  const [cardPostal, setCardPostal] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Please provide a valid email address before proceeding with payment.");
      return;
    }

    if (!fullName || fullName.trim().length === 0) {
      setErrorMessage("Please provide your full name before proceeding.");
      return;
    }

    setProcessing(true);
    setErrorMessage(null);

    // If Stripe is fully initialized with a real PaymentElement / clientSecret
    if (stripe && elements && !useCardElementFallback) {
      try {
        const { error, paymentIntent } = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: `${window.location.origin}/order-placed`,
            receipt_email: email,
          },
          redirect: 'if_required',
        });

        if (error) {
          setErrorMessage(error.message || 'Payment failed. Please check your card details and try again.');
          setProcessing(false);
          return;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
          try {
            await onPaymentSuccess(paymentIntent.id);
          } finally {
            setProcessing(false);
          }
          return;
        }
        
        // If redirect is required, processing state remains true while redirecting
        return;
      } catch (err) {
        console.warn('Stripe confirmPayment error:', err);
        setErrorMessage('An unexpected error occurred during payment.');
        setProcessing(false);
        return;
      }
    }

    setErrorMessage('Stripe payment is unavailable until a real payment intent is configured.');
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} name="stripe-payment" autoComplete="off" noValidate className={compact ? 'space-y-3' : 'space-y-4'}>
      {compact ? (
        <div className="border border-slate-200 bg-white p-4">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600">
            <span className="text-[#1434CB]">VISA</span><span className="text-[#EB001B]">MASTERCARD</span><span className="text-[#006FCF]">AMEX</span><span className="text-[#F58220]">DISCOVER</span>
          </div>
          {!useCardElementFallback ? <PaymentElement options={{ layout: 'tabs' }} /> : <div className="border border-slate-200 p-3"><CardElement options={{ style: { base: { fontSize: '14px', color: '#1e293b', '::placeholder': { color: '#94a3b8' } } } }} /></div>}
        </div>
      ) : (
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2 text-slate-800 font-extrabold text-xs uppercase tracking-wider">
            <CreditCard size={18} className="text-amber-600" />
            <span>Card Details (Stripe 256-bit Encrypted)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full">
              SSL SECURE
            </span>
          </div>
        </div>

        {/* Payment Element / Card Input */}
        {!useCardElementFallback ? (
          <div className="min-h-[120px]">
            <PaymentElement
              options={{
                layout: 'tabs',
              }}
              onReady={() => {}}
              onChange={(e) => {
                if (e.complete) setErrorMessage(null);
              }}
            />
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Cardholder Name</label>
              <input
                type="text"
                required
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Full Name as shown on card"
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-600 mb-1">Credit or Debit Card</label>
              <div className="p-3 bg-white border border-slate-300 rounded-xl">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '14px',
                        color: '#1e293b',
                        '::placeholder': { color: '#94a3b8' },
                      },
                      invalid: { color: '#ef4444' },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}

      </div>
      )}

      {errorMessage && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-start gap-2">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Pay Now Button */}
      <div className={compact && onBack ? 'flex items-center justify-between gap-3' : ''}>
      {compact && onBack && <button type="button" onClick={onBack} className="bg-[#0080d1] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#004695]">Back</button>}
      <button
        type="submit"
        disabled={processing || isSubmittingOrder}
        className={compact && onBack ? 'ml-auto inline-flex items-center justify-center bg-[#0080d1] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#004695] disabled:cursor-not-allowed disabled:opacity-60' : compact ? 'w-full bg-[#0080d1] px-7 py-3 text-sm font-extrabold text-white transition hover:bg-[#004695] disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer' : 'w-full bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-base py-4 rounded-xl transition-all shadow-xl shadow-amber-500/20 disabled:opacity-50 hover:-translate-y-0.5 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer'}
      >
        {processing || isSubmittingOrder ? (
          <>
            <RefreshCw size={20} className="animate-spin text-slate-900" />
            <span>Processing Secure Stripe Payment...</span>
          </>
        ) : (
          <>
            <Lock size={18} />
            <span>{compact ? `Pay $${amount}` : `Pay $${amount} & Confirm Order`}</span>
          </>
        )}
      </button>
      </div>

      {!compact && <p className="text-[11px] text-slate-500 text-center mt-1">Backed by 100% Money-Back Guarantee & Free Turnitin Plagiarism Report.</p>}
    </form>
  );
}

export default function StripeCheckoutForm(props: StripeCheckoutFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingIntent, setLoadingIntent] = useState(true);
  const [intentError, setIntentError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoadingIntent(true);
    setIntentError(false);
    const timeoutId = window.setTimeout(() => {
      if (isMounted) {
        setIntentError(true);
        setLoadingIntent(false);
      }
    }, 8000);

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: props.amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setIntentError(true);
          }
          setLoadingIntent(false);
        }
      })
      .catch((err) => {
        console.warn('Error fetching payment intent:', err);
        if (isMounted) {
          setIntentError(true);
          setLoadingIntent(false);
        }
      });

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
    };
  }, [props.amount]);

  if (loadingIntent) {
    return (
      <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
        <RefreshCw size={24} className="animate-spin text-[#0080d1] mx-auto" />
        <p className="text-xs font-bold text-slate-600">Initializing Secure Stripe Payment Gateway...</p>
      </div>
    );
  }

  if (intentError && !clientSecret) {
    return (
      <Elements stripe={stripePromise}>
        <InnerForm {...props} fallbackMode={true} />
      </Elements>
    );
  }

  // If clientSecret exists, wrap in Elements
  if (clientSecret && clientSecret !== 'mock_secret_for_preview') {
    return (
      <Elements
        key="payment-element"
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: 'stripe',
            variables: {
              colorPrimary: '#0080d1',
              colorBackground: '#ffffff',
              colorText: '#0f172a',
              borderRadius: '0px',
            },
          },
        }}
      >
        <InnerForm {...props} />
      </Elements>
    );
  }

  // Preview or fallback mode without explicit client secret from live Stripe keys
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
        Stripe payment is not available yet. Configure the Stripe server key before entering card details.
      </div>
    );
}

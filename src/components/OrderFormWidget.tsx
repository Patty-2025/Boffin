import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider, appleProvider, facebookProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import TermsModal from './TermsModal';

export default function OrderFormWidget() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [wordsQty, setWordsQty] = useState(275);
  const [deadline, setDeadline] = useState(() => {
    // Default to tomorrow at 1:00 PM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(13, 0, 0, 0);
    return tomorrow.toISOString().slice(0, 16); // format for datetime-local input
  });
  const [policyAgree, setPolicyAgree] = useState(false);
  const [marketingAgree, setMarketingAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPagesSelected, setIsPagesSelected] = useState(false); // Pages / Words active state
  const [timeLeft, setTimeLeft] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [pendingProvider, setPendingProvider] = useState<'Google' | 'Apple' | 'Facebook' | null>(null);

  // Calculate pages
  const pagesCount = Math.max(1, Math.ceil(wordsQty / 275));

  // Handle words increment/decrement
  const handleDecrement = () => {
    setWordsQty(prev => Math.max(275, prev - 275));
  };

  const handleIncrement = () => {
    setWordsQty(prev => prev + 275);
  };

  const triggerOAuthFlow = (providerType: 'Google' | 'Apple' | 'Facebook') => {
    setPendingProvider(providerType);
    setShowTermsModal(true);
  };

  const executeProviderSignIn = async () => {
    setShowTermsModal(false);
    setIsSubmitting(true);
    setAuthError(null);
    try {
      let provider;
      if (pendingProvider === 'Apple') {
        provider = appleProvider;
      } else if (pendingProvider === 'Facebook') {
        provider = facebookProvider;
      } else {
        provider = googleProvider;
      }
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setAuthError(err.message || `${pendingProvider} sign in failed`);
    } finally {
      setIsSubmitting(false);
      setPendingProvider(null);
    }
  };

  // Calculate dynamic countdown to selected deadline
  useEffect(() => {
    const updateTimer = () => {
      const diff = new Date(deadline).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft('Expired');
        return;
      }
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours}h ${mins}m left`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [deadline]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    navigate(`/registration.html?email=${encodeURIComponent(email)}&words=${wordsQty}&deadline=${encodeURIComponent(deadline)}`);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col ml-auto mr-auto lg:mr-0 max-[432px]:min-h-[234px] min-h-[550px] w-full mb-3 sm:w-[422px] max-[374px]:px-2 p-3 md:p-6 rounded-2xl bg-white border border-solid border-slate-100 shadow-xl relative z-10">
      <p className="text-xl font-black text-slate-800 text-center mb-6 lg:mb-8 font-display">
        Place an order
      </p>

      <div data-order="" data-submittext="Order now" data-mobileflowbreakpoint="431" data-showgdprbydefault="false" data-hidepapertype="true" data-enableoauthinitializationpreview="true" data-hideloginprompt="true" data-active="true">
        <form onSubmit={handleSubmit} data-bb-order="true" name="order" className="bb-orderForm space-y-5">
            {authError && (
              <div className="text-xs text-red-500 bg-red-50 p-2 rounded-lg border border-red-200">{authError}</div>
            )}
            {/* Social Logins */}
            <div>
              <div className="bb-providerContainer flex gap-2 w-full mb-4">
                <button 
                  type="button" 
                  className="bb-providerButton flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg text-xs font-bold text-slate-700 transition"
                  onClick={() => triggerOAuthFlow('Google')}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.909-2.259c-.805.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.462.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"></path>
                  </svg>
                  <span className="bb-providerButtonText">Google</span>
                </button>
                <button 
                  type="button" 
                  className="bb-providerButton flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg text-xs font-bold text-slate-700 transition"
                  onClick={() => triggerOAuthFlow('Facebook')}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 9c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 4.49 3.29 8.21 7.59 8.91v-6.3h-2.29V9h2.29V7.03c0-2.26 1.34-3.51 3.41-3.51.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.41V9h2.5l-.4 2.61h-2.1v6.3C14.71 17.21 18 13.49 18 9z" fill="#1877F2"></path>
                  </svg>
                  <span className="bb-providerButtonText">Facebook</span>
                </button>
                <button 
                  type="button" 
                  className="bb-providerButton flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-2.5 rounded-lg text-xs font-bold text-slate-700 transition"
                  onClick={() => triggerOAuthFlow('Apple')}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.164 4.396c.75 0 1.688-.521 2.247-1.217.506-.63.875-1.511.875-2.392 0-.12-.01-.239-.031-.337-.834.033-1.836.576-2.437 1.305-.474.554-.907 1.424-.907 2.315 0 .13.021.261.032.305.053.01.137.021.221.021zM6.528 17.55c1.023 0 1.476-.706 2.752-.706 1.298 0 1.582.684 2.721.684 1.118 0 1.867-1.065 2.574-2.108.79-1.196 1.118-2.37 1.139-2.425-.074-.021-2.215-.924-2.215-3.457 0-2.196 1.688-3.185 1.782-3.261-1.117-1.652-2.816-1.696-3.28-1.696-1.255 0-2.278.783-2.921.783-.696 0-1.614-.74-2.7-.74-2.067 0-4.166 1.762-4.166 5.088 0 2.066.78 4.25 1.74 5.664.823 1.196 1.54 2.174 2.574 2.174z" fill="#424242"></path>
                  </svg>
                  <span className="bb-providerButtonText">Apple</span>
                </button>
              </div>
              <div className="bb-divider flex items-center text-center text-xs font-bold text-slate-400 uppercase tracking-widest my-4">
                <span className="grow border-t border-slate-100 mr-3" />
                or
                <span className="grow border-t border-slate-100 ml-3" />
              </div>
            </div>

            <div className="bb-orderFields space-y-4">
              {/* Email Input Field */}
              <div className="bb-row flex flex-col space-y-1.5">
                <label className="bb-label text-xs font-bold text-slate-500 uppercase tracking-wide">Email</label>
                <div className="bb-loginField relative flex items-center">
                  <input 
                    type="email"
                    placeholder="Enter your email" 
                    name="login" 
                    data-bb="login" 
                    className="bb-input w-full px-3 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-[#0080d1] focus:ring-3 focus:ring-[#e5f2fa] transition"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>



              {/* Pages / Words Selector */}
              <div className="bb-row flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="bb-label text-xs font-bold text-slate-500 uppercase tracking-wide">Pages / Words</label>
                  <span className="text-xs font-semibold text-slate-600">{pagesCount} page{pagesCount > 1 ? 's' : ''} ({wordsQty} words)</span>
                </div>
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <button 
                    type="button" 
                    onClick={handleDecrement}
                    className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition border-r border-slate-200"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center text-sm font-semibold text-slate-800 py-3">
                    {wordsQty} words ({pagesCount} page{pagesCount > 1 ? 's' : ''})
                  </div>
                  <button 
                    type="button" 
                    onClick={handleIncrement}
                    className="px-4 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold transition border-l border-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Deadline Selector */}
              <div className="bb-row flex flex-col space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="bb-label text-xs font-bold text-slate-500 uppercase tracking-wide">Deadline</label>
                  {timeLeft && <span className="text-xs font-bold text-emerald-600">{timeLeft}</span>}
                </div>
                <div className="relative">
                  <input 
                    type="datetime-local" 
                    value={deadline}
                    onChange={e => setDeadline(e.target.value)}
                    className="bb-input w-full px-3 py-3 border border-slate-200 rounded-lg text-sm text-slate-700 bg-white focus:outline-none focus:border-[#0080d1] focus:ring-3 focus:ring-[#e5f2fa] transition cursor-pointer"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="bb-row pt-1 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={policyAgree}
                    onChange={e => setPolicyAgree(e.target.checked)}
                    className="checkbox-blue mt-0.5"
                    required
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to the <a href="/terms" target="_blank" rel="noreferrer" className="text-[#0080d1] underline">Terms & Conditions</a> and <a href="/privacy-policy" target="_blank" rel="noreferrer" className="text-[#0080d1] underline">Privacy Policy</a>.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={marketingAgree}
                    onChange={e => setMarketingAgree(e.target.checked)}
                    className="checkbox-blue mt-0.5"
                  />
                  <span className="text-xs text-slate-600 leading-relaxed">
                    I agree to receive bonuses, discounts and promotional materials.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="bb-submitButtonWrapper pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bb-button w-full text-white font-extrabold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 transform active:scale-98 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                  style={{
                    background: 'linear-gradient(90deg, #db464c 0%, #f47321 100%)',
                    border: 'none'
                  }}
                >
                  {isSubmitting ? 'Order placing...' : 'Order now'}
                </button>
              </div>
            </div>
          </form>
        </div>

      <TermsModal 
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onContinue={executeProviderSignIn}
        providerName={pendingProvider || 'Google'}
      />

      {/* Styled Inline Embed Elements */}
      <style>{`
        .bb-button {
          background: linear-gradient(90deg, var(--yellow-900) 50%, var(--yellow-500) 100%);
          border: none;
          color: var(--white, #fff);
          transition: all .3s cubic-bezier(.645, .045, .355, 1);
        }
        .bb-button:hover {
          background: linear-gradient(90deg, var(--yellow-900) 50%, var(--yellow-900) 100%);
          transform: translateY(-1px);
        }
        .bb-button:active {
          box-shadow: 0 0 0 3px #ffeada;
          transform: translateY(0);
        }
        .checkbox-blue {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          border: 1px solid #8cabca;
          accent-color: #0080d1;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

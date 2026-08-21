import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { auth, authPersistenceReady, googleProvider, appleProvider, facebookProvider } from '../lib/firebase';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { ensureClientId } from '../lib/clientId';
import { collection, getDocs, query, where } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import { getSafeAuthError } from '../lib/authError';

export default function Registration() {
  const [searchParams] = useSearchParams();
  const initialEmail = searchParams.get('email') || '';
  const referralCode = searchParams.get('ref') || '';
  const redirect = searchParams.get('redirect');

  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [policyAgree, setPolicyAgree] = useState(true);
  const [marketingAgree, setMarketingAgree] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (initialEmail && !email) {
      setEmail(initialEmail);
    }
    if (referralCode) {
      localStorage.setItem('boffinReferralCode', referralCode);
    }
  }, [initialEmail, referralCode]);

  const ensureRegisteredClientId = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    await ensureClientId(currentUser);
  };

  const handleAuthSuccess = async () => {
    try {
      await ensureRegisteredClientId();
    } catch (error) {
      console.error('Client ID assignment skipped because Firestore is unavailable:', error);
    }
    if (redirect === 'place-order') {
      navigate('/portal/place-order');
      return;
    }

    const currentUser = auth.currentUser;
    if (!currentUser) {
      navigate('/dashboard');
      return;
    }

    const ordersSnapshot = await getDocs(query(collection(db, 'orders'), where('userId', '==', currentUser.uid)));
    navigate(ordersSnapshot.empty ? '/portal/place-order' : '/dashboard');
  };

  const generatePassword = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    return Array.from({ length: 12 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authPersistenceReady;
      await signInWithPopup(auth, googleProvider);
      await handleAuthSuccess();
    } catch (err: any) {
      setError(getSafeAuthError(err, 'Unable to sign in with Google.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authPersistenceReady;
      await signInWithPopup(auth, appleProvider);
      await handleAuthSuccess();
    } catch (err: any) {
      setError(getSafeAuthError(err, 'Unable to sign in with Apple.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authPersistenceReady;
      await signInWithPopup(auth, facebookProvider);
      await handleAuthSuccess();
    } catch (err: any) {
      setError(getSafeAuthError(err, 'Unable to sign in with Facebook.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyAgree) {
      setError('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await authPersistenceReady;
      // Try to create account
      if (password) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        const generatedPassword = generatePassword();
        await createUserWithEmailAndPassword(auth, email, generatedPassword);
        await sendPasswordResetEmail(auth, email);
      }
      await handleAuthSuccess();
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        // If email exists, sign in
        try {
          if (password) {
            await authPersistenceReady;
            await signInWithEmailAndPassword(auth, email, password);
            await handleAuthSuccess();
          } else {
            setError('Account already exists for this email. Please enter your password or log in.');
          }
        } catch (loginErr: any) {
          setError(getSafeAuthError(loginErr, 'Unable to complete registration.'));
        }
      } else {
        setError(getSafeAuthError(err, 'Unable to create the account.'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col justify-between font-sans">
      
      {/* Header */}
      <header className="header-v2 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center min-h-[72px] px-4 lg:px-6">
          <div className="flex justify-between items-center grow">
            <Link to="/" className="shrink-0 mr-auto md:mr-14">
              <img className="shark-logo" src="/_redesign/assets/img/logo.svg" alt="BoffinGlobal™" width="180" height="32" />
              <img className="shark-logo-scrolled hidden" src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal" width="46" height="32" />
            </Link>
          </div>
        </div>
      </header>

      <div className="header__beacon"></div>

      {/* Main Registration Layout */}
      <div className="py-8 lg:py-12 relative flex-1 flex items-center justify-center">

        <div className="max-w-7xl w-full mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row rounded-2xl bg-white border border-slate-100 shadow-xl overflow-hidden min-h-[504px]">
            
            {/* Left Column Form */}
            <div className="flex flex-col shrink-0 px-6 lg:px-[68px] py-8 lg:py-12 max-w-[492px] min-h-[504px] w-full mx-auto justify-center">
              <p className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-6 lg:mb-8 font-display">
                Create account to continue
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grow form-flex-col">
                <form onSubmit={handleSubmit} data-bb-order="true" name="order" className="bb-orderForm space-y-4">
                  <div>
                    {/* Provider buttons */}
                    <div className="bb-providerContainer flex gap-2 w-full mb-4">
                      <button 
                        type="button" 
                        onClick={handleGoogleSignIn}
                        className="bb-providerButton flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-3 rounded-full text-xs font-bold text-slate-700 transition cursor-pointer"
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
                        onClick={handleFacebookSignIn}
                        className="bb-providerButton flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-3 rounded-full text-xs font-bold text-slate-700 transition cursor-pointer"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 9c0-4.97-4.03-9-9-9s-9 4.03-9 9c0 4.49 3.29 8.21 7.59 8.91v-6.3h-2.29V9h2.29V7.03c0-2.26 1.34-3.51 3.41-3.51.99 0 2.02.18 2.02.18v2.22h-1.14c-1.12 0-1.47.7-1.47 1.41V9h2.5l-.4 2.61h-2.1v6.3C14.71 17.21 18 13.49 18 9z" fill="#1877F2"></path>
                        </svg>
                        <span className="bb-providerButtonText">Facebook</span>
                      </button>

                      <button 
                        type="button" 
                        onClick={handleAppleSignIn}
                        className="bb-providerButton flex-1 flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 py-3 rounded-full text-xs font-bold text-slate-700 transition cursor-pointer"
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.164 4.396c.75 0 1.688-.521 2.247-1.217.506-.63.875-1.511.875-2.392 0-.12-.01-.239-.031-.337-.834.033-1.836.576-2.437 1.305-.474.554-.907 1.424-.907 2.315 0 .13.021.261.032.305.053.01.137.021.221.021zM6.528 17.55c1.023 0 1.476-.706 2.752-.706 1.298 0 1.582.684 2.721.684 1.118 0 1.867-1.065 2.574-2.108.79-1.196 1.118-2.37 1.139-2.425-.074-.021-2.215-.924-2.215-3.457 0-2.196 1.688-3.185 1.782-3.261-1.117-1.652-2.816-1.696-3.28-1.696-1.255 0-2.278.783-2.921.783-.696 0-1.614-.74-2.7-.74-2.067 0-4.166 1.762-4.166 5.088 0 2.066.78 4.25 1.74 5.664.823 1.196 1.54 2.174 2.574 2.174z" fill="#424242"></path>
                        </svg>
                        <span className="bb-providerButtonText">Apple</span>
                      </button>
                    </div>

                    <div className="bb-divider flex items-center text-center text-xs font-bold text-slate-400 uppercase tracking-widest my-4">
                      <span className="grow border-t border-slate-100 mr-3"></span>
                      or
                      <span className="grow border-t border-slate-100 ml-3"></span>
                    </div>
                  </div>

                  <div className="bb-orderFields space-y-4">
                    <div className="bb-row">
                      <label className="bb-label block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Email</label>
                      <div className="bb-loginField relative flex items-center">
                        <input 
                          type="email"
                          placeholder="Enter your email" 
                          name="login" 
                          data-bb="login" 
                          className="bb-input w-full px-3 py-3 border border-slate-200 rounded-lg text-base text-slate-800 focus:outline-none focus:border-[#0080d1] focus:ring-3 focus:ring-[#e5f2fa] transition"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div role="button" tabIndex={-1} aria-label="Info" className="bb-iconContainer absolute right-3 text-slate-400">
                          <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.162c5.425 0 9.838 4.413 9.838 9.838 0 5.425-4.413 9.838-9.838 9.838-5.425 0-9.838-4.413-9.838-9.838 0-5.425 4.413-9.838 9.838-9.838zm0-1.968C5.48.194.194 5.48.194 12S5.48 23.806 12 23.806 23.806 18.52 23.806 12 .194zm-2 15.751c.555-1.76 1.606-3.868 1.791-4.401.269-.775-.207-1.118-1.711.205l-.335-.63c1.716-1.866 5.249-2.288 4.046.604-.75 1.805-1.287 3.024-1.594 3.965-.448 1.37.682.814 1.79-.208.15.246.199.326.35.609-2.458 2.34-5.186 2.546-4.337-.144zm4.665-8.037c-.523.446-1.299.436-1.732-.021-.434-.458-.361-1.189.16-1.634.524-.446 1.3-.435 1.733.021.432.459.362 1.19-.16 1.635z" fill="#8cabca"></path>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="bb-row">
                      <label className="bb-label block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Password</label>
                      <input 
                        type="password"
                        placeholder="Create a password" 
                        className="bb-input w-full px-3 py-3 border border-slate-200 rounded-lg text-base text-slate-800 focus:outline-none focus:border-[#0080d1] focus:ring-3 focus:ring-[#e5f2fa] transition"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <div className="bb-collapseWrapper space-y-2 pt-2">
                      <label className="bb-gdprLabel flex gap-2.5 items-start cursor-pointer">
                        <input 
                          name="policy_agree" 
                          type="checkbox" 
                          className="bb-checkboxInput mt-0.5 rounded" 
                          checked={policyAgree}
                          onChange={(e) => setPolicyAgree(e.target.checked)}
                          required
                        />
                        <span className="bb-gdprText text-xs text-slate-600 leading-normal">
                          I agree to the <Link to="/terms" target="_blank" className="text-blue-600 underline hover:text-blue-800">Terms &amp; Conditions</Link> and <Link to="/privacy-policy" target="_blank" className="text-blue-600 underline hover:text-blue-800">Privacy Policy</Link>.
                        </span>
                      </label>

                      <label className="bb-gdprLabel flex gap-2.5 items-start cursor-pointer">
                        <input 
                          name="marketing_agree" 
                          type="checkbox" 
                          className="bb-checkboxInput mt-0.5 rounded" 
                          checked={marketingAgree}
                          onChange={(e) => setMarketingAgree(e.target.checked)}
                        />
                        <span className="bb-gdprText text-xs text-slate-600 leading-normal">
                          I agree to receive bonuses, discounts and promotional materials.
                        </span>
                      </label>
                    </div>

                    <div className="bb-row pt-2">
                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="bb-button w-full bg-[#0080d1] hover:bg-[#004695] text-white font-extrabold py-3.5 px-8 rounded-full text-lg transition duration-200 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
                      >
                        {isLoading ? 'Creating account...' : 'Continue'}
                      </button>
                    </div>
                  </div>

                  <div className="bb-alreadyHaveAccount text-center text-sm text-slate-600 pt-3">
                    Already have an account? <Link to="/login" className="bb-link text-[#0080d1] font-bold hover:underline">Log in</Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column Blue Gradient Panel */}
            <div className="rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none px-4 md:px-8 lg:px-20 py-8 lg:py-12 text-white grow bg-gradient-to-b from-blue-500 to-[#080EAA] flex flex-col justify-center">
              <img className="hidden lg:block mx-auto mb-8" src="/next/img/illustration/shark-order.svg" alt="Create account" loading="lazy" width="369" height="358" />
              
              <div className="flex flex-col w-full max-w-[460px] mx-auto">
                
                <div className="flex gap-4 items-center p-4 border-b border-solid border-blue-900/60 last-of-type:border-none">
                  <div className="w-[52px] h-[52px] bg-slate-50 shrink-0 rounded-full flex items-center justify-center shadow-sm">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 26.3334C5.68889 25.7334 3.77778 24.4889 2.26667 22.6C0.755556 20.7112 0 18.5112 0 16C0 13.4889 0.755556 11.2889 2.26667 9.40004C3.77778 7.51115 5.68889 6.26671 8 5.66671V8.46671C6.42222 9.00004 5.13889 9.9556 4.15 11.3334C3.16111 12.7112 2.66667 14.2667 2.66667 16C2.66667 17.7334 3.16111 19.2889 4.15 20.6667C5.13889 22.0445 6.42222 23 8 23.5334V26.3334ZM18.6667 26.6667C15.7111 26.6667 13.1944 25.6278 11.1167 23.55C9.03889 21.4723 8 18.9556 8 16C8 13.0445 9.03889 10.5278 11.1167 8.45004C13.1944 6.37226 15.7111 5.33337 18.6667 5.33337C20.1333 5.33337 21.5111 5.61115 22.8 6.16671C24.0889 6.72226 25.2222 7.48893 26.2 8.46671L24.3333 10.3334C23.6 9.60004 22.75 9.02782 21.7833 8.61671C20.8167 8.2056 19.7778 8.00004 18.6667 8.00004C16.4444 8.00004 14.5556 8.77782 13 10.3334C11.4444 11.8889 10.6667 13.7778 10.6667 16C10.6667 18.2223 11.4444 20.1112 13 21.6667C14.5556 23.2223 16.4444 24 18.6667 24C19.7778 24 20.8167 23.7945 21.7833 23.3834C22.75 22.9723 23.6 22.4 24.3333 21.6667L26.2 23.5334C25.2222 24.5112 24.0889 25.2778 22.8 25.8334C21.5111 26.3889 20.1333 26.6667 18.6667 26.6667ZM26.6667 21.3334L24.8 19.4667L26.9333 17.3334H17.3333V14.6667H26.9333L24.8 12.5334L26.6667 10.6667L32 16L26.6667 21.3334Z" fill="#0080D1"></path>
                    </svg>
                  </div>
                  <p className="font-medium text-base">
                    Pay after you get the result
                  </p>
                </div>

                <div className="flex gap-4 items-center p-4 border-b border-solid border-blue-900/60 last-of-type:border-none">
                  <div className="w-[52px] h-[52px] bg-slate-50 shrink-0 rounded-full flex items-center justify-center shadow-sm">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 28C12.9333 28 10.2611 26.9833 7.98333 24.95C5.70556 22.9167 4.4 20.3778 4.06667 17.3333H6.8C7.11111 19.6444 8.13889 21.5556 9.88333 23.0667C11.6278 24.5778 13.6667 25.3333 16 25.3333C18.6 25.3333 20.8056 24.4278 22.6167 22.6167C24.4278 20.8056 25.3333 18.6 25.3333 16C25.3333 13.4 24.4278 11.1944 22.6167 9.38333C20.8056 7.57222 18.6 6.66667 16 6.66667C14.4667 6.66667 13.0333 7.02222 11.7 7.73333C10.3667 8.44444 9.24444 9.42222 8.33333 10.6667H12V13.3333H4V5.33333H6.66667V8.46667C7.8 7.04444 9.18333 5.94444 10.8167 5.16667C12.45 4.38889 14.1778 4 16 4C17.6667 4 19.2278 4.31667 20.6833 4.95C22.1389 5.58333 23.4056 6.43889 24.4833 7.51667C25.5611 8.59444 26.4167 9.86111 27.05 11.3167C27.6833 12.7722 28 14.3333 28 16C28 17.6667 27.6833 19.2278 27.05 20.6833C26.4167 22.1389 25.5611 23.4056 24.4833 24.4833C23.4056 25.5611 22.1389 26.4167 20.6833 27.05C19.2278 27.6833 17.6667 28 16 28ZM19.7333 21.6L14.6667 16.5333V9.33333H17.3333V15.4667L21.6 19.7333L19.7333 21.6Z" fill="#0080D1"></path>
                    </svg>
                  </div>
                  <p className="font-medium text-base">
                    Unlimited revisions
                  </p>
                </div>

                <div className="flex gap-4 items-center p-4 border-b border-solid border-blue-900/60 last-of-type:border-none">
                  <div className="w-[52px] h-[52px] bg-slate-50 shrink-0 rounded-full flex items-center justify-center shadow-sm">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2666 22.6666C15.6666 22.6666 16.061 22.6166 16.4499 22.5166C16.8388 22.4166 17.1999 22.2666 17.5333 22.0666L20.7999 25.3333L22.6666 23.4666L19.3999 20.2C19.5999 19.8666 19.7499 19.5055 19.8499 19.1166C19.9499 18.7277 19.9999 18.3333 19.9999 18.3333C19.9999 16.6444 19.5444 15.5555 18.6333 14.6666C17.7221 13.7777 16.6221 13.3333 15.3333 13.3333C14.0444 13.3333 12.9444 13.7888 12.0333 14.7C11.1221 15.6111 10.6666 16.7111 10.6666 18C10.6666 19.2888 11.111 20.3888 11.9999 21.3C12.8888 22.2111 13.9777 22.6666 15.2666 22.6666ZM15.3333 20C14.7777 20 14.3055 19.8055 13.9166 19.4166C13.5277 19.0277 13.3333 18.5555 13.3333 18C13.3333 17.4444 13.5277 16.9722 13.9166 16.5833C14.3055 16.1944 14.7777 16 15.3333 16C15.8888 16 16.361 16.1944 16.7499 16.5833C17.1388 16.9722 17.3333 17.4444 17.3333 18C17.3333 18.5555 17.1388 19.0277 16.7499 19.4166C16.361 19.8055 15.8888 20 15.3333 20ZM7.99992 29.3333C7.26659 29.3333 6.63881 29.0722 6.11659 28.55C5.59436 28.0277 5.33325 27.4 5.33325 26.6666V5.33329C5.33325 4.59996 5.59436 3.97218 6.11659 3.44996C6.63881 2.92774 7.26659 2.66663 7.99992 2.66663H18.6666L26.6666 10.6666V26.6666C26.6666 27.4 26.4055 28.0277 25.8833 28.55C25.361 29.0722 24.7333 29.3333 23.9999 29.3333H7.99992ZM17.3333 12V5.33329H7.99992V26.6666H23.9999V12H17.3333Z" fill="#0080D1"></path>
                    </svg>
                  </div>
                  <p className="font-medium text-base">
                    Free Plagiarism &amp; AI report
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

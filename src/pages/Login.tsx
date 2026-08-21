import React, { useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { auth, authPersistenceReady, googleProvider, appleProvider, facebookProvider } from '../lib/firebase';
import { 
  signInWithPopup, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from 'firebase/auth';
import { collection, getDocs, query, where } from '../lib/realtimeFirestore';
import { db } from '../lib/firebase';
import { getSafeAuthError } from '../lib/authError';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleAuthSuccess = async () => {
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await authPersistenceReady;
      await signInWithPopup(auth, googleProvider);
      await auth.currentUser?.getIdToken(true);
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
      await auth.currentUser?.getIdToken(true);
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
      await auth.currentUser?.getIdToken(true);
      await handleAuthSuccess();
    } catch (err: any) {
      setError(getSafeAuthError(err, 'Unable to sign in with Facebook.'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setInfoMsg(null);

    try {
      await authPersistenceReady;
      await signInWithEmailAndPassword(auth, email, password);
      await auth.currentUser?.getIdToken(true);
      await handleAuthSuccess();
    } catch (err: any) {
      setError(getSafeAuthError(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first to reset your password.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setInfoMsg('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      setError('If an account matches that email, reset instructions will be sent.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col font-sans text-slate-800">
      <header className="header-v2 bg-slate-50">
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

      <section className="py-8 lg:py-12 relative flex-1 flex items-center justify-center">

        <div className="max-w-7xl w-full mx-auto px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row rounded-2xl bg-white border border-solid border-slate-100 shadow-xl overflow-hidden lg:min-h-[740px]">
            
            {/* Form Side */}
            <div className="flex flex-col items-center min-h-[585px] grow shrink-0 px-6 lg:px-[68px] py-8 lg:py-12 justify-center">
              <p className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight mb-6 lg:mb-8 font-display">
                Log into your account
              </p>

              {error && (
                <div className="mb-4 w-full max-w-[356px] p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              {infoMsg && (
                <div className="mb-4 w-full max-w-[356px] p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                  {infoMsg}
                </div>
              )}

              <div className="relative form-flex-col log-in grow max-w-[356px] w-full" data-auth="" data-showgdprbydefault="true" data-submittext="Continue" data-enableoauthinitializationpreview="true" data-active="true">
                <form onSubmit={handleSubmit} data-bb-auth="true" name="auth" className="bb-authForm space-y-4">
                  <div className="bb-authFields space-y-4">
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

                    <div className="bb-row">
                      <label htmlFor="login-email" className="bb-label block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Email</label>
                      <div className="bb-loginField relative">
                        <input 
                          id="login-email" 
                          placeholder="Enter your email" 
                          name="login" 
                          type="email"
                          className="bb-input w-full px-3 py-3 border border-slate-200 rounded-lg text-base text-slate-800 focus:outline-none focus:border-[#0080d1] focus:ring-3 focus:ring-[#e5f2fa] transition" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <div className="bb-loginCheck"></div>
                      </div>
                    </div>

                    <div className="bb-row">
                      <label htmlFor="login-password" className="bb-label block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Password</label>
                      <div className="bb-passwordField relative flex items-center">
                        <input 
                          id="login-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Enter your password" 
                          name="password" 
                          className="bb-input w-full px-3 py-3 border border-slate-200 rounded-lg text-base text-slate-800 focus:outline-none focus:border-[#0080d1] focus:ring-3 focus:ring-[#e5f2fa] transition pr-10" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowPassword(!showPassword)}
                          className="bb-toggleVisibility absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                        >
                          <span className="bb-strokeSvg">
                            <svg width="24" height="24" fill="none" stroke="#8cabca" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" tabIndex={-1}>
                              <g transform="translate(0 2.748)" strokeWidth="1.833">
                                <path d="M1.917 9.252S5.583 1.917 12 1.917c6.416 0 10.083 7.335 10.083 7.335S18.416 16.585 12 16.585c-6.417 0-10.083-7.334-10.083-7.334z"></path>
                                <ellipse cx="12" cy="9.252" rx="2.75" ry="2.751"></ellipse>
                              </g>
                            </svg>
                          </span>
                        </button>
                      </div>

                      <div className="bb-forgotContainer flex justify-between items-center mt-3 text-xs">
                        <label className="bb-stayContainer flex items-center gap-2 cursor-pointer select-none">
                          <input 
                            name="stay_signed_in" 
                            type="checkbox" 
                            className="bb-checkboxInput rounded border-slate-300 text-[#0080d1] focus:ring-[#0080d1]" 
                            checked={staySignedIn}
                            onChange={(e) => setStaySignedIn(e.target.checked)}
                          />
                          <span className="bb-stayText text-slate-600 font-medium">Stay logged in</span>
                        </label>
                        <button 
                          type="button"
                          onClick={handleForgotPassword}
                          className="bb-passwordBoldLink bb-link text-[#0080d1] font-bold hover:underline"
                        >
                          Forgot password
                        </button>
                      </div>
                    </div>

                    <div className="bb-row pt-2">
                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="bb-button w-full bg-[#0080d1] hover:bg-[#004695] text-white font-extrabold py-3.5 px-8 rounded-full text-lg transition duration-200 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
                      >
                        {isLoading ? 'Logging in...' : 'Continue'}
                      </button>
                    </div>
                  </div>

                  <div className="bb-authLinks text-center text-sm text-slate-600 pt-3">
                    <span className="bb-noAccountText mr-1">Don’t have an account?</span>
                    <Link to={redirect === 'place-order' ? '/signup?redirect=place-order' : '/signup'} className="bb-registrationBoldLink bb-link text-[#0080d1] font-bold hover:underline">Sign up</Link>
                  </div>
                </form>
              </div> 
            </div>

            {/* Right Branding Column */}
            <div className="lg:max-w-[656px] w-full rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none px-8 lg:px-24 py-12 text-white flex flex-col justify-center items-center grow bg-gradient-to-b from-blue-500 to-[#080EAA]"> 
              <img className="hidden lg:block mx-auto mb-8" src="/next/img/illustration/shark-curious.svg" alt="Log in" loading="lazy" width="369" height="358" /> 
              <h2 className="text-3xl lg:text-4xl font-extrabold text-center leading-tight mb-3">Welcome back to <br/> BoffinGlobal<sub className="text-xs font-bold ml-0.5 opacity-90">TM</sub>!</h2> 
              <p className="text-center text-blue-100 text-base max-w-[320px]">
                Log in to continue to your account
              </p> 
            </div> 

          </div>
        </div>
      </section>
    </div>
  );
}

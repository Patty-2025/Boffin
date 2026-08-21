import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, authPersistenceReady, db } from '../lib/firebase';
import { doc, getDoc } from '../lib/realtimeFirestore';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authPersistenceReady;
      const credentials = await signInWithEmailAndPassword(auth, email.trim(), password);
      const adminSnapshot = await getDoc(doc(db, 'admins', credentials.user.uid));
      if (!adminSnapshot.exists()) {
        await auth.signOut();
        throw new Error(`This account is not authorized. Add admins/${credentials.user.uid} to Realtime Database.`);
      }
      if (adminSnapshot.data()?.enabled === false) {
        await auth.signOut();
        throw new Error('This administrator account is disabled.');
      }
      navigate('/portal/admin/dashboard', { replace: true });
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : 'Unable to sign in to the admin portal.';
      setError(message.includes('PERMISSION_DENIED') || message.includes('Permission denied') ? 'Admin sign-in succeeded, but Realtime Database rules denied access to the admin record.' : message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <section className="w-full max-w-md border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0080d1]">Restricted access</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Admin portal</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">Sign in with an authorized administrator account.</p>
        {error && <p className="mt-5 border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-bold text-slate-700">Admin email<input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full border border-slate-300 px-3 py-3 outline-none focus:border-[#0080d1]" /></label>
          <label className="block text-sm font-bold text-slate-700">Password<input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full border border-slate-300 px-3 py-3 outline-none focus:border-[#0080d1]" /></label>
          <button type="submit" disabled={isLoading} className="w-full bg-[#0080d1] px-4 py-3 text-sm font-extrabold text-white hover:bg-[#004695] disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? 'Signing in...' : 'Sign in to admin portal'}</button>
        </form>
        <Link to="/" className="mt-6 block text-center text-sm font-semibold text-slate-500 hover:text-[#0080d1]">Return to website</Link>
      </section>
    </main>
  );
}

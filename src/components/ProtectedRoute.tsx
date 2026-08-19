import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const location = useLocation();

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    const loginPath = location.pathname === '/order' ? '/login?redirect=order' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  const emailVerified = user.emailVerified || Boolean(sessionStorage.getItem(`boffinEmailVerified:${user.uid}`));
  if (!emailVerified && location.pathname !== '/dashboard' && location.pathname !== '/portal/dashboard') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

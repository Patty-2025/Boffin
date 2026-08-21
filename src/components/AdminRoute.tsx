import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase';
import { doc, getDoc } from '../lib/realtimeFirestore';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!auth.currentUser) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      try {
        const adminDoc = await getDoc(doc(db, 'admins', auth.currentUser.uid));
        setIsAdmin(adminDoc.exists() && adminDoc.data()?.enabled !== false);
      } catch (e) {
        setIsAdmin(false);
      }
      setLoading(false);
    };
    checkAdmin();
  }, [auth.currentUser]);

  if (loading) return <div>Loading...</div>;
  if (!isAdmin) return <Navigate to="/portal/admin/login" replace />;

  return <>{children}</>;
}

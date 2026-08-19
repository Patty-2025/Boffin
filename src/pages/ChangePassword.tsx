import React, { useState, useEffect } from 'react';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { X, Loader2 } from 'lucide-react';

interface ChangePasswordProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePassword({ isOpen, onClose }: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSimulatingLoad(true);
      const timer = setTimeout(() => {
        setIsSimulatingLoad(false);
      }, 1000); // 1-second simulated load
      return () => clearTimeout(timer);
    } else {
      // Reset state when closed
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user || !user.email) throw new Error('No user logged in');

      // Reauthenticate user
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);
      setMessage('Password updated successfully!');
      setTimeout(() => {
        onClose();
      }, 2000); // Close modal automatically after success
    } catch (err: any) {
      console.error(err);
      setMessage('Error updating password: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      {isSimulatingLoad ? (
        <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center justify-center min-w-[300px] min-h-[300px]">
          <Loader2 className="animate-spin text-emerald-500 mb-4" size={48} />
          <p className="text-slate-600 font-medium">Loading secure form...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in fade-in zoom-in duration-200">
          <button 
            onClick={onClose}
            className="absolute top-0 right-0 bg-gradient-to-br from-blue-700 to-emerald-800 text-white p-2 rounded-bl-xl hover:bg-emerald-500 transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="p-8 mt-2">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Change Password</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">Old Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter old password"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-[10b981] outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-[#f47321] outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter confirm password"
                  className="w-full p-3 border border-slate-200 rounded-lg focus:border-emerald-500 focus:ring-1 focus:ring-[#f47321] outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>
              
              {message && <p className={`text-sm text-center font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
              
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {submitting ? 'Updating...' : 'Update password'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

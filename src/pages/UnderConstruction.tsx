import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Construction, ArrowLeft, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function UnderConstruction() {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  
  const pageName = path
    .split('/')
    .pop()!
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] p-12 border border-slate-200 shadow-2xl shadow-slate-200/50 text-center relative overflow-hidden"
      >
        {/* Background Accents */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-slate-50 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-xl shadow-emerald-500/20 rotate-3">
            <Construction className="text-white" size={48} />
          </div>

          <h1 className="text-4xl font-black text-slate-900 mb-6 tracking-tighter">
            {pageName || 'Module'} <span className="text-emerald-500">Insight</span>
          </h1>
          
          <div className="max-w-md mx-auto">
            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
              This module is currently being calibrated by our engineering team to ensure the highest standards of accuracy and performance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest px-8 py-4"
            >
              <ArrowLeft size={18} /> Go Back
            </button>
            <Link 
              to="/portal/dashboard" 
              className="bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-xl shadow-slate-900/10 text-sm uppercase tracking-widest flex items-center gap-2"
            >
              Dashboard
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-slate-100 grid grid-cols-2 gap-8 text-left">
            <div className="flex gap-4">
              <div className="shrink-0 w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                <ShieldCheck size={20} />
              </div>
              <div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
                <div className="text-xs font-bold text-slate-900">Alpha Testing</div>
              </div>
            </div>
            <div className="flex gap-4 text-left">
              <div className="shrink-0 w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Request Info</div>
                <div className="text-xs font-bold text-emerald-500 hover:underline cursor-pointer">Contact Support</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

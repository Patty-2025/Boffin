import React, { useState, useEffect } from 'react';
import { X, QrCode, Smartphone } from 'lucide-react';

export default function DiscountBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed before
    if (localStorage.getItem('discountBannerDismissed') === 'true') return;

    // Trigger after 30 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    // Trigger on exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const dismiss = () => {
    setIsVisible(false);
    localStorage.setItem('discountBannerDismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[9999] p-4 transition-transform duration-300">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <button onClick={dismiss} className="absolute -top-3 -right-3 p-1 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-slate-600 shadow-sm">
          <X size={16} />
        </button>
        
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-slate-900">Special Offer: 5% Cashback on App Orders</h2>
          <p className="text-sm text-slate-500">Download our app to claim this offer on your first 3 orders.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded transition">
              App Store
            </button>
            <button className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded transition">
              Google Play
            </button>
          </div>
          
          <div className="hidden sm:block">
            <QrCode size={40} className="text-slate-800" />
          </div>
        </div>
      </div>
    </div>
  );
}

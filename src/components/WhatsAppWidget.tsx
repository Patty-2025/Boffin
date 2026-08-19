import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, PhoneCall, Check, Clock, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [customText, setCustomText] = useState('');

  const WHATSAPP_NUMBER = '254118155512';
  const DISPLAY_NUMBER = '+254 118 155512';

  const PRESET_MESSAGES = [
    'Hi! I need help with an assignment or research paper.',
    'Hello, I need SPSS, MATLAB, or Coding assistance.',
    'Hi! I would like a custom quote for my task.',
    'Hello, I want to inquire about an existing order.'
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleOpenWhatsApp = (textToSend?: string) => {
    const finalMsg = textToSend || customText || 'Hello, I would like to inquire about your academic writing and technical assignment services.';
    const encoded = encodeURIComponent(finalMsg);
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Tooltip / Speech Bubble */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-50 bg-white shadow-2xl border border-emerald-100 p-4 rounded-2xl w-72 cursor-pointer group"
            onClick={() => {
              setIsOpen(true);
              setShowTooltip(false);
            }}
          >
            <button 
              type="button"
              onClick={(e) => { e.stopPropagation(); setShowTooltip(false); }}
              className="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={14} />
            </button>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-emerald-500/30">
                <MessageSquare size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <p className="text-xs text-emerald-700 font-extrabold uppercase tracking-wide">WhatsApp Support</p>
                </div>
                <p className="text-xs text-slate-700 font-semibold leading-snug">
                  Chat directly with our academic team on WhatsApp!
                </p>
                <p className="text-[11px] text-slate-500 font-bold mt-1">
                  {DISPLAY_NUMBER}
                </p>
              </div>
            </div>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-b border-r border-emerald-100 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Action Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTooltip(false);
        }}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer border-2 border-white"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X size={26} />
        ) : (
          <div className="relative">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300"></span>
            </span>
          </div>
        )}
      </button>

      {/* WhatsApp Chat Popover Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden max-h-[85vh] font-sans"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 text-white p-5 relative">
              <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-extrabold text-lg shadow-inner">
                    <MessageSquare size={24} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-emerald-700 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight leading-tight">Academic Support Desk</h3>
                  <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5 font-medium">
                    <Clock size={12} />
                    <span>WhatsApp: {DISPLAY_NUMBER}</span>
                  </p>
                </div>
              </div>

              <div className="mt-3 bg-emerald-800/50 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-2.5 text-[11px] text-emerald-50 flex items-center gap-2">
                <Sparkles size={14} className="text-amber-300 shrink-0" />
                <span>Instant help for SPSS, Coding, Research & Assignments 24/7.</span>
              </div>
            </div>

            {/* Chat Content Body */}
            <div className="p-4 bg-slate-50 flex-1 overflow-y-auto space-y-4">
              
              {/* Support Greeting Bubble */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                  WA
                </div>
                <div className="bg-white border border-slate-200/80 p-3.5 rounded-2xl rounded-tl-xs shadow-sm max-w-[85%] text-xs text-slate-700 leading-relaxed space-y-1.5">
                  <p className="font-bold text-slate-900">Hello! 👋 Welcome to Boffin Global Group</p>
                  <p>How can we assist with your academic work today? Click a quick question below or type your message to chat directly on WhatsApp.</p>
                  <div className="text-[10px] text-slate-400 font-medium text-right flex items-center justify-end gap-1">
                    <span>Just now</span>
                    <Check size={12} className="text-emerald-600" />
                  </div>
                </div>
              </div>

              {/* Quick Preset Messages */}
              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider px-1">
                  Quick Topics:
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {PRESET_MESSAGES.map((msg, i) => (
                    <button
                      key={i}
                      onClick={() => handleOpenWhatsApp(msg)}
                      className="text-left text-xs bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-700 font-semibold p-2.5 rounded-xl transition-all flex items-center justify-between group shadow-2xs cursor-pointer"
                    >
                      <span className="truncate mr-2">{msg}</span>
                      <Send size={13} className="text-emerald-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input Box */}
              <div className="pt-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider mb-1.5 px-1">
                  Or Type Custom Message:
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 resize-none h-20 leading-relaxed font-medium placeholder:text-slate-400 shadow-2xs"
                />
              </div>

            </div>

            {/* Footer Action Button */}
            <div className="p-4 bg-white border-t border-slate-200">
              <button
                onClick={() => handleOpenWhatsApp()}
                className="w-full bg-gradient-to-r from-emerald-500 via-teal-600 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <PhoneCall size={18} />
                <span>Start WhatsApp Chat (+254 118 155512)</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

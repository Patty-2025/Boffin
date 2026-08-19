import React from 'react';
import { Sparkles } from 'lucide-react';

export default function WordCounterMagicBanner() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-blue-50 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
        {/* Conceptual Illustration Area */}
        <div className="w-full md:w-2/5 flex justify-center">
          <div className="relative w-full max-w-[300px] aspect-square flex items-center justify-center">
             <div className="absolute inset-0 bg-white/40 rounded-full blur-3xl"></div>
             {/* Simple Lucide fallback for complex illustration */}
             <div className="relative text-blue-300">
               <Sparkles size={180} strokeWidth={1} />
             </div>
             {/* Decorative small circles */}
             <div className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
             <div className="absolute bottom-20 right-5 w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-3/5 text-center md:text-left">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Explore Real Magic with Our Online Word Counter Tool
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl mb-10 max-w-xl">
            Unlock an Accurate Count of Words for a Seamless Writing Experience Instantly
          </p>
          <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-2xl active:scale-95 text-xl tracking-tight">
            Give it a Try
          </button>
        </div>
      </div>
    </section>
  );
}

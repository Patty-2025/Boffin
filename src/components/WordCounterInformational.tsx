import React from 'react';
import educationImg from '../assets/trusted-logos/education.png';

export default function WordCounterInformational() {
  return (
    <section className="px-6 py-12">
      <div className="max-w-[1300px] mx-auto">
        <div className="bg-gradient-to-br from-slate-50 via-blue-50/50 to-blue-100/20 rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8 border border-slate-100">
          {/* Image */}
          <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center">
              <img 
                  src={educationImg} 
                  alt="Word Counter Help" 
                  className="w-full max-w-[300px] h-auto object-contain"
                  referrerPolicy="no-referrer"
              />
          </div>
          
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Explore Real Magic with Our Online Word Counter Tool
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
              Analyze your content easily and accurately. Get detailed statistics, optimize for SEO, and improve your writing with our comprehensive word counting and analysis tools.
            </p>
            <button className="inline-block bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Click to Connect
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

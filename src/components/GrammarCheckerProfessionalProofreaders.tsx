import React from 'react';
import { Star, Clock, MessageSquare, User } from 'lucide-react';

const proofreaders = [
  {
    name: 'Robert Pirie',
    title: "Master's in English (M...",
    bio: 'Robert specializes in the nuanced fields of ethnicity and cultural studies. While our online grammar checker provides an excellent first pass, Robert...',
    orders: 284,
    reviews: 114
  },
  {
    name: 'Claudia Jaime',
    title: 'MA from Cape Breton ...',
    bio: 'A dedicated full-time writer, Claudia has mastered the art of crafting high-quality essays, case studies, and term papers. She uses our proper sentence...',
    orders: 215,
    reviews: 115
  },
  {
    name: 'Dorothy Si',
    title: 'PhD. in Geography',
    bio: 'Dorothy is an expert academic writer for MAH, specializing in aquatic ecology, geosciences, and tropical change. For dense scientific reports, she utilizes a...',
    orders: 1458,
    reviews: 729
  },
  {
    name: 'John Perna',
    title: 'Doctorate in Economi...',
    bio: 'John brings over two years of experience helping students navigate the complexities of microeconomics, property rights, and global trade. He acts as a...',
    orders: 1011,
    reviews: 404
  }
];

export default function GrammarCheckerProfessionalProofreaders() {
  return (
    <section className="py-16 bg-[#f8f9fa] w-full relative overflow-hidden">
      
      {/* Background Stylized Topographic Lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1000 1000" className="absolute left-[30%] top-1/2 -translate-y-1/2 scale-[2]">
          <g fill="none" stroke="#e2e8f0" strokeWidth="2">
            {[...Array(30)].map((_, i) => (
              <circle key={i} cx="500" cy="500" r={i * 25 + 50} />
            ))}
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Cards Grid */}
          <div className="w-full lg:w-[50%] grid grid-cols-1 sm:grid-cols-2 gap-5">
            {proofreaders.map((proofreader, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-start text-left">
                <div className="flex items-center gap-3 mb-3 relative">
                  <div className="relative">
                    <div className="w-[46px] h-[46px] bg-[#e2e8f0] rounded-full flex items-center justify-center text-[#94a3b8] overflow-hidden">
                      <User size={32} strokeWidth={1.5} className="mt-2" />
                    </div>
                    <div className="absolute bottom-0 right-[-2px] w-[14px] h-[14px] bg-[#10b981] rounded-full border-[2.5px] border-white"></div>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#333333] leading-tight mb-0.5">{proofreader.name}</h3>
                    <p className="text-xs text-[#666666] mb-1">{proofreader.title}</p>
                    <div className="flex gap-[2px] text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-[#666666] mb-5 flex-grow leading-[1.6]">
                  {proofreader.bio}
                </p>
                
                <div className="flex flex-col w-full text-xs text-[#666666] gap-2 font-medium">
                  <div className="flex items-center gap-2"><Clock size={13} className="text-[#94a3b8]" /> <span className="text-[#222222] text-xs font-bold">{proofreader.orders}</span> Completed Orders</div>
                  <div className="flex items-center gap-2"><MessageSquare size={13} className="text-[#94a3b8]" /> <span className="text-[#222222] text-xs font-bold">{proofreader.reviews}</span> Student Reviews</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-[50%] lg:pr-8 py-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#222222] tracking-tight leading-[1.15] mb-6">
              Professional<br />Proofreaders to<br />Check and Correct<br />Grammar
            </h2>
            <p className="text-[#666666] text-base leading-relaxed mb-6">
              If you want a human touch after using our free grammar<br className="hidden lg:block"/>
              checker, hire our experts. While our online grammar checker is<br className="hidden lg:block"/>
              powerful, a professional can provide an English grammar check<br className="hidden lg:block"/>
              that ensures 100% accuracy. Let us correct my sentence or<br className="hidden lg:block"/>
              perform a full grammar sentence check for your most important<br className="hidden lg:block"/>
              assignments
            </p>
            <p className="text-[#666666] text-base mb-8 font-medium">
              Place your order now! Make use of proofreading services.
            </p>
            <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-3.5 px-8 rounded shadow-sm text-base transition-colors">
              Avail Expert Help
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Star, ShieldCheck, CheckCircle2, ChevronDown, RotateCcw, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SEO from '../components/SEO';

export default function Experts() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedSubject, setSelectedSubject] = useState('All Subjects');

  const experts = [
    { id: 1, name: 'Michelle Meng', rating: 5, reviews: 2865, orders: 7770, successRate: '99%', subjects: ['English', 'Philosophy'], image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150', status: 'Online' },
    { id: 2, name: 'Rodney Baker', rating: 4.9, reviews: 415, orders: 1360, successRate: '99%', subjects: ['Business', 'Economics'], image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150', status: 'Online' },
    { id: 3, name: 'Henry Alessi', rating: 5, reviews: 2306, orders: 5890, successRate: '99%', subjects: ['Engineering', 'Physics'], image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150', status: 'Offline' },
    { id: 4, name: 'Jack Arens', rating: 5, reviews: 1959, orders: 5691, successRate: '99%', subjects: ['Law', 'History'], image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150', status: 'Offline' },
    { id: 5, name: 'Milton Blaha', rating: 5, reviews: 2019, orders: 6234, successRate: '98%', subjects: ['Nursing', 'Health'], image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150', status: 'Offline' },
    { id: 6, name: 'Caleb King', rating: 5, reviews: 2093, orders: 6765, successRate: '99%', subjects: ['Math', 'Calculus'], image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=150&h=150', status: 'Offline' },
  ];

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, experts.length));
  };

  return (
    <main className="pt-[80px] bg-white min-h-screen font-sans">
      <SEO 
        title="Our Global Network of Academic Experts & Scholars | Boffin Global Services"
        description="Connect with our global network of PhD-qualified researchers and academic writing experts. Get tailored support for your assignments from top-tier professional scholars."
        keywords="academic writing experts, global researchers, PhD scholars, assignment writing help, international academic support"
        canonicalUrl="/experts"
      />
      {/* Exact Redesign Hero Section */}
      <section className="bg-white py-12 lg:py-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-[-0.02em] leading-[1.05] mb-6">
              <span className="text-emerald-500">Professional</span> <span className="text-blue-700">Academic</span><br />
              <span className="text-emerald-500">Experts for</span><br />
              <span className="text-blue-700">International Scholars</span>
            </h1>
            <p className="text-lg text-slate-700 font-medium mb-12">Connect with leading global researchers for your academic success.</p>
            
            <div className="flex flex-col gap-8">
              {/* Expert Avatars & Label */}
              <div className="flex items-center gap-4 relative">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i+10}`} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-sm" alt="expert" />
                  ))}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-600 border-2 border-white flex items-center justify-center text-xs font-black text-white shadow-sm">5K+</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider leading-none">More than</div>
                  <div className="text-sm font-extrabold text-blue-700">5K+ Scholars</div>
                </div>
                {/* Curved Arrow to Select */}
                <div className="absolute left-[130px] top-[15px] hidden sm:block pointer-events-none">
                  <svg width="60" height="40" viewBox="0 0 60 40" fill="none" className="text-slate-800">
                    <path 
                      d="M2 5C15 5 45 10 55 35" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                    />
                    <path 
                      d="M48 30L55 35L58 25" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              </div>

              {/* Subject Filter & Reset */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative group">
                  <select 
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="appearance-none bg-white border border-slate-300 rounded-lg px-6 py-4 pr-12 text-sm lg:text-base font-bold text-slate-700 outline-none focus:border-emerald-500 transition-all w-full sm:w-[320px] shadow-sm"
                  >
                    <option>All Subjects</option>
                    <option>English</option>
                    <option>Business Management</option>
                    <option>Computer Science</option>
                    <option>Engineering</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <button 
                  onClick={() => setSelectedSubject('All Subjects')}
                  className="bg-white border border-emerald-500 text-emerald-500 px-10 py-4 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Right Cards Column - Exact Image Replication */}
          <div className="lg:col-span-5 flex items-start gap-4 h-full">
            {/* Primary Charlotte Card */}
            <div className="flex-1 bg-[#f4f6fb] rounded-2xl overflow-hidden shadow-sm flex flex-col h-full max-h-[480px]">
              <div className="bg-[#fdf3d3] flex-1 flex items-end justify-center pt-8 px-4">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=500" 
                  className="h-full w-auto object-contain object-bottom transition-transform duration-500 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                  alt="Charlotte Harper"
                />
              </div>
              <div className="p-6 bg-[#f8f9fc]">
                <h4 className="font-extrabold text-blue-700 text-xl mb-1">Charlotte Harper</h4>
                <p className="text-xs text-slate-500 font-bold mb-4 uppercase tracking-widest">Management Expert</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                  <span className="text-xs font-extrabold text-slate-500 bg-white px-2 py-1 rounded shadow-sm">5 Star</span>
                </div>
              </div>
            </div>

            {/* Side Column Cards */}
            <div className="w-[120px] lg:w-[150px] space-y-4 flex flex-col justify-between h-full max-h-[480px]">
              <div className="bg-[#dcf3e8] rounded-2xl flex-1 flex items-center justify-center p-3">
                <img src="https://i.pravatar.cc/150?u=44" className="w-full h-auto rounded-xl object-cover grayscale-[0.2]" alt="Expert" />
              </div>
              <div className="bg-[#fce9ee] rounded-2xl flex-1 flex items-center justify-center p-3">
                <img src="https://i.pravatar.cc/150?u=45" className="w-full h-auto rounded-xl object-cover grayscale-[0.2]" alt="Expert" />
              </div>
              <div className="bg-[#dbeefc] rounded-2xl flex-1 flex items-center justify-center p-3">
                <img src="https://i.pravatar.cc/150?u=46" className="w-full h-auto rounded-xl object-cover grayscale-[0.2]" alt="Expert" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roster Section - Exactly as before but polished for White BG */}
      <section className="py-12 px-4 sm:px-6 max-w-[1400px] mx-auto">
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {experts.map((expert, idx) => (
              <motion.div 
                key={expert.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-[#fdfdfd] rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 transition-all flex flex-col lg:flex-row items-center gap-8 group/card"
              >
                {/* Profile Block */}
                <div className="flex items-center gap-6 min-w-[320px] w-full lg:w-auto">
                  <div className="relative">
                    <img 
                      src={expert.image} 
                      alt={expert.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-full object-cover border-4 border-white transition-all group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover/card:border-emerald-500 transition-all"></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-extrabold text-blue-700 text-xl group-hover/card:text-emerald-500 transition-colors">{expert.name}</h3>
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                       <span className="text-emerald-500 font-extrabold text-sm">{expert.rating}</span>
                       <div className="flex">
                         {[1,2,3,4,5].map(i => <Star key={i} size={12} className={i <= Math.floor(expert.rating) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />)}
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded-full border border-slate-200">
                        <div className={`w-1.5 h-1.5 rounded-full ${expert.status === 'Online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></div>
                        <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider">{expert.status}</span>
                      </div>
                      <a href="#" className="text-xs font-extrabold text-slate-400 hover:text-blue-700 transition-colors uppercase tracking-widest flex items-center gap-1">
                        About writer <ArrowRight size={10} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Stats Block - Exactly as referenced */}
                <div className="flex-1 grid grid-cols-3 gap-12 text-center lg:border-l border-slate-100 lg:pl-12 w-full lg:w-auto">
                   <div className="space-y-1">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Orders</div>
                     <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 group-hover/card:text-emerald-500 transition-colors">{expert.orders}</div>
                   </div>
                   <div className="space-y-1">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Success Rate</div>
                     <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 group-hover/card:text-emerald-500 transition-colors">{expert.successRate}</div>
                   </div>
                   <div className="space-y-1">
                     <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Reviews</div>
                     <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 group-hover/card:text-emerald-500 transition-colors">{expert.reviews}</div>
                   </div>
                </div>

                {/* Action Block */}
                <div className="min-w-[220px] w-full lg:w-auto">
                  <button className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 font-extrabold py-3.5 rounded-xl transition-all tracking-wider text-xs shadow-md">
                    Contact the Writer
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Zap, Sparkles, FileText, CheckCircle2, AlertTriangle, RefreshCw, ArrowRight, BookOpen, Quote, Target } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';

export default function EssayChecker() {
  const [essay, setEssay] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleCheck = () => {
    if (!essay.trim()) return;
    setIsChecking(true);
    setReport(null);

    // Simulate analysis
    setTimeout(() => {
      setReport({
        score: 84,
        plagiarism: '2%',
        grammarErrors: 12,
        clarity: 'High',
        tone: 'Academic/Formal',
        summary: "Overall, the essay is well-structured and follows academic rigor. However, we found minor punctuation inconsistencies and repetitive sentence structures in the third paragraph. The vocabulary choice is excellent and suitable for Master's level submission."
      });
      setIsChecking(false);
    }, 2000);
  };

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional</span>
              <span className="text-blue-700 block">Essay Checker &</span>
              <span className="text-blue-700 block">Academic Analysis</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Go beyond basic spell-check. Our advanced AI-powered academic engine analyzes tone, structure, and citation integrity for elite university submissions worldwide.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Checker Tool Widget */}
           <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <div className="bg-[#f0e6d2] p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-2xl">
               <div className="bg-white rounded-lg p-5 sm:p-6 w-full border border-slate-100">
                  <textarea 
                    value={essay}
                    onChange={(e) => setEssay(e.target.value)}
                    placeholder="Paste your essay here for a comprehensive quality audit..."
                    className="w-full h-64 px-4 py-4 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 outline-none focus:border-emerald-500 transition-all resize-none mb-4"
                  ></textarea>
                  <button 
                    onClick={handleCheck}
                    disabled={isChecking || !essay.trim()}
                    className="w-full py-4 bg-gradient-to-br from-blue-700 to-emerald-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-lg hover:bg-emerald-500 transition-all"
                  >
                    {isChecking ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />} Start Analysis
                  </button>
               </div>
             </div>
           </div>
        </div>
      </section>

      {report && (
        <section className="py-12 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="bg-gradient-to-br from-blue-700 to-emerald-800 p-8 text-white">
                 <div className="flex items-center justify-between flex-wrap gap-4">
                    <h3 className="text-2xl font-extrabold flex items-center gap-3 text-white"><Sparkles className="text-emerald-500" /> Diagnostic Report</h3>
                    <div className="flex items-center gap-2 px-6 py-2 bg-white/10 rounded-full border border-white/20">
                       <span className="text-xs font-bold uppercase">Academic Score:</span>
                       <span className="text-xl font-black text-green-400">{report.score}/100</span>
                    </div>
                 </div>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-slate-100">
                 <div className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl text-center">
                    <ShieldCheck className="text-green-500 mb-3" size={24} />
                    <span className="text-xs font-black uppercase text-slate-400 mb-1">Plagiarism</span>
                    <span className="text-lg font-bold text-slate-800">{report.plagiarism}</span>
                 </div>
                 <div className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl text-center">
                    <AlertTriangle className="text-blue-600 mb-3" size={24} />
                    <span className="text-xs font-black uppercase text-slate-400 mb-1">Grammar Fixes</span>
                    <span className="text-lg font-bold text-slate-800">{report.grammarErrors} Items</span>
                 </div>
                 <div className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl text-center">
                    <CheckCircle2 className="text-blue-500 mb-3" size={24} />
                    <span className="text-xs font-black uppercase text-slate-400 mb-1">Clarity</span>
                    <span className="text-lg font-bold text-slate-800">{report.clarity}</span>
                 </div>
                 <div className="flex flex-col items-center p-6 bg-slate-50 rounded-3xl text-center">
                    <BookOpen className="text-purple-500 mb-3" size={24} />
                    <span className="text-xs font-black uppercase text-slate-400 mb-1">Tone</span>
                    <span className="text-lg font-bold text-slate-800">{report.tone}</span>
                 </div>
              </div>
              <div className="p-10">
                 <h4 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-tighter">Executive Summary</h4>
                 <p className="text-slate-600 font-medium leading-relaxed italic border-l-4 border-emerald-500 pl-6 text-lg">
                    "{report.summary}"
                 </p>
                 <div className="mt-10 flex gap-4">
                    <button className="flex-1 py-4 bg-gradient-to-br from-blue-700 to-emerald-800 text-white rounded-2xl font-bold text-sm shadow-lg hover:shadow-2xl transition-all">Download Detailed PDF Report</button>
                    <button className="flex-1 py-4 bg-slate-100 text-slate-800 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">Order Expert Peer Review</button>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <ProfessionalWriters />
      <HowItWorks />

      {/* SEO Section Styled for consistency */}
      <section className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 leading-tight mb-8">Optimized for <span className="text-emerald-500">Global</span> Academic Standards</h2>
              <div className="prose prose-slate max-w-none text-slate-600 font-medium text-lg leading-relaxed space-y-6">
                 <p>
                   For international scholars across Asia, Europe, and the Americas, academic writing is a critical metric of success. Our essay checker is trained on premium successful submissions to institutions like the Ivy League, Russell Group, and the Group of Eight.
                 </p>
                 <p>
                   Unlike generic spell-checkers, our tool understands academic nuances. It detects dialect differences between US, UK, and Australian English, ensuring your paper meets the local expectations of your university.
                 </p>
              </div>
           </div>
           <div className="grid grid-cols-1 gap-4">
              {[
                { title: "Dialect Detection", desc: "Instantly switches between US, UK, and Australian English standards.", icon: <Quote className="text-emerald-500"/> },
                { title: "Structural Integrity", desc: "Analyzes the link between your thesis and body paragraphs.", icon: <FileText className="text-blue-500"/> },
                { title: "Plagiarism Pre-Check", desc: "Uses our proprietary database to find matches before Turnitin does.", icon: <ShieldCheck className="text-green-500"/> },
                { title: "PhD Review Path", desc: "Send your report directly to a human PhD editor for a final polish.", icon: <Target className="text-red-500"/> },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="mt-1">{item.icon}</div>
                   <div>
                      <h5 className="font-bold text-slate-800">{item.title}</h5>
                      <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />
      <FAQSection />
    </main>
  );
}

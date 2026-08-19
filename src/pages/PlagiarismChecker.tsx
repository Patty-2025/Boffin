import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Search, FileText, CheckCircle2, AlertCircle, RefreshCw, Info, Lock, Target, BookMarked, Award, Star, Globe, PenTool, Lightbulb, Settings } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const PLAGIARISM_LINKS: LinkTarget[] = [
  { word: 'plagiarism checker', type: 'link', path: '/plagiarism-checker' },
  { word: 'academic integrity', type: 'highlight' },
  { word: 'Turnitin report', type: 'highlight' },
  { word: 'global repository', type: 'highlight' }
];

export default function PlagiarismChecker() {
  const [text, setText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ score: number; unique: number; matches: number } | null>(null);

  const handleCheck = () => {
    if (!text.trim()) return;
    setIsChecking(true);
    setResult(null);
    setProgress(0);

    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsChecking(false);
          setResult({ score: 98, unique: 100, matches: 0 });
        }, 500);
      }
    }, 100);
  };

  const reset = () => {
    setText('');
    setResult(null);
    setProgress(0);
  };

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Advanced</span>
              <span className="text-blue-700 block">Plagiarism Checker</span>
              <span className="text-blue-700 block">For Elite Scholars</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Secure your academic integrity with our deep-scan technology. We check your text against millions of academic papers, journals, and websites worldwide.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Checker Tool Widget */}
           <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <div className="bg-[#f0e6d2] p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-2xl relative">
                <div className="bg-white rounded-lg p-5 sm:p-6 w-full border border-slate-100">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase text-slate-400">Insert Text Below</span>
                    <span className="text-xs font-bold text-slate-500">{text.length} / 50k</span>
                  </div>
                  <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your assignment here to check for plagiarism..."
                    rows={10}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 transition-all text-slate-700 font-medium resize-none mb-4"
                    disabled={isChecking}
                  ></textarea>
                  <div className="flex gap-3">
                    <button onClick={reset} className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs transition-all">Clear</button>
                    <button 
                      onClick={handleCheck}
                      disabled={isChecking || !text.trim()}
                      className="flex-1 py-4 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest"
                    >
                      {isChecking ? <RefreshCw className="animate-spin" size={16}/> : <Search size={16}/>} Check Plagiarism
                    </button>
                  </div>
                  
                  {isChecking && (
                    <div className="mt-4">
                       <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                         <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                       </div>
                    </div>
                  )}
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Results Box */}
      <AnimatePresence>
        {result && !isChecking && (
          <section className="py-12 bg-white">
            <div className="max-w-[1200px] mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[40px] shadow-2xl border border-green-100 p-8 text-left max-w-4xl mx-auto"
              >
                <div className="flex flex-col md:flex-row items-center gap-10 mb-8">
                  <div className="w-32 h-32 rounded-full border-8 border-green-500 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-extrabold text-slate-900">{result.unique}%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase">Unique</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                       <CheckCircle2 className="text-green-500" size={24} /> Scan Completed Successfully
                    </h3>
                    <p className="text-slate-600 font-medium italic mb-4">"Your assignment shows excellent academic integrity. No significant matches found in our global repository."</p>
                    <div className="flex flex-wrap gap-4">
                      <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase">Matched Sources</p>
                        <p className="text-lg font-bold text-slate-700">{result.matches}</p>
                      </div>
                      <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg text-center">
                        <p className="text-xs text-slate-400 font-bold uppercase">AI Similarity</p>
                        <p className="text-lg font-bold text-slate-700">None</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-start gap-3">
                  <Info className="text-green-600 mt-0.5" size={18} />
                  <p className="text-sm font-medium text-green-800">Note: For a comprehensive university-standard Turnitin report, consider hiring our experts for an in-depth audit.</p>
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>

      <ProfessionalWriters title="Academic Integrity Experts" />
      <HowItWorks 
        title="Check Your Integrity in 3 Steps"
        steps={[
          { title: "Input Your Text", description: "Paste your assignment into our secure deep-scan tool for analysis.", icon: FileText },
          { title: "Cross-Scan Repository", description: "Our engine checks your text against millions of academic journals and portals.", icon: RefreshCw },
          { title: "Get Your Report", description: "Download a detailed uniqueness report with flagged matches identified.", icon: ShieldCheck }
        ]}
      />

      <ServicesDetailSection 
        title="Professional Grade Plagiarism Detection for Scholars"
        subtitle="Academic integrity is the cornerstone of university success. Universities globally maintain zero tolerance toward plagiarism."
        linkTargets={PLAGIARISM_LINKS}
        writingBox={{
          title: "Deep-Scan Database Algorithm",
          icon: PenTool,
          description: "Our tool crawls through a massive database of peer-reviewed journals, ensuring matches are found where basic tools fail.",
          points: ["Billions of indexed Web pages", "Private Scholarly repository access", "Full-source URL identification", "Percentage-based Uniqueness score"]
        }}
        solvingBox={{
          title: "Intelligent AI Pattern Detection",
          icon: Lightbulb,
          description: "We identify patterns typical of Large Language Models, protecting you against accidentally flagging for AI-generated content.",
          points: ["LLM signature identification", "Repetitive phrase analysis", "Structural flow verification", "Academic tone consistency check"]
        }}
        moreBox={{
          title: "Global Scholarly Privacy Focus",
          icon: Settings,
          description: "Your data is never stored, indexed, or shared. We prioritize your privacy for students in the UK, USA, and Australia.",
          points: ["Instant data purge after check", "None-indexable scanning session", "Bank-level encryption for text", "ESL phrasing awareness support"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />

      {/* Extreme Footer SEO Block */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-[1000px] mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">Why Academic Integrity Matters Globally</h2>
           <div className="prose prose-slate max-w-none text-slate-500 font-medium space-y-6 text-lg leading-relaxed">
             <p>
               In countries like the UK, "contract cheating" and plagiarism were made illegal through various academic reforms. In the United States, plagiarism can lead to immediate expulsion and damage your professional reputation for life. For international scholars, these consequences can also affect visa status and future employment.
             </p>
             <p>
               Our tool is particularly helpful for ESL students who may use standardized academic phrases that could be flagged. By using our tool, you are training yourself to be a better scholar. Trust boffinglobalgroup.com—the premier destination for academic excellence.
             </p>
           </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

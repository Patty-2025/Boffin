import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, Zap, Sparkles, Hash, Target, Info, RefreshCw, ArrowRight, Brain, Boxes, PenTool, Lightbulb, Settings, Globe } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import TrustedLogos from '../components/TrustedLogos';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const FACTORING_LINKS: LinkTarget[] = [
  { word: 'factoring calculator', type: 'link', path: '/factoring-calculator' },
  { word: 'step-by-step resolution', type: 'highlight' },
  { word: 'STEM success', type: 'highlight' },
  { word: 'math expert', type: 'link', path: '/programming-help' }
];

export default function FactoringCalculator() {
  const [equation, setEquation] = useState('');
  const [isSolving, setIsSolving] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSolve = () => {
    if (!equation.trim()) return;
    setIsSolving(true);
    setResult(null);

    // Simulate solving logic
    setTimeout(() => {
      setResult("Factors found: (x + 3)(x - 2). Step-by-step resolution: Identifying the common denominators and applying the quadratic formula resulted in these prime factors.");
      setIsSolving(false);
    }, 1200);
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
              <span className="text-blue-700 block">Factoring</span>
              <span className="text-blue-700 block">Calculator</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Solve complex algebraic expressions, polynomials, and trinomials instantly. Get step-by-step factoring solutions for university-level mathematics.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Calculator Widget */}
           <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <div className="bg-[#f0e6d2] p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-2xl">
               <div className="bg-white rounded-lg p-5 sm:p-6 w-full border border-slate-100">
                  <div className="text-left mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Enter Algebra Expression</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <input 
                      type="text" 
                      value={equation}
                      onChange={(e) => setEquation(e.target.value)}
                      placeholder="e.g., x^2 + x - 6"
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-emerald-500 transition-all font-mono font-bold text-lg"
                    />
                    <button 
                      onClick={handleSolve}
                      disabled={isSolving || !equation.trim()}
                      className="w-full py-4 bg-gradient-to-br from-blue-700 to-emerald-800 text-white rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-lg hover:bg-emerald-500 transition-all"
                    >
                      {isSolving ? <RefreshCw className="animate-spin" size={20} /> : <Zap size={20} />} Factorize Now
                    </button>
                  </div>

                  <AnimatePresence>
                    {result && (
                      <motion.div 
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         className="mt-6 p-6 bg-slate-900 rounded-xl text-left border-l-4 border-l-green-500"
                      >
                         <div className="flex items-center gap-2 mb-2">
                            <Sparkles size={14} className="text-green-500" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Solution Found</span>
                         </div>
                         <p className="text-lg font-mono font-bold text-white mb-2">{result.split('.')[0]}</p>
                         <p className="text-xs text-slate-400 leading-relaxed italic">{result.split('.')[1]}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </div>
             </div>
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Top Math & STEM Tutors" />
      <HowItWorks 
        title="Find Prime Factors in Seconds"
        steps={[
          { title: "Input Expression", description: "Enter your algebraic expression, trinomial, or polynomial into the solver.", icon: Calculator },
          { title: "Smart Decomposition", description: "Our engine identifies the GCF and applies the quadratic formula for resolution.", icon: Zap },
          { title: "Review Solution", description: "Get a clear, step-by-step resolution that shows you exactly how the factors were found.", icon: Sparkles }
        ]}
      />

      <ServicesDetailSection 
        title="Master Complex Algebra with Step-by-Step Factoring"
        subtitle="Factoring is a fundamental skill for STEM success. Our tool helps you visualize the decomposition of complex polynomials."
        linkTargets={FACTORING_LINKS}
        writingBox={{
          title: "Intensive Algebraic Analysis",
          icon: PenTool,
          description: "We handle the heavy lifting of GCF identification and multi-method factoring for university-level challenges.",
          points: ["GCF & Grouping identification", "Difference of Squares resolution", "Trinomial factoring accuracy", "Higher-degree polynomial analysis"]
        }}
        solvingBox={{
          title: "Multi-Region STEM Support",
          icon: Globe,
          theme: 'accent',
          description: "Whether you are studying in the US, UK, Australia, or Asia, our solver meets global coordinate and math standards.",
          points: ["UK GCSE & A-Level math focus", "US Common Core & SAT alignment", "Australian Tertiary STEM standard", "Contextual step-by-step explanations"]
        }}
        moreBox={{
          title: "Human Math Expert Backup",
          icon: Settings,
          description: "Our tool handles the basic algebra, but our PhD experts handle Calculus, Statistics, and Physics for your projects.",
          points: ["Hire a Math Expert 24/7 button", "Direct support for complex proofs", "Unlimited math revisions focus", "Total accuracy and integrity assure"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />
      <FAQSection />
    </main>
  );
}

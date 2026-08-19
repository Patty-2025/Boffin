import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, CornerUpLeft, BookOpen, Clock, FileText, Target, Info, MessageSquare, ArrowRight, RefreshCw, PenLine, ShieldCheck, Sparkles, Languages, Lock, Globe, PenTool, Lightbulb, Settings } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const PARAPHRASE_LINKS: LinkTarget[] = [
  { word: 'paraphrasing tool', type: 'link', path: '/paraphrasing-tool' },
  { word: 'academic rewriter', type: 'highlight' },
  { word: 'scholarly voice', type: 'highlight' },
  { word: 'fair use', type: 'highlight' }
];

const modes = [
  { id: 'standard', name: 'Standard', desc: 'Reliable rewriting for clarity' },
  { id: 'academic', name: 'Academic', desc: 'Scholarly tone and terminology' },
  { id: 'creative', name: 'Creative', desc: 'Expanded vocabulary and flow' },
  { id: 'short', name: 'Shorten', desc: 'Condensed for better impact' }
];

export default function ParaphrasingTool() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMode, setActiveMode] = useState('academic');

  const handleParaphrase = () => {
    if (!inputText.trim()) return;
    setIsProcessing(true);
    
    // Simulating API processing
    setTimeout(() => {
      const phrases = inputText.split('.');
      const reformulated = phrases.map(p => {
        if (!p.trim()) return '';
        // Simple mock transformation
        return "The original concepts suggesting " + p.trim().toLowerCase() + " have been reformulated to maintain a sophisticated academic standard while preserving the intended meaning.";
      }).join('. ');
      
      setOutputText(reformulated);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Academic</span>
              <span className="text-blue-700 block">Paraphrasing Tool</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Restructure sentences while preserving their core meaning. Our AI-driven professional rewriter helps you avoid plagiarism instantly.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Paraphrase Tool Widget */}
           <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <div className="bg-[#f0e6d2] p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-2xl relative">
                <div className="bg-white rounded-lg p-5 sm:p-6 w-full border border-slate-100">
                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {modes.map(mode => (
                      <button 
                        key={mode.id}
                        onClick={() => setActiveMode(mode.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all border ${
                          activeMode === mode.id 
                          ? 'bg-gradient-to-br from-blue-700 to-emerald-800 text-white border-blue-700' 
                          : 'bg-white text-slate-500 border-slate-200'
                        }`}
                      >
                        {mode.name}
                      </button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase text-slate-400">Source</span>
                        <button onClick={() => setInputText('')} className="text-xs font-bold text-slate-400 hover:text-emerald-500 uppercase">Reset</button>
                      </div>
                      <textarea 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Paste text here..."
                        className="w-full h-48 sm:h-64 p-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 transition-all text-xs font-medium resize-none"
                        disabled={isProcessing}
                      ></textarea>
                    </div>
                    <div className="flex flex-col">
                       <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase text-slate-400">Rewritten</span>
                        {outputText && <button className="text-xs font-bold text-emerald-500 uppercase">Copy</button>}
                      </div>
                      <div className="flex-1 w-full h-48 sm:h-64 p-4 bg-[#f8f9fa] border border-slate-200 rounded-lg text-xs font-medium overflow-y-auto leading-relaxed italic">
                        {isProcessing ? (
                          <div className="space-y-3 animate-pulse pt-2">
                            <div className="h-2 bg-slate-200 rounded w-full"></div>
                            <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                            <div className="h-2 bg-slate-200 rounded w-full"></div>
                          </div>
                        ) : outputText || <span className="text-slate-400">Your paraphrased text will appear here...</span>}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button 
                      onClick={handleParaphrase}
                      disabled={isProcessing || !inputText.trim()}
                      className="w-full py-4 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl font-extrabold flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-[2px] text-xs"
                    >
                      {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />} Paraphrase Academic Text
                    </button>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Linguistic Experts & Proofreaders" />
      <HowItWorks 
        title="Rewrite with Scholar-Level Precision"
        steps={[
          { title: "Insert Your Text", description: "Paste the sentences or paragraphs you want to reformulate into the source box.", icon: FileText },
          { title: "Select Your Mode", description: "Choose 'Academic' for scholarly tone or 'Standard' for general clarity improvements.", icon: RotateCw },
          { title: "Generate & Copy", description: "Review the rewritten text in the output box and copy it directly to your document.", icon: Sparkles }
        ]}
      />

      <ServicesDetailSection 
        title="Elevate Your Writing with Professional Paraphrasing"
        subtitle="Avoiding plagiarism is more than passing software; it's about demonstrating your ability to synthesize knowledge in your scholarly voice."
        linkTargets={PARAPHRASE_LINKS}
        writingBox={{
          title: "Academic Precision & Flow",
          icon: PenTool,
          description: "Our rewriter helps you find the right words, using an advanced contextual engine that understands complex jargon.",
          points: ["Maintains formal scholarly tone", "Scholarly vocabulary enrichment", "Context-aware term replacement", "Syntactic variety for flow"]
        }}
        solvingBox={{
          title: "Multi-Dialect & Global Standards",
          icon: Globe,
          theme: 'accent',
          description: "We support US, UK, and Australian English standards, ensuring your work aligns with regional university requirements.",
          points: ["British vs American style toggle", "Regional spelling consistency", "Global university rubric focus", "Cultural context awareness"]
        }}
        moreBox={{
          title: "AI Integrity & Secure Policy",
          icon: Lock,
          description: "Enhance your writing flow while maintaining total privacy. Your data is 100% secure and never saved locally or indexed.",
          points: ["Total Privacy with zero storage", "Non-indexable session security", "Bypass basic AI detection flow", "Ethics-first paraphrasing focus"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />

      {/* Extreme Footer SEO Block */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-[1000px] mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">When Should You Use a Paraphrasing Tool?</h2>
           <div className="prose prose-slate max-w-none text-slate-500 font-medium space-y-6 text-lg leading-relaxed">
             <p>
               Ethical paraphrasing is a skill every scholar must master. You should use our rewriter when you have a direct quote that is too long or when you want to summarize the findings of a research paper in a more condensed and original way. It's particularly useful during the literature review stage of your dissertation.
             </p>
             <p>
               At boffinglobalgroup.com, we believe in the "Fair Use" of technology. Our goal is to provide you with the resources to be a better writer and a more ethical academician. Trust our global platform for all your academic needs.
             </p>
           </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

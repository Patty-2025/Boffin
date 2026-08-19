import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Keyboard, Zap, Sparkles, BookOpen, Clock, FileText, Target, Info, MessageSquare, ArrowRight, RefreshCw, PenLine, Globe, Lock, ShieldCheck, PenTool, Lightbulb, Settings } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const ESSAY_TYPER_LINKS: LinkTarget[] = [
  { word: 'essay typer', type: 'link', path: '/essay-typer' },
  { word: 'academic discipline', type: 'highlight' },
  { word: 'bespoke draft', type: 'highlight' },
  { word: 'brainstorming partner', type: 'highlight' }
];

export default function EssayTyper() {
  const [topic, setTopic] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [content, setContent] = useState('');
  const [showDraft, setShowDraft] = useState(false);

  const mockDrafts = {
    "Artificial Intelligence": "Artificial Intelligence (AI) has rapidly transformed from a futuristic concept into an integral part of modern society. From healthcare diagnostics to autonomous vehicles, AI systems are revolutionizing how we solve complex problems. However, this progress also brings significant ethical challenges, including data privacy concerns and the potential for algorithmic bias...",
    "Climate Change": "Climate change remains the most pressing global challenge of the 21st century. Scientific consensus indicates that human activities, particularly the emission of greenhouse gases, are the primary drivers of rising global temperatures. The consequences are already visible: melting polar ice caps, extreme weather events, and shifting ecosystems that threaten biodiversity...",
    "Globalization": "Globalization is a multifaceted phenomenon that has reshaped international relations, economics, and culture over the past several decades. While it has facilitated unprecedented economic growth and technological exchange, it has also led to concerns regarding the erosion of local cultures and the widening gap between developed and developing nations..."
  };

  const handleStartTyping = () => {
    if (!topic.trim()) return;
    setIsTyping(true);
    setContent('');
    setShowDraft(false);

    // Simulate typing
    let i = 0;
    const fullText = mockDrafts[topic as keyof typeof mockDrafts] || "Searching for high-quality academic data for " + topic + "... Our AI-powered engine is scanning millions of academic repositories to provide you with the best structure and key points for your essay. Please wait while we synthesize your bespoke draft based on global academic standards.";
    
    const interval = setInterval(() => {
      setContent(fullText.substring(0, i));
      i += 5;
      if (i > fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
        setShowDraft(true);
      }
    }, 30);
  };

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Automatic</span>
              <span className="text-blue-700 block">Essay Typer Tool</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Stuck with writer's block? Enter your topic and let our intelligent engine generate structured drafts and key points for your papers.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Typing Tool Widget */}
           <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <div className="bg-[#f0e6d2] p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-2xl relative border border-slate-100">
                <div className="bg-white rounded-lg p-5 sm:p-6 w-full border border-slate-100">
                   <div className="flex flex-col sm:flex-row gap-2 mb-4">
                     <input 
                       type="text" 
                       value={topic}
                       onChange={(e) => setTopic(e.target.value)}
                       placeholder="Essay Topic (e.g., AI in Healthcare)"
                       className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 transition-all text-xs font-bold"
                     />
                     <button 
                        onClick={handleStartTyping}
                        disabled={isTyping}
                        className="py-3 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white px-8 rounded-lg font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2"
                     >
                       {isTyping ? <RefreshCw className="animate-spin" size={14}/> : <Zap size={14}/>} Start
                     </button>
                   </div>

                   <div className="bg-slate-900 rounded-xl p-4 min-h-[250px] relative overflow-hidden">
                      <div className="flex gap-1.5 mb-3">
                         <div className="w-2 h-2 rounded-full bg-red-400"></div>
                         <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                         <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      </div>
                      <div className="text-xs font-mono text-emerald-400 leading-relaxed overflow-y-auto max-h-[180px]">
                         {content}
                         <span className="w-1.5 h-3.5 bg-emerald-400 inline-block align-middle ml-1 animate-pulse"></span>
                      </div>
                   </div>

                   {showDraft && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg flex gap-3 items-start">
                       <Info size={14} className="text-blue-500 mt-1 shrink-0" />
                       <p className="text-xs text-blue-700 font-medium leading-relaxed uppercase">Draft Generated: Use for inspiration and educational purposes only.</p>
                    </motion.div>
                   )}
                </div>
             </div>
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Premium Essay Consultants" />
      <HowItWorks 
        title="From Topic to Draft in Seconds"
        steps={[
          { title: "Define Your Topic", description: "Enter your essay prompt or a broad subject of interest in the input field.", icon: Keyboard },
          { title: "Watch the Magic", description: "Our intelligent engine analyzes millions of repositories to type out a structured academic draft.", icon: Zap },
          { title: "Review & Refine", description: "Use the generated content as a bespoke draft to spark your own research and final writing.", icon: Sparkles }
        ]}
      />

      <ServicesDetailSection 
        title="Master the Art of Writing with Our Intelligent Essay Typer"
        subtitle="Writing can be a draining academic task. Our tool acts as your ultimate brainstorming partner to overcome writers block."
        linkTargets={ESSAY_TYPER_LINKS}
        writingBox={{
          title: "Instant Outlines & Structure",
          icon: PenTool,
          description: "We help you discover the perfect structure for your paper, from the opening hook to the final concluding insights.",
          points: ["Complete structural breakdowns", "Hook and Thesis statement ideas", "Logical evidence progression", "Summarizing major findings"]
        }}
        solvingBox={{
          title: "Contextual Academic Vocabulary",
          icon: Lightbulb,
          description: "Our engine suggests professional academic terms specific to your discipline, helping international scholars sound native.",
          points: ["Subject-specialist terminology", "Formal academic transition phrases", "Context-aware descriptive terms", "Varied sentence architecture"]
        }}
        moreBox={{
          title: "Deadline & Resource Fighting",
          icon: Settings,
          description: "Save hours of searching for standard definitions and general concepts. Focus your energy on the final refinements.",
          points: ["Rapid concept explanation drafting", "Standard argument identification", "Global university style alignment", "Initial research inertia breaker"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />

      {/* Extreme Footer SEO Block */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-[1000px] mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">Your Companion for Academic Excellence</h2>
           <div className="prose prose-slate max-w-none text-slate-500 font-medium space-y-6 text-lg leading-relaxed">
             <p>
               For international scholars, the "Online Essay Typer" is a valuable bridge to native-level academic fluency. It helps you discover formal academic vocabulary and correct sentence structures that are standard in prestigious universities worldwide.
             </p>
             <p>
               At boffinglobalgroup.com, we empower you to build your own scholarly voice. While our tool provides the spark, your intelligence and research provide the fire that leads to outstanding academic achievements.
             </p>
           </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

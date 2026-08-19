import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Zap, Sparkles, BookOpen, Clock, Target, Info, RefreshCw, ArrowRight, ShieldCheck, Upload, Download, Globe, Lock, PenTool, Lightbulb, Settings } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const PDF_SUMMARIZER_LINKS: LinkTarget[] = [
  { word: 'pdf summarizer', type: 'link', path: '/pdf-summarizer' },
  { word: 'key arguments', type: 'highlight' },
  { word: 'cognitive load', type: 'highlight' },
  { word: 'scholarly journey', type: 'highlight' }
];

export default function PdfSummarizer() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
       setFileName(file.name);
       setIsProcessing(true);
       setSummary(null);

       setTimeout(() => {
          setSummary("Summary Analysis: The uploaded academic document discusses the intersection of socio-economic factors and educational outcomes in developing regions. Key themes identified include resource allocation, infrastructure development, and the role of international aide in bridging the digital divide. The author concludes that sustainable growth is predicated on equitable access to foundational learning resources.");
          setIsProcessing(false);
       }, 2000);
    } else {
       alert("Please upload a valid PDF file.");
    }
  };

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      {/* Hero Section Container */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-10 pb-16 overflow-hidden border-b border-slate-800">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-10 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-5">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-teal-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm">
              <Sparkles size={16} className="text-amber-400" />
              <span>AI Academic Reading Assistant</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.10]">
              <span className="text-amber-400 block">Smart AI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 block">PDF Summarizer</span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Save hours of dense reading. Upload your research papers, journals, or long articles and extract key arguments and insights instantly.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Upload Tool Widget */}
           <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <div className="bg-gradient-to-br from-amber-500/20 via-teal-500/20 to-indigo-500/20 p-1.5 rounded-2xl shadow-2xl w-full max-w-2xl relative">
                <div className="bg-slate-900 rounded-xl p-6 w-full border border-slate-800 text-white">
                  <div className="relative border-2 border-dashed border-slate-700 bg-slate-950/60 rounded-xl p-8 flex flex-col items-center justify-center transition-all hover:border-amber-500 hover:bg-slate-950 group">
                    <input 
                      type="file" 
                      accept=".pdf"
                      onChange={handleUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={28} />
                    </div>
                    <p className="text-sm font-bold text-slate-200 mb-1">{fileName || "Click or drop to upload your PDF paper"}</p>
                    <p className="text-[11px] text-amber-400 font-extrabold uppercase tracking-widest">Supports PDFs up to 25MB</p>
                  </div>

                  <AnimatePresence>
                    {isProcessing && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 text-center"
                      >
                         <div className="flex items-center justify-center gap-2 text-amber-400 mb-3">
                            <RefreshCw className="animate-spin" size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">Analyzing Research Paper...</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div className="h-full bg-gradient-to-r from-amber-500 to-teal-400" initial={{width: 0}} animate={{width: '100%'}} transition={{duration: 2}} />
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {summary && !isProcessing && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-5 bg-slate-950 rounded-xl border border-slate-800 text-slate-200"
                    >
                      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
                        <span className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                          <Sparkles size={14} /> Key Academic Findings
                        </span>
                        <button className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1">
                          <Download size={14} /> Save Summary
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-medium">{summary}</p>
                    </motion.div>
                  )}
                </div>
             </div>
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Academic Research Specialists" />
      <HowItWorks 
        title="Distill Complex Data Instantly"
        steps={[
          { title: "Upload Your PDF", description: "Drag and drop your research paper or journal article. We support files up to 25MB.", icon: Upload },
          { title: "Smart Analysis", description: "Our AI engine analyzes the structural hierarchy and identifies the most critical arguments.", icon: Sparkles },
          { title: "Get Your Brief", description: "Review and download a concise internal summary of the most foundational learning resources.", icon: FileText }
        ]}
      />

      <ServicesDetailSection 
        title="Elevate Your Reading with Intelligent AI Summarization"
        subtitle="International students are often bombarded with a massive cognitive load of reading material. Our tool acts as your intelligent filter."
        linkTargets={PDF_SUMMARIZER_LINKS}
        writingBox={{
          title: "Thematic Key Findings Extraction",
          icon: Target,
          description: "We focus on the methodology and core results of scholars, ensuring you don't miss the fundamental breakthrough points.",
          points: ["Automated Methodology identification", "Core Results & Data summary", "Thesis & Conclusion brief drafting", "Key argument hierarchy mapping"]
        }}
        solvingBox={{
          title: "In-Depth Structural Hierarchical Logic",
          icon: Lightbulb,
          description: "Our technology analyzes how the author builds their case, identifying the foundational pillars of every complex scholarly journal.",
          points: ["Pillar-based argument extraction", "Contextual background simplification", "Resource allocation theme analysis", "Logical progression verification"]
        }}
        moreBox={{
          title: "Zero-Storage Privacy Protocols",
          icon: Lock,
          description: "Your academic integrity and privacy are paramount. We process everything in secure RAM and never save your data locally.",
          points: ["Secure RAM-only processing focus", "Instant post-summarization cleaning", "Identity-protected research assist", "University-grade encryption for all files"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />

      {/* Extreme Footer SEO Block */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-[1000px] mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">Efficient Reading for International Students</h2>
           <div className="prose prose-slate max-w-none text-slate-500 font-medium space-y-6 text-lg leading-relaxed">
             <p>
               Whether you're in Canada studying Environmental Science or in Singapore analyzing International Trade, our tool handles documents in various professional formats. We prioritize your privacy above all else in this digital era.
             </p>
             <p>
               Every scholar knows that time is the most valuable asset. Spend less time reading irrelevant data and more time synthesizing breakthrough ideas with boffinglobalgroup.com summaries.
             </p>
           </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Book, Globe, Search, RefreshCw, FileText, CheckCircle2, Info, ArrowRight, Share2, Copy, Lock, Star, Award, Settings } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import SEO from '../components/SEO';
import { LinkTarget } from '../lib/linkUtils';

const styles = [
  { id: 'apa', name: 'APA 7th Edition', desc: 'Social Sciences, Education' },
  { id: 'mla', name: 'MLA 9th Edition', desc: 'Humanities, Literature' },
  { id: 'harvard', name: 'Harvard', desc: 'Business, International' },
  { id: 'chicago', name: 'Chicago', desc: 'History, Arts' }
];

const CITATIONS_LINKS: LinkTarget[] = [
  { word: 'citation generator', type: 'link', path: '/citation-generator' },
  { word: 'academic integrity', type: 'highlight' },
  { word: 'APA 7th Edition', type: 'highlight' },
  { word: 'MLA 9th Edition', type: 'highlight' }
];

const sourceTypes = [
  { id: 'website', name: 'Website', icon: <Globe size={18} /> },
  { id: 'book', name: 'Book', icon: <Book size={18} /> },
  { id: 'journal', name: 'Journal', icon: <FileText size={18} /> }
];

export default function CitationGenerator() {
  const [activeStyle, setActiveStyle] = useState('apa');
  const [sourceType, setSourceType] = useState('website');
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [citation, setCitation] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!url.trim()) return;
    setIsGenerating(true);
    setCitation(null);

    // Simulate generation
    setTimeout(() => {
      let result = "";
      if (activeStyle === 'apa') {
        result = "Boffin Global Services. (2026). Global Academic Standards and Citation. Retrieved from https://boffinglobalgroup.com/resource";
      } else if (activeStyle === 'mla') {
        result = "Boffin Global Services. \"Global Academic Standards and Citation.\" Boffin Global Services, 2026, https://boffinglobalgroup.com/resource.";
      } else {
        result = "Boffin Global Services (2026) 'Global Academic Standards and Citation', Boffin Global Services [Online]. Available at: https://boffinglobalgroup.com/resource (Accessed: April 2026).";
      }
      setCitation(result);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Free Citation Generator | APA, MLA, Harvard Reference Maker"
        description="Create accurate citations in APA 7th, MLA 9th, Harvard, or Chicago styles instantly. Ensure academic integrity with our professional citation generator."
        keywords="citation generator, reference maker, APA citation, MLA citation, harvard referencing"
        canonicalUrl="/citation-generator"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Automatic</span>
              <span className="text-blue-700 block">Citation Generator</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Create accurate citations in APA, MLA, Harvard, or Chicago styles instantly. Ensure academic integrity with our professional tool.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Generator Widget */}
           <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <div className="bg-[#f0e6d2] p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-2xl relative border border-slate-100">
                <div className="bg-white rounded-lg p-5 sm:p-6 w-full border border-slate-100">
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {sourceTypes.map(type => (
                      <button 
                         key={type.id}
                         onClick={() => setSourceType(type.id)}
                         className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all border ${
                           sourceType === type.id 
                           ? 'bg-gradient-to-br from-blue-700 to-emerald-800 text-white border-blue-700' 
                           : 'bg-white text-slate-500 border-slate-200'
                         }`}
                      >
                         {type.name}
                      </button>
                    ))}
                  </div>

                  <div className="relative mb-4">
                    <input 
                       type="text" 
                       value={url}
                       onChange={(e) => setUrl(e.target.value)}
                       placeholder={`Paste your ${sourceType} URL or title...`}
                       className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:border-emerald-500 transition-all font-bold text-xs"
                    />
                    <Search className="absolute right-4 top-4 text-slate-300" size={18} />
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {styles.map(style => (
                      <button 
                        key={style.id}
                        onClick={() => setActiveStyle(style.id)}
                        className={`px-3 py-1.5 rounded-md text-xs font-black uppercase border transition-all ${
                          activeStyle === style.id 
                          ? 'bg-blue-50 border-blue-200 text-blue-700' 
                          : 'bg-white border-transparent text-slate-400'
                        }`}
                      >
                        {style.id}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating || !url.trim()}
                    className="w-full py-4 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl font-extrabold flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 transition-all uppercase tracking-widest text-xs"
                  >
                    {isGenerating ? <RefreshCw className="animate-spin" size={18} /> : <Quote size={18} />} Generate Citation
                  </button>

                  <AnimatePresence>
                    {citation && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-5 bg-[#f8f9fa] border-l-4 border-emerald-500 rounded-r-xl"
                      >
                        <p className="text-xs font-black text-slate-400 uppercase mb-2">Result</p>
                        <p className="text-xs text-slate-700 font-medium leading-relaxed italic mb-4">{citation}</p>
                        <button className="flex items-center gap-2 text-emerald-500 text-xs font-black uppercase transition-all hover:gap-3">
                          <Copy size={12} /> Copy Citation
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
             </div>
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Academic Formatting Specialists" />
      <HowItWorks 
        title="Accuracy at Your Fingertips"
        steps={[
          { title: "Choose Source & Style", description: "Select your source type (Website, Book, Journal) and your required formatting style.", icon: Search },
          { title: "Input Basic Details", description: "Paste the URL, ISBN, or DOI. Our smart system crawls databases to find accurate metadata.", icon: FileText },
          { title: "Generate & Use", description: "Copy your perfectly formatted citation directly into your reference list or bibliography.", icon: Quote }
        ]}
      />

      <ServicesDetailSection 
        title="Beyond Basic Bibliographies"
        subtitle="Automatic and accurate citation is the foundation of academic integrity. Our tool supports the world's most rigorous scholarship standards."
        linkTargets={CITATIONS_LINKS}
        writingBox={{
          title: "Complex Style Adherence",
          icon: Book,
          description: "We don't just provide generic formats. We strictly follow the latest manuals for APA 7th, MLA 9th, and Harvard standards.",
          points: ["APA 7th Edition precision", "MLA 9th Edition literary focus", "Harvard Global standard referencing", "Chicago Manual of Style accuracy"]
        }}
        solvingBox={{
          title: "Multi-Source Synchronization",
          icon: Globe,
          description: "Whether it is a legal document, a technical journal, or a digital blog, we ensure your citations are accurate for every source type.",
          points: ["Peer-reviewed Journal article scraping", "Book ISBN and Chapter detection", "Website & Online repository analysis", "Legal Case & Report formatting"]
        }}
        moreBox={{
          title: "Academic Integrity Shield",
          icon: Lock,
          description: "Avoid plagiarism and academic misconduct charges with perfectly formatted in-text and whole-cite references.",
          points: ["Plagiarism-free referencing focus", "In-text citation matching help", "Bibliography & Works Cited cleanup", "University rubric compliance verify"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />

      {/* Extreme Footer SEO Block */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-[1000px] mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">Mastering Your University Reference List</h2>
           <div className="prose prose-slate max-w-none text-slate-500 font-medium space-y-6 text-lg leading-relaxed">
             <p>
               Every university assessment rubric allocates marks for "Presentation and Referencing." Using our tool ensures that every comma, italics, and period is in the right place according to the latest style guides. This attention to detail can significantly impact your final grade.
             </p>
             <p>
               Academic success is built on the shoulders of giants. Proper citation is how you respect those giants while building your own scholarly reputation. Let boffinglobalgroup.com be your companion in this journey towards academic perfection across the globe.
             </p>
           </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

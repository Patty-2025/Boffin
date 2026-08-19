import React, { useRef, useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const renderParagraphWithLinks = (text: string, seenWords: Set<string>) => {
  const targets = [
    { word: 'editing help', type: 'link', path: '/essay-editing-service' },
    { word: 'thesis', type: 'link', path: '/dissertation-help-service' },
    { word: 'case study', type: 'link', path: '/service/case-study' },
    { word: 'reports', type: 'link', path: '/service/reports' },
    { word: 'research', type: 'link', path: '/research-paper-service' },
    { word: 'team of professional', type: 'link', path: '/experts' },
    { word: 'assignment help online', type: 'link', path: '/' },
    { word: 'best assignment help website', type: 'link', path: '/' }
  ];

  const regex = /(editing help|thesis|case study|reports|research|team of professional|assignment help online|best assignment help website)/gi;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    const lowerPart = part.toLowerCase();
    const target = targets.find(t => t.word === lowerPart);

    if (target) {
      if (!seenWords.has(target.word)) {
        seenWords.add(target.word);
        
        if (target.type === 'highlight') {
          return <span key={i} className="text-emerald-500">{part}</span>;
        } else if (target.type === 'link') {
          return (
            <Link key={i} to={target.path!} className="text-emerald-500 hover:underline font-semibold cursor-pointer">
              {part}
            </Link>
          );
        }
      } else {
        return <React.Fragment key={i}>{part}</React.Fragment>;
      }
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
};

interface Section {
  title: string;
  content: string[];
}

interface TableRow {
  feature: string;
  column1: string;
  column2: string;
  column3: string;
}

interface ComparisonSectionProps {
  title?: string;
  tableHeaders?: string[];
  tableRows?: TableRow[];
  leftSectionsContent?: Section[];
  rightSectionsContent?: Section[];
}

const defaultTableHeaders = ["Feature", "Boffin Global Services", "General Tutoring", "AI Coding Tools"];
const defaultTableRows: TableRow[] = [
  { feature: "Expertise", column1: "Verified Engineers & Data Scientists", column2: "General Academia", column3: "Algorithmic Guesswork" },
  { feature: "Reliability", column1: "100% Executable & Tested", column2: "Often buggy", column3: "High risk of hallucinated logic" },
  { feature: "Availability", column1: "24/7 Technical Support", column2: "Limited hours", column3: "Instant but Unreliable" },
  { feature: "Explanations", column1: "Step-by-step logic breakdown", column2: "Surface level", column3: "Pattern-based only" }
];

const leftSections = [
  {
    title: "Tailored Technical Success: From Code Debugging to Complex Engineering Models",
    content: [
      "Navigating the daily academic demands of technical degrees requires more than just time—it requires expertise. Boffin Global Services extends its support to complex fields, offering specialized guidance for students tackling tricky software setups, data analysis pipelines, and structural designs.",
      "We recognize that your needs change depending on your environment. That’s why our PhD experts and engineers customize every project to ensure it matches the specific software versions, formatting, and mathematical rigor required for your degree.",
      "Verified Success Story: “Best service for Computer Science students. My code was perfectly optimized and passed all unit tests!” — Verified Student",
      "Engineering Junior: “I was overwhelmed with my CAD modeling assignment, but this service paired me with a mechanical engineer who guided me through the constraints perfectly. It was a grade-saver!”"
    ]
  },
  {
    title: "Can I Get Help with Programming and Data Analysis? Hire Global Experts",
    content: [
      "The question “Can I find an expert to help me debug my code or analyze my dataset?” is one that every STEM student asks when facing steep learning curves. The good news is, yes, you can! Boffin Global Services provides secure, clear, and cost-effective means to get your technical work guided by professionals.",
      "When it comes to a difficult algorithm or a buggy dataset, we make it easy to “hire a technical expert” so you can focus on broader concepts rather than getting stuck on syntax. Just let us know what you need, and our specialists will dive in.",
      "Our experts can guide you through complex Matlab simulations, R programming statistical tests, or complete software architecture planning, providing completely original, tested, and thoroughly documented solutions within your deadline."
    ]
  }
];

const rightSections = [
  {
    title: "Why Do Students Need Technical Support from Experts?",
    content: [
      "Engineering, Statistics, and Computer Science students have numerous academic hurdles to overcome, including tricky software requirements, impossible-to-find bugs, and clashing deadlines. In such stressful times, technical academic support has emerged as a reliable companion for students who seek assistance.",
      "Access to dependable educational assistance is critical when dealing with strictly defined rubrics. Our professional engineers and data scientists are well aware of different university norms and best practices in coding and analysis. If you are struggling with a simulation or statistical test, our expert services can help you.",
      "Unlike standard tutoring mills, Boffin Global Services provides specialized help for specific software environments (SPSS, AutoCAD, SolidWorks, Python). Students who need guidance for immediate submission or have broken code on their hands can count on us for quick and reliable fixes."
    ]
  },
  {
    title: "From Broken Code to Deadline: The Ultimate Technical Solution",
    content: [
      "Navigating the transition from an error-ridden script to a beautifully compiling program can be the most stressful part of technical degrees. Whether you are staring at a stack trace or struggling to organize your CAD layers, finding the ultimate technical solution is the key to maintaining your GPA.",
      "Time is often the biggest hurdle in technical programs. When a deadline is only hours away, our urgent support team is ready to step in. You can simply share your files, and our subject matter experts will get to work immediately, delivering high-quality, executable solutions even on a tight schedule."
    ]
  }
];

export default function ComparisonSection({
  title = "Professional Writing Service vs. Alternatives",
  tableHeaders = defaultTableHeaders,
  tableRows = defaultTableRows,
  leftSectionsContent = leftSections,
  rightSectionsContent = rightSections
}: ComparisonSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTop = useRef(0);
  
  // Track words globally per-render so they only highlight once
  const seenWords = new Set<string>();

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -300, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop > lastScrollTop.current) {
      setScrollDir('down');
    } else if (scrollTop < lastScrollTop.current) {
      setScrollDir('up');
    }
    lastScrollTop.current = scrollTop;

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setScrollDir(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm bg-slate-50/50 relative h-auto md:h-[550px] lg:h-[500px] overflow-hidden">
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full h-full overflow-y-auto custom-scrollbar pr-0 md:pr-18"
          >
            
            {/* Left Side: Table & Left Text */}
            <div className="flex-1 w-full lg:w-1/2">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300/80 mb-3">
                Feature Comparison Matrix
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                {title}
              </h2>
              
              <div className="overflow-x-auto w-full mb-10 -mx-4 px-4 md:mx-0 md:px-0">
                <table className="w-full text-xs sm:text-sm text-left border-collapse border border-slate-200 rounded-2xl overflow-hidden min-w-[550px] md:min-w-0 bg-white shadow-xs">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      {tableHeaders.map((header, i) => (
                        <th key={i} className={`p-3 sm:p-4 font-extrabold ${i === 1 ? 'text-amber-400 bg-slate-800' : 'text-slate-100'}`}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 divide-y divide-slate-200">
                    {tableRows.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 sm:p-4 font-bold text-slate-900 border-r border-slate-200 bg-slate-50/80">{row.feature}</td>
                        <td className="p-3 sm:p-4 font-bold text-emerald-800 bg-emerald-50/60 border-r border-slate-200">{row.column1}</td>
                        <td className="p-3 sm:p-4 text-slate-600 border-r border-slate-200">{row.column2}</td>
                        <td className="p-3 sm:p-4 text-slate-600">{row.column3}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {leftSectionsContent.map((section, idx) => (
                <div key={idx} className="mb-8">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="text-slate-600 text-xs sm:text-sm leading-relaxed"
                      >
                        {renderParagraphWithLinks(paragraph, seenWords)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle divider for desktop */}
            <div className="hidden lg:block w-[1px] bg-slate-200 shrink-0 self-stretch min-h-max"></div>

            {/* Right Side: Right Text */}
            <div className="flex-1 w-full lg:w-1/2">
              {rightSectionsContent.map((section, idx) => (
                <div key={idx} className="mb-8 last:mb-0">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
                    {section.title}
                  </h3>
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIdx) => (
                      <p 
                        key={pIdx} 
                        className="text-slate-600 text-xs sm:text-sm leading-relaxed"
                      >
                        {renderParagraphWithLinks(paragraph, seenWords)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Scroll Action Buttons absolute to the right boundary */}
          <div className="hidden md:flex absolute right-4 md:right-8 top-12 bottom-12 flex-col justify-between py-2 pointer-events-none">
            <button 
              onClick={scrollUp}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md pointer-events-auto border border-slate-200 ${
                scrollDir === 'up' 
                  ? 'bg-amber-500 text-slate-950 font-black' 
                  : 'bg-white hover:bg-slate-100 text-slate-700'
              }`}
              aria-label="Scroll up"
            >
              <ChevronUp size={24} />
            </button>
            <div className="flex-1"></div>
            <button 
              onClick={scrollDown}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-md pointer-events-auto border border-slate-200 ${
                scrollDir === 'down' 
                  ? 'bg-amber-500 text-slate-950 font-black' 
                  : 'bg-white hover:bg-slate-100 text-slate-700'
              }`}
              aria-label="Scroll down"
            >
              <ChevronDown size={24} />
            </button>
          </div>

        </div>
      </div>
      
      {/* Custom Scrollbar CSS for this specific section, optionally put in the global index.css */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `}</style>
    </section>
  );
}

import React from 'react';
import { ShieldCheck, UserCheck, Zap, Award, BookOpen, FileText, Target, Search, Users, FileUp, CreditCard, PenTool, Lightbulb, Settings } from 'lucide-react';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import SEO from '../components/SEO';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import OrderFormWidget from '../components/OrderFormWidget';
import { LinkTarget } from '../lib/linkUtils';

const RESEARCH_PAPER_LINKS: LinkTarget[] = [
  { word: 'research paper writing', type: 'link', path: '/research-paper' },
  { word: 'academic journal', type: 'highlight' },
  { word: 'peer-reviewed sources', type: 'highlight' },
  { word: 'original findings', type: 'highlight' }
];

export default function ResearchPaper() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Research Paper Writing Services | Global Academic Support"
        description="Publish-ready quality for your academic career. Our professional research paper writing assistance provides in-depth analysis from PhD-qualified experts worldwide, guaranteeing original findings and peer-reviewed rigorous work."
        keywords="research paper writing service, custom research paper, academic research help, global scholar support, peer-reviewed analysis"
        canonicalUrl="/research-paper-service"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">High-Impact</span>
              <span className="text-blue-700 block">Research Paper</span>
              <span className="text-blue-700 block">Writing Services</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Publish-ready quality for your academic career. Our professional <span className="font-bold text-emerald-500">research paper writing assistance</span> provides in-depth analysis from global PhD-qualified experts, guaranteeing original findings backed by reputable, peer-reviewed sources for students worldwide.
            </p>
            <TrustedLogos />
          </div>

          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Specialized Researchers & Analysts" />

      <HowItWorks 
        title="Our Research Methodology"
        steps={[
          { title: "Define Research Scope", description: "Share your research question or topic. We identify the key data points and peer-reviewed sources needed.", icon: FileUp },
          { title: "Deep-Dive Analysis", description: "Our PhD-level experts conduct original research and analyze findings to build a robust contribution.", icon: Search },
          { title: "Final Manuscript", description: "Receive a fully formatted, high-impact research paper with all citations perfectly placed.", icon: FileText }
        ]}
      />

      <ServicesDetailSection 
        title="Scientific Rigor & Professional Academic Writing"
        subtitle="Bridging the gap between raw data and a compelling academic journal submission. We handle the complexities of high-level research."
        linkTargets={RESEARCH_PAPER_LINKS}
        writingBox={{
          title: "Quantitative & Qualitative Research",
          icon: PenTool,
          description: "We handle complex data sets and conduct thorough qualitative analysis to support your original findings.",
          points: ["Statistical analysis & SPSS support", "Thematic analysis for qualitative papers", "Case study development & Review", "Literature Review synthesis"]
        }}
        solvingBox={{
          title: "Strategic Problem Formulation",
          icon: Lightbulb,
          theme: 'accent',
          description: "Struggling to find your angle? We help formulate compelling research questions that add real value to your field.",
          points: ["Research gap identification", "Hypothesis testing & formation", "Conceptual framework design", "Methodological justification"]
        }}
        moreBox={{
          title: "Technical Accuracy & Formatting",
          icon: Settings,
          description: "We ensure your manuscript meets the strict formatting requirements of your target journal or university department.",
          points: ["IEEE, Vancouver & OSCOLA formatting", "Table & Graph professional design", "Bibliography management systems", "Final technical proofreading"]
        }}
      />

      <AssignmentTopicsSection />

      <FreeWritingTools />

      <ComparisonSection />

      <FAQSection 
        title="Research Paper FAQs"
        leftFaqs={[
          { question: "Do you use peer-reviewed sources?", answer: "Yes. We exclusively use credible academic databases like JSTOR, PubMed, and Google Scholar to find the most recent peer-reviewed research." },
          { question: "Can you help with data analysis?", answer: "Yes! Our team includes statisticians who can help with SPSS, R, Python, and other data analysis tools for your research." }
        ]}
        rightFaqs={[
          { question: "How original will my paper be?", answer: "Every research paper is written from scratch based on your specific requirements and original findings. We provide a full plagiarism report." },
          { question: "Can I choose my research methodology?", answer: "Of course. You can specify whether you want a qualitative, quantitative, or mixed-methods approach." }
        ]}
      />
    </main>
  );
}

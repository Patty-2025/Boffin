import React from 'react';
import { ShieldCheck, GraduationCap, Library, ThumbsUp, Zap, Medal, Globe, Star, FileText, Settings, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import TrustedLogos from '../components/TrustedLogos';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import OrderFormWidget from '../components/OrderFormWidget';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const COURSEWORK_LINKS: LinkTarget[] = [
  { word: 'coursework help', type: 'link', path: '/coursework-help' },
  { word: 'academic discipline', type: 'highlight' },
  { word: 'module assignments', type: 'highlight' },
  { word: 'lab reports', type: 'highlight' }
];

export default function CourseworkHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans text-slate-900">
      <SEO 
        title="Professional Coursework Help & Writing Services | Global Academic Support"
        description="Master your curriculum with our affordable coursework writing service. From year-long projects to module assignments, get 100% original guidance from PhD experts worldwide."
        keywords="coursework help, coursework writing service, assignment helpers, academic coursework, international academic support"
        canonicalUrl="/coursework"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional Academic</span>
              <span className="text-blue-700 block">Coursework Help Services</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Master your curriculum with our affordable <span className="font-bold text-emerald-500">coursework writing service</span>. From year-long projects to module assignments, our expert <span className="font-bold text-emerald-500">assignment helpers</span> provide 100% original guidance for international students studying at universities worldwide.
            </p>

            <TrustedLogos />
          </div>
          
           {/* Order Form Widget */}
           <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Specialized Coursework Writers" />
      <HowItWorks />

      <ServicesDetailSection 
        title="Expert Coursework Help for Every Academic Discipline"
        subtitle="Coursework accounts for a significant portion of your final grade. Our PhD-qualified experts ensure your work meets the specific criteria set by your university department."
        linkTargets={COURSEWORK_LINKS}
        writingBox={{
          title: "Comprehensive Lab & Field Reports",
          icon: FileText,
          description: "We help you document your empirical findings with precision and scientific accuracy for disciplines like Engineering and Healthcare.",
          points: ["Detailed Data Analysis & Result interpretation", "Scientific methodology reporting", "Appendix & Raw data management", "Rigorous Safety and Ethics compliance"]
        }}
        solvingBox={{
          title: "Strategic Case Study Analysis",
          icon: Library,
          theme: 'accent',
          description: "We analyze real-world scenarios through the lens of academic theory, providing deep insights for Business, Law, and Social Sciences.",
          points: ["SWOT, PESTLE & Five Forces analysis", "Problem identification & Recommendation drafting", "Theory-to-Practice application focus", "Concise Executive Summaries"]
        }}
        moreBox={{
          title: "Module Projects & Portfolio Help",
          icon: Settings,
          description: "We support long-term projects and portfolio development, ensuring consistent quality throughout your entire course module.",
          points: ["Creative & Design project portfolios", "Project development logs & reflections", "Consistent grading target alignment", "Interdisciplinary topic integration"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />
      <FAQSection 
        title="Coursework FAQs"
        leftFaqs={[
          { question: "Can you help with nursing coursework?", answer: "Yes, we have specialized nursing and healthcare writers who understand clinical practice and theory." },
          { question: "How original is the coursework?", answer: "Every piece of coursework is written from scratch. We provide a full plagiarism report for every order." }
        ]}
      />
    </main>
  );
}

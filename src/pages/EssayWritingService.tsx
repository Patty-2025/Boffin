import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Clock, Medal, Zap, Award, BookOpen, FileText, Target, PenTool, Globe, Settings } from 'lucide-react';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const ESSAY_LINKS: LinkTarget[] = [
  { word: 'essay writing service', type: 'link', path: '/essay-writing-service' },
  { word: 'international scholars', type: 'highlight' },
  { word: 'academic assets', type: 'highlight' },
  { word: 'PhD experts', type: 'link', path: '/experts' }
];

export default function EssayWritingService() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Premium Essay Writing</span>
              <span className="text-blue-700 block">Service for Global</span>
              <span className="text-blue-700 block">International Scholars</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Connect with PhD experts across the UK, USA, Canada, and Australia. We deliver high-quality, plagiarism-free essays tailored to your specific academic requirements and regional standards.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Order Form Widget */}
           <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
           </div>
        </div>
      </section>

      <ProfessionalWriters />

      <HowItWorks />

      <ServicesDetailSection 
        title="The Definitive Essay Solution for International Success"
        subtitle="We provide the expert backing you need to excel in universities across the UK, Canada, Australia, and the US."
        linkTargets={ESSAY_LINKS}
        writingBox={{
          title: "Admission Essay Mastery",
          icon: Award,
          description: "Expert help tailored specifically for Ivy League and Russell Group applications.",
          points: ["Undergraduate thesis support", "Plagiarism-free guarantees", "Customized research development", "Scholarly language refinement"]
        }}
        solvingBox={{
          title: "Reflective & Analytical Journals",
          icon: BookOpen,
          theme: 'accent',
          description: "Complex nursing, medical, and literature reflections mapped to your specific objectives.",
          points: ["Clinical outcome mapping", "Comparative literature analysis", "Analytical depth", "Critical thinking structure"]
        }}
        moreBox={{
          title: "Expert Political & Case Studies",
          icon: FileText,
          description: "Deep analytical studies on governance, science, and business case scenarios.",
          points: ["Global governance perspectives", "Business case study accuracy", "Political science depth", "Research methodology"]
        }}
      />

      <AssignmentTopicsSection />

      <FreeWritingTools />

      <ComparisonSection />

      <FAQSection />
    </main>
  );
}

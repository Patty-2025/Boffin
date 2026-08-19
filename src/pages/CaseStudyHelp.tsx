import React from 'react';
import { ShieldCheck, Target, Award, BookOpen, PenTool, Lightbulb, Settings, FileText, Search } from 'lucide-react';
import { writerProfiles } from '../data/writersData';
import FAQSection from '../components/FAQSection';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import TrustedLogos from '../components/TrustedLogos';
import OrderFormWidget from '../components/OrderFormWidget';
import SEO from '../components/SEO';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const CASE_STUDY_LINKS: LinkTarget[] = [
  { word: 'case study help', type: 'link', path: '/case-study-help' },
  { word: 'expert analysis', type: 'highlight' },
  { word: 'comprehensive research', type: 'highlight' },
  { word: 'problem solving', type: 'link', path: '/homework-help' }
];

export default function CaseStudyHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Case Study Analysis & Academic Support Services | Global"
        description="Analyze, interpret, and format complex case studies with confidence. Get expert case study help from researchers who specialize in compelling global academic narratives."
        keywords="case study help, case study analysis, buy case study, custom case study assistance, global academic support"
        canonicalUrl="/case-study-help"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional</span>
              <span className="text-blue-700 block">Case Study Analysis</span>
              <span className="text-blue-700 block">Services</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Need to analyze, interpret, and format a complex case study? Access expert <span className="font-bold text-emerald-500">case study help</span> from verified international researchers who specialize in crafting compelling, data-driven academic narratives for students worldwide.
            </p>
            <TrustedLogos />
          </div>
          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Our Case Study Analysts" writersData={writerProfiles.generalHomework} />
      <HowItWorks />

      <ServicesDetailSection 
        title="In-Depth Case Study Support"
        subtitle="Our analysts combine rigorous research with contextual synthesis to deliver detailed, evidence-based case study findings."
        linkTargets={CASE_STUDY_LINKS}
        writingBox={{
          title: "Comprehensive Research & Insight",
          icon: Search,
          description: "We dive deep into the background research to find key issues, stakeholders, and qualitative data, laying a bulletproof foundation for your case.",
          points: ["In-depth situation assessment", "Background data collection", "Critical stakeholder analysis", "Identification of core problem areas"]
        }}
        solvingBox={{
          title: "Strategic Resolution & Impact",
          icon: ShieldCheck,
          theme: 'accent',
          description: "Our experts craft actionable solutions and logical recommendations backed by academic evidence, ensuring your case study analysis is coherent and impactful.",
          points: ["Actionable problem resolutions", "Strategic recommendation development", "Logical synthesis of findings", "Academic integrity and originality"]
        }}
        moreBox={{
          title: "24/7 Academic Support",
          icon: Settings,
          description: "From initial analysis to final review, our global experts are available 24/7 to ensure your case study is completed with accuracy and precision.",
          points: ["Direct messaging with specialists", "Formatting to your specific standards", "Unlimited revisions to ensure quality", "Plagiarism check included"]
        }}
      />

      <AssignmentTopicsSection title="Case Study Disciplines" topics={["Business Strategy", "Psychology & Behavioral Studies", "Public Policy", "Medical Case Reports", "Marketing Analysis"]} />
      
      <FAQSection 
        title="Case Study Analysis FAQ"
        leftFaqs={[
          { question: "How do you handle qualitative case data?", answer: "Our analysts have extensive experience in interpreting qualitative data, identifying key themes, and connecting them to your framework." },
          { question: "Can you help with the final recommendations?", answer: "Yes, we specialize in developing evidence-based, logical recommendations framed within the context of the case." }
        ]}
        rightFaqs={[
          { question: "Will the resolution be original?", answer: "Yes. Every case study solution is analyzed and written from scratch, tailored specifically for your project." },
          { question: "What if I need the analysis explained?", answer: "Our support includes clear explanations of the analysis so you understand the logic behind the case resolution." }
        ]}
      />
    </main>
  );
}

import React from 'react';
import { ShieldCheck, Clock, Star, Target, BookMarked, Award, MessageSquare, BookOpen, PenTool, Lightbulb, Settings, FileText } from 'lucide-react';
import { writerProfiles } from '../data/writersData';
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

const HOMEWORK_LINKS: LinkTarget[] = [
  { word: 'do my homework', type: 'link', path: '/do-my-homework' },
  { word: 'academic integrity', type: 'highlight' },
  { word: 'plagiarism report', type: 'highlight' },
  { word: 'global network', type: 'highlight' }
];

export default function DoMyHomework() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Homework Help & Academic Support Services | Global"
        description="Overcome academic challenges with expert homework support. Our professional network of PhD scholars provides 100% human-written, original solutions tailored to your course requirements."
        keywords="homework help, assignment support service, custom academic writing, global academic help, reliable assignment writing"
        canonicalUrl="/do-my-homework"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional</span>
              <span className="text-blue-700 block">Academic & Homework</span>
              <span className="text-blue-700 block">Support Services</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Simplify your studies and overcome tight deadlines effortlessly. Our professional <span className="font-bold text-emerald-500">assignment helpers</span> deliver affordable, 100% human-written, and original academic solutions tailored to your curriculum, helping you succeed worldwide.
            </p>

            <TrustedLogos />
          </div>
          
           {/* Order Form Widget */}
           <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Your Dedicated Homework Experts" writersData={writerProfiles.generalHomework} />
      <HowItWorks />

      <ServicesDetailSection 
        title="Custom Solutions for Daily Tasks"
        subtitle="Our global network consists of PhD scholars and industry professionals. We understand that every region has its own set of academic standards, and we're here to help you navigate them."
        linkTargets={HOMEWORK_LINKS}
        writingBox={{
          title: "Custom Solutions for Daily Tasks",
          icon: PenTool,
          description: "We provide step-by-step solutions that help you understand the core concepts. Our homework help services are tailored to your specific curriculum, ensuring accuracy and clarity.",
          points: ["Detailed conceptual explanations", "Work-sheet & Problem-set solutions", "Weekly assignment management help", "Annotated bibliography drafting"]
        }}
        solvingBox={{
          title: "Intensive Research & Integrity",
          icon: Lightbulb,
          theme: 'accent',
          description: "In an era of AI content, we provide strictly human-driven research. Every paper, problem set, and assignment comes with a free plagiarism report for your peace of mind.",
          points: ["Access to premium Library databases", "Zero-AI signature guaranteed work", "Context-aware and unique research", "Critical argumentative synthesis", "Original solutions every single time"]
        }}
        moreBox={{
          title: "24/7 Global Academic Support",
          icon: Settings,
          description: "Our experts work across time zones to provide on-time delivery, no matter how tight the deadline. Quality is assured through rigorous checks.",
          points: ["Subject-specialist matching in 60 mins", "Direct messaging with your assigned helper", "Unlimited revisions to meet requirements", "Formatting & Style guide adherence (APA/MLA)", "Academic integrity-focused approach"]
        }}
      />

      <AssignmentTopicsSection title="Homework Disciplines Covered" topics={["STEM Assignments", "Humanities & Social Sciences", "Business & Economics", "Programming & Technical", "Case Study Summaries"]} />
      
      <FAQSection 
        title="Homework FAQs"
        leftFaqs={[
          { question: "Is hiring someone to do my homework safe?", answer: "Yes. Our service is completely anonymous and secure. We focus on providing model solutions that help you learn and achieve better grades while protecting your privacy." },
          { question: "Can I get my homework done in 12 hours?", answer: "Yes! We specialize in urgent requests and can handle most homework tasks within very short timeframes, ensuring high quality even under pressure." }
        ]}
        rightFaqs={[
          { question: "Will the homework be original?", answer: "Absolutely. We guarantee that all homework solutions are written from scratch and pass any plagiarism checking software you use." },
          { question: "What if I'm not satisfied with the help?", answer: "We provide unlimited revisions to ensure the final product matches your initial requirements and academic standards perfectly. Your satisfaction is our priority." }
        ]}
      />
    </main>
  );
}

import React from 'react';
import { ShieldCheck, Target, Award, BookOpen, PenTool, Lightbulb, Settings, FileText } from 'lucide-react';
import { writerProfiles } from '../data/writersData';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import FAQSection from '../components/FAQSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';
import OrderFormWidget from '../components/OrderFormWidget';
import SEO from '../components/SEO';

const ASSESSMENT_LINKS: LinkTarget[] = [
  { word: 'assessment help', type: 'link', path: '/assessment-help' },
  { word: 'exam prep', type: 'highlight' },
  { word: 'qualified experts', type: 'link', path: '/experts' },
  { word: 'grade guarantee', type: 'highlight' }
];

export default function AssessmentHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Academic Assessment Support | Global Exam Help"
        description="Ace your assessments with expert assistance. Our global team of PhD scholars provides confidential, targeted support to ensure academic success worldwide."
        keywords="assessment help, academic exam support, study guides, international academic success, exam preparation"
        canonicalUrl="/assessment-help"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Premium</span>
              <span className="text-blue-700 block">Assessment Assistance</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Struggling with midterm exams, final assessments, or complex quizzes? Get high-quality <span className="font-bold text-emerald-500">assessment help</span> from verified global PhD scholars committed to empowering your academic performance worldwide.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Order Form Widget */}
           <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Our Assessment Specialists" writersData={writerProfiles.assessment} />
      <HowItWorks />

      <ServicesDetailSection 
        title="Comprehensive Assessment Support"
        subtitle="We provide a secure, confidential environment for you to get the expert help you need to master your academic challenges."
        linkTargets={ASSESSMENT_LINKS}
        writingBox={{
          title: "Exam & Quiz Prep",
          icon: BookOpen,
          description: "Our experts create customized study guides and practice quizzes tailored to your specific course material and assessment format. We prepare you to face exams with confidence.",
          points: ["Customized exam study guides", "Timed practice assessment simulations", "Conceptual breakdowns for complex topics", "Exam-style question sets and solutions"]
        }}
        solvingBox={{
          title: "Assessment Integrity & Performance",
          icon: ShieldCheck,
          theme: 'accent',
          description: "We provide strictly human-driven assistance to help you improve your performance and confidence on critical assessments. Your success is our reputation.",
          points: ["Subject-specialist matching", "Real-time conceptual support", "Performance-based feedback loops", "Strict data security protocols", "Original solutions every single time"]
        }}
        moreBox={{
          title: "24/7 Assessment Support",
          icon: Target,
          description: "Our experts are available around the clock to provide timely support, no matter how tight your deadline, ensuring you never miss an assessment opportunity.",
          points: ["Fast response time for urgent assessments", "Direct secure communication channels", "Unlimited revisions to ensure quality", "Formatting and Style guide adherence", "Academic integrity-focused approach"]
        }}
      />

      <AssignmentTopicsSection title="Assessment Disciplines Covered" topics={["STEM Midterms", "Humanities Final Exams", "Case Study Assessments", "Data Analysis Quizzes", "Research-Based Assessments"]} />
      
      <FAQSection 
        title="Assessment Help FAQs"
        leftFaqs={[
          { question: "Can you help with in-class exams?", answer: "We provide extensive study material, conceptual tutoring, and practice guides structured to support your preparation for in-class settings." },
          { question: "Is your help confidential?", answer: "Yes, we prioritize your academic privacy entirely. We use secure, encrypted channels for all communications and never share your data." }
        ]}
        rightFaqs={[
          { question: "What if my assessment format is unique?", answer: "Our specialists are adaptable. Whether it's a presentation, a lab quiz, or a traditional exam, we customize our approach to match your specific assessment rubric." },
          { question: "How do I communicate with my expert?", answer: "We offer a direct, encrypted messaging platform so you can coordinate closely with your assigned specialist until your assessment is complete." }
        ]}
      />
    </main>
  );
}

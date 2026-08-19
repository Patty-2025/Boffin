import React from 'react';
import { ShieldCheck, Target, Award, BookOpen, PenTool, Lightbulb, Settings, FileText } from 'lucide-react';
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

const TERM_PAPER_LINKS: LinkTarget[] = [
  { word: 'term paper help', type: 'link', path: '/term-paper-help' },
  { word: 'custom writing', type: 'link', path: '/essay-writing-service' },
  { word: 'plagiarism free', type: 'highlight' },
  { word: 'expert researchers', type: 'link', path: '/experts' }
];

export default function TermPaperHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Term Paper Help & Writing Services | Global Academic Support"
        description="Struggling with a challenging term paper? Get professional term paper help from PhD-level experts and ensure your submission is original, well-researched, and excellently structured for international standards."
        keywords="term paper help, custom term paper assistance, term paper writing service, PhD academic support, international scholarly writing"
        canonicalUrl="/term-paper-help"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional</span>
              <span className="text-blue-700 block">Term Paper</span>
              <span className="text-blue-700 block">Support Services</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Struggling with a challenging term paper? Receive professional <span className="font-bold text-emerald-500">term paper help</span> from verified international PhD-level experts and ensure your submission is 100% original, well-researched, and excellently structured for your university's standards.
            </p>
            <TrustedLogos />
          </div>
          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Our Term Paper Experts" writersData={writerProfiles.generalHomework} />
      <HowItWorks />

      <ServicesDetailSection 
        title="Customized Term Paper Support"
        subtitle="We provide comprehensive support, from topic selection and research to drafting and final polishing, for any academic term paper."
        linkTargets={TERM_PAPER_LINKS}
        writingBox={{
          title: "Comprehensive Research Support",
          icon: FileText,
          description: "Our experts assist with in-depth research using credible academic sources, ensuring your term paper is grounded in strong evidence.",
          points: ["Credible source selection", "Deep academic research", "Topic selection tailored to your interests", "Thesis statement formulation"]
        }}
        solvingBox={{
          title: "Academic Integrity & Structure",
          icon: ShieldCheck,
          theme: 'accent',
          description: "We focus on creating original, logically structured term papers that strictly follow the academic guidelines of your university.",
          points: ["Zero-AI detection promise", "Strict adherence to citation styles (APA, MLA, etc.)", "Logical flow and structural balance", "In-depth content and unique analysis"]
        }}
        moreBox={{
          title: "Polishing & Final Review",
          icon: Settings,
          description: "Every term paper goes through a final quality assurance process to ensure it is polished, structured, and ready for submission.",
          points: ["Editing and proofreading", "Review against rubric specifications", "Unlimited revisions until satisfied", "Plagiarism check included"]
        }}
      />

      <AssignmentTopicsSection title="Term Papers Disciplines" topics={["History & Social Science", "Business & Marketing", "Computer Science", "Literature & Humanities", "Political Science"]} />
      
      <FAQSection 
        title="Term Paper FAQ"
        leftFaqs={[
          { question: "Can you help me choose a topic?", answer: "Yes, our experts are happy to help you research and choose a strong, compelling topic for your term paper." },
          { question: "Is it plagiarism-free?", answer: "Yes, we guarantee that all work is completely original, written from scratch, and rigorously plagiarism-checked." }
        ]}
        rightFaqs={[
          { question: "What citation styles do you handle?", answer: "Our writers are well-versed in all major academic citation styles including APA, MLA, Chicago, Harvard, and more." },
          { question: "Can I review the draft before the final paper?", answer: "Yes, we encourage milestone check-ins to ensure the paper meets your expectations at every stage." }
        ]}
      />
    </main>
  );
}

import React from 'react';
import { GraduationCap, MessagesSquare, ShieldCheck } from 'lucide-react';
import { writerProfiles } from '../data/writersData';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import SEO from '../components/SEO';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';
import OrderFormWidget from '../components/OrderFormWidget';

const THESIS_LINKS: LinkTarget[] = [
  { word: 'thesis help', type: 'link', path: '/service/thesis-help' },
  { word: 'expert researchers', type: 'link', path: '/experts' },
  { word: 'structured analysis', type: 'highlight' },
  { word: 'plagiarism free', type: 'highlight' }
];

export default function ThesisHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Thesis Writing Services | Global PhD Scholar Support"
        description="Complete your thesis with expert support. Our global network of PhD scholars provides tailored help from topic selection to final formatting, ensuring academic success worldwide."
        keywords="thesis help, thesis writing service, PhD thesis support, custom thesis, international academic assistance"
        canonicalUrl="/thesis-help"
      />
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional</span>
              <span className="text-blue-700 block">Thesis Support</span>
              <span className="text-blue-700 block">Services</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Complete your thesis with expert <span className="font-bold text-emerald-500">thesis help</span>. Our global network of PhD specialists provides tailored guidance from topic selection to final formatting, ensuring academic success for scholars worldwide.
            </p>
            <TrustedLogos />
          </div>
          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Our Thesis Consultants" writersData={writerProfiles.assessment} />
      <HowItWorks />

      <ServicesDetailSection 
        title="Tailored Thesis Support"
        subtitle="Whether you need help with the entire thesis or just specific chapters, our expert consultants are here to guide you."
        linkTargets={THESIS_LINKS}
        writingBox={{
          title: "Research & Development",
          icon: GraduationCap,
          description: "We help you define your research objectives, plan your methodology, and structure your thesis for logical flow.",
          points: ["Research topic refinement", "Methodology design support", "Literature review assistance", "Logical chapter structuring"]
        }}
        solvingBox={{
          title: "Analytical Depth",
          icon: ShieldCheck,
          theme: 'accent',
          description: "Our experts assist with in-depth analysis and data interpretation to make your arguments robust and compelling.",
          points: ["Data analysis support", "Analytical argument development", "Evidence-based synthesis", "Strict academic integrity"]
        }}
        moreBox={{
          title: "Polishing & Final Review",
          icon: MessagesSquare,
          description: "Ensure your thesis is polished, properly formatted, and free of errors before submission.",
          points: ["Editing and proofreading", "Citation style formatting", "Unlimited revisions", "Plagiarism check included"]
        }}
      />

      <AssignmentTopicsSection title="Thesis Disciplines Covered" topics={["Social Sciences", "Business & Economics", "Humanities", "STEM", "Healthcare"]} />
      
      <FreeWritingTools />
      <ComparisonSection />

      <FAQSection 
        title="Thesis Help FAQ"
        leftFaqs={[
          { question: "Can you help me with only a certain section?", answer: "Yes, our thesis help services are flexible. Whether you need help with a single chapter or the whole thesis, we can assist." },
          { question: "Is your thesis help confidential?", answer: "Yes, we treat all thesis work with the highest level of confidentiality and security." }
        ]}
        rightFaqs={[
          { question: "Do you ensure original content?", answer: "Absolutely. We guarantee that all thesis help is entirely original and plagiarism-free." },
          { question: "Can I communicate with the consultant?", answer: "Yes, you have direct line of communication with your assigned thesis consultant to ensure your project stays on track." }
        ]}
      />
    </main>
  );
}

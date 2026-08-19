import React from 'react';
import { ShieldCheck, UserCheck, Zap, Award, BookOpen, FileText, Target, Search, Users, FileUp, CreditCard, PenTool, Lightbulb, Settings, Compass } from 'lucide-react';
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

const PROPOSAL_LINKS: LinkTarget[] = [
  { word: 'research proposal writing', type: 'link', path: '/research-proposal' },
  { word: 'PhD advisors', type: 'link', path: '/experts' },
  { word: 'study design', type: 'highlight' },
  { word: 'academic viability', type: 'highlight' }
];

export default function ResearchProposal() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Research Proposal Writing Services | Global PhD Support"
        description="Transform your research idea into a convincing roadmap. Our professional research proposal writing service provides expert guidance to ensure your project receives academic approval worldwide."
        keywords="research proposal writing services, academic proposal help, PhD research proposal help, custom research roadmap, international scholar support"
        canonicalUrl="/research-proposal"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional</span>
              <span className="text-blue-700 block">Research Proposal</span>
              <span className="text-blue-700 block">Writing Services</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Transform your research idea into a convincing roadmap for success. Our professional <span className="font-bold text-emerald-500">research proposal writing service</span> provides expert guidance from global PhD specialists, ensuring your study design stands up to rigorous international academic scrutiny.
            </p>
            <TrustedLogos />
          </div>

          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Proposal Specialists with PhD backgrounds" />

      <HowItWorks 
        title="Securing Your Research Approval"
        steps={[
          { title: "Identify the Gap", description: "Share your initial research idea. Our PhD advisors help you identify critical gaps in existing literature.", icon: Compass },
          { title: "Methodology Design", description: "We craft a rigorous study design and methodology that stands up to academic scrutiny.", icon: Target },
          { title: "Approval Guarantee", description: "Get a polished, professional proposal focused on academic viability and significance.", icon: Lightbulb }
        ]}
      />

      <ServicesDetailSection 
        title="From Advanced Concept to Academic Viability"
        subtitle="Bridging the gap between a great idea and a successful research project. Our research proposal writing service provides the roadmap you need for approval."
        linkTargets={PROPOSAL_LINKS}
        writingBox={{
          title: "Identifying Critical Research Gaps",
          icon: Compass,
          description: "We help you find the 'Missing link' in existing literature to ensure your proposal is unique and necessary. Our PhD advisors specialize in state-of-the-art gap identification.",
          points: ["Systematic Literature gap identification", "Compelling Significance statements", "Originality & Novelty assessments", "Project Feasibility & scope studies"]
        }}
        solvingBox={{
          title: "Rigorous Study Design & Methodology",
          icon: Target,
          theme: 'accent',
          description: "Our team designs the roadmap for your future research, ensuring study design and methodology are sound and defensible before any review board.",
          points: ["Precision Research question crafting", "Sampling & Design logic optimization", "Project Timeline & Milestone development", "Advanced Method Selection (Qual/Quan)"]
        }}
        moreBox={{
          title: "Stakes, Rationale & Academic Impact",
          icon: Lightbulb,
          description: "We help you articulate WHY your research matters to the academic community. Our focus on academic viability ensures your proposal is impactful.",
          points: ["Professional Impact statement writing", "Conceptual framework visualization mapping", "Theoretical backgrounding & Contextualization", "Preliminary Ethical consideration review"]
        }}
      />

      <AssignmentTopicsSection />

      <FreeWritingTools />

      <ComparisonSection />

      <FAQSection 
        title="Research Proposal FAQs"
        leftFaqs={[
          { question: "What is included in a research proposal?", answer: "We include the title, abstract, intro, literature review, research design/methodology, and a preliminary bibliography." },
          { question: "Can I use the proposal for my final dissertation?", answer: "Yes! A strong proposal usually forms the first three chapters of your final thesis or dissertation." }
        ]}
        rightFaqs={[
          { question: "How long should a research proposal be?", answer: "Most proposals range from 2,500 to 5,000 words, depending on your department's specific requirements." },
          { question: "Will you help me find a supervisor?", answer: "While we can't communicate with supervisors for you, we craft proposals that are specifically designed to attract and impress top-tier academic mentors." }
        ]}
      />
    </main>
  );
}

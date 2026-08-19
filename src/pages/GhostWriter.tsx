import React from 'react';
import { ShieldCheck, UserCheck, Zap, Award, BookOpen, FileText, Target, Search, Users, FileUp, CreditCard, PenTool, Lightbulb, Settings, Ghost, Shield } from 'lucide-react';
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

const GHOST_WRITER_LINKS: LinkTarget[] = [
  { word: 'ghost writer', type: 'link', path: '/ghost-writer' },
  { word: 'academic ghostwriting', type: 'link', path: '/ghost-writer' },
  { word: 'professional ghostwriters', type: 'link', path: '/experts' },
  { word: 'confidential writing', type: 'highlight' },
  { word: 'anonymity guaranteed', type: 'highlight' },
  { word: 'exclusive ownership', type: 'highlight' }
];

export default function GhostWriter() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Confidential Academic Ghostwriting Services | Elite Ghostwriters"
        description="Get the credit you deserve. Our professional ghostwriting service provides 100% original, high-quality assignments where YOU own the copyright and total anonymity is guaranteed."
        keywords="ghostwriting service, ghost writer, academic ghostwriting, assignment ghostwriter"
        canonicalUrl="/ghost-writer"
      />
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Confidential Academic</span>
              <span className="text-blue-700 block">Ghostwriting Services</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Get the credit you deserve with help from elite <span className="font-bold text-emerald-500">academic ghostwriters</span>. Our professional <span className="font-bold text-emerald-500">ghost writing service</span> provides 100% original, high-quality assignments where YOU own the copyright and total anonymity is guaranteed.
            </p>
            <TrustedLogos />
          </div>

          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Discreet Experts for Your Assignments" />

      <HowItWorks 
        title="Your Confidential Ghostwriting Process"
        steps={[
          { title: "Define Your Vision", description: "Share your project scope and goals. Our total anonymity guarantee starts from the very first interaction.", icon: FileUp },
          { title: "Expert Matching", description: "We pair you with a subject-matter ghostwriter. Your private data is never shared with third parties.", icon: CreditCard },
          { title: "Full Ownership", description: "Get your custom paper with 100% exclusive ownership rights. Metadata is stripped for your protection.", icon: FileText }
        ]}
      />

      <ServicesDetailSection 
        title="Discreet Support for High-Stakes Academics"
        subtitle="Our ghostwriting service is built on trust, quality, and complete privacy. We help you articulate your ideas through professional academic ghostwriting."
        linkTargets={GHOST_WRITER_LINKS}
        writingBox={{
          title: "Comprehensive Ghostwriting Support",
          icon: PenTool,
          description: "We handle everything from initial outlines to finalized doctoral level content with a focus on confidential writing and personal voice matching.",
          points: ["Elite Level Dissertation ghostwriting", "Professional Journal Article drafting", "Subject-matching reflective pieces", "Corporate & Academic Report writing"]
        }}
        solvingBox={{
          title: "Total Anonymity & Voice Matching",
          icon: Ghost,
          description: "Our writers study your previous work to ensure the ghostwritten content matches your unique style and vocabulary perfectly.",
          points: ["Custom Voice & Stylistic matching", "NDA-level confidentiality protocols", "Meta-data cleaning on all files", "Identity-protected dashboard messaging"]
        }}
        moreBox={{
          title: "Zero-Trace Quality Assurance",
          icon: Shield,
          description: "We ensure your work is 100% original and untraceable. Anonymity is guaranteed through every stage of our zero-trace quality check.",
          points: ["Proprietary Plagiarism screening", "AI-Detection bypass certification", "Secure file delivery systems", "Bank-level encryption for all data"]
        }}
      />

      <AssignmentTopicsSection />

      <FreeWritingTools />

      <ComparisonSection />

      <FAQSection 
        title="Ghostwriting FAQs"
        leftFaqs={[
          { question: "Who owns the rights to the work?", answer: "You do. 100%. Once the order is completed and paid for, all intellectual property rights belong exclusively to you." },
          { question: "Will my school find out I used a ghostwriter?", answer: "No. We have strict privacy protocols. We never store your personal name on files, and we strip all metadata from documents before delivery." }
        ]}
        rightFaqs={[
          { question: "Is ghostwriting legal?", answer: "Yes. Ghostwriting is a common professional practice across academic, publishing, and business sectors to help individuals articulate their ideas effectively." },
          { question: "Can you match my specific writing style?", answer: "Yes, our experts can analyze your previous writing samples to mimic your tone, vocabulary, and sentence structure perfectly." }
        ]}
      />
    </main>
  );
}

import React from 'react';
import { FileUp, CreditCard, FileText, PenTool, Lightbulb, Settings } from 'lucide-react';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import OrderFormWidget from '../components/OrderFormWidget';
import SEO from '../components/SEO';
import { LinkTarget } from '../lib/linkUtils';

const ESSAY_HELP_LINKS: LinkTarget[] = [
  { word: 'essay help', type: 'link', path: '/essay-help' },
  { word: 'custom essay writing', type: 'link', path: '/essay-help' },
  { word: 'professional essay writers', type: 'link', path: '/experts' },
  { word: 'write my essay', type: 'link', path: '/essay-help' },
  { word: 'plagiarism free', type: 'link', path: '/' },
  { word: 'academic integrity', type: 'highlight' },
  { word: 'original research', type: 'highlight' },
  { word: 'university standards', type: 'highlight' }
];

export default function EssayHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Essay Assignment Help & Writing Services | Global"
        description="Our premium essay support provides bespoke, original academic content. We provide high-quality, professional academic writing services that guarantee clarity and meet international academic standards."
        keywords="essay help, custom essay writing services, professional academic support, global scholar writing, original essay help"
        canonicalUrl="/essay-help"
      />
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional Essay</span>
              <span className="text-blue-700 block">Writing Services</span>
              <span className="text-blue-700 block">from Global Experts</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Need <span className="font-bold text-emerald-500">essay assignment help</span> you can trust? We provide 100% human-created, original academic content perfectly customized for your university. Get professional <span className="font-bold text-emerald-500">assignment writing assistance</span> that helps you excel in your studies worldwide.
            </p>
            <TrustedLogos />
          </div>

          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Premium Essay Writers You Can Trust" />

      <HowItWorks 
        title="Your Path to an A+ Essay"
        steps={[
          { title: "Detail Your Topic", description: "Provide your essay prompt, subject, and any specific reading materials or rubric you want us to follow.", icon: FileUp },
          { title: "Select Your Writer", description: "Browse profiles and pick the perfect expert for your subject. Complete a small secure payment to start.", icon: CreditCard },
          { title: "Direct Collaboration", description: "Chat with your writer, review drafts, and get your plagiarism-free final essay on time.", icon: FileText }
        ]}
      />

      <ServicesDetailSection 
        title="Complete Essay Writing Support & Academic Help"
        subtitle="From the very first draft to the final proofreading polish, we handle every stage of your writing journey. Our essay help service is built on quality."
        linkTargets={ESSAY_HELP_LINKS}
        writingBox={{
          title: "Premium Custom Essay Writing",
          icon: PenTool,
          description: "Our core service provides 100% original, custom essay writing. We don't use templates; we write for your specific academic audience and university standards.",
          points: ["Argentative, Analytical & Persuasive essays", "Detailed academic Research Papers", "University-level Narratives & Reflection", "Professional Admission Statement help"]
        }}
        solvingBox={{
          title: "Strategic Content & Argumentation",
          icon: Lightbulb,
          description: "We help you strategize your arguments and ensure your essay follows a logical progression that graders love. Our professional essay writers provide the edge you need.",
          points: ["Robust Thesis development and testing", "Counter-argument integration and rebuttal", "Evidence-based conclusions and insights", "Source credibility and academic integrity audit"]
        }}
        moreBox={{
          title: "Final Polishing & Formatting Accuracy",
          icon: Settings,
          description: "We ensure your work is ready for submission with total formatting accuracy and plagiarism-free verification for a flawless write my essay experience.",
          points: ["Strict APA, MLA & Chicago style compliance", "Turnitin-standard reports for every paper", "Bibliography & Reference list formatting", "Final Grammar & Syntax Polish review"]
        }}
      />

      <AssignmentTopicsSection 
        title="Essay Help Across Every Subject"
        description="Our experts cover 100+ disciplines, ensuring specialized knowledge for your specific degree path."
        topics={["English Literature", "Business & Management", "Nursing & Healthcare", "Psychology & Sociology", "Law & Legal Studies", "History & Philosophy", "Economics & Finance", "Computer Science", "Political Science", "Education", "Marketing", "Art & Design"]}
      />

      <FreeWritingTools />

      <ComparisonSection 
        title="Why Boffin Global Services is the #1 Essay Helper"
        leftSectionsContent={[
          { title: "Human Experts vs. AI Bots", content: ["AI generators create generic, repetitive content that gets flagged instantly by academic integrity software. Our writers provide original research and human unique voice.", "We focus on critical thinking and context-aware writing that AI simply cannot replicate."] }
        ]}
      />

      <FAQSection 
        title="Essay Writing FAQs"
        leftFaqs={[
          { question: "Is your essay help service legal?", answer: "Yes. We provide model essays and research support intended to help students learn how to structure and write their own assignments. It's like having a high-end personal tutor." },
          { question: "Can I get my essay in 6 hours?", answer: "Yes, we handle urgent requests! Our experts can deliver high-quality, plagiarism-free essays on tight deadlines." }
        ]}
      />
    </main>
  );
}

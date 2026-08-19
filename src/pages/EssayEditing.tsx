import React from 'react';
import { ShieldCheck, UserCheck, Zap, Award, BookOpen, FileText, Target, Search, Users, FileUp, CreditCard, PenTool, Lightbulb, Settings, Eraser, CheckSquare } from 'lucide-react';
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

const EDITING_LINKS: LinkTarget[] = [
  { word: 'essay editing', type: 'link', path: '/essay-editing' },
  { word: 'professional proofreaders', type: 'link', path: '/experts' },
  { word: 'academic polishing', type: 'highlight' },
  { word: 'grammar check', type: 'link', path: '/grammar-checker' },
  { word: 'flow and clarity', type: 'highlight' }
];

export default function EssayEditing() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Academic Essay Editing Services | Global Proofreading Support"
        description="Transform your draft into a masterpiece. Our professional essay editing service provides meticulous academic polishing from PhD-qualified editors worldwide."
        keywords="essay editing service, academic proofreading, scholarly polishing, essay improvement, international academic assistance"
        canonicalUrl="/essay-editing-service"
      />
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional Academic</span>
              <span className="text-blue-700 block">Essay Editing Services</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Transform your draft into a masterpiece. Our professional <span className="font-bold text-emerald-500">essay editing service</span> provides meticulous academic polishing from PhD-qualified editors to ensure your work meets the highest international university standards.
            </p>
            <TrustedLogos />
          </div>

          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Our Senior Editors" />

      <HowItWorks 
        title="Our Rigorous Editing Process"
        steps={[
          { title: "Upload Your Draft", description: "Submit your written work in any format. Share your rubric or specific concerns for our editors.", icon: FileUp },
          { title: "Meticulous Review", description: "A senior editor reviews your work for grammar, flow, clarity, and adherence to academic standards.", icon: Eraser },
          { title: "Download the Polish", description: "Get a tracked-changes version and a clean final copy, ready for submission and top marks.", icon: CheckSquare }
        ]}
      />

      <ServicesDetailSection 
        title="Beyond Basic Grammar: Strategic Editing"
        subtitle="We don't just fix typos; we refine your voice and strengthen your arguments. Our professional proofreaders ensure your essay is impactful."
        linkTargets={EDITING_LINKS}
        writingBox={{
          title: "In-Depth Structural Editing",
          icon: PenTool,
          description: "We evaluate the flow and logic of your arguments, ensuring a cohesive and persuasive thread throughout your entire paper.",
          points: ["Paragraph flow & transition optimization", "Argumentative logic & Thesis reinforcement", "Clarity and conciseness enhancements", "Vocabulary & Academic tone leveling"]
        }}
        solvingBox={{
          title: "Precision Proofreading & Grammar",
          icon: ShieldCheck,
          description: "Eliminate embarrassing errors with our double-pass proofreading. We focus on grammar check accuracy and total punctuation perfection.",
          points: ["Advanced Grammar & Syntax correction", "Punctuation, Spelling & Typo elimination", "Subject-verb agreement & Tense audits", "Consistent academic style enforcement"]
        }}
        moreBox={{
          title: "Referencing & Formatting Fixes",
          icon: Settings,
          description: "We ensure your citations are 100% accurate according to your specific style guide. Academic integrity is our top priority.",
          points: ["APA, MLA, Harvard & Chicago formatting", "In-text citation and bibliography audit", "Table & Figure formatting checks", "Final rubric-adherence verification"]
        }}
      />

      <AssignmentTopicsSection />

      <FreeWritingTools />

      <ComparisonSection />

      <FAQSection 
        title="Essay Editing FAQs"
        leftFaqs={[
          { question: "What is the difference between editing and proofreading?", answer: "Proofreading focuses on surface-level errors (grammar, spelling), while editing goes deeper into structure, flow, clarity, and tone." },
          { question: "Do you use track changes?", answer: "Yes! We always provide a version with Track Changes enabled so you can see exactly what we improved and learn from the suggestions." }
        ]}
        rightFaqs={[
          { question: "Can you edit my essay in 3 hours?", answer: "Yes, we offer express editing services for those last-minute submissions. Our editors work around the clock to meet your deadlines." },
          { question: "Is your editing service plagiarism-proof?", answer: "Editing your own work is 100% academically ethical. We help you refine your own ideas into professional, high-standard writing." }
        ]}
      />
    </main>
  );
}

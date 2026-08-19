import React from 'react';
import { ShieldCheck, UserCheck, Zap, Award, BookOpen, FileText, Target, Search, Users, PenTool } from 'lucide-react';
import { motion } from 'motion/react';
import { writerProfiles } from '../data/writersData';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import SEO from '../components/SEO';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const HOMEWORK_LINKS: LinkTarget[] = [
  { word: 'homework help', type: 'link', path: '/homework' },
  { word: 'expert assistance', type: 'highlight' },
  { word: 'academic projects', type: 'highlight' },
  { word: 'assignment management', type: 'highlight' }
];

export default function PaySomeoneToDoMyHomework() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans text-slate-900">
      <SEO 
        title="Pay Someone To Do My Homework | Professional Assignment Helpers"
        description="Looking to pay someone to do your homework securely? Our professional assignment helpers provide high-quality, plagiarism-free results tailored to your university."
        keywords="pay someone to do my homework, do my homework for me, pay for homework"
        canonicalUrl="/pay-someone-to-do-my-homework"
      />
      {/* Hero Section */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Looking to Pay Someone</span>
              <span className="text-blue-700 block">To Do Your Homework?</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Overwhelmed with assignments? If you want to <span className="font-bold text-emerald-500">pay someone to do my homework</span> securely, you're in the right place. Our professional <span className="font-bold text-emerald-500">assignment helpers</span> provide high-quality, plagiarism-free results tailored to your specific university standards.
            </p>
            <TrustedLogos />
          </div>
          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Your Dedicated Homework Experts" writersData={writerProfiles.generalHomework} />
      <HowItWorks />

      <ServicesDetailSection 
        title="Why Students Choose Boffin Global Services for Homework Support"
        subtitle="We provide a secure, confidential, and highly effective environment for students to get the specialist academic help they need to master their most difficult challenges."
        linkTargets={HOMEWORK_LINKS}
        writingBox={{
          title: "Custom Solutions for Complex Academic Tasks",
          icon: PenTool,
          description: "We don't offer generic templates. Our PhD-level experts provide step-by-step solutions that help you truly understand the core concepts behind every complex assignment, ensuring you learn while you succeed.",
          points: ["Detailed conceptual breakdowns for complex coursework", "Customized problem-set resolutions (STEM/Business)", "Consistent weekly assignment management support", "Annotated bibliography construction to academic standards"]
        }}
        solvingBox={{
          title: "Uncompromising Research Integrity & Quality",
          icon: ShieldCheck,
          theme: 'accent',
          description: "In an era saturated with generic AI content, we offer strictly human-driven research and writing. Every assignment is crafted from scratch, guaranteeing academic honesty and high grades.",
          points: ["Direct access to premium academic library databases", "Zero-AI signature guaranteed: human-authored work only", "Context-aware, uniquely researched analysis", "Critical argumentative synthesis aligned to your rubric"]
        }}
        moreBox={{
          title: "24/7 Global Academic Assistance",
          icon: Users,
          description: "Our global network of experts operates across time zones to provide timely, urgent support, regardless of how tight your submission deadline might be. Quality is assured through rigorous multi-stage checks.",
          points: ["Rapid subject-specialist matching in under 60 minutes", "Direct transparency via communication with your assigned expert", "Unlimited revisions to ensure complete satisfaction", "Strict formatting & Style guide adherence (APA, MLA, Chicago, Harvard, OSCOLA)"]
        }}
      />

      <AssignmentTopicsSection title="Academic Disciplines We Master" topics={["STEM & Engineering", "Business & Economics", "Law & Political Science", "Humanities & Social Sciences", "Computer Science & Programming", "Medicine & Healthcare"]} />
      
      <FAQSection 
        title="Frequently Asked Questions About Our Academic Services"
        leftFaqs={[
          { question: "Is it truly safe and anonymous to pay someone to do my homework?", answer: "Yes, your privacy and academic security are our highest priority. We use secure, HTTPS-encrypted communication channels, never share your personal data with third parties, and conduct all business with strict anonymity." },
          { question: "Can I choose my own writer or expert?", answer: "We carefully match you with the best available PhD-level expert in your specific field based on your assignment requirements. You will then have the ability to communicate with them directly through our secure platform throughout the process." }
        ]}
        rightFaqs={[
          { question: "How can I be guaranteed that my homework is 100% original?", answer: "Every single assignment is written from scratch by our subject-matter experts. We conduct a thorough Turnitin check on every deliverable and provide you with the full plagiarism report upon delivery for your total peace of mind." },
          { question: "What happens if I need revisions or adjustments?", answer: "We are committed to your success. We offer unlimited, prompt revisions on all orders to ensure the final product matches your exact instructions, university rubric, and personal academic expectations perfectly." }
        ]}
      />
    </main>
  );
}

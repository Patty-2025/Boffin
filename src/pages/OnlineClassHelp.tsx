import React from 'react';
import { GraduationCap, Monitor, Laptop } from 'lucide-react';
import { writerProfiles } from '../data/writersData';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';
import OrderFormWidget from '../components/OrderFormWidget';
import SEO from '../components/SEO';

const CLASS_LINKS: LinkTarget[] = [
  { word: 'online class help', type: 'link', path: '/online-class-help-service' },
  { word: 'PhD experts', type: 'link', path: '/experts' },
  { word: 'grade guarantee', type: 'highlight' },
  { word: 'weekly submissions', type: 'highlight' }
];

export default function OnlineClassHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Online Class Help | Academic Support & Course Assistance"
        description="Master your curriculum without the burnout. Get expert online class help from our PhD scholars who manage forums, quizzes, and module milestones for students globally."
        keywords="online class help, course support, module assistance, academic class management, international student support"
        canonicalUrl="/online-class-help-service"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Comprehensive Online</span>
              <span className="text-blue-700 block">Class & Course Help</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Need assistance managing your academic schedule? Get professional <span className="font-bold text-emerald-500">online class help</span> from verified PhD scholars who manage forum discussions, modules, and quizzes for students globally, ensuring your academic progress remains on track.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Order Form Widget */}
           <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Academic Guides for Your Online Success" writersData={writerProfiles.onlineClass} />
      <HowItWorks />

      <ServicesDetailSection 
        title="Total Course & Online Class Management"
        subtitle="Master your online degree without the burnout. Our online class help service provides 24/7 support for busy professionals and students."
        linkTargets={CLASS_LINKS}
        writingBox={{
          title: "Discussion Board & Forum Excellence",
          icon: Laptop,
          description: "We handle your weekly discussion boards and peer responses with high-quality academic insights. Our PhD experts ensure you stay engaged and relevant every week.",
          points: ["Insightful and citation-heavy Initial posts", "Engaging and critical Peer responses", "Weekly consistency for maximum participation", "Strict adherence to rubric requirements"]
        }}
        solvingBox={{
          title: "Module, Quiz & Lab Report Support",
          icon: Monitor,
          theme: 'accent',
          description: "Our experts work through your weekly modules and help you prepare for internal platform academic challenges. We provide a grade guarantee to keep your GPA high.",
          points: ["Weekly module completion and tracking", "Quiz preparation and conceptual support", "Complex Lab report & Experiment assistance", "Comprehensive Study guide creation"]
        }}
        moreBox={{
          title: "Final Capstone & Project Mastery",
          icon: GraduationCap,
          description: "We ensure your final term project or exam is completed to the highest standard. With our weekly submissions support, you never miss a milestone.",
          points: ["Capstone project design & implementation", "Final narrative & Research paper writing", "Comprehensive exam conceptual preparation", "Real-time Grade tracking and status updates"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />

      <FAQSection 
        title="Online Class FAQs"
        leftFaqs={[
          { question: "Which platforms do you support?", answer: "We support Canvas, Blackboard, Moodle, Google Classroom, and all major university portals." },
          { question: "Is my login information safe?", answer: "We follow strict security protocols and use VPNs to ensure your account security is never compromised." }
        ]}
      />
    </main>
  );
}

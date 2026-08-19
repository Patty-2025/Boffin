import React from 'react';
import { ShieldCheck, Target, Award, BookOpen, PenTool, Lightbulb, Settings, FileText, Presentation } from 'lucide-react';
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

const PPT_LINKS: LinkTarget[] = [
  { word: 'powerpoint presentation', type: 'link', path: '/powerpoint-help' },
  { word: 'visual design', type: 'highlight' },
  { word: 'expert assistance', type: 'link', path: '/experts' },
  { word: 'custom slides', type: 'highlight' }
];

export default function PowerpointHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Presentation Design Services | Global Academic Support"
        description="Captivate your audience with stunning, professional slides. Get expert PowerPoint presentation help from scholars worldwide, tailored to your academic or professional needs."
        keywords="presentation design services, academic powerpoint help, custom slide design, international student support"
        canonicalUrl="/powerpoint-help"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional</span>
              <span className="text-blue-700 block">Presentation Design</span>
              <span className="text-blue-700 block">Services</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Captivate your global audience with visually stunning slides. Get expert <span className="font-bold text-emerald-500">presentation design support</span> from PhD specialists, tailored precisely to meet your university's academic standards or project requirements.
            </p>
            <TrustedLogos />
          </div>
          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Our Presentation Design Experts" writersData={writerProfiles.generalHomework} />
      <HowItWorks />

      <ServicesDetailSection 
        title="Customized Presentation Solutions"
        subtitle="Our presentation specialists design visually compelling, structured, and informative slides that help you leave a lasting impression."
        linkTargets={PPT_LINKS}
        writingBox={{
          title: "Custom Slide Design",
          icon: Presentation,
          description: "We craft visually engaging slides that align with your content and presentation goals, ensuring clarity and impact.",
          points: ["Custom slide layouts", "Visual storytelling for academic topics", "Consistent formatting and design", "Data visualization on slides"]
        }}
        solvingBox={{
          title: "Structured Content & Scripting",
          icon: FileText,
          theme: 'accent',
          description: "We don't just design slides; we structure your presentation content for flow, engagement, and effectiveness, including speaker notes.",
          points: ["Narrative flow and structuring", "Professional speaker notes drafting", "Concise summaries for slide bullet points", "Academic referencing on slides"]
        }}
        moreBox={{
          title: "24/7 Presentation Support",
          icon: Settings,
          description: "Need a presentation fast? Our team is available 24/7 to create high-quality, professional presentations tailored to your deadline.",
          points: ["Fast turnaround times", "Direct messaging with your designer", "Unlimited revisions to meet requirements", "Formatting & Style guide adherence"]
        }}
      />

      <AssignmentTopicsSection title="Presentation Topics Covered" topics={["Academic Research Presentations", "Business Analysis", "Scientific Data Visualization", "Case Study Presentations", "Project Proposals"]} />
      
      <FAQSection 
        title="PowerPoint Presentation FAQs"
        leftFaqs={[
          { question: "Can you include speaker notes?", answer: "Yes! We can create comprehensive speaker notes to accompany your slides for a polished presentation." },
          { question: "Can I choose my presentation theme?", answer: "Absolutely. We can adhere to your university or corporate branding requirements, or suggest a modern, engaging theme." }
        ]}
        rightFaqs={[
          { question: "Is your presentation design original?", answer: "Every presentation we create is bespoke, designed specifically for your content and audience requirements." },
          { question: "Can you handle complex technical presentations?", answer: "Yes, our experts are skilled in presenting complex technical, scientific, and data-heavy information in a clear and accessible format." }
        ]}
      />
    </main>
  );
}

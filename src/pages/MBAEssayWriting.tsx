import React from 'react';
import { ShieldCheck, UserCheck, Zap, Award, BookOpen, FileText, Target, Search, Users, FileUp, CreditCard, PenTool, Lightbulb, Settings, GraduationCap } from 'lucide-react';
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

const MBA_LINKS: LinkTarget[] = [
  { word: 'MBA essay writing', type: 'link', path: '/mba-essay-writing' },
  { word: 'admission committee', type: 'highlight' },
  { word: 'leadership potential', type: 'highlight' },
  { word: 'professional goals', type: 'highlight' },
  { word: 'M7 business schools', type: 'highlight' }
];

export default function MBAEssayWriting() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Premium MBA & Graduate Admission Essay Writing Services | Global"
        description="Stand out to top-tier university admission committees globally. Our professional MBA essay writing service specializes in articulating leadership potential and future goals."
        keywords="MBA essay writing service, MBA essay writers, business school essay, MBA admission essay, graduate application support, international academic assistance"
        canonicalUrl="/mba-essay-writing"
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Professional MBA &</span>
              <span className="text-blue-700 block">Graduate Admission</span>
              <span className="text-blue-700 block">Essays</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Stand out to admission committees at the world's most elite business schools and universities. Our professional <span className="font-bold text-emerald-500">MBA essay writing service</span> helps you articulate your leadership potential and professional vision with help from our global network of top-tier scholars.
            </p>
            <TrustedLogos />
          </div>

          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Writers from World-Leading B-Schools" />

      <HowItWorks 
        title="Your B-School Admission Journey"
        steps={[
          { title: "Share Your Background", description: "Tell us about your resume, professional goals, and target schools. Our writers need the full picture to craft your story.", icon: GraduationCap },
          { title: "Craft Your Narrative", description: "We pair you with an MBA alum who understands what top-tier admission committees are looking for.", icon: PenTool },
          { title: "Submit with Confidence", description: "Get polished, impactful essays that showcase your unique leadership potential and fit.", icon: Target }
        ]}
      />

      <ServicesDetailSection 
        title="Impactful MBA & Graduate Admission Support"
        subtitle="Bridging the gap between your career achievements and a winning admission essay. We specialize in high-stakes graduate applications."
        linkTargets={MBA_LINKS}
        writingBox={{
          title: "Strategic Personal Statements",
          icon: PenTool,
          description: "We help you weave your professional history into a compelling narrative of future leadership. Our MBA essay writing focuses on professional goals.",
          points: ["M7 Admission Personal Statements", "Executive MBA leadership essays", "Graduate school Statement of Purpose", "Video Essay script preparation"]
        }}
        solvingBox={{
          title: "Gap & Weakness Mitigation",
          icon: Settings,
          description: "Struggling with a gap in your resume or a low GPA? We know how to frame these challenges positively to the admission committee.",
          points: ["Addressing career gaps effectively", "Mitigating low academic metrics", "Drafting persuasive optional essays", "Resume & CV optimization for B-school"]
        }}
        moreBox={{
          title: "Diversity & Contribution Essays",
          icon: Users,
          description: "Showcase how you will contribute to the campus community. We highlight your unique background and perspective.",
          points: ["Compelling Diversity Statements", "Campus contribution essay drafting", "Post-MBA career goal articulation", "Impactful Scholarship essays"]
        }}
      />

      <AssignmentTopicsSection 
        title="Supporting All Graduate Programs"
        topics={["Harvard Business School", "Stanford GSB", "Wharton", "INSEAD", "London Business School", "MIT Sloan", "Columbia Business School", "Chicago Booth", "Kellogg", "IESE", "HEC Paris", "Oxford Saïd"]}
      />

      <FreeWritingTools />

      <ComparisonSection />

      <FAQSection 
        title="MBA Writing FAQs"
        leftFaqs={[
          { question: "Are your writers MBA graduates?", answer: "Yes. Our MBA writing team consists exclusively of graduates and former admissions officers from top global business schools." },
          { question: "Can you help with the interview stage?", answer: "While we primarily focus on written components, we can assist in drafting responses for commonly asked MBA interview questions." }
        ]}
        rightFaqs={[
          { question: "How long does it take to write an MBA essay?", answer: "We recommend starting at least 2-3 weeks before your deadline, but our experts can deliver high-quality essays in as little as 24-48 hours for urgent applications." },
          { question: "Is the service confidential?", answer: "Yes. We maintain 100% confidentiality. Your identity and target schools are never shared with anyone outside of your assigned writer." }
        ]}
      />
    </main>
  );
}

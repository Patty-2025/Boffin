import React from 'react';
import { ShieldCheck, Target, Award, BookOpen, PenTool, Lightbulb, Settings, FileText, Monitor } from 'lucide-react';
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

const EXAM_LINKS: LinkTarget[] = [
  { word: 'take my online exam', type: 'link', path: '/online-exam-help' },
  { word: 'expert assistance', type: 'link', path: '/experts' },
  { word: 'exam prep', type: 'highlight' },
  { word: 'confidential support', type: 'highlight' }
];

export default function OnlineExamHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Secure Online Exam Help | Expert Academic Assistance Services"
        description="Need assistance with online exams or time-sensitive quizzes? Our online exam help services provide confidential, expert support for international students worldwide."
        keywords="online exam help, exam assistance, academic quiz help, international student support, expert exam prep"
        canonicalUrl="/online-exam-help"
      />
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Secure</span>
              <span className="text-blue-700 block">Online Exam Support</span>
              <span className="text-blue-700 block">For Scholars</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Need assistance with your online exams or time-sensitive quizzes? Our <span className="font-bold text-emerald-500">online exam support</span> services provide confidential, expert guidance for international students worldwide to help you achieve the academic success you deserve.
            </p>
            <TrustedLogos />
          </div>
          <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
          </div>
        </div>
      </section>

      <ProfessionalWriters title="Meet Our Exam Specialists" writersData={writerProfiles.assessment} />
      <HowItWorks />

      <ServicesDetailSection 
        title="Secure and Efficient Exam Assistance"
        subtitle="We provide a highly secure, confidential environment for you to get expert support for your online exams and quizzes."
        linkTargets={EXAM_LINKS}
        writingBox={{
          title: "Exam & Quiz Prep",
          icon: Monitor,
          description: "Our experts help you prepare for exams with targeted study guides and practice scenarios designed to build your confidence and mastery.",
          points: ["Customized exam prep materials", "Timed practice simulations", "Conceptual breakdowns", "Efficient problem-solving strategies"]
        }}
        solvingBox={{
          title: "Reliable Exam Support",
          icon: ShieldCheck,
          theme: 'accent',
          description: "Our assistance is strictly human-driven and prioritized for confidentiality and secure communication channels, guaranteeing your academic privacy.",
          points: ["Subject-matter experts", "Confidential communication channels", "Efficient exam management", "Data security protocols"]
        }}
        moreBox={{
          title: "24/7 Academic Assistance",
          icon: Target,
          description: "Exams can be scheduled anytime. Our global team is available 24/7 to provide immediate support for your assessment needs.",
          points: ["Anytime access to specialists", "Urgent request handling", "Confidential expert consultations", "Professional academic standards"]
        }}
      />

      <AssignmentTopicsSection title="Exam Subjects Covered" topics={["STEM Midterms", "Business Analysis Exams", "Humanities Final Quizzes", "Data Science Certs", "General Core Subjects"]} />
      
      <FAQSection 
        title="Online Exam Help FAQs"
        leftFaqs={[
          { question: "Is your exam help secure and confidential?", answer: "Yes. Your privacy is paramount. We use HTTPS-encrypted channels to ensure all communication and assistance remains strictly confidential." },
          { question: "Can you help with timed exams?", answer: "Yes, our experts are prepared for the fast-paced nature of timed examinations and quizzes." }
        ]}
        rightFaqs={[
          { question: "How do you ensure academic honesty?", answer: "We focus on providing conceptual support and high-quality preparation materials that truly help you learn and achieve your academic goals." },
          { question: "Can I communicate with my expert during the exam prep?", answer: "Yes, you have direct, secure access to your assigned expert to discuss preparation strategies and conceptual challenges." }
        ]}
      />
    </main>
  );
}

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, Zap, Award, BookOpen, FileText, Target, Search, Users } from 'lucide-react';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';
import HowWeHireWriters from '../components/HowWeHireWriters';

export default function HireWriter() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Hire Professional</span>
              <span className="text-blue-700 block">Academic Writers</span>
              <span className="text-blue-700 block">From Top Universities</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Stop searching for unreliable help. Connect with PhD-level experts across the USA, UK, Canada, and Australia. Get No-AI, plagiarism-free assignments tailored to your specific university standards.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Order Form Widget */}
           <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
           </div>
        </div>
      </section>

      <ProfessionalWriters title="Choose Your Expert Writer" />

      <HowItWorks />

      <HowWeHireWriters />

      {/* Feature / SEO Section */}
      <section className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-10 leading-tight">Why <span className="text-emerald-500">Hire a Writer</span> from Boffin Global Services?</h2>
            <div className="prose prose-slate max-w-none text-slate-600 font-medium text-lg leading-relaxed space-y-6">
              <p>
                When you hire an academic writer from Boffin Global Services, you're not just getting a freelancer; you're getting a partner in your academic journey. Our writers are alumni of prestigious global institutions, including Ivy League and Russell Group universities.
              </p>
              <p>
                We specialize in delivering high-quality, human-written content that bypasses AI detection and adheres strictly to your rubrics. Whether it's a 500-word reflective journal or a 10,000-word dissertation, our experts handle every project with the same level of academic rigor and confidentiality.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            {[
              { title: "Direct Communication", desc: "Chat directly with your assigned writer throughout the process.", icon: <Users size={24} className="text-emerald-500" /> },
              { title: "Subject Specialists", desc: "We match your project with writers who hold degrees in your specific field.", icon: <Target size={24} className="text-blue-500" /> },
              { title: "Rigorous Quality Check", desc: "Every paper goes through a two-stage review for grammar and citations.", icon: <Award size={24} className="text-purple-500" /> },
              { title: "Total Confidentiality", desc: "Your identity and work are protected with bank-level encryption.", icon: <ShieldCheck size={24} className="text-green-500" /> },
            ].map((item, i) => (
              <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm flex gap-6 items-center">
                <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 text-base">{item.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AssignmentTopicsSection />

      <FreeWritingTools />

      <ComparisonSection />

      <FAQSection 
        title="Hiring a Writer: Common Questions"
        leftFaqs={[
          { question: "Is it legal to hire an academic writer?", answer: "Yes. Hiring a writer for research, model papers, or editing is a common academic practice aimed at helping students understand complex topics and improve their own writing skills." },
          { question: "How do I communicate with my writer?", answer: "Once your order is confirmed, you can use our secure dashboard to message your writer directly, share additional files, and review drafts." }
        ]}
        rightFaqs={[
          { question: "Are your writers native English speakers?", answer: "Yes, we exclusively hire native English speakers from countries like the US, UK, Canada, and Australia to ensure the highest linguistic standards." },
          { question: "What if I am not happy with the paper?", answer: "We offer unlimited free revisions for 14-30 days after delivery to ensure the final product matches your initial requirements perfectly." }
        ]}
      />
    </main>
  );
}

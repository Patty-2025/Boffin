import React from 'react';
import { motion } from 'motion/react';
import HowItWorks from '../components/HowItWorks';
import { CheckCircle2, ShieldCheck, Clock, Zap, Star, Shield, Laptop, Send, Search } from 'lucide-react';
import TrustedLogos from '../components/TrustedLogos';

export default function HowItWorksPage() {
  return (
    <main className="pt-[80px] bg-white font-sans">
      <section className="bg-slate-50 py-20 px-6 overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 bg-gradient-to-br from-blue-700 to-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl text-white"
          >
            <Zap size={32} />
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-8 tracking-tight">
            How boffinglobalgroup.com <span className="text-emerald-500">Works</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-medium mb-12">
            Get your academic assignments completed in four simple, transparent steps. We've streamlined the process to be fast, secure, and entirely student-centric.
          </p>
          <TrustedLogos />
        </div>
      </section>

      {/* Main Process */}
      <section className="py-20">
        <HowItWorks />
      </section>

      {/* Detailed Breakdown Section */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">A Deeper Look at Our Quality Control</h2>
            <p className="text-lg text-slate-500 font-medium">Beyond the simple checkout, here's what happens behind the scenes to guarantee your A+ academic excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6"><Search/></div>
               <h4 className="text-xl font-bold mb-4">1. Smart Expert Matching</h4>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                 Once you place an order, our proprietary algorithm identifies the best available subject-matter expert based on your course code, university region, and academic level. We don't just assign "a writer"—we assign a specialist.
               </p>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 mb-6"><Laptop/></div>
               <h4 className="text-xl font-bold mb-4">2. Collaborative Dashboard</h4>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                 Use your student portal to communicate directly with your expert. You can upload additional documents, clarify points, and receive status updates in real-time. This ensures the final product perfectly mirrors your expectations.
               </p>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6"><Shield/></div>
               <h4 className="text-xl font-bold mb-4">3. Premium QA Audit</h4>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                 Before delivery, every paper passes through our Quality Assurance team. They verify citation accuracy, adherence to the rubric, and conduct thorough plagiarism scans using enterprise-grade software like Turnitin.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Wording Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1000px] mx-auto prose prose-slate text-slate-600 font-medium space-y-8">
           <h2 className="text-blue-700 font-extrabold text-3xl">Delivering Excellence to International Scholars Across the Globe</h2>
           <p>
             The "How it works" at boffinglobalgroup.com is built on foundation of transparency and trust. For students in the United Kingdom, we focus on the specifics of the QAA and Level 6/7 descriptors. For our clients in North America, we align with the Common Core and advanced SAT/ACT or Graduate Record Examination (GRE) standards.
           </p>
           <p>
             We understand that as an international student, you might be nervous about using an "online assignment help service." This is why we've made our process fully auditable. You can see when work starts, monitor progress, and review drafts as they are completed. We are more than just a writing service; we are a dedicated academic partner helping you bridge the gap to success.
           </p>
           <p>
             Our payment systems are protected by bank-level encryption, ensuring that your financial data is never compromised. We also maintain a strict "Privacy by Design" philosophy, meaning your data is anonymized even to the experts performing the task. From Singapore and Malaysia to Canada and the UAE, scholars trust the boffinglobalgroup.com workflow.
           </p>
        </div>
      </section>
    </main>
  );
}

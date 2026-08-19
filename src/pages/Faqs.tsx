import React from 'react';
import { motion } from 'motion/react';
import FAQSection from '../components/FAQSection';
import { HelpCircle, MessageCircle, Mail, Phone, Zap } from 'lucide-react';

export default function Faqs() {
  return (
    <main className="pt-[80px] bg-white font-sans">
      <section className="bg-gradient-to-br from-blue-700 to-emerald-800 py-20 px-6 text-white text-center">
        <div className="max-w-[1000px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8"
          >
            <HelpCircle size={32} className="text-emerald-500" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 capitalize">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            Find quick answers to common questions about our global assignment writing services, expert credentials, and academic guarantee policies.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <FAQSection />
      </section>

      {/* Support CTA */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-12">Still have questions?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6"><MessageCircle/></div>
              <h4 className="font-bold text-slate-900 mb-2">Live Chat</h4>
              <p className="text-xs text-slate-500 mb-6">Talk to our customer success team instantly.</p>
              <button className="text-emerald-500 font-bold text-sm hover:underline">Start Chat Now</button>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6"><Mail/></div>
              <h4 className="font-bold text-slate-900 mb-2">Email Support</h4>
              <p className="text-xs text-slate-500 mb-6">We respond to all inquiries within 2 hours.</p>
              <button className="text-emerald-500 font-bold text-sm hover:underline">Email Us</button>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6"><Phone/></div>
              <h4 className="font-bold text-slate-900 mb-2">Global Hotlines</h4>
              <p className="text-xs text-slate-500 mb-6">Available in UK, US, AU, and more.</p>
              <button className="text-emerald-500 font-bold text-sm hover:underline">View Phone Numbers</button>
            </div>
          </div>
        </div>
      </section>

      {/* Extensive SEO wording */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto text-slate-600 font-medium leading-relaxed prose prose-slate">
           <h2 className="text-blue-700 font-extrabold text-3xl mb-8">Understanding Our Academic Support Framework</h2>
           <p>
             At boffinglobalgroup.com, we receive thousands of inquiries monthly from students worldwide. One of the most frequent questions is about the legality and ethics of using an "assignment help service." We want to be clear: our service is a legitimate academic auxiliary designed to provide model solutions, research assistance, and tutoring. We empower students to overcome linguistic and conceptual barriers, particularly international scholars studying in competitive foreign environments.
           </p>
           <p>
             Another common topic is our expert vetting process. Unlike low-cost tutoring sites, we don't allow anyone to just "sign up" and start writing. Every expert on our platform goes through a rigorous four-stage verification process, including identity verification, academic credential check (MD, PhD, or Master's), a timed subject-matter test, and a probation period under senior editors. This ensures that the person doing your homework is a true professional with years of experience in their field.
           </p>
           <p>
             We also get many questions about regional standards. "Do you know how to write an OSCOLA compliant law paper for UK universities?" "Can you handle the grading rubric of a Group of Eight university in Australia?" The answer is always **YES**. Our system intelligently routes orders to experts familiar with those specific regional and institutional requirements.
           </p>
        </div>
      </section>
    </main>
  );
}

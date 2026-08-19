import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ShieldCheck, Scale, Info, BookOpen } from 'lucide-react';

export default function FairUsePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <Scale size={28} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
              Fair Use Policy
            </h1>
          </div>
          <div className="w-16 h-1 bg-gradient-to-br from-blue-700 to-emerald-800 mb-10"></div>

          <div className="prose prose-slate max-w-none font-medium leading-relaxed text-slate-600 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Info className="text-blue-500" size={24} /> 1. Overview of Fair Use
              </h2>
              <p>
                As an academic bridge for international scholars, boffinglobalgroup.com is committed to upholding the values of academic integrity and honesty. Our services are designed to be an educational resource—a tool to help you learn, research, and understand complex subject matter.
              </p>
              <p>
                Our Fair Use Policy outlines the ethical boundaries of our services. We provide **Model Solutions** and research materials that are meant to serve as a guide for your own academic work.
              </p>
            </section>

            <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="text-green-600" size={24} /> 2. Proper Use of Our Services
              </h2>
              <p>
                When you receive a paper or solution from boffinglobalgroup.com, you are encouraged to use it in the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-slate-600">
                <li>As a **learning resource** to understand the key arguments and structure of a specific topic.</li>
                <li>To gain inspiration for your own unique writing and research.</li>
                <li>To learn correct citation styles (APA, MLA, Harvard, etc.) by observing professional examples.</li>
                <li>To perform further research using the bibliography and sources provided by our experts.</li>
                <li>To understand the level of detail and critical thinking required at your specific academic level (e.g., Master's vs. Undergraduate).</li>
              </ul>
            </section>

            <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="text-blue-600" size={24} /> 3. Improper Use (Prohibited)
              </h2>
              <p>
                We do not support or encourage academic dishonesty. You should **NOT** use our services in any way that violates your university's code of conduct. This includes:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 text-slate-600">
                <li>Submitting the delivered model solution as your own work without any modifications.</li>
                <li>Passing off our expert's insights as your original research without proper synthesis.</li>
                <li>Using our services to cheat on proctored exams or live assessments.</li>
              </ul>
              <p className="mt-4 font-bold text-emerald-500">
                Violation of these principles may result in the termination of your account at boffinglobalgroup.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Academic Integrity for International Students</h2>
              <p>
                We recognize that international scholars often face challenges due to language barriers or differing academic standards between their home country and their place of study (USA, UK, Australia, etc.). Our "assignment help" is designed to level the playing field, providing you with a high-quality benchmark that helps you master the skills needed for global academic success.
              </p>
              <p>
                By using boffinglobalgroup.com, you acknowledge that our services are a supplement to your education, not a replacement for it.
              </p>
            </section>

            <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="mt-1 text-blue-700"><GraduationCap size={24}/></div>
              <div>
                <h4 className="font-bold text-blue-700 mb-2 uppercase text-sm">Advice for Students</h4>
                <p className="text-sm">Always check your university's specific policies on tutoring and external academic assistance. Use our expert feedback as a way to engage more deeply with your course materials and improve your scholarly writing skills over time.</p>
              </div>
            </section>
            
            <p className="text-sm mt-12 text-slate-400">If you have any questions about how to ethically use our materials, please contact our academic advisory team at info@boffinglobalgroup.com</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

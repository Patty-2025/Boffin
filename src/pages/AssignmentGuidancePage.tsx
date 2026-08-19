import React from 'react';
import { GraduationCap, BookOpen, ExternalLink, CheckCircle, UserCheck, Layers, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function AssignmentGuidancePage() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Technical Assignment Guidance & Mentorship | Boffin Global Services"
        description="Expert 1-on-1 assignment guidance, tutoring, and step-by-step problem-solving support for university and college courses."
        keywords="assignment guidance, homework help, academic tutoring, expert mentor, study support, university assignment help"
        canonicalUrl="/assignment-guidance"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-3 py-1 rounded-full">Academic Mentorship & Tutoring</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              Technical Assignment Guidance & Mentorship
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Never get stuck on complex problem sets again. Our expert mentors provide step-by-step assignment guidance, concept breakdowns, and structured study plans to help you master challenging academic subjects.
            </p>
            <TrustedLogos />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Subject Specialist Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <UserCheck className="text-amber-500" size={28} />
              Subject Specialist Methodology & Academic Mentor Expertise
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our academic mentors hold advanced master's and doctoral degrees across STEM, humanities, and business disciplines. We employ Socratic mentoring techniques and rubric-aligned problem-solving frameworks to ensure deep conceptual understanding.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-amber-500" />
                  Rubric Alignment
                </h3>
                <p className="text-sm text-slate-600">Checking every solution against your specific university grading rubric and prompt guidelines.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-amber-500" />
                  Conceptual Clarity
                </h3>
                <p className="text-sm text-slate-600">Providing step-by-step mathematical proofs and logic explanations rather than mere final answers.</p>
              </div>
            </div>
          </div>

          {/* How We Execute Workflow */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-amber-500" size={28} />
              How We Execute: Our 5-Step Mentorship Workflow
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Prompt & Syllabus Audit:</strong> Reviewing assignment instructions, learning outcomes, and grading rubrics.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Concept Breakdown:</strong> Identifying core theoretical principles required to solve the problem set.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Step-by-Step Solution Draft:</strong> Writing structured solutions with clear mathematical derivations and code comments.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>Peer Review & Quality Check:</strong> Verifying accuracy and adherence to academic citation standards.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-amber-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Student Walkthrough:</strong> Delivering notes and explanations designed to help you succeed in exams.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <GraduationCap className="text-amber-500" size={28} />
              Step-by-Step Problem Breakdown & Rubric Alignment
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              We review your professor's grading rubric and course syllabus to ensure every required criterion is fully addressed with rigorous academic depth.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Conceptual Derivations</h3>
                <p className="text-sm text-slate-600">Clear mathematical proofs, algorithm walkthroughs, and code explanations rather than mere final answers.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Citation & Formatting</h3>
                <p className="text-sm text-slate-600">Strict adherence to APA 7th, IEEE, Harvard, and Chicago citation styles.</p>
              </div>
            </div>
          </div>

          {/* Internal Backlinks */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-amber-500" size={28} />
              Explore Related Academic & Technical Services
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Discover our specialized writing and coding support services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Programming Assignment Help</span> <span>→</span>
              </Link>
              <Link to="/dissertation-help-service" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Dissertation & Thesis Help</span> <span>→</span>
              </Link>
              <Link to="/code-debugging" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Code Debugging Service</span> <span>→</span>
              </Link>
              <Link to="/data-analysis" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Data Analysis & SPSS Help</span> <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <ExternalLink className="text-amber-500" size={28} />
              Educational & Research References
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://owl.purdue.edu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                Purdue OWL <ExternalLink size={14} />
              </a>
              <a href="https://www.khanacademy.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                Khan Academy <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <FAQSection 
            title="Assignment Guidance FAQs"
            leftFaqs={[
              { question: "How do guidance sessions work?", answer: "You submit your prompt, and our mentors provide detailed written guidance or structured review walkthroughs." },
              { question: "Can you help with last-minute homework assignments?", answer: "Yes! We have experts online 24/7 ready to assist with tight deadlines." }
            ]}
          />
        </div>
      </section>
    </main>
  );
}

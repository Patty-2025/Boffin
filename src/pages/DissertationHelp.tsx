import React from 'react';
import { GraduationCap, BookOpen, ExternalLink, CheckCircle, ShieldCheck, UserCheck, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function DissertationHelp() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Dissertation Writing Services & PhD Thesis Help | Global Support"
        description="Navigate the final stage of your degree with confidence. Our professional dissertation writing services provide expert help from PhD scholars. 100% original, for students worldwide."
        keywords="dissertation writing services, dissertation help, PhD thesis assistance, PhD writers, international academic support"
        canonicalUrl="/dissertation-help-service"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">PhD & Master's Research Services</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              Professional Dissertation Writing & Thesis Assistance
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Navigate the final stage of your academic career with absolute confidence. Our post-doctoral researchers, statisticians, and PhD writers provide chapter-by-chapter guidance, literature reviews, methodology design, and defense preparation.
            </p>
            <TrustedLogos />
          </div>
        </div>
      </section>

      {/* Main Content & In-Depth Tutorials immediately after hero */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Subject Specialist Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <UserCheck className="text-purple-600" size={28} />
              Subject Specialist Methodology & PhD Expert Background
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Every dissertation project is assigned to a verified Doctor of Philosophy (PhD) scholar specializing in your specific academic discipline. Our specialists employ rigorous qualitative and quantitative methodologies, adhering strictly to institutional guidelines, IRB ethical approvals, and APA 7th edition formatting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-purple-600" />
                  Methodological Rigor
                </h3>
                <p className="text-sm text-slate-600">Advanced structural equation modeling (SEM), thematic coding, and experimental design.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-purple-600" />
                  Peer-Reviewed Citations
                </h3>
                <p className="text-sm text-slate-600">Sourcing high-impact factor journals and academic repositories with zero fabricated references.</p>
              </div>
            </div>
          </div>

          {/* How We Write Process */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-purple-600" size={28} />
              How We Write: Our Milestone Research & Writing Workflow
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-purple-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Proposal & Topic Defense:</strong> Formulating defensible research questions and scope justification.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-purple-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Systematic Literature Review:</strong> PRISMA-compliant sourcing and thematic gap identification.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-purple-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Data Gathering & Analysis:</strong> Quantitative SPSS/R analysis or qualitative NVivo coding.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-purple-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>Discussion & Synthesis:</strong> Connecting empirical findings back to theoretical frameworks.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-purple-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Committee Review & Formatting:</strong> Applying university style guides and conducting plagiarism scans.
                </div>
              </div>
            </div>
          </div>

          {/* Core Chapters Breakdown */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <GraduationCap className="text-purple-600" size={28} />
              The Five-Chapter Dissertation Blueprint
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              A successful dissertation requires rigorous structural coherence across all five standard chapters. Our PhD mentors guide you through every stage from initial proposal defense to final manuscript submission.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Chapters 1-3 (Proposal & Methodology)</h3>
                <p className="text-sm text-slate-600">Formulating research questions, conducting systematic literature reviews, and detailing quantitative or qualitative methodology.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2">Chapters 4-5 (Analysis & Conclusions)</h3>
                <p className="text-sm text-slate-600">Interpreting statistical results, synthesizing theoretical implications, and drafting recommendations for future study.</p>
              </div>
            </div>
          </div>

          {/* Internal Backlinks */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-purple-600" size={28} />
              Explore Related Services & Academic Tools
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Support your academic journey with our specialized research services and citation utilities:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/data-analysis" className="p-3 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Data Analysis & SPSS Help</span> <span>→</span>
              </Link>
              <Link to="/assignment-guidance" className="p-3 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Assignment Guidance & Mentorship</span> <span>→</span>
              </Link>
              <Link to="/technical-documentation" className="p-3 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Technical Documentation Writing</span> <span>→</span>
              </Link>
              <Link to="/citation-generator" className="p-3 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Free Citation Generator</span> <span>→</span>
              </Link>
              <Link to="/plagiarism-checker" className="p-3 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Plagiarism Checker Tool</span> <span>→</span>
              </Link>
              <Link to="/word-counter" className="p-3 bg-slate-50 hover:bg-purple-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Word & Page Counter Tool</span> <span>→</span>
              </Link>
            </div>
          </div>

          {/* External Authoritative Links */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-purple-600" size={28} />
              Global Research Portals & Standards
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                Google Scholar <ExternalLink size={14} />
              </a>
              <a href="https://www.jstor.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                JSTOR Archives <ExternalLink size={14} />
              </a>
              <a href="https://owl.purdue.edu" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                Purdue OWL Citations <ExternalLink size={14} />
              </a>
            </div>
          </div>

        </div>

        {/* Sidebar Order Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderFormWidget />
          </div>
        </div>
      </section>

      <AssignmentTopicsSection title="Dissertation & Thesis Disciplines" topics={["Clinical & Social Medicine", "Business & Strategic Management", "Educational Leadership", "Law & Criminology", "Engineering & Architecture", "Data Science & AI"]} />
      
      <FreeWritingTools />
      <ComparisonSection />

      <FAQSection 
        title="Dissertation Help FAQs"
        leftFaqs={[
          { question: "Can I pay chapter by chapter?", answer: "Yes! We offer milestone-based payments so you can review and approve each chapter as it's completed." },
          { question: "Are your writers native English PhD scholars?", answer: "All our dissertation mentors hold doctorate degrees from accredited universities in the US, UK, and Australia." }
        ]}
      />
    </main>
  );
}

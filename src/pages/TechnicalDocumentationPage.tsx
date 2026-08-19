import React from 'react';
import { FileText, BookOpen, ExternalLink, CheckCircle, UserCheck, Layers, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function TechnicalDocumentationPage() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Technical Documentation & API Manuals | Boffin Global Services"
        description="Expert technical writing, API specifications, software requirements specifications (SRS), user manuals, and research documentation."
        keywords="technical documentation, API docs, SRS writing, software user manual, technical writer, system specifications"
        canonicalUrl="/technical-documentation"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Technical Writing & API Manuals</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              Technical Documentation & API Specification Support
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Clear, concise, and professional documentation for software projects, REST APIs, and engineering systems. Our technical writers ensure your code and designs are easily understood by evaluators and users.
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
              <UserCheck className="text-teal-600" size={28} />
              Subject Specialist Methodology & Technical Writer Expertise
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our technical writing team consists of professional technical communicators and software developers certified in OpenAPI standards and IEEE documentation protocols. We structure documents for maximum clarity, readability, and technical precision.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-teal-600" />
                  IEEE & ISO Standards
                </h3>
                <p className="text-sm text-slate-600">Adhering strictly to IEEE 830/29148 standards for Software Requirements Specifications (SRS).</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-teal-600" />
                  API-First Clarity
                </h3>
                <p className="text-sm text-slate-600">Structuring OpenAPI 3.0 specs with detailed request/response payloads and error handling matrices.</p>
              </div>
            </div>
          </div>

          {/* How We Write Workflow */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-teal-600" size={28} />
              How We Write: Our 5-Step Documentation Workflow
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Audience & Scope Analysis:</strong> Determining whether documentation targets developers, end-users, or academic committee evaluators.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Outline & Architecture Mapping:</strong> Structuring Table of Contents, system workflows, and glossary definitions.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Drafting & Code Snippets:</strong> Writing clear explanations accompanied by validated configuration files and code examples.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>Review & Usability Testing:</strong> Validating API specs against Postman/Swagger UI and testing instructions for clarity.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Final Formatting & Export:</strong> Delivering publication-ready Markdown, PDF, or Word documentation packages.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <FileText className="text-teal-600" size={28} />
              OpenAPI 3.0 & Swagger Specifications
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Comprehensive endpoint references, request/response payloads, authentication workflows (OAuth2/JWT), and code examples in multiple languages.
            </p>
            <pre className="bg-slate-900 text-teal-300 p-4 rounded-xl text-xs font-mono overflow-x-auto">
{`paths:
  /api/v1/users:
    get:
      summary: Retrieve user list
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array`}
            </pre>
          </div>

          {/* Internal Backlinks */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-teal-600" size={28} />
              Explore Related Technical Services & Tools
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Pair your technical documentation with our programming and system architecture support:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Programming Assignment Help</span> <span>→</span>
              </Link>
              <Link to="/software-architecture" className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Software Architecture & UML</span> <span>→</span>
              </Link>
              <Link to="/code-debugging" className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Code Debugging Service</span> <span>→</span>
              </Link>
              <Link to="/assignment-guidance" className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Assignment Guidance & Tutoring</span> <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <ExternalLink className="text-teal-600" size={28} />
              Writing Standards & References
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.writethedocs.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                Write the Docs <ExternalLink size={14} />
              </a>
              <a href="https://swagger.io/specification/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                OpenAPI Specification <ExternalLink size={14} />
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

      <FAQSection 
        title="Technical Documentation FAQs"
        leftFaqs={[
          { question: "What formats do you provide documentation in?", answer: "We deliver documentation in Markdown, PDF, HTML, Word, and Swagger UI / OpenAPI 3.0 formats." },
          { question: "Can you document existing codebases?", answer: "Yes! We analyze your source code repository and generate complete API references and user manuals." }
        ]}
      />
    </main>
  );
}

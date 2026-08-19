import React from 'react';
import { Cpu, Layers, Workflow, ExternalLink, CheckCircle, UserCheck, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function SolidWorks() {
  const solidWorksFaqsLeft = [
    {
      question: "Can you help with complex assemblies and motion studies?",
      answer: "Yes. Our team handles large, multi-part assemblies, applying appropriate mates, defining custom motion profiles, and running dynamic simulations to track velocity, displacement, and joint forces."
    },
    {
      question: "What deliverables do I receive for a SolidWorks project?",
      answer: "You will receive the native parametric files (.SLDPRT, .SLDASM), standardized 2D engineering drawings (.SLDDRW) with full geometric dimensioning and tolerancing (GD&T), step-by-step PDF reports, and high-quality 3D render files."
    },
    {
      question: "Can you run finite element analysis (FEA) simulations inside SolidWorks?",
      answer: "Absolutely. We utilize SolidWorks Simulation Professional to run static structural analyses, thermal stress mapping, and fatigue cycle tests, compiling full stress distribution contour plots."
    }
  ];

  const solidWorksFaqsRight = [
    {
      question: "Are the models designed from scratch?",
      answer: "Yes, all models are built completely from scratch using robust parametric design techniques, ensuring that your parts are easily editable with fully resolved feature trees and zero rebuild errors."
    },
    {
      question: "Do you support CSWA, CSWP, and CSWE preparation?",
      answer: "Yes, our certified SolidWorks experts offer comprehensive coaching and tutor-guided reference solutions designed to help you master part modeling, assembly mating, and advanced surface modeling techniques."
    },
    {
      question: "How fast can you deliver a SolidWorks part and drawing?",
      answer: "For express requests, we can deliver fully completed 3D models and accompanying technical drawings within 24 to 48 hours, fully verified by senior mechanical designers."
    }
  ];

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional SolidWorks CAD Modeling & Simulation Support | Boffin Global"
        description="Expert 3D parametric part design, complex assemblies, FEA analysis, motion studies, and engineering drafting support using SolidWorks."
        keywords="SolidWorks assignment help, SolidWorks simulation, 3D CAD modeling support, FEA structural stress analysis, mechanical engineering drafting"
        canonicalUrl="/solidworks"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              Mechanical Engineering & CAD Excellence
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight font-display">
              Professional SolidWorks CAD & Simulation Support
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6 font-light">
              Master parametric 3D CAD modeling, large-scale assemblies, dynamic motion studies, and high-fidelity finite element analysis (FEA) with our certified SolidWorks engineers.
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
              Subject Specialist Methodology & Certified CAD Experts
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our engineering support team consists of Certified SolidWorks Professionals (CSWP) and mechanical design specialists. We ensure robust feature trees, clean parent-child sketch relationships, fully-constrained geometries, and standardized mechanical drafting protocols.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-teal-600" />
                  Clean Feature Trees
                </h3>
                <p className="text-sm text-slate-600">Models designed with fully defined, logical feature trees, eliminating rebuild errors and external references.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-teal-600" />
                  GD&T Standards Compliance
                </h3>
                <p className="text-sm text-slate-600">2D engineering drawings configured with strict ANSI or ISO tolerancing, datums, and weld symbols.</p>
              </div>
            </div>
          </div>

          {/* How We Execute Workflow */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-teal-600" size={28} />
              Our 5-Step SolidWorks Delivery Protocol
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">1</span>
                <div>
                  <strong>Parametric Sketching & Part Modeling:</strong> Translating orthographic projections, design blueprints, or hand-sketches into fully-defined 2D sketches and extruded solid bodies.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">2</span>
                <div>
                  <strong>Assembly Assembly Mating:</strong> Constructing clean sub-assemblies and final designs utilizing precise standard, advanced, and mechanical mates (gears, cams, hinges).
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">3</span>
                <div>
                  <strong>FEA Simulation & Mesh Controls:</strong> Setting up load configurations, boundary conditions, and material properties for structural, thermal, or fatigue simulation models.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">4</span>
                <div>
                  <strong>Production-Ready Technical Drafting:</strong> Creating high-precision 2D detail drawings, including section views, isometric callouts, and comprehensive Bills of Materials (BOM).
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">5</span>
                <div>
                  <strong>Final Validation & Packaging:</strong> Packaging pristine native source files (.sldprt, .sldasm, .slddrw), generic STEP/IGES models, and formal computational stress reports.
                </div>
              </div>
            </div>
          </div>

          {/* High Precision FEA simulation specifications */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Cpu className="text-teal-600" size={28} />
              Finite Element Analysis (FEA) & Stress Validation
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 font-light">
              Evaluate structural yield conditions, deformation margins, factor of safety envelopes, and modal analysis on custom assemblies using modern mathematical equations.
            </p>
            <div className="bg-slate-900 text-teal-400 p-4 rounded-xl text-xs font-mono leading-relaxed">
              {`SolidWorks Simulation Checklist:\n✔ Assign accurate density, yield strength, and Poisson's ratio values.\n✔ Set up mesh sensitivity controls with curvature-based refinement on concentration stress points.\n✔ Confirm Factor of Safety (FoS) threshold matches safety margin limits (e.g. FoS >= 2.0).`}
            </div>
          </div>

          {/* Related services links */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-teal-600" size={28} />
              Explore Related Engineering & Programming Services
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              We specialize in robust multidisciplinary support services for international engineering students:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/engineering-simulations" className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Engineering Simulations (FEA & CFD)</span> <span>→</span>
              </Link>
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>MATLAB & Programming Services</span> <span>→</span>
              </Link>
              <Link to="/technical-documentation" className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Technical Specifications Support</span> <span>→</span>
              </Link>
              <Link to="/code-debugging" className="p-3 bg-slate-50 hover:bg-teal-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Code Debugging & Simulations</span> <span>→</span>
              </Link>
            </div>
          </div>

          {/* Academic Integrity Standards Section */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-teal-600" size={28} />
              Confidentiality & Academic Integrity Standards
            </h2>
            <p className="text-slate-600 leading-relaxed font-light">
              We are strictly committed to original design methodologies. All reference CAD components, custom drawings, and dynamic structural simulations are engineered entirely from scratch according to standard collegiate and corporate research principles.
            </p>
          </div>

        </div>

        {/* Sidebar Order Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Core Benefits Block */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 font-display">
                SolidWorks Service Benefits
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-600 font-light leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-teal-600 mt-1 shrink-0" />
                  <span>Fully parametrical models with step-by-step rebuild trees</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-teal-600 mt-1 shrink-0" />
                  <span>ANSI/ISO drawing standard sheets (.slddrw)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-teal-600 mt-1 shrink-0" />
                  <span>Complete BOM list and assembly render files</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={15} className="text-teal-600 mt-1 shrink-0" />
                  <span>100% compliant simulation analysis reports</span>
                </li>
              </ul>
            </div>

            {/* Price calculator OrderFormWidget */}
            <OrderFormWidget />

          </div>
        </div>
      </section>

      {/* Accordion FAQ Area */}
      <FAQSection 
        title="SolidWorks CAD & Drafting FAQs"
        leftFaqs={solidWorksFaqsLeft}
        rightFaqs={solidWorksFaqsRight}
      />
    </main>
  );
}

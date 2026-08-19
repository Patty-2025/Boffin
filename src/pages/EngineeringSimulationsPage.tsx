import React from 'react';
import { Cpu, Layers, Workflow, ExternalLink, CheckCircle, UserCheck, BookOpen, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function EngineeringSimulationsPage() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title="Professional Engineering Simulations & CAD Modeling | Boffin Global Services"
        description="Expert FEA, CFD, AutoCAD, SolidWorks, and MATLAB Simulink simulation support for engineering students and research projects."
        keywords="engineering simulations, FEA analysis, CFD modeling, AutoCAD support, SolidWorks help, MATLAB Simulink"
        canonicalUrl="/engineering-simulations"
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Mechanical & Civil Engineering</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              Engineering Simulations & CAD Modeling Support
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              Master complex physical simulations, finite element analysis (FEA), computational fluid dynamics (CFD), and parametric 3D CAD assemblies with our senior mechanical and civil engineers.
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
              <UserCheck className="text-emerald-600" size={28} />
              Subject Specialist Methodology & PE Engineer Expertise
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our engineering team features professional engineers (PE) and doctoral researchers specializing in solid mechanics, thermodynamics, and fluid dynamics. We follow strict mesh convergence criteria and boundary condition validation to ensure simulation accuracy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-600" />
                  Mesh Convergence
                </h3>
                <p className="text-sm text-slate-600">Refining element sizes until stress variance is under 5% between successive iterations.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-emerald-600" />
                  Factor of Safety
                </h3>
                <p className="text-sm text-slate-600">Ensuring all structural designs comply with ASME and ISO yield strength safety margins.</p>
              </div>
            </div>
          </div>

          {/* How We Execute Workflow */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-emerald-600" size={28} />
              How We Execute: Our 5-Step Simulation Workflow
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>CAD Model Geometry Prep:</strong> Cleaning geometry, removing fillets/holes that cause mesh distortion.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Material & Boundary Setup:</strong> Assigning isotropic/orthotropic material properties and fixture constraints.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Meshing & Refinement:</strong> Applying tetrahedral/hexahedral elements with localized high-density refinement.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>Solver Execution:</strong> Running ANSYS, SolidWorks, or MATLAB Simulink solver algorithms.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-emerald-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Validation & Technical Report:</strong> Compiling contour plots, stress concentrations, and design recommendations.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Cpu className="text-emerald-600" size={28} />
              High-Precision FEA & CFD Analysis
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Validate structural integrity, thermal dissipation, and fluid flow dynamics using ANSYS Workbench, SolidWorks Simulation, and COMSOL Multiphysics.
            </p>
            <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl text-xs font-mono">
              {`Mesh Convergence Rule:\nRefine element size until stress variance < 5% between iterations.\nTarget Factor of Safety (FoS) >= 2.0 for structural compliance.`}
            </div>
          </div>

          {/* Internal Backlinks */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-emerald-600" size={28} />
              Explore Related Engineering & Technical Services
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Explore our other technical writing and programming support services:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Programming Assignment Help</span> <span>→</span>
              </Link>
              <Link to="/technical-documentation" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Technical Documentation & Manuals</span> <span>→</span>
              </Link>
              <Link to="/code-debugging" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Code Debugging & Optimization</span> <span>→</span>
              </Link>
              <Link to="/assignment-guidance" className="p-3 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Assignment Guidance & Tutoring</span> <span>→</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Workflow className="text-emerald-600" size={28} />
              Standards & Engineering References
            </h2>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.asme.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                ASME Standards <ExternalLink size={14} />
              </a>
              <a href="https://ieeexplore.ieee.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-800 transition-colors">
                IEEE Xplore <ExternalLink size={14} />
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
        title="Engineering Simulations FAQs"
        leftFaqs={[
          { question: "What CAD and FEA software do you support?", answer: "We support ANSYS, SolidWorks, AutoCAD, COMSOL Multiphysics, Revit, and MATLAB Simulink." },
          { question: "Do you provide step-by-step setup guides?", answer: "Yes! Every simulation order includes setup instructions, mesh files, and detailed contour result reports." }
        ]}
      />
    </main>
  );
}

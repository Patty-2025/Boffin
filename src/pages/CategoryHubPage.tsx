import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, UserCheck, Layers, BookOpen, Wrench, BarChart2, Code } from 'lucide-react';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

const hubs: Record<string, { title: string; category: string; description: string; items: { name: string; slug: string; desc: string }[] }> = {
  'engineering-services': {
    title: 'Engineering & Design Software Support',
    category: 'Engineering Hub',
    description: 'Expert assistance with CAD drafting, BIM modeling, mechanical simulations, and structural analysis software.',
    items: [
      { name: 'AutoCAD', slug: 'autocad', desc: '2D drafting, 3D modeling, DWG optimization' },
      { name: 'Revit / BIM', slug: 'revit', desc: 'Building Information Modeling & architectural rendering' },
      { name: 'SolidWorks', slug: 'solidworks', desc: 'Mechanical assemblies, FEA, and 3D CAD' },
      { name: 'BIM Standards', slug: 'bim', desc: 'Clash detection and LOD standards' },
      { name: 'SketchUp', slug: 'sketchup', desc: '3D architectural and interior models' },
      { name: 'Civil 3D', slug: 'civil-3d', desc: 'Grading, corridors, and topographic profiling' }
    ]
  },
  'data-analysis-services': {
    title: 'Data Analysis & Statistics Software Support',
    category: 'Statistics Hub',
    description: 'Professional statistical analysis, data modeling, econometrics, and quantitative research help.',
    items: [
      { name: 'SPSS', slug: 'spss', desc: 'Statistical testing, ANOVA, and regression' },
      { name: 'R Programming', slug: 'r-programming', desc: 'RStudio, tidyverse, and ggplot2 visualizations' },
      { name: 'MATLAB', slug: 'matlab', desc: 'Numerical computing and Simulink models' },
      { name: 'Excel (Advanced)', slug: 'excel', desc: 'VBA macros, Power Query, and financial models' },
      { name: 'Stata', slug: 'stata', desc: 'Econometric panel data and time series' },
      { name: 'SAS', slug: 'sas', desc: 'Base SAS and predictive analytics' }
    ]
  },
  'programming-services': {
    title: 'Programming & Technical Computing Support',
    category: 'Programming Hub',
    description: 'Expert coding assistance, algorithms, data structures, full-stack web development, and database design.',
    items: [
      { name: 'Python', slug: 'python', desc: 'Data science, web apps, and scripting' },
      { name: 'Java', slug: 'java', desc: 'Object-oriented programming and Spring Boot' },
      { name: 'C++', slug: 'cpp', desc: 'Memory management, STL, and algorithms' },
      { name: 'C Programming', slug: 'c', desc: 'Systems programming and embedded C' },
      { name: 'JavaScript', slug: 'javascript', desc: 'React, Node.js, and web development' },
      { name: 'SQL', slug: 'sql', desc: 'Database schema design and query optimization' }
    ]
  },
  'business-services': {
    title: 'Business, Accounting & Financial Software Support',
    category: 'Business Hub',
    description: 'Expert help with financial analysis, accounting software, business case studies, and corporate reporting.',
    items: [
      { name: 'Financial Modeling', slug: 'excel', desc: 'DCF models, budgeting, and forecasting' },
      { name: 'SPSS Business Stats', slug: 'spss', desc: 'Market research and survey analysis' },
      { name: 'Python Automation', slug: 'python', desc: 'Business process automation and reports' }
    ]
  }
};

export default function CategoryHubPage() {
  const { hubId } = useParams();
  const hub = (hubId && hubs[hubId]) || hubs['engineering-services'];

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title={`${hub.title} | Boffin Global Services`}
        description={hub.description}
        keywords={`${hub.category}, assignment help, software support`}
        canonicalUrl={`/${hubId}`}
      />
      
      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{hub.category}</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              {hub.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {hub.description}
            </p>
            <TrustedLogos />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Items Grid */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Layers className="text-amber-600" size={28} />
              Supported Tools & Specializations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hub.items.map((item) => (
                <Link 
                  key={item.slug} 
                  to={`/subject/${item.slug}`}
                  className="bg-slate-50 p-5 rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group block"
                >
                  <h3 className="font-bold text-slate-800 mb-1 group-hover:text-amber-600 transition-colors flex items-center justify-between">
                    <span>{item.name}</span>
                    <span className="text-xs text-amber-600 font-semibold">View Guide →</span>
                  </h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <UserCheck className="text-amber-600" size={28} />
              Expert Methodology & Quality Assurance
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Our specialists provide rigorous, academically sound deliverables with comprehensive documentation and code comments.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-amber-600" />
                  Prompt Alignment
                </h3>
                <p className="text-sm text-slate-600">Strictly following your rubric guidelines, version requirements, and formatting standards.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <CheckCircle size={18} className="text-amber-600" />
                  On-Time Guarantee
                </h3>
                <p className="text-sm text-slate-600">Reliable delivery before your deadline with free revisions included.</p>
              </div>
            </div>
          </div>

          {/* Internal Links */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <BookOpen className="text-amber-600" size={28} />
              Other Academic Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/programming-help-service" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Programming Assignment Help</span> <span>→</span>
              </Link>
              <Link to="/code-debugging" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Code Debugging Service</span> <span>→</span>
              </Link>
              <Link to="/data-analysis" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Data Analysis & Statistics</span> <span>→</span>
              </Link>
              <Link to="/assignment-guidance" className="p-3 bg-slate-50 hover:bg-amber-50 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 transition-colors flex items-center justify-between">
                <span>Assignment Guidance & Tutoring</span> <span>→</span>
              </Link>
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
        title={`${hub.title} FAQs`}
        leftFaqs={[
          { question: "What level of academic support do you provide?", answer: "We provide expert guidance, problem walkthroughs, fully completed project files, and step-by-step documentation." },
          { question: "Are your experts certified?", answer: "Yes, our team consists of professional engineers, statisticians, and senior software developers." }
        ]}
      />
    </main>
  );
}

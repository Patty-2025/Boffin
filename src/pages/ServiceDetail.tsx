import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  UserCheck, 
  Layers, 
  FileText, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import { allServices, ServiceItem } from '../data/services';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import FAQSection from '../components/FAQSection';
import OrderFormWidget from '../components/OrderFormWidget';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const foundService = allServices.find(s => s.id === id);
    if (foundService) {
      setService(foundService);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center bg-[#f8f9fa]">
        <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Split FAQs evenly into Left and Right sections for the FAQSection component
  const half = Math.ceil((service.faqs || []).length / 2);
  const leftFaqs = (service.faqs || []).slice(0, half);
  const rightFaqs = (service.faqs || []).slice(half);

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title={`${service.title} | Boffin Global Services Solutions`}
        description={service.desc}
        keywords={service.seoKeywords.join(', ')}
        canonicalUrl={`/service/${service.id}`}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="bg-white border-b border-slate-200 py-3.5 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm font-medium">
          <Link to="/" className="text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900" aria-current="page">{service.title}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white pt-10 pb-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
              Academic & Professional Support
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-4 mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              {service.desc}
            </p>
            <TrustedLogos />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          
          {/* Subject Specialist Methodology Block */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <UserCheck className="text-teal-600" size={28} />
              Subject Specialist Methodology & {service.title} Expert Guidance
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {service.longDesc}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {service.benefits.slice(0, 2).map((benefit, i) => (
                <div key={i} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={18} className="text-teal-600" />
                    Focus Area {i + 1}
                  </h3>
                  <p className="text-sm text-slate-600">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How We Write / Process Workflow Block */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <Layers className="text-teal-600" size={28} />
              How We Work: Our 5-Step {service.title} Workflow
            </h2>
            <div className="space-y-4 text-slate-700 text-sm">
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <strong>Requirements & Rubric Analysis:</strong> Sourcing precise project guidelines, syllabi, academic reference frameworks, and specifications.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <strong>Structured Outline Planning:</strong> Creating a clear research outline, literature mapping, or architectural system breakdown.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                <div>
                  <strong>Drafting & Sourcing Evidence:</strong> Executing high-grade drafting supported by authenticated datasets, peer-reviewed sources, or code.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                <div>
                  <strong>Academic Quality Review:</strong> Verification of styling (APA, Harvard, Chicago, Vancouver), format alignments, and rigorous plagiarism tests.
                </div>
              </div>
              <div className="flex gap-3 items-start bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="bg-teal-600 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">5</span>
                <div>
                  <strong>Final Proof & Export Delivery:</strong> Shipping polished, publication-ready files directly to your student dashboard with ongoing revision options.
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Context Sections from Data */}
          {service.detailedSections?.map((section, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <FileText className="text-teal-600" size={28} />
                {section.heading}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {section.paragraph}
              </p>
            </div>
          ))}

          {/* Visual Showcase / Deliverable Architecture */}
          {service.extraImages && service.extraImages.length > 0 && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <ExternalLink className="text-teal-600" size={28} />
                Visual Reference & Deliverable Structure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.extraImages.map((imgUrl, i) => (
                  <div key={i} className="aspect-video rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                    <img 
                      src={imgUrl} 
                      alt={`${service.title} architectural detail ${i + 1}`} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Integrity & Quality Standards Guarantee */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
              <ShieldCheck className="text-teal-600" size={28} />
              Quality Standards & Academic Integrity Guarantee
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              All support services, tutoring, and sample solutions follow rigorous academic ethics and institution rules. We provide premium educational reference guides, study guides, and editing support to help you achieve long-term mastery.
            </p>
            <div className="flex flex-wrap gap-2">
              {service.seoKeywords.map((kw, i) => (
                <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-semibold">
                  {kw}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar Order Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Core Benefits Block */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                Core Service Benefits
              </h3>
              <ul className="space-y-3.5">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-teal-600 mt-1 shrink-0" />
                    <span className="text-sm text-slate-600 leading-normal">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Live Checkout Estimator Form Widget */}
            <OrderFormWidget />

          </div>
        </div>
      </section>

      {/* Structured FAQ Accordions split elegantly */}
      <FAQSection 
        title={`${service.title} Frequently Asked Questions`}
        leftFaqs={leftFaqs}
        rightFaqs={rightFaqs}
      />
    </main>
  );
}

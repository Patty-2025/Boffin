import React from 'react';
import { Link } from 'react-router-dom';
import { FileUp, ShieldCheck, FileText, CheckCircle2, Calendar, BookOpen, DollarSign, Headphones, CreditCard } from 'lucide-react';
import ReviewsSection from './ReviewsSection';

const SketchArrowRight = ({ className = "w-16 h-12" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 22c25-3 58-2 105-1m-15-12c5 4 10 9 16 11-4 3-10 8-15 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 24c25-2 58-3 105-2m-13-14c4 4 11 10 16 12-4 2-12 9-16 13"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.6"
    />
  </svg>
);

interface Step {
  title: string;
  description: string;
  icon: any;
}

interface WhyUsItem {
  title: string;
  text: string;
  icon: any;
}

interface HowItWorksProps {
  title?: string;
  steps?: Step[];
  buttonText?: string;
  showWhyUs?: boolean;
  whyUsTitle?: string;
  whyUsSubtitle?: string;
  whyUsItems?: WhyUsItem[];
  whyUsButtonText?: string;
  showOneStop?: boolean;
}

const defaultSteps: Step[] = [
  {
    title: "Submit Your Request",
    description: "Tell us what you’re working on, the software or subject involved, and where you need help.",
    icon: FileUp
  },
  {
    title: "Get Expert Guidance",
    description: "We review your request and provide step-by-step support, explanations, or solutions tailored to your task.",
    icon: ShieldCheck
  },
  {
    title: "Complete with Confidence",
    description: "Apply what you’ve learned, fix errors, and submit your work with clarity and accuracy.",
    icon: FileText
  }
];

const defaultWhyUsItems: WhyUsItem[] = [
  { title: 'Step-by-Step Guidance', icon: CheckCircle2, text: 'We don’t just give answers — we help you understand your work and underlying logic.' },
  { title: 'Accurate & Reliable Support', icon: Calendar, text: 'Get correct results, clear explanations, and practical solutions.' },
  { title: 'Technical Expertise', icon: BookOpen, text: 'Support for tools like SPSS, MATLAB, AutoCAD, R, and more.' },
  { title: 'Secure & Confidential', icon: ShieldCheck, text: 'Your information and work remain private. We maintain strict confidentiality.' },
  { title: 'Fast Response', icon: DollarSign, text: 'Get help when you need it, even under tight deadlines.' },
  { title: '24/7 Support', icon: Headphones, text: 'Our customer support team is available 24/7 to assist you. Whether you have a question or need an update, we are always here to help.' },
];

export default function HowItWorks({ 
  title = "How Our Support Works", 
  steps = defaultSteps, 
  buttonText = "Get Help Now",
  showWhyUs = true,
  whyUsTitle = "Why Students Choose Us",
  whyUsSubtitle = "Get dedicated technical help across all platforms. We provide reliable support from leading software experts.",
  whyUsItems = defaultWhyUsItems,
  whyUsButtonText = "Talk to an Expert",
  showOneStop = true
}: HowItWorksProps) {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center w-full mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-teal-900 bg-teal-500/15 px-3.5 py-1.5 rounded-full border border-teal-500/30 shadow-xs">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-slate-900 tracking-tight leading-[1.10] w-full">
            {title}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 relative">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center text-center flex-1 bg-white border border-slate-200/90 p-8 rounded-3xl shadow-sm relative group hover:border-amber-400 transition-all">
                
                {/* Step Number Badge */}
                <span className="absolute top-4 left-4 bg-amber-500/15 text-amber-900 border border-amber-500/30 font-black text-xs px-3 py-1 rounded-full">
                  Step 0{index + 1}
                </span>

                <div className="w-20 h-20 bg-amber-50 border border-amber-200/80 text-amber-600 rounded-2xl flex items-center justify-center mb-6 mt-2 group-hover:scale-105 transition-all shadow-xs">
                  <step.icon size={36} strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex flex-col justify-center items-center text-slate-400 self-center">
                  <SketchArrowRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/order" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black py-4 px-9 rounded-xl cursor-pointer transition-all text-base shadow-lg shadow-amber-500/20 active:scale-95">
            <span>{buttonText}</span>
            <CheckCircle2 size={18} />
          </Link>
        </div>

        {showWhyUs && (
          <div className="mt-20 pt-16 border-t border-slate-200">
            <div className="text-center w-full mx-auto mb-12 sm:mb-16 space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-500/15 px-3.5 py-1.5 rounded-full border border-amber-500/30 shadow-xs">
                Proven Track Record
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-slate-900 tracking-tight leading-[1.10] w-full">
                {whyUsTitle}
              </h2>
              <p className="text-base lg:text-lg text-slate-600 text-center max-w-3xl mx-auto leading-relaxed">
                {whyUsSubtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {whyUsItems.map((item, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-amber-400 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center flex-shrink-0 text-amber-600 shadow-xs">
                    <item.icon size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h4 className="text-base font-extrabold text-slate-900 mb-1.5">{item.title}</h4>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link to="/order" className="inline-block bg-slate-900 hover:bg-slate-800 text-amber-400 border border-slate-800 font-extrabold py-3.5 px-8 rounded-xl cursor-pointer transition-all text-sm shadow-md">
                {whyUsButtonText} &rarr;
              </Link>
            </div>
          </div>
        )}

        {showOneStop && (
          <div className="mt-16 pt-16 border-t border-slate-200">
            <div className="text-center w-full mx-auto mb-10 sm:mb-12 space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                What We Help You With
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Get step-by-step guidance, code debugging, and complex problem-solving from verified technical experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                { title: 'Data Analysis Support', icon: FileText, text: 'SPSS, R, MATLAB — get help with data structuring, analysis, interpretation, and reporting.', link: '/data-analysis' },
                { title: 'Technical Software Support', icon: BookOpen, text: 'AutoCAD, SolidWorks, Revit — design, simulations, and complete project assistance.', link: '/engineering-simulations' },
                { title: 'Coding & Debugging', icon: BookOpen, text: 'Python, C++, Java — Fix errors, understand logic, and optimize your codebase.', link: '/code-debugging' },
                { title: 'Assignment Guidance', icon: BookOpen, text: 'Step-by-step technical guidance to help you complete complex tasks correctly and on time.', link: '/assignment-guidance' },
              ].map((item, index) => (
                <Link key={index} to={item.link} className="block p-6 border border-slate-200/90 rounded-2xl hover:border-amber-400 hover:shadow-lg transition-all duration-200 bg-white group">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-105 transition-transform">
                    <item.icon size={24} strokeWidth={1.8} />
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">{item.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12">
          <ReviewsSection />
        </div>
      </div>
    </section>
  );
}

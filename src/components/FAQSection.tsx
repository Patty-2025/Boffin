import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const leftQuestions = [
  {
    question: "What kind of technical platforms do you support?",
    answer: "We support over 50 technical platforms including data analysis software (SPSS, R, Stata, SAS), engineering tools (AutoCAD, SolidWorks, Revit), and programming languages (Python, Java, C++, SQL, MATLAB). If your specific tool isn't listed, just ask—we likely have an expert for it."
  },
  {
    question: "How does the technical support process work?",
    answer: "After you submit your request and files, we pair you with a verified expert in that specific software or language. They will review your problem, provide step-by-step guidance, debug errors, and structure a complete solution for you to review and learn from."
  },
  {
    question: "Can you help me fix code that isn't compiling?",
    answer: "Absolutely. Code debugging is one of our most popular services. Our specialists will identify logical errors, syntax issues, or architectural flaws, fix the code, and explain exactly what went wrong so you understand the underlying concepts."
  },
  {
    question: "How fast can I get help with an urgent task?",
    answer: "We have technical experts available 24/7. Depending on the complexity of the data or codebase, we can deliver urgent debugging, code reviews, and structured solutions within 12 to 24 hours."
  },
  {
    question: "Are your technical experts qualified?",
    answer: "Yes. Unlike general tutoring services, we exclusively hire verified engineers, data scientists, and computer science professionals—many holding advanced technical degrees and possessing deep industry experience."
  }
];

const rightQuestions = [
  { 
    question: "Is this a general assignment writing service?", 
    answer: "No. We are a specialized technical academic support service. We focus exclusively on complex problem-solving, structural design, quantitative data analysis, and software engineering rather than traditional essay or report writing." 
  },
  { 
    question: "Will my proprietary datasets and code remain private?", 
    answer: "Yes. We adhere to strict confidentiality protocols. Your project files, academic datasets, and personal information are securely encrypted and are never shared with third parties, public repositories, or reused." 
  },
  { 
    question: "What if the provided solution or code doesn't work?", 
    answer: "We guarantee functional, accurate results. If a script fails to compile or a CAD model doesn't meet the specified constraints, we will revise and fix the issue at no additional cost until it perfectly meets your original guidelines." 
  },
  { 
    question: "Can I communicate directly with my technical expert?", 
    answer: "Yes! Our goal is for you to thoroughly understand the work. You can communicate with your assigned expert to ask for clarifications on why a particular statistical test was chosen or how a specific algorithm functions." 
  },
  { 
    question: "Do you provide explanations along with the completed tasks?", 
    answer: "Yes, we highly recommend requesting annotated code, step-by-step logic breakdowns, block diagrams, or detailed methodology reports alongside your final deliverables so you can defend your work and present it with absolute confidence." 
  }
];

const placeholderAnswer = "Our professional academic team is available 24/7 to provide detailed answers to this and any other questions you may have. We pride ourselves on delivering top-quality, custom solutions tailored to your unique requirements.";

interface FAQ {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  title?: string;
  leftFaqs?: FAQ[];
  rightFaqs?: FAQ[];
}

export default function FAQSection({
  title = "Frequently Asked Questions",
  leftFaqs = leftQuestions,
  rightFaqs = rightQuestions
}: FAQSectionProps) {
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);

  const allFaqs = [...leftFaqs, ...rightFaqs];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFaqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": typeof faq.answer === 'string' ? faq.answer : placeholderAnswer
      }
    }))
  };

  const toggleLeft = (index: number) => {
    setOpenLeft(openLeft === index ? null : index);
    setOpenRight(null);
  };

  const toggleRight = (index: number) => {
    setOpenRight(openRight === index ? null : index);
    setOpenLeft(null);
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 w-full border-t border-slate-200">
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-amber-900 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/30 shadow-xs">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Find answers to common questions about our technical academic mentorship, software assistance, and code debugging services.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column */}
          <div className="flex-1 flex flex-col gap-4">
            {leftFaqs.map((q, i) => (
              <div 
                key={`left-${i}`}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  openLeft === i 
                    ? 'border-amber-400 bg-amber-50/30 shadow-md' 
                    : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleLeft(i)}
                  className="w-full flex justify-between items-center p-5 text-left transition-colors cursor-pointer"
                  aria-expanded={openLeft === i}
                >
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 pr-4">{q.question}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    openLeft === i ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {openLeft === i ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </button>
                
                {openLeft === i && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-amber-200/50">
                    {q.answer || placeholderAnswer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col gap-4">
            {rightFaqs.map((q, i) => (
              <div 
                key={`right-${i}`}
                className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                  openRight === i 
                    ? 'border-amber-400 bg-amber-50/30 shadow-md' 
                    : 'border-slate-200/90 bg-white hover:border-slate-300 shadow-xs'
                }`}
              >
                <button
                  onClick={() => toggleRight(i)}
                  className="w-full flex justify-between items-center p-5 text-left transition-colors cursor-pointer"
                  aria-expanded={openRight === i}
                >
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 pr-4">{q.question}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    openRight === i ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {openRight === i ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                </button>

                {openRight === i && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-amber-200/50">
                    {q.answer || placeholderAnswer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

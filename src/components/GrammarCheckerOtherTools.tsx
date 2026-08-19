import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, MousePointer2, Quote, Keyboard, Gauge, Calculator, FileText, Settings } from 'lucide-react';

const tools = [
  {
    title: 'Plagiarism Checker',
    desc: "Use our plagiarism detector to its fullest to ensure that you always submit original stuff. After you check my grammar, running a scan ensures your grammar correction online doesn't interfere with the originality of your work.",
    icon: FileCheck2,
    link: '/plagiarism-checker'
  },
  {
    title: 'Paraphrase Tool',
    desc: "Save time rewriting passages from other resources and avoid unintentional plagiarism. This tool helps you correct the sentence flow and fix your grammar in complex paragraphs, ensuring your writing remains unique and professional.",
    icon: MousePointer2,
    link: '/paraphrase-tool'
  },
  {
    title: 'Citation Generator',
    desc: "Check that your paper includes all the correct references by running it through our citation generator. It's the perfect companion to our English correct grammar tools, ensuring your academic papers meet every strict formatting standard.",
    icon: Quote,
    link: '/citation-generator'
  },
  {
    title: 'Essay Typer',
    desc: "Feel confident that writing essays will now become a stress-free job with the help of our free essay typer. Once your draft is ready, use our free online grammar checker to check for grammar mistakes instantly.",
    icon: Keyboard,
    link: '/essay-typer'
  },
  {
    title: 'Word Counter',
    desc: "Track the length of your text and get info regarding sentence length and number of words. Our integrated word counter and grammar check allows you to check grammar online free while strictly following your professor's word count requirements.",
    icon: Gauge,
    link: '/word-counter'
  },
  {
    title: 'Factoring Calculator',
    desc: "Instantly factor algebraic expressions with step-by-step solutions provided. While you use our grammar corrector free for your English assignments, our calculator handles the heavy lifting for your math and STEM coursework.",
    icon: Calculator,
    link: '/factoring-calculator'
  },
  {
    title: 'PDF Summarizer',
    desc: "Skip the hassle of turning academic documents into a concise summary. Our tool makes it simple to digest long papers, while our PDF grammar check ensures the resulting summary is grammatically correct and clear.",
    icon: FileText,
    link: '/pdf-summarizer'
  },
  {
    title: 'Other Tools',
    desc: "Use our sentence corrector free and grammar and punctuation checker for zero charges to write better assignments. Whether you need an English sentence corrector or a quick grammar check, we provide every resource a student needs.",
    icon: Settings,
    link: '/other-tools'
  }
];

export default function GrammarCheckerOtherTools() {
  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-[#222222] mb-16 tracking-tight">
          Other Free Writing Tools
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index} className="relative bg-white border border-slate-100 rounded-xl p-6 pt-10 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start text-left h-full">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center text-white shadow-md">
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                
                <Link to={tool.link} className="w-full mb-3">
                  <h3 className="text-lg font-bold text-[#333333] hover:text-emerald-500 transition-colors">
                    {tool.title}
                  </h3>
                </Link>
                
                <p className="text-[#666666] text-sm leading-[1.6]">
                  {tool.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

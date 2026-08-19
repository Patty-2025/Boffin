import React from 'react';
import { Link } from 'react-router-dom';
import { MousePointer2, FileCheck2, Pointer, Calculator, SpellCheck, Quote, FileText, Settings } from 'lucide-react';

const tools = [
  {
    title: 'Essay Typer',
    icon: MousePointer2,
    description: 'Unlock ideas and unleash essays on all unconventional topics and subjects with our free tool.',
    link: '/essay-typer'
  },
  {
    title: 'Plagiarism Checker',
    icon: FileCheck2,
    description: 'Uncover originality and outsmart plagiarism to safeguard your credibility with our plagiarism scanner.',
    link: '/plagiarism-checker'
  },
  {
    title: 'Paraphraser',
    icon: Pointer,
    description: 'Save time by rephrasing, reinventing, and rewriting an article effortlessly with our reliable paraphraser.',
    link: '/paraphrase-tool'
  },
  {
    title: 'Factoring Calculator',
    icon: Calculator,
    description: 'Factors algebraic expressions instantly and provides clear step-by-step solutions.',
    link: '/factoring-calculator'
  },
  {
    title: 'Grammar Checker',
    icon: SpellCheck,
    description: 'Conduct a grammar check in seconds with our tool and spin the fortune wheel with flawless solutions.',
    link: '/grammar-checker'
  },
  {
    title: 'Referencing Generator',
    icon: Quote,
    description: 'Referencing styles can be confusing to follow. Make the task easier with our online referencing tool.',
    link: '/citation-generator'
  },
  {
    title: 'PDF Summarizer',
    icon: FileText,
    description: 'Easily generate precise PDF summaries using advanced NLP technology-totally free!',
    link: '/pdf-summarizer'
  },
  {
    title: 'Other Tools',
    icon: Settings,
    description: 'Make the most of other tools like citation generators, algebra calculators, etc., to climb the success ladder.',
    link: '/other-tools'
  }
];

export default function WordCounterToolsGrid() {
  return (
    <section className="py-24 bg-white px-4">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center text-slate-900 mb-16 tracking-tight">
          Free Word Counter, Spell Checker, and More
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16 mt-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index} className="relative bg-white border border-slate-100 rounded-2xl p-6 pt-12 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white">
                  <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-tighter">
                  {tool.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed">
                  {tool.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

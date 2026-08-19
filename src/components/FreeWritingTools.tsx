import React from 'react';
import { Link } from 'react-router-dom';
import { FileCheck2, Pointer, FileText, Quote, SpellCheck, Hash, Calculator, Settings } from 'lucide-react';

const tools = [
  {
    title: 'Plagiarism Checker',
    icon: FileCheck2,
    description: 'Submit plagiarism-free work with our AI plagiarism-checking tool. Unique solutions are guaranteed.',
    link: '/plagiarism-checker'
  },
  {
    title: 'Paraphrase Tool',
    icon: Pointer,
    description: 'Avoid the hassle of rewriting your entire paper by using our paraphrase tool for quick solutions.',
    link: '/paraphrase-tool'
  },
  {
    title: 'PDF Summarizer',
    icon: FileText,
    description: 'Our equation solver lets you handle complex mathematical equations in seconds.',
    link: '/pdf-summarizer'
  },
  {
    title: 'Citation Generator',
    icon: Quote,
    description: 'Consistently follow APA, MLA, or Chicago style using a reliable citation generator.',
    link: '/citation-generator'
  },
  {
    title: 'Grammar Checker',
    icon: SpellCheck,
    description: 'Leave your worries about grammatical errors behind by making the most of our grammar checker.',
    link: '/grammar-checker'
  },
  {
    title: 'Word Counter',
    icon: Hash,
    description: 'Keep track of your task\'s length with accurate word count, paragraph count, page count, and more.',
    link: '/word-counter'
  },
  {
    title: 'Factoring Calculator',
    icon: Calculator,
    description: 'Factors algebraic expressions and shows step-by-step solutions for learning.',
    link: '/factoring-calculator'
  },
  {
    title: 'Other Tools',
    icon: Settings,
    description: 'Try out our other free tools like citation generators, essay typer, PDF summarizer, and more.',
    link: '/other-tools'
  }
];

export default function FreeWritingTools() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center w-full mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-center text-slate-900 tracking-tight leading-[1.10] w-full mb-4 sm:mb-6">
            Advanced Academic & Developer Toolkit
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 text-center max-w-7xl mx-auto leading-[1.8]">
            Explore our comprehensive suite of free utilities designed to streamline research, citations, plagiarism checks, and accuracy.
          </p>
        </div>

        <div className="max-w-[1150px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mt-8 px-2 sm:px-4 md:px-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index} className="relative bg-white border border-[#eaeaea] rounded-xl p-6 pt-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col h-full items-start">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center text-white shadow-md">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-lg font-bold text-[#333333] mb-3 w-full text-left">
                  {tool.title}
                </h3>
                
                <p className="text-[#666666] text-sm leading-relaxed mb-6 flex-grow text-left">
                  {tool.description}
                </p>
                
                <Link to={tool.link} className="text-[#0d6efd] font-bold text-sm hover:underline mt-auto">
                  Check Now
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

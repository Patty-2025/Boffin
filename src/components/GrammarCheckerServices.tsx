import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, PenTool, BookOpen, Search, GraduationCap, Laptop, ClipboardList, BookMarked, Lightbulb, Activity } from 'lucide-react';

const services = [
  {
    title: 'Assignment Writing',
    desc: 'Our pool of experts comprises professors and scholars who offer assignment help for all academic levels. Whether you need to check English grammar or perform a full grammar check, our team ensures your work is grammatically correct. We provide a free grammar check for your initial drafts to ensure your writing meets university standards.',
    icon: ClipboardList,
    link: '/assignment-writing'
  },
  {
    title: 'Essay Writing Help',
    desc: 'Use our essay help services at the best prices to avoid mistakes while preparing your academic essays. Our editors will correct the sentence structures and help you fix my grammar before you submit. We make sure you correct this sentence and every other line for a perfect result, providing a correct grammar check for every student.',
    icon: PenTool,
    link: '/essay-writing-help'
  },
  {
    title: 'Dissertation Help',
    desc: 'Our scholarly writers will assist you in writing a well-structured dissertation with relevant citations. We offer a specialized pdf grammar check for long-form documents and a word count and grammar check to meet strict word limits. Utilize our grammar checker online and grammar correction online features to polish your PhD thesis.',
    icon: GraduationCap,
    link: '/dissertation-help'
  },
  {
    title: 'Case Study Help',
    desc: 'Our case study helpers will generate and offer high-quality case studies on all disciplines in real-time. We use a grammar and punctuation checker to ensure technical accuracy. You can check grammar online or use our free grammar checker online to get an instant grammar checker free report on your analysis.',
    icon: Search,
    link: '/case-study-help'
  },
  {
    title: 'Homework Help',
    desc: 'Get homework help from the best experts and boost your marks. Our tutors help you correct my sentence and fix this sentence while explaining the rules. If you find yourself asking, "Is the sentence grammatically correct?", we provide the proper grammar for this sentence to help you learn and excel.',
    icon: BookOpen,
    link: '/homework-help'
  },
  {
    title: 'Coursework Writing',
    desc: 'Our online assignment experts will also provide plagiarism-free writing help for various academic papers. We offer an English grammar check online for every page. With an English grammar checker and an English sentence corrector, we provide the English grammar correction necessary for high-level coursework.',
    icon: Lightbulb,
    link: '/coursework-writing'
  },
  {
    title: 'Essay Editing',
    desc: 'Perfect your essays with our editing service, improving clarity, grammar, structure, and style. We use a proper sentence checker and a free sentence checker tool to act as a grammar error checker. Our editors perform a deep sentence grammar check to ensure your work is polished and impactful.',
    icon: FileText,
    link: '/essay-editing'
  },
  {
    title: 'Research Paper Help',
    desc: 'Receive A+ research papers with the assistance of PhD experts available to advise you at every step. We utilize a grammatical errors checker and a sentence grammar checker to verify your findings. Our online grammar checker and English grammar check services ensure your research is presented with correct English grammar.',
    icon: Activity,
    link: '/research-paper-help'
  }
];

export default function GrammarCheckerServices() {
  return (
    <section className="py-12 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-[#222222] mb-12 tracking-tight">
          Well-Known Services We Offer
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col items-start h-full">
              <div className="mb-4 text-[#666666]">
                <item.icon size={36} strokeWidth={1} />
              </div>
              <Link to={`/portal/place-order?subject=${encodeURIComponent(item.title)}`} className="hover:text-emerald-500 transition-colors mb-3">
                <h3 className="text-lg font-bold text-[#333333] hover:text-emerald-500">{item.title}</h3>
              </Link>
              <p className="text-[#666666] text-sm leading-[1.6] flex-grow mb-4">
                {item.desc}
              </p>
              <Link 
                to={`/portal/place-order?subject=${encodeURIComponent(item.title)}`}
                className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 uppercase tracking-wider flex items-center gap-1 group mt-auto"
              >
                <span>Order Help Now</span>
                <span className="transform group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

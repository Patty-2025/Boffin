import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Quote, BookOpen, Clock, Target, CheckCircle2, ShieldCheck, Zap, ArrowLeft, ArrowRight, Bookmark } from 'lucide-react';
import FAQSection from '../components/FAQSection';
import CitationGenerator from '../pages/CitationGenerator';

const citationStyles: Record<string, any> = {
  'apa-citation': {
    name: 'APA 7th Edition',
    fullName: 'American Psychological Association (APA)',
    desc: 'The most common style for Social Sciences, Psychology, and Education.',
    seo: 'Master APA 7 citations with our expert guide. We help students worldwide ensure their psychology, sociology, and education papers meet the rigorous standards of the American Psychological Association. Our tool supports both in-text citations and full reference lists.'
  },
  'mla-citation': {
    name: 'MLA 9th Edition',
    fullName: 'Modern Language Association (MLA)',
    desc: 'Widely used in Liberal Arts, Humanities, and Language studies.',
    seo: 'MLA 9 citations made simple. Whether you are studying English Literature in Canada or Modern Languages in Australia, our MLA citation generator ensures your work is perfectly formatted for the humanities.'
  },
  'chicago-citation': {
    name: 'Chicago 17th Edition',
    fullName: 'The Chicago Manual of Style',
    desc: 'Primary choice for History, Arts, and some Social Science journals.',
    seo: 'Chicago Style referencing is known for its complex footnotes and bibliography requirements. We simplify the 17th edition for students from UK, US, and across the globe.'
  },
  'harvard-citation': {
    name: 'Harvard Referencing',
    fullName: 'Harvard (Author-Date) Style',
    desc: 'Commonly used in UK and Australian universities for various subjects.',
    seo: 'Harvard referencing is a standard in the United Kingdom and Australia. Our guide helps international scholars master the author-date system required by the Russell Group and Group of Eight institutions.'
  },
  'vancouver-citation': {
    name: 'Vancouver Style',
    fullName: 'Vancouver (Numeric) Style',
    desc: 'Standard for Medicine, Biomedicine, and Health Sciences.',
    seo: 'Vancouver numeric citations for medical and clinical students. Ensure your healthcare papers meet the strict standards used in global medical journals.'
  },
  'oxford-citation': {
    name: 'Oxford Referencing',
    fullName: 'Oxford Footnote Style',
    desc: 'Preferred by many European and Law-focused institutions.',
    seo: 'Oxford referencing uses a documentary-note system of footnotes. We help international law and history students master this elegant European style.'
  }
};

export default function CitationDetail() {
  const { id } = useParams();
  const style = id ? (citationStyles[id] || citationStyles[id + '-citation']) : null;

  if (!style) {
    return <div className="pt-20 text-center">Style not found</div>;
  }

  return (
    <main className="pt-[80px] bg-slate-50 font-sans min-h-screen">
      <section className="bg-white py-16 px-6 border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <Link to="/citation-generator" className="inline-flex items-center gap-2 text-xs font-black uppercase text-slate-400 hover:text-emerald-500 transition-colors mb-8">
            <ArrowLeft size={14} /> All Citation Styles
          </Link>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="w-16 h-16 bg-gradient-to-br from-blue-700 to-emerald-800 rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl"
               >
                 <Quote size={32} />
               </motion.div>
               <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-8 tracking-tighter">
                 {style.name} <span className="text-emerald-500">Generator</span>
               </h1>
               <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 leading-relaxed">
                 {style.fullName}. {style.desc}
               </p>
               <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-green-500" /> Precise Referencing
                  </div>
                  <div className="px-4 py-2 bg-slate-100 rounded-full text-xs font-bold text-slate-600 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-blue-500" /> Plagiarism Guard
                  </div>
               </div>
            </div>
            <div className="w-full lg:w-[500px]">
               <div className="bg-gradient-to-br from-blue-700 to-emerald-800 p-10 rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                  <Bookmark className="absolute top-[-20px] right-[-20px] w-48 h-48 opacity-5 text-white" />
                  <h4 className="text-xl font-bold mb-6 relative z-10">Quick Citations</h4>
                  <div className="space-y-4 relative z-10">
                     <p className="text-sm text-blue-200 leading-relaxed font-medium">Use our automated tool below to generate a perfect {style.name} citation for your book, journal, or website source.</p>
                     <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-emerald-500 w-3/4"></motion.div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Widget Integration */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border border-slate-100">
             <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Generate {style.name} Citation</h2>
             <div className="border border-slate-100 rounded-3xl p-6 bg-slate-50 mb-10">
                <p className="text-sm font-medium text-slate-500 text-center">The interactive citation widget is pre-configured for {style.name} standards.</p>
             </div>
             {/* Simple input to simulate tool */}
             <div className="flex flex-col gap-6">
                <input type="text" placeholder="Paste URL or Book ISBN..." className="w-full px-8 py-5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-800 font-medium outline-none focus:border-emerald-500 transition-all" />
                <button className="w-full py-5 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl">
                   Generate {style.name} Now <Zap size={18} />
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Extensive SEO Content */}
      <section className="py-24 px-6 bg-white overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 leading-tight mb-8">Professional Standards for Your Academic Journey</h2>
                <div className="prose prose-slate max-w-none text-slate-600 font-medium text-lg leading-relaxed space-y-6">
                   <p>{style.seo}</p>
                   <p>
                     Citation is more than just a formal requirement; it is a fundamental part of academic honesty and intellectual integrity. By correctly attributing ideas to their original authors using the {style.name} style, you acknowledge the work of others and provide a clear roadmap for your own research process.
                   </p>
                   <p>
                     For international scholars, mastering these styles is often one of the biggest hurdles in university life. A small error in a footnote or a misplaced period in a bibliography can lead to deductions in marks or, in some cases, accusations of plagiarism. boffinglobalgroup.com provides you with the high-quality assets and tools needed to eliminate these technical risks.
                   </p>
                </div>
             </div>
             <div className="bg-slate-50 p-12 rounded-[64px] border border-slate-100">
                <h4 className="text-2xl font-extrabold text-slate-900 mb-8">Related Citation Guides</h4>
                <div className="space-y-4">
                   {Object.entries(citationStyles).filter(([key]) => key !== id && key !== id + '-citation').slice(0, 4).map(([key, s]) => (
                     <Link key={key} to={`/${key}`} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 hover:border-emerald-500 group transition-all">
                        <span className="font-bold text-slate-800">{s.name} Guide</span>
                        <ArrowRight size={18} className="text-emerald-500 group-hover:translate-x-1 transition-transform" />
                     </Link>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

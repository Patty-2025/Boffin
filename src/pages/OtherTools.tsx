import React from 'react';
import { motion } from 'motion/react';
import { Settings, Search, FileText, Zap, Sparkles, Hash, Quote, RotateCw, Calculator, BookOpen, Clock, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const allTools = [
  { id: 'word-counter', name: 'Word Counter', icon: <Hash className="text-blue-500" />, desc: 'Analyze word count, character density, and readability grades.', path: '/word-counter' },
  { id: 'plagiarism-checker', name: 'Plagiarism Checker', icon: <Search className="text-blue-600" />, desc: 'Deep-scan academic repositories for original content.', path: '/plagiarism-checker' },
  { id: 'essay-typer', name: 'Essay Typer', icon: <FileText className="text-green-500" />, desc: 'Kickstart your brainstorming with structural outlines.', path: '/essay-typer' },
  { id: 'paraphrasing-tool', name: 'Paraphrasing Tool', icon: <RotateCw className="text-purple-500" />, desc: 'Rewrite sentences while maintaining scholarly tone.', path: '/paraphrasing-tool' },
  { id: 'citation-generator', name: 'Citation Generator', icon: <Quote className="text-blue-600" />, desc: 'APA, MLA, Harvard, and Chicago styles done instantly.', path: '/citation-generator' },
  { id: 'grammar-checker', name: 'Grammar Checker', icon: <Sparkles className="text-yellow-500" />, desc: 'Find and fix contextual grammar and spelling errors.', path: '/grammar-checker' },
  { id: 'factoring-calculator', name: 'Factoring Calculator', icon: <Calculator className="text-red-500" />, desc: 'Solve complex mathematical factoring and equations.', path: '/factoring-calculator' },
  { id: 'pdf-summarizer', name: 'PDF Summarizer', icon: <Zap className="text-indigo-500" />, desc: 'Extract key points and summaries from long PDF files.', path: '/pdf-summarizer' }
];

export default function OtherTools() {
  return (
    <main className="pt-[80px] bg-slate-50 font-sans min-h-screen">
      <section className="bg-white py-20 px-6 border-b border-slate-100">
        <div className="max-w-[1000px] mx-auto text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-8 text-blue-700"
           >
             <Settings size={32} />
           </motion.div>
           <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-8 tracking-tighter">
             Free Academic <span className="text-emerald-500">Writing Tools</span>
           </h1>
           <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
             A comprehensive suite of research and writing assistants designed to streamline your scholarly workflow and improve your academic performance.
           </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allTools.map(tool => (
              <motion.div 
                key={tool.id}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
              >
                 <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                   {tool.icon}
                 </div>
                 <h3 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent mb-3">{tool.name}</h3>
                 <p className="text-sm text-slate-500 font-medium mb-8 flex-1">{tool.desc}</p>
                 <Link 
                   to={tool.path}
                   className="text-xs font-black uppercase text-blue-700 flex items-center gap-2 group-hover:text-emerald-500 transition-colors"
                 >
                   Launch Tool <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                 </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extensive SEO Block */}
      <section className="py-24 px-6 bg-white overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                 <img src="https://picsum.photos/seed/tools/800/800" alt="Academic Tools" className="rounded-[48px] shadow-2xl relative z-10" referrerPolicy="no-referrer" />
                 <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
              </div>
              <div className="space-y-8">
                 <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 leading-tight">Empowering Global Scholars through Smart Technology</h2>
                 <div className="prose prose-slate max-w-none text-slate-600 font-medium text-lg leading-relaxed space-y-6">
                    <p>
                      At boffinglobalgroup.com, we believe that academic excellence should be accessible to everyone. Our "Free Academic Tools" are designed to eliminate the repetitive stresses of university life. Whether you need to check if your essay fits within word limits using our "Word Counter" or you're trying to master a complex referencing style with our "Citation Generator," we have you covered.
                    </p>
                    <p>
                      For international scholars, these tools serve as more than just calculators; they are linguistic bridges. The "Paraphrasing Tool" and "Grammar Checker" help students whose first language is not English to polish their work to a professional, native-level standard. Our "Essay Typer" provides the structural guidance needed to understand Western academic expectations.
                    </p>
                    <p>
                      While the world moves toward automated solutions, we maintain a focus on human-centric education. These tools are designed to facilitate your learning, not replace your critical thinking. By using our suite of assistants, you save time on technicalities, allowing you to focus more on the deep-level research and creative synthesis that truly defines a world-class scholar.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Mock Logos */}
           <div className="flex items-center gap-3 font-bold text-2xl text-slate-900"><BookOpen/> ScholarNet</div>
           <div className="flex items-center gap-3 font-bold text-2xl text-slate-900"><Target/> UniVetted</div>
           <div className="flex items-center gap-3 font-bold text-2xl text-slate-900"><Clock/> TimeSave</div>
           <div className="flex items-center gap-3 font-bold text-2xl text-slate-900"><Zap/> SpeedGrade</div>
        </div>
      </section>
    </main>
  );
}

import React from 'react';
import { FileText } from 'lucide-react';

const samples = [
  {
    title: 'An Essay On Organizational Behavior',
    desc: 'Advice from the Individual Synoptic Essay: This is to be introduced within the introduction, analysed in the main body of the work and evaluated within the conclusion. How have your provided the overview of the core business offers correctly?',
    pages: 7
  },
  {
    title: 'Pros And Cons Of Privatizing The National',
    desc: 'The essay consists of the analysis of the pros and cons related to the privatizing the National Health Services in England. The healthcare sectors have become private in many cases. Various arguments regarding the advantages and the disadvantages.',
    pages: 20
  },
  {
    title: 'The Essay On Smart, Connected Products',
    desc: 'Officer (CEO) of your company, he became very concerned about the assumptions made in the model. His experience has taught him to consider the uncertainty associated with selling price and production costs more thoroughly.',
    pages: 6
  },
  {
    title: 'Manage Business Essay: Documentation',
    desc: 'Adept Owl in Australia is a manufacturing company of high quality entertaining boards, puzzles and card games (Pohl, 2010). The Company aims to establish itself as being the most innovative game developer in its business.',
    pages: 11
  }
];

export default function WordCounterSamples() {
  return (
    <section className="py-10 bg-slate-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Check Out Free Samples from Our Experts
          </h2>
          <p className="text-slate-500 font-medium text-lg italic">
            Master Delivering Words that Pack a Punch in the Perfect Word Count
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {samples.map((sample, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="p-6 flex-grow">
                 <h3 className="text-lg font-bold text-slate-900 mb-4 leading-tight group-hover:text-emerald-500 transition-colors">{sample.title}</h3>
                 <p className="text-slate-500 text-xs leading-relaxed line-clamp-6">
                   {sample.desc}
                 </p>
              </div>
              <div className="p-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                <button className="text-emerald-500 font-bold text-xs uppercase tracking-tight flex items-center gap-1.5 hover:gap-2 transition-all">
                  <FileText size={14} /> View Sample
                </button>
                <div className="bg-amber-500 text-slate-900 px-3 py-1 rounded-md text-xs font-black uppercase shadow-sm">
                  {sample.pages} pages
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

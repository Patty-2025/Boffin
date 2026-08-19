import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const tabs = [
  {
    id: 'paste',
    label: 'Paste or Upload the Text',
    content: 'Copy-paste your text in our online word counter or upload a textual file like PDF, Doc, Docx, or Txt.',
    btnText: 'Click to Connect'
  },
  {
    id: 'font',
    label: 'Choose Font and Spacing',
    content: 'Choose the font type, font size, and line spacing of your blog post or paper to get character counts and word counts.',
    btnText: 'Give a Try'
  },
  {
    id: 'button',
    label: "Enter the 'Count Words' Button",
    content: 'The word counter tool will instantly estimate the number of characters or words in a sentence or passage.',
    btnText: 'Get Accurate Counts'
  }
];

export default function WordCounterHowTo() {
  const [activeTab, setActiveTab] = useState('paste');

  return (
    <section className="py-10 bg-white px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">
          How to Check Word Count with Our Word Counter?
        </h2>
        <p className="text-slate-500 mb-12">
          Your Words, Perfectly Quantified in a Few Seconds
        </p>

        <div className="border-b border-slate-200 mb-12 flex justify-center">
          <div className="flex gap-4 sm:gap-12 flex-wrap justify-center font-bold text-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 transition-all relative ${
                  activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 opacity-60'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white p-2 min-h-[200px]">
          <div className="md:w-1/2">
             <div className="w-full h-48 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center">
               <span className="text-slate-300 font-bold uppercase tracking-widest text-xs">Conceptual Visual Representation</span>
             </div>
          </div>
          <div className="md:w-1/2 text-left">
            <AnimatePresence mode="wait">
              {tabs.map((tab) => tab.id === activeTab && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-md">
                    {tab.content}
                  </p>
                  <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-lg transition-all shadow-md hover:shadow-xl active:scale-95 text-lg">
                    {tab.btnText}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

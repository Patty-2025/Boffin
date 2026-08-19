import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ClipboardPaste, CloudUpload, FileCheck2, Settings2, ArrowRight } from 'lucide-react';

const tabs = [
  {
    id: 'input',
    label: 'Input Your Text',
    title: 'Enter the text for checking',
    content: 'You can directly upload a file for a PDF grammar check, or simply copy and paste to check English grammar instantly. Our free online grammar checker handles everything from short queries to long essays.',
    btnText: 'Check Our Tool',
    leftIcon: ClipboardPaste,
    rightIcon: CloudUpload
  },
  {
    id: 'check',
    label: 'Click on CHECK',
    title: 'Click the check button for textual issues',
    content: 'Click the button to check for grammar mistakes. As soon as you hit grammar check online, our grammar and punctuation checker audits your document to correct the sentence structures and identify issues.',
    btnText: 'Generate Report',
    leftIcon: CloudUpload,
    rightIcon: FileCheck2
  },
  {
    id: 'apply',
    label: 'Apply the Suggestions',
    title: 'Fix your mistakes',
    content: 'Review the results from our sentence grammar checker. You can fix this sentence or apply an English grammar correction to the entire text. It\'s the easiest way to correct the grammar and get grammatically correct results.',
    btnText: 'Get A+ Solutions',
    leftIcon: FileCheck2,
    rightIcon: Settings2
  }
];

export default function GrammarCheckerSteps() {
  const [activeTab, setActiveTab] = useState('input');

  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#222222] mb-12 text-center tracking-tight">
          3 Steps to Use Our Free Grammar Checker
        </h2>

        <div className="border-b border-slate-200 mb-16 flex justify-center w-full">
          <div className="flex gap-4 sm:gap-16 flex-wrap justify-between w-full max-w-4xl text-lg font-bold">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 px-2 transition-all relative ${
                  activeTab === tab.id ? 'text-[#333333]' : 'text-[#333333]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-emerald-500"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24 w-full max-w-5xl mx-auto min-h-[220px]">
          {/* Left Visuals */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {tabs.map((tab) => tab.id === activeTab && (
                <motion.div
                  key={`visual-${tab.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 sm:gap-8 w-full justify-center"
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[6px] border-[#f8f9fa] flex items-center justify-center bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative overflow-hidden">
                    {tab.id === 'input' && (
                       <div className="w-12 h-12 bg-emerald-500 rounded-md flex items-center justify-center text-white">
                         <tab.leftIcon size={24} strokeWidth={2} />
                       </div>
                    )}
                    {tab.id !== 'input' && (
                      <tab.leftIcon size={40} className="text-emerald-500" strokeWidth={1} />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-emerald-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-40"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-60"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-80"></div>
                    <ArrowRight className="text-emerald-500" size={16} />
                  </div>
                  
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-[6px] border-[#f8f9fa] flex items-center justify-center bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                    <tab.rightIcon size={40} className="text-emerald-500" strokeWidth={1} />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Right Content */}
          <div className="w-full md:w-1/2 text-left">
            <AnimatePresence mode="wait">
              {tabs.map((tab) => tab.id === activeTab && (
                <motion.div
                  key={`content-${tab.id}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-bold text-[#333333] mb-4">{tab.title}</h3>
                  <p className="text-[#666666] text-sm leading-relaxed mb-6">
                    {tab.content}
                  </p>
                  <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-2.5 px-8 rounded shadow-sm text-sm transition-colors cursor-pointer">
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

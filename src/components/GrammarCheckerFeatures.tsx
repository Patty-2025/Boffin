import React from 'react';
import { CalendarClock, FileLineChart, FileText, Search, Settings2, BadgeCheck } from 'lucide-react';

const features = [
  {
    title: 'Real-Time Sentence Checker',
    desc: 'Receive immediate feedback. Use our sentence checker to fix my grammar as you type, ensuring every word is grammatically correct and polished in real-time before you hit send.',
    icon: CalendarClock
  },
  {
    title: 'In-Depth Reports',
    desc: 'Get more than just a grammar correction. Our grammar error checker provides detailed explanations for mistakes, helping you learn and avoid similar errors in future writing assignments.',
    icon: FileLineChart
  },
  {
    title: 'Text Readability Check',
    desc: 'Use our proper sentence checker to ensure your audience understands your message without confusion. A free sentence check helps simplify complex ideas into clear, readable text.',
    icon: FileText
  },
  {
    title: 'Robust Word Tools',
    desc: 'Beyond a free grammar and spell check, access our word counter and grammar check for in-depth insights into your word count, character count, and overall writing statistics.',
    icon: Search
  },
  {
    title: 'Detect Passive Voice',
    desc: 'Our English sentence corrector helps you shift to the active voice. It is the best grammar checker for keeping your narratives engaging and direct, eliminating unnecessary passive constructions.',
    icon: Settings2
  },
  {
    title: 'ALL English Dialects',
    desc: 'Whether you need to check grammar for sentence standards in the US, UK, or Australia, our English grammar online checker adapts to the precise regional grammar rules you need.',
    icon: BadgeCheck
  }
];

export default function GrammarCheckerFeatures() {
  return (
    <section className="py-16 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#222222] mb-16 tracking-tight">
          The Key Features of Our Grammar Checker Tool
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16 text-left">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            // Map the icons cleanly using Lucide based on the 3x2 references 
            // the icon structure features the icon rendered with a secondary piece floating off of it like a badge
            return (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 text-[#333333]">
                    <Icon size={44} strokeWidth={1} className={index === 5 ? "text-emerald-500" : ""} />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-[#333333] mb-3">{feature.title}</h3>
                  <p className="text-[#666666] text-sm leading-[1.6]">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-3.5 px-10 rounded shadow-sm text-sm transition-colors cursor-pointer">
          Try Our Tool
        </button>
      </div>
    </section>
  );
}

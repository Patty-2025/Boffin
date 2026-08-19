import React from 'react';
import { Search, Monitor, FileCode, ShieldCheck, Heart, LayoutGrid } from 'lucide-react';

const features = [
  {
    title: 'Accuracy at Fingertips',
    desc: 'Use our word count checker to be confident in the precision of your character & word count.',
    icon: Search
  },
  {
    title: 'Easy to Use',
    desc: 'Paste your text & our word calculator will do the rest. No complex steps, no learning.',
    icon: Monitor
  },
  {
    title: 'Multiple Formats Supported',
    desc: 'Our online word counter supports a wide array of text formats – plain, rich, and even markup.',
    icon: FileCode
  },
  {
    title: '100% Privacy Assured',
    desc: 'Our word count calculator never stores your text, ensuring your content remains confidential.',
    icon: ShieldCheck
  },
  {
    title: 'Guaranteed Convenience',
    desc: 'Access our essay word counter on the go from any device. No downloads or installations required.',
    icon: Heart
  },
  {
    title: 'Immense Versatility',
    desc: 'Use words counter for all, from an article to report to other languages and social media posts.',
    icon: LayoutGrid
  }
];

export default function WordCounterPremiumFeatures() {
  return (
    <section className="py-10 bg-slate-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6">
            Premium Features of Our Free Online Character Counter
          </h2>
          <p className="text-slate-500 font-medium text-lg italic">
            Count, Create, and Conquer with an Amazing Slew of Benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((item, index) => (
            <div key={index} className="flex gap-6 items-start">
              <div className="shrink-0 w-16 h-16 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-sm group-hover:shadow-md transition-shadow">
                <item.icon size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm lg:text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-lg transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-lg">
            Use it Now
          </button>
        </div>
      </div>
    </section>
  );
}

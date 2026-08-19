import React from 'react';
import { Search, FileText, MessageSquare, CheckCircle2 } from 'lucide-react';

const tools = [
  { name: "Plagiarism Checker", icon: Search },
  { name: "Citation Generator", icon: FileText },
  { name: "Paraphrase Tool", icon: MessageSquare },
  { name: "Grammar Checker", icon: CheckCircle2 }
];

export default function FreeToolsSection() {
  return (
    <section className="py-20 px-6 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Best Assignment Help Websites Offering Free Writing Tools</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-slate-600 text-lg">Supplement your academic journey with our suite of completely free AI-powered formatting and checking tools.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <div key={tool.name} className="bg-white border border-slate-200 p-6 rounded text-center hover:border-blue-600 hover:shadow-md transition-all cursor-pointer">
              <tool.icon className="mx-auto text-slate-400 mb-3" size={32} />
              <h4 className="font-bold text-slate-800">{tool.name}</h4>
              <p className="text-xs text-blue-600 font-bold mt-2">Check Now</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

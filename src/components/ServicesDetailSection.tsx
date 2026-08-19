import React from 'react';
import { renderTextWithLinks, LinkTarget } from '../lib/linkUtils';
import { PenTool, Search, BookOpen } from 'lucide-react';

interface ServiceBox {
  title: string;
  icon: React.ElementType;
  description: string;
  points: string[];
  theme?: 'default' | 'primary' | 'accent';
}

interface ServicesDetailSectionProps {
  title?: string;
  subtitle?: string;
  writingBox?: ServiceBox;
  solvingBox?: ServiceBox;
  moreBox?: ServiceBox;
  linkTargets?: LinkTarget[];
}

export default function ServicesDetailSection({
  title = "Comprehensive Academic Editing & Improvement Services",
  subtitle = "Our experts go beyond basic proofreading to offer deep structural and conceptual editing.",
  writingBox,
  solvingBox,
  moreBox,
  linkTargets = []
}: ServicesDetailSectionProps) {
  const seenWords = new Set<string>();

  const ServiceCard = ({ box }: { box: ServiceBox }) => {
    const theme = box.theme || 'default';
    const bgClass = theme === 'primary' ? 'bg-indigo-50 border-indigo-100' : theme === 'accent' ? 'bg-orange-50 border-orange-100' : 'bg-slate-50 border-slate-100';
    const iconBgClass = theme === 'primary' ? 'bg-indigo-100 text-indigo-600' : theme === 'accent' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600';

    return (
      <div className={`flex-1 p-8 rounded-2xl border ${bgClass} hover:shadow-md transition-shadow`}>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${iconBgClass}`}>
          <box.icon size={28} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{box.title}</h3>
        <p className="text-slate-600 mb-6 text-sm leading-relaxed">
          {renderTextWithLinks(box.description, linkTargets, seenWords)}
        </p>
        <ul className="space-y-3">
          {box.points.map((point, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${theme === 'accent' ? 'bg-orange-500' : theme === 'primary' ? 'bg-indigo-500' : 'bg-slate-400'}`} />
              <span>{renderTextWithLinks(point, linkTargets, seenWords)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section className="py-16 px-6 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {writingBox && <ServiceCard box={writingBox} />}
          {solvingBox && <ServiceCard box={solvingBox} />}
          {moreBox && <ServiceCard box={moreBox} />}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, PenTool, BookOpen, Search, GraduationCap, Laptop, ClipboardList, BookMarked } from 'lucide-react';

const services = [
  {
    title: 'Assignment Writing',
    desc: 'Hire our 5000+ PhD and Master stalwarts to deliver exceptional solutions that reflect your true potential.',
    icon: ClipboardList
  },
  {
    title: 'Essay Writing Help',
    desc: 'Avail our assistance and forget your fear and uncertainty with genuine papers on any topic today.',
    icon: PenTool
  },
  {
    title: 'Dissertation Help',
    desc: 'Whether you\'re struggling to choose a topic or find research data for your dissertation, we\'ve got your back.',
    icon: GraduationCap
  },
  {
    title: 'Case Study Help',
    desc: 'We guarantee to include SWOT and PESTLE analysis with your case study on any topic for FREE.',
    icon: Search
  },
  {
    title: 'Homework Help',
    desc: 'Dealing with complicated homework in Chemistry or Physics? We\'ll offer a stellar solution for all.',
    icon: BookOpen
  },
  {
    title: 'Coursework Writing',
    desc: 'Our experts and SMEs are always available to deliver streamlined coursework for optimal results.',
    icon: Laptop
  },
  {
    title: 'Essay Editing Services',
    desc: '"Improve your essays with skilled editing and proofreading for smooth, accurate writing"',
    icon: FileText
  },
  {
    title: 'Research Paper Help',
    desc: 'Make us your research buddy. We strive to empower scholars, elevating their research to excellence.',
    icon: BookMarked
  }
];

export default function WordCounterServiceGrid() {
  return (
    <section className="py-10 bg-white px-4 sm:px-6">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center text-slate-900 mb-16 tracking-tighter">
          Impeccable Services Offered at Boffin Global Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6">
          {services.map((item, index) => (
            <div key={index} className="flex justify-center">
              <Link 
                to={`/portal/place-order?subject=${encodeURIComponent(item.title)}`}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center max-w-[240px] cursor-pointer"
              >
                <div className="mb-3 text-slate-400 group-hover:text-emerald-500 transition-colors">
                  <item.icon size={32} strokeWidth={1} />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-3 flex-grow">
                  {item.desc}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MessageSquare, Briefcase } from 'lucide-react';

interface Writer {
  name: string;
  title: string;
  bio: string;
  orders: number;
  reviews: number;
  rating: number;
  img: string;
}

interface ProfessionalWritersProps {
  title?: string;
  subtitle?: string;
  writersData?: Writer[];
}

const defaultWriters: Writer[] = [
  {
    name: 'Alexis Jiang',
    title: 'Ph.D. in Data Science',
    bio: 'Alexis Jiang, PhD in Data Science, provides elite support for complex R programming and Python machine learning tasks. Having guided students at top global institutions, she specializes in debugging complex models and ensuring flawless data analysis pipelines.',
    orders: 3371,
    reviews: 1348,
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    name: 'Michael Johnson',
    title: 'M.Sc. in Engineering',
    bio: 'Michael Johnson, M.Sc. in Engineering, offers expert help for complex AutoCAD and Revit designs. He has helped thousands of students globally master 3D modeling and structural rendering parameters required by top technical institutions.',
    orders: 2594,
    reviews: 1038,
    rating: 5,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    name: 'Charles Adkison',
    title: 'L.L.M. & Tech Policy Expert',
    bio: 'Charles Adkison specializes in the intersection of Software Engineering and Cybersecurity Compliance. Charles understands the extreme precision required for technical documentation, ISO standards, and structural IT architecture plans.',
    orders: 3488,
    reviews: 1395,
    rating: 5,
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
  },
  {
    name: 'Arthur Amoroso',
    title: 'Ph.D. in Applied Mathematics',
    bio: 'Arthur Amoroso, an Applied Mathematics consultant, provides expert MATLAB and SPSS help for students worldwide. A leading authority on quantitative methods and algorithm optimization, ensuring your calculation-heavy assignments are flawless.',
    orders: 2738,
    reviews: 1095,
    rating: 5,
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop'
  }
];

export default function ProfessionalWriters({ 
  title = "Who Are Our Top Technical Experts?", 
  subtitle = "Our team features elite technical specialists, engineers, and data scientists who have graduated top of their classes from leading universities. Whether you need a specialist for CAD, SPSS, MATLAB, or advanced coding, every expert is a verified professional committed to solving your complex academic challenges.", 
  writersData = defaultWriters 
}: ProfessionalWritersProps) {
  return (
    <section className="py-16 sm:py-20 bg-slate-50/80 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-emerald-900 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30 shadow-xs">
            Verified Mentors
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {writersData.map((writer) => (
            <div key={writer.name} className="group bg-white p-6 rounded-3xl shadow-sm border border-slate-200/90 flex flex-col items-center text-center hover:border-amber-400 hover:shadow-lg transition-all relative">
              
              <div className="relative mb-4">
                <img src={writer.img} alt={writer.name} className="w-20 h-20 rounded-2xl object-cover shadow-sm border-2 border-slate-100" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white ring-2 ring-emerald-500/20" title="Available Now"></div>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mb-0.5">{writer.name}</h3>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full mb-3 truncate max-w-full" title={writer.title}>
                {writer.title}
              </span>

              <div className="flex items-center justify-center gap-1 text-amber-500 mb-3 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={13} 
                    fill={i < Math.floor(writer.rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(writer.rating) ? "" : "text-slate-300"}
                  />
                ))}
                <span className="text-[11px] font-black text-amber-900 ml-1">5.0</span>
              </div>

              <div className="text-slate-600 text-xs mb-5 flex-grow leading-relaxed overflow-y-auto max-h-24 pr-1 text-left bg-slate-50 p-3 rounded-xl border border-slate-100">
                {writer.bio}
              </div>

              <div className="flex items-center justify-between w-full text-[11px] text-slate-500 mb-5 gap-2 px-1 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-1 text-slate-700 font-medium"><Clock size={13} className="text-teal-600" /> {writer.orders}+ Projects</div>
                <div className="flex items-center gap-1 text-slate-700 font-medium"><MessageSquare size={13} className="text-amber-600" /> {writer.reviews} Reviews</div>
              </div>

              <Link to="/portal/place-order" className="w-full text-center bg-slate-900 hover:bg-slate-800 text-amber-400 font-black py-2.5 rounded-xl transition-all text-xs inline-block shadow-xs hover:shadow-md">
                Talk to Expert
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

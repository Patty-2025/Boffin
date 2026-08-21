import React from 'react';
import { 
  PenTool, FileText, BookOpen, GraduationCap, Layout, Edit, 
  Presentation, FileCheck, Brain, Award, Briefcase, Glasses, 
  Calculator, Code, Activity, Terminal, Shield, Cpu, BookOpenCheck 
} from 'lucide-react';

const services = [
  // Group 1: Academic Writing
  { name: "Assignment Writing", icon: PenTool },
  { name: "Dissertation Writing", icon: FileCheck },
  { name: "Thesis Writing", icon: FileText },
  { name: "Coursework Writing", icon: BookOpen },
  { name: "Research Paper", icon: FileText },
  { name: "IB Extended Essay", icon: FileText },
  { name: "College Essay Help", icon: Glasses },
  { name: "Admission Essay", icon: FileText },
  { name: "Personal Statement Help", icon: PenTool },
  { name: "SOP Writing", icon: PenTool },
  { name: "Editing Proofreading", icon: Edit },

  // Group 2: Professional & Business
  { name: "MBA Project Assignment", icon: Brain },
  { name: "DBA Writing Help", icon: FileCheck },
  { name: "Accounting Assignment", icon: Calculator },
  { name: "CIPD Assignment Help", icon: Briefcase },
  { name: "CIPP Assignment Help", icon: Briefcase },
  { name: "ILM Assignment Help", icon: Briefcase },
  { name: "ATHE Assignment Help", icon: Award },
  { name: "OTHM Assignment Help", icon: Award },
  { name: "BTEC Assignment Help", icon: Award },
  { name: "CDR Report", icon: FileText },
  { name: "CV Writing", icon: FileText },

  // Group 3: Technical & Regional
  { name: "Code Debugging & Optimization", icon: Code },
  { name: "Data Analysis & Visualization", icon: Activity },
  { name: "Engineering Simulations", icon: Cpu },
  { name: "Software Architecture Plan", icon: Terminal },
  { name: "Technical Documentation", icon: FileText },
  { name: "Technical Assignment Guidance", icon: BookOpenCheck },
  { name: "Homework Help Dubai", icon: PenTool },
  { name: "Oman Assignment Essay", icon: FileText },
  { name: "University Assignment Help", icon: GraduationCap },
  { name: "Open University Assignment", icon: GraduationCap },
  { name: "Online Exam Help", icon: Layout },
  { name: "Powerpoint Presentation", icon: Presentation }
];

export default function ServicesGrid() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 text-center mb-8 tracking-tight">
          Explore Our Specialized Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <a 
                href={`/portal/place-order?subject=${encodeURIComponent(service.name)}`}
                key={index} 
                className="flex items-center gap-4 p-3.5 border border-orange-300 hover:border-orange-500 hover:shadow-md transition-all group bg-white cursor-pointer rounded-xl"
              >
                <div className="bg-orange-50 p-2 rounded-lg group-hover:bg-orange-100 transition-colors">
                  <Icon size={20} className="text-orange-600 transition-colors" />
                </div>
                <span className="font-bold text-orange-500 text-[15px] group-hover:text-orange-600 transition-colors">
                  {service.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

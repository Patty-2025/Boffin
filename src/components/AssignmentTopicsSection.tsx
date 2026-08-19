import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Feature {
  name: string;
  originalPrice: string;
}

interface AssignmentTopicsSectionProps {
  title?: string;
  description?: string;
  topicsTitle?: string;
  topics?: string[];
  featuresTitle?: string;
  freeFeatures?: Feature[];
  buttonText?: string;
}

const defaultTopics = [
  "SPSS Data Analysis", "MATLAB Programming", "AutoCAD Design",
  "Revit / BIM Modeling", "R Studio Analysis", "SolidWorks Design",
  "Python Scripting", "C++ & Java Coding", "Machine Learning Models",
  "Econometrics (Stata)", "SAS Programming", "Engineering Calculations",
  "Database Architecture", "SQL Query Optimization", "Circuit Design",
  "Fluid Mechanics", "Structural Analysis", "Cybersecurity Projects",
  "Algorithm Development", "Data Visualization", "Statistical Testing",
  "Financial Modeling", "Thermodynamics", "3D Rendering"
];

const defaultFeatures = [
  { name: "Code Optimization", originalPrice: "20.99" },
  { name: "Bug Fixing & Testing", originalPrice: "19.99" },
  { name: "Logic Explanations", originalPrice: "14.99" },
  { name: "Data Scrubbing", originalPrice: "12.99" },
  { name: "Architecture Review", originalPrice: "10.99" },
  { name: "Unlimited Revisions", originalPrice: "$6.99" }
];

export default function AssignmentTopicsSection({
  title = "Expert Technical Support for Every Software and Subject",
  description = "Get expert guidance and practical solutions for your toughest technical assignments, helping you master the tools and achieve top grades without the stress.",
  topicsTitle = "Technical Tools & Topics We Cover",
  topics = defaultTopics,
  featuresTitle = "FREE Technical Perks",
  freeFeatures = defaultFeatures,
  buttonText = "Get Expert Help"
}: AssignmentTopicsSectionProps) {
  return (
    <section className="pt-0 pb-8 px-4 sm:px-8 md:px-12 lg:px-24 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Topics left side */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight">
              {title}
            </h2>
            <p className="text-lg text-slate-600 mb-8 italic">
              {description}
            </p>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-6">{topicsTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-3">
              {topics.map((topic, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                  <span className="text-sm">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Features right side */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">{featuresTitle}</h3>
              <div className="space-y-4 mb-8">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-teal-600" />
                      <span className="text-sm text-slate-700 font-medium">{feature.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-slate-400 line-through">{feature.originalPrice}</span>
                       <span className="text-xs font-extrabold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">FREE</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-4 font-semibold">Get These Technical Perks Included Free</p>
                <button className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-amber-500/10 active:scale-[0.99]">
                  {buttonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

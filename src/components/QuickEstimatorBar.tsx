import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, ShieldCheck, Flame, Check } from 'lucide-react';

export default function QuickEstimatorBar() {
  const navigate = useNavigate();
  const [academicLevel, setAcademicLevel] = useState('Undergraduate');
  const [urgency, setUrgency] = useState('24 Hours');
  const [workType, setWorkType] = useState('Data Analysis');
  const [pages, setPages] = useState(2);

  // Dynamic price calculation
  const getBaseRate = () => {
    let rate = 18;
    if (academicLevel === 'Masters') rate = 24;
    if (academicLevel === 'PhD') rate = 32;

    if (workType === 'CAD Design') rate += 5;
    if (workType === 'Coding / Scripting') rate += 4;

    if (urgency === '3 Hours') rate *= 1.8;
    else if (urgency === '24 Hours') rate *= 1.3;
    else if (urgency === '3 Days') rate *= 1.1;

    return Math.round(rate * pages);
  };

  const estimatedTotal = getBaseRate();
  const discountedTotal = Math.round(estimatedTotal * 0.5);

  const handleProceed = () => {
    navigate(`/order?level=${academicLevel}&urgency=${urgency}&type=${workType}&pages=${pages}`);
  };

  return (
    <section className="py-8 bg-white border-b border-slate-200/80">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 rounded-2xl p-6 border border-slate-800 shadow-xl text-white">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Header */}
            <div className="lg:w-1/4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-2">
                <Calculator size={14} /> Instant Cost Calculator
              </div>
              <h3 className="text-xl font-extrabold text-white">
                Estimate Your Technical Project
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Transparent pricing with 50% discount auto-applied.
              </p>
            </div>

            {/* Selectors Form Grid */}
            <div className="lg:w-2/4 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Academic Level
                </label>
                <select 
                  value={academicLevel} 
                  onChange={(e) => setAcademicLevel(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                >
                  <option value="Diploma">Diploma</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Masters">Master's</option>
                  <option value="PhD">Ph.D.</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Urgency
                </label>
                <select 
                  value={urgency} 
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                >
                  <option value="3 Hours">3 Hours (Urgent)</option>
                  <option value="24 Hours">24 Hours</option>
                  <option value="3 Days">3 Days</option>
                  <option value="7 Days">7 Days</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Type of Work
                </label>
                <select 
                  value={workType} 
                  onChange={(e) => setWorkType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                >
                  <option value="Data Analysis">Data Analysis (SPSS/R)</option>
                  <option value="Coding / Scripting">Coding (Python/MATLAB)</option>
                  <option value="CAD Design">CAD Design (AutoCAD/Revit)</option>
                  <option value="Research / Essay">Research & Report</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Pages / Scope
                </label>
                <select 
                  value={pages} 
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500/50"
                >
                  <option value={1}>1 Page (~275 words)</option>
                  <option value={2}>2 Pages (~550 words)</option>
                  <option value={5}>5 Pages (~1375 words)</option>
                  <option value={10}>10 Pages (~2750 words)</option>
                  <option value={15}>15+ Pages (Major Project)</option>
                </select>
              </div>
            </div>

            {/* Calculated Price & Action */}
            <div className="lg:w-1/4 bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between lg:flex-col lg:items-end gap-2">
              <div className="text-left lg:text-right">
                <span className="text-[11px] text-slate-400 block font-semibold">Estimated Price:</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-400">${discountedTotal}</span>
                  <span className="text-xs text-slate-500 line-through font-medium">${estimatedTotal}</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 font-bold px-1.5 py-0.5 rounded">
                    50% OFF
                  </span>
                </div>
              </div>

              <button 
                onClick={handleProceed}
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-lg text-xs transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5 whitespace-nowrap active:scale-95"
              >
                <span>Proceed to Order</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

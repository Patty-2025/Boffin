import React from 'react';
import { ShieldCheck, MessageSquare, Clock, PenTool, Keyboard, FileSearch } from 'lucide-react';

export default function SampleSidebar() {
  return (
    <div className="space-y-6">
      {/* Professional Writing Help Form Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 text-center">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Professional Writing Help by PhD Experts</h3>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <ShieldCheck size={14} className="text-emerald-500" />
              Guaranteed Grade or Refund
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <ShieldCheck size={14} className="text-emerald-500" />
              No AI
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <ShieldCheck size={14} className="text-emerald-500" />
              24/7 Support
            </div>
          </div>

          <form className="space-y-4" onClick={(e) => e.preventDefault()}>
            <div className="flex justify-between gap-2 mb-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="service" className="w-4 h-4 accent-[10b981]" defaultChecked />
                <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-500 transition-colors">Writing</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="service" className="w-4 h-4 accent-[#f47321]" />
                <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-500 transition-colors">Technical</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="radio" name="service" className="w-4 h-4 accent-[#f47321]" />
                <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-500 transition-colors">Online Class</span>
              </label>
            </div>

            <input 
              type="email" 
              placeholder="Email"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors"
            />
            
            <input 
              type="text" 
              placeholder="Subject/Course Code"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors"
            />

            <div className="flex gap-2">
              <input 
                type="date" 
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors"
              />
              <input 
                type="time" 
                defaultValue="14:00"
                className="w-32 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-widest">Pages</div>
              <input 
                type="number" 
                defaultValue="1"
                min="1"
                className="w-full pl-16 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors flex text-right"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase tracking-widest">250 words</div>
            </div>

            <div className="flex gap-2">
              <select className="w-24 px-3 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors appearance-none font-bold text-slate-700">
                <option value="+1">US(+1)</option>
                <option value="+44">UK(+44)</option>
                <option value="+61">AU(+61)</option>
                <option value="+1">CA(+1)</option>
                <option value="+91">IN(+91)</option>
                <option value="+65">SG(+65)</option>
                <option value="+971">UAE(+971)</option>
              </select>
              <input 
                type="tel" 
                placeholder="Phone no."
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <textarea 
              placeholder="Description (Write/Attach)"
              rows={3}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-emerald-500 transition-colors resize-none"
            />

            <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-dashed border-slate-300 cursor-pointer hover:bg-slate-100 transition-colors">
              < PenTool size={16} className="text-slate-400" />
              <span className="text-xs font-semibold text-slate-500">Attach file</span>
            </div>

            <div className="flex items-start gap-2 pt-2">
              <input type="checkbox" className="mt-1 accent-[#f47321]" id="terms-sidebar" />
              <label htmlFor="terms-sidebar" className="text-xs text-slate-500 leading-tight text-left">
                I accept the T&C, agree to receive offers & updates
              </label>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl font-extrabold text-base transition-all shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5">
              Free Assistance
            </button>
          </form>
        </div>
      </div>

      {/* Tool Links Section */}
      <div className="bg-[#2a2a2a] rounded-2xl p-6 space-y-6">
        <div className="flex items-start gap-4 group cursor-pointer">
          <div className="p-3 bg-white/10 rounded-xl group-hover:bg-emerald-500 transition-all">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">Verify originality of an essay</h4>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
              Plagiarism checker 
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 group cursor-pointer">
          <div className="p-3 bg-white/10 rounded-xl group-hover:bg-emerald-500 transition-all">
            <Keyboard size={20} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">Generate unique essays in a jiffy</h4>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
              Essay Typer
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 group cursor-pointer">
          <div className="p-3 bg-white/10 rounded-xl group-hover:bg-emerald-500 transition-all">
            <FileSearch size={20} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-0.5">Cite sources with ease</h4>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
              Citation generator
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ArrowRight = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14m-7-7 7 7-7 7"/>
  </svg>
);

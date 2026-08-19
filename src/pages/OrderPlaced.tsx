import React from 'react';
import { MessageSquare, Phone, Paperclip, Send, ChevronDown, Award, Zap, DollarSign } from 'lucide-react';

export default function OrderPlaced() {
  return (
    <main className="pt-24 pb-12 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Top Banner */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex items-center justify-between">
          <h2 className="font-bold text-slate-800">ORDER ID: 2413319 | Sociology And Social Science</h2>
          <div className="flex gap-2">
            <button className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-lg border border-blue-100">New Request</button>
            <button className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-lg border border-emerald-100">Awaiting Quotation</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left Panel */}
          <div className="col-span-3 space-y-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Get a Callback</button>
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
              <div className="p-4 border-b border-slate-100 font-bold text-slate-700">TALK TO EXPERT</div>
              <div className="p-4 text-sm text-slate-600">Offline message: Expert respond within 24 hrs: for urgent assistance, tap into LIVE CHAT</div>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm"><div className="p-4 font-bold text-slate-700 flex justify-between items-center">Pending details <ChevronDown size={18} /></div></div>
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm"><div className="p-4 font-bold text-slate-700 flex justify-between items-center">Order Details <ChevronDown size={18} /></div></div>
          </div>

          {/* Central Chat Panel */}
          <div className="col-span-6 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[600px]">
            <div className="p-4 border-b border-slate-100 font-bold text-slate-700 flex justify-between">
              <span>LIVE CHAT</span> <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">Sales</span>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
              <div className="bg-slate-100 p-4 rounded-xl text-sm text-slate-700 max-w-sm">
                Dear Student, Our expert is reviewing your requirements — we'll share the best quote in a couple of minutes.
              </div>
            </div>
            <div className="p-4 border-t border-slate-100 flex gap-2">
              <input type="text" placeholder="Type your query here..." className="flex-grow p-2 border border-slate-200 rounded-lg text-sm" />
              <button className="p-2 bg-slate-100 rounded-lg"><Paperclip size={18} /></button>
              <button className="p-2 bg-blue-600 text-white rounded-lg"><Send size={18} /></button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="col-span-3 space-y-4">
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                <DollarSign size={32} className="mx-auto text-blue-600 mb-2" />
                <div className="font-bold text-slate-700">Price awaiting</div>
                <div className="text-xs text-slate-500 mb-4">in a hurry to know price</div>
                <button className="w-full bg-slate-900 text-white py-2 rounded-lg font-bold text-sm">Chat now</button>
             </div>
             
             <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="font-bold text-slate-800 mb-2">FLAT 30% OFF</div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p>✔ Guaranteed A or B Grade by PHD Experts</p>
                  <p>✔ No Stress - Experts Manage the Entire Term</p>
                  <p>✔ Affordable - Flexible Instalment Options</p>
                </div>
                <button className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg font-bold text-sm">Know More</button>
             </div>
          </div>
        </div>
      </div>
    </main>
  );
}

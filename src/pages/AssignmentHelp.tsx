import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Sparkles, 
  Clock, 
  UserCheck, 
  FileCheck2, 
  HelpCircle, 
  Coins, 
  Users, 
  Flame, 
  BookmarkCheck, 
  Lock, 
  RefreshCw, 
  MessageSquare, 
  Phone, 
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  Check, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

// Consistent pricing details matching the main system in USD
const pricingRates: Record<string, Record<string, number>> = {
  highSchool: { "20+ Days": 8.50, "15 Days": 9.50, "10 Days": 12.50, "7 Days": 13.50, "6 Days": 15.00, "5 Days": 16.50, "4 Days": 18.00, "3 Days": 20.50, "2 Days": 23.00, "24 Hours": 28.50, "12 Hours": 39.50, "6 Hours": 45.00 },
  college: { "20+ Days": 9.50, "15 Days": 11.00, "10 Days": 13.50, "7 Days": 15.00, "6 Days": 16.50, "5 Days": 18.00, "4 Days": 19.00, "3 Days": 22.00, "2 Days": 24.50, "24 Hours": 27.00, "12 Hours": 38.00, "6 Hours": 43.50 },
  undergrad: { "20+ Days": 11.00, "15 Days": 12.50, "10 Days": 15.00, "7 Days": 16.50, "6 Days": 18.00, "5 Days": 19.00, "4 Days": 20.50, "3 Days": 23.00, "2 Days": 28.50, "24 Hours": 31.50, "12 Hours": 42.00, "6 Hours": 47.50 },
  masters: { "20+ Days": 13.50, "15 Days": 15.00, "10 Days": 18.00, "7 Days": 19.00, "6 Days": 20.50, "5 Days": 22.00, "4 Days": 23.00, "3 Days": 26.00, "2 Days": 31.50, "24 Hours": 34.00, "12 Hours": 45.00, "6 Hours": 50.00 },
  phd: { "20+ Days": 16.50, "15 Days": 18.00, "10 Days": 20.50, "7 Days": 22.00, "6 Days": 23.00, "5 Days": 24.50, "4 Days": 26.00, "3 Days": 28.50, "2 Days": 34.00, "24 Hours": 37.00, "12 Hours": 47.50, "6 Hours": 53.00 },
  admission: { "20+ Days": 19.00, "15 Days": 20.50, "10 Days": 23.00, "7 Days": 24.50, "6 Days": 26.00, "5 Days": 27.00, "4 Days": 28.50, "3 Days": 31.50, "2 Days": 37.00, "24 Hours": 39.50, "12 Hours": 50.00, "6 Hours": 56.00 }
};

const referencingStyles = ["APA 7th Edition", "Harvard Style", "Chicago Manual", "MLA 9th Edition", "IEEE Format", "Oxford Style", "Vancouver Style", "Turabian Style"];
const deadlinesList = ["20+ Days", "15 Days", "10 Days", "7 Days", "6 Days", "5 Days", "4 Days", "3 Days", "2 Days", "24 Hours", "12 Hours", "6 Hours"];
const levelsList = [
  { id: 'highSchool', name: 'High School' },
  { id: 'college', name: 'College' },
  { id: 'undergrad', name: 'Undergraduate' },
  { id: 'masters', name: 'Masters' },
  { id: 'phd', name: 'Ph.D.' },
  { id: 'admission', name: 'Admission Essay' }
];

const mainAssistanceServices = [
  "Assignment Writing", "MBA Project Assignment", "ILM Assignment Help", "Accounting Assignment",
  "Coursework Writing", "Dissertation Writing", "SOP Writing", "University Assignments",
  "CIPD Assignments", "Arab Assignments", "CIPP Assignments", "OTHM Assignments",
  "ATHE Assignments", "CV Writing", "Online Exam Help", "Thesis Help",
  "Editing Proofreading", "Research Paper Help", "IB Extended Essay", "Oman Assignments Essay",
  "Homework Help", "Powerpoint Presentation", "Admission Essay", "College Essay Help"
];

export default function AssignmentHelp() {
  const [referencing, setReferencing] = useState('');
  const [pages, setPages] = useState(1);
  const [educationLevel, setEducationLevel] = useState('undergrad');
  const [deadline, setDeadline] = useState('7 Days');

  // Interactive amount estimator
  const costPerPage = pricingRates[educationLevel]?.[deadline] || 15.00;
  const totalAmount = costPerPage * pages;

  const handleOpenWhatsApp = () => {
    const messageText = `Hello Boffin Support, I need assistance with my assignment. Reference Style: ${referencing || 'Standard'}, Pages: ${pages}, Level: ${educationLevel}, Deadline: ${deadline}. Can I get a customized quote?`;
    window.open(`https://wa.me/254118155512?text=${encodeURIComponent(messageText)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <main id="assignment-help-page" className="pt-[80px] bg-slate-50 text-slate-800 font-sans">
      <SEO 
        title="100% Plagiarism Free Assignment Help | Boffin Global Services"
        description="Premium, zero plagiarism custom assignment writing help for college, masters and PhD students. Fully original, human-written content guaranteed."
        keywords="assignment help, essay writing service, homework help, Boffin writing, plagiarism free essays, buy essay online"
        canonicalUrl="/assignment-help"
      />

      {/* Dynamic Hero banner with Light high-contrast theme */}
      <section className="bg-gradient-to-b from-slate-50 to-amber-50/20 py-16 sm:py-24 px-6 border-b border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-xs">
              <Sparkles size={14} className="text-amber-600" />
              <span>100% PLAGIARISM FREE GUARANTEE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
              100% Plagiarism Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600">Assignment Help</span> from Boffin
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-medium">
              Need professional assignment help with zero plagiarism guarantee? Let subject-specific academic mentors from Boffin work on your papers, delivering every project fully checked and verified by advanced detection tools. Your papers are custom-crafted from scratch at budget-friendly rates with a timely delivery guarantee. Start with us today for a stress-free study experience.
            </p>

            {/* Feature Bullets grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-4">
              {[
                { label: "Free Plagiarism Report", desc: "Turnitin, Copyleaks & Grammarly" },
                { label: "Fully Confidential", desc: "Strict NDAs & encrypted data" },
                { label: "24/7 Live Support", desc: "WhatsApp & direct phone response" },
                { label: "Subject Expert Writers", desc: "Master's & Ph.D. scholars" },
                { label: "Free Unlimited Revisions", desc: "Committed to flawless accuracy" },
                { label: "Flexible Installments", desc: "Pay only 50% upfront to start" }
              ].map((f, idx) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs flex flex-col justify-between">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 size={13} className="text-amber-600 shrink-0" />
                    {f.label}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold mt-1 leading-snug">{f.desc}</span>
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap gap-3.5 pt-4">
              <Link 
                to="/portal/place-order"
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-7 py-3.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase transition-colors"
              >
                Order Now
              </Link>
              <button 
                onClick={handleOpenWhatsApp}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-7 py-3.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare size={15} />
                <span>Live Chat</span>
              </button>
            </div>
          </div>

          {/* Dynamic Quote & Estimate Panel */}
          <div className="lg:col-span-5 bg-white p-8 rounded-[32px] border border-slate-200 shadow-md flex flex-col justify-between">
            <div className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Coins className="text-amber-500" size={20} />
                  <span>Start with a Free Quote</span>
                </h3>
                <p className="text-slate-400 text-xs font-semibold mt-0.5">Customize your assignment needs to calculate your transparent USD cost.</p>
              </div>

              {/* Referencing */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Paper Referencing Style</label>
                <select
                  value={referencing}
                  onChange={(e) => setReferencing(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold outline-none focus:border-amber-500"
                >
                  <option value="">Please Select Referencing</option>
                  {referencingStyles.map((style) => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              {/* Page Number slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Select Page No</label>
                  <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md border border-slate-200">
                    {pages} Page{pages > 1 ? 's' : ''} (~{pages * 275} words)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={pages}
                  onChange={(e) => setPages(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-500 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                />
              </div>

              {/* Education level selection */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Education Level</label>
                <div className="grid grid-cols-2 gap-2">
                  {levelsList.map((level) => (
                    <button
                      key={level.id}
                      onClick={() => setEducationLevel(level.id)}
                      className={`py-2.5 px-3 rounded-lg text-xs font-bold border text-center transition-all cursor-pointer ${
                        educationLevel === level.id
                          ? 'bg-amber-500/10 border-amber-500 text-amber-900 font-extrabold'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {level.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Deadline */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-wider">Select Deadline</label>
                <select
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm font-semibold outline-none focus:border-amber-500"
                >
                  {deadlinesList.map((item) => (
                    <option key={item} value={item}>{item} (${(pricingRates[educationLevel]?.[item] || 15.00).toFixed(2)}/pg)</option>
                  ))}
                </select>
              </div>

              {/* Dynamic total block */}
              <div className="bg-slate-900 text-white p-4.5 rounded-2xl flex justify-between items-center border border-slate-950 mt-4 shadow-sm">
                <div>
                  <span className="text-[10px] text-slate-400 font-black uppercase tracking-wider">Estimated Total</span>
                  <div className="text-2xl font-black text-amber-400">${totalAmount.toFixed(2)} <span className="text-[10px] text-white">USD</span></div>
                </div>
                <Link
                  to={`/portal/place-order?level=${educationLevel}&pages=${pages}&deadline=${deadline}&referencing=${encodeURIComponent(referencing)}`}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase px-4 py-2.5 rounded-lg transition-all active:scale-95"
                >
                  Proceed Now
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Human Writing Safeguards Verification block */}
      <section className="bg-gradient-to-r from-amber-50 via-white to-orange-50/50 py-10 px-6 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="space-y-2 max-w-2xl">
            <h3 className="text-lg font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <Shield className="text-amber-600" size={22} />
              <span>100% Genuine Human-Written Content Guarantee</span>
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold leading-relaxed">
              No ChatGPT or visual generators are used in drafting. Every paper undergoes comprehensive analysis from academic specialists, protected and verified by leading authentication tools.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-3 border border-slate-200 rounded-2xl shadow-2xs">
            <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">Turnitin Certified</span>
            <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">Copyleaks Passed</span>
            <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">Unicheck Screened</span>
            <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">Grammarly Checked</span>
          </div>
        </div>
      </section>

      {/* Why Prefer Us Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto space-y-16">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Why Prefer Boffin for Reliable Assignment Help?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-semibold max-w-2xl mx-auto leading-relaxed">
            When it comes to a professional and dependable assignment writing service, Boffin is a recognized and established agency for students of every discipline. We earn this trust because of our more than a decade of service excellence, delivering premium academic standards and strict adherence to university grading rubrics.
          </p>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-400 transition-colors shadow-2xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-black">01</div>
              <h4 className="text-base font-black text-slate-900">Expert Team</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                We deliver assignment writing help backed by highly qualified and experienced academic mentors. Every helper on our team possesses advanced degrees in their specialized fields, preparing content aligned with strict institutional integrity.
              </p>
            </div>
            <span className="text-xs font-black text-amber-600 flex items-center gap-1.5">Master's & PhD Mentors <ArrowRight size={13} /></span>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-400 transition-colors shadow-2xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-black">02</div>
              <h4 className="text-base font-black text-slate-900">Dependable Support</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                We proudly hold a timely delivery rate of 98% spanning our 10+ years of writing service. Whether it is a complex technical assignment or an analytical essay, we guarantee swift completions without compromising quality standards.
              </p>
            </div>
            <span className="text-xs font-black text-blue-600 flex items-center gap-1.5">98% On-Time Completion <ArrowRight size={13} /></span>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-400 transition-colors shadow-2xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-black">03</div>
              <h4 className="text-base font-black text-slate-900">Quality Assurance</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                Our services come with an absolute quality guarantee. Whether it is a university thesis, essay, or case study, we ensure 100% plagiarism free, deeply researched work custom-built according to instructions, backed by free unlimited revisions.
              </p>
            </div>
            <span className="text-xs font-black text-emerald-600 flex items-center gap-1.5">100% Plagiarism Free <ArrowRight size={13} /></span>
          </div>

          {/* Pillar 4 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-400 transition-colors shadow-2xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center font-black">04</div>
              <h4 className="text-base font-black text-slate-900">Authentic Services</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                Along with superior content, we maintain high ethical standards regarding payment safety and personal privacy. Enjoy clear breakdowns with zero hidden fees, custom quotes, and complete data encryption.
              </p>
            </div>
            <span className="text-xs font-black text-indigo-600 flex items-center gap-1.5">Strict NDA Protected <ArrowRight size={13} /></span>
          </div>

          {/* Pillar 5 */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-amber-400 transition-colors shadow-2xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-black">05</div>
              <h4 className="text-base font-black text-slate-900">Student Friendly</h4>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-semibold">
                Get high-quality academic support exactly when you need it. Our 24/7 live team handles short deadlines with an express 6-hour option, free formatting add-ons, citation bibliography listings, and expert consultations.
              </p>
            </div>
            <span className="text-xs font-black text-amber-600 flex items-center gap-1.5">24/7 Academic Desk <ArrowRight size={13} /></span>
          </div>
        </div>
      </section>

      {/* Close Deadline / 6 hour express banner */}
      <section className="bg-slate-950 py-16 px-6 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-400 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            <Flame size={13} className="animate-pulse" />
            <span>Express Academic Support</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Is the Deadline Close? Get Your Paper in Just 6 Hours!</h3>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
            Stop worrying about tight timelines; choose our express Boffin writing service and get your assignments finalized in just 6 hours with guaranteed quality, rigorous proofreading, and 100% original human-written material.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link to="/portal/place-order" className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition-all hover:scale-105">
              Order Now
            </Link>
            <button onClick={handleOpenWhatsApp} className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-extrabold px-6 py-3 rounded-xl text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 cursor-pointer">
              <MessageSquare size={14} className="text-amber-400" />
              <span>Live Chat</span>
            </button>
          </div>
        </div>
      </section>

      {/* Meet Our Writers section */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-900 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-2xs">
            <UserCheck size={14} className="text-blue-600" />
            <span>VERIFIED SCHOLARS</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Meet Assignment Writers Who Work on Your Papers!
          </h3>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Looking for a professional assignment helper who can actually deliver top-tier grades? Connect with our team, where you work with the top minds in the academic industry. Our writing team is unmatched in the market with its expertise, professionalism, and dependable services.
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Being professionals, we understand that writers are significant in delivering quality; therefore, we ensure that every academic assistant holds a strong academic background along with deep professional exposure. We have writers with Master's and PhD degrees in specialized fields such as business, IT, engineering, nursing, sciences, and law. In addition, we employ native researchers deeply familiar with institutional grading guidelines and course rubrics across the globe.
          </p>
          <div className="bg-amber-50 border border-amber-200/60 p-5 rounded-2xl flex items-start gap-3.5">
            <CheckCircle2 size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <p className="text-slate-600 text-[11.5px] sm:text-xs font-semibold leading-relaxed">
              Receive a completely AI-free, plagiarism-free assignment writing service where every document reflects comprehensive literature review, critical evaluation, and perfectly applied referencing styles.
            </p>
          </div>
        </div>

        {/* Visual Card detailing writer qualifications */}
        <div className="bg-white p-8 sm:p-10 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-lg font-black text-slate-950">Expert Writer Profiles</h4>
            <div className="divide-y divide-slate-150">
              <div className="py-4.5 flex gap-4 items-center">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-xs">M1</div>
                <div>
                  <h5 className="text-xs sm:text-sm font-black text-slate-900">Dr. Sarah Henderson (Ph.D.)</h5>
                  <p className="text-[11px] text-slate-400 font-bold">12+ Years Experience • Humanities & Social Sciences</p>
                </div>
              </div>
              <div className="py-4.5 flex gap-4 items-center">
                <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center font-black text-xs">M2</div>
                <div>
                  <h5 className="text-xs sm:text-sm font-black text-slate-900">Prof. Marc Al-Fayed (M.Sc.)</h5>
                  <p className="text-[11px] text-slate-400 font-bold">8+ Years Experience • Engineering & MATLAB simulations</p>
                </div>
              </div>
              <div className="py-4.5 flex gap-4 items-center">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-black text-xs">M3</div>
                <div>
                  <h5 className="text-xs sm:text-sm font-black text-slate-900">Dr. Robert Chen (Ph.D.)</h5>
                  <p className="text-[11px] text-slate-400 font-bold">10+ Years Experience • MBA Projects & Finance Analysis</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-150 flex flex-col sm:flex-row gap-3">
            <Link to="/portal/place-order" className="bg-slate-900 hover:bg-slate-800 text-white text-center font-extrabold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-colors">
              Assign to Expert
            </Link>
            <button onClick={handleOpenWhatsApp} className="border border-slate-200 hover:bg-slate-50 text-slate-800 font-extrabold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer">
              <MessageSquare size={14} className="text-emerald-600" />
              <span>Discuss Requirements</span>
            </button>
          </div>
        </div>
      </section>

      {/* Customized Writing Strategy section */}
      <section className="bg-white py-20 px-6 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-[32px] space-y-6 flex flex-col justify-between border border-slate-950 shadow-md">
            <div className="space-y-4">
              <span className="text-[10px] bg-amber-500/15 text-amber-400 border border-amber-500/25 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest inline-block">50% INSTALMENT PLAN</span>
              <h4 className="text-xl font-extrabold">Enjoy Affordable Assignment Writing with Premium Results</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-semibold">
                Regardless of the service scope, you experience friendly, budget-friendly rates and high-quality assistance from our team. If you find upfront payment straining, you can divide your total into an instalment plan. Pay just 50% of your total to initiate the draft, and the rest once finalized!
              </p>
            </div>
            <div className="border-t border-white/10 pt-4 space-y-2 text-xs font-bold text-slate-300">
              <div className="flex gap-2 items-center"><Check size={14} className="text-amber-500" /> Formatting & layout at zero cost</div>
              <div className="flex gap-2 items-center"><Check size={14} className="text-amber-500" /> Referencing & bibliography listed free</div>
              <div className="flex gap-2 items-center"><Check size={14} className="text-amber-500" /> Title page & Table of contents included</div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-2xs">
              <BookmarkCheck size={14} className="text-amber-600" />
              <span>CUSTOM METHODOLOGY</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              Get Custom Assignment Writing Services for Every Paper
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              Assignment writing is more than just summarizing knowledge and describing a topic. Whether you are in university, college, or covering any vocational program tasks, you have to write by following a specific roadmap, which is what we call an assignment brief.
            </p>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              However, before following it, you must have a complete and sound grasp of what each instruction in your assignment brief is actually about. That said, many students who are already grappling with tight schedules, heavy lecture workloads, and professional responsibilities are often unable to dedicate the extensive attention required. This process can lead to compromised grades.
            </p>
            <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
              Our professional academic writers are assigned based on their subject expertise and writing experience, which means they can completely grasp your brief instructions in the context of your curriculum and topic requirements. They review your brief first, the questions, and keywords, and follow it religiously throughout the process. They strictly adhere to word count limitations, formatting rules, citations, and analytical depth.
            </p>
          </div>

        </div>
      </section>

      {/* Unlimited free revisions block */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-2xs">
            <RefreshCw size={14} className="text-amber-600 animate-spin-slow" />
            <span>UNLIMITED FREE REVISIONS</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Revise Your Assignment for Free, No Limits Here!
          </h3>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Found an discrepancy or want minor adjustments in your assignment? Connect with our support desk and get your work revised for free. We offer unlimited free revisions if our team fails to comply with your original prompt instructions.
          </p>
          <p className="text-slate-600 text-sm sm:text-base font-medium leading-relaxed">
            Although our multi-tier quality checks ensure drafts are thoroughly inspected, we never hesitate to take responsibility. All revision requests are handled with maximum priority by our senior editors, addressing changes within 24 to 48 hours.
          </p>
          <div className="flex gap-4 pt-2">
            <button onClick={handleOpenWhatsApp} className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider cursor-pointer">
              Initiate Revision Chat
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-100 p-8 rounded-[32px] border border-slate-200 text-center space-y-6">
          <h4 className="text-base font-black text-slate-950">Strict Quality Checklist</h4>
          <div className="space-y-3.5 text-left text-xs font-bold text-slate-600">
            <div className="flex gap-2.5 items-center bg-white p-3 rounded-xl border border-slate-200"><CheckCircle2 className="text-emerald-600" size={16} /> Initial Instruction Match check</div>
            <div className="flex gap-2.5 items-center bg-white p-3 rounded-xl border border-slate-200"><CheckCircle2 className="text-emerald-600" size={16} /> Plagiarism Similarity check &lt;5%</div>
            <div className="flex gap-2.5 items-center bg-white p-3 rounded-xl border border-slate-200"><CheckCircle2 className="text-emerald-600" size={16} /> Strict citation formatting verification</div>
            <div className="flex gap-2.5 items-center bg-white p-3 rounded-xl border border-slate-200"><CheckCircle2 className="text-emerald-600" size={16} /> Structural & mathematical proof logic review</div>
          </div>
        </div>
      </section>

      {/* NDA Confidentiality section */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 text-white py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/20 text-amber-400 text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-xs">
              <Lock size={14} className="text-amber-500" />
              <span>SECURE PRIVACY CONTROLS</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Worried About Online Safety? Choose Our Confidential Service
            </h3>
            <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
              Want to say "write my assignment" but hesitant to share your personal data? Well, Boffin understands your concerns and takes rigorous steps to safeguard your privacy. We never share your personal or academic information with any third party.
            </p>
            <p className="text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
              Our academic helpers sign strict NDAs before undertaking any order. Only role-based access is offered to our team members. We use fully encrypted communication channels to ensure secure data transmission, and our payment portals are protected by advanced checkout gateways that never save your card details. Once your service is finalized, your details are immediate anonymized.
            </p>
          </div>

          {/* Stats details widget */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center space-y-1">
              <span className="text-3xl font-black text-amber-400 block">50+</span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Subject Specialists</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center space-y-1">
              <span className="text-3xl font-black text-amber-400 block">14K+</span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Students Assisted</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center space-y-1">
              <span className="text-3xl font-black text-amber-400 block">120+</span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Disciplines Covered</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl text-center space-y-1">
              <span className="text-3xl font-black text-amber-400 block">71%</span>
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider block">Repeat Client Rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Structured FAQs */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <h3 className="text-center text-3xl font-extrabold text-slate-950 tracking-tight">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {[
            {
              q: "Where can I find assignment help?",
              a: "Various online platforms offer professional assignment services. However, it is important to check the reliability and expertise of the team you are hiring. In that case, Boffin is a prominent name in the academic assistance industry, supporting students globally with plagiarism-free, customized, and timely submissions."
            },
            {
              q: "What is the best website for assignment help?",
              a: "Boffin provides premium, fully custom-written, and original solutions verified by Turnitin. Our combination of affordable pricing, installment payment options, native writers with Master's/Ph.D. credentials, and dedicated 24/7 chat support makes us a preferred study partner."
            },
            {
              q: "Can I hire someone to do my assignments?",
              a: "Yes, you can hire verified academic mentors at Boffin to assist you with research, outline drafts, mathematical calculations, reference listings, and comprehensive coding solutions that meet your curriculum specifications."
            },
            {
              q: "How much does a homework helper cost?",
              a: "Our assignment help is budget-friendly, starting at just $8.50 per page depending on academic level and urgency, backed by transparent pricing, no hidden transaction fees, and free revisions."
            },
            {
              q: "Can I use AI for my assignments?",
              a: "Using AI models can lead to generic, repetitive content that fails university plagiarism and authenticity screeners. Boffin delivers strictly human-written papers custom-built from scratch with comprehensive analysis and original critical arguments."
            }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2">
              <h4 className="text-sm sm:text-base font-black text-slate-950 flex gap-2 items-start">
                <HelpCircle className="text-amber-600 shrink-0 mt-0.5" size={18} />
                <span>{faq.q}</span>
              </h4>
              <p className="text-slate-500 text-xs sm:text-sm font-semibold pl-6.5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Section with verified support info */}
      <section className="bg-slate-50 py-12 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">Need Immediate Live Support? Call or Message Us Direct 24/7</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-between space-y-3 hover:border-emerald-500 transition-colors">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">WhatsApp</h4>
              <button onClick={handleOpenWhatsApp} className="text-xs font-black text-emerald-600 hover:text-emerald-700 tracking-wide uppercase">
                +254 118 155512
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-between space-y-3 hover:border-amber-500 transition-colors">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center">
                <Phone size={18} />
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Direct Phone</h4>
              <a href="tel:+254118155512" className="text-xs font-black text-amber-600 hover:text-amber-700 tracking-wide uppercase">
                +254 118 155512
              </a>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-between space-y-3 hover:border-blue-500 transition-colors">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <MessageSquare size={18} />
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Live Chat</h4>
              <button onClick={handleOpenWhatsApp} className="text-xs font-black text-blue-600 hover:text-blue-700 tracking-wide uppercase">
                Start Webchat
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs text-center flex flex-col items-center justify-between space-y-3 hover:border-slate-500 transition-colors">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center">
                <Mail size={18} />
              </div>
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Helpdesk Email</h4>
              <a href="mailto:info@boffinglobalgroup.com" className="text-xs font-black text-slate-700 hover:text-slate-800 tracking-wide uppercase">
                info@boffinglobalgroup.com
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Massive covered academic topics grid */}
      <section className="bg-white py-16 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-black text-slate-950 tracking-tight">Academic Topics & Assignments We Cover</h3>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold max-w-xl mx-auto">Get expert, custom-designed study documents across a massive list of modules.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {mainAssistanceServices.map((service, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-2 hover:border-amber-400 hover:bg-amber-50/20 transition-all"
              >
                <CheckCircle2 size={13} className="text-amber-600 shrink-0" />
                <span className="text-[12px] font-bold text-slate-700 truncate">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}

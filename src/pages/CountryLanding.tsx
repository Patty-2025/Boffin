import React from 'react';
import { motion } from 'motion/react';
import { Globe, CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import SEO from '../components/SEO';
import FAQSection from '../components/FAQSection';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import TrustedLogos from '../components/TrustedLogos';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import OrderFormWidget from '../components/OrderFormWidget';

interface CountryPageProps {
  countryName: string;
  countryCode: string;
  adjective: string;
  institutions: string[];
  stats: {
    experts: string;
    score: string;
  };
  seoContent1: string;
  seoContent2: string;
  customSEOContent?: React.ReactNode;
}

export default function CountryLanding({ countryName, countryCode, adjective, institutions, stats, seoContent1, seoContent2, customSEOContent }: CountryPageProps) {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      <SEO 
        title={`${adjective} Assignment Help | Premium Essay Writing Service in ${countryName}`}
        description={`Get world-class academic support tailored for ${countryName}'s leading universities. We deliver No-AI, 100% human-crafted coursework and dissertations for elite scholars.`}
        keywords={`assignment help ${countryName}, ${adjective} essay service, coursework help ${countryName}, thesis writing ${countryName}`}
        canonicalUrl={`/${countryCode.toLowerCase()}`}
      />
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-700/10 rounded-full text-blue-700 text-xs font-bold mb-6">
              <Globe size={14} /> #1 Assignment Help in {countryName}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Premium {adjective}</span>
              <span className="text-blue-700 block">Assignment Help for</span>
              <span className="text-blue-700 block">International Scholars</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Get world-class academic support tailored for {countryName}'s leading universities. We deliver No-AI, 100% human-crafted coursework and dissertations for elite scholars.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                <ShieldCheck className="text-green-500" size={16} />
                <span className="text-xs font-bold text-slate-700 uppercase">100% Original</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                <Star className="text-yellow-400 fill-yellow-400" size={16} />
                <span className="text-xs font-bold text-slate-700 uppercase">Top Rated Experts</span>
              </div>
            </div>
            
            <TrustedLogos />
          </div>
          
           {/* Order Form Widget */}
           <div className="w-full lg:w-2/5 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
             <OrderFormWidget />
           </div>
        </div>
      </section>

      <ProfessionalWriters />
      <HowItWorks />

      {/* SEO Section */}
      <section className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-10 leading-tight">Expert Academics for <span className="text-emerald-500">{countryName}'s</span> Top Institutions</h2>
            <div className="prose prose-slate max-w-none text-slate-600 font-medium text-lg leading-relaxed space-y-6">
              <p>{seoContent1}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-2 tracking-tighter">{stats.experts}</div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{adjective} PhD Experts</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm text-center">
              <div className="text-3xl font-black text-emerald-500 mb-2 tracking-tighter">{stats.score}</div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Satisfaction Score</p>
            </div>
            <div className="col-span-2 p-10 bg-slate-900 rounded-[40px] text-white">
               <h4 className="font-bold mb-6 text-emerald-500 uppercase tracking-widest text-xs">University Expertise in {countryName}</h4>
               <ul className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs text-slate-300 font-medium">
                 {institutions.map((inst, i) => <li key={i} className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div> {inst}
                 </li>)}
               </ul>
            </div>
          </div>
        </div>
      </section>

      <AssignmentTopicsSection />
      <FreeWritingTools />

      {/* Massive SEO Footer Block Styled for Consistency */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-[1000px] mx-auto text-center">
          {customSEOContent ? (
            customSEOContent
          ) : (
            <div className="text-left space-y-12">
              {/* Newsletter Block */}
              <div className="bg-blue-700 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-2xl mx-auto text-center">
                  <h2 className="text-2xl md:text-4xl font-extrabold mb-4">Get yourself updated on the latest trends from the best Essay Writing Services in {countryName}</h2>
                  <p className="text-blue-100 font-medium mb-8">Hitting the subscribe button will help you get priceless knowledge and tips about different fields related to academic and career growth.</p>
                  <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="Enter Your Email" className="flex-1 px-5 py-3 rounded-xl text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-amber-500" required />
                    <button type="submit" className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-6 py-3 rounded-xl transition-colors cursor-pointer">Subscribe Now</button>
                  </form>
                </div>
              </div>

              {/* Main Content */}
              <div className="prose prose-slate max-w-none text-slate-600 font-medium space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">The Best And Professional Essay Help In {countryName} With Guaranteed Success</h2>
                  <p className="text-xl text-slate-800 font-bold mb-4">Making All Your Academic Odds Even</p>
                  <p><strong>Avail Affordable Academic Help From Professional {adjective} Essay Writers.</strong></p>
                  <p>{seoContent2}</p>
                  <p>Are you searching for an authentic essay-writing service that is trustworthy and reliable? If YES, then you landed at the right spot. Avail of the best essay writing help for you, we deliver premium quality output at an affordable price. Known as one of the most prominent essay writing services in {countryName}, we can proudly say that we are pioneers of the writing industry.</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Essay Writing Services – Covering Every Academic Factor</h3>
                  <p>We hire the most proficient scholars which will give you the best writing as per the need of your assignment. We are the best writing service in {countryName} because most of our writers earn their PhD in their respective fields and departments, and have the perfect knowledge and experience that is needed for writing academic papers. Our team always delivers the content on time.</p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Panel Of Expert {adjective} Writers</h3>
                  <p>We have a professional and expert panel of proficient and quality writers based in {countryName}, who are experienced enough to get the assignment done as per the requirements of institutions based in {countryName}. We have a wide range of writers with diversity such as management courses, business courses, media, social sciences, medicine, and engineering.</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-slate-200">
                <div className="text-center">
                  <div className="text-4xl font-black text-blue-700 mb-2">{stats.experts}</div>
                  <div className="text-slate-600 font-bold">Professional Writers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-amber-500 mb-2">{stats.score}</div>
                  <div className="text-slate-600 font-bold">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-emerald-500 mb-2">10k+</div>
                  <div className="text-slate-600 font-bold">Award-Winning Papers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-purple-600 mb-2">350+</div>
                  <div className="text-slate-600 font-bold">Diverse Topics Covered</div>
                </div>
              </div>

              {/* More Info Content */}
              <div className="prose prose-slate max-w-none text-slate-600 font-medium space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Reasons To Choose Our {adjective} Essay Writers Services</h3>
                  <p>We have a unique rating scale available on our website, where our customers can evaluate and rank our team members according to their experiences. Being the best writing service in {countryName}, we only employ native {adjective} writers and researchers, to ensure that no error is made in terms of style, content, and structure.</p>
                </div>

                <div className="bg-slate-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Providing every kind of assignment in {countryName}</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      "A professional essay writer for you any time",
                      "Providing Quality assignments, essay and dissertation writing service",
                      "We keep your private information confidential",
                      `Unique work strategy with our ${adjective} Writings service`,
                      "Our qualified team of writers produces quality essay assignments",
                      "Delivery on time is our main priority",
                      "Premium quality essay help service is available to all students",
                      "Our customer support members are available for support 24/7",
                      "Free perks of Writing Service are revisions, and References",
                      "We have a native English-speaking team"
                    ].map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 text-left">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-lg text-slate-800 text-center font-semibold mt-8">Getting our services will enable you to achieve higher grades and will give a boost to your academic life as well. We have already helped so many students in {countryName} achieve their goals!</p>

                <div className="text-center pt-8">
                   <a href="/order" className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-lg px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-transform">
                     Order Now
                   </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <ComparisonSection />
      <FAQSection />
    </main>
  );
}

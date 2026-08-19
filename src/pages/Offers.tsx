import React from 'react';
import { motion } from 'motion/react';
import { Tag, Zap, Gift, Percent, Clock, ThumbsUp, Medal, Star, Send } from 'lucide-react';
import FAQSection from '../components/FAQSection';

const currentOffers = [
  {
    id: 1,
    title: "New Student Discount",
    discount: "20% OFF",
    code: "WELCOME20",
    desc: "First time using our service? Get an exclusive discount on your very first academic order.",
    icon: <Gift className="text-blue-600" />,
    expiry: "Valid for 30 days from signup"
  },
  {
    id: 2,
    title: "Seasonal Academic Flash Sale",
    discount: "15% OFF",
    code: "TERMSTART",
    desc: "Save more on your dissertation and large coursework projects during the semester start fall.",
    icon: <Zap className="text-blue-500" />,
    expiry: "Expires end of this month"
  },
  {
    id: 3,
    title: "Bulk Order Reward",
    discount: "UP TO 30% OFF",
    code: "BUN5OFF",
    desc: "Ordering more than 3 assignments at once? Contact our support for a bespoke bundle price.",
    icon: <Tag className="text-green-500" />,
    expiry: "Always active"
  }
];

export default function Offers() {
  return (
    <main className="pt-[80px] bg-white font-sans">
      <section className="bg-slate-900 py-20 lg:py-28 px-6 text-white text-center relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12"
          >
            <Percent size={40} strokeWidth={3} />
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tighter uppercase italic">
            Exclusive <span className="text-emerald-500">Offers</span> & Discounts
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-bold mb-12">
            Get world-class academic support at unbeatable prices. Check out our current promotions for international scholars across the globe.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
             <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-bold flex items-center gap-2">
                <Clock size={14} className="text-emerald-500"/> Limited Time Only
             </div>
             <div className="px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-bold flex items-center gap-2">
                <Star size={14} className="text-yellow-400"/> Best Value Guaranteed
             </div>
          </div>
        </div>

        {/* Abstract background lines */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-1/4 left-0 w-full h-[1px] bg-white rotate-6"></div>
           <div className="absolute top-2/4 left-0 w-full h-[1px] bg-white -rotate-3"></div>
           <div className="absolute top-3/4 left-0 w-full h-[1px] bg-white rotate-2"></div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentOffers.map(offer => (
              <motion.div 
                key={offer.id}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[32px] border border-slate-100 shadow-xl relative group overflow-hidden"
              >
                 <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {offer.icon}
                    </div>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 tracking-tighter">{offer.discount}</span>
                 </div>
                 <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{offer.title}</h3>
                 <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed">{offer.desc}</p>
                 
                 <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-between group-hover:border-emerald-500 transition-colors mb-6">
                    <span className="font-mono font-bold text-slate-900 tracking-widest">{offer.code}</span>
                    <button className="text-xs font-black uppercase text-emerald-500 tracking-wider">Copy Code</button>
                 </div>
                 <p className="text-xs text-slate-400 font-bold uppercase mb-8">{offer.expiry}</p>
                 
                 <button className="w-full py-4 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl font-extrabold flex items-center justify-center gap-2 transition-all">
                    Claim Offer Now <Send size={16} />
                 </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Extensive block */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 leading-[1.1]">We Believe in Accessible Quality Education</h2>
              <div className="prose prose-slate max-w-none text-slate-600 space-y-6 font-medium text-lg leading-relaxed">
                 <p>
                   At boffinglobalgroup.com, we understand that being an international student often involves significant financial commitment. The cost of tuition, housing, and travel can leave very little room for additional support. However, we also know that the academic stakes have never been higher. That's why we create "Exclusive Offers" and semester-based discounts to help make our premium assignment writing services more accessible.
                 </p>
                 <p>
                   Our "Discount Codes" apply to some of our most popular services, including Homework Help, Dissertation Writing, and Professional Proofreading. Whether you're in the United Kingdom, United States, Australia, or Canada, you can take advantage of our regional price adjustments. Our goal is to ensure that no student is held back from reaching their full potential due to financial constraints.
                 </p>
                 <p>
                   Beyond these direct discounts, we offer a "Value Guarantee." Every order placed at boffinglobalgroup.com includes free revisions, a free title page, a free bibliography, and a complementary plagiarism report. This adds up to over $50 in savings on every single order. When you invest in our help, you're investing in a partnership aimed at your lifelong academic and professional success.
                 </p>
              </div>
           </div>
           <div className="relative">
             <div className="bg-[#f0e6d2] p-12 rounded-[64px] relative z-10 border border-slate-100">
                <div className="grid grid-cols-2 gap-8">
                   <div className="text-center">
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-2 tracking-tighter">10k+</div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Offers Claimed</p>
                   </div>
                   <div className="text-center">
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-2 tracking-tighter">4.9/5</div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Student Rating</p>
                   </div>
                   <div className="text-center">
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-2 tracking-tighter">$1M+</div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Student Savings</p>
                   </div>
                   <div className="text-center">
                      <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-2 tracking-tighter">24/7</div>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Live Support</p>
                   </div>
                </div>
                <div className="mt-12 p-8 bg-white/50 backdrop-blur rounded-3xl border border-white/40">
                   <h4 className="font-bold text-slate-800 mb-4 text-center">Join Our Newsletter for Secret Deals</h4>
                   <div className="flex gap-2">
                      <input type="email" placeholder="student@email.com" className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm outline-none" />
                      <button className="px-6 py-3 bg-gradient-to-br from-blue-700 to-emerald-800 text-white rounded-xl font-bold text-sm">Join</button>
                   </div>
                </div>
             </div>
             {/* Decorative circles */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl -z-0"></div>
             <div className="absolute bottom-10 -left-10 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -z-0"></div>
           </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

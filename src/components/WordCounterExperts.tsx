import React from 'react';
import { Star, Clock, MessageSquare } from 'lucide-react';

const experts = [
  {
    name: 'John Perna',
    title: 'PhD in Economics',
    quote: '"I am a guest lecturer doubling as a writer for 2+ years. Hire me for unique content without writing mistakes"',
    orders: 169,
    reviews: 118,
    rating: 5,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    name: 'Charlie Martin',
    title: 'PhD in Literature',
    quote: '"I\'ve been offering assistance for 11+ years. I\'ve helped many with perfect solutions maintaining average word length"',
    orders: 2576,
    reviews: 1030,
    rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    name: 'Milton Blaha',
    title: 'MSc in Healthcare',
    quote: '"I\'m a consultant in a renowned hospital. I help students deliver unique papers by doing spelling and grammar check"',
    orders: 154,
    reviews: 108,
    rating: 5,
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
  },
  {
    name: 'Henry Alessi',
    title: 'MBA in Marketing',
    quote: '"I pursued an MBA in Marketing. Hire me to know how many words or paragraphs can be fitted on a page."',
    orders: 288,
    reviews: 202,
    rating: 5,
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
  }
];

export default function WordCounterExperts() {
  return (
    <section className="py-10 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Expert Cards Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6 order-2 lg:order-1">
            {experts.map((expert, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <img src={expert.img} alt={expert.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{expert.name}</h4>
                    <p className="text-slate-500 text-xs font-medium">{expert.title}</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(expert.rating)].map((_, i) => (
                        <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 text-xs italic leading-relaxed mb-6 flex-grow">
                  {expert.quote}
                </p>
                
                <div className="pt-4 border-t border-slate-50 flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-tighter">
                  <div className="flex items-center gap-1">
                     <Clock size={12} className="text-slate-300" /> {expert.orders} Completed Orders
                  </div>
                  <div className="flex items-center gap-1">
                     <MessageSquare size={12} className="text-slate-300" /> {expert.reviews} Student Reviews
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/3 order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8 leading-[1.1]">
              Meet Our Experts Team Who Unleash Creativity
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-10">
              Writing any paper within a specified word limit is no walk in the park. While you can always use our online word counter and character count tool, you can also reach out to our proficient stalwarts. Our experts possess the unique skill of meeting and excelling within word limits. We take pride in delivering articles that encapsulate the essence of a subject matter without any words or syllables wasted. With us, you'll experience the art of conveying comprehensive thoughts with precision in different ways and leave a long-lasting impression, all within limited pages.
            </p>
            <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1 active:scale-95 text-lg inline-block">
              Avail Our Assistance
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

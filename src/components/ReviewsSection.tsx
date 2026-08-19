import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import mahLogo from '../assets/trusted-logos/mah-logo.png';
import sitejabberLogo from '../assets/trusted-logos/sitejabber-logo.png';
import reviewsIoLogo from '../assets/trusted-logos/reviews-io-logo.png';

const reviewsData = {
  'Boffin Global Services Online Reviews': [
    { name: 'John Doe', subject: 'Python Programming', text: 'Great expert, took time to explain details in simple terms. I will recommend him. Debugged my machine learning model perfectly.', date: '07 Sep 2025', info: 'Advanced Level', deadline: '5 days' },
    { name: 'Jane Smith', subject: 'SPSS Analysis', text: 'Data analysis was fast and professional. The statistical tests were accurate and the output was well-documented. Thank you.', date: '05 Sep 2025', info: 'Data Analysis', deadline: '5 days' },
    { name: 'Mike Johnson', subject: 'MATLAB Simulation', text: 'Followed my complex simulation parameters exactly and finished quickly. Thank you for your hard work and time.', date: '03 Sep 2025', info: 'Engineering', deadline: '4 days' },
    { name: 'Sarah Brown', subject: 'Computer Science', text: 'Excellent coding skills, provided clear comments and met all requirements perfectly. Very satisfied with the outcome.', date: '01 Sep 2025', info: 'Application Dev', deadline: '3 days' },
    { name: 'Tom Wilson', subject: 'AutoCAD Design', text: 'Well-structured, perfectly aligned with the architectural prompt, and submitted ahead of time.', date: '28 Aug 2025', info: '3D Modeling', deadline: '2 days' },
    { name: 'Emily Davis', subject: 'R Programming', text: 'Clear step-by-step explanations, helpful for understanding complex statistical concepts.', date: '25 Aug 2025', info: 'Statistics', deadline: '5 days' },
    { name: 'Chris Evans', subject: 'Mechanical Engineering', text: 'Accurate technical implementation, highly professional CAD work.', date: '22 Aug 2025', info: 'SolidWorks', deadline: '4 days' },
    { name: 'Anna Lee', subject: 'Database Design', text: 'Insightful SQL queries, beautifully written schema, thoroughly enjoyed the explanation session.', date: '20 Aug 2025', info: 'SQL Data', deadline: '3 days' },
    { name: 'David Kim', subject: 'Software Architecture', text: 'Great structure, very detailed system design diagrams, met all requirements.', date: '18 Aug 2025', info: 'UML / Design', deadline: '2 days' }
  ],
  'Sitejabber': [
    { name: 'Alice Brown', subject: 'Java Programming', text: 'Excellent service, saved my grade! Very professional and knowledgeable with object-oriented concepts.', date: '01 Sep 2025', info: 'Backend Logic', deadline: '7 days' },
    { name: 'Bob White', subject: 'Business Analytics', text: 'Very impressed with the quality and depth of the Tableau dashboard provided. Will definitely use again.', date: '29 Aug 2025', info: 'Data Viz', deadline: '6 days' },
    { name: 'Charlie Davis', subject: 'C++ Development', text: 'Fast, reliable, and exceeded my expectations on the memory management assignment.', date: '25 Aug 2025', info: 'Systems Prog', deadline: '3 days' },
    { name: 'Diana Evans', subject: 'Biostatistics', text: 'Great framework and referencing. Helped me understand complex SPSS outputs better.', date: '20 Aug 2025', info: 'SPSS', deadline: '4 days' },
    { name: 'Edward F.', subject: 'Revit Architecture', text: 'Fantastic results, very pleased with the communication and structural details.', date: '15 Aug 2025', info: 'BIM Design', deadline: '5 days' },
    { name: 'Fiona G.', subject: 'Data Structures', text: 'Thorough, insightful algorithm analysis, and met all my specific requirements.', date: '10 Aug 2025', info: 'Algorithms', deadline: '2 days' },
    { name: 'George H.', subject: 'Web Development', text: 'React app problem solved efficiently, very happy with the component structure.', date: '05 Aug 2025', info: 'Frontend React', deadline: '6 days' },
    { name: 'Hannah I.', subject: 'Econometrics', text: 'Professional approach to a challenging Stata dataset, much appreciated.', date: '01 Aug 2025', info: 'Stata Analysis', deadline: '4 days' }
  ],
  'Reviews.io': [
    { name: 'Eve Evans', subject: 'Electrical Engineering', text: 'Top notch support. The circuit simulation provided was technically accurate and well-explained.', date: '20 Aug 2025', info: 'Simulations', deadline: '5 days' },
    { name: 'Frank Frank', subject: 'Cybersecurity', text: 'Did exactly what I asked. The network analysis report was error-free and very easy to follow.', date: '15 Aug 2025', info: 'Security Audit', deadline: '4 days' },
    { name: 'Grace Green', subject: 'Machine Learning', text: 'Highly recommend them. They handled a difficult deep learning topic with great care and accuracy.', date: '10 Aug 2025', info: 'Python / AI', deadline: '3 days' },
    { name: 'Henry Hill', subject: 'Physics', text: 'Solved complicated MATLAB equations efficiently. The quality of logic is outstanding.', date: '05 Aug 2025', info: 'MATLAB', deadline: '2 days' },
    { name: 'Ivy K.', subject: 'Discrete Math', text: 'Perfect execution of proofs, very helpful explanations, highly recommend.', date: '30 Jul 2025', info: 'Proof Logic', deadline: '5 days' },
    { name: 'Jack L.', subject: 'Financial Modeling', text: 'Great insight into the Excel VBA macros, high standard of code quality.', date: '25 Jul 2025', info: 'Excel VBA', deadline: '6 days' }
  ]
};

export default function ReviewsSection() {
  const [activeTab, setActiveTab] = useState('Boffin Global Services Online Reviews');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
      checkScroll();
    }
  }, [activeTab]);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = current.offsetWidth * 0.8;
      current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-0 pb-10 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-extrabold text-center text-slate-900 tracking-tight leading-[1.10] w-full mb-4">
          Student Reviews
        </h2>
        <p className="text-base lg:text-lg text-slate-600 text-center max-w-7xl mx-auto leading-[1.8] mb-8">
          Find out why thousands of students rely on our technical expertise for complex software and coding challenges.
        </p>
        
        <div className="flex justify-center gap-4 mb-8">
          {Object.keys(reviewsData).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-4 rounded-lg border font-bold flex items-center justify-center transition-all ${activeTab === tab ? 'bg-white border-blue-600 shadow-md text-blue-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}
            >
              {tab === 'Boffin Global Services Online Reviews' ? (
                <span className="text-sm">Boffin Global Services Online Reviews</span>
              ) : tab === 'Sitejabber' ? (
                <img src={sitejabberLogo} alt="Sitejabber Logo" className="h-8" referrerPolicy="no-referrer" />
              ) : tab === 'Reviews.io' ? (
                <img src={reviewsIoLogo} alt="Reviews.io Logo" className="h-10" referrerPolicy="no-referrer" />
              ) : tab}
            </button>
          ))}
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div ref={scrollRef} onScroll={checkScroll} className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {reviewsData[activeTab as keyof typeof reviewsData].map((review, index) => (
              <div key={`${activeTab}-${index}`} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col flex-shrink-0 w-[300px] md:w-[350px] snap-center">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={`star-${index}-${i}`} size={18} fill="currentColor" />)}
                </div>
                <h4 className="font-bold text-lg mb-1">{review.subject}</h4>
                <p className="text-xs text-slate-500 mb-3">{`${review.info}, Deadline: ${review.deadline}`}</p>
                <p className="text-slate-600 text-sm mb-4 flex-grow leading-relaxed">{review.text}</p>
                <p className="text-xs font-semibold text-slate-400 mt-auto">{review.date}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-6 mt-4">
            <button 
              onClick={() => scroll('left')} 
              className={`p-3 rounded-full transition-colors ${canScrollLeft ? 'bg-gray-400 text-gray-900 hover:bg-gray-500' : 'bg-gray-100 text-gray-400'}`}
              disabled={!canScrollLeft}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')} 
              className={`p-3 rounded-full transition-colors ${canScrollRight ? 'bg-gray-400 text-gray-900 hover:bg-gray-500' : 'bg-gray-100 text-gray-400'}`}
              disabled={!canScrollRight}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

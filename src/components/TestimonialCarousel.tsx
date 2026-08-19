import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Quote, 
  GraduationCap, 
  Play, 
  Pause, 
  Sparkles,
  ThumbsUp,
  FileCheck
} from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  university: string;
  location: string;
  degree: string;
  serviceCategory: 'essays' | 'spss' | 'coding' | 'business';
  categoryLabel: string;
  paperTitle: string;
  gradeAchieved: string;
  rating: number;
  orderId: string;
  similarityScore: string;
  assignedWriter: string;
  comment: string;
  date: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Emily Richardson',
    university: 'King\'s College London',
    location: 'United Kingdom',
    degree: 'MSc Data Science & Analytics',
    serviceCategory: 'spss',
    categoryLabel: 'SPSS & Data Analysis',
    paperTitle: 'Multivariate Regression Analysis on Healthcare Outcome Metrics',
    gradeAchieved: 'Distinction (89%)',
    rating: 5,
    orderId: 'UK-94281',
    similarityScore: '0% Plagiarism',
    assignedWriter: 'Dr. Aris Vance (PhD Statistics)',
    comment: 'I was completely lost with my SPSS output and linear regression models for my master\'s thesis. Boffin Global Group matched me with a statistician who not only completed the calculations flawlessly but provided step-by-step interpretation guides. Passed with distinction!',
    date: '2 days ago',
  },
  {
    id: '2',
    name: 'Marcus Kensington',
    university: 'New York University (NYU)',
    location: 'United States',
    degree: 'MBA Financial Management',
    serviceCategory: 'business',
    categoryLabel: 'Business & Finance',
    paperTitle: 'Corporate Valuation & DCF Financial Modeling for Tech Acquisitions',
    gradeAchieved: 'Grade A (96%)',
    rating: 5,
    orderId: 'US-88120',
    similarityScore: '0% Plagiarism',
    assignedWriter: 'Prof. Robert Harrison (CFA, PhD Finance)',
    comment: 'Outstanding financial model and accompanying executive report! The Excel spreadsheet was fully dynamic with clear sensitivity tables. Delivered 18 hours before my strict university deadline with a clean Turnitin report.',
    date: '3 days ago',
  },
  {
    id: '3',
    name: 'Sophia Laurent',
    university: 'University of Melbourne',
    location: 'Australia',
    degree: 'LLM International Law',
    serviceCategory: 'essays',
    categoryLabel: 'Essays & Literature Reviews',
    paperTitle: 'Comparative Analysis of Cross-Border Intellectual Property Enforcement',
    gradeAchieved: 'High Distinction (87%)',
    rating: 5,
    orderId: 'AU-71209',
    similarityScore: '0% Plagiarism',
    assignedWriter: 'Dr. Eleanor Wright (Oxford Law Alum)',
    comment: 'The depth of OSCOLA citations and academic rigor in my law paper was exceptional. The writer incorporated primary treaty sources and landmark cases effortlessly. Worth every single cent for international students!',
    date: '5 days ago',
  },
  {
    id: '4',
    name: 'David Park',
    university: 'Technical University of Munich',
    location: 'Germany',
    degree: 'BSc Computer Science',
    serviceCategory: 'coding',
    categoryLabel: 'Programming & Engineering',
    paperTitle: 'Distributed Systems Microservices in Go & Docker Containerization',
    gradeAchieved: 'Grade 1.0 (Top 1%)',
    rating: 5,
    orderId: 'EU-63912',
    similarityScore: '0% Plagiarism',
    assignedWriter: 'Eng. Alex Mercer (Senior Software Architect)',
    comment: 'My Go assignment included complex concurrency and REST APIs. Not only was the code bug-free and clean, but the accompanying technical documentation explained every function line-by-line so I aced my viva presentation!',
    date: '1 week ago',
  },
  {
    id: '5',
    name: 'Amina Khan',
    university: 'United Arab Emirates University (UAEU)',
    location: 'United Arab Emirates',
    degree: 'MSc Public Health & Epidemiology',
    serviceCategory: 'spss',
    categoryLabel: 'SPSS & Data Analysis',
    paperTitle: 'Epidemiological Trend Analysis of Diabetes Prevalence using RStudio',
    gradeAchieved: 'A Grade (94%)',
    rating: 5,
    orderId: 'AE-55104',
    similarityScore: '0% Plagiarism',
    assignedWriter: 'Dr. Sarah Mitchell (PhD Biostatistics)',
    comment: 'Amazing experience! The communication was instant on WhatsApp, and Dr. Sarah formatted my R code and ANOVA tables exactly to my university guidelines. I received the Turnitin report showing 0% AI and 0% similarity.',
    date: '1 week ago',
  },
  {
    id: '6',
    name: 'James Campbell',
    university: 'University of Edinburgh',
    location: 'United Kingdom',
    degree: 'MA History & Political Thought',
    serviceCategory: 'essays',
    categoryLabel: 'Essays & Literature Reviews',
    paperTitle: 'Historiographical Review of Post-War Reconstruction in Western Europe',
    gradeAchieved: 'First-Class Honors (82%)',
    rating: 5,
    orderId: 'UK-39210',
    similarityScore: '0% Plagiarism',
    assignedWriter: 'Dr. Thomas Bennett (PhD Modern History)',
    comment: 'I requested a 4,000-word critical literature review with a 48-hour turnaround. They met the deadline with hours to spare, and the prose was eloquent, well-structured, and rich with primary archive references.',
    date: '2 weeks ago',
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Reviews' },
  { id: 'essays', label: 'Essays & Dissertations' },
  { id: 'spss', label: 'SPSS & Statistics' },
  { id: 'coding', label: 'Coding & Engineering' },
  { id: 'business', label: 'Business & Finance' },
];

export default function TestimonialCarousel() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState<number>(1); // 1 = next, -1 = prev
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredTestimonials = selectedCategory === 'all'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.serviceCategory === selectedCategory);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Handle Carousel Timer
  useEffect(() => {
    if (isAutoPlaying && filteredTestimonials.length > 1) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isAutoPlaying, filteredTestimonials.length]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);
  };

  const currentTestimonial = filteredTestimonials[currentIndex] || TESTIMONIALS[0];

  // Motion variants for smooth slide transition
  const slideVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.35,
        ease: [0.7, 0, 0.84, 0]
      }
    })
  };

  return (
    <section className="py-16 sm:py-20 bg-slate-100/80 text-slate-900 relative overflow-hidden border-b border-slate-200">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-sm">
            <Sparkles size={14} className="text-amber-600" />
            <span>Verified Student Reviews & Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Trusted by Students Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-emerald-600">250+ Top Universities</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real feedback from international scholars who achieved top grades using Boffin Global Group's assignment writing services and technical assistance.
          </p>

          {/* Rating Badges Strip */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-xl shadow-xs">
              <span className="text-amber-500 font-extrabold">★ 4.96/5</span>
              <span className="text-slate-500">Average Rating</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-xl shadow-xs">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>100% Verified Customer Purchases</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-slate-200/90 px-3.5 py-1.5 rounded-xl shadow-xs">
              <FileCheck size={14} className="text-teal-600" />
              <span>0% Plagiarism Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Card View */}
          <div className="relative min-h-[420px] sm:min-h-[360px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentTestimonial.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200/50 relative space-y-6"
              >
                {/* Decorative Quote Icon Background */}
                <Quote className="absolute top-6 right-6 text-slate-200/60 w-20 h-20 pointer-events-none" />

                {/* Top Row: Category + Verified Badge + Grade */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-900 border border-amber-300/80 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-lg">
                      {currentTestimonial.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[11px] px-2.5 py-1 rounded-lg">
                      <CheckCircle2 size={12} className="text-emerald-600" />
                      Verified Order #{currentTestimonial.orderId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="bg-teal-50 text-teal-800 border border-teal-200 font-black text-xs px-3 py-1 rounded-lg flex items-center gap-1">
                      <Award size={14} className="text-teal-600" />
                      Grade: {currentTestimonial.gradeAchieved}
                    </span>
                  </div>
                </div>

                {/* Paper Topic */}
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Assigned Topic / Task</p>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                    "{currentTestimonial.paperTitle}"
                  </h3>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic relative z-10">
                  "{currentTestimonial.comment}"
                </p>

                {/* Bottom Row: Student Profile & Stars */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Student Info */}
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">{currentTestimonial.name}</h4>
                        <span className="text-xs text-slate-500 font-medium">({currentTestimonial.location})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium mt-0.5">
                        <GraduationCap size={14} className="text-amber-600" />
                        <span>{currentTestimonial.university} — {currentTestimonial.degree}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating & Writer */}
                  <div className="sm:text-right space-y-1">
                    <div className="flex items-center sm:justify-end gap-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-bold text-slate-800 ml-1">5.0 / 5.0</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Assigned to: <strong className="text-slate-800">{currentTestimonial.assignedWriter}</strong>
                    </p>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between gap-4">
            
            {/* Auto Play Toggle */}
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-xs cursor-pointer"
              title={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause size={14} className="text-amber-600" />
                  <span>Autoplay Active</span>
                </>
              ) : (
                <>
                  <Play size={14} className="text-emerald-600" />
                  <span>Autoplay Paused</span>
                </>
              )}
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-amber-500'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-11 h-11 rounded-xl bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center border border-slate-200 transition-all shadow-sm cursor-pointer hover:border-amber-400"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="w-11 h-11 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center transition-all shadow-md shadow-amber-500/20 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

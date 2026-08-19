import React, { useState, useRef, useEffect } from 'react';
import { Search, PenTool, BookOpen, GraduationCap, LampDesk, Keyboard, ShieldCheck, RotateCw, FileEdit, ChevronDown, ChevronUp, ArrowRight, MousePointer2, Filter, Eye, FileDown, X, Home, FileSearch } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams, Link } from 'react-router-dom';
import FAQSection from '../components/FAQSection';
import SampleSidebar from '../components/SampleSidebar';
import educationImg from '../assets/trusted-logos/education.png';
import { essaySamples, EssaySample } from '../data/samples';

const subjects = [
  {
    name: 'History',
    topics: [
      "Ancient Civilizations' Trade Routes",
      'Impact of World Wars on Society',
      'Renaissance Art and Culture',
      'The Industrial Revolution',
      "Women's Suffrage Movements"
    ]
  },
  {
    name: 'Science',
    topics: [
      'Quantum Physics and its Paradoxes',
      'CRISPR Technology and Genetic Engineering',
      'Space Exploration and Colonisation',
      'Artificial Intelligence in Healthcare',
      'Climate Change and Environmental Science'
    ]
  },
  {
    name: 'Literature',
    topics: [
      'Dystopian Fiction: Exploring Alternate Realities',
      'Shakespearean Tragedies: Themes and Influences',
      'Magical Realism in Latin American Literature',
      'Modern Science Fiction: Themes and Trends',
      'Contemporary Women Writers: Breaking Stereotypes'
    ]
  },
  {
    name: 'Mathematics',
    topics: [
      'The Beauty of Fractals',
      'Applications of Game Theory',
      'History of Number Systems',
      'Cryptography and Number Theory',
      'Chaos Theory in Mathematics'
    ]
  },
  {
    name: 'Psychology',
    topics: [
      'Cognitive Biases and Decision Making',
      'The Impact of Social Media on Mental Health',
      'Freudian Psychoanalysis: Concepts and Critiques',
      'Positive Psychology: The Science of Happiness',
      'Cross-Cultural Psychology'
    ]
  },
  {
    name: 'Computer Science',
    topics: [
      'Quantum Computing: Future Possibilities',
      'Cyber Security Threats and Solutions',
      'Augmented Reality and Virtual Reality',
      'Ethics in Artificial Intelligence',
      'History and Evolution of Programming Languages'
    ]
  },
  {
    name: 'Philosophy',
    topics: [
      'Existentialism: Freedom and Responsibility',
      'Ethical Dilemmas in Bioethics',
      'Eastern Philosophy: Zen Buddhism and Taoism',
      'Political Philosophy: Concepts of Justice',
      'Philosophy of Mind: Consciousness and Identity'
    ]
  },
  {
    name: 'Economics',
    topics: [
      'Globalization and Its Effects on Economies',
      'Behavioral Economics: Understanding Human Behavior',
      'Economic Inequality and Redistribution',
      'Sustainable Development and Economics',
      'The History of Economic Thought'
    ]
  },
  {
    name: 'Sociology',
    topics: [
      'Social Movements: Causes and Impacts',
      'Sociology of Deviance: Breaking Social Norms',
      'Globalization and Cultural Diversity',
      'Family Structures and Dynamics',
      'Urbanization: Challenges and Opportunities'
    ]
  },
  {
    name: 'Art',
    topics: [
      'Impressionism: Capturing Light and Atmosphere',
      'Street Art and Graffiti as a Form of Expression',
      'Bauhaus Movement: Design and Architecture',
      'Photography as Art: Evolution and Impact',
      'Contemporary Art: Exploring New Mediums'
    ]
  }
];

const faqItems = [
  "Can online essay samples be customized for specific requirements?",
  "Are there risks associated with relying too heavily on online essay samples?",
  "How can students avoid the misuse of online assignment samples?",
  "Are there any ethical concerns regarding the use of online essay samples?",
  "What are online essay samples, and how can they benefit students?",
  "Are online essay samples considered plagiarism if used as a reference?",
  "Where can students find reliable online essay samples?",
  "How can online essay samples help improve writing skills?"
];

export default function Samples() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTop = useRef(0);

  const [searchParams] = useSearchParams();

  // Sample Gallery State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedSample, setSelectedSample] = useState<EssaySample | null>(null);

  useEffect(() => {
    const subjectParam = searchParams.get('subject');
    const qParam = searchParams.get('q');
    
    if (subjectParam) {
      const formattedSubject = subjectParam.charAt(0) + subjectParam.slice(1).toLowerCase();
      // Try to find if it exists in our list
      if (subjectsList.includes(formattedSubject)) {
        setSelectedSubject(formattedSubject);
      } else {
        // Higher case check
        const exactMatch = subjectsList.find(s => s.toLowerCase() === subjectParam.toLowerCase());
        if (exactMatch) setSelectedSubject(exactMatch);
      }
    }

    if (qParam) {
      setHeroSearchInput(qParam);
      setSearchedTerm(qParam);
      setIsShowingResults(true);
    }
  }, [searchParams]);

  const subjectsList = ['All', ...Array.from(new Set(essaySamples.map(s => s.subject)))];

  // Search State
  const [heroSearchInput, setHeroSearchInput] = useState('');
  const [isShowingResults, setIsShowingResults] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState('');

  const executeSearch = (term?: string) => {
    const finalTerm = term || heroSearchInput;
    if (finalTerm.trim()) {
      setSearchedTerm(finalTerm);
      setIsShowingResults(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const resetSearch = () => {
    setIsShowingResults(false);
    setSearchedTerm('');
    setHeroSearchInput('');
  };

  const filteredSamples = essaySamples.filter(sample => {
    const term = searchedTerm || searchQuery;
    const matchesSearch = sample.title.toLowerCase().includes(term.toLowerCase()) || 
                         sample.subject.toLowerCase().includes(term.toLowerCase()) ||
                         sample.course.toLowerCase().includes(term.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || sample.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const scrollUp = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: -300, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: 300, behavior: 'smooth' });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop > lastScrollTop.current) {
      setScrollDir('down');
    } else if (scrollTop < lastScrollTop.current) {
      setScrollDir('up');
    }
    lastScrollTop.current = scrollTop;

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setScrollDir(null);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <main className="pt-[80px] bg-white min-h-screen font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!isShowingResults ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Section 1: Hero */}
            <section className="bg-[#f8f9fc] py-16 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
              <div className="max-w-[1200px] mx-auto text-center relative z-10">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
                >
                  <span className="text-emerald-500">Essay Examples</span> <span className="text-slate-800">Crafted by</span> <span className="text-blue-700">Our Experts</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg md:text-xl text-slate-600 font-medium mb-12 max-w-2xl mx-auto"
                >
                  Draw inspiration about any topic from our archive of 10K+ premium essays.
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative max-w-4xl mx-auto"
                >
                  <div className="bg-white rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-2 flex flex-col sm:flex-row items-center gap-2 border border-slate-100">
                    <div className="flex-1 w-full relative">
                      <input 
                        type="text" 
                        placeholder="I am searching for.."
                        value={heroSearchInput}
                        onChange={(e) => setHeroSearchInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && executeSearch()}
                        className="w-full bg-transparent py-4 pl-8 pr-6 rounded-lg text-slate-800 font-medium focus:outline-none placeholder:text-slate-400 text-sm sm:text-base"
                      />
                    </div>
                    <button 
                      onClick={() => executeSearch()}
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white px-12 py-3.5 rounded font-bold transition-all shadow-md shadow-emerald-500/10 uppercase text-sm tracking-wide"
                    >
                      Search
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Floating background elements */}
              <div className="absolute top-1/4 left-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-blue-700/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </section>
            
            {/* Section 2: Global Academic Help Services */}
            <section className="py-20 px-4 sm:px-6 bg-white">
              <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-4">
                    World-Class Academic Assistance for Global Students
                  </h2>
                  <p className="text-slate-500 font-medium">Supporting scholars across Asia, Europe, Australia, and the Americas.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-16 max-w-7xl mx-auto px-4">
                  {[
                    { title: 'Global Essay Help', icon: <PenTool />, desc: 'Expert assistance with all genres – from US-style critical analysis to European reflective papers.' },
                    { title: 'Coursework Help', icon: <BookOpen />, desc: 'Strategic aid for year-end assignments and coursework, tailored to Asian and Australian standards.' },
                    { title: 'Dissertation & Thesis', icon: <GraduationCap />, desc: 'Professional guidance for PhD dissertations and Master’s theses adhering to OSCOLA, Harvard, or APA styles.' },
                    { title: 'Research Proposals', icon: <LampDesk />, desc: 'Refine your research methodology and proposals to meet the rigorous standards of global universities.' },
                    { title: 'International Editing', icon: <Keyboard />, desc: 'Polishing your work for clarity and native-level fluency, regardless of your region or primary language.' },
                    { title: 'Plagiarism Checker', icon: <ShieldCheck />, desc: 'Global-standard integrity checks to ensure your academic papers are 100% original and citation-accurate.' },
                    { title: 'Formatting Expert', icon: <RotateCw />, desc: 'Precise formatting in APA 7th, MLA 9th, Chicago, Vancouver, and OSCOLA for international law and medicine.' },
                    { title: 'Academic Coaching', icon: <FileEdit />, desc: 'One-on-one sessions with subject matter experts to help you master complex topics in any discipline.' },
                  ].map((service, idx) => (
                    <motion.div 
                      key={idx}
                      className="relative bg-white p-8 pt-10 rounded-xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all flex flex-col items-center text-center group"
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#333333] rounded-full flex items-center justify-center text-white shadow-md group-hover:bg-emerald-500 transition-colors">
                        {React.cloneElement(service.icon as React.ReactElement, { size: "24" } as any)}
                      </div>
                      <h3 className="text-lg font-bold text-[#333333] mb-3 w-full">{service.title}</h3>
                      <p className="text-sm text-[#666666] leading-relaxed mb-4 flex-grow">{service.desc}</p>
                      <button className="text-emerald-500 font-bold text-sm mt-auto">Learn More</button>
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Link to="/order" className="inline-block bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white px-10 py-3 rounded font-bold uppercase transition-all shadow-lg shadow-emerald-500/20">
                    Order Now
                  </Link>
                </div>
              </div>
            </section>

            {/* Section 3: Disciplines Banner */}
            <section className="py-20 px-4 sm:px-6 bg-white">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-5xl font-extrabold text-slate-800 leading-tight">
                    Essay Samples across ALL Disciplines
                  </h2>
                </div>

                <div className="w-full bg-[#eef5ff] rounded-[2rem] py-10 px-8 md:py-16 md:px-16 border border-blue-100/50 shadow-inner flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
                  {/* Decorative shapes */}
                  <div className="absolute -top-12 -right-12 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-white/40 rounded-full blur-3xl"></div>

                  <div className="w-full md:w-[35%] flex justify-center relative">
                    <div className="relative z-10">
                      <img 
                        src={educationImg} 
                        alt="Education Resources" 
                        className="w-full h-auto drop-shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {/* Glow under image */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-blue-300/20 filter blur-2xl rounded-full"></div>
                  </div>

                  <div className="w-full md:w-[65%] text-center md:text-left relative z-10">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-6 leading-tight">
                      Explore Our Vast Archive of Samples
                    </h3>
                    <p className="text-lg md:text-xl text-[#2a3a5a] font-medium mb-12 opacity-80 max-w-2xl">
                      Get access to essay examples across 100+ topics and sub-topics!
                    </p>
                    <Link to="/order" className="inline-block bg-gradient-to-br from-blue-700 to-emerald-800 text-white px-12 py-5 rounded-xl font-extrabold uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/30 active:scale-95 transform hover:-translate-y-1">
                      Order Now
                    </Link>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 text-slate-300 flex flex-col items-center gap-1 animate-bounce opacity-40">
                    <span className="text-xs font-bold uppercase tracking-widest">scroll</span>
                    <ChevronDown size={14} />
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Consolidated Content Section - Contained by orange lines as per image */}
            <section className="pt-16 pb-0 px-6 bg-white">
              <div className="max-w-[1400px] mx-auto">
                <div className="border-y-2 border-emerald-500 py-8 px-4 md:px-8 relative h-auto md:h-[500px] lg:h-[450px] overflow-hidden">
                  
                  <div 
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full h-full overflow-y-auto custom-scrollbar pr-0 md:pr-18"
                  >
                    
                    {/* Left Column: Knowledge & Repository (Exactly as image) */}
                    <div className="flex-1 w-full lg:w-1/2 space-y-8">
                      {/* 1. Use our Samples to score Straight As (Long sentences first) */}
                      <div className="bg-white rounded-lg border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-tight uppercase">
                          Use our Samples to score Straight As
                        </h2>
                        <div className="text-sm text-slate-600 font-medium leading-[1.8] space-y-4">
                          <p>
                            Students can use sample assignments effectively to improve their grades. Follow this strategic approach to use our materials to get the highest grades –
                          </p>
                          <p>
                            Firstly, review the materials thoroughly. With our help, students get free access to the best essay examples. Students can refer to these high-quality references to understand the expected structure and format for their papers. This enables students to organize their ideas coherently, making their work more comprehensible to instructors.
                          </p>
                          <p>
                            Additionally, analyzing old reference materials help students grasp the tone and style appropriate for academic writing. This ensures that their own work aligns with the expected standards. By identifying a good sample assignment, students can incorporate similar language and vocabulary into their writing. This demonstrates a deeper understanding of the subject matter.
                          </p>
                          <p>
                            Furthermore, an essay sample can serve as a valuable resource for mastering citation styles. Proper referencing is crucial in academic writing. Studying well-cited free essay assignments assists students in correctly citing sources. Thus, students can easily avoid plagiarism, which bolsters the credibility of their work.
                          </p>
                          <p>
                            Learning from old references also enables students to recognize common mistakes. With our essay help, they get free references and guidance. They understand where others have faltered and can pre-emptively address such potential pitfalls in their own papers.
                          </p>
                          <p>
                            Lastly, using an essay sample can act as a benchmark for research and analysis. Students can critically evaluate how evidence is presented in an old college assignment sample. They can check how the arguments are constructed in university essay assignment samples and refine their analytical skills. 
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-tight">Find Help with All Subjects with Our Essay Sample</h2>
                        <p className="text-sm text-slate-600 font-medium mb-8">
                          We also cover all the major subjects and more. So, when you hire us, you get free references of these subjects –
                        </p>
                        <div className="space-y-1">
                          {subjects.map((subj, idx) => (
                            <div key={idx} className="mb-8">
                              <h3 className="text-sm font-bold text-slate-900 mb-3">{subj.name}</h3>
                              <ul className="space-y-2">
                                {subj.topics.map((topic, tIdx) => (
                                  <li key={tIdx} className="text-sm text-slate-600 font-medium hover:text-emerald-500 cursor-pointer flex items-start gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 group-hover:bg-emerald-500"></span>
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-slate-600 font-medium mt-8 italic">
                          Apart from them, you can log on to MyAssignmenthelp.com and unlock free references of various other subjects.
                        </p>
                      </div>
                    </div>

                    {/* Middle divider for desktop */}
                    <div className="hidden lg:block w-[1px] bg-slate-200 shrink-0 self-stretch min-h-max"></div>

                    {/* Right Column: Knowledge & QA (Exactly as image) */}
                    <div className="flex-1 w-full lg:w-1/2 space-y-8">
                      
                      {/* 1. Can I Get Essay and Assignment Help for Free? (Long sentences first) */}
                      <div className="bg-white rounded-lg border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-tight uppercase">
                          Can I Get Essay and Assignment Help for Free?
                        </h2>
                        <div className="text-sm text-slate-600 font-medium leading-[1.8] space-y-4">
                          <p>
                            Most students live on a shoestring budget. Hence, it is common for them to look for sites that provide free essay assignments. There are various sites, that claims to provide online essays for students at free of cost. However, we never make such claims. Instead, we focus on delivering the best references.
                          </p>
                          <p>
                            We do get many requests from students asking, "Can you help me with the assignment for free?” As much as we regret not being able to help you with paper writing for free, you can certainly get the materials at no extra cost. We have an entire online library that students can use whenever needed.
                          </p>
                          <p>
                            Students simply need to hire our writers. Once they have availed of their services, they become eligible for a host of other benefits. From college assignment samples to university essay assignment samples, students can access all kinds of resources from our collection.
                          </p>
                        </div>
                      </div>

                      {/* FEATURED: Live Samples Browser */}
                      <div className="bg-[#f8faff] rounded-2xl border border-blue-100 p-8 shadow-sm text-left">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                          <div>
                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-2 text-left">Live Sample Gallery</h2>
                            <p className="text-sm text-slate-500 font-medium">Browse 10k+ verified academic references</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                              <select 
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer"
                              >
                                {subjectsList.map(subj => (
                                  <option key={subj} value={subj}>{subj}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="relative mb-8 flex gap-2">
                          <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                              type="text" 
                              placeholder="Search by topic, subject or course..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[10b981]/10 focus:border-emerald-500 outline-none transition-all"
                            />
                          </div>
                          <button 
                            onClick={() => executeSearch(searchQuery)}
                            className="bg-gradient-to-br from-blue-700 to-emerald-800 text-white px-6 py-4 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                          >
                            Find <ArrowRight size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                          {filteredSamples.length > 0 ? (
                            filteredSamples.map(sample => (
                              <motion.div 
                                layout
                                key={sample.id}
                                className="bg-white border border-slate-100 p-5 rounded-xl hover:shadow-md transition-all group border-l-4 border-l-[#f47321]"
                              >
                                <div className="flex justify-between items-start mb-3">
                                  <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider rounded">
                                    {sample.subject}
                                  </span>
                                  <span className="text-xs text-slate-400 font-bold">{sample.course}</span>
                                </div>
                                <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-emerald-500 transition-colors">
                                  {sample.title}
                                </h3>
                                <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2 italic">
                                  "{sample.previewText}"
                                </p>
                                <button 
                                  onClick={() => setSelectedSample(sample)}
                                  className="w-full py-2.5 bg-slate-50 hover:bg-gradient-to-br from-blue-700 to-emerald-800 text-slate-600 hover:text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                                >
                                  <Eye size={14} />
                                  View Partial Sample
                                </button>
                              </motion.div>
                            ))
                          ) : (
                            <div className="py-20 text-center">
                              <p className="text-slate-400 font-medium">No samples found matching your search.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* 2. Why Do Students Look for Essay Assignment Samples? */}
                      <div className="bg-white rounded-lg border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-tight uppercase">
                          Why Do Students Look for Essay Assignment Samples?
                        </h2>
                        <div className="text-sm text-slate-600 font-medium leading-[1.8] space-y-4">
                          <p>
                            Students often seek essay samples online for various reasons. They primarily look to gain a better understanding of the order requirements, structure, and formatting. Here are some key motivations behind seeking sample assignments –
                          </p>
                          <ul className="space-y-6 list-disc pl-5 marker:text-emerald-500">
                            <li>
                              <strong>Clarity on Expectations:</strong> Essay samples serve as practical examples. They offer clarity on what is expected in terms of content, style, and organization. You can reach our essay helpers for free samples. Students can analyze these references to comprehend the specific requirements of their homework.
                            </li>
                            <li>
                              <strong>Learning Formatting and Structure:</strong> Many students struggle with the correct formatting and structure for academic homework. So, they seek university essay help with free references. By examining such materials, they can observe how to create an introduction, body, and conclusion. They can also show you how to incorporate citations and references properly.
                            </li>
                            <li>
                              <strong>Ideas and Inspiration:</strong> Sometimes, students may find themselves stuck when it comes to generating ideas for their homework. Samples can spark creativity and provide new perspectives on a particular topic.
                            </li>
                            <li>
                              <strong>Quality Benchmark:</strong> Students often use homework examples as a benchmark for quality. However, not all free assignment help services can ensure top quality. By studying our well-written references, they can gauge the level of detail and critical thinking expected in their own work.
                            </li>
                            <li>
                              <strong>Avoiding Plagiarism:</strong> It's crucial to avoid copying content directly from old materials. However, reviewing them can help students understand how to paraphrase and cite information correctly. You may lack this originality by seeking writing help. This leads to unintentional plagiarism.
                            </li>
                            <li>
                              <strong>Time Management:</strong> With the pressure of deadlines, students may turn to online assignment samples to save time. Analyzing a well-structured reference can expedite their own writing process by providing a model to follow.
                            </li>
                            <li>
                              <strong>Subject Familiarization:</strong> An essay sample can familiarize students with new or complex topics. By reviewing how others have approached similar subjects, students can gain insights into key concepts and terminology. Students can also compare their work to our high-quality essay examples. This allows students to self-assess and identify areas for improvement.
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* 3. How can I see some previous work? */}
                      <div className="bg-white rounded-lg border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-tight uppercase">
                          How can I see some previous work to know if this is a reputable company?
                        </h2>
                        <div className="text-sm text-slate-600 font-medium leading-[1.8] space-y-4">
                          <p>
                            You can visit our website and check for the samples section to understand the quality. Students can choose an assignment sample related to their subject. We understand how students need to be sure about our services and have kept things transparent for them. 
                          </p>
                          <p>
                            When you click on the samples section, you will see how we have kept samples ready for each subject. Click on resources and then samples to get to the page and find what you want. We have a repository of 10k+ samples on various topics and subjects. Make sure you know everything about our services and make an informed decision. You can read these samples without paying a single penny.
                          </p>
                        </div>
                      </div>

                      {/* 4. After receiving the paper, does the paper require additional payment? */}
                      <div className="bg-white rounded-lg border border-slate-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 leading-tight uppercase">
                          After receiving the paper, does the paper require additional payment?
                        </h2>
                        <div className="text-sm text-slate-600 font-medium leading-[1.8] space-y-4">
                          <p>
                            There are rare cases when students have problems with solutions delivered by us. In such cases, you can get in touch with the writer and ask them to make the necessary changes. You will not have to pay anything extra to get things done. You can get assignment help for free in these cases. MyAssignmenthelp.com is one of the best websites for offering services that cover all aspects of academic writing. We are not a free assignment help website, but we compensate for the mistakes we make.
                          </p>
                          <p>
                            So, when you receive a paper that has some minor mistakes, ask us to revise it immediately. However, before you do so, go through our revision and refund policy to make the best use of these perks.
                          </p>
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Scroll Action Buttons absolute to the right boundary */}
                  <div className="hidden md:flex absolute right-4 md:right-8 top-12 bottom-12 flex-col justify-between py-2 pointer-events-none">
                    <button 
                      onClick={scrollUp}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-sm pointer-events-auto ${
                        scrollDir === 'up' 
                          ? 'bg-slate-200 text-[#333333]' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-[#333333]'
                      }`}
                      aria-label="Scroll up"
                    >
                      <ChevronUp size={32} />
                    </button>
                    <div className="flex-1"></div>
                    <button 
                      onClick={scrollDown}
                      className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors shadow-sm pointer-events-auto ${
                        scrollDir === 'down' 
                          ? 'bg-slate-200 text-[#333333]' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-[#333333]'
                      }`}
                      aria-label="Scroll down"
                    >
                      <ChevronDown size={32} />
                    </button>
                  </div>

                </div>
              </div>
            </section>

            {/* Section 5: FAQ Section - Exactly as Homepage */}
            <div className="relative">
              <FAQSection 
                title="Frequently Asked Questions"
                leftFaqs={faqItems.slice(0, 4).map(q => ({
                  question: q,
                  answer: "Our professional academic team provides detailed guidance on this topic. Essay samples are best used as learning references to understand structure, citation styles, and content depth. Reviewing high-quality examples can significantly enhance your academic writing skills while maintaining integrity."
                }))}
                rightFaqs={faqItems.slice(4).map(q => ({
                  question: q,
                  answer: "Accessing a diverse repository of essay samples across various disciplines allows students to benchmark their work across professional standards. We ensure all our samples are 100% original and crafted by subject-matter experts with PhD qualifications from leading global universities."
                }))}
              />

              {/* Floating gradient balls */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-slate-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Search Results Header (Image Style) */}
            <section className="bg-slate-50 border-b border-slate-100 relative overflow-hidden py-12">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <h1 className="text-3xl md:text-4xl font-extrabold text-emerald-500">
                  Search Result for - <span className="text-slate-800">{searchedTerm}</span>
                </h1>
                
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mt-6 text-xs md:text-xs font-bold uppercase tracking-widest text-emerald-500">
                  <button onClick={resetSearch} className="hover:text-slate-900 transition-colors flex items-center gap-1">
                    <Home size={12} /> Home
                  </button>
                  <span className="text-slate-300">/</span>
                  <button onClick={resetSearch} className="hover:text-slate-900 transition-colors">Samples</button>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-500">{searchedTerm}</span>
                </nav>
              </div>

              {/* Pattern Background Snippet */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(234,88,12,0.2)_0%,transparent_70%)]"></div>
                <div className="w-full h-full border-l border-slate-200 border-dashed"></div>
              </div>
            </section>

            {/* Results Content Area */}
            <section className="py-12 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                  {/* Left Column: Results */}
                  <div className="flex-1">
                    {filteredSamples.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredSamples.map(sample => (
                          <motion.div 
                            layout
                            key={sample.id}
                            className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-extrabold uppercase tracking-widest rounded-full">
                                {sample.subject}
                              </span>
                              <span className="text-xs text-slate-400 font-bold uppercase tracking-tight">{sample.course}</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-emerald-500 transition-colors leading-snug">
                              {sample.title}
                            </h3>
                            <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-3 italic">
                              "{sample.previewText}"
                            </p>
                            <button 
                              onClick={() => setSelectedSample(sample)}
                              className="w-full mt-auto py-3 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                            >
                              <Eye size={14} />
                              View Sample Details
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-20 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                        <FileSearch size={48} className="text-slate-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">No Record Found</h3>
                        <p className="text-slate-500 font-medium">We couldn't find any samples matching your search criteria.</p>
                        <button 
                          onClick={resetSearch}
                          className="mt-8 px-8 py-3 bg-gradient-to-br from-blue-700 to-emerald-800 text-white rounded-full font-bold hover:shadow-lg transition-all"
                        >
                          Clear Search
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Sidebar */}
                  <div className="w-full lg:w-[380px] shrink-0">
                    <SampleSidebar />
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Partial Sample Viewer Modal */}
      <AnimatePresence>
        {selectedSample && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedSample(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-br from-blue-700 to-emerald-800 p-6 text-white flex justify-between items-start">
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-white/20 rounded text-xs font-bold uppercase">{selectedSample.subject}</span>
                    <span className="text-xs font-bold opacity-70">{selectedSample.course}</span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold">{selectedSample.title}</h2>
                </div>
                <button 
                  onClick={() => setSelectedSample(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content - Partial Viewing */}
              <div className="p-8 overflow-y-auto flex-1 custom-scrollbar text-left">
                <div className="prose prose-slate max-w-none">
                  <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-4">Sample Preview Content</p>
                  <div className="space-y-6">
                    <p className="text-lg text-slate-700 leading-relaxed font-medium">
                      {selectedSample.previewText}
                    </p>
                    
                    {/* Artistic Partial Content Mask */}
                    <div className="relative">
                      <div className="space-y-4 opacity-40 select-none blur-[2px]">
                        <p className="text-slate-600 leading-relaxed">
                          Research indicates that the multifaceted nature of this phenomenon requires a comprehensive socio-technical approach. By analyzing the variables involved, one can deduce that the initial hypothesis was rooted in empirical observations of the early 20th century...
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                          Furthermore, the implications of these findings suggest a paradigm shift in the way academic institutions handle the dissemination of knowledge across interdisciplinary boundaries. The correlation between variable A and variable B remains statistically significant even after adjusting for external confounding factors...
                        </p>
                      </div>
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent flex items-end justify-center pb-12">
                        <div className="text-center">
                          <div className="bg-slate-100/80 backdrop-blur p-6 rounded-2xl border border-slate-200 inline-block mb-4 shadow-sm">
                            <ShieldCheck className="mx-auto text-emerald-500 mb-3" size={32} />
                            <h3 className="text-lg font-bold text-slate-800 mb-1 text-center">Restricted Content</h3>
                            <p className="text-sm text-slate-500 text-center">Log in to view the full 5,000+ word paper.</p>
                          </div>
                          <div>
                            <button className="bg-gradient-to-br from-blue-700 to-emerald-800 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-emerald-500 transition-all transform hover:-translate-y-0.5 active:scale-95">
                              Download Full Sample
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-slate-500 font-medium text-left">
                  This is a **Partial Sample**. All original samples are verified for 0% plagiarism.
                </p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-white transition-colors">
                    <FileDown size={16} /> PDF
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-white transition-colors">
                    Copy Link
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

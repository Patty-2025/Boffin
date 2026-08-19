import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SocialFollowings } from '../components/SocialFollowings';
import { FeaturedLogos } from '../components/FeaturedLogos';
import { InformationalProse } from '../components/InformationalProse';
import { ServicesTabs } from '../components/ServicesTabs';
import { 
  Sparkles, 
  Star, 
  Cpu, 
  HelpCircle, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  ArrowRight, 
  Flame, 
  Clock, 
  Users, 
  Shield, 
  Check, 
  Smartphone,
  Video,
  FileText,
  ChevronDown,
  Layers,
  ChevronRight,
  TrendingUp,
  HeartHandshake,
  Volume2,
  VolumeX
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import OrderFormWidget from '../components/OrderFormWidget';

interface Expert {
  slug: string;
  name: string;
  discipline: string;
  score: string;
  reviews: number;
  videoSrc: string;
  image: string;
}

const EXPERTS_LIST: Expert[] = [
  {
    slug: 'bangpopwriter',
    name: 'BangpopWriter',
    discipline: 'Psychology',
    score: '10',
    reviews: 283,
    videoSrc: 'https://customer-wc5ze6sgmvalrhq1.cloudflarestream.com/d0c392e302afe73ce8eee1b12fd578cb/downloads/default.mp4',
    image: '/w3t_img/ugc/bangpopwriter.webp'
  },
  {
    slug: 'goldyenceera',
    name: 'Goldyenceera',
    discipline: 'Healthcare',
    score: '10',
    reviews: 523,
    videoSrc: 'https://customer-wc5ze6sgmvalrhq1.cloudflarestream.com/c19d385f1bee8bc5bb140badfef1bf6b/downloads/default.mp4',
    image: '/w3t_img/ugc/goldyenceera.webp'
  },
  {
    slug: 'edgarprofessional',
    name: 'EdgarProfessional',
    discipline: 'History',
    score: '10',
    reviews: 3956,
    videoSrc: 'https://customer-wc5ze6sgmvalrhq1.cloudflarestream.com/1eff081bc9207583f41deacd9403e5c0/downloads/default.mp4',
    image: '/w3t_img/ugc/edgarprofessional.webp'
  },
  {
    slug: 'writer-a100',
    name: 'Writer-A100',
    discipline: 'Nursing',
    score: '10',
    reviews: 4884,
    videoSrc: 'https://customer-wc5ze6sgmvalrhq1.cloudflarestream.com/33aad1bd740778f2ad214382e3f728b9/downloads/default.mp4',
    image: '/w3t_img/ugc/writer-a100.webp'
  }
];

const REVIEWS_POOL = [
  { id: '1', rating: '10/10', stars: 5, author: 'Client: #63294', discipline: 'SPSS', date: 'Apr 21, 2026', content: "I was totally stuck with my SPSS analysis and couldn’t connect the output to the actual conclusions. Thanks for explaining the structure and fixing my draft. Everything made sense before submission.", source: 'Boffin Global' },
  { id: '2', rating: '5/5', stars: 5, author: 'Sara B.', discipline: 'MATLAB', date: 'April 20, 2026', content: "I felt that I couldn’t go deep into my model and results. The improved version I got shows real analysis, not just surface-level writing. Many thanks, you are the best!", source: 'Sitejabber' },
  { id: '3', rating: '5/5', stars: 5, author: 'jaydenthomas3595366317', discipline: 'AutoCAD', date: 'Jan 14, 2026', content: "Boffin Global helped me with my AutoCAD project, and it came out great. The details were accurate, the presentation was clear, and the final result looked fully professional and original.", source: 'Reviews.io' },
  { id: '4', rating: '10/10', stars: 5, author: 'Client: #53246', discipline: 'AutoCAD', date: 'Apr 23, 2026', content: "My technical report was full of formatting and analysis issues. After your help, the graphs, citations, and narrative all looked properly structured and professionally presented. Thanks!", source: 'Boffin Global' },
  { id: '5', rating: '4/5', stars: 4, author: 'Emma T.', discipline: 'Data Analysis', date: 'April 18, 2026', content: "My supervisor kept rejecting my methodology section, saying it lacked clarity. These guys helped restructure the analysis and justify every choice properly. Thanks, I finally got approval.", source: 'Sitejabber' },
  { id: '6', rating: '5/5', stars: 5, author: 'NoahJoys', discipline: 'GIS', date: '2026-04-17', content: "My GIS analysis output was messy and hard to interpret. These guys cleaned it up, made the logic clear, and helped me explain the results with confidence. I got a better grade than expected.", source: 'Reviews.io' }
];

const ACCORDION_REVIEWS = [
  { id: '7', rating: '5/5', stars: 5, author: 'Natalie B.', discipline: 'GIS', date: 'December 31, 2025', content: "Boffin Global delivered a GIS project that exceeded my expectations. It was well-structured, technically accurate, and easy to understand.", source: 'Sitejabber' },
  { id: '8', rating: '5/5', stars: 5, author: 'juliamccartyy', discipline: 'Python', date: '2025-11-21', content: "I received a great Python assignment that was coherent, well-documented, and full of relevant logic. BoffinGlobal really helped me understand the task and improved my own coding approach. Delivery was on time too.", source: 'Reviews.io' },
  { id: '9', rating: '10/10', stars: 5, author: 'Client: #61425', discipline: 'AutoCAD', date: 'Apr 13, 2026', content: "I am not a newbie to Boffin Global, and have ordered multiple technical drawings and models, so I can surely say that structured outputs and precise attention to detail are their superpower. The best service!", source: 'Boffin Global' },
  { id: '10', rating: '5/5', stars: 5, author: 'Elijah P.', discipline: 'SPSS', date: 'April 10, 2026', content: "I had zero understanding of SPSS, but they helped interpret the data and explain the results section. Perfect! Will order again for sure.", source: 'Sitejabber' },
  { id: '11', rating: '4/5', stars: 4, author: 'BenjaminMiller', discipline: 'R Studio', date: '2026-04-14', content: "The statistical model I had built was inconsistent, but the writer reshaped the analysis into something that actually fits the requirements.", source: 'Reviews.io' },
  { id: '12', rating: '10/10', stars: 5, author: 'Client: #38923', discipline: 'MATLAB', date: 'Oct 10, 2025', content: "This might be the best company I’ve tried using so far. The delivery is super fast and the technical explanation was extremely clear.", source: 'Boffin Global' },
  { id: '13', rating: '5/5', stars: 5, author: 'Antoine A.', discipline: 'Engineering', date: 'November 29, 2025', content: "Everything was done in a timely manner and with professionalism. The calculations and documentation were clear and well-structured.", source: 'Sitejabber' },
  { id: '14', rating: '5/5', stars: 5, author: 'emersonharris', discipline: 'Data Analysis', date: '2025-11-14', content: "I ordered a technical report, and it was delivered quickly. The analysis was clear, structured, and easy to follow. Boffin Global really saved me time and matched the requirements I had in mind. Definitely worth it.", source: 'Reviews.io' },
  { id: '15', rating: '8/10', stars: 4, author: 'Client: #37999', discipline: 'Java', date: 'Sep 13, 2025', content: "This service is my go-to place whenever I need programming help or troubleshooting very quickly.", source: 'Boffin Global' },
  { id: '16', rating: '5/5', stars: 5, author: 'Raegan M.', discipline: 'Data Science', date: 'November 18, 2025', content: "Boffin Global nailed my data science project. It had solid analysis and felt professionally done. I didn't expect it to be this polished, honestly.", source: 'Sitejabber' },
  { id: '17', rating: '5/5', stars: 5, author: 'malcolmhoward', discipline: 'SQL', date: '2025-09-06', content: "Used this service for a SQL database assignment. The logic and queries were strong, though one edge case needed a quick correction. They fixed it promptly. Overall, a smooth and worthwhile experience.", source: 'Reviews.io' }
];

const ReviewVideoCard = ({ videoSrc, posterSrc, discipline, score, wrapperClass }: { videoSrc: string, posterSrc: string, discipline: string, score: string, wrapperClass: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  return (
    <div 
      className={`${wrapperClass} bg-gradient-to-br from-[#0050b5] to-[#0080d1] rounded-[12px] relative cursor-pointer transition-transform group`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full rounded-[12px] relative h-full">
        <div className={`mask-video-wrapper max-h-[520px] h-full relative rounded-[12px] overflow-hidden ${isPlaying ? 'video-playing' : ''}`}>
          
          <div className="z-10 absolute left-2 top-2 leading-[12px] font-bold py-2 px-3 rounded-lg bg-[rgba(0,0,0,0.20)] text-white text-[10px]">
            {!isPlaying ? (
              <div className="flex items-center gap-1 uppercase">
                <span>Hover to Watch intro</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M11.0361 6.95593L4.69141 10.993V2.91882L11.0361 6.95593Z" fill="white" stroke="white" strokeWidth="0.05"></path>
                </svg>
              </div>
            ) : (
              <button 
                onClick={handleToggleMute} 
                className="flex items-center gap-1 uppercase"
              >
                <span>Click TO {isMuted ? 'UNMUTE' : 'MUTE'}</span>
                <img src="/next/img/icons/muted.svg" alt="Mute" loading="lazy" width="14" height="14" />
              </button>
            )}
          </div>
          
          <img 
            className={`video-mask w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} 
            src={posterSrc} 
            alt="Customer" 
            loading="lazy" 
          />
          <video 
            ref={videoRef}
            className={`hero-video absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} 
            loop 
            muted={isMuted} 
            playsInline 
            src={videoSrc}
          />
        </div>
      </div>
      <div className="absolute bottom-2 left-2 font-lato p-2">
        <div className="flex gap-2 text-[12px] text-[#424242]">
          <div className="flex gap-2 uppercase font-bold">
            <div className="bg-white max-w-[130px] truncate py-1 px-2.5 w-fit rounded-lg">
              {discipline}
            </div>
          </div>
          <div className="flex gap-2 text-sm items-center bg-[#fff6e0] py-1 px-2.5 w-fit rounded-lg">
            <span className="flex items-center text-[#424242] font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none" className="mr-1">
                <path d="M5.83333 8.9075L9.43833 11.0833L8.48167 6.9825L11.6667 4.22333L7.4725 3.8675L5.83333 0L4.19417 3.8675L0 4.22333L3.185 6.9825L2.22833 11.0833L5.83333 8.9075Z" fill="#FFB300"></path>
              </svg>
              {score} <span className="font-normal text-[#424242] ml-0.5">/10</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);
  const [mutedMap, setMutedMap] = useState<{[key: string]: boolean}>({
    bangpopwriter: true,
    goldyenceera: true,
    edgarprofessional: true,
    'writer-a100': true
  });

  const faqs = [
    {
      question: "Who will help me with my assignment or custom project?",
      answer: "At BoffinGlobal, you choose from vetted specialists whose profiles include their academic background, subject expertise, completed orders, and customer reviews. You can compare candidates, chat directly, and select the expert who best matches your project requirements before placing an order."
    },
    {
      question: "How long does it take to complete my assignment or custom project?",
      answer: "The turnaround depends on the deadline you set and the complexity of the task. For urgent requests, we can often accommodate shorter windows, while longer deadlines generally allow for better pricing and more careful work. Most projects are completed well before the stated deadline, giving you time to review the result and request adjustments if needed."
    },
    {
      question: "What does a custom assignment cost?",
      answer: "The final price depends on the assignment type, academic level, word count, complexity, and urgency. Our bidding system lets you compare specialist offers and choose the option that fits your budget. There are no hidden fees at checkout, and you can often negotiate when the deadline is more flexible."
    },
    {
      question: "How do you choose your specialists?",
      answer: "We apply a strict screening process that includes skill assessments, subject-matter checks, and quality reviews. Only a small fraction of applicants are approved, and we continue monitoring performance through customer feedback and completed orders to maintain quality standards."
    },
    {
      question: "What guarantees do you provide?",
      answer: "We offer multiple protections, including revision support, confidentiality, and a clear refund policy depending on the stage of the project. All work is created from scratch and checked for originality, and you also receive support if your instructions need to be clarified during the process."
    },
    {
      question: "Will my work be original?",
      answer: "Yes. Every assignment is created from scratch according to your brief, instructions, and academic requirements. We also provide originality checks and review the final draft to help ensure the work is unique, properly referenced, and aligned with your guidelines."
    },
    {
      question: "How do I choose the right specialist for my project?",
      answer: "Start by reviewing each specialist’s profile, including their experience, qualifications, ratings, and past work in your field. Then use direct messaging to ask about their approach, turnaround, and understanding of your assignment. Comparing a few candidates helps you make a more informed decision."
    },
    {
      question: "Do your specialists use AI tools?",
      answer: "Our process prioritizes human expertise and original thinking. While some tools may be used to support research or quality checks, the final assignment is expected to reflect authentic specialist work, clear reasoning, and accurate academic standards."
    },
    {
      question: "When can I use milestone or staged delivery?",
      answer: "This option is especially useful for longer research projects, dissertations, programming tasks, or complex reports where the work can be reviewed in sections. It allows you to approve progress in stages, release payment as milestones are completed, and keep the project aligned with your expectations."
    },
    {
      question: "What types of academic tasks and custom projects can you help with?",
      answer: "We support a wide range of academic and professional tasks, including essays, reports, case studies, research papers, coursework, coding assignments, lab work, dissertations, technical projects, and custom assignments tailored to your specific requirements. You can choose the format that matches your topic and goals."
    },
    {
      question: "Can I communicate with my specialist during the process?",
      answer: "Yes. Direct communication is built into the process so you can clarify instructions, share resources, ask questions, and monitor progress. This keeps the project aligned with your expectations and helps avoid misunderstandings before final delivery."
    },
    {
      question: "What if I’m not satisfied with the result?",
      answer: "You can request revisions based on the feedback you want addressed. If the draft still needs adjustments, our support team can help review the request and coordinate the next steps so your final submission meets your expectations."
    },
    {
      question: "Can I request specific sources or materials?",
      answer: "Yes. You can upload your reading list, notes, or source materials when placing the order, or send them to your specialist through the chat. This helps tailor the work to your assignment requirements and academic standards."
    },
    {
      question: "Do you offer discounts or flexible pricing?",
      answer: "We offer pricing flexibility based on deadline length, project complexity, and specialist competition. Longer deadlines often allow for lower bids, while more urgent work may cost more. The bidding system gives you control over the final price."
    },
    {
      question: "Can you help with proofreading and editing?",
      answer: "Absolutely. If you already have a draft, we can help with proofreading, formatting, revisions, and structural improvements so your work is clearer, stronger, and better aligned with academic standards."
    }
  ];

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main className="pt-20 bg-slate-50 font-sans min-h-screen text-slate-800">
      <SEO 
        title="Boffin Global Group | Premium Essay Writing & Academic Support"
        description="Hire expert human writers for essays, coursework, case studies, dissertations and coding projects. Plagiarism-free and AI-free guaranteed."
        keywords="assignment help service, coursework writing, buy college papers, assignment help, custom essays, research paper"
        canonicalUrl="/"
      />

      {/* Hero Section */}
      <section className="relative bg-white pt-6 pb-20 border-b border-slate-200 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />



        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, ratings, trust indices */}
            <div className="lg:col-span-7 space-y-6">
              {/* Custom AI & Plagiarism Free Badge */}
              <div 
                className="group relative cursor-pointer mb-4 w-fit flex gap-2 text-slate-900 items-center font-bold font-lato uppercase bg-slate-50 border border-solid border-slate-100 px-4 py-2 rounded-lg"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_29029_39018)">
                    <path d="M10.9997 19.7242C10.9997 18.5173 10.767 17.3832 10.3015 16.3217C9.85102 15.2603 9.23289 14.337 8.4478 13.5518C7.6627 12.7667 6.73926 12.1487 5.67781 11.698C4.61637 11.2327 3.48234 11 2.27539 11C3.48234 11 4.61637 10.7747 5.67781 10.3239C6.73926 9.85862 7.6627 9.23338 8.4478 8.44823C9.23289 7.66303 9.85102 6.73974 10.3015 5.67829C10.767 4.61686 10.9997 3.48272 10.9997 2.27588C10.9997 3.48272 11.2249 4.61686 11.6758 5.67829C12.1409 6.73974 12.7662 7.66303 13.5513 8.44823C14.3367 9.23338 15.2598 9.85862 16.3212 10.3239C17.3827 10.7747 18.5171 11 19.7237 11C18.5171 11 17.3827 11.2327 16.3212 11.698C15.2598 12.1487 14.3367 12.7667 13.5513 13.5518C12.7662 14.337 12.1409 15.2603 11.6758 16.3217C11.2249 17.3832 10.9997 18.5173 10.9997 19.7242Z" fill="#5C80AB"></path>
                    <circle cx="11" cy="11" r="10.25" stroke="#DB464C" strokeWidth="1.5"></circle>
                    <rect x="3.6543" y="3.60826" width="20.7492" height="0.803246" transform="rotate(45 3.6543 3.60826)" fill="#DB464C" stroke="#DB464C" strokeWidth="0.803246"></rect>
                  </g>
                  <defs>
                    <clipPath id="clip0_29029_39018">
                      <rect width="22" height="22" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <span className="pointer-events-none text-xs tracking-wider">AI &amp; Plagiarism Free papers</span>
                
                {/* Interactive Tooltip bubble */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-slate-900 text-white text-xs py-2 px-3 rounded-lg shadow-lg w-64 z-20 text-center transition-all duration-200">
                  <div className="font-bold border-b border-white/10 pb-1 mb-1">AI &amp; Plagiarism Free</div>
                  <div className="text-slate-300 leading-relaxed font-normal normal-case">Our writers deliver unique papers, verified with our free checking tools.</div>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] font-display">
                Expert Assignment Help <br />
                <span className="text-teal-600">Original Content Only</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed max-w-2xl">
                Get custom assignment help from experienced human writers. No AI-generated content and no plagiarism. Control the whole process and rely on our strict quality guarantees.
              </p>

              {/* Trust badges */}
              <div className="[grid-area:stats]">
                <div className="js--stats js--intro-stats justify-center lg:justify-normal pb-6 xl:pb-0 flex md:flex-row items-center gap-4 md:gap-8">
                  <button 
                    onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                    className="js--scroll-to-reviews flex flex-col grow md:flex-row justify-center items-center gap-2 group cursor-pointer" 
                    aria-label="BoffinGlobal"
                  >
                    <span className="flex items-center justify-center rounded-full bg-slate-50 w-[48px] h-[48px] group-hover:bg-slate-100 transition">
                      <img src="/next/img/logos/boffinglobal-small.svg" alt="" width="32" height="32" loading="lazy" />
                    </span>
                    <span>
                      <span className="font-bold flex items-center justify-center md:justify-normal gap-1 font-lato">
                        <span id="intro_quality_score">9.65/10</span>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.66667 0.660034L9.72667 4.83337L14.3333 5.5067L11 8.75337L11.7867 13.34L7.66667 11.1734L3.54667 13.34L4.33333 8.75337L1 5.5067L5.60667 4.83337L7.66667 0.660034Z" fill="#FFB300" stroke="#FFB300" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="text-grey-400 group-hover:text-blue-500 transition caption text-xs font-semibold">BoffinGlobal.com</span>
                    </span>
                  </button>

                  <button 
                    onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                    className="js--scroll-to-reviews flex flex-col grow md:flex-row justify-center items-center gap-2 group cursor-pointer" 
                    aria-label="SiteJabber"
                  >
                    <span className="flex items-center justify-center rounded-full bg-slate-50 w-[48px] h-[48px] group-hover:bg-slate-100 transition">
                      <img src="/next/img/logos/sj.svg" alt="" width="32" height="32" loading="lazy" />
                    </span>
                    <span>
                      <span className="font-bold flex items-center justify-center md:justify-normal gap-1 font-lato">
                        <span id="intro_sitejabber">4.8/5</span>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.66667 0.660034L9.72667 4.83337L14.3333 5.5067L11 8.75337L11.7867 13.34L7.66667 11.1734L3.54667 13.34L4.33333 8.75337L1 5.5067L5.60667 4.83337L7.66667 0.660034Z" fill="#FFB300" stroke="#FFB300" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="text-grey-400 group-hover:text-blue-500 transition caption text-xs font-semibold">Sitejabber</span>
                    </span>
                  </button>

                  <button 
                    onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}
                    className="js--scroll-to-reviews flex flex-col grow md:flex-row justify-center items-center gap-2 group cursor-pointer" 
                    aria-label="ResellerRatings"
                  >
                    <span className="flex items-center justify-center rounded-full bg-slate-50 w-[48px] h-[48px] group-hover:bg-slate-100 transition">
                      <img src="/next/img/logos/reseller-ratings.svg" alt="" width="32" height="32" loading="lazy" />
                    </span>
                    <span>
                      <span className="font-bold flex items-center justify-center md:justify-normal gap-1 font-lato">
                        <span id="intro_reseller">4.7/5</span>
                        <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.66667 0.660034L9.72667 4.83337L14.3333 5.5067L11 8.75337L11.7867 13.34L7.66667 11.1734L3.54667 13.34L4.33333 8.75337L1 5.5067L5.60667 4.83337L7.66667 0.660034Z" fill="#FFB300" stroke="#FFB300" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </span>
                      <span className="text-grey-400 group-hover:text-blue-500 transition caption text-xs font-semibold">ResellerRatings</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Order Widget */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <OrderFormWidget />
            </div>

          </div>
        </div>
      </section>

      {/* Section 2: Contact experienced essay writers */}
      <section className="py-16 bg-slate-50 relative overflow-hidden border-b border-slate-100">

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
              Contact Expert Specialists
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              Choose from over 200 experts and hire the best paper writers to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {EXPERTS_LIST.map((expert) => {
              const isHovered = hoveredVideo === expert.slug;
              const isMuted = mutedMap[expert.slug] ?? true;
              return (
                <div 
                  key={expert.slug}
                  className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md cursor-pointer"
                  onMouseEnter={() => setHoveredVideo(expert.slug)}
                  onMouseLeave={() => setHoveredVideo(null)}
                >
                  {/* Media container */}
                  <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                    {/* Video Status Overlay Label */}
                    <div className="z-20 absolute left-2 top-2 leading-3 font-bold py-2 px-3 rounded-lg bg-[rgba(0,0,0,0.40)] backdrop-blur-xs text-white text-[10px] pointer-events-none transition-all">
                      {!isHovered ? (
                        <div className="flex items-center gap-1 uppercase">
                          <span>Hover to Watch intro</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" className="animate-pulse">
                            <path d="M11.0361 6.95593L4.69141 10.993V2.91882L11.0361 6.95593Z" fill="white" stroke="white" strokeWidth="0.05"></path>
                          </svg>
                        </div>
                      ) : (
                        <button 
                          className="js--video-sound-toggle flex items-center gap-1 uppercase pointer-events-auto hover:text-teal-300 active:scale-95 transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMutedMap(prev => ({ ...prev, [expert.slug]: !isMuted }));
                          }}
                        >
                          <span>{isMuted ? 'Click TO UNMUTE' : 'UNMUTED'}</span>
                          {isMuted ? (
                            <VolumeX size={12} className="text-white" />
                          ) : (
                            <Volume2 size={12} className="text-teal-400" />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Image Poster Mask */}
                    <img 
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 z-10 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`} 
                      src={expert.image} 
                      alt={expert.name} 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* HTML5 video element */}
                    {isHovered && (
                      <video 
                        className="absolute inset-0 w-full h-full object-cover z-0"
                        src={expert.videoSrc}
                        loop
                        autoPlay
                        playsInline
                        muted={isMuted}
                      />
                    )}

                    {/* Absolute Bottom Badge Row */}
                    <div className="absolute w-full bottom-2 left-0 font-lato p-3 z-20 pointer-events-none">
                      <div className="flex flex-col gap-2 text-[12px]">
                        <div className="flex gap-2 uppercase font-bold">
                          <div className="bg-white/95 text-slate-800 py-0.5 px-2 w-fit rounded-lg shadow-sm border border-slate-100">
                            {expert.name}
                          </div>
                          <div className="bg-teal-600/90 text-white py-0.5 px-2 w-fit rounded-lg shadow-sm">
                            {expert.discipline}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Details Bar */}
                  <div className="p-4 space-y-3 bg-white">
                    <div className="flex gap-2 items-center bg-amber-50/80 border border-amber-100/60 py-1.5 px-2.5 w-fit rounded-lg text-xs">
                      <span className="flex items-center text-amber-600 gap-1 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M5.83333 8.9075L9.43833 11.0833L8.48167 6.9825L11.6667 4.22333L7.4725 3.8675L5.83333 0L4.19417 3.8675L0 4.22333L3.185 6.9825L2.22833 11.0833L5.83333 8.9075Z" fill="#FFB300"></path>
                        </svg>
                        <b>{expert.score}</b>/10
                      </span>
                      <span className="text-slate-500">({expert.reviews} reviews)</span>
                    </div>

                    <Link 
                      to="/order"
                      className="block w-full py-2.5 bg-slate-950 hover:bg-teal-600 text-white text-center text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                    >
                      Assign writer
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3: How to get assignment help at BoffinGlobal */}
      <section id="how-it-works" className="py-16 bg-white border-b border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
              How to get assignment help at BoffinGlobal
            </h2>
            <p className="text-sm text-slate-500 font-light">
              All you need is to follow these 3 simple steps for any assignment or custom project:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="text-center md:text-left flex flex-col justify-between border border-solid border-slate-100 p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex mb-3 items-center justify-center text-[18px] w-10 h-10 bg-slate-50 text-slate-900 rounded-full font-bold">
                  1
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Choose a specialist</h3>
                <p className="mb-2 text-slate-500 text-sm font-light">
                  Share the key details of your assignment, project brief, or custom request in the order form.
                </p>
                <p className="mb-4 text-slate-500 text-sm font-light">
                  Compare specialists and select the one that best matches your needs.
                </p>
              </div>
              <div className="mt-auto">
                <img 
                  className="mx-auto transition-transform duration-300 hover:scale-105" 
                  src="/next/img/illustration/hiw/hiw-1.webp" 
                  alt="Choose an assistant" 
                  width="314" 
                  height="210" 
                  loading="lazy"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center md:text-left flex flex-col justify-between border border-solid border-slate-100 p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex mb-3 items-center justify-center text-[18px] w-10 h-10 bg-slate-50 text-slate-900 rounded-full font-bold">
                  2
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Control the process</h3>
                <div className="mb-2 text-slate-500 text-sm font-light leading-relaxed">
                  Reserve funds with{" "}
                  <div className="inline-block relative group">
                    <img 
                      className="safe-payments hover:cursor-pointer inline-block relative -top-0.5 max-h-5" 
                      src="/next/img/logos/safe-pay.svg" 
                      alt="Safe Payments" 
                      loading="lazy" 
                      width="93" 
                      height="18"
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-950 text-white text-[11px] p-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg leading-relaxed text-center font-normal">
                      <b className="text-teal-400 block mb-1">SafePayments</b>
                      Risk-free method of paying for your order. Deposit money, release only after you like the result. All unreleased funds are 100% refundable.
                    </div>
                  </div>{" "}
                  and track the progress of your assignment or custom project.
                </div>
                <p className="mb-4 text-slate-500 text-sm font-light">
                  You can communicate with your specialist directly whenever needed.
                </p>
              </div>
              <div className="mt-auto">
                <img 
                  className="mx-auto transition-transform duration-300 hover:scale-105" 
                  src="/next/img/illustration/hiw/hiw-2.webp" 
                  alt="Control the process" 
                  width="314" 
                  height="210" 
                  loading="lazy"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center md:text-left flex flex-col justify-between border border-solid border-slate-100 p-6 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all duration-300">
              <div>
                <div className="flex mb-3 items-center justify-center text-[18px] w-10 h-10 bg-slate-50 text-slate-900 rounded-full font-bold">
                  3
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Receive your solution</h3>
                <p className="mb-2 text-slate-500 text-sm font-light">
                  Review the completed work and request revisions if needed.
                </p>
                <p className="mb-4 text-slate-500 text-sm font-light">
                  Download the final result and share your feedback on the specialist’s performance.
                </p>
              </div>
              <div className="mt-auto">
                <img 
                  className="mx-auto transition-transform duration-300 hover:scale-105" 
                  src="/next/img/illustration/hiw/hiw-3.webp" 
                  alt="Receive your order" 
                  width="314" 
                  height="210" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <Link 
              to="/order" 
              className="px-10 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-98 text-slate-950 font-bold uppercase tracking-wider text-sm rounded-full transition-all shadow-md hover:shadow-lg"
            >
              Hire writer
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Professional academic services with multiple benefits */}
      <section className="bg-slate-50 border-t border-b border-solid border-slate-100 py-16">
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-3">
              Professional academic support with multiple benefits
            </h2>
            <p className="text-sm text-slate-500 font-light leading-relaxed">
              With over 200K grateful customers, our service understands what students, researchers, and professionals need. Discover all of our benefits:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mb-16">
            {/* Left Benefit Image */}
            <div className="max-sm:order-1 transition-transform duration-300 hover:scale-102">
              <img 
                className="mx-auto rounded-2xl border border-slate-200/60 shadow-sm" 
                src="/next/img/illustration/benefits/left/benefits.webp" 
                alt="Writers Rating - essay writing service" 
                loading="lazy" 
                width="460" 
                height="305" 
              />
            </div>

            {/* Right Benefit Image */}
            <div className="max-sm:order-3 transition-transform duration-300 hover:scale-102">
              <img 
                className="mx-auto rounded-2xl border border-slate-200/60 shadow-sm" 
                src="/next/img/illustration/benefits/right/benefits.webp" 
                alt="Academic level - essay writing service" 
                loading="lazy" 
                width="460" 
                height="305" 
              />
            </div>

            {/* Benefit 1 */}
            <div className="pb-7 border-b border-solid border-slate-100 max-sm:order-2">
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Qualified specialists</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Collaborate with experts who follow your instructions precisely and understand your subject requirements.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="pb-7 border-b border-solid border-slate-100 order-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Easy communication</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Chat with your specialist whenever you want to ask questions, clarify details, or add project information.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="pb-7 border-b border-solid border-slate-100 order-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Originality and quality checks</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                You receive quality checks and originality support to help ensure your assignment meets academic standards.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="pb-7 border-b border-solid border-slate-100 order-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Reliable customer support</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Get answers to all your questions with 24/7 access to our support team, ready to help whenever needed.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="pb-7 border-solid border-slate-100 order-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Confidential and secure</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Your personal information and project details remain protected throughout the process.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="pb-7 border-solid border-slate-100 order-4">
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">Payments after your approval</h3>
              <div className="text-sm text-slate-500 font-light leading-relaxed">
                With our{" "}
                <div className="inline-block relative group">
                  <img 
                    className="safe-payments hover:cursor-pointer inline-block relative -top-0.5 max-h-5" 
                    src="/next/img/logos/safe-pay.svg" 
                    alt="Safe Payments" 
                    loading="lazy" 
                    width="93" 
                    height="18"
                  />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-slate-950 text-white text-[11px] p-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 shadow-lg leading-relaxed text-center font-normal">
                    <b className="text-teal-400 block mb-1">SafePayments</b>
                    Risk-free method of paying for your order. Deposit money, release only after you like the result. All unreleased funds are 100% refundable.
                  </div>
                </div>{" "}
                option, you pay after you receive and review the completed work.
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 5: Assignment support with free bonuses. */}
      <section style={{ padding: "32px 0" }}>
        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          <h2 className="text-center animate-appear-0 text-[22px] md:text-[31px] font-bold text-[#424242] mb-4">
            Assignment support with free bonuses.
          </h2>
          <p className="regular text-center text-[#5e5e5e] animate-appear-0 mx-auto max-w-[754px] text-[16px] md:text-[18px] mb-8">
            When you order assignment help here, you can enjoy many useful features for free:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 my-8">
            <div className="animate-appear-0 border border-solid border-[#c6d5e5] px-6 py-4 rounded-[12px] flex items-center gap-2 bg-white">
              <span className="grow text-[18px] font-bold font-lato text-[#424242]">Unlimited revisions</span>
              <p className="text-[#db464c] line-through m-0">$19.99</p>
              <div className="bg-[#e8f4e9] text-[#1e7320] py-0.5 px-2 w-fit rounded-sm font-bold text-sm">Free</div>
            </div>
            <div className="animate-appear-0 border border-solid border-[#c6d5e5] px-6 py-4 rounded-[12px] flex items-center gap-2 bg-white">
              <span className="grow text-[18px] font-bold font-lato text-[#424242]">Project outline</span>
              <p className="text-[#db464c] line-through m-0">$6.99</p>
              <div className="bg-[#e8f4e9] text-[#1e7320] py-0.5 px-2 w-fit rounded-sm font-bold text-sm">Free</div>
            </div>
            <div className="animate-appear-0 border border-solid border-[#c6d5e5] px-6 py-4 rounded-[12px] flex items-center gap-2 bg-white">
              <span className="grow text-[18px] font-bold font-lato text-[#424242]">Expert specialists</span>
              <p className="text-[#db464c] line-through m-0">$9.99</p>
              <div className="bg-[#e8f4e9] text-[#1e7320] py-0.5 px-2 w-fit rounded-sm font-bold text-sm">Free</div>
            </div>
            <div className="animate-appear-0 border border-solid border-[#c6d5e5] px-6 py-4 rounded-[12px] flex items-center gap-2 bg-white">
              <span className="grow text-[18px] font-bold font-lato text-[#424242]">VIP support</span>
              <p className="text-[#db464c] line-through m-0">$9.99</p>
              <div className="bg-[#e8f4e9] text-[#1e7320] py-0.5 px-2 w-fit rounded-sm font-bold text-sm">Free</div>
            </div>
            <div className="animate-appear-0 border border-solid border-[#c6d5e5] px-6 py-4 rounded-[12px] flex items-center gap-2 bg-white">
              <span className="grow text-[18px] font-bold font-lato text-[#424242]">Plagiarism report</span>
              <p className="text-[#db464c] line-through m-0">$29.99</p>
              <div className="bg-[#e8f4e9] text-[#1e7320] py-0.5 px-2 w-fit rounded-sm font-bold text-sm">Free</div>
            </div>
            <div className="animate-appear-0 border border-solid border-[#c6d5e5] px-6 py-4 rounded-[12px] flex items-center gap-2 bg-white">
              <span className="grow text-[18px] font-bold font-lato text-[#424242]">Technical quality check</span>
              <p className="text-[#db464c] line-through m-0">$16.99</p>
              <div className="bg-[#e8f4e9] text-[#1e7320] py-0.5 px-2 w-fit rounded-sm font-bold text-sm">Free</div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <Link 
              to="/order" 
              className="animate-appear-0 flex items-center justify-center font-bold text-[18px] leading-[20px] bg-[#ff8b00] hover:bg-[#ff9a00] text-white rounded-[100px] px-[40px] py-[11px] w-fit mx-auto transition-colors"
            >
              Place an order
            </Link>
          </div>
        </div>
      </section>

      {/* Section 6: Verified Student Testimonials */}
      <section className="pb-6" id="reviews" style={{ padding: '32px 0', paddingBottom: '1.5rem', color: '#424242', fontSize: '14px', lineHeight: '24px' }}>
        <div className="max-w-[1000px] mx-auto px-6 animate-appear-0">
          <h2 className="text-center max-w-[750px] mx-auto text-[22px] md:text-[31px] font-bold text-[#424242] mb-4">
            Reviews of BoffinGlobal assignment help service
          </h2>
          <p className="regular text-center max-w-[750px] text-[#5e5e5e] mx-auto text-[16px] md:text-[18px]">
            Our assignment help service has been helping students for many years, and clients rely on it for a wide range of academic and technical tasks.
          </p>
          
          <div className="grid grid-cols-12 gap-4 mt-6">
            <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
              <div className="flex gap-2 mb-2 items-center justify-between">
                <span className="subtitle inline-flex items-center gap-1">
                  <Star size={24} fill="#FFB300" strokeWidth={0} />
                  <b>10</b> <span className="text-[#424242]">/10</span>
                </span>
                <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="BoffinGlobal">
                  <img src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal logo" width="29" height="26" loading="lazy" />
                </span>
              </div>
              <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">
                Client: #63294
              </div>
              <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">
                I was totally stuck with my SPSS analysis and couldn’t connect the output to the actual conclusions. Thanks for explaining the structure and fixing my draft. Everything made sense before submission.
              </p>
              <div className="flex items-center justify-between pt-3">
                <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">SPSS</span>
                <span className="text-[14px] text-[#7b7b7b]">Apr 21, 2026</span>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
              <div className="flex gap-2 mb-2 items-center justify-between">
                <span className="subtitle inline-flex items-center gap-1">
                  <Star size={24} fill="#FFB300" strokeWidth={0} />
                  <b>5</b> <span className="text-[#424242]">/5</span>
                </span>
                <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="SiteJabber">
                  <img src="/next/img/logos/sj.svg" alt="SiteJabber" width="32" height="32" loading="lazy" />
                </span>
              </div>
              <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">
                Sara B.:
              </div>
              <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">
                I felt that I couldn’t go deep into my MATLAB model and results. The improved version I got shows real analysis, not just surface-level writing. Many thanks, you are the best!
              </p>
              <div className="flex items-center justify-between pt-3">
                <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">MATLAB</span>
                <span className="text-[14px] text-[#7b7b7b]">April 20, 2026</span>
              </div>
            </div>

            <ReviewVideoCard 
              videoSrc="https://customer-wc5ze6sgmvalrhq1.cloudflarestream.com/e00d668ce4de42aa1a5e35b0ddbd683f/downloads/default.mp4"
              posterSrc="/w3t_img/ugc/u-review-2.webp"
              discipline="SPSS"
              score="10"
              wrapperClass="col-span-12 lg:col-span-6"
            />

            <div className="col-span-12 sm:col-span-6 lg:col-span-8 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
              <div className="flex gap-2 mb-2 items-center justify-between">
                <span className="subtitle inline-flex items-center gap-1">
                  <Star size={24} fill="#FFB300" strokeWidth={0} />
                  <b>5</b> <span className="text-[#424242]">/5</span>
                </span>
                <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="ResellerRatings">
                  <img src="/next/img/logos/reseller-ratings.svg" alt="ResellerRatings" width="22" height="22" loading="lazy" />
                </span>
              </div>
              <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">
                jaydenthomas3595366317:
              </div>
              <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">
                BoffinGlobal helped me with my AutoCAD project, and it came out great. The details were accurate, the presentation was clear, and the final result looked fully professional and original.
              </p>
              <div className="flex items-center justify-between pt-3">
                <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">AutoCAD</span>
                <span className="text-[14px] text-[#7b7b7b]">2026-01-14</span>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
              <div className="flex gap-2 mb-2 items-center justify-between">
                <span className="subtitle inline-flex items-center gap-1">
                  <Star size={24} fill="#FFB300" strokeWidth={0} />
                  <b>10</b> <span className="text-[#424242]">/10</span>
                </span>
                <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="BoffinGlobal">
                  <img src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal logo" width="29" height="26" loading="lazy" />
                </span>
              </div>
              <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">
                Client: #53246
              </div>
              <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">
                My technical report was full of formatting and analysis issues. After your help, the graphs, citations, and narrative all looked properly structured and professionally presented. Thanks!)
              </p>
              <div className="flex items-center justify-between pt-3">
                <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">AutoCAD</span>
                <span className="text-[14px] text-[#7b7b7b]">Apr 23, 2026</span>
              </div>
            </div>

            <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
              <div className="flex gap-2 mb-2 items-center justify-between">
                <span className="subtitle inline-flex items-center gap-1">
                  <Star size={24} fill="#FFB300" strokeWidth={0} />
                  <b>4</b> <span className="text-[#424242]">/5</span>
                </span>
                <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="SiteJabber">
                  <img src="/next/img/logos/sj.svg" alt="SiteJabber" width="32" height="32" loading="lazy" />
                </span>
              </div>
              <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">
                Emma T.:
              </div>
              <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">
                My supervisor kept rejecting my methodology section, saying it lacked clarity. These guys helped restructure the analysis and justify every choice properly. Thanks, I finally got approval.
              </p>
              <div className="flex items-center justify-between pt-3">
                <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">Data Analysis</span>
                <span className="text-[14px] text-[#7b7b7b]">April 18, 2026</span>
              </div>
            </div>

            <ReviewVideoCard 
              videoSrc="/w3t_img/ugc/u-review-1"
              posterSrc="/w3t_img/ugc/u-review-1.webp"
              discipline="GIS"
              score="10"
              wrapperClass="col-span-12 sm:col-span-6 lg:col-span-4"
            />

            <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
              <div className="flex gap-2 mb-2 items-center justify-between">
                <span className="subtitle inline-flex items-center gap-1">
                  <Star size={24} fill="#FFB300" strokeWidth={0} />
                  <b>5</b> <span className="text-[#424242]">/5</span>
                </span>
                <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="ResellerRatings">
                  <img src="/next/img/logos/reseller-ratings.svg" alt="ResellerRatings" width="22" height="22" loading="lazy" />
                </span>
              </div>
              <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">
                NoahJoys:
              </div>
              <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">
                My GIS analysis output was messy and hard to interpret. These guys cleaned it up, made the logic clear, and helped me explain the results with confidence. I got a better grade than expected.
              </p>
              <div className="flex items-center justify-between pt-3">
                <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">GIS</span>
                <span className="text-[14px] text-[#7b7b7b]">2026-04-17</span>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {showMoreReviews && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-4"
              >
                <div className="grid grid-cols-12 gap-4 mt-6">
                  {/* Additional Reviews logic mapping matching layout */}
                  <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>5</b> <span className="text-[#424242]">/5</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="SiteJabber">
                        <img src="/next/img/logos/sj.svg" alt="SiteJabber" width="32" height="32" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">Natalie B.:</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">BoffinGlobal delivered a GIS project that exceeded my expectations. It was well-structured, technically accurate, and easy to understand.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">GIS</span>
                      <span className="text-[14px] text-[#7b7b7b]">December 31, 2025</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>5</b> <span className="text-[#424242]">/5</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="ResellerRatings">
                        <img src="/next/img/logos/reseller-ratings.svg" alt="ResellerRatings" width="22" height="22" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">juliamccartyy:</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">I received a great Python assignment that was coherent, well-documented, and full of relevant logic. BoffinGlobal really helped me understand the task and improved my own coding approach. Delivery was on time too.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">Python</span>
                      <span className="text-[14px] text-[#7b7b7b]">2025-11-21</span>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-6 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>10</b> <span className="text-[#424242]">/10</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="BoffinGlobal">
                        <img src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal logo" width="29" height="26" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">Client: #61425</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">I am not a newbie to BoffinGlobal, and have ordered multiple technical drawings and models, so I can surely say that structured outputs and precise attention to detail are their superpower. The best service!</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">AutoCAD</span>
                      <span className="text-[14px] text-[#7b7b7b]">Apr 13, 2026</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-8 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>5</b> <span className="text-[#424242]">/5</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="SiteJabber">
                        <img src="/next/img/logos/sj.svg" alt="SiteJabber" width="32" height="32" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">Elijah P.:</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">I had zero understanding of SPSS, but they helped interpret the data and explain the results section. Perfect! Will order again for sure.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">SPSS</span>
                      <span className="text-[14px] text-[#7b7b7b]">April 10, 2026</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>4</b> <span className="text-[#424242]">/5</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="ResellerRatings">
                        <img src="/next/img/logos/reseller-ratings.svg" alt="ResellerRatings" width="22" height="22" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">BenjaminMiller:</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">The statistical model I had built was inconsistent, but the writer reshaped the analysis into something that actually fits the requirements.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">R Studio</span>
                      <span className="text-[14px] text-[#7b7b7b]">2026-04-14</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>9</b> <span className="text-[#424242]">/10</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="BoffinGlobal">
                        <img src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal logo" width="29" height="26" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">Client: #38923</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">This might be the best company I’ve tried using so far. The delivery is super fast and the technical explanation was extremely clear.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">MATLAB</span>
                      <span className="text-[14px] text-[#7b7b7b]">Oct 10, 2025</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>5</b> <span className="text-[#424242]">/5</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="SiteJabber">
                        <img src="/next/img/logos/sj.svg" alt="SiteJabber" width="32" height="32" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">Antoine A.:</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">Everything was done in a timely manner and with professionalism. The calculations and documentation were clear and well-structured.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">Engineering</span>
                      <span className="text-[14px] text-[#7b7b7b]">November 29, 2025</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>5</b> <span className="text-[#424242]">/5</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="ResellerRatings">
                        <img src="/next/img/logos/reseller-ratings.svg" alt="ResellerRatings" width="22" height="22" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">emersonharris:</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">I ordered a technical report, and it was delivered quickly. The analysis was clear, structured, and easy to follow. BoffinGlobal really saved me time and matched the requirements I had in mind. Definitely worth it.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">Data Analysis</span>
                      <span className="text-[14px] text-[#7b7b7b]">2025-11-14</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>8</b> <span className="text-[#424242]">/10</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="BoffinGlobal">
                        <img src="/next/img/logos/boffinglobal-small.svg" alt="BoffinGlobal logo" width="29" height="26" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">Client: #37999</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">This service is my go-to place whenever I need programming help or troubleshooting very quickly.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">Java</span>
                      <span className="text-[14px] text-[#7b7b7b]">Sep 13, 2025</span>
                    </div>
                  </div>

                  <div className="col-span-12 sm:col-span-6 lg:col-span-3 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>5</b> <span className="text-[#424242]">/5</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="SiteJabber">
                        <img src="/next/img/logos/sj.svg" alt="SiteJabber" width="32" height="32" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">Raegan M.:</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">BoffinGlobal nailed my data science project. It had solid analysis and felt professionally done. I didn't expect it to be this polished, honestly.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">Data Science</span>
                      <span className="text-[14px] text-[#7b7b7b]">November 18, 2025</span>
                    </div>
                  </div>

                  <div className="col-span-12 lg:col-span-6 flex flex-col bg-white rounded-[12px] p-4 border border-solid border-[#dde6ef] shadow-sm">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center gap-1">
                        <Star size={24} fill="#FFB300" strokeWidth={0} />
                        <b>5</b> <span className="text-[#424242]">/5</span>
                      </span>
                      <span className="flex items-center justify-center rounded-full bg-[#f1f5f9] w-12 h-12" title="ResellerRatings">
                        <img src="/next/img/logos/reseller-ratings.svg" alt="ResellerRatings" width="22" height="22" loading="lazy" />
                      </span>
                    </div>
                    <div className="uppercase text-[#5c80ab] text-[14px] font-semibold mb-2">malcolmhoward:</div>
                    <p className="regular flex-1 text-[#424242] text-[14px] leading-relaxed">Used this service for a SQL database assignment. The logic and queries were strong, though one edge case needed a quick correction. They fixed it promptly. Overall, a smooth and worthwhile experience.</p>
                    <div className="flex items-center justify-between pt-3">
                      <span className="text-[12px] uppercase text-[#424242] font-semibold border border-solid border-[#e1e1e1] rounded-lg py-1 px-2.5">SQL</span>
                      <span className="text-[14px] text-[#7b7b7b]">2025-09-06</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center mt-6">
            <button 
              onClick={() => setShowMoreReviews(!showMoreReviews)}
              className="inline-flex items-center gap-2 text-[#0080d1] text-[14px] font-semibold hover:text-[#0050b5] transition-colors bg-transparent border-none cursor-pointer" 
              aria-expanded={showMoreReviews}
            >
              <span>{showMoreReviews ? 'Show less' : 'View more reviews'}</span>
              <svg className={`transition-transform ${showMoreReviews ? 'rotate-180' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Section 7: CTA Banner */}
      <section className="py-8 animate-appear-0 mx-4">
        <div className="max-w-[1150px] mx-auto rounded-[12px] pb-8 sm:pl-[196px] pt-[158px] sm:pt-8 relative sm:px-8 flex items-center shadow-lg flex-col sm:flex-row gap-4 border border-[#f1f5f9] border-solid bg-white">
          <img 
            className="-mt-16 absolute top-[70px] left-0 right-0 mx-auto sm:row-auto sm:mx-0 sm:top-auto sm:bottom-0 sm:left-8" 
            src="/next/img/illustration/shark-cta-default.svg" 
            alt="" 
            width="151" 
            height="143" 
            loading="lazy" 
          />
          <h2 className="mb-0 grow text-center sm:text-left text-[22px] md:text-[31px] font-bold text-[#424242] leading-[26px] md:leading-[31px]">
            Get assignment support to avoid stress and meet deadlines!
          </h2>
          <Link 
            to="/order" 
            aria-label="Try BoffinGlobal"
            className="flex items-center justify-center font-bold text-[18px] leading-[20px] bg-[#ff8b00] text-white hover:bg-[#ff9a00] border-[2px] border-solid border-[#ff8b00] hover:border-[#ff9a00] rounded-[100px] px-[40px] py-[11px] w-fit transition-colors shrink-0"
          >
            Try BoffinGlobal
          </Link>
        </div>
      </section>

      {/* Section 8: Featured In Logo Row */}
      <FeaturedLogos />

      {/* Section 8: Social Followings Grid */}
      <SocialFollowings />

      {/* Section 9 & 10: Dense Informational prose area and Comparison Table */}
      <InformationalProse />

      {/* Section 11: Real-time Tab Selector (Type of Paper vs Disciplines) */}
      <ServicesTabs />

      {/* Accordion FAQ Area */}
      <section id="faq" className="py-8 bg-white border-b border-slate-200 font-['Open_Sans',sans-serif]">
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }} 
        />
        <div className="container animate-appear-0 max-w-[1150px] mx-auto px-4">
          <h2 className="text-center max-w-[750px] mx-auto text-[22px] md:text-[28px] font-bold text-[#424242] mb-8 font-['Lato',sans-serif]">
            FAQ
          </h2>
          <div className="faqs grid gap-6 grid-cols-1 justify-center md:grid-cols-[1fr_264px] lg:grid-cols-[656px_264px]">
            <div>
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index} 
                    className={`accordion__item border-b border-solid border-slate-100 py-4 ${isOpen ? 'accordion__item--active' : ''}`}
                  >
                    <div 
                      role="button" 
                      onClick={() => toggleFaq(index)} 
                      className="accordion__item-button js--accordion text-left w-full flex justify-between items-center cursor-pointer py-1" 
                      id={`trigger-${index}`} 
                      aria-controls={`panel-${index}`} 
                      aria-expanded={isOpen}
                    >
                      <h2 className="text-[20px] md:text-[24px] font-bold text-[#424242] leading-[1.5] transition-colors grow mb-0 font-['Lato',sans-serif]">
                        {faq.question}
                      </h2>
                      <svg 
                        className={`accordion__chevron shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0080d1]' : 'text-[#7b7b7b]'}`} 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <mask style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                          <rect width="24" height="24" fill="#D9D9D9"></rect>
                        </mask>
                        <path d="M7.4 15.3751L6 13.9751L12 7.9751L18 13.9751L16.6 15.3751L12 10.7751L7.4 15.3751Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    {isOpen && (
                      <div 
                        className="accordion__item-content caption text-[#5e5e5e] pt-3 text-[16px] leading-[26px] font-['Open_Sans',sans-serif]" 
                        id={`panel-${index}`} 
                        aria-labelledby={`trigger-${index}`}
                      >
                        <p className="min-h-0 mb-0">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center p-4 h-fit bg-[#0050b5] text-white rounded-[12px] text-center">
              <span className="variant-h3 font-['Lato',sans-serif] text-[20px] font-bold mb-3">
                Do you have any questions left?
              </span>
              <img 
                className="max-w-[200px] sm:max-w-[100%]" 
                src="/next/img/illustration/shark-support.svg" 
                alt="" 
                loading="lazy" 
                width="362" 
                height="397" 
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

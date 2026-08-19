import React, { useRef, useState, useEffect } from 'react';
import { CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';
import educationImg from '../assets/trusted-logos/education.png';
import GrammarCheckerServices from './GrammarCheckerServices';
import GrammarCheckerOtherTools from './GrammarCheckerOtherTools';
import GrammarCheckerProfessionalProofreaders from './GrammarCheckerProfessionalProofreaders';
import GrammarCheckerSteps from './GrammarCheckerSteps';
import GrammarCheckerFeatures from './GrammarCheckerFeatures';

export default function GrammarCheckerContent() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTop = useRef(0);

  const tableData = [
    {
      feature: "Speed",
      automated: "Instant, real-time feedback as you type.",
      professional: "Usually requires 12–24 hours for a deep review."
    },
    {
      feature: "Common Errors",
      automated: "Detects typos, basic punctuation, and subject-verb agreement.",
      professional: "Identifies subtle nuances, tone shifts, and logical inconsistencies."
    },
    {
      feature: "Sentence Structure",
      automated: "Uses algorithms to correct the sentence based on standard rules.",
      professional: "Refines flow and ensures proper grammar for academic contexts."
    },
    {
      feature: "Cost",
      automated: "Grammar check free of charge for all students.",
      professional: "Premium service involving subject-matter experts."
    },
    {
      feature: "Best Used For",
      automated: "Quick essays, emails, and initial assignment drafts.",
      professional: "Dissertations, research papers, and final admissions essays."
    },
    {
      feature: "Academic Integrity",
      automated: "Ensures human-written content remains grammatically sound.",
      professional: "Provides a final English grammar check for 100% accuracy. Use our paper checker tool for assurity."
    }
  ];

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
    <section className="pt-4 pb-0 w-full overflow-hidden">
      
      <GrammarCheckerSteps />
      
      <GrammarCheckerFeatures />

      {/* Expanding the proofreaders component requires taking it out of the container so its background extends full width. It manages its own internal max-w-7xl  */}
      <GrammarCheckerProfessionalProofreaders />

      <div className="bg-[#f8f9fa] sm:bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <GrammarCheckerOtherTools />

          <GrammarCheckerServices />
        
        {/* Banner Section */}
        <div className="w-full bg-[#eef5ff] rounded-xl py-6 px-6 md:py-8 md:px-12 mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <div className="w-full md:w-[35%] flex justify-center md:justify-start">
            <img 
              src={educationImg} 
              alt="Education items like graduation cap, microscope, and compass" 
              className="max-w-[200px] lg:max-w-[260px] w-full object-contain mix-blend-multiply"
            />
          </div>
          <div className="w-full md:w-[65%] text-center md:text-left">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#333333] tracking-tight leading-[1.2] mb-3">
              Transform a Free Grammar Check into a Learning Prospect
            </h2>
            <p className="text-[#666666] text-sm md:text-base mb-6 leading-relaxed">
              Improve your writing with our free online grammar checker. Correct sentences and ensure your academic work meets the highest standards.
            </p>
            <button className="bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white font-bold py-2.5 px-6 rounded transition-colors w-full md:w-auto shadow-sm text-sm">
              Enhance Your Learning
            </button>
          </div>
        </div>

        <div className="w-full border-y-2 border-emerald-500 py-8 px-4 md:px-8 relative h-auto md:h-[500px] lg:h-[450px] overflow-hidden bg-white">
          
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full h-full overflow-y-auto custom-scrollbar pr-0 md:pr-18"
          >
            
            {/* Left Side: Text */}
            <div className="flex-1 w-full lg:w-1/2">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#333333] mb-6 tracking-tight leading-tight">
                Free Grammar Check: Easily Fix Your Grammar Mistakes
              </h2>

              <div className="space-y-4 text-[#666666] text-sm leading-relaxed">
                <p>
                  Navigating the demands of global higher education means your writing must be sharp and professional. Whether you are a high schooler finishing an essay or a grad student polishing a thesis, a reliable free grammar check is essential.
                </p>
                <p>
                  Our grammar checker is designed to act as your personal editor, helping you check for grammar mistakes that could cost you a letter grade. We know that when you're on a deadline, you need an online grammar checker that works instantly.
                </p>
                <p>
                  You can check grammar for free and get immediate feedback to fix my grammar or correct my sentence without any complex software.
                </p>
                <p>
                  Our English grammar checker does more than just spot typos; it provides a full grammar correction to ensure your ideas are clear. If you find yourself thinking, "I need to check my grammar before I hit submit," our platform is the answer.
                </p>
                <p>
                  It allows you to check grammar online and provides a correct grammar check for every paragraph or paraphrasing content. Even if you accidentally type grammar check or search for an online grammar check, our smart system recognizes your needs.
                </p>
                <p>
                  It helps you correct the grammar in your drafts and check the English grammar standards used in leading universities globally. From a quick English grammar check to a deep dive into your syntax, we help you correct this sentence or an entire paper so it is grammatically correct and ready for grading.
                </p>
              </div>

              <h3 className="text-xl font-bold text-[#333333] mt-8 mb-4 tracking-tight">Common Grammar Mistakes Our Tool Fixes</h3>
              <div className="space-y-4 text-[#666666] text-sm leading-relaxed">
                <p>
                  High-stakes academic writing requires more than just a spell-checker. To help you correct the grammar in complex assignments, our tool identifies and fixes the three most frequent errors that affect international student grades:
                </p>
                <ul className="space-y-4 my-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span><strong>Comma Splices:</strong> This occurs when two independent sentences are joined by only a comma. For example, "I finished the research, I started the draft." Our online grammar checker fixes this by suggesting a semicolon or a period to create two distinct, grammatically correct thoughts.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span><strong>Subject-Verb Agreement:</strong> In academic papers, the subject and verb must match in number. A common mistake is, "The collection of samples were analyzed." Our English sentence corrector flags this, suggesting the singular "was" to ensure your technical reports are professional and accurate.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
                    <span><strong>Dangling Modifiers:</strong> These occur when a descriptive phrase doesn't clearly link to a subject, such as, "After reading the study, the results were clear." Technically, the results didn't read the study.</span>
                  </li>
                </ul>
                <p>
                  Our proper sentence checker helps you restructure the sentence to: "After reading the study, I found the results were clear," maintaining a natural, human-written flow. By addressing these structural nuances, you can check for grammar mistakes that automated autocorrect often misses, ensuring your work meets the rigorous standards of global higher education.
                </p>
              </div>

              <h3 className="text-xl font-bold text-[#333333] mt-8 mb-4 tracking-tight">Why Use Your Free Online Grammar Checker to Correct My Grammar?</h3>
              <div className="space-y-4 text-[#666666] text-sm leading-relaxed">
                <p>
                  Choosing the right tool to correct my grammar can be the difference between an A and a B. Our platform stands out because it integrates a grammar check and word count feature, which is vital for meeting specific assignment requirements.
                </p>
                <p>
                  We also offer a specialized pdf grammar check, allowing you to upload your finalized documents for a last-minute English grammar correction. If you've ever asked, "Is the sentence grammatically correct?", our tool gives you the definitive answer.
                </p>
                <p>
                  We provide a proper sentence checker experience that looks at the context of your writing, ensuring that you correct this sentence in a way that makes sense for your specific subject area.
                </p>
                <p>
                  Many students search for "please correct this sentence" or "please correct the sentence online" when they are stuck. Our grammar checker free and grammar check free services are designed to handle those exact moments of frustration.
                </p>
                <p>
                  We offer a word counter and grammar check to help you stay within your limits while ensuring your English grammar is flawless. Whether you need a grammar check free online, a sentence grammar check, or a grammar check online free, we provide a comprehensive suite of tools like report writing as well.
                </p>
                <p>
                  From the free grammar (misspelling) searchers to the grammar corrector free power users, everyone finds value here. Use our free online grammar checker to check grammar for sentence variety and ensure your work is grammatically correct before your professor sees it.
                </p>
              </div>
            </div>

            {/* Middle divider for desktop */}
            <div className="hidden lg:block w-[1px] bg-slate-200 shrink-0 self-stretch min-h-max"></div>

            {/* Right Side: Table and Right Text */}
            <div className="flex-1 w-full lg:w-1/2">
              
              <div className="space-y-4 text-[#666666] text-sm leading-relaxed mb-8">
                <h3 className="text-xl font-bold text-[#333333] mb-4 tracking-tight">Who Benefits From Our Grammar Checking App?</h3>
                <p>
                  Our free grammar checker online is built for every level of the academic journey. Freshmen often use our sentence checker to transition from high school writing to college-level expectations.
                </p>
                <p>
                  They often search for a grammar and punctuation checker to help them correct my grammar during those first few semesters. Meanwhile, post-grad students rely on our english sentence corrector and sentence corrector to maintain a professional tone in their research.
                </p>
                <p>
                  For international students, mastering localized nuances is a major hurdle. Our English sentence corrector acts as a bridge, helping you check English grammar for specific university requirements so your assignments read naturally and professionally.
                </p>
                
                <h4 className="font-bold text-[#333333] mt-6 mb-2">We have all the expert referencing help:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                  {['Oxford Referencing', 'APA Referencing', 'Vancour Referencing', 'Harvard Referencing', 'MLA Referencing', 'Chicago Referencing', 'OSCLA Referencing'].map((ref, idx) => (
                    <div key={idx} className="bg-slate-50 py-2 px-3 rounded border border-slate-200 text-center font-medium text-xs text-emerald-500">
                      {ref}
                    </div>
                  ))}
                </div>

                <p>
                  If you need to fix this sentence to make it sound more academic, our paragraph checker and sentence checker free options provide the guidance you need. International students finding their footing in new academic environments find our english grammar check online especially helpful for mastering localized nuances.
                </p>
                <p>
                  They can check grammar online free and use our grammar corrector free tool to ensure their work sounds like it was written by a native speaker. Whether you are looking for a free online grammar checker for a creative writing class or a sentence corrector free for a lab report, our app fits your workflow.
                </p>
              </div>

              <div className="space-y-4 text-[#666666] text-sm leading-relaxed mb-8">
                <h3 className="text-xl font-bold text-[#333333] mb-4 tracking-tight">Why Is Our Online Grammar Check Beneficial for All?</h3>
                <p>
                  In the competitive world of top global universities, clarity is everything. Using an online grammar check gives you an edge by eliminating distracting errors. Our free grammar and spell check identifies issues that standard word processors often miss. Instead of a basic scan, you get a grammatical errors checker that evaluates your logic and tone.
                </p>
                <p>
                  When you need to correct the sentence or correct my sentence, you don't just want a red underline; you want to understand the "why" behind the fix. Our grammar checker free online offers proper grammar for this sentence explanation to help you become a better writer over time.
                </p>
              </div>

              <h2 className="text-2xl font-extrabold text-[#333333] mb-6 tracking-tight leading-tight">
                Automated Grammar Check vs. Professional Proofreading
              </h2>
              
              <div className="overflow-x-auto w-full mb-10 -mx-4 px-4 md:mx-0 md:px-0">
                <table className="w-full text-sm md:text-sm text-left border-collapse border border-slate-200 min-w-[500px] md:min-w-0">
                  <thead className="bg-[#f8f9fa]">
                    <tr>
                      <th className="border border-slate-200 p-2 md:p-4 font-bold text-[#333333]">Feature</th>
                      <th className="border border-slate-200 p-2 md:p-4 font-bold text-[#333333]">Automated Grammar Checker</th>
                      <th className="border border-slate-200 p-2 md:p-4 font-bold text-[#333333]">Professional Proofreading</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#666666]">
                    {tableData.map((row, idx) => (
                      <tr key={idx}>
                        <td className="border border-slate-200 p-2 md:p-4">{row.feature}</td>
                        <td className="border border-slate-200 p-2 md:p-4">{row.automated}</td>
                        <td className="border border-slate-200 p-2 md:p-4">{row.professional}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-4 text-[#666666] text-sm leading-relaxed mb-8">
                <p>
                  While many students rely on basic word processor 'autocorrect,' those tools often miss contextual nuances. Our proper sentence checker goes beyond typos to evaluate the logic of your arguments, ensuring you correct the grammar in a way that preserves your unique voice while meeting strict international academic standards
                </p>
                <p>
                  For those looking for a free grammar checker online, we provide a premium-level experience without the cost. It acts as a grammar sentence check and a sentence grammar checker to ensure your subject-verb agreement and tense usage are perfect.
                </p>
                <p>
                  If you are rushing to check grammar for sentence structures before a midnight deadline, our grammar checker online is always available. We provide grammar correction online that is 100% accurate, helping you check grammar online free whenever inspiration strikes.
                </p>
                <p>
                  Our free grammar checker and free sentence checker tools are not just about fixing errors; they are about boosting your confidence so that every paper you turn in is a reflection of your true potential.
                </p>
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
      </div>
      
      {/* Custom Scrollbar CSS for this specific section */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888; 
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555; 
        }
      `}</style>
    </section>
  );
}

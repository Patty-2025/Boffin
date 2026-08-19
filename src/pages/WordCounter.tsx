import React, { useState } from 'react';
import { Loader2, Play, Hash, BookOpen, Clock, Target, ShieldCheck, Award, PenTool, Lightbulb, Settings, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import nlp from 'compromise';
import TrustedLogos from '../components/TrustedLogos';
import ProfessionalWriters from '../components/ProfessionalWriters';
import HowItWorks from '../components/HowItWorks';
import AssignmentTopicsSection from '../components/AssignmentTopicsSection';
import FreeWritingTools from '../components/FreeWritingTools';
import ComparisonSection from '../components/ComparisonSection';
import FAQSection from '../components/FAQSection';
import ServicesDetailSection from '../components/ServicesDetailSection';
import { LinkTarget } from '../lib/linkUtils';

const WORD_COUNTER_LINKS: LinkTarget[] = [
  { word: 'word counter', type: 'link', path: '/word-counter' },
  { word: 'readability indices', type: 'highlight' },
  { word: 'syllable counts', type: 'highlight' },
  { word: 'academic perfection', type: 'highlight' }
];

// Import the local syllable library
import { syllable } from '../vendor/syllable/syllable-main/index.js';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProcess = () => {
    if (!text.trim()) {
      setError('Please enter some text first.');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const doc = nlp(text);
      const sentences = doc.sentences().out('array');
      const wordsArray = doc.terms().out('array');
      
      const wordCount = wordsArray.length;
      const sentenceCount = sentences.length || 1;
      const characterCount = text.length;
      
      let totalSyllables = 0;
      let complexWordCount = 0;
      
      wordsArray.forEach((word) => {
        const count = syllable(word);
        totalSyllables += count;
        if (count >= 3) complexWordCount++;
      });
      
      const readingEase = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (totalSyllables / wordCount);
      const gradeLevel = 0.39 * (wordCount / sentenceCount) + 11.8 * (totalSyllables / wordCount) - 15.59;
      const gunningFog = 0.4 * ((wordCount / sentenceCount) + 100 * (complexWordCount / wordCount));
      const smogIndex = 1.0430 * Math.sqrt(complexWordCount * (30 / sentenceCount)) + 3.1291;
      const readingTimeMinutes = Math.ceil(wordCount / 200);

      setResult({
        wordCount,
        characterCount,
        sentenceCount,
        estimatedReadingTime: `${readingTimeMinutes} min`,
        totalSyllables,
        complexWordCount,
        readingEase: readingEase.toFixed(1),
        gradeLevel: gradeLevel.toFixed(1),
        gunningFog: gunningFog.toFixed(1),
        smogIndex: smogIndex.toFixed(1)
      });
    } catch (err: any) {
      setError('Error analyzing text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-[80px] bg-[#f8f9fa] font-sans">
      {/* Hero Section Container */}
      <section className="relative bg-white pt-6 pb-6 lg:pt-10 lg:pb-12 overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center lg:items-start relative z-10 px-4 sm:px-6 gap-8 lg:gap-16">
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.10]">
              <span className="text-emerald-500 block">Premium</span>
              <span className="text-blue-700 block">Word & Character</span>
              <span className="text-blue-700 block">Count Analysis</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-6 sm:mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0 px-4 sm:px-0">
              Count words, characters, and sentences with precision. Our advanced engine provides Flesch-Kincaid readability scores for academic perfection.
            </p>
            
            <TrustedLogos />
          </div>
          
           {/* Tool Widget */}
           <div className="w-full lg:w-1/2 flex items-start justify-center lg:justify-end relative px-2 sm:px-0">
              <div className="bg-[#f0e6d2] p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-2xl relative border border-slate-100">
                <div className="bg-white rounded-lg p-5 sm:p-6 w-full border border-slate-100">
                  <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your assignment here to analyze word count, characters, and readability..."
                    rows={8}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-emerald-500 transition-all text-sm font-medium resize-none mb-4"
                  ></textarea>

                  <div className="flex gap-3">
                    <button onClick={() => setText('')} className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs transition-all">Clear</button>
                    <button 
                      onClick={handleProcess}
                      disabled={loading}
                      className="flex-1 py-4 bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-emerald-600 hover:to-blue-700 text-white rounded-xl font-extrabold text-xs transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-widest"
                    >
                      {loading ? <Loader2 className="animate-spin" size={16}/> : <Play size={16}/>} Analyze Document
                    </button>
                  </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Results Section */}
      {result && (
        <section className="py-12 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
            >
              {[
                { label: "Words", value: result.wordCount },
                { label: "Sentences", value: result.sentenceCount },
                { label: "Complex Words", value: result.complexWordCount, highlight: true },
                { label: "Readability", value: result.readingEase, highlight: true },
                { label: "Grade Level", value: result.gradeLevel },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[30px] shadow-xl border border-slate-100 text-center">
                  <p className="text-xs font-black uppercase text-slate-400 mb-2">{stat.label}</p>
                  <p className={`text-3xl font-black ${stat.highlight ? 'text-emerald-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600'}`}>{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <ProfessionalWriters title="Academic Quality Monitors" />
      <HowItWorks 
        title="Deep Analysis in 3 Simple Steps"
        steps={[
          { title: "Paste Your Document", description: "Insert your text into the analysis box. We support long-form essays and dissertations.", icon: Hash },
          { title: "Analyze Readability", description: "Our engine uses NLP to calculate Flesch Reading Ease and SMOG indices for you.", icon: BookOpen },
          { title: "Refine Your Content", description: "Review your syllable counts and grade level scores to ensure your work hit the 'sweet spot'.", icon: ShieldCheck }
        ]}
      />

      <ServicesDetailSection 
        title="Mastering Word Counts & Readability"
        subtitle="Adhering to word count limits is just the beginning. Our tool provides a deep-dive analysis into the complexity of your scholarship."
        linkTargets={WORD_COUNTER_LINKS}
        writingBox={{
          title: "Intensive Syllable & Word Analysis",
          icon: PenTool,
          description: "Our syllable analyzer breaks down complex words, providing the raw data needed for the world's most rigorous readability formulas.",
          points: ["Complex word (3+ syllables) detection", "Accurate total word & character counts", "Average sentence length tracking", "Paragraph-level structure analysis"]
        }}
        solvingBox={{
          title: "Readability & Formality Indices",
          icon: Lightbulb,
          theme: 'accent',
          description: "Ensure your paper is neither too simplistic nor overly complex with Gunning Fog and SMOG scores, tailored for global universities.",
          points: ["Flesch-Kincaid Grade Level mapping", "SMOG Index for academic papers", "Gunning Fog business formality check", "Regional dialect complexity awareness"]
        }}
        moreBox={{
          title: "Grade Penalty & Goal Shield",
          icon: Settings,
          description: "Avoid deductions and meet university rubrics with perfectly tracked length requirements and estimated scholarly reading times.",
          points: ["Target Word-Count progress tracking", "Estimated scholarly reading time", "Abstract vs Body length monitoring", "Academic integrity length verify"]
        }}
      />

      <AssignmentTopicsSection />
      <FreeWritingTools />
      <ComparisonSection />

      {/* Extreme Footer SEO Block */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-[1000px] mx-auto text-center">
           <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-8 leading-tight">Why Accurately Counting Words Matters</h2>
           <div className="prose prose-slate max-w-none text-slate-500 font-medium space-y-6 text-lg leading-relaxed">
             <p>
               Every university across the globe—from Harvard in the US to Oxford in the UK—has strict word count penalties. Submitting a paper that is too short suggests a lack of research, while exceeding the limit by more than 10% often leads to grade deductions.
             </p>
             <p>
               Our tool eliminates the guesswork. By using our advanced analytics, you can fine-tune your paragraphs to hit that "sweet spot" of academic excellence. Trust boffinglobalgroup.com for all your academic writing tools.
             </p>
           </div>
        </div>
      </section>

      <FAQSection />
    </main>
  );
}

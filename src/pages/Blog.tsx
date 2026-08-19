import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Calendar, 
  Clock,
  Search, 
  Mail, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Cpu, 
  Filter,
  Check,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustedLogos from '../components/TrustedLogos';
import SEO from '../components/SEO';
import { articles } from '../data/articles';

// Dynamic simulated AI queries for our AI Study Companion
interface AIQueryResponse {
  title: string;
  outline: string[];
  recommendationId: string;
}

const AI_STUDY_QUERIES: Record<string, AIQueryResponse> = {
  'apa-7th': {
    title: 'APA 7th Edition Synthesis Guide',
    outline: [
      'In-text Citations: Use "Author & Author, Year" format. For 3+ authors, use "First Author et al., Year" immediately.',
      'Reference List: Always supply DOIs where available. Omit "Retrieved from" unless a retrieval date is strictly mandatory.',
      'Formatting Parameters: Standardize on 1-inch margins, double-spacing, and clear heading level hierarchies.'
    ],
    recommendationId: 'how-to-write-thesis-statement'
  },
  'methodology': {
    title: 'Methodological Selection Matrix',
    outline: [
      'Quantitative: Focuses on causal relationships, large-scale statistical validation (using software like SPSS or R).',
      'Qualitative: Deep contextual inquiry via semi-structured interviews and thematic analysis (e.g., using NVivo).',
      'Triangulation: Combining both models (Mixed Methods) guarantees the highest grade of defensive academic validation.'
    ],
    recommendationId: 'dissertation-research-methodology'
  },
  'procrastination': {
    title: 'Cognitive Offloading & Time Mastery',
    outline: [
      'Spaced Repetition: Break coursework into discrete units and review over 1-day, 3-day, and 7-day intervals.',
      'Pomodoro Blockers: Work in uninterrupted 25-minute sprints. Take active 5-minute pauses to restore cognitive focus.',
      'Biological Priming: Prioritize sleep over late night study; executive cognitive function falls by 30% after 18 hours awake.'
    ],
    recommendationId: 'surviving-finals-week'
  },
  'admissions': {
    title: 'Ivy League & Oxbridge Strategy Model',
    outline: [
      'Narrative Hooks: Avoid generic opening lines. Begin with an active, high-impact situational vignette.',
      'Academic Integration: Explicitly state the faculty researchers, laboratory resources, and journals matching your focus.',
      'Critical Reflection: Show deep intellectual curiosity and vulnerability instead of merely repeating your academic CV.'
    ],
    recommendationId: 'oxbridge-admission-essays'
  }
};

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // AI Study Companion State
  const [activeAIKey, setActiveAIKey] = useState<string>('apa-7th');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiCompletedOutput, setAiCompletedOutput] = useState<AIQueryResponse>(AI_STUDY_QUERIES['apa-7th']);
  
  // Newsletter State
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Extract all distinct categories
  const categories = useMemo<string[]>(() => {
    const list = new Set(
      articles
        .map((article) => article.category)
        .filter((category): category is string => Boolean(category))
    );

    return ['All', ...Array.from(list)];
  }, []);

  // Filtered articles list based on search and category tabs
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (article.category || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAIQuerySelect = (key: string) => {
    setActiveAIKey(key);
    setAiLoading(true);
    setTimeout(() => {
      setAiCompletedOutput(AI_STUDY_QUERIES[key]);
      setAiLoading(false);
    }, 400);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setIsSubscribed(true);
      setEmail('');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800" style={{
      WebkitTextSizeAdjust: '100%',
      tabSize: 4,
      lineHeight: 1.5,
      fontFamily: 'var(--font-sans, "Open Sans", sans-serif)'
    }}>
      <SEO 
        title="Paper Writing Guides & Academic Blog | BoffinGlobal™" 
        description="Explore expert research guides, citation rules, formatting tutorials, and academic tips written by professional academic scholars." 
      />

      {/* Hero Header Section matching requested styles */}
      <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-100 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0f0f9] text-[#0080d1] text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Knowledge Base</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight font-display">
            Paper Writing Guides<br />from BoffinGlobal™ Scholars
          </h1>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Find expert advice, rigorous writing guides, and detailed topic lists to sharpen your academic research skills. 
            Backed by our <Link to="/" className="text-[#0080d1] hover:underline font-semibold">professional paper writing service</Link>.
          </p>

          {/* Search Form */}
          <div className="max-w-2xl mx-auto pt-4">
            <div className="relative flex flex-col sm:flex-row items-center gap-3 bg-white p-2 rounded-2xl shadow-xl border border-slate-100">
              <div className="relative flex items-center flex-1 w-full pl-3">
                <Search className="w-5 h-5 text-slate-400 mr-2 shrink-0" />
                <input 
                  type="text"
                  placeholder="Search guides on APA format, thesis statements, literature reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 bg-transparent text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
                />
              </div>
              <button 
                type="button" 
                className="w-full sm:w-auto bg-[#0080d1] hover:bg-[#004695] text-white font-bold py-3 px-8 rounded-xl transition shadow-sm cursor-pointer"
              >
                Search Guides
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive AI Study Companion Widget */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-[#0f1d2d] to-[#013c7e] text-white p-6 lg:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-80 h-80 bg-[#0080d1]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
              <div className="space-y-3 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#80c0e8] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Study Assistant</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight font-display">
                  Instant Academic Synthesis &amp; Outlines
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Select a core research challenge below to generate instant expert academic guidance powered by our knowledge engine.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {[
                    { key: 'apa-7th', label: 'APA 7th Guidelines' },
                    { key: 'methodology', label: 'Research Methodology' },
                    { key: 'procrastination', label: 'Overcoming Writer’s Block' },
                    { key: 'admissions', label: 'Ivy League Admissions' }
                  ].map(tab => (
                    <button
                      key={tab.key}
                      onClick={() => handleAIQuerySelect(tab.key)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        activeAIKey === tab.key 
                          ? 'bg-[#0080d1] text-white shadow-md' 
                          : 'bg-white/10 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Output Box */}
              <div className="w-full lg:w-[480px] bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl min-h-[220px] flex flex-col justify-between">
                {aiLoading ? (
                  <div className="flex flex-col items-center justify-center py-12 space-y-3">
                    <div className="w-8 h-8 border-4 border-[#0080d1] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-slate-300">Synthesizing academic guidelines...</span>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3 font-display flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-[#80c0e8]" />
                      {aiCompletedOutput.title}
                    </h3>
                    <ul className="space-y-2 mb-4">
                      {aiCompletedOutput.outline.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-relaxed">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Verified by BoffinGlobal Editors</span>
                  <Link 
                    to={`/blog/${aiCompletedOutput.recommendationId}`}
                    className="text-[#80c0e8] hover:text-white font-semibold flex items-center gap-1 hover:underline"
                  >
                    Read full guide <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Category Filter & Article Grid */}
      <section className="py-12 lg:py-16 flex-1">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-8 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat 
                    ? 'bg-[#0080d1] text-white shadow-md' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm font-bold text-slate-500">
              Showing <span className="text-slate-800">{filteredArticles.length}</span> research guides
            </p>
          </div>

          {/* Articles Grid */}
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-2">No matching guides found</h3>
              <p className="text-sm text-slate-500 mb-6">Try searching with different keywords or select another category.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-6 py-2.5 bg-[#0080d1] text-white text-xs font-bold rounded-xl hover:bg-[#004695] transition"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <motion.article 
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition flex flex-col overflow-hidden group"
                >
                  <Link to={`/blog/${article.id}`} className="block overflow-hidden relative aspect-video bg-slate-100">
                    <img 
                      src={article.image || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80'} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[11px] font-extrabold text-[#0080d1] uppercase tracking-wider shadow-sm">
                      {article.category || 'Guide'}
                    </div>
                  </Link>

                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 font-semibold">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          5 min read
                        </span>
                      </div>

                      <Link to={`/blog/${article.id}`} className="block">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0080d1] transition mb-3 leading-snug font-display">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">By {article.author}</span>
                      <Link 
                        to={`/blog/${article.id}`} 
                        className="text-xs font-bold text-[#0080d1] group-hover:text-[#004695] flex items-center gap-1 uppercase tracking-wider"
                      >
                        Learn More <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Newsletter Signup Banner */}
      <section className="py-16 bg-[#0f1d2d] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#80c0e8] text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" />
              <span>Weekly Academic Dispatch</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight font-display">
              Get Scholarship Tips &amp; Writing Guides in Your Inbox
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Join over 45,000 students receiving our weekly digests on research methodology, citation standards, and academic writing strategies.
            </p>

            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>You have successfully subscribed to the academic dispatch!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email"
                  placeholder="Enter your student email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 py-3.5 px-4 bg-white/10 border border-white/20 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#0080d1]"
                  required
                />
                <button 
                  type="submit" 
                  disabled={subscribing}
                  className="py-3.5 px-8 bg-[#0080d1] hover:bg-[#004695] text-white font-bold rounded-xl text-sm transition shadow-md cursor-pointer disabled:opacity-50"
                >
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <TrustedLogos />
    </div>
  );
}

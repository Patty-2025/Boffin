import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Calendar, User, ArrowRight, Share2, Link as LinkIcon, Check, Star } from 'lucide-react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { articles, ArticleItem } from '../data/articles';
import SEO from '../components/SEO';

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleItem | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    // Find the current article based on the URL parameter
    const foundArticle = articles.find(a => a.id === id);
    if (foundArticle) {
       setArticle(foundArticle);
       window.scrollTo(0, 0);
    } else {
      // If article not found, navigate back to blog
      navigate('/blog');
    }
  }, [id, navigate]);

  if (!article) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-700 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Find next article for "Read Next" (circular)
  const currentIndex = articles.findIndex(a => a.id === id);
  const nextArticle = articles.length > 1 
    ? articles[(currentIndex + 1) % articles.length] 
    : null;

  const handleShare = async () => {
    const shareData = {
      title: article.title,
      text: article.summary,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <main className="pt-[80px] lg:pt-[80px] min-h-screen bg-white font-sans">
      <SEO 
        title={`${article.title} | Scholars' Blog`}
        description={article.summary}
        keywords={`${article.category}, student blog, essay writing, academic guide`}
        canonicalUrl={`/article/${article.id}`}
        ogImage={article.image}
      />
      
      {/* Editorial Breadcrumb */}
      <div className="border-b border-slate-200 py-4 px-6 fixed top-[80px] left-0 right-0 bg-white/95 backdrop-blur-sm z-20 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
            <Link to="/blog" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1">
              <ArrowLeft size={14} /> Back
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-emerald-500">{article.category || 'Editorial'}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 truncate max-w-[400px] font-bold normal-case tracking-tight">{article.title}</span>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handleShare} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-700 hover:text-emerald-500 transition-colors">
               <Share2 size={14} /> Share
             </button>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <section className="pt-12 md:pt-32 pb-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold uppercase tracking-widest text-emerald-500 mb-8">
             <span>{article.category || 'Editorial'}</span>
             <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
             <span className="text-slate-500">{article.readTime || '5 min read'}</span>
             {article.rating && (
               <>
                 <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                 <span className="text-amber-500 flex items-center gap-1">
                   <Star size={13} fill="currentColor" /> {article.rating} ({article.ratingCount} reviews)
                 </span>
               </>
             )}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 leading-[1.10]">
            {article.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
            {article.summary}
          </p>
          
          <div className="flex items-center justify-center gap-6 text-sm font-bold text-slate-500 pb-12 border-b border-slate-200">
             <span className="flex items-center gap-2 text-blue-700">
               <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-emerald-500">
                 <User size={18} />
               </div>
               By {article.author || 'Editorial Team'}
             </span>
             <span className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" />{article.date}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[21/9] w-full bg-slate-100 relative overflow-hidden rounded-sm">
            <img 
              src={article.image} 
              alt={article.title} 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Detailed Content */}
      <section className="px-6 pb-24">
        <div className="max-w-[700px] mx-auto">
          {/* We updated to prose-base to keep the paragraph size small & readable. */}
          <div className="prose prose-base sm:prose-lg prose-slate prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-blue-700 prose-p:font-medium prose-p:leading-relaxed prose-p:text-slate-600 prose-a:text-emerald-500 prose-a:underline prose-a:decoration-slate-300 hover:prose-a:decoration-[10b981] prose-blockquote:border-l-4 prose-blockquote:border-blue-700 prose-blockquote:bg-slate-50 prose-blockquote:px-8 prose-blockquote:py-4 prose-blockquote:font-bold prose-blockquote:text-lg sm:prose-blockquote:text-xl prose-blockquote:text-slate-700 max-w-none">
            <Markdown remarkPlugins={[remarkGfm]}>
               {article.content}
            </Markdown>
          </div>

          <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex gap-4">
                <button 
                   onClick={copyLink}
                   className="px-6 py-3 border border-slate-200 bg-white rounded-sm flex items-center gap-2 text-slate-700 hover:border-blue-700 hover:text-blue-700 transition-colors font-bold text-xs uppercase tracking-widest"
                >
                   {linkCopied ? <><Check size={16} className="text-green-600" /> Copied!</> : <><LinkIcon size={16} /> Copy Link</>}
                </button>
             </div>
             <Link to="/contact-us" className="px-8 py-4 bg-gradient-to-br from-blue-700 to-emerald-800 text-white font-bold text-xs uppercase tracking-widest hover:bg-emerald-500 transition-colors relative flex items-center gap-4 rounded-sm">
               Consult our Experts <ArrowRight size={16} />
             </Link>
          </div>
        </div>
      </section>

      {/* Read Next Section */}
      {nextArticle && (
        <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-12 text-center">Read Next</h3>
            <Link to={`/article/${nextArticle.id}`} className="group max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
               <div className="aspect-[4/3] bg-slate-200 overflow-hidden relative rounded-sm">
                 <img src={nextArticle.image} alt={nextArticle.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" referrerPolicy="no-referrer" />
               </div>
               <div>
                  <h4 className="text-3xl md:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600 mb-6 group-hover:text-emerald-500 transition-colors leading-[1.10]">
                    {nextArticle.title}
                  </h4>
                  <p className="text-slate-600 font-medium leading-relaxed mb-6 line-clamp-3">
                    {nextArticle.summary}
                  </p>
                  <div className="text-sm font-bold uppercase tracking-widest text-slate-900 flex items-center gap-2 group-hover:text-emerald-500 transition-colors">
                    Read Article <ArrowRight size={16} />
                  </div>
               </div>
            </Link>
          </div>
        </section>
      )}

    </main>
  );
}

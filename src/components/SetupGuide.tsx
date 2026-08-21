import React, { useEffect, useState } from 'react';
import { BookOpen, Check, ChevronDown, ChevronUp, Circle, ExternalLink, Map, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type SetupGuideProps = {
  userId?: string;
  profile: { name?: string; residence?: string; country?: string; university?: string; course?: string; phone?: string };
  hasOrders: boolean;
  hasCompletedOrder: boolean;
  isEmailVerified: boolean;
};

const DISMISS_KEY = 'boffinSetupGuideDismissed';

export default function SetupGuide({ userId, profile, hasOrders, hasCompletedOrder, isEmailVerified }: SetupGuideProps) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSitemap, setShowSitemap] = useState(false);

  useEffect(() => {
    if (!userId) return;
    setIsVisible(sessionStorage.getItem(`${DISMISS_KEY}:${userId}`) !== 'true');
  }, [userId]);

  if (!userId || !isVisible) return null;

  const profileComplete = Boolean(profile.name && profile.residence && profile.country && profile.university && profile.course && profile.phone);
  const steps = [
    { label: 'Verify your email', detail: 'Unlock every portal page.', to: '/dashboard', complete: isEmailVerified },
    { label: 'Complete your profile', detail: 'Add your study and contact details.', to: '/portal/profile', complete: profileComplete },
    { label: 'Place your first order', detail: 'Start a new assignment request.', to: '/portal/place-order', complete: hasOrders },
    { label: 'Track an order', detail: 'Follow progress and deadlines.', to: '/portal/track', complete: hasOrders },
    { label: 'Review a completed solution', detail: 'Find finished work in one place.', to: '/portal/completed', complete: hasCompletedOrder }
  ];
  const sitemap = [
    { label: 'Dashboard', to: '/portal/dashboard' },
    { label: 'Place an order', to: '/portal/place-order' },
    { label: 'Track your order', to: '/portal/track' },
    { label: 'My assignments', to: '/portal/assignments' },
    { label: 'Learning resources', to: '/portal/resources' },
    { label: 'Balance and finances', to: '/portal/finances' },
    { label: 'Loyalty points', to: '/portal/loyalty' },
    { label: 'Profile settings', to: '/portal/profile' },
    { label: 'Contact support', to: '/contact-us' }
  ];
  const nextStep = steps.find((step) => !step.complete) || steps[steps.length - 1];
  const completedCount = steps.filter((step) => step.complete).length;

  const dismiss = () => {
    sessionStorage.setItem(`${DISMISS_KEY}:${userId}`, 'true');
    setIsVisible(false);
  };

  return (
    <aside className="fixed bottom-[90px] right-4 z-40 w-[min(380px,calc(100vw-2rem))] overflow-visible border border-slate-200 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.18)]" aria-label="Account setup guide">
      <button type="button" onClick={dismiss} className="absolute right-0 top-0 z-10 translate-x-1/2 -translate-y-1/2 p-1 text-slate-400 transition hover:text-slate-700" aria-label="Close setup guide" title="Close setup guide">
        <X size={16} />
      </button>
      <div className="flex items-start justify-between gap-4 px-4 py-0.5">
        <div>
          <p className="text-xs text-slate-500">{completedCount} of {steps.length} setup items complete</p>
        </div>
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setIsExpanded((expanded) => !expanded)} className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700" aria-label={isExpanded ? 'Collapse setup guide' : 'Expand setup guide'}>
            {isExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          </button>
        </div>
      </div>
      <div className="mx-4 h-1 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={completedCount}>
        <div className="h-full rounded-full bg-[#0080d1] transition-all" style={{ width: `${(completedCount / steps.length) * 100}%` }} />
      </div>
      {!isExpanded ? <Link to={nextStep.to} className="flex items-center justify-between gap-3 px-4 py-1 text-sm text-[#0080d1] transition hover:bg-sky-50"><span>Continue: {nextStep.label}</span><ExternalLink size={16} /></Link> : <>
        <div className="max-h-64 space-y-1 overflow-y-auto px-4 py-3">
          {steps.map((step) => <Link key={step.label} to={step.to} className={`flex items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-slate-50 ${location.pathname === step.to ? 'bg-sky-50' : ''}`}>
            {step.complete ? <Check size={17} className="mt-0.5 shrink-0 text-emerald-600" /> : <Circle size={17} className="mt-0.5 shrink-0 text-slate-300" />}
            <span className="min-w-0"><span className={`block text-sm font-semibold ${step.complete ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{step.label}</span><span className="block text-xs text-slate-500">{step.detail}</span></span>
          </Link>)}
        </div>
        <button type="button" onClick={() => setShowSitemap((shown) => !shown)} className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2.5 text-left text-xs font-bold text-[#0080d1] hover:bg-sky-50"><Map size={15} /> {showSitemap ? 'Hide portal sitemap' : 'View all portal pages'}</button>
        {showSitemap && <nav aria-label="Portal sitemap" className="grid grid-cols-2 gap-1 border-t border-slate-100 px-4 py-3">{sitemap.map((item) => <Link key={item.to} to={item.to} className="flex items-center gap-1.5 rounded px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50 hover:text-[#0080d1]"><BookOpen size={13} />{item.label}</Link>)}</nav>}
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3"><button type="button" onClick={dismiss} className="text-xs font-semibold text-slate-500 hover:text-slate-800">Cancel</button><Link to={nextStep.to} className="inline-flex items-center gap-2 bg-[#0080d1] px-3 py-2 text-xs font-bold text-white hover:bg-[#006db3]">Continue <ExternalLink size={14} /></Link></div>
      </>}
    </aside>
  );
}
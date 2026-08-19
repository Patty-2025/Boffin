import React from 'react';
import SEO from '../components/SEO';
import TopWritersGrid from '../components/TopWritersGrid';
import HowWeHireWriters from '../components/HowWeHireWriters';
import OtherDisciplinesWriters from '../components/OtherDisciplinesWriters';
import FindWriterCta from '../components/FindWriterCta';

export default function Writers() {
  return (
    <main className="pt-[80px] bg-[#f8f9fa] min-h-screen font-sans">
      <SEO 
        title="Our Writers | Boffin Global Services"
        description="Meet our team of professional academic writers."
        keywords="academic writers, professional essay writers"
        canonicalUrl="/writers"
      />
      <section className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden bg-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-left relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] font-display mb-4">
            BoffinGlobal's Top writers
          </h1>
          <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed max-w-2xl">
            Check out our writers' awards and ratings, and choose the most suitable writer for your order
          </p>
        </div>
      </section>

      <TopWritersGrid />
      <HowWeHireWriters />
      <OtherDisciplinesWriters />
      <FindWriterCta />
    </main>
  );
}


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, CheckCircle2, Facebook } from 'lucide-react';
import SEO from '../components/SEO';
import TrustedLogos from '../components/TrustedLogos';
import Counter from '../components/Counter';

export default function Reviews() {
  const [activeTab, setActiveTab] = useState<'reviews--shark' | 'reviews--customer-shark'>('reviews--shark');
  const [isCustomerExpanded, setIsCustomerExpanded] = useState(false);
  const [visibleOrdersCount, setVisibleOrdersCount] = useState(4);

  const latestOrders = [
    {
      id: '#341145619',
      title: 'Studying the Wrong Half of LeBron James',
      rating: 10,
      finishDate: 'Aug 14, 2026',
      details: 'Data Analysis Report · Statistics · 7 pages',
      writer: {
        name: 'ochidomarwa',
        profileUrl: '/writers/ochidomarwa',
        avatar: '/w3t_avatar/writer/355/ochidomarwax128.webp',
        rating: 9.7,
        ordersCompleted: 6063,
        progressPercent: 97,
        isOnline: false,
      },
      comment: 'A delight to work with and a lovely person 🫶❤️❤️❤️',
      descriptors: [
        'Great communication',
        'Fast responses',
        'Follows instructions',
        'Fast delivery',
        'Great writing style',
        'Great grammar',
      ],
      isGood: true,
    },
    {
      id: '#341074679',
      title: 'Cost Control Strategies and the Organizational Control Function',
      rating: 10,
      finishDate: 'Aug 14, 2026',
      details: 'Systems Design Document · Operations · 5 pages',
      writer: {
        name: 'PassionateWriter',
        profileUrl: '/writers/passionatewriter',
        avatar: '/w3t_avatar/writer/208/passionatewriterx128.webp',
        rating: 9.78,
        ordersCompleted: 1427,
        progressPercent: 98,
        isOnline: false,
      },
      comment: 'Thank you!',
      descriptors: ['Great writing style'],
      isGood: true,
    },
    {
      id: '#340679179',
      title: 'The Case for Six Permanent Colonists',
      rating: 10,
      finishDate: 'Aug 10, 2026',
      details: 'Analysis Report · Environmental Science · 4 pages',
      writer: {
        name: 'ochidomarwa',
        profileUrl: '/writers/ochidomarwa',
        avatar: '/w3t_avatar/writer/355/ochidomarwax128.webp',
        rating: 9.7,
        ordersCompleted: 6063,
        progressPercent: 97,
        isOnline: false,
      },
      comment: 'Lovely and confident❤️❤️ Very warm and heartfelt. Rapid pace. Great writing!',
      descriptors: ['Great communication', 'Fast delivery', 'Great writing style'],
      isGood: true,
    },
    {
      id: '#340656863',
      title: 'Affordable Care Act Review',
      rating: 7,
      finishDate: 'Aug 10, 2026',
      details: 'Policy Analysis · Healthcare Economics · 3 pages',
      writer: {
        name: 'enockayega',
        profileUrl: '/writers/enockayega',
        avatar: '/w3t_avatar/writer/210/enockayegax128.webp',
        rating: 9.58,
        ordersCompleted: 7242,
        progressPercent: 96,
        isOnline: false,
      },
      comment: 'Great analysis but you shifted the focus slightly',
      descriptors: ['Writing style'],
      isGood: false,
    },
    {
      id: '#340598124',
      title: 'Strategic Human Resource Management in Tech Startups',
      rating: 10,
      finishDate: 'Aug 09, 2026',
      details: 'Case study · Business · 6 pages',
      writer: {
        name: 'nash-topwriter',
        profileUrl: '/writers/nash-topwriter',
        avatar: '/w3t_avatar/writer/678/nash-topwriterx128.webp',
        rating: 9.85,
        ordersCompleted: 5420,
        progressPercent: 98,
        isOnline: false,
      },
      comment: 'Very professional, delivered 2 days in advance. Excellent analysis and proper citations!',
      descriptors: ['Fast delivery', 'Follows instructions', 'Great formatting', 'Original research'],
      isGood: true,
    },
    {
      id: '#340512890',
      title: 'Comparative Analysis of Renaissance and Baroque Art Movements',
      rating: 10,
      finishDate: 'Aug 08, 2026',
      details: 'Research paper · Art History · 8 pages',
      writer: {
        name: 'arthistorywriter02',
        profileUrl: '/writers/arthistorywriter02',
        avatar: '/w3t_avatar/writer/222/arthistorywriter02x128.webp',
        rating: 9.82,
        ordersCompleted: 3410,
        progressPercent: 98,
        isOnline: false,
      },
      comment: 'The depth of knowledge in art history was amazing. Perfectly formatted in Chicago style.',
      descriptors: ['Expert subject knowledge', 'Great writing style', 'No plagiarism'],
      isGood: true,
    },
    {
      id: '#340476532',
      title: 'Machine Learning Approaches to Predictive Healthcare Analytics',
      rating: 10,
      finishDate: 'Aug 07, 2026',
      details: 'Term paper · Computer Science · 10 pages',
      writer: {
        name: 'techpro12',
        profileUrl: '/writers/techpro12',
        avatar: '/w3t_avatar/writer/416/techpro12x128.webp',
        rating: 9.68,
        ordersCompleted: 2910,
        progressPercent: 96,
        isOnline: false,
      },
      comment: 'Clean code snippets and very articulate explanations. Scored an A on this!',
      descriptors: ['Fast responses', 'Follows instructions', 'Deep technical analysis'],
      isGood: true,
    },
    {
      id: '#340412908',
      title: 'Global Supply Chain Disruptions Post-2020: An Empirical Review',
      rating: 10,
      finishDate: 'Aug 06, 2026',
      details: 'Research report · Logistics · 5 pages',
      writer: {
        name: 'feskywriter',
        profileUrl: '/writers/feskywriter',
        avatar: '/w3t_avatar/writer/427/feskywriterx128.webp',
        rating: 9.92,
        ordersCompleted: 6890,
        progressPercent: 99,
        isOnline: false,
      },
      comment: 'Hands down the best writer on this platform. Accurate data tables and clear charts.',
      descriptors: ['Great communication', 'Fast delivery', 'Great writing style', 'Accurate data'],
      isGood: true,
    },
    {
      id: '#340387611',
      title: 'Ethical Implications of CRISPR Gene Editing in Modern Medicine',
      rating: 10,
      finishDate: 'Aug 05, 2026',
      details: 'Research Analysis · Biomedical Ethics · 4 pages',
      writer: {
        name: 'professorwanya',
        profileUrl: '/writers/professorwanya',
        avatar: '/w3t_avatar/writer/286/professorwanyax128.webp',
        rating: 9.88,
        ordersCompleted: 8120,
        progressPercent: 99,
        isOnline: false,
      },
      comment: 'Professor Wanya always delivers peer-review quality papers. Highly recommended!',
      descriptors: ['Follows instructions', 'Great grammar', 'Academic rigor'],
      isGood: true,
    },
    {
      id: '#340319455',
      title: 'Consumer Behavior in Digital Subscriptions and Streaming Markets',
      rating: 10,
      finishDate: 'Aug 04, 2026',
      details: 'Marketing analysis · Marketing · 6 pages',
      writer: {
        name: 'derick',
        profileUrl: '/writers/derick',
        avatar: '/w3t_avatar/writer/164/derickx128.webp',
        rating: 9.9,
        ordersCompleted: 4190,
        progressPercent: 99,
        isOnline: false,
      },
      comment: 'Derick was lightning fast and followed all the professor’s grading rubric constraints.',
      descriptors: ['Fast responses', 'Fast delivery', 'Great writing style'],
      isGood: true,
    },
    {
      id: '#340278199',
      title: 'Macroeconomic Policy Responses to Inflationary Pressures',
      rating: 9,
      finishDate: 'Aug 03, 2026',
      details: 'Economic policy brief · Economics · 5 pages',
      writer: {
        name: 'writerarthur',
        profileUrl: '/writers/writerarthur',
        avatar: '/w3t_avatar/writer/376/writerarthurx128.webp',
        rating: 9.75,
        ordersCompleted: 3820,
        progressPercent: 97,
        isOnline: false,
      },
      comment: 'Super thorough work, minor formatting tweak needed but handled immediately upon request.',
      descriptors: ['Great communication', 'Prompt revisions'],
      isGood: true,
    },
    {
      id: '#340195442',
      title: 'Cybersecurity Threat Modeling for Cloud-Native Infrastructure',
      rating: 10,
      finishDate: 'Aug 02, 2026',
      details: 'Technical paper · Information Technology · 7 pages',
      writer: {
        name: 'mauriceprowriter',
        profileUrl: '/writers/mauriceprowriter',
        avatar: '/w3t_avatar/writer/263/mauriceprowriterx128.webp',
        rating: 9.76,
        ordersCompleted: 4930,
        progressPercent: 97,
        isOnline: false,
      },
      comment: 'Maurice is a true expert. Every single requirement in the prompt was met with excellence.',
      descriptors: ['Fast responses', 'Follows instructions', 'Great grammar', 'Fast delivery'],
      isGood: true,
    }
  ];

  const primaryCustomerReviews = [
    {
      clientId: '#166386',
      rating: 9,
      date: '5 days ago',
      content: 'Thank you for working so quickly and diligently! great work and highly recommend',
    },
    {
      clientId: '#272203',
      rating: 10,
      date: '1 day ago',
      content: 'This expert was amazing. All the questions I had, big or small, were answered quickly, with full instructions and all the work was complete way before the deadline. 10 stars are not enough, if I am being honest. Thank you for all your help!',
    },
    {
      clientId: '#198355',
      rating: 10,
      date: '3 days ago',
      content: 'Very dependable writer and always on time. This writer does GREAT work! My last paper was 200/200.',
    },
    {
      clientId: '#191541',
      rating: 10,
      date: '1 day ago',
      content: 'Amazing work, responded well and clarified anything prior to start. Would definitely recommend, great prices and great service!',
    },
  ];

  const extraCustomerReviews = [
    {
      clientId: '#215536',
      rating: 10,
      date: '7 days ago',
      content: 'Have used this writer for other papers in the time of need and always delivers a top notch product. Highly recommend.',
    },
    {
      clientId: '#188988',
      rating: 9,
      date: '7 days ago',
      content: 'Totally reliable professional who always delivers on time, at an unbeatable price, with the utmost accuracy.',
    },
    {
      clientId: '#188289',
      rating: 9,
      date: '7 days ago',
      content: 'The writer was fantastic! Produced quality work and completed requested visions in a timely manner. I highly recommend this writer!',
    },
    {
      clientId: '#195382',
      rating: 10,
      date: '6 days ago',
      content: 'She is really helpful and sticks to the instructions. She completed my paper just a day after I placed the order. Recommend this writer and I personally will apply with all my orders directly to her.',
    },
    {
      clientId: '#209970',
      rating: 10,
      date: '3 days ago',
      content: 'Reliable and excellent work! Covered all the requested information.',
    },
    {
      clientId: '#216172',
      rating: 10,
      date: '5 days ago',
      content: 'Very helpful. Will choose this writer in the near future. Patient with my needs and corrections if needed. Thank you',
    },
    {
      clientId: '#103133',
      rating: 9,
      date: '7 days ago',
      content: 'Well crafted paper, went above and beyond in completing the said project',
    },
    {
      clientId: '#123062',
      rating: 9,
      date: '1 day ago',
      content: "WOW!! Completely amazed by this writer's work! Really delivered at what was asked for!",
    },
    {
      clientId: '#164864',
      rating: 10,
      date: '3 days ago',
      content: 'Great job. She wrote more than I asked for which was very helpful and returned the paper before the deadline.',
    },
    {
      clientId: '#125811',
      rating: 10,
      date: '1 day ago',
      content: "I've been using ES a lot recently due to a heavy schedule and this writer is by far the best. Followed my instructions and I can tell he actually read the material I attached. Thank you for the great attitude and nice paper.",
    },
    {
      clientId: '#234797',
      rating: 10,
      date: '7 days ago',
      content: 'It is excellent! I ask for the presentation speech but the writer sends me the PowerPoint too! I really appreciate! The writer is very polite and willing to answer any questions. I will ask for him in the future for my works in the future! Thank you very much, writer!',
    },
    {
      clientId: '#185022',
      rating: 10,
      date: '5 days ago',
      content: 'Writer was very attentive to my needs and kept me up to date with all progress and was there every step of the way to ask questions to ensure everything was the way I wanted it. I would highly recommend this writer if you like to have an assignment done well.',
    },
    {
      clientId: '#213016',
      rating: 9,
      date: '2 days ago',
      content: 'I am repeat client and I am grateful for finding such a proficient writer I count on. This one is the chosen one, folks. Very precise, sharp-minded, attentive and punctual. Thank you!!!',
    },
  ];

  return (
    <main className="pt-[80px] bg-[#f8f9fa] min-h-screen font-sans">
      <SEO 
        title="BoffinGlobal Writer and Customer Reviews | 100% Verified Reviews"
        description="We gathered BoffinGlobal reviews from our clients and writers on this page for you to know what they think about our service, what features they enjoyed and how they rate us."
        keywords="BoffinGlobal reviews, real student feedback, homework support recommendations, reliable paper writing reviews"
        canonicalUrl="/reviews"
      />

      {/* Hero Intro Section */}
      <section className="pb-0 animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden bg-white">
        <div className="max-w-[1150px] mx-auto px-4 sm:px-6 py-8 md:py-12 relative z-10">
          <div className="flex gap-6 md:gap-12 flex-col md:flex-row items-center justify-between">
            <div className="max-w-[700px] space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.08] font-display">
                BoffinGlobal Writer and Customer Reviews
              </h1>
              <p className="text-base sm:text-lg text-slate-500 font-light leading-relaxed max-w-2xl">
                We gathered BoffinGlobal reviews from our clients and writers on this page for you to know what they think about our service, what features they enjoyed and how they rate us. Reviews of BoffinGlobal help us to improve our <a href="/" target="_blank" className="text-[#0080d1] hover:underline font-medium">technical assignment help service</a> and make it more helpful for you.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex gap-2 items-center border border-solid border-slate-100 p-2 rounded-8 bg-white">
                  <svg className="shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_26652_188266" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                      <rect width="18" height="18" fill="#D9D9D9"></rect>
                    </mask>
                    <g mask="url(#mask0_26652_188266)">
                      <path d="M6.6375 12.6187L9 11.1938L11.3625 12.6375L10.7437 9.9375L12.825 8.1375L10.0875 7.89375L9 5.34375L7.9125 7.875L5.175 8.11875L7.25625 9.9375L6.6375 12.6187ZM4.36875 15.75L5.5875 10.4813L1.5 6.9375L6.9 6.46875L9 1.5L11.1 6.46875L16.5 6.9375L12.4125 10.4813L13.6313 15.75L9 12.9563L4.36875 15.75Z" fill="#0080D1"></path>
                    </g>
                  </svg>
                  <p className="mb-0 caption font-medium text-slate-700">
                    100% verified reviews
                  </p>
                </div>
                <div className="flex gap-2 items-center border border-solid border-slate-100 p-2 rounded-8 bg-white">
                  <svg className="shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_26652_188271" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                      <rect width="18" height="18" fill="#D9D9D9"></rect>
                    </mask>
                    <g mask="url(#mask0_26652_188271)">
                      <path d="M3.75 14.25H4.81875L12.15 6.91875L11.0813 5.85L3.75 13.1812V14.25ZM2.25 15.75V12.5625L12.15 2.68125C12.3 2.54375 12.4656 2.4375 12.6469 2.3625C12.8281 2.2875 13.0188 2.25 13.2188 2.25C13.4187 2.25 13.6125 2.2875 13.8 2.3625C13.9875 2.4375 14.15 2.55 14.2875 2.7L15.3188 3.75C15.4688 3.8875 15.5781 4.05 15.6469 4.2375C15.7156 4.425 15.75 4.6125 15.75 4.8C15.75 5 15.7156 5.19062 15.6469 5.37187C15.5781 5.55312 15.4688 5.71875 15.3188 5.86875L5.4375 15.75H2.25ZM11.6063 6.39375L11.0813 5.85L12.15 6.91875L11.6063 6.39375Z" fill="#0080D1"></path>
                    </g>
                  </svg>
                  <p className="mb-0 caption font-medium text-slate-700">
                    No moderation
                  </p>
                </div>
                <div className="flex gap-2 items-center border border-solid border-slate-100 p-2 rounded-8 bg-white">
                  <svg className="shrink-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_26652_188276" style={{maskType: 'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
                      <rect width="18" height="18" fill="#D9D9D9"></rect>
                    </mask>
                    <g mask="url(#mask0_26652_188276)">
                      <path d="M11.475 12.525L12.525 11.475L9.75 8.7V5.25H8.25V9.3L11.475 12.525ZM9 16.5C7.9625 16.5 6.9875 16.3031 6.075 15.9094C5.1625 15.5156 4.36875 14.9813 3.69375 14.3063C3.01875 13.6313 2.48438 12.8375 2.09063 11.925C1.69687 11.0125 1.5 10.0375 1.5 9C1.5 7.9625 1.69687 6.9875 2.09063 6.075C2.48438 5.1625 3.01875 4.36875 3.69375 3.69375C4.36875 3.01875 5.1625 2.48438 6.075 2.09063C6.9875 1.69687 7.9625 1.5 9 1.5C10.0375 1.5 11.0125 1.69687 11.925 2.09063C12.8375 2.48438 13.6313 3.01875 14.3063 3.69375C14.9813 4.36875 15.5156 5.1625 15.9094 6.075C16.3031 6.9875 16.5 7.9625 16.5 9C16.5 10.0375 16.3031 11.0125 15.9094 11.925C15.5156 12.8375 14.9813 13.6313 14.3063 14.3063C13.6313 14.9813 12.8375 15.5156 11.925 15.9094C11.0125 16.3031 10.0375 16.5 9 16.5ZM9 15C10.6625 15 12.0781 14.4156 13.2469 13.2469C14.4156 12.0781 15 10.6625 15 9C15 7.3375 14.4156 5.92188 13.2469 4.75313C12.0781 3.58438 10.6625 3 9 3C7.3375 3 5.92188 3.58438 4.75313 4.75313C3.58438 5.92188 3 7.3375 3 9C3 10.6625 3.58438 12.0781 4.75313 13.2469C5.92188 14.4156 7.3375 15 9 15Z" fill="#0080D1"></path>
                    </g>
                  </svg>
                  <p className="mb-0 caption font-medium text-slate-700">
                    Real customers. Real orders. Real stories.
                  </p>
                </div>
              </div>
            </div>
            <img className="-mb-8 shrink-0 hidden md:block max-w-[300px] lg:max-w-[340px] xl:max-w-[362px]" src="/next/img/illustration/shark-like.svg" alt="BoffinGlobal reviews" loading="lazy" width="362" height="333" />
          </div>
        </div>
      </section>

      {/* Main Interactive Reviews Section with Tabs */}
      <section className="reviews" id="reviews">
        <div className="container min-h-[532px] animate-appear-0">
          <div className="js--reviews-tabs">
            {/* Tab navigation buttons */}
            <div className="flex gap-4 mb-8 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveTab('reviews--shark')}
                className={`tab-button js--tab-button ${activeTab === 'reviews--shark' ? 'js--tab-active' : ''}`}
                data-tab="reviews--shark"
              >
                <span className="flex items-center justify-center rounded-circle bg-slate-50 w-[48px] h-[48px]">
                  <img src="/next/img/logos/boffinglobal-small.svg" alt="" width="32" height="32" loading="lazy" />
                </span>
                <div>
                  <b>BoffinGlobal.com</b>
                  <span className="text-caption leading-caption text-grey-400 flex items-center gap-1 font-lato">
                    <span id="intro_quality_score">9.65/10</span>
                    <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.66667 0.660034L9.72667 4.83337L14.3333 5.5067L11 8.75337L11.7867 13.34L7.66667 11.1734L3.54667 13.34L4.33333 8.75337L1 5.5067L5.60667 4.83337L7.66667 0.660034Z" fill="#FFB300" stroke="#FFB300" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('reviews--customer-shark')}
                className={`tab-button js--tab-button ${activeTab === 'reviews--customer-shark' ? 'js--tab-active' : ''}`}
                data-tab="reviews--customer-shark"
              >
                <span className="flex items-center justify-center rounded-circle bg-slate-50 w-[48px] h-[48px]">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.6663 2.333C25.6663 2.333 16.753 1.90134 9.72967 11.5263C4.33967 18.9113 2.33301 25.6663 2.33301 25.6663L4.59634 24.4997C6.27634 21.583 7.15134 20.3813 8.79634 18.6663C11.748 19.5297 14.828 19.4247 17.4997 16.333C15.1663 15.6797 13.2997 15.8313 10.5463 16.1113C13.638 13.9997 15.7497 13.533 18.6663 13.9997L19.833 11.6663C17.733 11.2697 16.333 11.2347 14.2563 11.713C16.5547 10.0913 18.153 9.18134 20.9997 9.333L22.4113 7.08134C20.5913 6.953 19.4947 7.15134 17.4063 7.66467C19.2847 5.96134 20.9997 5.19134 23.4963 5.03967C23.4963 5.03967 24.7213 2.83467 25.6663 2.333Z" fill="#006DC6"></path>
                  </svg>
                </span>
                <div className="flex flex-col items-start text-left">
                  <span className="text-[22px] font-normal text-[#0050b5] leading-[1.2] mb-0.5">More reviews</span>
                  <span className="text-[16px] font-normal text-[#5c80ab] leading-[1.2]">From our customers</span>
                </div>
              </button>
            </div>

            {/* TAB 1: Instant real reviews about BoffinGlobal */}
            <div className={`js--tab-content reviews--shark ${activeTab === 'reviews--shark' ? 'js--tab-active' : 'hidden'}`}>
              <h2>
                Instant real reviews about BoffinGlobal
              </h2>
              <p className="regular mb-8 text-grey-400">
                At BoffinGlobal, we value each opinion about our service and strive to make it better each day. We do our best to satisfy your "<a href="/" target="_blank">get technical assignment help</a>" requests and provide useful content on our blog to ease your studies.
              </p>

              <div className="min-h-[1000px]" data-latest="" data-active="true">
                <div data-testid="latest-orders">
                  {latestOrders.slice(0, visibleOrdersCount).map((order) => (
                    <div key={order.id} className="bb-latestOrderCard">
                      <div className="bb-latestOrderContent">
                        {/* Mobile header view */}
                        <div className="bb-mobileHeader">
                          <div className="bb-latestOrderHeader">
                            <h3 className="bb-latestOrderTitle">{order.title}</h3>
                          </div>
                          <div className="bb-latestOrdersMobileInfo">
                            <div className="bb-latestOrderRating">
                              <div className="bb-latestOrdersStarWrapper" style={{'--l1ef279h-0': 'var(--bb-rating-star-fill)', '--l1ef279h-1': 'var(--bb-rating-star-stroke)'} as React.CSSProperties}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M8 1.333l2.06 4.174 4.607.673-3.334 3.247.787 4.586L8 11.847l-4.12 2.166.787-4.586L1.333 6.18l4.607-.673L8 1.333z" fill="#F2CB52" stroke="#F2CB52" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                              </div>
                              {order.rating}<span className="bb-latestOrderRatingMax">/10</span>
                            </div>
                            <div className="bb-latestOrderFinishDate">{order.finishDate}</div>
                          </div>
                          <div className="bb-latestOrderDetails">
                            <div className="bb-latestOrderInfoItem">
                              <span>{order.details}</span>
                            </div>
                            <div className="bb-latestOrderInfoItem">{order.id}</div>
                          </div>
                        </div>

                        {/* Writer profile link */}
                        <Link to={order.writer.profileUrl.replace('.html', '')} className="bb-latestOrderWriterProfile">
                          <div className="bb-latestOrderWriterProfileWrapper">
                            <div className="offline bb-latestOrderOnlineStatus" style={{'--ligctvc-0': 0, '--ligctvc-1': 0} as React.CSSProperties}>
                              <img src={order.writer.avatar} alt={order.writer.name} className="bb-latestOrderWriterAvatar" style={{'--l4irgg8-0': '50%'} as React.CSSProperties} />
                            </div>
                            <div className="bb-latestOrderWriterDetails">
                              <div className="bb-latestOrderWriterName">{order.writer.name}</div>
                              <div className="bb-latestOrderWriterRating" style={{'--lv4hbmk-0': 'center', '--lv4hbmk-1': '8px', '--lv4hbmk-2': 'row'} as React.CSSProperties}>
                                <div className="bb-latestOrderWriterItem">
                                  <div className="bb-latestOrdersStarWrapper" style={{'--l1ef279h-0': 'var(--bb-rating-star-fill)', '--l1ef279h-1': 'var(--bb-rating-star-stroke)'} as React.CSSProperties}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M8 1.333l2.06 4.174 4.607.673-3.334 3.247.787 4.586L8 11.847l-4.12 2.166.787-4.586L1.333 6.18l4.607-.673L8 1.333z" fill="#F2CB52" stroke="#F2CB52" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                  </div>
                                  <b>{order.writer.rating}</b><span className="bb-latestOrderRatingMax">/10</span>&nbsp;
                                </div>
                                <span className="bb-latestOrderWriterOrdersQty">{order.writer.ordersCompleted} Finished</span>
                              </div>
                              <div className="bb-latestOrderWriterRatingIndicator">
                                <div className="bb-latestOrderWriterRatingProgress" style={{'--l12nhvdg-0': '135.79999999999998px', '--l12nhvdg-1': '162.96px;', width: `${order.writer.progressPercent}%`} as React.CSSProperties}></div>
                              </div>
                            </div>
                          </div>
                        </Link>

                        {/* Desktop feedback view */}
                        <div className="bb-latestOrderFeedback">
                          <div className="bb-latestOrdersDesktopInfo">
                            <div className="bb-latestOrderHeader">
                              <h3 className="bb-latestOrderTitle">{order.title}</h3>
                            </div>
                            <div className="bb-latestOrderDetails">
                              <div className="bb-latestOrderInfo">
                                <div className="bb-latestOrderInfoItem">
                                  <span>{order.details}</span>
                                </div>
                                <div className="bb-latestOrderInfoItem">
                                  {order.id} <span className="bb-latestOrderFinishDateDesktop">· {order.finishDate}</span>
                                </div>
                              </div>
                              <div className="bb-latestOrderRatingDesktop">
                                <div className="bb-latestOrdersStarWrapper" style={{'--l1ef279h-0': 'var(--bb-rating-star-fill)', '--l1ef279h-1': 'var(--bb-rating-star-stroke)'} as React.CSSProperties}>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 1.333l2.06 4.174 4.607.673-3.334 3.247.787 4.586L8 11.847l-4.12 2.166.787-4.586L1.333 6.18l4.607-.673L8 1.333z" fill="#F2CB52" stroke="#F2CB52" strokeLinecap="round" strokeLinejoin="round"></path>
                                  </svg>
                                </div>
                                {order.rating}<span className="bb-latestOrderRatingMax">/10</span>
                              </div>
                            </div>
                          </div>

                          <span className="bb-latestOrderCaption">Customer about {order.writer.name}:</span>
                          <div className="bb-latestOrderComment">{order.comment}</div>

                          <div className="bb-latestOrdersDescriptorsContainer">
                            {order.isGood ? (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" tabIndex={-1}>
                                <mask id={`icon_descriptor--good_${order.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14" style={{maskType: 'alpha'}}>
                                  <path fill="#C4C4C4" d="M0 0h14v14H0z"></path>
                                </mask>
                                <g mask={`url(#icon_descriptor--good_${order.id})`}>
                                  <path d="M9.042 6.417a.85.85 0 00.627-.248.85.85 0 00.248-.627.85.85 0 00-.248-.627.85.85 0 00-.627-.248.85.85 0 00-.627.248.85.85 0 00-.248.627.85.85 0 00.248.627.85.85 0 00.627.248zm-4.084 0a.85.85 0 00.627-.248.85.85 0 00.248-.627.85.85 0 00-.248-.627.85.85 0 00-.627-.248.85.85 0 00-.627.248.85.85 0 00-.248.627.85.85 0 00.248.627.85.85 0 00.627.248zM7 10.208c.69 0 1.3-.19 1.83-.568.53-.38.912-.87 1.145-1.473h-5.95A3.193 3.193 0 005.17 9.64c.53.379 1.14.568 1.83.568zm0 2.625a5.676 5.676 0 01-2.275-.46 5.886 5.886 0 01-1.852-1.246 5.887 5.887 0 01-1.247-1.852A5.677 5.677 0 011.166 7c0-.807.154-1.565.46-2.275a5.887 5.887 0 011.247-1.852 5.895 5.895 0 011.852-1.247A5.683 5.683 0 017 1.166c.807 0 1.565.154 2.275.46.71.306 1.327.722 1.852 1.247.525.525.94 1.142 1.247 1.852.306.71.46 1.468.46 2.275 0 .807-.154 1.565-.46 2.275a5.886 5.886 0 01-1.247 1.852 5.886 5.886 0 01-1.852 1.247c-.71.306-1.468.46-2.275.46zm0-1.166c1.293 0 2.394-.455 3.303-1.364.91-.909 1.364-2.01 1.364-3.303 0-1.293-.455-2.394-1.364-3.303-.909-.91-2.01-1.364-3.303-1.364-1.293 0-2.394.455-3.303 1.364-.909.909-1.364 2.01-1.364 3.303 0 1.293.455 2.394 1.364 3.303.91.91 2.01 1.364 3.303 1.364z" fill="#348E37"></path>
                                </g>
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" tabIndex={-1}>
                                <mask id={`icon_descriptor--bad_${order.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14" style={{maskType: 'alpha'}}>
                                  <path fill="#C4C4C4" d="M0 0h14v14H0z"></path>
                                </mask>
                                <g mask={`url(#icon_descriptor--bad_${order.id})`}>
                                  <path d="M9.042 6.417a.85.85 0 00.627-.248.85.85 0 00.248-.627.85.85 0 00-.248-.627.85.85 0 00-.627-.248.85.85 0 00-.627.248.85.85 0 00-.248.627.85.85 0 00.248.627.85.85 0 00.627.248zm-4.084 0a.85.85 0 00.627-.248.85.85 0 00.248-.627.85.85 0 00-.248-.627.85.85 0 00-.627-.248.85.85 0 00-.627.248.85.85 0 00-.248.627.85.85 0 00.248.627.85.85 0 00.627.248zM7 7.875c-.69 0-1.3.19-1.83.569-.53.379-.912.87-1.145 1.473h5.95A3.193 3.193 0 008.83 8.444c-.53-.38-1.14-.569-1.83-.569zm0 4.958a5.676 5.676 0 01-2.275-.46 5.886 5.886 0 01-1.852-1.246 5.887 5.887 0 01-1.247-1.852A5.677 5.677 0 011.166 7c0-.807.154-1.565.46-2.275a5.887 5.887 0 011.247-1.852 5.895 5.895 0 011.852-1.247A5.683 5.683 0 017 1.166c.807 0 1.565.154 2.275.46.71.306 1.327.722 1.852 1.247.525.525.94 1.142 1.247 1.852.306.71.46 1.468.46 2.275 0 .807-.154 1.565-.46 2.275a5.886 5.886 0 01-1.247 1.852 5.886 5.886 0 01-1.852 1.247c-.71.306-1.468.46-2.275.46zm0-1.166c1.293 0 2.394-.455 3.303-1.364.91-.909 1.364-2.01 1.364-3.303 0-1.293-.455-2.394-1.364-3.303-.909-.91-2.01-1.364-3.303-1.364-1.293 0-2.394.455-3.303 1.364-.909.909-1.364 2.01-1.364 3.303 0 1.293.455 2.394 1.364 3.303.91.91 2.01 1.364 3.303 1.364z" fill="#DB464C"></path>
                                </g>
                              </svg>
                            )}
                            <div className="bb-descriptorsList">
                              {order.descriptors.map((desc, i) => (
                                <div key={i} className="bb-latestOrderDescriptor">
                                  {desc}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      if (visibleOrdersCount < latestOrders.length) {
                        setVisibleOrdersCount(prev => Math.min(prev + 4, latestOrders.length));
                      } else {
                        setVisibleOrdersCount(4);
                      }
                    }}
                    className="bb-latestOrdersButton"
                  >
                    {visibleOrdersCount < latestOrders.length ? 'Show more' : 'Show less'}
                  </button>
                </div>
              </div>
            </div>

            {/* TAB 2: More reviews from our customers */}
            <div className={`js--tab-content reviews--customer-shark ${activeTab === 'reviews--customer-shark' ? 'js--tab-active' : 'hidden'}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {primaryCustomerReviews.map((rev, idx) => (
                  <div key={idx} className="p-6 rounded-12 border border-solid border-slate-100 flex flex-col">
                    <div className="flex gap-2 mb-2 items-center justify-between">
                      <span className="subtitle inline-flex items-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12.1429 17.7558L18.3229 21.4858L16.6829 14.4558L22.1429 9.72584L14.9529 9.11584L12.1429 2.48584L9.33285 9.11584L2.14285 9.72584L7.60285 14.4558L5.96285 21.4858L12.1429 17.7558Z" fill="#FFB300"></path>
                        </svg> <b> {rev.rating}</b> /10
                      </span>
                      <span className="caption text-grey-300">{rev.date}</span>
                    </div>
                    <div className="uppercase text-slate-900 caption font-semibold">
                      Client: {rev.clientId}
                    </div>
                    <div className="regular">
                      {rev.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Expandable Accordion for More Customer Reviews */}
              <div className="accordion__item" role="presentation">
                <div className="accordion__item-content" id="customer-panel" aria-labelledby="customer-trigger" style={{ display: isCustomerExpanded ? 'block' : 'none' }}>
                  <div className="min-h-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      {extraCustomerReviews.map((rev, idx) => (
                        <div key={idx} className="p-6 rounded-12 border border-solid border-slate-100 flex flex-col">
                          <div className="flex gap-2 mb-2 items-center justify-between">
                            <span className="subtitle inline-flex items-center">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.1429 17.7558L18.3229 21.4858L16.6829 14.4558L22.1429 9.72584L14.9529 9.11584L12.1429 2.48584L9.33285 9.11584L2.14285 9.72584L7.60285 14.4558L5.96285 21.4858L12.1429 17.7558Z" fill="#FFB300"></path>
                              </svg> <b> {rev.rating}</b> /10
                            </span>
                            <span className="caption text-grey-300">{rev.date}</span>
                          </div>
                          <div className="uppercase text-slate-900 caption font-semibold">
                            Client: {rev.clientId}
                          </div>
                          <div className="regular">
                            {rev.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-center w-full mt-6">
                  <button
                    type="button"
                    onClick={() => setIsCustomerExpanded(!isCustomerExpanded)}
                    className="button secondary accordion__item-button flex items-center justify-center gap-2 js--accordion js--accordion-one-way"
                    id="writers-trigger"
                    aria-controls="writers-panel"
                    aria-expanded={isCustomerExpanded}
                  >
                    <span>{isCustomerExpanded ? 'Show Less' : 'Load More'}</span>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={isCustomerExpanded ? 'rotate-180 transition-transform duration-200' : 'transition-transform duration-200'}>
                      <path d="M4.52045 6.84589L3.38767 7.97868C4.50283 4.32457 8.3691 2.2664 12.0232 3.38156C13.4157 3.80656 14.6387 4.66012 15.5179 5.82068L16.5205 5.06108C13.7976 1.46141 8.67216 0.750547 5.07245 3.47341C3.58044 4.60195 2.52081 6.20822 2.07048 8.02399L0.889868 6.84589L0 7.73513L2.7061 10.4412L5.41221 7.73513L4.52045 6.84589Z" fill="currentColor"></path>
                      <path d="M17.2938 9.5459L14.5877 12.252L15.4776 13.1419L16.6236 11.9965C15.5182 15.6565 11.6552 17.7274 7.99521 16.622C6.53946 16.1823 5.269 15.2756 4.38004 14.0418L3.35864 14.7769C4.62095 16.5417 6.53623 17.7287 8.67834 18.0739C9.11738 18.1452 9.56145 18.1812 10.0062 18.1815C13.7632 18.1797 17.0338 15.6137 17.9295 11.965L19.1076 13.1419L19.9999 12.252L17.2938 9.5459ZM17.2624 11.359L17.2945 11.3269L17.341 11.3741L17.2624 11.359Z" fill="currentColor"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 animate-appear-0 mx-4 font-['Open_Sans',sans-serif]">
        <div className="max-w-[1150px] mx-auto rounded-[12px] pb-8 sm:pl-[240px] pt-[170px] sm:pt-8 relative sm:px-8 flex items-center shadow-lg flex-col sm:flex-row gap-6 border border-slate-50 border-solid bg-white">
          <img
            className="-mt-16 absolute top-[40px] left-0 right-0 mx-auto sm:row-auto sm:mx-0 sm:top-auto sm:bottom-0 sm:left-6 w-[200px] sm:w-[220px] shrink-0"
            src="/next/img/illustration/shark-heart.svg"
            alt=""
            width="220"
            height="220"
            loading="lazy"
          />
          <h2 className="subtitle mb-0 grow text-center sm:text-left text-[14px] sm:text-[15px] md:text-[16px] font-normal text-[#424242] leading-[24px]">
            Entrust your writing problems to us and let us help you improve your performance!
          </h2>
          <Link
            className="button primary-orange inline-flex items-center justify-center font-bold text-[18px] leading-[20px] bg-[#ff8b00] text-white hover:bg-[#ff9a00] border-[2px] border-solid border-[#ff8b00] hover:border-[#ff9a00] rounded-[100px] px-[40px] py-[11px] w-fit transition-colors shadow-md hover:shadow-lg shrink-0 whitespace-nowrap"
            to="/registration"
            aria-label="Write my project"
          >
            Write my project
          </Link>
        </div>
      </section>

      <section className="animate-appear-0 js--stats js--service-stats overflow-hidden">
        <div className="container max-w-[1150px] mx-auto px-4 relative z-[1]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Counter as="div" value={15} suffix="+" className="stat-number" id="years_on_market" />
              <p className="stat-label">
                Years on the market
              </p>
            </div>
            <div>
              <Counter as="div" value={9.65} suffix="/10" className="stat-number" id="quality_score" />
              <p className="stat-label">
                Average quality score
              </p>
            </div>
            <div>
              <Counter as="div" value={57} suffix="K+" className="stat-number" id="returning_customers" />
              <p className="stat-label">
                Returning customers
              </p>
            </div>
            <div>
              <Counter as="div" value={46} suffix="" className="stat-number" id="writers_count" />
              <p className="stat-label">
                Writers active daily
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}


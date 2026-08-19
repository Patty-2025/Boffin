import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface PriceRow {
  level: string;
  days10: string;
  days7: string;
  days5: string;
  days3: string;
  days2: string;
  hrs24: string;
  hrs8: string;
  hrs4: string;
}

const sampleWritingPrices: PriceRow[] = [
  {
    level: 'Basic (Entry-level writers)',
    days10: '$12.50',
    days7: '$15.00',
    days5: '$16.50',
    days3: '$20.00',
    days2: '$23.00',
    hrs24: '$26.50',
    hrs8: '$29.80',
    hrs4: '$35.70',
  },
  {
    level: 'Undergraduate Level',
    days10: '$16.30',
    days7: '$19.00',
    days5: '$21.70',
    days3: '$24.40',
    days2: '$28.10',
    hrs24: '$30.90',
    hrs8: '$35.80',
    hrs4: '$41.40',
  },
  {
    level: "Master's Level",
    days10: '$19.60',
    days7: '$22.40',
    days5: '$26.70',
    days3: '$29.60',
    days2: '$32.40',
    hrs24: '$39.10',
    hrs8: '$42.50',
    hrs4: '$45.80',
  },
  {
    level: 'Ph.D. Level',
    days10: '$23.20',
    days7: '$26.70',
    days5: '$31.60',
    days3: '$34.70',
    days2: '$38.30',
    hrs24: '$46.30',
    hrs8: '$50.00',
    hrs4: '$54.00',
  },
];

const editingPrices: PriceRow[] = [
  {
    level: 'Basic (Entry-level writers)',
    days10: '$7.50',
    days7: '$9.00',
    days5: '$9.90',
    days3: '$12.00',
    days2: '$13.80',
    hrs24: '$15.90',
    hrs8: '$17.80',
    hrs4: '$21.40',
  },
  {
    level: 'Undergraduate Level',
    days10: '$9.80',
    days7: '$11.40',
    days5: '$13.00',
    days3: '$14.60',
    days2: '$16.80',
    hrs24: '$18.50',
    hrs8: '$21.50',
    hrs4: '$24.80',
  },
  {
    level: "Master's Level",
    days10: '$11.80',
    days7: '$13.40',
    days5: '$16.00',
    days3: '$17.80',
    days2: '$19.40',
    hrs24: '$23.50',
    hrs8: '$25.50',
    hrs4: '$27.50',
  },
  {
    level: 'Ph.D. Level',
    days10: '$13.90',
    days7: '$16.00',
    days5: '$19.00',
    days3: '$20.80',
    days2: '$23.00',
    hrs24: '$27.80',
    hrs8: '$30.00',
    hrs4: '$32.40',
  },
];

interface ReviewItem {
  id: number;
  rating: number;
  date: string;
  writerName: string;
  writerLink: string;
  writerAvatar: string;
  writerStatus: 'online' | 'away' | 'offline';
  completedOrders: number;
  comment: string;
  descriptors: string[];
}

const reviewsData: ReviewItem[] = [
  {
    id: 1,
    rating: 10,
    date: '3 weeks ago',
    writerName: 'feskywriter',
    writerLink: '/writers/feskywriter.html',
    writerAvatar: '/w3t_avatar/writer/427/feskywriterx64.webp',
    writerStatus: 'offline',
    completedOrders: 385,
    comment: 'Very helpful and listened to everything I had to say.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 2,
    rating: 10,
    date: '3 weeks ago',
    writerName: 'Mauriceprowriter',
    writerLink: '/writers/mauriceprowriter.html',
    writerAvatar: '/w3t_avatar/writer/263/mauriceprowriterx64.webp',
    writerStatus: 'offline',
    completedOrders: 9208,
    comment: 'I have been working with this particular writer for a couple of years now. His work is delivered in a timely manner. And grades are...',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 3,
    rating: 10,
    date: '3 weeks ago',
    writerName: 'arthistorywriter02',
    writerLink: '/writers/arthistorywriter02.html',
    writerAvatar: '/w3t_avatar/writer/222/arthistorywriter02x64.webp',
    writerStatus: 'online',
    completedOrders: 2198,
    comment: 'Very attentive and responds super fast! Any request or adjustment that I needed she immediately handled!',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 4,
    rating: 10,
    date: '2 days ago',
    writerName: 'Professorwanya',
    writerLink: '/writers/professorwanya.html',
    writerAvatar: '/w3t_avatar/writer/286/professorwanyax64.webp',
    writerStatus: 'away',
    completedOrders: 16499,
    comment: 'Writer always does a magnificent job with the assignment . Always on time and always professional and very reliable. I highly recom...',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 5,
    rating: 10,
    date: '3 days ago',
    writerName: 'enockayega',
    writerLink: '/writers/enockayega.html',
    writerAvatar: '/w3t_avatar/writer/210/enockayegax64.webp',
    writerStatus: 'offline',
    completedOrders: 7078,
    comment: 'Amazing work and very expeditious.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 6,
    rating: 10,
    date: '4 days ago',
    writerName: 'Professorwanya',
    writerLink: '/writers/professorwanya.html',
    writerAvatar: '/w3t_avatar/writer/286/professorwanyax64.webp',
    writerStatus: 'away',
    completedOrders: 16499,
    comment: 'Great communication. Missed an instruction but fixed it immediately.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 7,
    rating: 10,
    date: '4 days ago',
    writerName: 'ochidomarwa',
    writerLink: '/writers/ochidomarwa.html',
    writerAvatar: '/w3t_avatar/writer/355/ochidomarwax64.webp',
    writerStatus: 'online',
    completedOrders: 5961,
    comment: 'Lovely and confident❤️❤️ Very warm and heartfelt. Rapid pace. Great writing!',
    descriptors: [
      'Great communication',
      'Fast delivery',
      'Great writing style',
    ],
  },
  {
    id: 8,
    rating: 10,
    date: '5 days ago',
    writerName: 'Professorwanya',
    writerLink: '/writers/professorwanya.html',
    writerAvatar: '/w3t_avatar/writer/286/professorwanyax64.webp',
    writerStatus: 'away',
    completedOrders: 16499,
    comment: 'Writer went above and beyond! Thank you!',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 9,
    rating: 10,
    date: '6 days ago',
    writerName: 'Nash-topwriter',
    writerLink: '/writers/nash-topwriter.html',
    writerAvatar: '/w3t_avatar/writer/678/nash-topwriterx64.webp',
    writerStatus: 'offline',
    completedOrders: 9289,
    comment: 'Really went above and beyond! Definitely recommend and will use for future again.',
    descriptors: [
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 10,
    rating: 10,
    date: '7 days ago',
    writerName: 'derick',
    writerLink: '/writers/derick.html',
    writerAvatar: '/w3t_avatar/writer/164/derickx64.webp',
    writerStatus: 'online',
    completedOrders: 5079,
    comment: 'The best technical writer ever! You can trust Derick!',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 11,
    rating: 10,
    date: '7 days ago',
    writerName: 'techpro12',
    writerLink: '/writers/techpro12.html',
    writerAvatar: '/w3t_avatar/writer/416/techpro12x64.webp',
    writerStatus: 'away',
    completedOrders: 2884,
    comment: 'The quality of work delivered was truly exceptional. Every component reflected a high level of professionalism, attention to detail...',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 12,
    rating: 10,
    date: 'one week ago',
    writerName: 'Professorwanya',
    writerLink: '/writers/professorwanya.html',
    writerAvatar: '/w3t_avatar/writer/286/professorwanyax64.webp',
    writerStatus: 'away',
    completedOrders: 16499,
    comment: 'I could not have asked for a better paper. Writer did an amazing job and always comes through. Very pleased and will highly recommend.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 13,
    rating: 10,
    date: 'one week ago',
    writerName: 'Nash-topwriter',
    writerLink: '/writers/nash-topwriter.html',
    writerAvatar: '/w3t_avatar/writer/678/nash-topwriterx64.webp',
    writerStatus: 'offline',
    completedOrders: 9289,
    comment: 'Working with Nash-topwriter has been an absolute pleasure.  She listens, gives updates and delivers exceptional work time and time ...',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 14,
    rating: 10,
    date: '12 days ago',
    writerName: 'Professorwanya',
    writerLink: '/writers/professorwanya.html',
    writerAvatar: '/w3t_avatar/writer/286/professorwanyax64.webp',
    writerStatus: 'away',
    completedOrders: 16499,
    comment: 'Excellent work, paper delivered on time and accurate.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 15,
    rating: 10,
    date: '13 days ago',
    writerName: 'Professorwanya',
    writerLink: '/writers/professorwanya.html',
    writerAvatar: '/w3t_avatar/writer/286/professorwanyax64.webp',
    writerStatus: 'away',
    completedOrders: 16499,
    comment: 'I look forward to working with you again in the fall.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 16,
    rating: 10,
    date: '13 days ago',
    writerName: 'Beverage',
    writerLink: '/writers/beverage.html',
    writerAvatar: '/w3t_avatar/writer/103/beveragex64.webp',
    writerStatus: 'away',
    completedOrders: 2646,
    comment: 'I will return for future work orders',
    descriptors: [
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
    ],
  },
  {
    id: 17,
    rating: 10,
    date: '13 days ago',
    writerName: 'WriterArthur',
    writerLink: '/writers/writerarthur.html',
    writerAvatar: '/w3t_avatar/writer/376/writerarthurx64.webp',
    writerStatus: 'online',
    completedOrders: 2273,
    comment: 'I look forward to all your help in the Fall semester.  Thank you for everything.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 18,
    rating: 10,
    date: '14 days ago',
    writerName: 'Beverage',
    writerLink: '/writers/beverage.html',
    writerAvatar: '/w3t_avatar/writer/103/beveragex64.webp',
    writerStatus: 'away',
    completedOrders: 2646,
    comment: "He's the fastest and the greatest!",
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 19,
    rating: 10,
    date: '3 weeks ago',
    writerName: 'Professorwanya',
    writerLink: '/writers/professorwanya.html',
    writerAvatar: '/w3t_avatar/writer/286/professorwanyax64.webp',
    writerStatus: 'away',
    completedOrders: 16499,
    comment: 'Great paper. The writer followed all instructions and went the extra mile. You could not go wrong with this writer.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
  {
    id: 20,
    rating: 10,
    date: '3 weeks ago',
    writerName: 'Professorwanya',
    writerLink: '/writers/professorwanya.html',
    writerAvatar: '/w3t_avatar/writer/286/professorwanyax64.webp',
    writerStatus: 'away',
    completedOrders: 16499,
    comment: 'Thank you for the paper. Always dependable and always professional.',
    descriptors: [
      'Great communication',
      'Fast responses',
      'Follows instructions',
      'Fast delivery',
      'Great writing style',
      'Great grammar',
    ],
  },
];

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<'writing' | 'editing'>('writing');
  const [slideIndex, setSlideIndex] = useState<number>(0);

  const currentPrices = activeTab === 'writing' ? sampleWritingPrices : editingPrices;

  const totalReviews = reviewsData.length;

  const nextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % totalReviews);
  };

  const prevSlide = () => {
    setSlideIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  };

  return (
    <main id="pricing-page" className="pt-[76px] bg-white min-h-screen">
      {/* Header Section */}
      <section
        className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden py-10 md:py-16"
        style={{
          borderColor: 'var(--slate-100, #dde6ef)',
        }}
      >
        <div className="container relative z-10">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
            style={{ color: 'var(--grey-500, #424242)' }}
          >
            Our Prices
          </h1>

          <p
            className="regular text-grey-400 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl"
            style={{ color: 'var(--grey-400, #5e5e5e)' }}
          >
            Here you can check our prices for sample writing and editing services. We offer our customers
            part-by-part payments and an option to pay only for approved paper parts to get the desired result.
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4 mt-6">
            {/* Academic level */}
            <div
              className="flex gap-2 items-center border border-solid border-slate-100 px-4 py-2 rounded-lg text-grey-400 bg-white shadow-xs"
              style={{
                borderColor: 'var(--slate-100, #dde6ef)',
                color: 'var(--grey-400, #5e5e5e)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 2.25L0.75 6.75L3.75 8.385V12.885L9 15.75L14.25 12.885V8.385L15.75 7.5675V12.75H17.25V6.75L9 2.25ZM14.115 6.75L9 9.54L3.885 6.75L9 3.96L14.115 6.75ZM12.75 12L9 14.04L5.25 12V9.2025L9 11.25L12.75 9.2025V12Z"
                  fill="#0080D1"
                />
              </svg>
              <p className="mb-0 text-sm font-medium">Academic level</p>
            </div>

            {/* Number of pages */}
            <div
              className="flex gap-2 items-center border border-solid border-slate-100 px-4 py-2 rounded-lg text-grey-400 bg-white shadow-xs"
              style={{
                borderColor: 'var(--slate-100, #dde6ef)',
                color: 'var(--grey-400, #5e5e5e)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.5625 3.75C3.2144 3.75 2.88056 3.89223 2.63442 4.14541C2.38828 4.39858 2.25 4.74196 2.25 5.1V15.9C2.25 16.258 2.38828 16.6014 2.63442 16.8546C2.88056 17.1078 3.2144 17.25 3.5625 17.25H11.4375C11.7856 17.25 12.1194 17.1078 12.3656 16.8546C12.6117 16.6014 12.75 16.258 12.75 15.9V7.8L8.8125 3.75H3.5625ZM3.5625 5.1H8.15625V8.475H11.4375V15.9H3.5625V5.1ZM4.875 10.5V11.85H10.125V10.5H4.875ZM4.875 13.2V14.55H8.15625V13.2H4.875Z"
                  fill="#0080D1"
                />
                <path
                  d="M7.3125 2.775H6V2.1C6 1.35442 6.58763 0.75 7.3125 0.75H12.5625L16.5 4.8V12.9C16.5 13.6456 15.9124 14.25 15.1875 14.25H13.875V12.9H15.1875V5.475H11.9063V2.1H7.3125V2.775Z"
                  fill="#0080D1"
                />
              </svg>
              <p className="mb-0 text-sm font-medium">Number of pages</p>
            </div>

            {/* Urgency */}
            <div
              className="flex gap-2 items-center border border-solid border-slate-100 px-4 py-2 rounded-lg text-grey-400 bg-white shadow-xs"
              style={{
                borderColor: 'var(--slate-100, #dde6ef)',
                color: 'var(--grey-400, #5e5e5e)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 16.2C12.96 16.2 16.2 12.96 16.2 9C16.2 5.04 12.96 1.8 9 1.8C5.04 1.8 1.8 5.04 1.8 9C1.8 12.96 5.04 16.2 9 16.2ZM9 0C13.95 0 18 4.05 18 9C18 13.95 13.95 18 9 18C4.05 18 0 13.95 0 9C0 4.05 4.05 0 9 0ZM9.45 4.5V9.9H4.5V8.55H8.1V4.5H9.45Z"
                  fill="#0080D1"
                />
              </svg>
              <p className="mb-0 text-sm font-medium">Urgency</p>
            </div>

            {/* Type of paper needed */}
            <div
              className="flex gap-2 items-center border border-solid border-slate-100 px-4 py-2 rounded-lg text-grey-400 bg-white shadow-xs"
              style={{
                borderColor: 'var(--slate-100, #dde6ef)',
                color: 'var(--grey-400, #5e5e5e)',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M13.5975 9L14.5425 8.055C14.8725 7.725 15.2925 7.545 15.75 7.5V6.75L11.25 2.25H3.75C2.9175 2.25 2.25 2.9175 2.25 3.75V14.25C2.25 14.6478 2.40804 15.0294 2.68934 15.3107C2.97064 15.592 3.35218 15.75 3.75 15.75H8.25V14.3475L8.3475 14.25H3.75V3.75H9V9H13.5975ZM10.5 3.375L14.625 7.5H10.5V3.375ZM14.3475 10.3725L15.8775 11.9025L11.28 16.5H9.75V14.97L14.3475 10.3725ZM17.1375 10.6425L16.4025 11.3775L14.8725 9.8475L15.6075 9.1125C15.75 8.9625 15.9975 8.9625 16.1475 9.1125L17.1375 10.1025C17.2875 10.2525 17.2875 10.5 17.1375 10.6425Z"
                  fill="#0080D1"
                />
              </svg>
              <p className="mb-0 text-sm font-medium">Type of paper needed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table & Details Section */}
      <section className="animate-appear-0 py-12 md:py-16 bg-white">
        <div className="container gap-8 lg:gap-12 grid grid-cols-1 xl:grid-cols-[1fr_264px]">
          <div>
            <div data-price-table="" data-direction="rtl" style={{ minHeight: '359px' }} data-active="true">
              <div className="bb-tableTabs">
                <button
                  type="button"
                  className={`bb-priceTabButton ${activeTab === 'writing' ? 'active' : ''}`}
                  onClick={() => setActiveTab('writing')}
                >
                  Sample writing
                </button>
                <button
                  type="button"
                  className={`bb-priceTabButton ${activeTab === 'editing' ? 'active' : ''}`}
                  onClick={() => setActiveTab('editing')}
                >
                  Editing
                </button>
              </div>

              <div className="bb-priceWidget" style={{ ['--p1eexmgx-0' as string]: 0, ['--p1eexmgx-1' as string]: 0 }}>
                <div className="bb-priceScroll">
                  <table className="bb-priceTable">
                    <thead>
                      <tr>
                        <th>Price/page*</th>
                        <th>10+ days</th>
                        <th>7 days</th>
                        <th>5 days</th>
                        <th>3 days</th>
                        <th>2 days</th>
                        <th>24 hrs</th>
                        <th>8 hrs</th>
                        <th>4 hrs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPrices.map((row, idx) => (
                        <tr key={idx}>
                          <td>{row.level}</td>
                          <td>{row.days10}</td>
                          <td>{row.days7}</td>
                          <td>{row.days5}</td>
                          <td>{row.days3}</td>
                          <td>{row.days2}</td>
                          <td>{row.hrs24}</td>
                          <td>{row.hrs8}</td>
                          <td>{row.hrs4}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex gap-4 flex-col md:flex-row mt-4">
              <a className="button primary-orange" href="/registration.html">
                Order an essay
              </a>
              <div className="flex gap-2 items-center flex-wrap">
                <span>We accept:</span>
                <img className="border border-solid border-slate-100 rounded-sm" src="/next/img/logos/payments/discover.png" alt="Discover" width="37" height="24" loading="lazy" title="Discover" aria-label="Discover" />
                <img className="border border-solid border-slate-100 rounded-sm" src="/next/img/logos/payments/amex.png" alt="Amex" width="37" height="24" loading="lazy" title="Amex" aria-label="Amex" />
                <img className="border border-solid border-slate-100 rounded-sm" src="/next/img/logos/payments/visa.png" alt="Visa" width="37" height="24" loading="lazy" title="Visa" aria-label="Visa" />
                <img className="border border-solid border-slate-100 rounded-sm" src="/next/img/logos/payments/mastercard.png" alt="Mastercard" width="37" height="24" loading="lazy" title="Mastercard" aria-label="Mastercard" />
                <img className="border border-solid border-slate-100 rounded-sm" src="/next/img/logos/payments/apple.png" alt="Apple" width="37" height="24" loading="lazy" title="Apple" aria-label="Apple" />
              </div>
            </div>

            <p className="text-grey-300 mt-6 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--grey-300, #7b7b7b)' }}>
              *The price indicated is the average that we recommend writers of our{' '}
              <a href="/" target="_blank" rel="noopener noreferrer" className="text-[#0080d1] hover:underline font-semibold">
                paper writing service
              </a>{' '}
              charge. The final price may vary based on the complexity of the essay, academic level and your deadline.
            </p>
          </div>

          {/* Benefit Guarantee Badges Sidebar */}
          <div className="flex flex-wrap sm:flex-row xl:flex-col gap-3 xl:mt-8 bg-slate-50/60 p-4 sm:p-6 rounded-12 border border-solid border-slate-100 h-fit">
            <div className="flex gap-3 items-center py-1 text-[#424242] font-semibold text-sm">
              <img className="shrink-0 w-6 h-6" src="/next/img/icons/pages/prices/money-back.svg" alt="Money-back guarantee" />
              <p className="mb-0">Money-back guarantee</p>
            </div>
            <div className="flex gap-3 items-center py-1 text-[#424242] font-semibold text-sm">
              <img className="shrink-0 w-6 h-6" src="/next/img/icons/pages/prices/part-by-part.svg" alt="Part by part payments" />
              <p className="mb-0">Part by part payments</p>
            </div>
            <div className="flex gap-3 items-center py-1 text-[#424242] font-semibold text-sm">
              <img className="shrink-0 w-6 h-6" src="/next/img/icons/pages/prices/free-revisions.svg" alt="Free revisions" />
              <p className="mb-0">Free revisions</p>
            </div>
            <div className="flex gap-3 items-center py-1 text-[#424242] font-semibold text-sm">
              <img className="shrink-0 w-6 h-6" src="/next/img/icons/pages/prices/anonymity.svg" alt="Absolute anonymity" />
              <p className="mb-0">Absolute anonymity</p>
            </div>
          </div>
        </div>
      </section>

      {/* SafePayments Section */}
      <section className="text-white animate-appear-0 my-8 md:my-12">
        <div className="container">
          <div className="p-8 sm:p-12 md:p-14 rounded-12 bg-blue-gradient flex flex-col md:flex-row gap-8 lg:gap-12 items-center justify-between shadow-xl">
            <div className="grow max-w-[546px]">
              <h2 className="variant-h3 mb-4 text-2xl sm:text-3xl font-extrabold flex flex-wrap items-center gap-2">
                <span>All orders are secured with</span>
                <img
                  className="inline-block"
                  src="/next/img/icons/pages/prices/safe-pay.svg"
                  alt="SafePayments"
                  width="205"
                  height="40"
                  loading="lazy"
                />
              </h2>
              <p className="text-white/95 text-sm sm:text-base leading-relaxed mb-4">
                What’s SafePayments? It’s a secure payment flow designed with you in mind.
              </p>
              <p className="text-white/95 text-sm sm:text-base leading-relaxed mb-0">
                You reserve funds and release them only when you are happy with result. In case of any bad
                experience, your money are 100% refundable at any point of the order.
              </p>
            </div>
            <img
              className="shrink max-w-full h-auto"
              src="/next/img/illustration/pages/prices/safe-payments-steps.svg"
              alt="safe payment steps"
              loading="lazy"
              width="456"
              height="150"
            />
          </div>
        </div>
      </section>

      {/* Reviews & Testimonials Carousel Section */}
      <section className="reviews pb-6" id="reviews">
        <div className="container min-h-[532px] animate-appear-0">
          <h2 className="text-center max-w-[750px] mx-auto text-[22px] md:text-[31px] font-bold text-[#424242] mb-6">
            Every order has it's story
          </h2>

          <div className="js--reviews-tabs mt-6 visible">
            <div className="grid sm:flex gap-2 md:gap-8 items-center flex-col sm:flex-row mb-2 sm:pr-[96px]">
              <button className="tab-button js--tab-button js--tab-active" data-tab="reviews--shark">
                <span className="flex items-center justify-center rounded-circle bg-slate-50 w-[48px] h-[48px] group-hover:bg-slate-100 transition">
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M24.6 3C25.5548 3 26.4705 3.37928 27.1456 4.05442C27.8207 4.72955 28.2 5.64522 28.2 6.6V9H25.8V23.4C25.8 24.3548 25.4207 25.2705 24.7456 25.9456C24.0705 26.6207 23.1548 27 22.2 27H5.4C4.44522 27 3.52955 26.6207 2.85442 25.9456C2.17929 25.2705 1.8 24.3548 1.8 23.4V21H21V23.4C21 23.6939 21.108 23.9776 21.3033 24.1972C21.4986 24.4169 21.7677 24.5572 22.0596 24.5916L22.2 24.6C22.4939 24.6 22.7776 24.4921 22.9972 24.2967C23.2169 24.1014 23.3572 23.8323 23.3916 23.5404L23.4 23.4V5.4H7.8C7.50608 5.40004 7.2224 5.50795 7.00276 5.70326C6.78311 5.89857 6.64279 6.1677 6.6084 6.4596L6.6 6.6V18.6H4.2V6.6C4.2 5.64522 4.57929 4.72955 5.25442 4.05442C5.92955 3.37928 6.84522 3 7.8 3H24.6Z"
                      fill="#006DC6"
                    />
                  </svg>
                </span>
                <span>BoffinGlobal.com</span>
              </button>
            </div>

            <div className="js--tab-content reviews--shark js--tab-active">
              <div data-reviews="" data-slidestoshow="3" data-qty="20" data-reviewslabel="" data-usemobilearrows="true" data-showstructureddata="false" data-active="true">
                <div data-testid="reviews" className="bb-testimonialsContainer">
                  <div className="slick-slider slick-initialized" dir="ltr">
                    {/* Slick Prev Button */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      data-role="none"
                      className="slick-arrow slick-prev bb-testimonialArrow"
                      style={{ '--tb58qww-0': '0', '--tb58qww-1': 'initial', '--tb58qww-2': 'calc(44px + 16px)', display: 'block' } as React.CSSProperties}
                      aria-label="Previous review"
                    >
                      <span className="bb-strokePath">
                        <svg width="44" height="44" fill="none" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" tabIndex={-1}>
                          <path d="M26.604 14.325l-8.186 8.186 8.186 8.186" stroke="#0080d1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </span>
                    </button>

                    {/* Testimonial Slides Track */}
                    <div className="slick-list">
                      <div className="slick-track grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[0, 1, 2].map((offset) => {
                          const index = (slideIndex + offset) % totalReviews;
                          const review = reviewsData[index];
                          return (
                            <div key={`${review.id}-${offset}`} className="bb-testimonialSlide">
                              <div className="bb-testimonialContainer">
                                <div className="bb-testimonialCustomer">
                                  <div className="bb-testimonialCustomerInfo">
                                    <div className="bb-testimonialCustomerRatingContainer">
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" tabIndex={-1}>
                                        <path
                                          d="M8 1.333l2.06 4.174 4.607.673-3.334 3.247.787 4.586L8 11.847l-4.12 2.166.787-4.586L1.333 6.18l4.607-.673L8 1.333z"
                                          fill="#F2CB52"
                                          stroke="#F2CB52"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <div className="bb-testimonialCustomerRating">{review.rating}</div>
                                      /10
                                    </div>
                                    <div className="bb-testimonialCustomerDate">{review.date}</div>
                                  </div>

                                  <div className="bb-customerCommentLabel">Client about {review.writerName}</div>

                                  <div className="bb-testimonialCustomerComment">
                                    {review.comment}
                                  </div>

                                  <div className="bb-descriptorsContainer">
                                    <div className="bb-descriptorIcon">
                                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" tabIndex={-1}>
                                        <mask id={`icon_descriptor--good_inline_svg__${review.id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="14" style={{ maskType: 'alpha' }}>
                                          <path fill="#C4C4C4" d="M0 0h14v14H0z" />
                                        </mask>
                                        <g mask={`url(#icon_descriptor--good_inline_svg__${review.id})`}>
                                          <path
                                            d="M9.042 6.417a.85.85 0 00.627-.248.85.85 0 00.248-.627.85.85 0 00-.248-.627.85.85 0 00-.627-.248.85.85 0 00-.627.248.85.85 0 00-.248.627.85.85 0 00.248.627.85.85 0 00.627.248zm-4.084 0a.85.85 0 00.627-.248.85.85 0 00.248-.627.85.85 0 00-.248-.627.85.85 0 00-.627-.248.85.85 0 00-.627.248.85.85 0 00-.248.627.85.85 0 00.248.627.85.85 0 00.627.248zM7 10.208c.69 0 1.3-.19 1.83-.568.53-.38.912-.87 1.145-1.473h-5.95A3.193 3.193 0 005.17 9.64c.53.379 1.14.568 1.83.568zm0 2.625a5.676 5.676 0 01-2.275-.46 5.886 5.886 0 01-1.852-1.246 5.887 5.887 0 01-1.247-1.852A5.677 5.677 0 011.166 7c0-.807.154-1.565.46-2.275a5.887 5.887 0 011.247-1.852 5.895 5.895 0 011.852-1.247A5.683 5.683 0 017 1.166c.807 0 1.565.154 2.275.46.71.306 1.327.722 1.852 1.247.525.525.94 1.142 1.247 1.852.306.71.46 1.468.46 2.275 0 .807-.154 1.565-.46 2.275a5.886 5.886 0 01-1.247 1.852 5.886 5.886 0 01-1.852 1.247c-.71.306-1.468.46-2.275.46zm0-1.166c1.293 0 2.394-.455 3.303-1.364.91-.909 1.364-2.01 1.364-3.303 0-1.293-.455-2.394-1.364-3.303-.909-.91-2.01-1.364-3.303-1.364-1.293 0-2.394.455-3.303 1.364-.909.909-1.364 2.01-1.364 3.303 0 1.293.455 2.394 1.364 3.303.91.91 2.01 1.364 3.303 1.364z"
                                            fill="#348E37"
                                          />
                                        </g>
                                      </svg>
                                    </div>
                                    <div className="bb-descriptorsList">
                                      {review.descriptors.map((desc, dIdx) => (
                                        <div key={dIdx} className="bb-descriptor">
                                          {desc}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                <a href={review.writerLink} className="bb-testimonialWriter">
                                  <div className="bb-testimonialWriterAvatarContainer">
                                    <img
                                      src={review.writerAvatar}
                                      width="42"
                                      height="42"
                                      loading="lazy"
                                      alt="Avatar"
                                      className="bb-testimonialWriterAvatar"
                                    />
                                    <div
                                      data-status={review.writerStatus}
                                      title={review.writerStatus}
                                      className="bb-testimonialWriterStatus"
                                    />
                                  </div>
                                  <div>
                                    <div className="bb-testimonialWriterNameWrapper">
                                      <div
                                        className="bb-testimonialWriterName"
                                        style={{ '--t120hf9w-0': '160px' } as React.CSSProperties}
                                      >
                                        {review.writerName}
                                      </div>
                                    </div>
                                    <div className="bb-testimonialWriterCompleted">
                                      {review.completedOrders.toLocaleString()} completed orders
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Slick Next Button */}
                    <button
                      type="button"
                      onClick={nextSlide}
                      data-role="none"
                      className="slick-arrow slick-next bb-testimonialArrow"
                      style={{ '--tb58qww-0': '0', '--tb58qww-1': 'initial', '--tb58qww-2': 'calc(44px + 16px)', display: 'block' } as React.CSSProperties}
                      aria-label="Next review"
                    >
                      <span className="bb-strokePath">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none" tabIndex={-1}>
                          <path d="M18.419 14.325l8.186 8.187-8.186 8.186" stroke="#0080D1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 animate-appear-0 mx-4" style={{
        webkitTextSizeAdjust: '100%',
        fontFeatureSettings: 'normal',
        webkitTapHighlightColor: 'transparent',
        fontVariationSettings: 'normal',
        tabSize: 4,
        fontFamily: 'Open Sans, sans-serif',
        color: '#424242',
        fontSize: '14px',
        lineHeight: '24px'
      } as React.CSSProperties}>
        <div className="container max-w-[1150px] rounded-12 pb-8 sm:pl-[196px] pt-[158px] sm:pt-8 relative sm:px-8 flex items-center shadow-lg flex-col sm:flex-row gap-4 border border-slate-50 border-solid" style={{
          boxShadow: '10px 10px 30px 0px rgba(32,54,70,.1)',
          borderRadius: '12px',
          borderColor: '#f1f5f9',
          borderStyle: 'solid',
          borderWidth: '1px',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          paddingLeft: '196px',
          paddingRight: '2rem',
          maxWidth: '1150px',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          gap: '1rem',
          flexDirection: 'row'
        } as React.CSSProperties}>
          <img
            className="-mt-16 absolute top-[70px] left-0 right-0 mx-auto sm:row-auto sm:mx-0 sm:top-auto sm:bottom-0 sm:left-8"
            src="/next/img/illustration/shark-cta-default.svg"
            alt=""
            width="151"
            height="143"
            loading="lazy"
          />
          <h2 className="subtitle mb-0 grow text-center sm:text-left" style={{
            fontSize: '22px',
            lineHeight: '31px',
            fontWeight: 700,
            color: '#424242'
          }}>
            Let our writers cover any of your writing needs!
          </h2>
          <a className="button primary-orange" href="/registration.html" aria-label="Order now" style={{
            borderRadius: '100px',
            backgroundColor: '#0080d1',
            color: '#fff',
            padding: '11px 40px',
            fontSize: '18px',
            fontWeight: 'bold',
            lineHeight: '20px',
            border: '2px solid #0080d1',
            textDecoration: 'none',
            display: 'inline-block',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}>
            Order now
          </a>
        </div>
      </section>
    </main>
  );
}


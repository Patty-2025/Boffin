import React from 'react';
import SEO from '../components/SEO';
import { Play, Mail, Facebook, Instagram } from 'lucide-react';
import Counter from '../components/Counter';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="pt-[72px] bg-slate-50 min-h-screen text-slate-800">
      <SEO 
        title="About Boffin Global Group | Professional Assignment Writing Services"
        description="Learn about Boffin Global Group, the premier provider of academic writing services, essays, dissertations, and technical assignment help for students worldwide."
        keywords="about boffin global group, assignment writing service company, academic writing help, PhD writing experts, essay help provider"
        canonicalUrl="/about-us"
      />

      {/* Hero Section */}
      <section className="relative border-b border-solid border-slate-100 overflow-hidden py-16 md:py-24">
        {/* Background Graphics */}
        <img
          className="absolute -bottom-[5rem] left-0 -z-[1] hidden xl:block"
          src="/next/img/bg/graphics-left.webp"
          alt=""
          loading="lazy"
          width="144"
          height="400"
        />
        <img
          className="absolute -bottom-[5rem] right-0 -z-[1] hidden xl:block"
          src="/next/img/bg/graphics-right.webp"
          alt=""
          loading="lazy"
          width="200"
          height="400"
        />

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-slate-900">
            Boffin Global Group - 13+ years of writing outstanding papers
          </h1>
          <p className="text-base md:text-lg text-grey-400 mb-2 max-w-2xl leading-relaxed">
            With our <a href="/" className="text-blue-500 hover:text-blue-700 underline font-semibold">assignment writing services</a> it is easy to write and study better.
          </p>
          <button
            className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-300 rounded-lg transition-colors"
            aria-label="Watch video about Boffin Global Group"
          >
            <span>Watch video</span>
            <Play size={18} className="fill-current" />
          </button>
        </div>
      </section>

      {/* Add your additional content here */}

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-12 text-slate-900">
            Our story
          </h2>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-4">
            {/* Timeline */}
            <div className="flex flex-col gap-4 lg:max-w-[520px] grow">
              {/* 2011 */}
              <div className="flex transition-all items-start group gap-6 border border-solid border-slate-100 p-6 rounded-xl hover:cursor-default hover:shadow-sm hover:border-blue-200">
                <div className="font-bold text-2xl transition-all text-slate-500 group-hover:text-blue-500 shrink-0">2011</div>
                <div className="flex-1">
                  <p className="subtitle mb-0 font-bold text-lg text-slate-900">Our story begins</p>
                  <p className="text-grey-300 text-base">First paper written by our <a href="/" className="text-blue-500 hover:text-blue-700">academic writers</a></p>
                </div>
              </div>

              {/* 2014 */}
              <div className="flex transition-all items-start group gap-6 border border-solid border-slate-100 p-6 rounded-xl hover:cursor-default hover:shadow-sm hover:border-blue-200">
                <div className="font-bold text-2xl transition-all text-slate-500 group-hover:text-blue-500 shrink-0">2014</div>
                <div className="flex-1">
                  <p className="subtitle mb-0 font-bold text-lg text-slate-900">100,000 written papers</p>
                  <p className="text-grey-300 text-base">Supporting students in their academic journey</p>
                </div>
              </div>

              {/* 2018 */}
              <div className="flex transition-all items-start group gap-6 border border-solid border-slate-100 p-6 rounded-xl hover:cursor-default hover:shadow-sm hover:border-blue-200">
                <div className="font-bold text-2xl transition-all text-slate-500 group-hover:text-blue-500 shrink-0">2018</div>
                <div className="flex-1">
                  <p className="subtitle mb-0 font-bold text-lg text-slate-900">Boffin Global Group formed</p>
                  <p className="text-grey-300 text-base">Expanded into technical assignment help services</p>
                </div>
              </div>

              {/* 2020 */}
              <div className="flex transition-all items-start group gap-6 border border-solid border-slate-100 p-6 rounded-xl hover:cursor-default hover:shadow-sm hover:border-blue-200">
                <div className="font-bold text-2xl transition-all text-slate-500 group-hover:text-blue-500 shrink-0">2020</div>
                <div className="flex-1">
                  <p className="subtitle mb-0 font-bold text-lg text-slate-900">Technical specialization</p>
                  <p className="text-grey-300 text-base">Launched SPSS, MATLAB, and coding assignment services</p>
                </div>
              </div>

              {/* 2022 */}
              <div className="flex transition-all items-start group gap-6 border border-solid border-slate-100 p-6 rounded-xl hover:cursor-default hover:shadow-sm hover:border-blue-200">
                <div className="font-bold text-2xl transition-all text-slate-500 group-hover:text-blue-500 shrink-0">2022</div>
                <div className="flex-1">
                  <p className="subtitle mb-0 font-bold text-lg text-slate-900">Global reach milestone</p>
                  <p className="text-grey-300 text-base">Serving 250+ universities across 50+ countries</p>
                </div>
              </div>

              {/* 2024 */}
              <div className="flex transition-all items-start group gap-6 border border-solid border-slate-100 p-6 rounded-xl hover:cursor-default hover:shadow-sm hover:border-blue-200">
                <div className="font-bold text-2xl transition-all text-slate-500 group-hover:text-blue-500 shrink-0">2024</div>
                <div className="flex-1">
                  <p className="subtitle mb-0 font-bold text-lg text-slate-900">1M+ assignments delivered</p>
                  <p className="text-grey-300 text-base">Leading provider of academic and technical assignment help</p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start pt-4">
                <span className="text-slate-600 font-semibold">Be a part of our story</span>
              </div>
            </div>

            {/* Image */}
            <div className="grow flex items-center justify-center lg:justify-start">
              <img
                className="block mx-auto lg:mx-0 w-full max-w-full h-auto"
                src="/next/img/illustration/pages/about-us/about-us-photo.webp"
                alt="Boffin Global Group team"
                loading="lazy"
                width="556"
                height="644"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-8 text-slate-900">
            Boffin Global Team
          </h2>

          <div className="pt-20 -mt-20" id="Jessica">
            <div className="flex flex-col md:flex-row gap-8 mb-8 border border-solid border-silver-500 rounded-[12px] p-4">
              <div className="shrink-0 max-w-[338px] mx-auto">
                <img className="rounded-[8px] w-full h-auto" src="/next/img/illustration/pages/about-us/nayeli_ellen.webp" alt="Jessica Chen" loading="lazy" width="338" height="420" />
              </div>

              <div className="grow flex flex-col gap-4">
                <p className="variant-h3 mb-0 font-bold font-lato">Jessica Chen</p>
                <div className="flex flex-wrap gap-4">
                  <div className="rounded-lg bg-green-50 text-green-900 px-3 py-1 w-fit caption">
                    Chief Marketing Officer (CMO)
                  </div>
                </div>
                <p className="text-grey-400">
                  With a strong experience in content editing, academic writing, and educational technology, Jessica leads marketing by combining analytical precision with creative storytelling. She is dedicated to elevating brand presence through data-driven campaigns, mindful leadership, and strategic content initiatives that resonate with student communities and educators alike.
                </p>
                <div className="subtitle font-bold font-lato">Certifications and Courses:</div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Google Analytics for Beginners
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    HubSpot Content Strategy Certification
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Coursera: Digital Marketing Specialization
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 -mt-20" id="Sarah">
            <div className="flex flex-col md:flex-row gap-8 mb-8 border border-solid border-silver-500 rounded-[12px] p-4">
              <div className="shrink-0 max-w-[338px] mx-auto">
                <img className="rounded-[8px]" src="/next/img/illustration/pages/about-us/melissa_mae.webp" alt="Sarah Mitchell" loading="lazy" width="338" height="420" />
                <div className="flex gap-3 mt-4">
                  <a className="text-blue-500 grow flex items-center justify-center py-1 rounded-lg border border-solid border-silver-500" data-tooltip="Open Sarah X profile" href="https://x.com/mae15579" target="_blank" rel="nofollow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.751 3H20.818L14.118 10.625L22 21H15.828L10.995 14.707L5.464 21H2.394L9.561 12.845L2 3H8.328L12.698 8.752L17.751 3ZM16.675 19.172H18.375L7.404 4.732H5.58L16.675 19.172Z" fill="currentColor" />
                    </svg>
                  </a>
                  <a className="text-blue-500 grow flex items-center justify-center py-1 rounded-lg border border-solid border-silver-500" data-tooltip="Open Melissa Medium profile" href="https://medium.com/@melissa_mae" target="_blank" rel="nofollow">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z" /></svg>
                  </a>
                </div>
              </div>

              <div className="grow flex flex-col gap-4">
                <p className="variant-h3 mb-0 font-bold font-lato">Sarah Mitchell</p>
                <div className="flex flex-wrap gap-4">
                  <div className="rounded-lg bg-green-50 text-green-900 px-3 py-1 w-fit caption">
                    High School English Teacher
                  </div>
                  <div className="rounded-lg bg-green-50 text-green-900 px-3 py-1 w-fit caption">
                    Education Consultant
                  </div>
                </div>
                <p className="text-grey-400">
                  Sarah Mitchell is a dedicated writing teacher for upper grade levels, with over 8 years of classroom experience. She holds a Master's degree in English and Education, with a specialized focus on writing instruction. Her commitment to excellence in teaching is further demonstrated by her National Board Certification in English Language Arts (ELA) for Adolescents and Young Adults. Sarah is passionate about guiding students to develop their writing skills, preparing them for both academic success and lifelong communication.
                </p>
                <div className="subtitle font-bold font-lato">Certifications and Courses:</div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    National Board Certification in English Language Arts (ELA) for Adolescents and Young Adults - NBPTS
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Teach2030 Head Teacher Training Course - Alison
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Teacher Training: Roles and Responsibilities of Educators - Alison
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Mastering the Art of Teacher Training - Alison
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Foundations of Teaching for Learning: Being a Teacher - Coursera
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Teach English Now! Teaching Language Online - Coursera
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 -mt-20" id="James">
            <div className="flex flex-col md:flex-row gap-8 mb-8 border border-solid border-silver-500 rounded-[12px] p-4">
              <div className="shrink-0 max-w-[338px] mx-auto">
                <img className="rounded-[8px]" src="/next/img/illustration/pages/about-us/frederick_poche.webp" alt="James Rodriguez" loading="lazy" width="338" height="420" />
                <div className="flex gap-3 mt-4">
                  <a className="text-blue-500 grow flex items-center justify-center py-1 rounded-lg border border-solid border-silver-500" data-tooltip="Open James X profile" href="https://x.com/PocheP60330" target="_blank" rel="nofollow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.751 3H20.818L14.118 10.625L22 21H15.828L10.995 14.707L5.464 21H2.394L9.561 12.845L2 3H8.328L12.698 8.752L17.751 3ZM16.675 19.172H18.375L7.404 4.732H5.58L16.675 19.172Z" fill="currentColor" />
                    </svg>
                  </a>
                  <a className="text-blue-500 grow flex items-center justify-center py-1 rounded-lg border border-solid border-silver-500" data-tooltip="Open Frederick Medium profile" href="https://medium.com/@Frederick_Poche" target="_blank" rel="nofollow">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M0 32v448h448V32H0zm372.2 106.1l-24 23c-2.1 1.6-3.1 4.2-2.7 6.7v169.3c-.4 2.6.6 5.2 2.7 6.7l23.5 23v5.1h-118V367l24.3-23.6c2.4-2.4 2.4-3.1 2.4-6.7V199.8l-67.6 171.6h-9.1L125 199.8v115c-.7 4.8 1 9.7 4.4 13.2l31.6 38.3v5.1H71.2v-5.1l31.6-38.3c3.4-3.5 4.9-8.4 4.1-13.2v-133c.4-3.7-1-7.3-3.8-9.8L75 138.1V133h87.3l67.4 148L289 133.1h83.2v5z" /></svg>
                  </a>
                </div>
              </div>

              <div className="grow flex flex-col gap-4">
                <p className="variant-h3 mb-0 font-bold font-lato">James Rodriguez</p>
                <div className="flex flex-wrap gap-4">
                  <div className="rounded-lg bg-green-50 text-green-900 px-3 py-1 w-fit caption">
                    Content Marketer
                  </div>
                  <div className="rounded-lg bg-green-50 text-green-900 px-3 py-1 w-fit caption">
                    Copywriter
                  </div>
                </div>
                <p className="text-grey-400">
                  James Rodriguez is a content marketer with 11 years of experience, holding a HubSpot Content Marketing Certification among numerous others. He has written over 1,000 articles, demonstrating his expertise in creating impactful content and executing effective marketing strategies. His strong passion for storytelling and data-driven results has made him a trusted expert in the industry.
                </p>
                <div className="subtitle font-bold font-lato">Certifications and Courses:</div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Content Marketing Certification - HubSpot
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Copywriting Certification - American Writers &amp; Artists Inc. (AWAI)
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Google Analytics Individual Qualification (GAIQ) - Google
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    SEO Certification - Moz or SEMrush
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Digital Marketing Specialist - Digital Marketing Institute (DMI)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 -mt-20" id="Sarah">
            <div className="flex flex-col md:flex-row gap-8 mb-8 border border-solid border-silver-500 rounded-[12px] p-4">
              <div className="shrink-0 max-w-[338px] mx-auto">
                <img className="rounded-[8px]" src="/next/img/illustration/pages/about-us/kylie_clemens.webp" alt="Sarah Ahmed" loading="lazy" width="338" height="420" />
              </div>
              <div className="grow flex flex-col gap-4">
                <p className="variant-h3 mb-0 font-bold font-lato">Sarah Ahmed</p>
                <div className="flex flex-wrap gap-4">
                  <div className="rounded-lg bg-green-50 text-green-900 px-3 py-1 w-fit caption">
                    Director of Social Media
                  </div>
                </div>
                <p className="text-grey-400">
                  Sarah Ahmed is a social media expert with over 5 years of experience in boosting engagement and driving user growth for digital education platforms. With certifications in digital marketing from Google and HubSpot, she specializes in organic growth and paid campaigns, achieving consistent KPI success with 30%+ engagement increases and a 50% rise in follower conversion rates. She's skilled in content strategy, brand voice optimization, and leveraging analytics to fine-tune audience targeting. Her work philosophy is rooted in continuous learning, data-driven creativity, and delivering measurable results.
                </p>
                <div className="subtitle font-bold font-lato">Certifications and Courses:</div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Social Media Marketing Professional Certificate - Meta
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Social Media Marketing Certification - HubSpot Academy
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Social Marketing Certification - Hootsuite Academy
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Social Media Marketing Specialization - Northwestern University
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Social Media Marketing Master Certification - Boot Camp Digital
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-20 -mt-20" id="Marcus">
            <div className="flex flex-col md:flex-row gap-8 mb-8 border border-solid border-silver-500 rounded-[12px] p-4">
              <div className="shrink-0 max-w-[338px] mx-auto">
                <img className="rounded-[8px]" src="/next/img/illustration/pages/about-us/jeri_donaldson.webp" alt="Marcus Chen" loading="lazy" width="338" height="420" />
              </div>
              <div className="grow flex flex-col gap-4">
                <p className="variant-h3 mb-0 font-bold font-lato">Marcus Chen</p>
                <div className="flex flex-wrap gap-4">
                  <div className="rounded-lg bg-green-50 text-green-900 px-3 py-1 w-fit caption">
                    Chief Human Resources Officer (CHRO)
                  </div>
                </div>
                <p className="text-grey-400">
                  Marcus Chen is an HR expert with 12 years of experience, holding both a SHRM-SCP certification and a Master's degree in Human Resources. He's proud to have streamlined the recruitment process and strengthened employee retention, building a 95% retention rate. In his role, he's expanded employer branding reach by 45% and hosted industry webinars on HR innovation. His work philosophy blends a people-centered approach with data-driven decisions, ensuring that each hire is a valuable addition.
                </p>
                <div className="subtitle font-bold font-lato">Certifications and Courses:</div>
                <div className="flex flex-wrap gap-2">
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Senior Professional in Human Resources (SPHR) – HR Certification Institute (HRCI)
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    SHRM Senior Certified Professional (SHRM-SCP) – Society for Human Resource Management (SHRM)
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Global Professional in Human Resources (GPHR) – HR Certification Institute (HRCI)
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Strategic HR Leadership (SHRL) – Human Capital Institute (HCI)
                  </div>
                  <div className="text-grey-400 rounded-lg sm:border flex gap-1 sm:items-center border-solid border-slate-100 sm:px-3 sm:py-1 w-fit">
                    <svg className="shrink-0 relative top-1 sm:top-0" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.45 16.875L5.025 14.475L2.325 13.875L2.5875 11.1L0.75 9L2.5875 6.9L2.325 4.125L5.025 3.525L6.45 1.125L9 2.2125L11.55 1.125L12.975 3.525L15.675 4.125L15.4125 6.9L17.25 9L15.4125 11.1L15.675 13.875L12.975 14.475L11.55 16.875L9 15.7875L6.45 16.875ZM8.2125 11.6625L12.45 7.425L11.4 6.3375L8.2125 9.525L6.6 7.95L5.55 9L8.2125 11.6625Z" fill="#43A047" />
                    </svg>
                    Human Resource Associate Professional Certificate – HRCI (via Coursera)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Count Stats Section */}
      <section className="animate-appear-0 js--stats js--service-stats overflow-hidden py-16 md:py-24">
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

      {/* Three Cards Section */}
      <section className="animate-appear-0 py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 rounded-12 border border-solid border-slate-100 p-6">
              <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.6098 20.4786L10.5004 19.3779C10.1389 19.0195 9.85261 18.5936 9.65805 18.1247C9.4635 17.6559 9.36456 17.1534 9.36696 16.6463C9.36936 16.1393 9.47305 15.6378 9.67203 15.1707C9.87101 14.7037 10.1613 14.2805 10.5262 13.9255L11.6098 12.8759C11.1815 12.8275 10.7509 12.8018 10.3198 12.7991C6.87558 12.7991 0 14.5142 0 17.9188V20.4786H11.6098ZM10.3198 10.2393C13.1707 10.2393 15.4797 7.94827 15.4797 5.11966C15.4797 2.29105 13.1707 0 10.3198 0C7.46897 0 5.15991 2.29105 5.15991 5.11966C5.15991 7.94827 7.46897 10.2393 10.3198 10.2393ZM17.0019 20.1971C16.4988 20.6962 15.6732 20.6962 15.1701 20.1971L12.4999 17.522C12.2643 17.2849 12.1323 16.9654 12.1323 16.6325C12.1323 16.2996 12.2643 15.98 12.4999 15.7429L12.5128 15.7302C12.6309 15.6116 12.7715 15.5174 12.9265 15.4532C13.0815 15.3889 13.2478 15.3559 13.4158 15.3559C13.5838 15.3559 13.7501 15.3889 13.9051 15.4532C14.0601 15.5174 14.2007 15.6116 14.3188 15.7302L16.086 17.4836L21.8006 11.7752C21.92 11.6566 22.0617 11.5624 22.2178 11.4982C22.3738 11.434 22.5411 11.4009 22.7101 11.4009C22.879 11.4009 23.0463 11.434 23.2024 11.4982C23.3584 11.5624 23.5002 11.6566 23.6195 11.7752L23.6324 11.788C23.868 12.0251 24 12.3446 24 12.6776C24 13.0105 23.868 13.33 23.6324 13.5671L17.0019 20.1971Z" fill="currentColor"></path>
              </svg>
              <h3 className="subtitle mb-0">You decide</h3>
              <p className="text-grey-400">what writer is best for each job, monitor and supervise writers' work on orders, and make suggestions to help writers perfect their work to their full satisfaction.</p>
            </div>
            <div className="flex flex-col gap-4 rounded-12 border border-solid border-slate-100 p-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6667 8.66667H18.6667C19.4 8.66667 20 8.06667 20 7.33333C20 6.6 19.4 6 18.6667 6H14.6667C13.9333 6 13.3333 6.6 13.3333 7.33333C13.3333 8.06667 13.9333 8.66667 14.6667 8.66667ZM14.6667 18H18.6667C19.4 18 20 17.4 20 16.6667C20 15.9333 19.4 15.3333 18.6667 15.3333H14.6667C13.9333 15.3333 13.3333 15.9333 13.3333 16.6667C13.3333 17.4 13.9333 18 14.6667 18ZM21.3333 24H2.66667C1.2 24 0 22.8 0 21.3333V2.66667C0 1.2 1.2 0 2.66667 0H21.3333C22.8 0 24 1.2 24 2.66667V21.3333C24 22.8 22.8 24 21.3333 24ZM5.33333 10.6667H9.33333C10.0667 10.6667 10.6667 10.0667 10.6667 9.33333V5.33333C10.6667 4.6 10.0667 4 9.33333 4H5.33333C4.6 4 4 4.6 4 5.33333V9.33333C4 10.0667 4.6 10.6667 5.33333 10.6667ZM5.33333 5.33333H9.33333V9.33333H5.33333V5.33333ZM5.33333 20H9.33333C10.0667 20 10.6667 19.4 10.6667 18.6667V14.6667C10.6667 13.9333 10.0667 13.3333 9.33333 13.3333H5.33333C4.6 13.3333 4 13.9333 4 14.6667V18.6667C4 19.4 4.6 20 5.33333 20ZM5.33333 14.6667H9.33333V18.6667H5.33333V14.6667Z" fill="currentColor"></path>
              </svg>
              <h3 className="subtitle mb-0">You plan</h3>
              <p className="text-grey-400">your own budget and choose a writer in line with the price requested for the job, the writer's CV, professional experience, and writing skills.</p>
            </div>
            <div className="flex flex-col gap-4 rounded-12 border border-solid border-slate-100 p-6">
              <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 21.8182H4.36364V8.72727H0V21.8182ZM24 9.81818C24 8.61818 23.0182 7.63636 21.8182 7.63636H14.9345L15.9709 2.65091L16.0036 2.30182C16.0036 1.85455 15.8182 1.44 15.5236 1.14545L14.3673 0L7.18909 7.18909C6.78545 7.58182 6.54545 8.12727 6.54545 8.72727V19.6364C6.54545 20.8364 7.52727 21.8182 8.72727 21.8182H18.5455C19.4509 21.8182 20.2255 21.2727 20.5527 20.4873L23.8473 12.7964C23.9455 12.5455 24 12.2836 24 12V9.81818Z" fill="currentColor"></path>
              </svg>
              <h3 className="subtitle mb-0">You evaluate</h3>
              <p className="text-grey-400">writers' performance and share feedback with other users of <a href="/" target="_blank" className="text-blue-500 hover:text-blue-700 underline">essay writing service</a> to ensure writers' ratings are transparent and adequate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-8 animate-appear-0 mx-4 font-['Open_Sans',sans-serif]">
        <div className="max-w-[1150px] mx-auto rounded-[12px] pb-8 sm:pl-[196px] pt-[158px] sm:pt-8 relative sm:px-8 flex items-center shadow-lg flex-col sm:flex-row gap-4 border border-slate-50 border-solid bg-white">
          <img
            className="-mt-16 absolute top-[70px] left-0 right-0 mx-auto sm:row-auto sm:mx-0 sm:top-auto sm:bottom-0 sm:left-8 shrink-0"
            src="/next/img/illustration/shark-cta-default.svg"
            alt=""
            width="151"
            height="143"
            loading="lazy"
          />
          <h2 className="subtitle mb-0 grow text-center sm:text-left text-[20px] md:text-[22px] lg:text-[26px] font-bold text-[#424242] leading-[28px] md:leading-[31px]">
            Let our writers cover any of your writing needs!
          </h2>
          <Link
            to="/registration"
            aria-label="Order now"
            className="button primary-orange inline-flex items-center justify-center font-bold text-[18px] leading-[20px] bg-[#0080d1] text-white hover:bg-[#004695] border-[2px] border-solid border-[#0080d1] hover:border-[#004695] rounded-[100px] px-[40px] py-[11px] w-fit transition-colors shadow-md hover:shadow-lg shrink-0 whitespace-nowrap"
          >
            Order now
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-slate-50 animate-appear-0 relative py-16 md:py-24 overflow-hidden">
        <div className="container">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">
            Contact us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* For Customers */}
            <div className="flex flex-col bg-white gap-4 rounded-12 border border-solid border-slate-50 max-[374px]:p-3 p-6 max-[374px]:-m-3">
              <h3 className="text-xl font-bold">For customers</h3>
              <p className="text-grey-300">
                If you need help with payments or experience technical problems with your account, write us a message via Support tab. If you don't have an account on Boffin Global yet, you can contact us via e-mail
              </p>
              <a className="group w-fit" href="mailto:info@boffinglobalgroup.com">
                <div className="group-hover:bg-blue-50 flex gap-1 sm:gap-4 p-3 rounded-12 bg-slate-50 w-fit text-[14px] transition-colors">
                  <Mail size={24} className="text-blue-500" />
                  <span>info@boffinglobalgroup.com</span>
                </div>
              </a>
              <span className="text-lg font-semibold">Follow us</span>
              <div className="flex gap-4">
                <a href="https://x.com/boffinglobal" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.223-6.823-5.974 6.823h-3.31l7.732-8.835L.424 2.25h6.852l4.722 6.248L17.616 2.25h.628zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://facebook.com/boffinglobal/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                  <Facebook size={28} />
                </a>
                <a href="https://www.instagram.com/boffinglobal/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 transition-colors">
                  <Instagram size={28} />
                </a>
              </div>
            </div>

            {/* For Writers */}
            <div className="flex flex-col bg-white gap-4 rounded-12 border border-solid border-slate-50 max-[374px]:p-3 p-6 max-[374px]:-m-3">
              <h3 className="text-xl font-bold">For writers</h3>
              <p className="text-grey-300">
                If you have any questions about working process, please contact corresponding department via Support tab. In case you are experiencing problems with your profile, contact us via e-mail
              </p>
              <a className="group w-fit" href="mailto:support@boffinglobalgroup.com">
                <div className="group-hover:bg-blue-50 flex gap-1 sm:gap-4 p-3 rounded-12 bg-slate-50 w-fit text-[14px] transition-colors">
                  <Mail size={24} className="text-blue-500" />
                  <span>support@boffinglobalgroup.com</span>
                </div>
              </a>
              <div className="text-lg font-semibold">Want to become a freelance writer with us?</div>
              <a className="button secondary w-fit text-[14px] px-6 bg-slate-100 text-slate-800 hover:bg-slate-200 border border-solid border-slate-200 rounded-lg font-semibold transition-colors" href="#">
                Sign up as a writer now →
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default function FindWriterCta() {
  return (
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
          Find a specialist for your next assignment
        </h2>
        <Link
          to="/registration"
          aria-label="Write my essay"
          className="button primary-orange inline-flex items-center justify-center font-bold text-[18px] leading-[20px] bg-[#ff8b00] text-white hover:bg-[#ff9a00] border-[2px] border-solid border-[#ff8b00] hover:border-[#ff9a00] rounded-[100px] px-[40px] py-[11px] w-fit transition-colors shadow-md hover:shadow-lg shrink-0 whitespace-nowrap"
        >
          Write my essay
        </Link>
      </div>
    </section>
  );
}


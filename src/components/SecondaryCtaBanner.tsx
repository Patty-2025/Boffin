import React from 'react';
import { Link } from 'react-router-dom';

export const SecondaryCtaBanner: React.FC = () => {
  return (
    <section className="py-8 animate-appear-0 mx-4 font-['Open_Sans',sans-serif]">
      <div className="container max-w-[1150px] mx-auto rounded-[12px] pb-8 sm:pl-[196px] pt-[158px] sm:pt-8 relative sm:px-8 flex items-center shadow-lg flex-col sm:flex-row gap-4 border border-slate-50 border-solid bg-white">
        <img 
          className="-mt-16 absolute top-[70px] left-0 right-0 mx-auto sm:row-auto sm:mx-0 sm:top-auto sm:bottom-0 sm:left-8 shrink-0" 
          src="/next/img/illustration/shark-cta-default.svg" 
          alt="" 
          width="151" 
          height="143" 
          loading="lazy"
        />

        <h2 className="subtitle mb-0 grow text-center sm:text-left text-[20px] md:text-[22px] font-bold text-[#424242] leading-[28px] md:leading-[31px]">
          Let our experts handle your assignment and avoid unnecessary stress!
        </h2>

        <Link 
          to="/order" 
          aria-label="Write my essay"
          className="button primary-orange inline-flex items-center justify-center bg-[#ff8b00] hover:bg-[#e07b00] text-white font-bold rounded-full px-8 py-3 text-[18px] leading-[20px] transition-colors shadow-md hover:shadow-lg shrink-0"
        >
          Write my essay
        </Link>
      </div>
    </section>
  );
};

export default SecondaryCtaBanner;

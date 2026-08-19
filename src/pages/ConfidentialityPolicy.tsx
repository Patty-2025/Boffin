import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Counter from '../components/Counter';

export default function ConfidentialityPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-[80px] bg-[#f8f9fa] min-h-screen font-sans">
      <Navbar />

      <section className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden bg-white py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] font-display mb-0">
            Confidentiality Policy
          </h1>
        </div>
      </section>

      <section className="animate-appear-0 py-12">
        <div className="container max-w-[1150px] mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
            <div className="styled-scrollbar pr-2 overflow-y-scroll max-h-[800px] grow [&>p]:text-slate-600 [&>p]:mb-4 [&>ul]:text-slate-600 [&>ol]:text-slate-600 [&>ol]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-slate-900">
              <p>Last updated: Nov 7, 2025.</p>
              <p>
                At <strong>boffinglobalgroup.com</strong> we take confidentiality very seriously. However, we
                have noticed that sometimes communication between Writers and Customers in chat within
                some orders tends to ignore the sensitive principles of confidentiality. Because of
                this, we have decided to introduce three principles of confidentiality we ask all
                customers to follow:
              </p>

              <ol className="list-decimal pl-6 space-y-3 mb-4">
                <li>
                  <strong>Do not share your personal contacts with your Writer.</strong> This includes
                  your first and last name, email address, phone number, university or school you
                  attend, or your home address. Our system is built for our Customers and Writers to
                  work comfortably inside the order page without having to use any other means of
                  communication. If you need to share a document or other types of additional
                  materials, upload them onto your order page, or use a free file-sharing website. If
                  the Writer is offline, and you urgently need their reply, let us know by creating a
                  query for our Support team. We work 24/7 and will assist you the best way we can.
                </li>
                <li>
                  <strong>Do not give the Writer your login details to your school or university
                  website.</strong> If you need to share information, retrieve it yourself and upload it
                  using one of the methods described in the previous paragraph. Giving anyone access to
                  your personal log is something we strongly discourage.
                </li>
                <li>
                  <strong>Do not deal with your Writer via any third party services.</strong> In the
                  recent past, we have had an instance of a scam account used, to which several
                  customers fell victim. Remember: it is only safe to pay for your order directly
                  through our website. We do not collect your credit card information, and have a
                  transparent money back guarantee.
                </li>
              </ol>

              <p>
                <strong>boffinglobalgroup.com is a secure website.</strong>
              </p>
              <p>
                Complete confidentiality is essential when it comes to online academic assistance. We
                never ask for any more information than we need to get you started with an order. We
                insist very strongly that you keep your communication with Writers confidential as
                well.
              </p>
              <p>
                You agree to comply with all points of this Confidentiality Policy when you first
                place an order with boffinglobalgroup.com.
              </p>
            </div>

            <div className="grow shrink-0 lg:w-[264px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col text-sm font-semibold">
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/refund-policy.html">Refund Policy</a>
                <a className="block border-b px-2 py-3 text-blue-900 bg-slate-50 border-blue-500" href="/confidentiality-policy.html">Confidentiality policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/terms-and-conditions.html">Terms &amp; Conditions</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/cookie-policy.html">Cookie Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/privacy-policy.html">Privacy Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/discount-policy.html">Discount Policy</a>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            Find an essay writer for your next order
          </h2>
          <a
            href="/registration"
            aria-label="Order now"
            className="button primary-orange inline-flex items-center justify-center font-bold text-[18px] leading-[20px] bg-[#0080d1] text-white hover:bg-[#004695] border-[2px] border-solid border-[#0080d1] hover:border-[#004695] rounded-[100px] px-[40px] py-[11px] w-fit transition-colors shadow-md hover:shadow-lg shrink-0 whitespace-nowrap"
          >
            Order now
          </a>
        </div>
      </section>

      <section className="animate-appear-0 js--stats js--service-stats overflow-hidden py-16 md:py-24">
        <div className="container max-w-[1150px] mx-auto px-4 relative z-[1]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Counter as="div" value={15} suffix="+" className="stat-number" id="years_on_market" />
              <p className="stat-label">Years on the market</p>
            </div>
            <div>
              <Counter as="div" value={9.65} suffix="/10" className="stat-number" id="quality_score" />
              <p className="stat-label">Average quality score</p>
            </div>
            <div>
              <Counter as="div" value={57} suffix="K+" className="stat-number" id="returning_customers" />
              <p className="stat-label">Returning customers</p>
            </div>
            <div>
              <Counter as="div" value={46} suffix="" className="stat-number" id="writers_count" />
              <p className="stat-label">Writers active daily</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

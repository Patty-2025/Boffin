import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Counter from '../components/Counter';

export default function RefundPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-[80px] bg-[#f8f9fa] min-h-screen font-sans">
      <Navbar />

      <section className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden bg-white py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] font-display mb-0">
            Refund Policy
          </h1>
        </div>
      </section>

      <section className="animate-appear-0 py-12">
        <div className="container max-w-[1150px] mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
            <div className="styled-scrollbar pr-2 overflow-y-scroll max-h-[800px] grow [&>p]:text-slate-600 [&>p]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-slate-900">
              <p>Last updated: Nov 7, 2025.</p>
              <p>
                <i>Version 2. Effective as of Oct 20, 2025</i>
              </p>
              <p>
                We undertake to deliver You the product that matches the deadline, quality, and
                instructions. If we fail to do so, You are entitled to a partial or a full refund
                according to this Refund Policy.
              </p>
              <p>
                Each refund case is reviewed separately by our team. We reserve the right to deviate
                from the Refund Policy in case such deviation favours You as we understand that the
                circumstances might be unique and not fully covered by this Policy.
              </p>
              <p>
                If You decide to cancel your order, please go to your order page, click the “Cancel
                Order” button, choose the reason, and confirm the cancellation.
              </p>
              <p>Cases when you are entitled to a refund:</p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  <u>No Writer assigned/no Orders in progress.</u> In this case, we can refund 100%
                  of the funds.
                </li>
                <li>
                  <u>The Writer was assigned, but you decided to cancel the order.</u> In this case,
                  the refund amount varies from 100% to 20% depending on the stage of work done by
                  the Writer.
                </li>
                <li>
                  <u>Missed Deadline.</u> In such a case we may make a partial refund of an
                  appropriate amount to compensate for the late delivery if it happened by our fault,
                  and we were not waiting for any information from the customer. Such cases are
                  individual and will be decided with each customer.
                </li>
                <li>
                  <u>Not satisfied with the quality.</u> Our system works the way that we show you
                  parts of the product before you approve it. Thus, you only release funds after you
                  checked the product and agreed with its quality. Thus, we will not accept quality
                  claims after the product is approved by you.
                </li>
                <li>No refund claim is accepted for Tips.</li>
              </ul>
              <p>
                Note: Once your order is completed and delivered on time, you cannot cancel it. In
                such cases, refunds are possible only through a quality-related claim.
              </p>
              <p>Please contact us in case of any non-described situation.</p>

              <h3>Refund processing</h3>
              <p>
                Once you submit a refund request, you can expect the money to be back on your credit
                card within 7–12 business days. Please note, that the company can not be held
                responsible for your bank fees, processing time, and/or possible delays occurring due
                to any bank service issues.
              </p>
              <p>! Please note that all refunds will be provided via the original method of payment.</p>
            </div>

            <div className="grow shrink-0 lg:w-[264px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col text-sm font-semibold">
                <a className="block border-b px-2 py-3 text-blue-900 bg-slate-50 border-blue-500" href="/refund-policy.html">Refund Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/confidentiality-policy.html">Confidentiality policy</a>
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

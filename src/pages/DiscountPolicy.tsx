import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Counter from '../components/Counter';

export default function DiscountPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-[80px] bg-[#f8f9fa] min-h-screen font-sans">
      <Navbar />

      <section className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden bg-white py-10 lg:py-12">
        <img
          className="absolute bottom-0 right-0 -z-[1] hidden xl:block"
          src="/next/img/bg/graphics-right-small.webp"
          alt=""
          loading="lazy"
          width="200"
          height="400"
        />
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] font-display mb-0">
            Discount Policy
          </h1>
        </div>
      </section>

      <section className="animate-appear-0 py-12">
        <div className="container max-w-[1150px] mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
            <div className="styled-scrollbar pr-2 overflow-y-scroll max-h-[800px] grow [&>p]:text-slate-600 [&>p]:mb-4 [&>ul]:text-slate-600 [&>ul]:mb-4 [&>ol]:text-slate-600 [&>ol]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-slate-900">
              <p>1. We do not offer permanent discounts on our products or services. Discounts are offered periodically as part of our marketing strategies for specific events or occasions. These events may include holidays, sales promotions, and other special occasions. We reserve the right to offer or withdraw discounts at our discretion during these events.</p>

              <p>
                2. There may be different types of discounts which include discounts for new customers
                and individual discounts. <br />
                The discounts for new customers are only applicable to the first order for individuals
                who register their first-ever account during the promotional period. <br />
                Individual discounts are based on specific criteria such as loyalty, purchase history,
                or participation in certain promotional events. The terms and conditions for these
                discounts will be provided when such discounts are available.
              </p>

              <p>
                3. Every discount we offer has a predefined validity period, which is specified in
                accordance with the Coordinated Universal Time (UTC). This period specifies the
                duration during which the discount is applicable. After the validity period expires,
                the discount will no longer be available for use. Please note that all references to
                time and dates, including the start and end times of discounts, are based on the
                specified time zone.
              </p>

              <p>
                4. We offer Percentage-Based Discounts and Amount-Based Discounts. <br />
                Percentage-Based Discounts are calculated as a certain percentage of the original price
                of the product or service. <br />
                Amount-Based Discounts provide a specific monetary reduction from the product's regular
                price. <br />
                If your order qualifies for a discount but exceeds the set limitations, the discount
                will be applied up to the maximum allowed amount. Any portion of the discount beyond
                the limit will not be applicable. You will be charged the regular price for the excess
                amount.
              </p>

              <p>
                5. If you decide to cancel your discounted order, you will lose the benefit of a
                discount on your next order. However, we may consider providing the discount again if
                we fail to deliver a product meeting our quality standards, which include originality
                and timely delivery for the discounted order. <br />
                In the event of a refund for a purchase made with a discount, the refunded amount will
                be the actual amount paid, excluding the discount.
              </p>

              <p>6. Please note that only one discount can be applied to each order. Multiple discounts or promotions cannot be combined for a single purchase.</p>

              <p>7. We will keep our customers informed about new discount offers and promotions through email notifications, website announcements, and/or social media campaigns.</p>

              <p>8. Non-transferable: Discounts are non-transferable and cannot be applied to future purchases, unless specifically decided by us.</p>

              <p>9. Non-Convertible: Discounts cannot be converted into cash or any other form of currency.</p>

              <p>
                We reserve the right to check compliance with the requirements of our discount offers
                and deny you the discount in case of its violation or other violations of our Terms and
                Conditions. <br />
                By submitting your payment details, you confirm your acceptance of the Discount Policy
                and agree to the terms and conditions of this Discount Policy. <br />
                All information we collect under the Discount Offer will be processed in accordance with
                our Privacy Policy.
              </p>
            </div>

            <div className="grow shrink-0 lg:w-[264px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col text-sm font-semibold">
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/refund-policy.html">Refund Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/confidentiality-policy.html">Confidentiality policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/terms-and-conditions.html">Terms &amp; Conditions</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/cookie-policy.html">Cookie Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/privacy-policy.html">Privacy Policy</a>
                <a className="block border-b px-2 py-3 text-blue-900 bg-slate-50 border-blue-500" href="/discount-policy.html">Discount Policy</a>
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

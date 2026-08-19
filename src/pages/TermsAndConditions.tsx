import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Counter from '../components/Counter';

export default function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-[80px] bg-[#f8f9fa] min-h-screen font-sans">
      <Navbar />
      
      <section className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden bg-white py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] font-display mb-0">
            Terms & Conditions
          </h1>
        </div>
      </section>

      <section className="animate-appear-0 py-12">
        <div className="container animate-appear-0 max-w-[1150px] mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
            <div className="styled-scrollbar pr-2 overflow-y-scroll max-h-[800px] grow [&>p]:text-slate-600 [&>p]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-slate-900">
              <p>Last updated: Nov 7, 2025.</p>
              <p><strong>If you are looking for “terms &amp; conditions” for writers, you can find it <a href="/writer-terms-and-conditions.html" className="text-blue-500 hover:underline">here</a>.</strong></p>
              <p><i>Version 2. Effective as of October 20, 2025.</i></p>
              <p>These terms &amp; conditions (the “<strong>T&amp;C</strong>” or “<strong>Terms</strong>”) govern your access and use of our Website and services at BoffinGlobal.com (the “<strong>Website</strong>”). Please read them carefully.</p>
              <p>The Website is owned and operated by Boffin Global Services.</p>
              <p>By using this Website, you agree to be bound by the terms and conditions stated herein. You claim and warrant that You have full legal authority to enter these Terms of Use and to be legally bound by it.</p>
              
              <h3>1. Definitions</h3>
              <p>“<strong>Website</strong>” means an aggregate amount of the web pages available at boffinglobal.com and all sub-domains thereof, where the Services are realized.</p>
              <p>“<strong>Services</strong>” refers to various types of written tasks, including essays, research papers, dissertations and other written academic works that may be requested by the Client.</p>
              <p>“<strong>Terms &amp; Conditions</strong>”, “<strong>Terms</strong>”, or “<strong>T&amp;C</strong>” terms of use also include: Privacy Policy, Refund Policy.</p>
              
              <h3>2. Order Placing and Registration</h3>
              <p>2.1. While registering with the Website, please use a valid email address where you can be reached. We may be required to contact you. Providing incorrect email address is a violation of these terms and conditions.</p>
              
              <h3>3. Order Payment</h3>
              <p>3.1. Placing an Order on the Website for any job/project is free. However, you must fund the project after you accept the bid of a Writer. When placing an Order, you will be shown the number of parts of the Order with the price of each respective part.</p>
              
              <h3>4. Order Processing</h3>
              <p>4.1. Order volume. Each Order placed by the Client has a required volume, that is measured by the number of pages. One page equals to 275 words.</p>
              <p>4.2. Changes of Order details. The Client may provide changes to the scope of work only if the Writer has not started the work yet.</p>

              <h3>5. Order Delivery</h3>
              <p>We are responsible for the delivery of the Product and for meeting the deadline indicated in the Order.</p>

              <h3>6. Order Revision</h3>
              <p>The Client has the right to request revisions as long as the final payment is not released to the Writer. After the final payment no revision requests will be accepted.</p>

              <h3>7. Refund Policy</h3>
              <p>We are responsible for delivering the Product in a timely manner and according to the Client requirements indicated in the Order. Should any of the Client’s commitments be violated the Client is entitled to a partial or a full reimbursement according to our <a href="/refund-policy.html" className="text-blue-500 hover:underline">Refund Policy</a>.</p>

              <h3>8. The Use of the Products</h3>
              <p>When making a payment for an Order You agree it is for personal and non-commercial use only.</p>

              <h3>9. Plagiarism</h3>
              <p>You may not put Your name on any Product. All Products and/or any other written materials delivered by us to You are for research and/or reference purposes only.</p>

              <h3>10. Personal Data</h3>
              <p>For details of how we collect, use and store your Personal Data, including your personal data and payment details, please see our <a href="/privacy-policy.html" className="text-blue-500 hover:underline">Privacy Policy</a>.</p>

              <h3>11. Account information and security</h3>
              <p>You must keep your Account information secure and must not disclose it to or share it with anyone.</p>
              
              <h3>12. Use of the Website</h3>
              <p>You must not use any part of the Website for any illegal purpose.</p>
              
              <h3>13. Intellectual Property Rights (“IPRs”)</h3>
              <p>Full copyright in any Products or other materials delivered to You is retained by us and/or our affiliates and partners.</p>
              
              <h3>14. Disclaimer and Limitation of liability</h3>
              <p>The Website is provided “as is” and we do not guarantee that the Website will meet Your expectations or requirements.</p>
              
              <h3>15. Miscellaneous</h3>
              <p>You may not transfer any of Your rights under these Terms to any other person.</p>
              
              <h3>16. Notices</h3>
              <p>Unless otherwise stated in these Terms, all notices from You to us must be in writing.</p>
              
              <h3>17. Governing law and jurisdiction</h3>
              <p>These Terms are governed by laws of Cyprus.</p>
              
              <h3>18. Amendments</h3>
              <p>We reserve the right at any time to (i) change any information, specifications, features or functions of the Website or Services.</p>
              
              <h3>19. Contact details</h3>
              <p>If you require further information about the Website, please contact us either by phone, email or chat given in the <a href="/about-us.html" className="text-blue-500 hover:underline">Contact Us</a> page.</p>
            </div>

            <div className="grow shrink-0 lg:w-[264px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col text-sm font-semibold">
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/refund-policy.html">Refund Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/confidentiality-policy.html">Confidentiality policy</a>
                <a className="block border-b px-2 py-3 text-blue-900 bg-slate-50 border-blue-500" href="/terms-and-conditions.html">Terms &amp; Conditions</a>
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

      <section className="animate-appear-0 js--stats js--service-stats overflow-hidden">
        <div className="container max-w-[1150px] mx-auto px-4 relative z-[1]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Counter value={15} suffix="+" id="years_on_market" className="stat-number" as="div" />
              <p className="stat-label">Years on the market</p>
            </div>
            <div>
              <Counter value={9.65} suffix="/10" id="quality_score" className="stat-number" as="div" />
              <p className="stat-label">Average quality score</p>
            </div>
            <div>
              <Counter value={57} suffix="K+" id="returning_customers" className="stat-number" as="div" />
              <p className="stat-label">Returning customers</p>
            </div>
            <div>
              <Counter value={46} suffix="" id="writers_count" className="stat-number" as="div" />
              <p className="stat-label">Writers active daily</p>
            </div>
          </div>
        </div>
      </section>

      
    </main>
  );
}

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Counter from '../components/Counter';

export default function CookiePolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-[80px] bg-[#f8f9fa] min-h-screen font-sans">
      <Navbar />

      <section className="animate-appear-0 relative border-b border-solid border-slate-100 overflow-hidden bg-white py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 text-left relative z-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[3rem] font-extrabold tracking-tight text-slate-900 leading-[1.1] font-display mb-0">
            Cookie Policy
          </h1>
        </div>
      </section>

      <section className="animate-appear-0 py-12">
        <div className="container max-w-[1150px] mx-auto px-4">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16">
            <div className="styled-scrollbar pr-2 overflow-y-scroll max-h-[800px] grow [&>p]:text-slate-600 [&>p]:mb-4 [&>ul]:text-slate-600 [&>ul]:mb-4 [&>ol]:text-slate-600 [&>ol]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-slate-900 [&>table]:w-full [&>table]:border-collapse [&>table]:my-4 [&>table_th]:border [&>table_th]:border-slate-400 [&>table_th]:p-[10px] [&>table_th]:text-left [&>table_td]:border [&>table_td]:border-slate-400 [&>table_td]:p-[10px] [&>table_td]:align-top [&>a]:text-blue-500 [&>a]:hover:underline">
              <p>Last updated: Oct 9, 2025.</p>
              <p>
                <i>Version 1.1. Effective as of October 20, 2025.</i>
              </p>
              <p>
                We do believe we can be transparent about how we collect and use your data. This
                policy provides information about how and when we use cookies when you use our
                website.
              </p>

              <h3>What is a cookie?</h3>
              <p>
                Cookies are small text files we send to your computer or mobile device. They are
                unique to your account or your browser. Session-based cookies last only while your
                browser is open and are automatically deleted when you close your browser. Persistent
                cookies last until you or your browser delete them or until they expire.
              </p>
              <p>
                You can read more about cookies at{' '}
                <a href="http://www.allaboutcookies.org/" target="_blank" rel="nofollow">
                  this site
                </a>
                .
              </p>

              <h3>Do we use cookies?</h3>
              <p>
                Yes. We use cookies and similar technologies like single-pixel gifs and web beacons.
                We use both session-based and persistent cookies to provide you services or to make it
                easier to navigate the website. We set and access our own cookies on the website and
                we also use third party cookies, like Google Analytics.
              </p>

              <h3>How do we use cookies?</h3>
              <p>
                Some cookies are associated with your account and personal information in order to
                remember that you are logged in and which services you order. Other cookies are not
                tied to your account but are unique and allow us to carry out analytics and
                customization, among other similar things.
              </p>
              <p>
                Cookies can be used to recognize you when you visit our website or use our services,
                remember your preferences, and give you a personalized experience that's consistent
                with your settings. Cookies also make your interactions faster and more secure.
              </p>

              <h3>How we use cookies for advertising?</h3>
              <p>
                Cookies and other ad technology such as beacons, pixels, and tags help us market more
                effectively to users that we and our partners believe may be interested in our
                services. They also help provide us with aggregated auditing, research, statistics and
                reporting, and know when content has been shown to you.
              </p>

              <h3>What to do if you don't want cookies to be set?</h3>
              <p>
                You may prefer not to allow cookies, which is why most browsers give you the ability
                to manage cookies to suit your interest. In some browsers you may also manage cookies
                preferences for each particular website.
              </p>
              <p>
                You can find the instructions how to manage your cookies for different browsers below:
              </p>
              <ul>
                <li>
                  <a href="https://support.google.com/chrome/answer/95647?hl=en-GBf" target="_blank" rel="nofollow">
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a href="https://support.microsoft.com/en-us/help/260971/description-of-cookies" target="_blank" rel="nofollow">
                    Internet Explorer
                  </a>
                </li>
                <li>
                  <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="nofollow">
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="nofollow">
                    Safari
                  </a>
                </li>
                <li>
                  <a href="https://support.google.com/nexus/answer/54068?visit_id=1-636621423247437786-358822551&amp;hl=en&amp;rd=1" target="_blank" rel="nofollow">
                    Android Browser
                  </a>
                </li>
                <li>
                  <a href="https://www.opera.com/uk/help" target="_blank" rel="nofollow">
                    Opera
                  </a>
                </li>
              </ul>
              <p>For other browsers, please consult the documentation that your browser manufacturer provides.</p>
              <p>
                You may opt-out of third party cookies from Google Analytics on its website.
              </p>
              <p>
                You can opt out of interest-based targeting provided by participating ad servers through
                the{' '}
                <a href="http://youradchoices.com" target="_blank" rel="nofollow">
                  Digital Advertising Alliance
                </a>
                . In addition, on your iPhone, iPad or Android, you can change your device settings to
                control whether you see online interest-based ads.
              </p>
              <p>
                Note! If you limit the ability of websites and applications to set cookies, you may
                worsen your overall user experience and/or lose the ability to access the services,
                since it will no longer be personalized to you. It may also stop you from saving
                customized settings, like login information.
              </p>

              <h3>Cookies used on our website</h3>
              <table>
                <thead>
                  <tr>
                    <th>Categories of Use</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Authentication</td>
                    <td>
                      If you're signed in to our Website, cookies help us show you the right information
                      and personalize your experience.
                    </td>
                  </tr>
                  <tr>
                    <td>Security</td>
                    <td>
                      We use cookies to enable and support our security features, and to help us detect
                      malicious activity.
                    </td>
                  </tr>
                  <tr>
                    <td>Preferences, features and services</td>
                    <td>
                      Cookies can tell us which language you prefer and what your communications
                      preferences are. They can help you fill out forms on our Website more easily. They
                      also provide you with features, insights, and customized content.
                    </td>
                  </tr>
                  <tr>
                    <td>Marketing</td>
                    <td>
                      We may use cookies to help us deliver marketing campaigns and track their
                      performance. Similarly, our partners may use cookies to provide us with information
                      about your interactions with their services.
                    </td>
                  </tr>
                  <tr>
                    <td>Performance, Analytics and Research</td>
                    <td>
                      Cookies help us learn how convenient our Website is for users. We also use cookies
                      to understand, improve, and research products, features, and services.
                    </td>
                  </tr>
                </tbody>
              </table>

              <h3>Contacting us</h3>
              <p>
                If you have any questions about this Cookie Policy, please contact us at{' '}
                <a href="mailto:dpo@phenowriters.ltd">dpo@phenowriters.ltd</a>
              </p>

              <h3>Previous versions</h3>
              <ul>
                <li>Current version (Oct 9, 2025)</li>
                <li>
                  <a href="/archive/policy/58.html">May 21, 2018</a>
                </li>
              </ul>
            </div>

            <div className="grow shrink-0 lg:w-[264px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:flex lg:flex-col text-sm font-semibold">
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/refund-policy.html">Refund Policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/confidentiality-policy.html">Confidentiality policy</a>
                <a className="block border-b px-2 py-3 hover:text-blue-900 text-slate-600" href="/terms-and-conditions.html">Terms &amp; Conditions</a>
                <a className="block border-b px-2 py-3 text-blue-900 bg-slate-50 border-blue-500" href="/cookie-policy.html">Cookie Policy</a>
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

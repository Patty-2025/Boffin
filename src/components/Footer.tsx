import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#1A2E44] pt-8 font-['Open_Sans',sans-serif]">
      <div className="container max-w-[1150px] mx-auto px-4 text-white">
        <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-solid border-[#505E6D] pb-8 gap-4">
          <a href="/" aria-label="BoffinGlobal Home">
            <img src="/next/img/logos/boffinglobal.svg" alt="BoffinGlobal™" loading="lazy" width="190" height="40" />
          </a>
          <div className="flex gap-4 items-center">
            <a href="https://facebook.com/boffinglobal/" title="Facebook" aria-label="Facebook" target="_blank" rel="noreferrer" className="text-white hover:text-blue-100 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="https://twitter.com/boffinglobal/" title="Twitter" aria-label="Twitter" target="_blank" rel="noreferrer" className="text-white hover:text-blue-100 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.751 3H20.818L14.118 10.625L22 21H15.828L10.995 14.707L5.464 21H2.394L9.561 12.845L2 3H8.328L12.698 8.752L17.751 3ZM16.675 19.172H18.375L7.404 4.732H5.58L16.675 19.172Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/boffinglobal/" title="Instagram" aria-label="Instagram" target="_blank" rel="noreferrer" className="text-white hover:text-blue-100 transition-colors">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.9543 10.2921C22.9121 9.33565 22.7574 8.67813 22.5358 8.10837C22.3072 7.50359 21.9555 6.96214 21.4947 6.51202C21.0445 6.0549 20.4994 5.69969 19.9015 5.4747C19.3283 5.25315 18.6741 5.09848 17.7175 5.05632C16.7538 5.01058 16.4478 5 14.0035 5C11.5592 5 11.2532 5.01058 10.2931 5.05274C9.33648 5.09491 8.67883 5.24971 8.1091 5.47113C7.50407 5.69969 6.96251 6.05133 6.51231 6.51202C6.0551 6.96214 5.69996 7.50717 5.47479 8.10494C5.2532 8.67813 5.0985 9.33208 5.05633 10.2885C5.01058 11.252 5 11.5579 5 14.0018C5 16.4456 5.01058 16.7515 5.05275 17.7115C5.09493 18.6679 5.24976 19.3254 5.47136 19.8952C5.69996 20.5 6.0551 21.0414 6.51231 21.4916C6.96251 21.9487 7.50764 22.3039 8.10553 22.5289C8.67883 22.7504 9.33291 22.9051 10.2896 22.9473C11.2497 22.9896 11.5558 23 14.0001 23C16.4444 23 16.7503 22.9896 17.7105 22.9473C18.6671 22.9051 19.3247 22.7504 19.8945 22.5289C21.1044 22.0612 22.061 21.1048 22.5288 19.8952C22.7502 19.322 22.9051 18.6679 22.9472 17.7115C22.9894 16.7515 23 16.4456 23 14.0018C23 11.5579 22.9964 11.252 22.9543 10.2921ZM21.333 17.6412C21.2943 18.5203 21.1466 18.995 21.0235 19.3114C20.721 20.0956 20.0985 20.718 19.3142 21.0204C18.9976 21.1435 18.5194 21.2911 17.6436 21.3297C16.694 21.3721 16.4092 21.3825 14.0071 21.3825C11.6049 21.3825 11.3166 21.3721 10.3704 21.3297C9.49117 21.2911 9.01638 21.1435 8.69985 21.0204C8.30955 20.8762 7.95427 20.6476 7.66591 20.3487C7.36696 20.0569 7.13836 19.7052 6.99411 19.315C6.87101 18.9985 6.72333 18.5203 6.68472 17.6448C6.64241 16.6953 6.63197 16.4105 6.63197 14.0088C6.63197 11.6071 6.64241 11.3188 6.68472 10.373C6.72333 9.49389 6.87101 9.01918 6.99411 8.70271C7.13836 8.31235 7.36696 7.95728 7.66948 7.66883C7.96128 7.36995 8.31298 7.14139 8.70342 6.9973C9.01995 6.87423 9.49832 6.72657 10.374 6.68783C11.3236 6.64567 11.6085 6.63509 14.0105 6.63509C16.4162 6.63509 16.701 6.64567 17.6472 6.68783C18.5264 6.72657 19.0012 6.87423 19.3177 6.9973C19.708 7.14139 20.0633 7.36995 20.3517 7.66883C20.6506 7.96072 20.8792 8.31235 21.0235 8.70271C21.1466 9.01918 21.2943 9.49732 21.333 10.373C21.3752 11.3224 21.3858 11.6071 21.3858 14.0088C21.3858 16.4105 21.3752 16.6918 21.333 17.6412Z" fill="currentColor"></path>
                <path d="M14 9.5C11.5157 9.5 9.5 11.5155 9.5 14C9.5 16.4845 11.5157 18.5 14 18.5C16.4845 18.5 18.5 16.4845 18.5 14C18.5 11.5155 16.4845 9.5 14 9.5ZM14 16.919C12.3883 16.919 11.081 15.6118 11.081 14C11.081 12.3882 12.3883 11.081 14 11.081C15.6118 11.081 16.919 12.3882 16.919 14C16.919 15.6118 15.6118 16.919 14 16.919Z" fill="currentColor"></path>
                <path d="M20 9C20 9.55223 19.5523 10 18.9999 10C18.4477 10 18 9.55223 18 9C18 8.44764 18.4477 8 18.9999 8C19.5523 8 20 8.44764 20 9Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/boffinglobal" title="Linkedin" aria-label="Linkedin" target="_blank" rel="noreferrer" className="text-white hover:text-blue-100 transition-colors">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.35782 7.77857C9.3576 8.25004 9.1805 8.7021 8.86548 9.03532C8.55047 9.36853 8.12334 9.55559 7.67807 9.55536C7.2328 9.55512 6.80585 9.36761 6.49115 9.03406C6.17645 8.70051 5.99978 8.24826 6 7.77679C6.00022 7.30532 6.17732 6.85325 6.49233 6.52004C6.80735 6.18683 7.23447 5.99976 7.67975 6C8.12502 6.00024 8.55197 6.18775 8.86667 6.5213C9.18137 6.85484 9.35804 7.3071 9.35782 7.77857ZM9.40819 10.8717H6.05037V22H9.40819V10.8717ZM14.7135 10.8717H11.3725V22H14.68V16.1603C14.68 12.9072 18.6842 12.605 18.6842 16.1603V22H22V14.9515C22 9.46736 16.0735 9.6718 14.68 12.365L14.7135 10.8717Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@boffinglobal" title="Tiktok" aria-label="Tiktok" target="_blank" rel="noreferrer" className="text-white hover:text-blue-100 transition-colors">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.64 7.82C17.9564 7.03962 17.5797 6.03743 17.58 5H14.49V17.4C14.4661 18.071 14.1828 18.7066 13.6997 19.1729C13.2166 19.6393 12.5714 19.8999 11.9 19.9C10.48 19.9 9.29995 18.74 9.29995 17.3C9.29995 15.58 10.96 14.29 12.67 14.82V11.66C9.21995 11.2 6.19995 13.88 6.19995 17.3C6.19995 20.63 8.95995 23 11.89 23C15.03 23 17.58 20.45 17.58 17.3V11.01C18.833 11.9099 20.3373 12.3926 21.88 12.39V9.3C21.88 9.3 20 9.39 18.64 7.82Z" fill="currentColor"></path>
              </svg>
            </a>
            <a href="mailto:info@boffinglobalgroup.com" title="Support" aria-label="Support" target="_blank" rel="noreferrer" className="text-white hover:text-blue-100 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L4 8V18H20V8L12 13ZM12 11L20 6H4L12 11ZM4 8V6V18V8Z" fill="currentColor"></path>
              </svg>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-silver-900 py-8 gap-8">
          <div>
            <div className="footer-column-title mb-5 font-['Lato',sans-serif] text-[18px] font-bold">
              Services
            </div>
            <a className="footer-link" href="/service/spss-assignment">SPSS Assignment Help</a>
            <a className="footer-link" href="/service/matlab-assignment">MATLAB Assignment Help</a>
            <a className="footer-link" href="/service/engineering-assignment">Engineering Assignment Help</a>
            <a className="footer-link" href="/service/statistics-assignment">Statistics Assignment Help</a>
            <a className="footer-link" href="/service/technical-coursework">Technical Coursework Help</a>
            <a className="footer-link" href="/service/programming-assignment">Programming Assignment Help</a>
          </div>
          <div>
            <div className="footer-column-title mb-5 font-['Lato',sans-serif] text-[18px] font-bold">
              Resources
            </div>
            <a className="footer-link" href="/blog" aria-label="Blog">
              Blog
            </a>
            <a className="footer-link" href="/code-debugging" aria-label="Plagcheck Tool">
              Plagcheck Tool
            </a>
            <a className="footer-link" href="/#services" aria-label="Free Essay Writing Tools">
              Free Essay Writing Tools
            </a>
            <a className="footer-link" href="/#app" aria-label="Essay Writing App">
              Essay Writing App
            </a>
            <a className="footer-link" href="/about-us" aria-label="Brand Assets">
              Brand Assets
            </a>
            <a className="footer-link" href="/blog" aria-label="BoffinGlobal Academy">
              BoffinGlobal Academy
            </a>
          </div>
          <div>
            <div className="footer-column-title mb-5 font-['Lato',sans-serif] text-[18px] font-bold">
              Policies
            </div>
            <a className="footer-link" href="/terms" aria-label="Terms & Conditions">
              Terms &amp; Conditions
            </a>
            <a className="footer-link" href="/privacy-policy" aria-label="Privacy Policy">
              Privacy Policy
            </a>
            <a className="footer-link" href="/privacy-policy" aria-label="Cookie Policy">
              Cookie Policy
            </a>
            <a className="footer-link" href="/privacy-policy" aria-label="Confidentiality Policy">
              Confidentiality Policy
            </a>
            <a className="footer-link" href="/revision-refund-policy" aria-label="Refund Policy">
              Refund Policy
            </a>
            <a className="footer-link" href="/pricing" aria-label="Discount Policy">
              Discount Policy
            </a>
            <a className="footer-link" href="/revision-refund-policy" aria-label="Money Back Guarantee">
              Money Back Guarantee
            </a>
          </div>
          <div>
            <div className="footer-column-title mb-5 font-['Lato',sans-serif] text-[18px] font-bold">
              Company
            </div>
            <a className="footer-link" href="/faq" aria-label="FAQ">
              FAQ
            </a>
            <a className="footer-link" href="/about-us" aria-label="About Us">
              About Us
            </a>
            <a className="footer-link" href="/reviews" aria-label="BoffinGlobal Reviews">
              BoffinGlobal Reviews
            </a>
            <div className="mt-3">
              <div className="opacity-50 cursor-not-allowed">
                <img src="/next/img/logos/apple-store.svg" loading="lazy" alt="Download on the App Store (Coming Soon)" width="145" height="52" />
              </div>
              <p className="text-xs text-gray-400 mt-2">Coming Soon</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0F1D2D] py-8">
        <div className="container max-w-[1150px] mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-2 gap-x-4">
            <a className="footer-link" href="/service/finance-assignment">Finance Assignment Help</a>
            <a className="footer-link" href="/service/autocad-assignment">Autocad Assignment Help</a>
            <a className="footer-link" href="/service/r-assignment">R Assignment Help</a>
            <a className="footer-link" href="/service/accounting-assignment">Accounting Assignment Help</a>
            <a className="footer-link" href="/service/nursing-assignment">Nursing Assignment Help</a>
            <a className="footer-link" href="/service/mba-assignment">MBA Assignment Help</a>
            <a className="footer-link" href="/service/computer-science-assignment">Computer Science Assignment Help</a>
            <a className="footer-link" href="/service/engineering-assignment">Engineering Assignment Help</a>
            <a className="footer-link" href="/service/spss-assignment">SPSS Assignment Help</a>
            <a className="footer-link" href="/service/law-assignment">Law Assignment Help</a>
            <a className="footer-link" href="/service/economics-assignment">Economics Assignment Help</a>
            <a className="footer-link" href="/service/stata-assignment">Stata Assignment Help</a>
            <a className="footer-link" href="/service/annotated-bibliography">Annotated Bibliography Maker</a>
            <a className="footer-link" href="/service/java-assignment">Java Assignment Help</a>
            <a className="footer-link" href="/service/cpp-assignment">C++ Assignment Help</a>
            <a className="footer-link" href="/service/python-assignment">Python Assignment Help</a>
            <a className="footer-link" href="/service/statistics-assignment">Statistics Assignment Help</a>
            <a className="footer-link" href="/service/chemistry-assignment">Chemistry Assignment Help</a>
            <a className="footer-link" href="/service/physics-assignment">Physics Assignment Help</a>
            <a className="footer-link" href="/service/biology-assignment">Biology Assignment Help</a>
            <a className="footer-link" href="/service/data-science-assignment">Data Science Assignment Help</a>
            <a className="footer-link" href="/service/machine-learning-assignment">Machine Learning Assignment Help</a>
            <a className="footer-link" href="/service/database-assignment">Database Assignment Help</a>
            <a className="footer-link" href="/service/web-development-assignment">Web Development Assignment Help</a>
            <a className="footer-link" href="/service/cybersecurity-assignment">Cybersecurity Assignment Help</a>
            <a className="footer-link" href="/service/matlab-assignment">Matlab Assignment Help</a>
            <a className="footer-link" href="/service/microeconomics-assignment">Microeconomics Assignment Help</a>
            <a className="footer-link" href="/service/business-analysis-assignment">Business Analysis Assignment Help</a>
            <a className="footer-link" href="/service/project-management-assignment">Project Management Assignment Help</a>
            <a className="footer-link" href="/service/cloud-computing-assignment">Cloud Computing Assignment Help</a>
            <a className="footer-link" href="/service/ai-assignment">Artificial Intelligence Assignment Help</a>
            <a className="footer-link" href="/service/network-programming-assignment">Network Programming Assignment Help</a>
            <a className="footer-link" href="/service/electrical-engineering-assignment">Electrical Engineering Assignment Help</a>
            <a className="footer-link" href="/service/geography-assignment">Geography Assignment Help</a>
            <a className="footer-link" href="/service/environmental-science-assignment">Environmental Science Assignment Help</a>
            <a className="footer-link" href="/service/psychology-assignment">Psychology Assignment Help</a>
            <a className="footer-link" href="/service/history-assignment">History Assignment Help</a>
            <a className="footer-link" href="/service/sociology-assignment">Sociology Assignment Help</a>
            <a className="footer-link" href="/service/anthropology-assignment">Anthropology Assignment Help</a>
            <a className="footer-link" href="/service/literature-assignment">Literature Assignment Help</a>
            <a className="footer-link" href="/service/mechanical-engineering-assignment">Mechanical Engineering Assignment Help</a>
            <a className="footer-link" href="/service/civil-engineering-assignment">Civil Engineering Assignment Help</a>
            <a className="footer-link" href="/service/chemical-engineering-assignment">Chemical Engineering Assignment Help</a>
            <a className="footer-link" href="/service/biomedical-engineering-assignment">Biomedical Engineering Assignment Help</a>
            <a className="footer-link" href="/service/structural-analysis-assignment">Structural Analysis Assignment Help</a>
            <a className="footer-link" href="/service/thermodynamics-assignment">Thermodynamics Assignment Help</a>
            <a className="footer-link" href="/service/geology-assignment">Geology Assignment Help</a>
            <a className="footer-link" href="/service/ecology-assignment">Ecology Assignment Help</a>
            <a className="footer-link" href="/service/marine-biology-assignment">Marine Biology Assignment Help</a>
            <a className="footer-link" href="/service/javascript-assignment">JavaScript Assignment Help</a>
          </div>
        </div>
      </div>
      <div className="bg-[#132335] text-white caption py-8">
        <div className="container max-w-[1150px] mx-auto px-4">
          <p className="footer-column-title font-bold font-['Lato',sans-serif] text-[18px] mb-3">
            Disclaimer
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-[#cdcdcd] text-[14px] leading-[24px]">
            <div>
              boffinglobalgroup.com provides writing and research services for limited use only. All the materials from our website should be used with proper references and in accordance with{' '}
              <a className="text-blue-200 hover:text-blue-500 transition-colors" href="/terms">
                Terms &amp; Conditions
              </a>
            </div>
            <div>
              This website is owned by{' '}
              <a className="text-blue-200 hover:text-blue-500 transition-colors inline-block" href="https://boffinglobalgroup.com" rel="nofollow" target="_blank">
                Boffin Global Group
              </a>
              <address className="not-italic block mt-1.5 text-[#cdcdcd] text-[13px] leading-[20px]">
                Boffin Global Group,<br />
                registered office &amp; global academic team support
              </address>
            </div>
          </div>
          <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-[1fr_1.3fr_0.7fr] gap-4 mt-8 justify-between pt-6 border-t border-[#1a2e44]">
            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              <span className="text-white block mb-1 sm:mb-0">Country:</span>
              <div className="flex flex-row flex-wrap gap-2 sm:items-center">
                <a href="/" className="py-1 w-fit px-2.5 rounded-lg text-[13px] hover:no-underline text-white bg-[#1A2E44]">
                  United States
                </a>
                <a href="/" className="py-1 w-fit px-2.5 rounded-lg text-[13px] hover:no-underline hover:text-white bg-[#0F1D2D] text-slate-400">
                  Canada
                </a>
                <a href="/" className="py-1 w-fit px-2.5 rounded-lg text-[13px] hover:no-underline hover:text-white bg-[#0F1D2D] text-slate-400">
                  Arab Emirates
                </a>
              </div>
            </div>
            <div className="flex gap-4 flex-row items-center justify-start md:justify-center">
              <img src="/next/img/logos/DMCA.webp" alt="DMCA Protection Status" width="131" height="32" loading="lazy" />
              <img src="/next/img/logos/money-back.webp" alt="Our Money Back Guarantee" width="192" height="32" loading="lazy" />
            </div>
            <div className="flex gap-2 items-center flex-wrap justify-start md:justify-end">
              <img className="border border-solid border-slate-100 rounded-sm bg-white" src="/next/img/logos/payments/discover.png" alt="Discover" width="37" height="24" loading="lazy" title="Discover" />
              <img className="border border-solid border-slate-100 rounded-sm bg-white" src="/next/img/logos/payments/amex.png" alt="Amex" width="37" height="24" loading="lazy" title="Amex" />
              <img className="border border-solid border-slate-100 rounded-sm bg-white" src="/next/img/logos/payments/visa.png" alt="Visa" width="37" height="24" loading="lazy" title="Visa" />
              <img className="border border-solid border-slate-100 rounded-sm bg-white" src="/next/img/logos/payments/mastercard.png" alt="Mastercard" width="37" height="24" loading="lazy" title="Mastercard" />
              <img className="border border-solid border-slate-100 rounded-sm bg-white" src="/next/img/logos/payments/apple.png" alt="Apple" width="37" height="24" loading="lazy" title="Apple" />
            </div>
          </div>
          <div className="text-center text-[#cdcdcd] mt-8 text-[14px]">
            © 2011 — 2026, BoffinGlobal.com. All rights reserved.
          </div>
        </div>
      </div>
      <div 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="back-to-top js--back-to-top fixed right-7 bottom-5 z-10 w-12 h-12 rounded-full bg-[#d9ecf8] hover:bg-[#b3d9f1] transition-colors cursor-pointer flex items-center justify-center shadow-md"
        title="Back to top"
        aria-label="Back to top"
      >
        <img src="/_redesign/assets/img/icon_arrow--up.svg" alt="Back to top" width="32" height="32" loading="lazy" />
      </div>
    </footer>
  );
}


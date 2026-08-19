import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SERVICE_MENU_ITEMS } from '../constants/serviceMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header-v2 fixed top-0 left-0 right-0 z-[999] transition-all duration-300 border-b border-[#dae6f2] bg-white w-full ${scrolled ? 'py-2 shadow-md' : 'py-0'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center min-h-[72px] px-4 lg:px-6">
          <div className="flex justify-between items-center grow">
            <Link to="/" className="shrink-0 mr-auto md:mr-14">
              <img 
                className="shark-logo max-[414px]:hidden index-logo" 
                src="/_redesign/assets/img/logo.svg" 
                alt="BoffinGlobal™" 
                width="190" 
                height="36" 
              />
              <img 
                className="shark-logo-scrolled hidden" 
                src="/next/img/logos/boffinglobal-small.svg" 
                alt="BoffinGlobal Logo" 
                width="46" 
                height="32" 
              />
            </Link>

            <nav className="hidden xl:flex mx-auto items-center flex-no-wrap justify-start w-max gap-6 text-sm font-bold tracking-wide">
              <Link to="/#how-it-works" className="transition-colors hover:text-blue-500 hover:no-underline text-slate-500">
                How it works
              </Link>
              <Link to="/writers" className="transition-colors hover:text-blue-500 hover:no-underline text-slate-500">
                Writers
              </Link>
              <Link to="/pricing" className="transition-colors hover:text-blue-500 hover:no-underline text-slate-500">
                Prices
              </Link>
              <Link to="/reviews" className="transition-colors hover:text-blue-500 hover:no-underline text-slate-500">
                Reviews
              </Link>
              <Link to="/blog" className="transition-colors hover:text-blue-500 hover:no-underline text-slate-500">
                Blog
              </Link>

              {/* Hover Dropdown */}
              <div className="relative flex items-center group cursor-pointer gap-1 py-4">
                <span className="text-slate-500 group-hover:text-blue-500 transition-colors">Services</span>
                <svg 
                  className="group-hover:text-blue-500 transition-transform rotate-180 group-hover:rotate-0 text-slate-400" 
                  width="15" 
                  height="14" 
                  viewBox="0 0 15 14" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 4.5L4 8.55405L4.93333 9.5L8 6.39189L11.0667 9.5L12 8.55405L8 4.5Z" fill="currentColor" />
                </svg>

                {/* Dropdown Box */}
                <div className="top-12 hidden -right-[100%] group-hover:block absolute rounded-xl bg-white w-[600px] p-6 shadow-xl border border-slate-100 z-50">
                  <div className="text-base font-extrabold text-slate-900 mb-4">Popular services</div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-slate-600">
                    {SERVICE_MENU_ITEMS.map((service) => (
                      <Link key={service.query} to={`/order?service=${encodeURIComponent(service.query)}`} className="text-sm hover:text-blue-500 hover:no-underline whitespace-nowrap">
                        {service.label}
                      </Link>
                    ))}
                    <Link to="/#services" className="text-sm font-bold text-blue-500 hover:text-blue-600 hover:underline mt-2 inline-block">
                      View all services
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div className="flex gap-2 sm:gap-6 items-center">
            <Link 
              className="place-order md:px-6 px-4 py-2.5 bg-[#f47321] hover:bg-[#e05e10] text-white text-sm font-extrabold rounded-lg transition-colors whitespace-nowrap" 
              to="/login?redirect=order"
            >
              Place order
            </Link>

            <div className="min-w-[44px] sm:min-w-[132px]">
              <div className="w-fit" data-account="" data-link="/login" data-active="true">
                <Link to="/login" className="bb-accountEmptyButton flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-blue-500 hover:bg-slate-50 rounded-full transition-all text-sm font-bold text-slate-600 hover:text-blue-600">
                  <div className="bb-accountEmptyButtonIcon">
                    <div className="bb-fillPath">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none" className="text-slate-400 group-hover:text-blue-500">
                        <path fillRule="evenodd" clipRule="evenodd" d="M19.5 12.5c0 1.934-1.566 3.5-3.5 3.5a3.499 3.499 0 01-3.5-3.5c0-1.934 1.566-3.5 3.5-3.5s3.5 1.566 3.5 3.5zm-1.75 0c0-.962-.788-1.75-1.75-1.75-.963 0-1.75.788-1.75 1.75 0 .963.787 1.75 1.75 1.75.962 0 1.75-.787 1.75-1.75zM16 16.875c-2.336 0-7 1.172-7 3.5v1.75c0 .481.394.875.875.875h12.25a.878.878 0 00.875-.875v-1.75c0-2.328-4.664-3.5-7-3.5zm-5.25 3.509v.866h10.5v-.875c-.175-.621-2.887-1.75-5.25-1.75s-5.075 1.129-5.25 1.759z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="bb-accountEmptyButtonText">My account</div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Main menu" 
              type="button" 
              className="block shrink-0 xl:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[1000] xl:hidden flex">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slideout Panel */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-[85vw] sm:w-[380px] bg-white h-full shadow-2xl flex flex-col z-50 p-6"
            >
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/_redesign/assets/img/logo.svg" alt="BoffinGlobal" width="140" height="28" />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 space-y-4 font-bold text-slate-700">
                <Link to="/#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-50 hover:text-blue-500 transition-colors">
                  How it works
                </Link>
                <Link to="/writers" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-50 hover:text-blue-500 transition-colors">
                  Writers
                </Link>
                <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-50 hover:text-blue-500 transition-colors">
                  Prices
                </Link>
                <Link to="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-50 hover:text-blue-500 transition-colors">
                  Reviews
                </Link>
                <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 border-b border-slate-50 hover:text-blue-500 transition-colors">
                  Blog
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-100 space-y-3">
                <Link 
                  to="/login?redirect=order" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-[#f47321] hover:bg-[#e05e10] text-white text-center py-3 font-extrabold rounded-lg transition-colors"
                >
                  Place order
                </Link>
                <Link 
                  to="/login" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full border border-slate-200 text-slate-700 text-center py-3 font-bold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  My account
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

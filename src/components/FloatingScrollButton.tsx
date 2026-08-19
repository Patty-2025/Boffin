import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function FloatingScrollButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      
      // Only show after initial hero area
      setIsVisible(scrolled > 300);
      setIsAtBottom(atBottom);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = () => {
    if (isAtBottom) {
      // Go to Top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Go to Bottom
      window.scrollTo({ top: document.body.offsetHeight, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToSection}
          className="fixed bottom-8 left-8 z-50 p-4 bg-white/40 backdrop-blur-md text-emerald-500 rounded-full shadow-xl transition-all border-2 border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white focus:outline-none flex items-center justify-center group"
          aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
        >
          {isAtBottom ? (
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronUp size={24} />
            </motion.div>
          ) : (
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown size={24} />
            </motion.div>
          )}
          
          <span className="absolute left-full ml-3 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block uppercase tracking-widest font-bold">
            {isAtBottom ? 'Back to Top' : 'Scroll to Bottom'}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Trust from './components/Trust';
import Workflows from './components/Workflows';
import Applications from './components/Applications';
import Solutions from './components/Solutions';
import Team from './components/Team';
import Research from './components/Research';
import News from './components/News';
import CTA from './components/CTA';
import Footer from './components/Footer';

import { SectionProvider } from './context/SectionContext';

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SectionProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main id="main-content">
          <Hero />
          <Solutions />
          <Workflows />
          <Applications />
          <Research />
          <About />
          <Team />
          <Trust />
          <News />
          <CTA />
        </main>
        <Footer />

        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 z-40 w-12 h-12 bg-purple text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-pink transition-colors group"
              aria-label="Back to top"
            >
              <ChevronUp size={24} className="group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </SectionProvider>
  );
}


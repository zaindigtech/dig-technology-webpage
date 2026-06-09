import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useSection } from '../context/SectionContext';

const SLIDES = [
  {
    eyebrow: 'SUBSURFACE INTELLIGENCE',
    headingHtml: <><span className="text-pink">Reduce Uncertainty</span><br />with Physics-Guided Seismic</>,
    description: 'Rock physics and AVO-driven prediction of lithology, fluids, and reservoir properties.',
    type: 'portrait',
    src: 'brand_assets/Per11.png',
    alt: 'Dr. Per Avseth, CTO of DIG Technology',
    quote: 'The rock remembers. We help you read it.',
    name: 'Dr. Per Avseth',
    role: 'DIG CTO & Co-Founder'
  },
  {
    eyebrow: 'ROCK PHYSICS TECHNOLOGY',
    headingHtml: <><span className="text-pink">IRPM</span><br />Inverse Rock Physics Modelling</>,
    description: 'Probabilistic prediction of reservoir properties from seismic AVO using calibrated rock physics models.',
    type: 'product',
    src: 'brand_assets/IRPM new1.png',
    alt: 'IRPM subsurface property prediction model',
    label: 'IRPM Technology',
    blend: true,
    link: '#workflow-irpm'
  },
  {
    eyebrow: 'RESERVOIR CHARACTERIZATION',
    headingHtml: <><span className="text-pink">DIG DEEP</span></>,
    description: 'Predict reservoir properties away from wells using seismic data constrained by rock physics.',
    type: 'product',
    src: 'brand_assets/AVO_feasibilty_Ivan.png',
    alt: 'DIG DEEP 3D reservoir property prediction volume',
    label: 'DIG DEEP 3D',
    blend: false,
    link: '#workflow-dig-deep'
  }
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { isProgrammaticScroll, setActiveSection } = useSection();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();

    const element = document.getElementById(sectionId);
    if (!element) {
      console.warn(`Section not found: ${sectionId}`);
      return;
    }

    if (setActiveSection) {
      setActiveSection(sectionId);
    }
    if (isProgrammaticScroll) {
      isProgrammaticScroll.current = true;
    }

    const headerOffset = 96; // Matching exactly height of navbar (96px)
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.history.pushState(null, '', `#${sectionId}`);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    setTimeout(() => {
      if (isProgrammaticScroll) {
        isProgrammaticScroll.current = false;
      }
    }, 1200);
  };

  const scrollToElementWhenReady = (targetId: string, fallbackId: string = 'research') => {
    const headerOffset = 110;
    let attempts = 0;
    const maxAttempts = 30;

    // Check if the fallback section is missing from the get-go (useful warning)
    if (!document.getElementById(fallbackId)) {
      console.warn(`Section element with ID "${fallbackId}" not found in current page.`);
    }

    const tryScroll = () => {
      const element = document.getElementById(targetId);

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        return;
      }

      attempts += 1;

      if (attempts < maxAttempts) {
        requestAnimationFrame(tryScroll);
      } else {
        console.warn(`Target element with ID "${targetId}" not found in DOM after ${maxAttempts} attempts.`);
        const fallback = document.getElementById(fallbackId);
        if (fallback) {
          const fallbackPosition = fallback.getBoundingClientRect().top;
          const offsetPosition = fallbackPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } else {
          console.warn(`Both target ID "${targetId}" and fallback ID "${fallbackId}" were not found in the DOM.`);
        }
      }
    };

    requestAnimationFrame(tryScroll);
  };

  const handleProductLabelClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    
    let tabIndex = 0;
    let targetSectionId = 'workflow';
    if (link === '#workflow-irpm') {
      tabIndex = 2; // Inverse Rock Physics Modelling is tab index 2 in Workflows
    } else if (link === '#workflow-dig-deep') {
      tabIndex = 0;  // DIG DEEP AVO Feasibility Modelling is tab index 0 in Workflows
    }

    // Update hash to keep address bar synchronized with the active section/product
    window.history.pushState(null, '', link);

    // Dispatch the custom tab change event so the Workflows component selects the tab and performs smooth scrolling with dynamic delays
    window.dispatchEvent(new CustomEvent('setActiveWorkflowTab', { 
      detail: { tabIndex, targetId: targetSectionId } 
    }));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = SLIDES[currentIndex];

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-navy" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-25" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="brand_assets/Background_video_hero_nowatermark.mp4" type="video/mp4" />
        </video>
        


        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/65 to-navy/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_0%_50%,rgba(80,61,129,0.18)_0%,transparent_65%)]" />
      </div>

      {/* Main Hero Content */}
      <div className="flex-grow flex items-center relative z-10">
        <div className="container pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-y-12 lg:gap-x-15 items-center">
            {/* Text Column */}
            <div className="order-1 relative min-h-[320px] sm:min-h-[360px] md:min-h-[420px] w-full font-sans">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col justify-start"
                >
                  <div 
                    className="flex items-center gap-3.5 uppercase text-pink mb-6"
                    style={{
                      fontSize: 'clamp(14px, 1vw, 16px)',
                      fontWeight: 700,
                      letterSpacing: '0.12em'
                    }}
                  >
                    <div className="w-8 h-0.5 bg-pink rounded-[1px] shrink-0" />
                    {currentSlide.eyebrow}
                  </div>
                  <h1 className="text-[40px] md:text-[58px] lg:text-[70px] leading-[1.05] tracking-[-0.035em] font-semibold mb-6">
                    {currentSlide.headingHtml}
                  </h1>
                  <p 
                    className="text-white text-left max-w-2xl font-sans"
                    style={{
                      fontSize: 'clamp(19px, 1.8vw, 24px)',
                      lineHeight: '1.5',
                      fontWeight: 400,
                      opacity: 0.92
                    }}
                  >
                    {currentSlide.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Visual Column */}
            <div className="order-2 relative w-full lg:w-[400px] min-h-[300px] md:min-h-[400px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  {currentSlide.type === 'portrait' ? (
                    <div className="flex flex-col items-center text-center w-full max-w-[380px] pt-12 md:pt-16 lg:pt-24 relative lg:translate-y-4">
                      {/* Technical Background Texture & Glow behind portrait */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0">
                        {/* Soft Radial Glow - Deep Navy to slightly lighter blue */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-[radial-gradient(circle,rgba(23,42,69,0.4)_0%,transparent_70%)] opacity-50" />
                        
                        <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-[0.07]">
                          {/* Seismic-like wave patterns */}
                          <path d="M0 150 Q100 100 200 150 T400 150" stroke="url(#waveGradient)" strokeWidth="0.5" fill="none" />
                          <path d="M0 170 Q100 120 200 170 T400 170" stroke="url(#waveGradient)" strokeWidth="0.5" fill="none" />
                          <path d="M0 190 Q100 140 200 190 T400 190" stroke="url(#waveGradient)" strokeWidth="0.5" fill="none" />
                          <path d="M0 210 Q100 160 200 210 T400 210" stroke="url(#waveGradient)" strokeWidth="0.5" fill="none" />
                          
                          <defs>
                            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#503D81" />
                              <stop offset="50%" stopColor="#F56C81" />
                              <stop offset="100%" stopColor="#503D81" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>

                      {/* Framed Portrait Container - Asymmetric Border Styling */}
                      <div className="relative z-10 p-1.5 rounded-none border-t-2 border-l-2 border-r-2 border-pink/30 shadow-[0_0_60px_-15px_rgba(245,108,129,0.12)]">
                        {/* Bottom Gradient Border - 2px DIG Accent (Refined) */}
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple/30 via-pink/60 to-purple/30" />
                        {/* Floating Portrait with Soft Mask - Responsive Scaling */}
                        <div className="relative w-full aspect-[4/5] max-w-[120px] sm:max-w-[180px] lg:max-w-[220px] overflow-hidden rounded-none">
                          <img 
                            src={currentSlide.src} 
                            alt={currentSlide.alt} 
                            className="w-full h-full object-cover brightness-105 contrast-105" 
                            style={{ 
                              maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)', 
                              WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)' 
                            }}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      {/* Quote Block - Improved Spacing & Responsiveness */}
                      <div className="relative bg-navy-deep/85 border border-white/5 rounded-none p-4 md:p-5 backdrop-blur-xl w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[320px] shadow-xl z-20 mt-6 md:mt-8 lg:mt-10">
                        <div className="absolute top-0 left-0 w-1 h-full bg-pink" />
                        <p className="text-[0.8rem] sm:text-[0.85rem] lg:text-[0.88rem] font-medium text-slate-200 leading-relaxed mb-3.5 text-left">
                          "{currentSlide.quote}"
                        </p>
                        <div className="flex flex-col items-start">
                          <p className="text-[0.7rem] sm:text-[0.75rem] lg:text-[0.78rem] font-semibold tracking-widest uppercase text-white mb-0.5">
                            {currentSlide.name}
                          </p>
                          <p className="text-[0.55rem] sm:text-[0.6rem] lg:text-[0.63rem] font-semibold tracking-[0.15em] uppercase text-pink">
                            {currentSlide.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex flex-col items-center gap-5 w-full pt-5">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[340px] aspect-square rounded-full bg-radial-gradient from-purple/55 to-transparent blur-3xl pointer-events-none" />
                      <img 
                        src={currentSlide.src} 
                        alt={currentSlide.alt} 
                        className={`relative z-10 w-full max-w-[360px] aspect-square object-contain ${currentSlide.blend ? 'mix-blend-multiply' : 'mix-blend-screen'}`}
                        referrerPolicy="no-referrer"
                      />
                      {currentSlide.link ? (
                        <a 
                          href={currentSlide.link}
                          onClick={(e) => handleProductLabelClick(e, currentSlide.link!)}
                          className="relative z-10 text-[0.8rem] md:text-[0.85rem] font-semibold tracking-widest uppercase text-pink bg-pink/10 border border-pink/22 px-4 py-1.5 rounded-full transition-all duration-300 hover:bg-pink/20 hover:border-pink/50 hover:shadow-[0_0_12px_rgba(245,108,129,0.35)] focus:outline-none focus:ring-1 focus:ring-pink/50 cursor-pointer"
                        >
                          {currentSlide.label}
                        </a>
                      ) : (
                        <span className="relative z-10 text-[0.8rem] md:text-[0.85rem] font-semibold tracking-widest uppercase text-pink bg-pink/10 border border-pink/22 px-4 py-1.5 rounded-full">
                          {currentSlide.label}
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Buttons Column */}
            <div className="order-3 lg:col-start-1 flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, 'contact')}
                className="btn btn-primary w-full sm:w-auto justify-center"
              >
                Discuss your project
                <ArrowRight size={18} />
              </a>
              <a 
                href="#workflow" 
                onClick={(e) => scrollToSection(e, 'workflow')}
                className="btn btn-outline w-full sm:w-auto justify-center"
              >
                Explore Technology
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2.5 mt-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-350 ${
                  currentIndex === i ? 'w-8 bg-pink shadow-[0_0_12px_rgba(245,108,129,0.55)]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Full-Width Statement Band Card Overlay */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="relative z-20 w-full bg-[#F2F2F2] border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]"
      >
        <div className="container" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
          <p 
            className="text-navy text-left max-w-6xl font-sans"
            style={{ 
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: 'clamp(21px, 2.1vw, 28px)',
              lineHeight: '1.42'
            }}
          >
            We deliver specialist rock physics, AVO, and quantitative seismic interpretation studies,{' '}
            <span className="text-pink" style={{ fontWeight: 600 }}>
              supporting subsurface decisions from exploration to production.
            </span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}

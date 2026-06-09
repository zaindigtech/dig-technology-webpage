import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSection } from '../context/SectionContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState<string | null>(null);
  const { activeSection, setActiveSection, isProgrammaticScroll } = useSection();
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Solutions', href: '#solutions', id: 'solutions' },
    { 
      name: 'Technology', 
      id: 'technology-parent',
      subItems: [
        { name: 'Workflow', href: '#workflow', id: 'workflow' },
        { name: 'Applications', href: '#applications', id: 'applications' },
        { name: 'Research', href: '#research', id: 'research' },
      ]
    },
    { 
      name: 'About Us', 
      id: 'about-parent',
      subItems: [
        { name: 'About DiG', href: '#about', id: 'about' },
        { name: 'Team', href: '#team', id: 'team' },
        { name: 'Clients', href: '#trust', id: 'trust' },
      ]
    },
    { name: 'News', href: '#news', id: 'news' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    // Clear any existing timeout to prevent premature re-enabling of observer
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Set programmatic scroll flag to prevent observer from overriding
    isProgrammaticScroll.current = true;
    setActiveSection(id);

    const headerOffset = 96; // Height of the navbar (h-24 = 6rem = 96px)
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Reset flag after scroll animation completes
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
      scrollTimeoutRef.current = null;
    }, 1200);

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setMobileDropdownOpen(null);
    }
    setDesktopDropdownOpen(null);
  };

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setDesktopDropdownOpen(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDesktopDropdownOpen(null);
    }, 150);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 bg-navy border-b border-white/5 ${
        isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.4)]' : ''
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 h-24 flex items-center justify-between">
        <a 
          href="#home" 
          className="flex items-center gap-2 shrink-0"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <img 
            src={`${import.meta.env.BASE_URL}assets/images/Dig-logo-coral-transparent.png`} 
            alt="DIG Technology" 
            className="h-10 md:h-12 w-auto"
          />
        </a>

        <ul className="hidden md:flex items-center gap-2 lg:gap-6 xl:gap-9 h-full">
          {navLinks.map((link) => {
            const hasSubItems = !!link.subItems;
            const isLinkActive = hasSubItems 
              ? link.subItems?.some(sub => activeSection === sub.id)
              : activeSection === link.id;

            return (
              <li 
                key={link.name} 
                className="relative h-full flex items-center"
                onMouseEnter={() => hasSubItems && handleMouseEnter(link.id)}
                onMouseLeave={() => hasSubItems && handleMouseLeave()}
              >
                {!hasSubItems ? (
                  <a 
                    href={link.href} 
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`transition-colors py-2 whitespace-nowrap ${
                      isLinkActive ? 'text-slate-400' : 'text-off-white hover:text-pink'
                    }`}
                    style={{
                      fontSize: 'clamp(16px, 1vw, 18px)',
                      fontWeight: 500,
                      letterSpacing: '0.01em'
                    }}
                  >
                    {link.name}
                  </a>
                ) : (
                  <button
                    className={`flex items-center gap-1 transition-colors py-2 whitespace-nowrap border-none bg-transparent cursor-pointer ${
                      isLinkActive || desktopDropdownOpen === link.id ? 'text-slate-400' : 'text-off-white hover:text-pink'
                    }`}
                    aria-expanded={desktopDropdownOpen === link.id}
                    aria-haspopup="true"
                    style={{
                      fontSize: 'clamp(16px, 1vw, 18px)',
                      fontWeight: 500,
                      letterSpacing: '0.01em'
                    }}
                  >
                    {link.name}
                    <ChevronDown size={14} className={`transition-transform duration-300 ${desktopDropdownOpen === link.id ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {hasSubItems && (
                  <AnimatePresence>
                    {desktopDropdownOpen === link.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-[calc(100%-15px)] left-1/2 -translate-x-1/2 w-48 bg-navy-light border border-white/10 shadow-2xl py-3 z-50"
                      >
                        {link.subItems?.map((sub) => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            onClick={(e) => handleNavClick(e, sub.id)}
                            className={`block px-6 py-2.5 text-sm font-medium transition-colors hover:bg-white/5 ${
                              activeSection === sub.id ? 'text-slate-400' : 'text-off-white hover:text-pink'
                            }`}
                          >
                            {sub.name}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}

                {isLinkActive && (
                  <motion.div 
                    layoutId="navIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple via-pink to-purple"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 shrink-0">
          {/* Desktop "Contact Us" CTA Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="hidden md:flex items-center justify-center transition-all duration-300 font-semibold rounded-[8px] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-pink/50 cursor-pointer text-center hover:shadow-[0_4px_16px_rgba(245,108,129,0.3)] whitespace-nowrap"
            style={{
              fontSize: '16px',
              padding: '10px 18px',
              backgroundColor: '#F56C81',
              color: '#0A192F',
            }}
          >
            Contact Us
          </a>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-24 left-0 right-0 bg-navy-light border-t border-white/10 p-6 flex flex-col gap-2 shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            {navLinks.map((link) => {
              const hasSubItems = !!link.subItems;
              const isLinkActive = hasSubItems 
                ? link.subItems?.some(sub => activeSection === sub.id)
                : activeSection === link.id;

              return (
                <div key={link.name} className="flex flex-col">
                  {!hasSubItems ? (
                    <a 
                      href={link.href} 
                      className={`text-[17px] font-medium py-3 border-b border-white/5 ${
                        isLinkActive ? 'text-slate-400' : 'text-off-white'
                      }`}
                      onClick={(e) => handleNavClick(e, link.id)}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <>
                      <button
                        onClick={() => setMobileDropdownOpen(mobileDropdownOpen === link.id ? null : link.id)}
                        className={`flex items-center justify-between text-[17px] font-medium py-3 border-b border-white/5 bg-transparent border-none w-full text-left ${
                          isLinkActive || mobileDropdownOpen === link.id ? 'text-slate-400' : 'text-off-white'
                        }`}
                        aria-expanded={mobileDropdownOpen === link.id}
                      >
                        {link.name}
                        <ChevronDown size={20} className={`transition-transform duration-300 ${mobileDropdownOpen === link.id ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {mobileDropdownOpen === link.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-white/5 flex flex-col"
                          >
                            {link.subItems?.map((sub) => (
                              <a
                                key={sub.name}
                                href={sub.href}
                                onClick={(e) => handleNavClick(e, sub.id)}
                                className={`px-6 py-3 text-[15px] font-medium border-b border-white/5 last:border-none ${
                                  activeSection === sub.id ? 'text-slate-400' : 'text-off-white'
                                }`}
                              >
                                {sub.name}
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              );
            })}
            
            {/* Mobile "Contact Us" CTA inside Mobile Menu */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, 'contact')}
                className="block text-center transition-all duration-300 font-semibold rounded-[8px] bg-pink cursor-pointer whitespace-nowrap"
                style={{
                  fontSize: '16px',
                  padding: '12px 18px',
                  backgroundColor: '#F56C81',
                  color: '#0A192F',
                }}
              >
                Contact Us
              </a>
            </div>
            <div className="h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

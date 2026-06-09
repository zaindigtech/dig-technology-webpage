import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

interface SectionContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isProgrammaticScroll: React.MutableRefObject<boolean>;
}

const SectionContext = createContext<SectionContextType | undefined>(undefined);

export const SectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('home');
  const isProgrammaticScrollRef = useRef(false);
  const lastProgrammaticSetTime = useRef(0);
  const autoReleaseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isProgrammaticScroll = useRef<React.MutableRefObject<boolean>>({
    get current() {
      return isProgrammaticScrollRef.current;
    },
    set current(val: boolean) {
      isProgrammaticScrollRef.current = val;
      if (val) {
        lastProgrammaticSetTime.current = Date.now();
        if (autoReleaseTimeoutRef.current) {
          clearTimeout(autoReleaseTimeoutRef.current);
        }
        // Safety release: guarantee the scroll flag is released after 2500ms even if no events fired
        autoReleaseTimeoutRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
          autoReleaseTimeoutRef.current = null;
        }, 2500);
      } else {
        if (autoReleaseTimeoutRef.current) {
          clearTimeout(autoReleaseTimeoutRef.current);
          autoReleaseTimeoutRef.current = null;
        }
      }
    }
  } as unknown as React.MutableRefObject<boolean>).current;

  useEffect(() => {
    const sections = ['home', 'solutions', 'workflow', 'applications', 'research', 'about', 'team', 'trust', 'news', 'contact'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-25% 0px -70% 0px', // Trigger line at 25% of viewport height
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Bypassed if we are in the middle of a programmatic scroll link animation
      if (isProgrammaticScrollRef.current) return;

      // Special case for footer/bottom of page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      // We want the section that is currently crossing the 25% "trigger line"
      const intersecting = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top)[0];

      if (intersecting) {
        setActiveSection(intersecting.target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) {
        return;
      }

      if (window.scrollY < 50) {
        setActiveSection('home');
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
        setActiveSection('contact');
      }
    };

    const handleManualInteraction = () => {
      // If the scroll was initiated less than 450ms ago, ignore the interaction
      // (This filters out trackpad click-tap-bounce events and momentum noise)
      const now = Date.now();
      if (now - lastProgrammaticSetTime.current < 450) {
        return;
      }
      
      // If the user manually intervenes with wheel/drag, instantly release the lock
      isProgrammaticScrollRef.current = false;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('wheel', handleManualInteraction, { passive: true });
    window.addEventListener('touchmove', handleManualInteraction, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleManualInteraction);
      window.removeEventListener('touchmove', handleManualInteraction);
      if (autoReleaseTimeoutRef.current) {
        clearTimeout(autoReleaseTimeoutRef.current);
      }
    };
  }, []);

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection, isProgrammaticScroll }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
};

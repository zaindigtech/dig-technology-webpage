import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSection } from '../context/SectionContext';
import { ArrowRight, Activity, Layers, Cpu } from 'lucide-react';

const DensityRatioIcon = ({ size = 24, ...props }: any) => (
  <div className="flex items-center justify-center -space-x-2.5">
    <Activity size={size} {...props} className="rotate-90 opacity-40 shrink-0" />
    <Activity size={size} {...props} className="rotate-90 shrink-0" />
    <Activity size={size} {...props} className="rotate-90 opacity-40 shrink-0" />
  </div>
);

const IRPMIcon = ({ size = 24, ...props }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 16.5L12 21.5L3 16.5V7.5L12 2.5L21 7.5V16.5Z" />
    <path d="M12 12V21.5" />
    <path d="M12 12L21 7.5" />
    <path d="M12 12L3 7.5" />
    <path d="M7.5 5L16.5 10" opacity="0.3" />
    <path d="M16.5 5L7.5 10" opacity="0.3" />
    <path d="M12 16.5L21 12" opacity="0.3" />
    <path d="M12 16.5L3 12" opacity="0.3" />
  </svg>
);

const TECH_CARDS = [
  {
    id: 0,
    title: "DIG DEEP AVO Feasibility Modelling",
    shortTitle: "AVO Feasibility",
    desc: "Geologically constrained AVO feasibility maps and volumes that predict which seismic signatures to expect — for different reservoir fluid, quality, and lithology scenarios — giving your team a defensible, geology-first basis for amplitude interpretation before you drill.",
    highlight: "Reduces prospect risk by grounding amplitude analysis in the rock's actual burial history rather than generic templates.",
    img: "AVO_feasibility_workflow.png",
    icon: Layers
  },
  {
    id: 1,
    title: "Density Ratio Inversion",
    shortTitle: "Density Ratio",
    desc: "A proprietary inversion method, rooted in the full Zoeppritz equations, that extracts acoustic impedance and density ratios directly from seismic AVO data — without the approximations that limit conventional methods.",
    highlight: "Density is the most direct seismic link to hydrocarbon saturation. This technology gives you that connection where others cannot.",
    img: "Density_ratio.png",
    icon: DensityRatioIcon
  },
  {
    id: 2,
    title: "IRPM — Inverse Rock Physics Modelling",
    shortTitle: "IRPM Analysis",
    desc: "Our stochastic and probabilistic Inverse Rock Physics Modelling method predicts reservoir rock properties — porosity, cementation, saturation — directly from seismic AVO data, bypassing conventional inversion limitations.",
    highlight: "Delivers reservoir property predictions with quantified uncertainty, giving decision-makers a clearer picture of what lies beneath.",
    img: "IRPM new1.png",
    icon: IRPMIcon
  }
];

export default function Workflows() {
  const [activeId, setActiveId] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { activeSection, setActiveSection, isProgrammaticScroll } = useSection();
  const isActive = activeSection === 'workflow';

  const activeIdRef = useRef(0);
  activeIdRef.current = activeId;

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#workflow-irpm') {
        setActiveId(2);
      } else if (hash === '#workflow-dig-deep') {
        setActiveId(0);
      }
    };

    handleHash();

    window.addEventListener('hashchange', handleHash);

    const handleSetCustomTab = (e: Event) => {
      const customEvent = e as CustomEvent<{ tabIndex: number; targetId?: string }>;
      if (customEvent.detail && typeof customEvent.detail.tabIndex === 'number') {
        const targetTabIndex = customEvent.detail.tabIndex;
        const targetId = customEvent.detail.targetId || 'workflow';
        
        const isTabAlreadyActive = activeIdRef.current === targetTabIndex;

        setActiveId(targetTabIndex);

        if (setActiveSection) {
          setActiveSection('workflow');
        }

        if (isProgrammaticScroll) {
          isProgrammaticScroll.current = true;
        }

        const delay = isTabAlreadyActive ? 50 : 450;

        setTimeout(() => {
          if (isProgrammaticScroll) {
            isProgrammaticScroll.current = true;
          }

          const element = document.getElementById(targetId);
          if (element) {
            const headerOffset = 96;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }

          setTimeout(() => {
            if (isProgrammaticScroll) {
              isProgrammaticScroll.current = false;
            }
          }, 1300);
        }, delay);
      }
    };
    
    window.addEventListener('setActiveWorkflowTab', handleSetCustomTab);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('setActiveWorkflowTab', handleSetCustomTab);
    };
  }, [setActiveSection, isProgrammaticScroll]);

  const activeCard = TECH_CARDS[activeId];

  return (
    <motion.section 
      animate={{ backgroundColor: isActive ? '#F2F2F2' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="py-25" 
      id="workflow"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Section Description (Left) */}
          <div className="max-w-2xl">
            <p className="section-label">WORKFLOWS</p>
            <h2 className="section-title !text-navy mb-8">Physics-Guided Methods for Subsurface Prediction</h2>
            <div className="space-y-6">
              <p className="text-[1.1rem] text-slate-700 leading-relaxed font-medium">
                Our proprietary rock physics methods translate seismic data into reliable predictions of lithology, fluids, and reservoir properties — reducing uncertainty in exploration and development.
              </p>

              <div className="pt-4 flex flex-col gap-4">
                <div className="flex items-center gap-4 text-navy">
                  <div className="w-10 h-10 rounded-none bg-navy/5 flex items-center justify-center text-pink">
                    <ArrowRight size={18} />
                  </div>
                  <span className="font-semibold text-sm tracking-tight">Reduce Exploration Risk</span>
                </div>
                <div className="flex items-center gap-4 text-navy">
                  <div className="w-10 h-10 rounded-none bg-navy/5 flex items-center justify-center text-pink">
                    <ArrowRight size={18} />
                  </div>
                  <span className="font-semibold text-sm tracking-tight">Optimize Field Development</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Workflow Box (Right) */}
          <div className="flex flex-col gap-6">
            <div className="flex justify-start border-b border-slate-200">
              <div className="flex overflow-x-auto scrollbar-hide">
                {TECH_CARDS.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => {
                      setActiveId(card.id);
                      setIsHovered(false);
                    }}
                    className={`relative px-6 lg:px-7 py-4 lg:py-5 text-[16px] font-semibold tracking-wide cursor-pointer whitespace-nowrap transition-all duration-220 rounded-none border-none outline-none flex items-center gap-3 ${
                      activeId === card.id 
                        ? 'text-navy bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]' 
                        : 'text-slate-500 hover:text-navy hover:bg-white/40'
                    }`}
                  >
                    {card.icon && <card.icon size={18} className={activeId === card.id ? 'text-pink' : 'text-slate-400'} />}
                    {card.shortTitle}
                    {activeId === card.id && (
                      <motion.div 
                        layoutId="activeTechTabTop"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-pink to-purple"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative h-[450px] md:h-[520px] bg-[#0A192F] border border-slate-200 overflow-hidden group shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex items-center justify-center p-8 lg:p-12"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}assets/images/${activeCard.img}`} 
                    alt={activeCard.title} 
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Hover Solution Box */}
              <motion.div
                initial={false}
                animate={{ height: isHovered ? '100%' : '70px' }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="absolute bottom-0 left-0 w-full z-20 bg-[#0A192F]/95 backdrop-blur-sm overflow-hidden border-t border-white/10 flex flex-col"
              >
                {/* "Peek" Label */}
                <div className={`w-full flex items-center px-8 shrink-0 transition-all duration-300 ${isHovered ? 'h-[110px] pt-10' : 'h-[70px]'}`}>
                  <div className="flex items-center w-full justify-between">
                    <div>
                      <span className="text-pink text-[0.6rem] font-semibold uppercase tracking-[0.2em] block mb-0.5">Proprietary Workflow</span>
                      <h3 className="text-white text-sm font-semibold tracking-tight flex items-center gap-2">
                        {activeCard.icon && <activeCard.icon size={14} className="text-pink" />}
                        {activeCard.title}
                      </h3>
                    </div>
                    <ArrowRight size={16} className={`text-pink transition-transform duration-300 ${isHovered ? 'rotate-[90deg]' : 'rotate-[-90deg]'}`} />
                  </div>
                </div>

                {/* Detailed Content */}
                <div className="px-8 pt-2 pb-10 flex flex-col flex-grow overflow-y-auto">
                  <div className="w-12 h-0.5 bg-pink mb-4 shrink-0" />
                  <p className="text-slate-300 text-[0.92rem] leading-relaxed mb-6">
                    {activeCard.desc}
                  </p>
                  
                  {activeCard.highlight && (
                    <div className="mt-auto bg-white/[0.03] border-l-2 border-pink/60 p-4 mb-2 shrink-0">
                      <p className="text-white/90 text-[0.88rem] leading-relaxed italic font-medium">
                        {activeCard.highlight}
                      </p>
                    </div>
                  )}
                  

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

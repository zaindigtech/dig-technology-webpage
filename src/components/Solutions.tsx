import { motion } from 'motion/react';
import React, { useState } from 'react';
import { useSection } from '../context/SectionContext';
import {
  Layers,
  Waves,
  Database,
  Search,
  Activity,
  Cpu,
  Zap,
  Compass,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

const DensityRatioIcon = ({ size = 24, ...props }: any) => (
  <div className="flex items-center justify-center -space-x-3.5">
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

const WellAVOIcon = ({ size = 24, ...props }: any) => (
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
    {/* Both Rigs starting at the same level y=10 */}
    {/* Left Well (Lower part of structure) - Longer Pipe */}
    <path d="M5 10l2-4 2 4" strokeWidth="1.5" />
    <path d="M4 10h6" />
    <path d="M7 10v12" />

    {/* Right Well (Higher part of structure) - Shorter Solid Pipe */}
    <path d="M15 10l2-4 2 4" strokeWidth="1.5" />
    <path d="M14 10h6" />
    <path d="M17 10v6" />

    {/* Curved Layers showing structural elevation (rising from left to right) */}
    <path d="M2 17c6 0 10-6 20-8" opacity="0.3" />
    <path d="M2 21c6 0 10-6 20-8" opacity="0.2" />
  </svg>
);

const FastTrackAPAIcon = ({ size = 24, ...props }: any) => (
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
    <path d="M14.5 11c0 1.5-1 2.5-2.5 2.5s-2.5-0.5-3.5-1.5 0.5-2.5 2.5-2.5 3.5 0 3.5 1.5z" opacity="0.8" />
    <path d="M17 11c0 3-2 5-5 5s-6-1-7-4 2-6 6-6 6 2 6 5z" opacity="0.4" />
    <path d="M20 11c0 5-4 8-8 8s-9-2-10-7 3-9 9-9 9 3 9 8z" opacity="0.2" />
    <path d="M22 11c0 7-6 11-10 11s-10-3-11-10 4-11 11-11 10 3 10 10z" opacity="0.1" />
  </svg>
);

const ExplorationGnGIcon = ({ size = 24, ...props }: any) => (
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
    <path d="M11 5l2 3M11 8h2M10 10h4M9 12h6" strokeWidth="1.5" />
    <path d="M10 12v2M14 12v2" strokeWidth="1.5" />
    <path d="M2 14c2-0.5 3 0.5 5 0s3-0.5 5 0 3 0.5 5 0 3-0.5 5 0" opacity="0.4" />
    <path d="M12 12v9" />
    <path d="M4 17c4-1 12-1 16 0" opacity="0.25" />
    <path d="M4 19.5c4-1 12-1 16 0" opacity="0.15" />
    <path d="M8.5 19.5c2-1.2 5-1.2 7 0" strokeWidth="3" opacity="0.8" />
  </svg>
);

const SERVICES = [
  {
    title: "DIG DEEP AVO Feasibility Modelling",
    desc: "Geologically constrained AVO feasibility maps and volumes — identify which AVO signatures to expect for different reservoir fluid and quality scenarios.",
    icon: Layers,
    link: "#research-dig-deep",
    isProprietary: true
  },
  {
    title: "Seismic Reservoir Prediction & Classification",
    desc: "Seismic reservoir property prediction and classification constrained by burial history and multi-scenario AVO feasibility modelling.",
    icon: Waves,
    link: "#research-dig-deep"
  },
  {
    title: "Well Data AVO Feasibility & Classification",
    desc: "Geology-constrained AVO feasibility modelling, prediction and classification of well and pseudo-well data within area of interest.",
    icon: WellAVOIcon,
    link: "#research-dig-deep"
  },
  {
    title: "Well Log QC, Screening & Exploratory Analysis",
    desc: "Exploratory well log data analysis including rock physics diagnostics of cement volume, sorting, clay content and elastic properties using in-house software.",
    icon: Search,
    link: ""
  },
  {
    title: "Density Ratio Inversion",
    desc: "Acoustic impedance and density prediction from seismic AVO data — directly linkable to hydrocarbon saturation.",
    icon: DensityRatioIcon,
    link: "#research-density-ratio",
    isProprietary: true
  },
  {
    title: "IRPM Analysis",
    desc: "Prediction of rock properties directly from seismic AVO data using stochastic and probabilistic Inverse Rock Physics Modelling.",
    icon: IRPMIcon,
    link: "#research-irpm",
    isProprietary: true
  },
  {
    title: "Fast-track APA Application Support",
    desc: "G&G team with experience in technical work and APA applications — including fast-track AVO feasibility maps as support for prospects.",
    icon: FastTrackAPAIcon,
    link: ""
  },
  {
    title: "Exploration G&G Screening",
    desc: "Screening for near-infrastructure and frontier exploration opportunities across basins of interest.",
    icon: ExplorationGnGIcon,
    link: ""
  },
  {
    title: "Training Courses",
    desc: "In-house and on-site training in Rock Physics and Quantitative Seismic Interpretation — typically 3–5 days, tailored to your team.",
    icon: GraduationCap,
    link: ""
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * i,
      duration: 0.5
    }
  })
};

interface ServiceCardProps {
  svc: (typeof SERVICES)[0];
  i: number;
  key?: React.Key;
}

function ServiceCard({ svc, i }: ServiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = svc.icon;
  const { setActiveSection, isProgrammaticScroll } = useSection();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      
      let tabIndex = -1;
      let targetId = '';
      if (link === '#research-dig-deep') {
        tabIndex = 0;
        targetId = 'research-dig-deep';
      } else if (link === '#research-density-ratio') {
        tabIndex = 1;
        targetId = 'research-density-ratio';
      } else if (link === '#research-irpm') {
        tabIndex = 2;
        targetId = 'research-irpm';
      }

      if (tabIndex !== -1) {
        // Update hash to keep address bar synchronized with the active section/product
        window.history.pushState(null, '', link);

        // Dispatch the custom tab change event so the Research component renders the tab and performs smooth scrolling with dynamic delays
        window.dispatchEvent(new CustomEvent('setActiveResearchTab', { 
          detail: { tabIndex, targetId } 
        }));
      } else {
        const targetId = link.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          window.history.pushState(null, '', link);
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    }
  };

  return (
    <motion.div
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={cardVariants}
      onHoverStart={() => setIsOpen(true)}
      onHoverEnd={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      className="group relative bg-white rounded-none overflow-hidden border border-slate-200 h-[380px] cursor-default outline-none focus-visible:ring-2 focus-visible:ring-pink transition-shadow duration-500 hover:shadow-md"
      tabIndex={0}
    >
      {/* Default State Content (Icon & Title) */}
      <motion.div 
        animate={{ 
          opacity: isOpen ? 0 : 1, 
          y: isOpen ? -20 : 0 
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="relative z-0 p-7 flex flex-col items-start h-full"
      >
        <div className="mb-6 p-2.5 bg-slate-50 rounded-none text-[#0A192F]">
          <Icon size={24} strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-3xl font-medium text-[#0A192F] leading-tight tracking-tight">
            {svc.title}
          </h3>
          {svc.isProprietary && (
            <div className="flex">
              <span className="inline-flex items-center px-1.5 py-0.5 border border-pink/30 bg-pink/[0.03] text-[0.55rem] font-bold tracking-widest text-pink uppercase rounded-none">
                Proprietary
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Blue Growing Panel */}
      <motion.div
        animate={{ height: isOpen ? '100%' : '64px' }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 20,
          mass: 1
        }}
        className="absolute bottom-0 left-0 w-full z-20 bg-[#0A192F] overflow-hidden rounded-none"
      >
        {/* "Read more here" Bar Label (Visible in default state at the top of the expanding panel) */}
        <div className="absolute top-0 left-0 w-full h-[64px] flex items-center px-7">
          <motion.div 
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <span className="text-white text-[0.7rem] font-semibold uppercase tracking-[0.2em]">Read more here</span>
            <ArrowRight size={14} className="ml-3 text-pink" />
          </motion.div>
        </div>

        {/* Expanded Content (Visible on hover) */}
        <motion.div 
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isOpen ? 0.1 : 0 }}
          className="p-7 pt-16 h-full flex flex-col justify-start"
        >
          <div className="mb-8">
            <p className="text-lg md:text-[1.15rem] text-slate-200 leading-relaxed font-medium">
              {svc.desc}
            </p>
          </div>

          {svc.link ? (
            <div className="mt-auto">
              <a
                href={svc.link}
                onClick={(e) => handleLinkClick(e, svc.link)}
                className="inline-flex items-center gap-2 text-pink text-sm font-semibold hover:gap-3 transition-all cursor-pointer"
              >
                Learn more
                <ArrowRight size={16} />
              </a>
            </div>
          ) : null}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Solutions() {
  const { activeSection } = useSection();
  const isActive = activeSection === 'solutions';

  return (
    <motion.section
      animate={{ backgroundColor: isActive ? '#F8FAFC' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="py-24"
      id="solutions"
    >
      <div className="container">
        <div className="max-w-3xl mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Solutions
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-[#0A192F] tracking-tight leading-tight"
          >
            Rock Physics & AVO Support for Subsurface Decision
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed font-medium"
          >
            We use geology-consistent rock physics models, calibrated with burial history and integrated with AVO analysis, to reduce interpretation uncertainty and deliver more reliable reservoir prediction and prospect de-risking.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={i} svc={svc} i={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
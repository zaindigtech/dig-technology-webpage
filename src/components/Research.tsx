import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { useSection } from '../context/SectionContext';

const PUB_DATA = [
  {
    group: "AVO Feasibility Modelling",
    items: [
      { type: "Article", title: "Did you know that rocks have memory?", authors: "Åsmund Drottning, Per Avseth & Tore N. Hansen", source: "GeoExpro", year: "2023", link: "https://geoexpro.com/did-you-know-that-rocks-have-memory/" },
      { type: "Article", title: "3D Subsurface Modeling of Multi-Scenario Rock Property and AVO Feasibility Cubes — An Integrated Workflow", authors: "Per Avseth & Ivan Lehocki", source: "Frontiers in Earth Science", year: "2021", link: "https://www.frontiersin.org/journals/earth-science/articles/10.3389/feart.2021.642363/full" },
      { type: "Article", title: "Seismic methods for fluid discrimination in areas with complex geologic history — A case example from the Barents Sea", authors: "Ivan Lehocki, Per Avseth & Nazmul Haque Mondol", source: "Interpretation", year: "2020", link: "https://doi.org/10.1190/INT-2019-0057.1" },
      { type: "Article", title: "From cradle to grave: how burial history controls the rock-physics properties of quartzose sandstones", authors: "Ivan Lehocki & Per Avseth", source: "Geophysical Prospecting", year: "2020", link: "https://onlinelibrary.wiley.com/doi/abs/10.1111/1365-2478.13039" },
      { type: "Article", title: "Exploration workflow for real-time modelling of rock property and AVO feasibilities — a Barents Sea demonstration", authors: "Per Avseth, Ivan Lehocki, Laurent Feuilleaubois, Tore N. Hansen, Kristian Angard & Cyrille Reiser", source: "First Break", year: "2020", link: "https://www.earthdoc.org/content/journals/10.3997/1365-2397.fb2020065" },
      { type: "Conference", title: "A New Integrated Workflow to Generate AVO Feasibility Maps for Prospect De-Risking", authors: "P. Avseth, I. Lehocki, K. Angard, T. Hansen, E. Shelavina, S. Schjelderup", source: "EAGE 82nd Conference", year: "2020", link: "https://www.earthdoc.org/content/papers/10.3997/2214-4609.202010498" },
      { type: "Video", title: "Scenario-based rock physics feasibility modelling", authors: "Per Avseth", source: "ASEG Webinar Series", year: "2022", link: "https://www.youtube.com/watch?v=MHE6p5vVPPI" }
    ]
  },
  {
    group: "Density Ratio Inversion",
    items: [
      { type: "Article", title: "Algorithms for extraction of reliable density ratios from pre-stack seismic data — Part 1: Theory", authors: "Ivan Lehocki, Tapan Mukerji, Per Avseth & Erling Hugo Jensen", source: "Geophysical Prospecting", year: "2025", link: "https://onlinelibrary.wiley.com/doi/10.1111/1365-2478.70029" },
      { type: "Article", title: "Algorithms for extraction of reliable density ratios from pre-stack seismic data — Part 2: Applications", authors: "Ivan Lehocki, Tapan Mukerji, Per Avseth & Erling Hugo Jensen", source: "Geophysical Prospecting", year: "2025", link: "https://onlinelibrary.wiley.com/doi/10.1111/1365-2478.70030" },
      { type: "Conference", title: "2-Step Inversion Algorithm for Calculation of Density- and Vp/Vs Ratios from P-to-P Zoeppritz Equation", authors: "Ivan Lehocki & Per Avseth", source: "EAGE Conference on Seismic Inversion", year: "2024", link: "https://www.earthdoc.org/content/papers/10.3997/2214-4609.202438033" },
      { type: "Conference", title: "Direct Inversion of Acoustic Impedance and Density from Uncalibrated Seismic Amplitudes — A North Sea Demonstration", authors: "Ivan Lehocki & Per Avseth", source: "EAGE Conference on Seismic Inversion", year: "2020", link: "https://www.earthdoc.org/content/papers/10.3997/2214-4609.202037026" },
      { type: "Video", title: "Improved Rock Property Estimation from Joint Inversion of PP and PS Reflectivities", authors: "Ivan Lehocki", source: "EAGE E-Lecture", year: "2019", link: "https://www.youtube.com/watch?v=H_ekfexq1zI" }
    ]
  },
  {
    group: "Inverse Rock Physics Modelling",
    items: [
      { type: "Article", title: "Quantitative interpretation using inverse rock-physics modeling on AVO data", authors: "Erling Hugo Jensen, Tor Arne Johansen, Per Avseth & Knut Bredesen", source: "The Leading Edge", year: "2016", link: "https://pubs.geoscienceworld.org/seg/tle/article-abstract/35/8/677/311720/Quantitative-interpretation-using-inverse-rock" },
      { type: "Article", title: "Spatial constrained inverse rock physics modelling", authors: "Beatriz Moyano, Erling Hugo Jensen & Tor Arne Johansen", source: "Geophysical Prospecting", year: "2015", link: "https://onlinelibrary.wiley.com/doi/10.1111/1365-2478.12178" },
      { type: "Article", title: "Quantitative seismic interpretation using inverse rock physics modelling", authors: "Knut Bredesen, Erling Hugo Jensen, Tor Arne Johansen & Per Avseth", source: "Petroleum Geoscience", year: "2015", link: "https://pubs.geoscienceworld.org/gsl/pg/article-abstract/21/4/271/334954/Quantitative-seismic-interpretation-using-inverse" },
      { type: "Article", title: "Inverse rock physics modeling for reservoir quality prediction", authors: "Tor Arne Johansen, Erling Hugo Jensen, Gary Mavko & Jack Dvorkin", source: "Geophysics", year: "2013", link: "https://pubs.geoscienceworld.org/seg/geophysics/article-abstract/78/2/M1/298511/Inverse-rock-physics-modeling-for-reservoir" }
    ]
  },
  {
    group: "Shale rock physics",
    items: [
      { type: "Conference", title: "Rock Physics Modelling of Shale Diagenesis Constrained by Thermal and Burial History", authors: "Per Avseth, Ivan Lehocki, D. Daudina & D. Leslie", source: "EAGE 7th Rock Physics Workshop", year: "2025", link: "https://www.earthdoc.org/content/papers/10.3997/2214-4609.2025646014" }
    ]
  },
  {
    group: "Software & technology",
    items: [
      { type: "Video", title: "Video Big Data and MATLAB: Dig Software", authors: "Erling Hugo Jensen", source: "MathWorks MATLAB EXPO", year: "2024", link: "https://www.mathworks.com/videos/big-data-and-matlab-dig-software-1730891620901.html" }
    ]
  }
];

export default function Research() {
  const [activeTab, setActiveTab] = useState(0);
  const [clickedLinks, setClickedLinks] = useState<Set<string>>(new Set());
  const { activeSection, scrollToSection } = useSection();
  const isActive = activeSection === 'research';

  const activeTabRef = useRef(0);
  activeTabRef.current = activeTab;

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#research-irpm') {
        setActiveTab(2); // Inverse Rock Physics Modelling
      } else if (hash === '#research-dig-deep') {
        setActiveTab(0); // AVO Feasibility Modelling
      } else if (hash === '#research-density-ratio') {
        setActiveTab(1); // Density Ratio Inversion
      }
    };

    // Run on initial load
    handleHash();

    // Listen to hash change
    window.addEventListener('hashchange', handleHash);

    // Listen to custom tab change events
    const handleSetCustomTab = (e: Event) => {
      const customEvent = e as CustomEvent<{ tabIndex: number; targetId?: string }>;
      if (customEvent.detail && typeof customEvent.detail.tabIndex === 'number') {
        const targetTabIndex = customEvent.detail.tabIndex;
        const targetId = customEvent.detail.targetId || (
          targetTabIndex === 2 ? 'research-irpm' : (targetTabIndex === 0 ? 'research-dig-deep' : (targetTabIndex === 1 ? 'research-density-ratio' : 'research'))
        );
        
        const isTabAlreadyActive = activeTabRef.current === targetTabIndex;

        // Set the active tab
        setActiveTab(targetTabIndex);

        // Dynamic Scroll Delay: If tab changes, wait 450ms for exit/entry transitions to settle
        // If already active, scroll immediately to the element with a safe 50ms layout settle time
        const delay = isTabAlreadyActive ? 50 : 450;

        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            scrollToSection(targetId);
          } else {
            scrollToSection('research');
          }
        }, delay);
      }
    };
    window.addEventListener('setActiveResearchTab', handleSetCustomTab);

    return () => {
      window.removeEventListener('hashchange', handleHash);
      window.removeEventListener('setActiveResearchTab', handleSetCustomTab);
    };
  }, [scrollToSection]);

  const handleLinkClick = (link: string) => {
    setClickedLinks(prev => {
      const next = new Set(prev);
      next.add(link);
      return next;
    });
  };

  return (
    <motion.section 
      animate={{ backgroundColor: isActive ? '#F2F2F2' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="py-25" 
      id="research"
    >
      <div className="container">
        <div className="max-w-2xl mb-13">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Research
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title !text-[#0A192F]"
          >
            Research That Powers Our Technology
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle !text-[#0A192F]/80"
          >
            Our research underpins the methods we apply in industry—linking rock physics, AVO analysis, and seismic inversion to real subsurface decisions.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[0.95rem] text-slate-500 mt-4 leading-relaxed"
          >
            These studies form the foundation of our workflows for reducing uncertainty in exploration, appraisal, and reservoir prediction.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-start border-b border-slate-200 overflow-x-auto scrollbar-hide">
            {PUB_DATA.map((group, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`relative px-8 py-5 text-[16px] font-semibold tracking-wide cursor-pointer whitespace-nowrap transition-all duration-220 first:rounded-none ${
                  activeTab === i 
                    ? 'text-[#0A192F] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]' 
                    : 'text-slate-500 hover:text-[#0A192F] hover:bg-white/40'
                }`}
              >
                {group.group}
                {activeTab === i && (
                  <motion.div 
                    layoutId="pubTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-pink to-purple"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="border border-slate-200 rounded-none bg-[#0A192F] p-6 md:p-12 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-4"
            >
              {PUB_DATA[activeTab].items.map((item, ii) => {
                const isClicked = clickedLinks.has(item.link);
                const itemId = activeTab === 2 && ii === 0 
                  ? 'research-irpm' 
                  : (activeTab === 0 && ii === 0 
                      ? 'research-dig-deep' 
                      : (activeTab === 1 && ii === 0 ? 'research-density-ratio' : undefined));
                return (
                  <div 
                    key={ii}
                    id={itemId}
                    className="group relative bg-white/5 border border-white/10 rounded-none p-6 flex flex-col md:flex-row md:items-center gap-5 overflow-hidden transition-all duration-280 hover:bg-white/10 hover:border-purple/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple/55 via-pink/30 via-purple/55 to-transparent opacity-0 transition-opacity duration-280 group-hover:opacity-100" />
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.88rem] md:text-[0.95rem] font-semibold text-white leading-relaxed mb-2 tracking-tight">
                        {item.title}
                      </p>
                      <p className="text-[0.78rem] leading-relaxed">
                        <span className="text-slate-300">{item.authors}</span>
                        <span className="text-white/20 mx-2">—</span>
                        <span className="text-slate-400">{item.source}</span>
                        <span className="text-white/20 mx-2">—</span>
                        <span className="text-pink font-semibold">{item.year}</span>
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between md:justify-start gap-4 shrink-0 w-full md:w-auto pt-5 md:pt-0 border-t border-white/5 md:border-none">
                      <span className="text-[0.7rem] md:text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-[#F56C81] bg-[#F56C81]/10 px-2 py-0.5 md:p-0 md:bg-transparent">
                        {item.type}
                      </span>

                      {item.link !== '#' ? (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener" 
                          onClick={() => handleLinkClick(item.link)}
                          className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-none text-[0.75rem] font-semibold border transition-all duration-220 w-full sm:w-auto justify-center ${
                            isClicked 
                              ? 'text-[#F56C81] border-[#F56C81]/40 bg-[#F56C81]/5' 
                              : 'text-[#22D3EE] border-[#22D3EE]/30 bg-[#22D3EE]/5 hover:text-white hover:border-[#22D3EE] hover:bg-[#22D3EE]/20'
                          }`}
                        >
                          {item.type === 'Video' ? 'Watch video' : 'Read article'}
                          <ExternalLink size={14} />
                        </a>
                      ) : (
                        <span className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-none text-[0.75rem] font-semibold text-slate-500 italic border border-white/5 bg-transparent cursor-default w-full sm:w-auto justify-center">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
        </div>
      </div>
    </motion.section>
  );
}

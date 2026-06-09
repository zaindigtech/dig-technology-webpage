import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSection } from '../context/SectionContext';

const INDUSTRIES = [
  {
    id: 0,
    tab: 'Frontier Exploration',
    eyebrow: 'Frontier Exploration',
    desc: 'Reduce exploration risk in data-sparse basins by evaluating AVO feasibility and predicting lithology and fluid response before drilling.',
    img: 'frontier1.png'
  },
  {
    id: 1,
    tab: 'Appraisal & Delineation',
    eyebrow: 'Appraisal & Delineation',
    desc: 'Quantify uncertainty in reservoir properties and extend predictions away from well control to support appraisal and development planning.',
    img: 'appraisal_delineation.png'
  },
  {
    id: 2,
    tab: '4D Production Monitoring',
    eyebrow: '4D Production Monitoring',
    desc: 'Use time-lapse seismic and rock physics to track fluid movement and pressure changes, supporting reservoir management and production optimization.',
    img: '4D_production_monitoring.png'
  },
  {
    id: 3,
    tab: 'CO₂ Storage Monitoring',
    eyebrow: 'CO₂ Storage Monitoring',
    desc: 'Apply rock physics-driven workflows to detect, track, and verify CO₂ plume movement in subsurface storage formations.',
    img: 'carbon_monitoring.png'
  }
];

export default function Applications() {
  const [activeId, setActiveId] = useState(0);
  const { activeSection } = useSection();
  const isActive = activeSection === 'applications';

  return (
    <motion.section 
      animate={{ backgroundColor: isActive ? '#F2F2F2' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="py-25" 
      id="applications"
    >
      <div className="container">
        <div className="mb-13">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            Applications
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title !text-[#0A192F]"
          >
            Built for every stage<br />of the field lifecycle
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle !text-[#0A192F]/80 max-w-2xl"
          >
            From frontier exploration to production and energy transition, we integrate rock physics and seismic analysis to reduce uncertainty and support critical subsurface decisions.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[0.95rem] text-slate-500 mt-4 leading-relaxed"
          >
            Our workflows help improve drilling, field development, reservoir monitoring, and energy-transition decisions across the subsurface lifecycle.
          </motion.p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex justify-start border-b border-slate-200 overflow-x-auto scrollbar-hide">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setActiveId(ind.id)}
                className={`relative px-8 py-5 text-[16px] font-semibold tracking-wide cursor-pointer whitespace-nowrap transition-all duration-220 first:rounded-none ${
                  activeId === ind.id 
                    ? 'text-[#0A192F] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.06)]' 
                    : 'text-slate-500 hover:text-[#0A192F] hover:bg-white/40'
                }`}
              >
                {ind.tab}
                {activeId === ind.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple via-pink to-purple"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="relative min-h-[600px] md:h-[520px] lg:h-[480px] border border-slate-200 rounded-none overflow-hidden bg-[#0A192F]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:absolute md:inset-0 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] lg:grid-cols-[2fr_3fr] h-full"
            >
              <div className="p-8 md:p-10 lg:p-16 flex flex-col justify-center bg-navy/10 border-b md:border-b-0 md:border-r border-white/5">
                <div 
                  className="flex items-center gap-2.5 uppercase text-pink mb-4 md:mb-6"
                  style={{
                    fontSize: 'clamp(14px, 1vw, 16px)',
                    fontWeight: 700,
                    letterSpacing: '0.12em'
                  }}
                >
                  <div className="w-5 h-0.5 bg-pink rounded-[1px] shrink-0" />
                  <span className="whitespace-nowrap md:whitespace-normal lg:whitespace-nowrap">
                    {INDUSTRIES[activeId].eyebrow}
                  </span>
                </div>
                <p className="text-lg md:text-xl lg:text-3xl text-white leading-relaxed max-w-md font-medium tracking-tight">
                  {INDUSTRIES[activeId].desc}
                </p>
              </div>
              <div className={`relative min-h-[300px] md:min-h-0 overflow-hidden transition-colors duration-300 ${INDUSTRIES[activeId].id === 2 ? 'bg-white' : ''}`}>
                <img 
                  src={`${import.meta.env.BASE_URL}assets/images/${INDUSTRIES[activeId].img}`} 
                  alt="" 
                  className={`w-full h-full ${INDUSTRIES[activeId].id === 2 ? 'object-contain' : 'object-cover'}`} 
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  </motion.section>
  );
}

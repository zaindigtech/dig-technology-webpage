import { motion } from 'motion/react';
import { useSection } from '../context/SectionContext';

export default function About() {
  const { activeSection } = useSection();
  const isActive = activeSection === 'about';

  return (
    <motion.section 
      animate={{ backgroundColor: isActive ? '#F2F2F2' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="relative py-25 overflow-hidden" 
      id="about"
    >
      <div className="container relative z-10">
        <div className="max-w-5xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            WHO WE ARE
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title !text-navy mb-12"
          >
            Rock physics expertise for better subsurface decisions
          </motion.h2>
          
          <div className="flex flex-col gap-8">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            className="text-[1.25rem] text-slate-800 leading-relaxed font-semibold italic"
            >
              DIG Technology delivers rock physics-driven subsurface prediction by integrating AVO analysis, quantitative seismic interpretation, inversion, and reservoir characterization.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-[1.1rem] text-slate-700 leading-relaxed font-medium"
            >
              Unlike conventional workflows, our approach is constrained by rock physics principles, ensuring geologically consistent and interpretable predictions.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-[1.1rem] text-slate-600 leading-relaxed"
            >
              We transform seismic and well data into reliable subsurface insight using physics-based, data-driven workflows designed to reduce uncertainty across exploration, appraisal, field development, and monitoring — directly supporting better drilling and development decisions.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="text-[1.1rem] text-slate-600 leading-relaxed"
            >
              Built on decades of experience across operators, academia, and technology development.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-[1.1rem] text-slate-600 leading-relaxed"
            >
              <span className="text-navy font-semibold">DIG DEEP</span> is our core rock physics-driven technology, enabling prediction of subsurface properties beyond well control and supporting high-confidence decisions.
            </motion.p>
          </div>

          {/* Core Expertise Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Rock Physics & AVO", text: "Link seismic amplitudes to lithology and fluid properties through calibrated physical models." },
              { title: "QI & Inversion", text: "Derive elastic properties and constrain reservoir models with high-resolution quantitative interpretation." },
              { title: "Prediction & Monitoring", text: "Map reservoir properties and track state changes over time for optimized field development." }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="group relative bg-white border border-slate-200/60 rounded-none p-10 overflow-hidden transition-all duration-320 hover:border-purple/40 hover:-translate-y-1.5 hover:shadow-[0_32px_64px_rgba(0,0,0,0.08)]"
              >
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple via-pink to-purple opacity-0 transition-opacity duration-320 group-hover:opacity-100 pointer-events-none z-20" />
                <h4 className="text-[0.85rem] font-semibold tracking-[0.15em] uppercase text-navy mb-5 group-hover:text-pink transition-colors duration-300">
                  {card.title}
                </h4>
                <p className="text-[0.95rem] text-slate-500 leading-relaxed">
                  {card.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

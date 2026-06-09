import { motion } from 'motion/react';
import { useSection } from '../context/SectionContext';

const LOGOS = [
  { name: 'Aker BP', logo: 'brand_assets/AkerBP_logo.jpg' },
  { name: 'INPEX', logo: 'brand_assets/inpex_logo.png' },
  { name: 'OMV', logo: 'brand_assets/OMV_logo_RGB_Deep-Blue.png' },
  { name: 'Petronas', logo: 'brand_assets/Petronas_logo.png' },
  { name: 'PGS', logo: 'brand_assets/PGS_LOGO_RGB.gif' },
  { name: 'DNO', logo: 'brand_assets/DNO_logo.png' },
  { name: 'Sval Energi', logo: 'brand_assets/Sval_main-logo_blue_RGB.png' },
  { name: 'Vår Energi', logo: 'brand_assets/var-energi-black.png' },
  { name: 'Qeye', logo: 'brand_assets/Qeye.svg' },
  { name: 'OpenMind', logo: 'brand_assets/OpenMind.svg' },
  { name: 'Ragnarock Geo', logo: 'brand_assets/Ragnarock_Geo.png' },
  { name: 'Ross Offshore', logo: 'brand_assets/Ross_Offshore.png' },
  { name: 'Migris', logo: 'brand_assets/Migris.png' },
];

export default function Trust() {
  const { activeSection } = useSection();
  const isActive = activeSection === 'trust';

  return (
    <motion.section 
      animate={{ backgroundColor: isActive ? '#F2F2F2' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="py-25" 
      id="trust"
    >
      <div className="container">
        <div className="max-w-xl mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            TRUSTED BY INDUSTRY LEADERS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title !text-[#0A192F]"
          >
            Collaborating Across the Energy Industry to Reduce Uncertainty
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle !text-slate-600"
          >
            DIG Technology works with leading E&P operators, service companies, and key industry partners to deliver rock physics driven seismic insights that improve reservoir prediction, reduce exploration and development risk, and support confident subsurface decisions..
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {LOGOS.map((item, i) => (
            <motion.div 
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * i }}
              className="group relative bg-white border border-slate-200/40 rounded-none h-36 flex items-center justify-center p-8 overflow-hidden transition-all duration-320 hover:border-purple/40 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.1)]"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple via-pink to-purple opacity-0 transition-opacity duration-320 group-hover:opacity-100 pointer-events-none z-20" />
              <img 
                src={item.logo} 
                alt={item.name} 
                className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

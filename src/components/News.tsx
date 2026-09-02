import { motion } from 'motion/react';
import { ArrowRight, Calendar } from 'lucide-react';
import { useSection } from '../context/SectionContext';

const NEWS_ITEMS = [
  {
    date: "August 2026",
    category: "Awards",
    title: "Per Honored with SEG Reginald Fessenden & Best Paper Awards",
    excerpt: "Per Åge Avseth received the prestigious 2026 SEG Reginald Fessenden Award, and the 2025 Best Paper in Interpretation award with co-authors Brian Russell and Bill Goodway at IMAGE 2026.",
    link: ""
  },
  {
    date: "July 2026",
    category: "R&D",
    title: "Vår Energi joins Shale Rock Physics R&D Consortium Phase II",
    excerpt: "Vår Energi has joined OMV Norge in supporting Phase II of DIG Technology’s Shale Rock Physics R&D Consortium. The collaboration strengthens the next phase of research into advanced shale rock physics, overpressure prediction, FWI integration, and AVO modelling of clay-rich rocks.",
    link: ""
  },
  {
    date: "March 17, 2026",
    category: "Events",
    title: "Seismic Reservoir Prediction Seminar (NPF)",
    excerpt: "Join Per Avseth, CTO, at The Biennial Geophysical Seminar 2026 for an insightful session on cutting-edge seismic reservoir prediction using Advanced Probe technology.",
    link: "https://npf.no/konferansen/geophysical2026/"
  }
];

export default function News() {
  const { activeSection } = useSection();
  const isActive = activeSection === 'news';

  return (
    <motion.section 
      animate={{ backgroundColor: isActive ? '#F2F2F2' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="py-25" 
      id="news"
    >
      <div className="container">
        <div className="max-w-2xl mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            NEWS
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title !text-[#0A192F]"
          >
            News & Insights
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle !text-slate-600"
          >
            Stay informed about our latest research breakthroughs, company milestones, and upcoming industry events.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="group relative bg-[#0A192F] border border-white/[0.06] rounded-none overflow-hidden flex flex-col transition-all duration-320 hover:border-purple/40 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.3)]"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple via-pink to-purple opacity-0 transition-opacity duration-320 group-hover:opacity-100 pointer-events-none z-20" />
              
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-[0.85rem] font-semibold tracking-[0.2em] uppercase text-pink px-2.5 py-1 bg-pink/10 rounded-none border border-pink/20">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[0.85rem] font-medium">
                    <Calendar size={12} />
                    {item.date}
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-4 leading-tight tracking-tight group-hover:text-pink transition-colors duration-300">
                  {item.title}
                </h3>
                
                <p className="text-[0.85rem] text-slate-300 leading-relaxed mb-8">
                  {item.excerpt}
                </p>

                {item.link && (
                  <div className="mt-auto">
                    <a 
                      href={item.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[0.75rem] font-semibold text-white hover:text-pink transition-colors group/link"
                    >
                      Read more
                      <ArrowRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

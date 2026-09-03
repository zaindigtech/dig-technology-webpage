import React from 'react';
import { motion } from 'motion/react';
import { useSection } from '../context/SectionContext';

interface TeamMember {
  name: string;
  role: string;
  img: string;
  science: string;
  honours?: string;
  tags: string;
  pos?: string;
}

const TEAM: TeamMember[] = [
  { 
    name: "Tore N. Hansen", 
    role: "CEO and Co-founder", 
    img: "tore_blue.png",
    tags: "Exploration | Seismic Interpretation | Prospect Screening",
    science: "Geoscientist (Cand. Scient., University of Tromsø)",
    pos: "center 15%"
  },
  { 
    name: "Dr. Per Avseth", 
    role: "CTO and Co-founder", 
    img: "Per_blue.png",
    tags: "Rock Physics | AVO Analysis | Quantitative Interpretation | Sedimentology",
    science: "Geophysicist (PhD, Stanford University)",
    honours: "SEG Honorary Lecturer in Europe (2009), Norwegian Geophysical Award (2012), Reginald Fessenden award (2026)", 
    pos: "center 15%"
  },
  { 
    name: "Dr. Åsmund Drottning", 
    role: "COO and Co-founder", 
    img: "Asmund_blue.png",
    tags: "Rock Physics | AVO Analysis | Seismic Modelling | Survey Design",
    science: "Geophysicist (Dr. Scient., University of Bergen)",
    pos: "center 15%"
  },
  { 
    name: "Ivan Lehocki", 
    role: "Lead Data Scientist and Co-founder", 
    img: "Ivan_blue.png",
    tags: "Rock Physics | AVO Analysis Inversion | Data Science | Software Development",
    science: "Geophysicist (MSc, Eötvös Loránd University)",
    honours: "Young Petroleum Geoscientist Award (2015)",
    pos: "center 15%"
  },
  { 
    name: "Kristian Angard", 
    role: "Lead Petroleum System Analyst and Co-founder", 
    img: "Kristian_blue.png",
    tags: "Petroleum Systems | Exploration | Basin Analysis",
    science: "Geologist (Cand. Scient., University of Oslo)",
    pos: "center 15%"
  },
  { 
    name: "Dr. Erling Jensen", 
    role: "Lead Software Architect and Co-founder", 
    img: "Erling_blue.png",
    tags: "Rock Physics | Inverse Modelling | Reservoir Geophysics | Software",
    science: "Rock Physicist (PhD, University of Bergen)",
    pos: "center 15%"
  },
  { 
    name: "Tor Arne Johansen", 
    role: "Professor Emeritus, UiB and Co-founder", 
    img: "Tor_arne_blue.png",
    tags: "Rock Physics | AVO Analysis | Inverse Rock Physics | CO₂ Storage",
    science: "Geophysicist (University of Bergen)",
    pos: "center 15%"
  },
  { 
    name: "Zain Ul Abideen", 
    role: "Geophysicist", 
    img: "Zain_blue.png",
    tags: "Quantitative Interpretation | Rock Physics | Subsurface Evaluation",
    science: "Geophysicist (MSc)",
    pos: "center 15%"
  }
];

interface TeamMemberCardProps {
  member: TeamMember;
  i: number;
  key?: React.Key;
}

function TeamMemberCard({ member, i }: TeamMemberCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 * i }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group relative bg-[#0A192F] border border-white/[0.06] rounded-none overflow-hidden h-[480px] transition-all duration-320 hover:border-purple/40 hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.3)] outline-none"
      tabIndex={0}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-purple via-pink to-purple opacity-0 transition-opacity duration-320 group-hover:opacity-100 pointer-events-none z-30" />
      
      {/* Background Image Container */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#112240] to-[#0A192F]">
        <img 
          src={`${import.meta.env.BASE_URL}assets/images/${member.img}`} 
          alt={member.name} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.05]" 
          style={{ 
            objectPosition: member.pos || 'center top',
            filter: 'contrast(1.1) brightness(0.85)'
          }}
          referrerPolicy="no-referrer"
        />
        {/* Tonal Overlays */}
        <div className="absolute inset-0 bg-[#0A192F]/20 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent opacity-90 z-10" />
      </div>
      
      {/* Expandable Info Panel at Bottom */}
      <motion.div 
        initial={false}
        animate={{ 
          height: isHovered ? '280px' : '96px',
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        className="absolute bottom-0 left-0 w-full z-20 bg-[#0A192F] px-6 flex flex-col border-t border-white/10"
      >
        {/* Header - Always Visible */}
        <div className="h-[96px] flex flex-col justify-start pt-7 gap-1">
          <h4 className="text-[1.05rem] font-bold text-white leading-tight tracking-tight uppercase">
            {member.name}
          </h4>
          <p className="text-[0.82rem] text-slate-400 font-semibold leading-relaxed transition-colors duration-300 group-hover:text-pink">
            {member.role}
          </p>
        </div>

        {/* Content - Visible on Hover */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3, delay: isHovered ? 0.1 : 0 }}
          className="flex flex-col gap-3 py-4 border-t border-white/5"
        >
          <p className="text-[0.78rem] text-slate-300 font-medium tracking-wide leading-relaxed">
            {member.tags}
          </p>
          
          <div className="flex flex-col gap-2">
            <p className="text-[0.78rem] leading-relaxed">
              <span className="text-slate-500 font-bold uppercase tracking-wider mr-1.5 text-[0.62rem]">Science:</span>
              <span className="text-slate-300">{member.science}</span>
            </p>
            {member.honours && (
              <p className="text-[0.78rem] leading-relaxed">
                <span className="text-pink font-bold uppercase tracking-wider mr-1.5 text-[0.62rem]">Honours:</span>
                <span className="text-slate-200">{member.honours}</span>
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Team() {
  const { activeSection } = useSection();
  const isActive = activeSection === 'team';

  return (
    <motion.section 
      animate={{ backgroundColor: isActive ? '#F2F2F2' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="py-25" 
      id="team"
    >
      <div className="container">
        <div className="max-w-2xl mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-label"
          >
            TEAM
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title !text-[#0A192F]"
          >
            A multidisciplinary team focused on subsurface insight
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-[1.1rem] text-slate-500 mt-4 leading-relaxed font-medium"
          >
            Available for special studies and consultancy work. Bring us a geoscience challenge — we will help solve it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <TeamMemberCard key={member.name} member={member} i={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

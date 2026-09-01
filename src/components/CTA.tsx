import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useSection } from '../context/SectionContext';

export default function CTA() {
  const { activeSection } = useSection();
  const isActive = activeSection === 'contact';

  return (
    <motion.section 
      animate={{ backgroundColor: isActive ? '#F2F2F2' : '#FFFFFF' }}
      transition={{ duration: 0.5 }}
      className="py-25" 
      id="contact"
    >
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-[#0A192F] border border-white/10 rounded-none overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        >
          <div className="flex-1 p-10 md:p-16 lg:p-20 flex flex-col justify-center">
            <p className="section-label">
              Get Started
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-white tracking-tight leading-tight">
              Is exploring your next project with us a bad idea?
            </h2>
            <p className="text-base md:text-lg text-slate-300 max-w-xl mb-10 leading-relaxed font-medium">
              Discover how much more value your data can deliver with the right expertise. Connect with our team to discuss your specific challenges.
            </p>
            
            <div className="flex flex-col items-start gap-4">
              <a href="mailto:hello@digtech.no" className="btn btn-primary px-8 py-4 rounded-none font-semibold group">
                Connect with our experts
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </a>
              <p className="text-sm text-slate-300">
                Email us at :{' '}
                <a 
                  href="mailto:hello@digtech.no" 
                  className="text-pink font-semibold underline underline-offset-4 hover:text-white transition-colors"
                >
                  hello@digtech.no
                </a>
              </p>
            </div>
          </div>

          <div className="lg:w-2/5 relative min-h-[300px] lg:min-h-full overflow-hidden">
            <img 
              src={`${import.meta.env.BASE_URL}assets/images/Corporate_image.png`} 
              alt="Contact DIG Technology" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

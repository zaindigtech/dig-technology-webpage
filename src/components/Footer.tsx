import { Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-20 bg-[#0A192F]">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <div className="mb-1">
              <img 
                src={`${import.meta.env.BASE_URL}assets/images/Dig-logo-coral-transparent.png`} 
                alt="DIG Technology" 
                className="h-20 w-auto opacity-90"
              />
            </div>
            <p className="text-[0.8rem] text-slate-400 leading-relaxed max-w-xs">
              Delivering world-class subsurface intelligence for the global energy industry. From pioneer exploration to CCS monitoring.
            </p>
          </div>
          
          <div>
            <h4 className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-white mb-7">Solutions</h4>
            <ul className="flex flex-col gap-3.5">
              <li><a href="#solutions" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">AVO Feasibility Modelling</a></li>
              <li><a href="#solutions" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">Seismic Reservoir Prediction</a></li>
              <li><a href="#solutions" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">Density Ratio Inversion</a></li>
              <li><a href="#solutions" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">IRPM Analysis</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-white mb-7">Company</h4>
            <ul className="flex flex-col gap-3.5">
              <li><a href="#about" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">About DIG</a></li>
              <li><a href="#team" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">Team</a></li>
              <li><a href="#trust" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">Clients & Partners</a></li>
              <li><a href="#contact" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-white mb-7">Technology</h4>
            <ul className="flex flex-col gap-3.5">
              <li><a href="#workflow" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">Workflows</a></li>
              <li><a href="#applications" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">Applications</a></li>
              <li><a href="#research" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">Research Library</a></li>
              <li><a href="#news" className="text-[0.8rem] text-slate-400 hover:text-pink transition-colors">News</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between pt-8 border-t border-white/5 gap-8">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col lg:flex-row lg:items-center gap-x-8 gap-y-2">
              <p className="text-[0.7rem] text-slate-500 font-medium whitespace-nowrap">
                © {new Date().getFullYear()} DIG Technology. All rights reserved.
              </p>
              <div className="hidden lg:block w-px h-3 bg-white/10" />
              <p className="text-[0.7rem] text-slate-500 font-medium whitespace-nowrap">
                Org. nr.: 928 687 406
              </p>
              <div className="hidden lg:block w-px h-3 bg-white/10" />
              <p className="text-[0.7rem] text-slate-500 font-medium">
                Address: Frøyas gate 13, 0273 Oslo, Norway
              </p>
            </div>
            <p className="text-[0.65rem] text-slate-600 uppercase tracking-wider">
              Last updated: 10 June 2026
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="https://www.linkedin.com/company/dig-science" target="_blank" rel="noopener" className="w-10 h-10 rounded-none border border-white/5 flex items-center justify-center text-slate-400 hover:border-purple/50 hover:text-white hover:bg-white/5 transition-all">
              <Linkedin size={18} />
            </a>
            <a href="https://www.youtube.com/@DigTechnology" target="_blank" rel="noopener" className="w-10 h-10 rounded-none border border-white/5 flex items-center justify-center text-slate-400 hover:border-purple/50 hover:text-white hover:bg-white/5 transition-all">
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

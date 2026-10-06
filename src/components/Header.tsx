import { FileText, Phone } from 'lucide-react';
import { contactData } from '../data';

export default function Header() {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[540px] px-4 py-3.5 flex items-center justify-between glass-panel border-b border-x border-white/10 backdrop-blur-xl bg-premium-dark/90 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-2.5">
        <div className="relative flex items-center justify-center">
          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-brand-red via-brand-gold to-brand-red-dark shadow-md shadow-brand-red/30">
            <div className="w-full h-full rounded-full overflow-hidden bg-premium-dark border border-premium-dark flex items-center justify-center">
              <img 
                src="https://i.postimg.cc/pVqwn1Z5/logo-minh-thu.jpg" 
                alt="Minh Thu BĐS Hạ Long" 
                referrerPolicy="no-referrer"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-premium-dark animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="text-white font-display font-black tracking-tight text-sm uppercase">
            MINH THU <span className="text-brand-red">BĐS</span>
          </span>
          <span className="text-[9px] text-gray-400 font-mono tracking-widest uppercase font-semibold">Hạ Long</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <a 
          href={`tel:${contactData.phone}`}
          className="p-2 bg-white/5 hover:bg-white/10 text-brand-gold rounded-xl border border-white/10 transition-all flex items-center justify-center cursor-pointer"
          title="Gọi Hotline Minh Thu"
        >
          <Phone className="w-3.5 h-3.5 text-brand-gold" />
        </a>
        <a 
          href="#dang-ky-tu-van"
          className="px-3 py-1.5 bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white text-[12px] font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-[0_2px_12px_rgba(215,25,32,0.25)] cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-white" />
          <span>Nhận Bảng Giá</span>
        </a>
      </div>
    </header>
  );
}


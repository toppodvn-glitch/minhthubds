import { motion } from 'motion/react';
import { UserCheck, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { aboutMinhThu } from '../data';

export default function AboutMinhThu() {
  return (
    <section className="relative w-full py-8 px-4">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <UserCheck className="w-3.5 h-3.5 text-brand-red" />
          HỒ SƠ TƯ VẤN
        </div>
        <h2 className="text-2xl font-sans font-black text-white tracking-tight uppercase">
          Minh Thu là ai?
        </h2>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* Profile Card */}
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="glass-card-red rounded-3xl p-6 sm:p-7 border border-white/10 relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left mb-6 pb-6 border-b border-white/10">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-brand-gold/30 shadow-[0_0_20px_rgba(245,197,66,0.15)] flex-shrink-0 bg-premium-dark">
            <img 
              src="https://i.postimg.cc/pVqwn1Z5/logo-minh-thu.jpg"
              alt="Logo Minh Thu - BĐS Hạ Long" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-brand-gold/15 border border-brand-gold/30 rounded text-[10px] font-mono font-bold text-brand-gold uppercase tracking-wider mb-1">
              {aboutMinhThu.title}
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {aboutMinhThu.name}
            </h3>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed font-sans">
              {aboutMinhThu.bio}
            </p>
          </div>
        </div>

        {/* 3 Core Focus Areas */}
        <div className="space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-brand-gold font-bold text-center sm:text-left mb-2">
            Minh Thu tập trung vào 3 điều:
          </div>

          <div className="grid grid-cols-1 gap-3">
            {aboutMinhThu.focusPoints.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.3 }}
                className="bg-white/5 hover:bg-white/10 border border-white/5 rounded-2xl p-4 transition-all flex items-start gap-3.5 group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-red/15 border border-brand-red/30 flex items-center justify-center font-mono font-bold text-xs text-brand-gold flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

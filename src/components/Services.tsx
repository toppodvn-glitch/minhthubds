import { ComponentType } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Building2, DollarSign, Home, BarChart3, FileText, ShieldCheck } from 'lucide-react';
import { benefitsData } from '../data';

// Map icon string names to actual Lucide Icon components
const iconMap: Record<string, ComponentType<any>> = {
  Building2: Building2,
  DollarSign: DollarSign,
  Home: Home,
  BarChart3: BarChart3,
  FileText: FileText,
  ShieldCheck: ShieldCheck,
};

export default function Services() {
  return (
    <section className="relative w-full py-8 px-4">
      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-red animate-pulse" />
          GIẢI PHÁP TOÀN DIỆN
        </div>
        <h2 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight uppercase max-w-md">
          Tìm BĐS Hạ Long phù hợp với nhu cầu của anh/chị
        </h2>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* SERVICES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {benefitsData.map((benefit, idx) => {
          const IconComponent = iconMap[benefit.iconName] || Home;
          return (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-brand-red/35 transition-all group flex gap-3.5"
            >
              <div className="flex-shrink-0">
                <div className="w-11 h-11 rounded-xl bg-brand-red/10 border border-brand-red/25 group-hover:bg-brand-red/25 group-hover:border-brand-red/50 flex items-center justify-center text-brand-red transition-all">
                  <IconComponent className="w-5 h-5 stroke-[2]" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-gold transition-colors font-sans">
                  {benefit.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


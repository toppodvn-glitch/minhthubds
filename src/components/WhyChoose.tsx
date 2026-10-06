import { motion } from 'motion/react';
import { Award } from 'lucide-react';
import { reasonsData } from '../data';

export default function WhyChoose() {
  return (
    <section className="relative w-full py-8 px-4">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <Award className="w-3.5 h-3.5 text-brand-red" />
          TẬN TÂM ĐỒNG HÀNH
        </div>
        <h2 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight uppercase max-w-md">
          Minh Thu đồng hành cùng khách hàng
        </h2>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* REASONS LIST (01, 02, 03, 04) */}
      <div className="space-y-3.5">
        {reasonsData.map((reason, idx) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: idx * 0.08, duration: 0.35 }}
            className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/8 relative overflow-hidden flex gap-4 hover:border-brand-gold/30 transition-all group"
          >
            {/* Number Counter Badge */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red/15 to-brand-red/5 border border-brand-red/20 flex items-center justify-center font-mono font-bold text-sm text-brand-gold group-hover:from-brand-red/30 group-hover:border-brand-red/50 transition-all shadow-sm">
                0{idx + 1}
              </div>
            </div>

            {/* Reason content */}
            <div className="space-y-1 flex-1">
              {reason.highlightText && (
                <span className="text-[9px] uppercase font-mono font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/10 inline-block mb-1">
                  {reason.highlightText}
                </span>
              )}
              <h3 className="text-xs sm:text-sm font-extrabold text-white font-sans tracking-tight uppercase">
                {reason.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans">
                {reason.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Trust Badge */}
      <div className="mt-7 p-4 bg-gradient-to-tr from-brand-red/15 to-transparent border border-brand-red/20 rounded-2xl text-center">
        <p className="text-xs text-gray-300 font-sans leading-relaxed">
          🤝 <strong className="text-white">Phương châm làm việc của Minh Thu:</strong> “Thông tin rõ ràng – Tư vấn đúng nhu cầu – Đồng hành cùng khách hàng.” Lắng nghe và đặt lợi ích của khách hàng lên hàng đầu trong mỗi giao dịch.
        </p>
      </div>
    </section>
  );
}


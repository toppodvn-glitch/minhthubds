import { motion } from 'motion/react';
import { Phone, MessageCircle, FileText, Send, Sparkles } from 'lucide-react';
import { contactData } from '../data';

export default function Hero() {
  return (
    <section className="relative w-full py-8 md:py-12 px-4 flex flex-col items-center justify-center overflow-hidden">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute -bottom-10 left-0 w-48 h-48 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none animate-pulse-slow-reverse" />

      {/* Elegant Cover Banner Image */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full relative rounded-2xl overflow-hidden mb-0 aspect-[2.4/1] border border-white/10 group shadow-[0_8px_32px_rgba(0,0,0,0.5)] bg-premium-dark/40"
      >
        <img 
          src="https://i.postimg.cc/tTbKFKw4/minh-thu-bds.jpg"
          alt="Minh Thu BĐS Hạ Long"
          referrerPolicy="no-referrer"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-premium-dark/80 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Avatar Container with Glassmorphism Border */}
      <div className="relative z-10 -mt-16 md:-mt-20 mb-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
          className="relative w-32 h-32 md:w-36 md:h-36 rounded-full p-1.5 bg-gradient-to-tr from-brand-red via-brand-gold to-brand-red-dark shadow-[0_0_30px_rgba(215,25,32,0.4)]"
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-premium-dark border-2 border-premium-dark flex items-center justify-center">
            <img 
              id="hero-avatar-image"
              src="https://i.postimg.cc/pVqwn1Z5/logo-minh-thu.jpg" 
              alt="Logo Minh Thu - BĐS Hạ Long" 
              referrerPolicy="no-referrer"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
            />
          </div>
          {/* Active indicator dot */}
          <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-3 border-premium-dark animate-pulse" />
        </motion.div>

        {/* Decorative elements behind avatar */}
        <div className="absolute inset-0 bg-brand-red/10 rounded-full blur-xl -z-10 animate-ping opacity-30" />
      </div>

      {/* Principal Brand and Title */}
      <div className="text-center max-w-lg mb-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block px-3 py-1 bg-brand-red/15 border border-brand-red/30 rounded-full text-brand-gold text-[11px] font-mono font-bold uppercase tracking-wider mb-2"
        >
          Tư vấn & Phân phối Bất Động Sản Hạ Long
        </motion.div>

        <motion.h1 
          id="hero-name-title"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-3xl sm:text-4xl font-display font-black text-white mt-1 uppercase tracking-tight"
        >
          MINH THU
          <span className="block text-xs text-brand-gold mt-1.5 font-sans font-bold tracking-widest uppercase">
            Nhân viên kinh doanh & phân phối BĐS Hạ Long
          </span>
        </motion.h1>

        {/* Projects list highlight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-[11px] text-gray-300 font-medium mt-3 px-2 py-1.5 bg-white/5 border border-white/5 rounded-xl inline-flex flex-wrap items-center justify-center gap-1.5 leading-snug"
        >
          <span className="text-brand-gold font-bold">Sun Centro Town</span>
          <span className="text-gray-600">•</span>
          <span className="text-brand-gold font-bold">Sun Festo Town</span>
          <span className="text-gray-600">•</span>
          <span className="text-brand-gold font-bold">Aria Bay</span>
          <span className="text-gray-600">•</span>
          <span className="text-brand-gold font-bold">Prima Bay</span>
          <span className="text-gray-600">•</span>
          <span className="text-brand-gold font-bold">Imperia Holiday</span>
          <span className="text-gray-600">•</span>
          <span className="text-brand-gold font-bold">The Bay Side</span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-sm font-medium text-gray-300 mt-3 max-w-md mx-auto leading-relaxed"
        >
          Đồng hành cùng khách hàng tìm kiếm sản phẩm phù hợp với <strong className="text-white">nhu cầu</strong> – <strong className="text-white">ngân sách</strong> – <strong className="text-white">mục tiêu sử dụng</strong>.
        </motion.p>
      </div>

      {/* Slogan Container (Glass Box) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="w-full max-w-sm glass-card-red rounded-2xl p-4 mb-7 text-center border border-white/15"
      >
        <blockquote className="text-sm sm:text-base font-serif font-semibold italic text-white leading-relaxed">
          &ldquo;Thông tin rõ ràng – Tư vấn đúng nhu cầu – Đồng hành cùng khách hàng.&rdquo;
        </blockquote>
        <p className="text-[11px] text-gray-400 font-sans mt-2">
          📞 Hotline hỗ trợ trực tiếp: <strong className="text-brand-gold font-mono font-bold">{contactData.phoneDisplay}</strong>
        </p>
      </motion.div>

      {/* Quick Core Call To Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-sm flex flex-col gap-3"
      >
        <a 
          href="#dang-ky-tu-van"
          className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-[0_4px_25px_rgba(215,25,32,0.3)] hover:shadow-[0_4px_30px_rgba(215,25,32,0.65)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer text-sm uppercase tracking-wide"
        >
          <FileText className="w-4 h-4 fill-white" />
          🔴 NHẬN THÔNG TIN DỰ ÁN & BẢNG GIÁ
        </a>

        <div className="grid grid-cols-2 gap-3">
          <a 
            href={contactData.zaloChatUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 hover:bg-green-500 text-white font-semibold py-3 px-3 rounded-xl transition-all text-xs text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            CHAT ZALO
          </a>

          <a 
            href={`tel:${contactData.phone}`}
            className="bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-3 rounded-xl transition-all border border-white/10 text-xs text-center flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-brand-red" />
            {contactData.phoneDisplay}
          </a>
        </div>
      </motion.div>
    </section>
  );
}


import { motion } from 'motion/react';
import { MessageSquare, ArrowUpRight, HelpCircle, MapPin, Phone } from 'lucide-react';
import { contactData } from '../data';

export default function CtaBottom() {
  const bulletInquiries = [
    'Nên chọn căn hộ nghỉ dưỡng view vịnh hay nhà phố thương mại kinh doanh?',
    'Phân tích so sánh chính sách bán hàng và chiết khấu đợt 1 các dự án Hạ Long?',
    'Kế hoạch bài toán dòng tiền và khai thác cho thuê du lịch homestay bền vững?',
    'Lọc quỹ căn đẹp, hướng mát, view vịnh trực diện phù hợp chính xác với ngân sách?'
  ];

  return (
    <section className="relative w-full py-10 px-4">
      {/* Decorative light blob */}
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-brand-red/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main glass card container */}
      <div className="glass-card-red rounded-3xl p-6 sm:p-8 relative border border-white/12 text-center overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-xl pointer-events-none" />
        
        <h3 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight leading-snug uppercase">
          Anh/chị đang quan tâm BĐS Hạ Long?
        </h3>
        
        <p className="text-sm text-brand-gold font-bold mt-2 font-sans">
          Hãy để Minh Thu đồng hành và hỗ trợ phân tích chi tiết:
        </p>

        {/* Customized Question items */}
        <div className="text-left py-6 max-w-md mx-auto space-y-3">
          {bulletInquiries.map((inq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-start gap-2.5 text-xs text-gray-300"
            >
              <span className="w-5 h-5 rounded-full bg-brand-red/20 border border-brand-red/40 flex items-center justify-center text-brand-gold font-bold mt-0.5 flex-shrink-0 text-[11px]">
                ?
              </span>
              <span className="leading-relaxed">{inq}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <a
            href="#dang-ky-tu-van"
            className="w-full inline-flex bg-brand-red hover:bg-brand-red/90 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-[0_4px_25px_rgba(215,25,32,0.4)] hover:shadow-[0_4px_30px_rgba(215,25,32,0.7)] hover:-translate-y-0.5 items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wide"
          >
            <MessageSquare className="w-4 h-4 text-white fill-white animate-bounce" />
            ĐỂ LẠI NHU CẦU – NHẬN TƯ VẤN NGAY
            <ArrowUpRight className="w-4 h-4 text-white" />
          </a>
        </div>
      </div>

      {/* FOOTER METRICS & CREDITS */}
      <footer className="mt-12 pt-6 border-t border-white/5 text-center space-y-3">
        <div className="flex flex-col items-center justify-center gap-1.5 text-xs text-gray-400">
          <p className="flex items-center gap-1 text-[11px]">
            <MapPin className="w-3 h-3 text-brand-red flex-shrink-0" />
            <span>Khu vực tư vấn: <strong>TP. Hạ Long, Quảng Ninh</strong></span>
          </p>
          <p className="flex items-center gap-1 text-[11px] text-gray-400">
            <Phone className="w-3 h-3 text-brand-gold flex-shrink-0" />
            <span>Hotline / Zalo: <a href={`tel:${contactData.phone}`} className="text-brand-gold font-mono font-bold hover:underline">{contactData.phoneDisplay}</a></span>
          </p>
        </div>

        <p className="text-[10px] text-gray-500 font-mono tracking-wider">
          © {new Date().getFullYear()} MINH THU BĐS HẠ LONG • THÔNG TIN RÕ RÀNG – TƯ VẤN ĐÚNG NHU CẦU
        </p>
      </footer>
    </section>
  );
}


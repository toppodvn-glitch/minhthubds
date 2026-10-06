import { motion } from 'motion/react';
import { Phone, MessageCircle, Link2, Sparkles } from 'lucide-react';
import { contactData } from '../data';

export default function Contact() {
  const contactButtons = [
    {
      id: 'c1',
      title: 'Gọi Minh Thu trực tiếp',
      description: 'Hỗ trợ tư vấn thông tin & chính sách 24/7',
      label: contactData.phoneDisplay,
      href: `tel:${contactData.phone}`,
      icon: Phone,
      colorClass: 'bg-brand-red border-brand-red text-white hover:bg-brand-red-dark hover:scale-[1.01]',
      isExternal: false
    },
    {
      id: 'c2',
      title: 'Nhắn Zalo Minh Thu',
      description: 'Nhận trọn bộ bảng giá, quỹ căn & tài liệu PDF',
      label: 'Chat Zalo Minh Thu ngay',
      href: contactData.zaloChatUrl,
      icon: MessageCircle,
      colorClass: 'bg-green-600 border-green-600/30 text-white hover:bg-green-500 hover:scale-[1.01]',
      isExternal: true
    }
  ];

  return (
    <section className="relative w-full py-8 px-4" id="lien-he">
      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <Link2 className="w-3.5 h-3.5 text-brand-red" />
          KÊNH KẾT NỐI TRỰC TIẾP
        </div>
        <h2 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight uppercase">
          Minh Thu BĐS Hạ Long
        </h2>
        <p className="text-xs text-brand-gold font-mono font-bold mt-1">
          {contactData.role}
        </p>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* CALL TO ACTION BUTTONS GRID */}
      <div className="grid grid-cols-1 gap-3.5">
        {contactButtons.map((btn, idx) => {
          const IconComp = btn.icon;
          return (
            <motion.a
              key={btn.id}
              href={btn.href}
              target={btn.isExternal ? '_blank' : undefined}
              rel={btn.isExternal ? 'noreferrer' : undefined}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              className={`w-full px-5 py-4 rounded-2xl flex items-center justify-between border-2 transition-all cursor-pointer shadow-lg hover:shadow-2xl ${btn.colorClass}`}
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                  <IconComp className="w-5 h-5 fill-none" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white opacity-90">
                    {btn.title}
                  </h3>
                  <p className="text-xs text-white/70">
                    {btn.description}
                  </p>
                  <p className="text-sm font-black font-sans tracking-wide mt-0.5">
                    {btn.label}
                  </p>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white font-bold">
                →
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Distributed Projects Summary Badge */}
      <div className="mt-5 p-3.5 bg-white/5 border border-white/10 rounded-2xl text-center">
        <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
          <strong className="text-brand-gold font-bold">Dự án phân phối:</strong> {contactData.projectsSummary}
        </p>
      </div>
    </section>
  );
}


import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, MessageCircle, Phone, X } from 'lucide-react';
import { contactData } from '../data';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName?: string;
  clientPhone?: string;
  selectedProjects?: string[];
}

export default function SuccessModal({
  isOpen,
  onClose,
  clientName,
  clientPhone,
  selectedProjects = []
}: SuccessModalProps) {
  if (!isOpen) return null;

  const projectString = selectedProjects.length > 0 ? selectedProjects.join(', ') : 'BĐS Hạ Long';
  const customZaloMessage = `Xin chào Minh Thu! Tôi là ${clientName || 'Khách hàng'}${clientPhone ? ` (${clientPhone})` : ''}. Tôi vừa để lại nhu cầu tìm hiểu ${projectString} trên website. Mong Minh Thu tư vấn và gửi thông tin chi tiết qua Zalo giúp tôi nhé!`;
  const zaloUrl = `https://zalo.me/${contactData.phone}?text=${encodeURIComponent(customZaloMessage)}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="relative w-full max-w-[420px] glass-card-ocean rounded-3xl p-4 sm:p-5 border border-white/15 bg-[#0A1322] shadow-2xl z-10 overflow-hidden text-center"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Celebration Icon */}
          <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
          </div>

          {/* User Requested Header Text */}
          <h3 className="text-base sm:text-lg font-display font-black text-white uppercase tracking-tight leading-snug">
            🎉 MINH THU ĐÃ NHẬN ĐƯỢC NHU CẦU CỦA ANH/CHỊ
          </h3>

          {clientName && (
            <p className="text-xs text-brand-gold font-semibold mt-1">
              Cảm ơn anh/chị <strong>{clientName}</strong> đã tin tưởng kết nối!
            </p>
          )}

          {/* Checklist of what Minh Thu will provide */}
          <div className="my-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2">
            <p className="text-[11px] font-bold text-white font-sans uppercase tracking-wider text-center sm:text-left mb-1.5">
              Minh Thu sẽ hỗ trợ:
            </p>
            <div className="flex items-start gap-2 text-xs text-gray-200">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Thông tin dự án anh/chị quan tâm</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-200">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Sản phẩm phù hợp với ngân sách</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-200">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Chính sách bán hàng đang áp dụng</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-200">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>So sánh các phương án nếu anh/chị đang phân vân</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2">
            <a
              href={zaloUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#0068FF] hover:bg-[#0055D4] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg cursor-pointer uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>💬 NHẮN ZALO CHO MINH THU NGAY</span>
            </a>

            <a
              href={`tel:${contactData.phone}`}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-brand-gold" />
              <span>📞 {contactData.phoneDisplay}</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-white pt-1 transition-colors cursor-pointer"
            >
              Đóng cửa sổ
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

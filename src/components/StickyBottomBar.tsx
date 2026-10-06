import { Phone, MessageCircle, FileText } from 'lucide-react';
import { contactData } from '../data';

export default function StickyBottomBar() {
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-[540px] px-3 pb-4 pt-2.5 bg-premium-dark/95 backdrop-blur-xl border-t border-x border-white/10 flex gap-2 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] rounded-t-2xl">
      {/* 1. Call Hotline Button */}
      <a
        href={`tel:${contactData.phone}`}
        className="flex-1 py-2.5 px-2 rounded-xl bg-white text-[#0B0B0F] font-bold text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 hover:bg-white/90 active:scale-95 transition-all cursor-pointer shadow-md text-center"
      >
        <Phone className="w-3.5 h-3.5 fill-[#0B0B0F]" />
        <span className="leading-tight">GỌI MINH THU</span>
      </a>

      {/* 2. Zalo Chat Button */}
      <a
        href={contactData.zaloChatUrl}
        target="_blank"
        rel="noreferrer"
        className="flex-1 py-2.5 px-2 rounded-xl bg-green-600 text-white font-bold text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 hover:bg-green-500 active:scale-95 transition-all cursor-pointer shadow-md shadow-green-600/25 text-center"
      >
        <MessageCircle className="w-3.5 h-3.5 fill-white animate-bounce" />
        <span className="leading-tight">CHAT ZALO</span>
      </a>

      {/* 3. Get Price Sheet Button (Scrolls to form) */}
      <a
        href="#dang-ky-tu-van"
        className="flex-1 py-2.5 px-2 rounded-xl bg-brand-red text-white font-bold text-[11px] sm:text-xs flex flex-col sm:flex-row items-center justify-center gap-1 hover:bg-brand-red/90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-brand-red/30 relative overflow-hidden text-center"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full animate-pulse" />
        <FileText className="w-3.5 h-3.5 fill-white" />
        <span className="leading-tight">NHẬN BẢNG GIÁ</span>
      </a>
    </div>
  );
}


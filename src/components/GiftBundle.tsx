import { useState, FormEvent } from 'react';
import { Gift, Send, AlertCircle } from 'lucide-react';
import { projectOptionsList, purposesList, budgetRangesList, giftBundleItems } from '../data';

interface GiftBundleProps {
  onSuccess: (data: { clientName: string; clientPhone: string; selectedProjects: string[] }) => void;
}

export default function GiftBundle({ onSuccess }: GiftBundleProps) {
  const [selectedProject, setSelectedProject] = useState('Sun Centro Town');
  const [selectedPurpose, setSelectedPurpose] = useState('Nghỉ dưỡng');
  const [selectedBudget, setSelectedBudget] = useState('3–5 tỷ');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      setFormError('Vui lòng nhập họ và tên của anh/chị.');
      return;
    }

    const cleanPhone = clientPhone.replace(/[\s.-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setFormError('Vui lòng nhập số điện thoại hợp lệ để Minh Thu gửi tài liệu.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientPhone: cleanPhone,
          selectedProjects: [selectedProject],
          purpose: selectedPurpose,
          budget: selectedBudget,
          formType: 'GIFT_BUNDLE'
        })
      });
    } catch (err) {
      console.warn('Network issue sending gift bundle lead:', err);
    } finally {
      setIsSubmitting(false);
      onSuccess({
        clientName: clientName.trim(),
        clientPhone: cleanPhone,
        selectedProjects: [selectedProject]
      });
      setClientName('');
      setClientPhone('');
    }
  };

  return (
    <section className="relative w-full py-4 px-1">
      <div className="w-full glass-card-gold rounded-3xl p-4 sm:p-5 border border-brand-gold/30 bg-[#0A1322] shadow-2xl relative overflow-hidden space-y-4">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

        {/* Gift Offer Description */}
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[10px] font-mono font-bold uppercase tracking-wider">
            <Gift className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
            <span>ĐẶC QUYỀN MIỄN PHÍ</span>
          </div>

          <h3 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight leading-snug">
            🎁 NHẬN &ldquo;BỘ THÔNG TIN BĐS HẠ LONG&rdquo; TỪ MINH THU
          </h3>

          <p className="text-xs text-gray-300">
            Anh/chị sẽ nhận được trọn gói thông tin chuyên sâu theo nhu cầu riêng biệt:
          </p>

          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {giftBundleItems.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-200">
                <span className="text-brand-gold font-bold">📌</span>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-1.5 text-[10px] text-gray-400 border-t border-white/10 font-sans">
            * Toàn bộ tài liệu gốc và bảng giá được cập nhật mới nhất từ chủ đầu tư.
          </div>
        </div>

        {/* Quick Intake Form */}
        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-white/15 bg-[#050B14]/85">
          <h4 className="text-xs font-bold text-brand-gold uppercase tracking-wider text-center mb-3">
            Đăng Ký Nhận Bộ Tài Liệu Ngay
          </h4>

          <form onSubmit={handleSubmit} className="space-y-2.5">
            {formError && (
              <div className="p-2 bg-red-500/15 border border-red-500/30 rounded-xl text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Select Project */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Anh/chị đang quan tâm:
              </label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none transition-colors cursor-pointer"
              >
                {projectOptionsList.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Purpose */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Chọn nhu cầu:
              </label>
              <select
                value={selectedPurpose}
                onChange={(e) => setSelectedPurpose(e.target.value)}
                className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none transition-colors cursor-pointer"
              >
                {purposesList.map((purp) => (
                  <option key={purp} value={purp}>
                    {purp}
                  </option>
                ))}
              </select>
            </div>

            {/* Select Budget */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Chọn ngân sách:
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none transition-colors cursor-pointer"
              >
                {budgetRangesList.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Name */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Họ tên: *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Anh Dũng / Chị Hương"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (formError) setFormError('');
                }}
                className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none transition-colors"
              />
            </div>

            {/* Customer Phone */}
            <div>
              <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Số điện thoại Zalo: *
              </label>
              <input
                type="tel"
                required
                placeholder="Nhập số điện thoại để nhận tài liệu"
                value={clientPhone}
                onChange={(e) => {
                  setClientPhone(e.target.value);
                  if (formError) setFormError('');
                }}
                className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none transition-colors font-mono"
              />
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-red via-brand-red to-brand-red-dark hover:brightness-110 active:scale-98 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 fill-white" />
                  <span>🔴 NHẬN THÔNG TIN TỪ MINH THU</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

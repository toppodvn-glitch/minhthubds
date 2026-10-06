import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Flame, Check, Send, AlertCircle, ShieldCheck } from 'lucide-react';
import { projectOptionsList, purposesList, budgetRangesList, contactData } from '../data';

interface LeadQuestionnaireProps {
  onSuccess: (data: { clientName: string; clientPhone: string; selectedProjects: string[] }) => void;
  initialProject?: string;
}

export default function LeadQuestionnaire({ onSuccess, initialProject }: LeadQuestionnaireProps) {
  const [selectedProjects, setSelectedProjects] = useState<string[]>(
    initialProject ? [initialProject] : ['Sun Centro Town']
  );
  const [selectedPurpose, setSelectedPurpose] = useState<string>('Nghỉ dưỡng');
  const [selectedBudget, setSelectedBudget] = useState<string>('3–5 tỷ');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleProject = (proj: string) => {
    if (proj === 'Chưa biết – cần Minh Thu tư vấn') {
      setSelectedProjects(['Chưa biết – cần Minh Thu tư vấn']);
      return;
    }

    const filtered = selectedProjects.filter(p => p !== 'Chưa biết – cần Minh Thu tư vấn');
    if (filtered.includes(proj)) {
      const remaining = filtered.filter(p => p !== proj);
      setSelectedProjects(remaining.length > 0 ? remaining : ['Chưa biết – cần Minh Thu tư vấn']);
    } else {
      setSelectedProjects([...filtered, proj]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      setFormError('Vui lòng nhập họ và tên của anh/chị.');
      return;
    }

    // Basic VN phone check: 9-11 digits
    const cleanPhone = clientPhone.replace(/[\s.-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setFormError('Vui lòng nhập số điện thoại hợp lệ (9-11 chữ số) để Minh Thu tiện liên hệ.');
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
          selectedProjects,
          purpose: selectedPurpose,
          budget: selectedBudget,
          notes: notes.trim(),
          formType: 'LEAD_QUESTIONNAIRE'
        })
      });
    } catch (err) {
      console.warn('Network issue sending lead, continuing gracefully:', err);
    } finally {
      setIsSubmitting(false);
      onSuccess({
        clientName: clientName.trim(),
        clientPhone: cleanPhone,
        selectedProjects
      });
      // Reset form
      setClientName('');
      setClientPhone('');
      setNotes('');
    }
  };

  return (
    <section id="register" className="relative w-full py-4 px-1">
      <div className="w-full glass-card-ocean rounded-3xl p-4 sm:p-5 border border-white/15 bg-[#0A1322] shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-brand-red/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-brand-gold/15 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red/20 border border-brand-red/40 text-brand-red text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-brand-red animate-pulse" />
            <span>NHẬN THÔNG TIN BĐS HẠ LONG</span>
          </div>
          <h2 className="text-lg sm:text-xl font-display font-black text-white uppercase tracking-tight">
            ĐỂ LẠI NHU CẦU – MINH THU TƯ VẤN RIÊNG
          </h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-brand-red via-brand-gold to-brand-cyan rounded-full mx-auto my-2" />
          <p className="text-xs text-gray-300 leading-relaxed font-sans">
            Minh Thu sẽ trực tiếp gửi bảng giá chi tiết, quỹ căn đẹp và phân tích dòng tiền phương án phù hợp nhất.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-2.5 bg-red-500/15 border border-red-500/40 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* 1. Projects Selection */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-brand-gold uppercase tracking-wider">
              1. Anh/chị đang quan tâm dự án nào? <span className="text-gray-400 font-normal lowercase">(chọn 1 hoặc nhiều)</span>
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {projectOptionsList.map((proj) => {
                const isSelected = selectedProjects.includes(proj);
                return (
                  <button
                    key={proj}
                    type="button"
                    onClick={() => toggleProject(proj)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all border flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-brand-blue/25 border-brand-cyan text-white shadow-[0_0_12px_rgba(6,182,212,0.2)] font-bold'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2">{proj}</span>
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-brand-cyan border-brand-cyan text-[#070F1B]'
                          : 'border-white/30 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Purpose of buying */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-brand-gold uppercase tracking-wider">
              2. Mục đích mua:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {purposesList.map((purp) => {
                const isSelected = selectedPurpose === purp;
                return (
                  <button
                    key={purp}
                    type="button"
                    onClick={() => setSelectedPurpose(purp)}
                    className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-brand-red/25 border-brand-red text-white shadow-sm font-bold'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {purp}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Budget range */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-brand-gold uppercase tracking-wider">
              3. Khoảng ngân sách dự kiến:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {budgetRangesList.map((budg) => {
                const isSelected = selectedBudget === budg;
                return (
                  <button
                    key={budg}
                    type="button"
                    onClick={() => setSelectedBudget(budg)}
                    className={`py-2 px-2.5 rounded-xl text-xs font-semibold text-center transition-all border cursor-pointer truncate ${
                      isSelected
                        ? 'bg-brand-gold/25 border-brand-gold text-brand-gold-light font-bold shadow-sm'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {budg}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Customer Contact Details */}
          <div className="space-y-2.5 pt-2 border-t border-white/10">
            <div>
              <label className="block text-[10.5px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Họ và tên *
              </label>
              <input
                type="text"
                required
                placeholder="Ví dụ: Nguyễn Văn An"
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  if (formError) setFormError('');
                }}
                className="w-full bg-[#050B14] border border-white/15 focus:border-brand-cyan text-white text-xs rounded-xl p-3 outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-[10.5px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                Số điện thoại (Zalo) *
              </label>
              <input
                type="tel"
                required
                placeholder="Ví dụ: 0987 xxx xxx"
                value={clientPhone}
                onChange={(e) => {
                  setClientPhone(e.target.value);
                  if (formError) setFormError('');
                }}
                className="w-full bg-[#050B14] border border-white/15 focus:border-brand-cyan text-white text-xs rounded-xl p-3 outline-none transition-colors font-mono"
              />
            </div>

            <div>
              <label className="block text-[10.5px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Nhu cầu cụ thể (Tùy chọn)
              </label>
              <textarea
                rows={2}
                placeholder="Ví dụ: Căn 2 ngủ view vịnh, hỗ trợ vay 70%, nhận nhà năm 2026..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-[#050B14] border border-white/15 focus:border-brand-cyan text-white text-xs rounded-xl p-2.5 outline-none transition-colors resize-none"
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 text-[10.5px] text-gray-300 leading-relaxed flex items-start gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-white">Cam kết từ Minh Thu:</strong> Bảo mật thông tin tuyệt đối, không làm phiền, hỗ trợ tư vấn trung thực và khách quan nhất.
            </span>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-red via-brand-red to-brand-red-dark hover:brightness-110 active:scale-98 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_22px_rgba(225,29,72,0.4)] transition-all cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Đang xử lý thông tin...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5 fill-white" />
                <span>🔴 NHẬN TƯ VẤN NGAY</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

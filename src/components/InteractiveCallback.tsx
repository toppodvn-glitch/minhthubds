import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Phone, MessageCircle, Gift, Flame, Calculator, Sparkles, Check, ArrowRight } from 'lucide-react';
import { contactData } from '../data';

const PROJECT_OPTIONS = [
  'Sun Centro Town',
  'Sun Festo Town',
  'Aria Bay Hạ Long',
  'Prima Bay Hạ Long',
  'Imperia Holiday Hạ Long',
  'The Bay Side',
  'Chưa biết – cần Minh Thu tư vấn'
];

const PURPOSE_OPTIONS = [
  'Ở',
  'Nghỉ dưỡng',
  'Đầu tư',
  'Khai thác cho thuê',
  'Tìm hiểu trước'
];

const BUDGET_OPTIONS = [
  'Dưới 3 tỷ',
  '3–5 tỷ',
  '5–10 tỷ',
  'Trên 10 tỷ',
  'Chưa xác định'
];

export default function InteractiveCallback() {
  const [selectedProjects, setSelectedProjects] = useState<string[]>(['Sun Centro Town']);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('Đầu tư');
  const [selectedBudget, setSelectedBudget] = useState<string>('3–5 tỷ');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [loanAmountEst, setLoanAmountEst] = useState(2500); // triệu VND
  const [loanTermEst, setLoanTermEst] = useState(25); // năm
  const [sendFeedback, setSendFeedback] = useState<{ type: 'success' | 'warn' | 'error', message: string } | null>(null);

  const toggleProject = (proj: string) => {
    if (proj === 'Chưa biết – cần Minh Thu tư vấn') {
      setSelectedProjects(['Chưa biết – cần Minh Thu tư vấn']);
      return;
    }
    
    let updated = selectedProjects.filter(p => p !== 'Chưa biết – cần Minh Thu tư vấn');
    if (updated.includes(proj)) {
      updated = updated.filter(p => p !== proj);
      if (updated.length === 0) {
        updated = ['Chưa biết – cần Minh Thu tư vấn'];
      }
    } else {
      updated.push(proj);
    }
    setSelectedProjects(updated);
  };

  // Financial estimation
  const monthlyRate = 0.10 / 12;
  const totalMonths = loanTermEst * 12;
  const monthlyPaymentTotal = totalMonths > 0 
    ? (loanAmountEst * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      setFormError('Vui lòng nhập đầy đủ Họ và tên và Số điện thoại.');
      return;
    }
    
    setIsSending(true);
    setSendFeedback(null);
    setFormError('');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientPhone: clientPhone.trim(),
          project: selectedProjects.join(', '),
          purpose: selectedPurpose,
          budgetStr: selectedBudget,
          budget: showCalculator ? loanAmountEst * 1.4 : 4000,
          equityNeeded: showCalculator ? (loanAmountEst * 1.4) * 0.3 : 1200,
          loanAmount: loanAmountEst,
          loanTerm: loanTermEst,
          monthlyPayment: monthlyPaymentTotal,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSendFeedback({
          type: 'success',
          message: 'Thông tin đã được gửi thành công đến hệ thống của Minh Thu!'
        });
      } else {
        if (data.errorCode === "SMTP_NOT_CONFIGURED") {
          setSendFeedback({
            type: 'warn',
            message: 'Đã ghi nhận nhu cầu của anh/chị. Anh/chị có thể bấm gửi ngay qua Zalo bên dưới để Minh Thu hỗ trợ lập tức!'
          });
        } else {
          setSendFeedback({
            type: 'warn',
            message: 'Nhu cầu đã ghi nhận! Vui lòng nhấn nút Zalo để Minh Thu gửi tài liệu ngay.'
          });
        }
      }
    } catch (err: any) {
      console.error("Fetch SMTP failed:", err);
      setSendFeedback({
        type: 'warn',
        message: 'Nhu cầu đã lưu. Anh/chị hãy bấm nút Zalo phía dưới để nhận tài liệu nhanh nhất!'
      });
    } finally {
      setIsSending(false);
      setIsSubmitted(true);
    }
  };

  const getZaloPrefilledUrl = () => {
    const textMessage = `Xin chào Minh Thu! Tôi là ${clientName || 'Khách hàng'} (${clientPhone}). Tôi vừa để lại nhu cầu BĐS Hạ Long trên website:
- Dự án quan tâm: ${selectedProjects.join(', ')}
- Mục đích mua: ${selectedPurpose}
- Khoảng ngân sách: ${selectedBudget}
Minh Thu gửi giúp tôi "Bộ thông tin BĐS Hạ Long" gồm bảng giá, quỹ căn và chính sách chiết khấu mới nhất nhé!`;
    
    return `https://zalo.me/${contactData.phone}?text=${encodeURIComponent(textMessage)}`;
  };

  return (
    <div id="dang-ky-tu-van" className="w-full relative py-6">
      <div className="absolute inset-0 bg-brand-red/5 rounded-3xl blur-2xl pointer-events-none" />
      
      <div className="glass-card-red rounded-3xl p-5 sm:p-7 relative border border-white/10 overflow-hidden shadow-2xl">
        {/* Background glow effects */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-brand-red/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-brand-gold/5 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-red/20 border border-brand-red/30 rounded-full text-brand-gold text-[10px] font-mono font-bold uppercase tracking-wider mb-2.5">
            <Flame className="w-3.5 h-3.5 text-brand-red fill-brand-red animate-pulse" />
            NHẬN THÔNG TIN BĐS HẠ LONG
          </div>
          <h3 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight uppercase leading-snug">
            Để lại nhu cầu – Minh Thu tư vấn riêng
          </h3>
          <p className="text-xs text-gray-300 mt-2 max-w-md">
            Minh Thu cam kết cung cấp thông tin minh bạch, cập nhật chính sách mới nhất từ chủ đầu tư.
          </p>
        </div>

        {/* Gift Information Box */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-brand-gold/10 via-brand-red/10 to-transparent border border-brand-gold/25">
          <div className="flex items-center gap-2 text-brand-gold font-bold text-xs uppercase tracking-wide mb-2 font-sans">
            <Gift className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <span>Nhận “Bộ thông tin BĐS Hạ Long” từ Minh Thu</span>
          </div>
          <p className="text-[11px] text-gray-300 mb-2">
            Anh/chị sẽ nhận được thông tin cá nhân hóa theo đúng nhu cầu:
          </p>
          <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-300">
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold">📌</span> Danh sách dự án quan tâm
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold">📌</span> Thông tin sản phẩm chi tiết
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold">📌</span> Khoảng tài chính tham khảo
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold">📌</span> Chính sách bán hàng hiện hành
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold">📌</span> So sánh các lựa chọn phù hợp
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-brand-gold">📌</span> Tư vấn riêng 1-1 từ Minh Thu
            </div>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {formError && (
              <div className="p-3 bg-red-500/15 border border-red-500/30 text-red-300 text-xs rounded-xl text-center">
                ⚠️ {formError}
              </div>
            )}

            {/* 1. Projects Selection */}
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                1. Anh/chị đang quan tâm dự án nào?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PROJECT_OPTIONS.map((proj) => {
                  const isChecked = selectedProjects.includes(proj);
                  return (
                    <button
                      key={proj}
                      type="button"
                      onClick={() => toggleProject(proj)}
                      className={`p-3 rounded-xl text-xs font-semibold border transition-all text-left flex items-center justify-between cursor-pointer ${
                        isChecked
                          ? 'bg-brand-red/20 border-brand-red text-white shadow-[0_0_15px_rgba(215,25,32,0.2)]'
                          : 'bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 ${
                          isChecked ? 'bg-brand-red border-brand-red text-white' : 'border-gray-500 bg-transparent'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <span className={isChecked ? 'text-brand-gold font-bold' : ''}>{proj}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Purpose Selection */}
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                2. Mục đích mua:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PURPOSE_OPTIONS.map((purpose) => {
                  const isSelected = selectedPurpose === purpose;
                  return (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => setSelectedPurpose(purpose)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-brand-gold/15 border-brand-gold text-brand-gold font-bold shadow-[0_0_12px_rgba(245,197,66,0.15)]'
                          : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {purpose}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Budget Selection */}
            <div>
              <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                3. Khoảng ngân sách dự kiến:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BUDGET_OPTIONS.map((bg) => {
                  const isSelected = selectedBudget === bg;
                  return (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setSelectedBudget(bg)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
                        isSelected
                          ? 'bg-brand-red/20 border-brand-red text-white font-bold shadow-[0_0_12px_rgba(215,25,32,0.15)]'
                          : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {bg}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Cash Flow Estimator Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowCalculator(!showCalculator)}
                className="w-full py-2.5 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[11px] text-gray-300 font-medium flex items-center justify-between cursor-pointer transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Calculator className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{showCalculator ? 'Ẩn công cụ tính dòng tiền trả góp' : 'Bật ước tính dòng tiền trả góp ngân hàng (Tùy chọn)'}</span>
                </span>
                <span className="text-brand-gold font-bold text-xs">{showCalculator ? '▲' : '▼'}</span>
              </button>

              {showCalculator && (
                <div className="mt-3 p-4 bg-premium-dark/80 rounded-2xl border border-white/10 space-y-3">
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-gray-400">Số tiền vay ngân hàng dự kiến:</span>
                      <span className="text-brand-gold font-mono font-bold">{(loanAmountEst / 1000).toFixed(1)} Tỷ VNĐ</span>
                    </div>
                    <input
                      type="range"
                      min="500"
                      max="10000"
                      step="100"
                      value={loanAmountEst}
                      onChange={(e) => setLoanAmountEst(Number(e.target.value))}
                      className="w-full accent-brand-red bg-white/10 rounded-lg appearance-none h-1.5 cursor-pointer"
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1 border-t border-white/5">
                    <span className="text-gray-400">Thời hạn vay:</span>
                    <select
                      value={loanTermEst}
                      onChange={(e) => setLoanTermEst(Number(e.target.value))}
                      className="bg-black/50 border border-white/15 text-white rounded-lg px-2 py-1 text-xs outline-none"
                    >
                      <option value={10}>10 Năm</option>
                      <option value={15}>15 Năm</option>
                      <option value={20}>20 Năm</option>
                      <option value={25}>25 Năm</option>
                      <option value={35}>35 Năm</option>
                    </select>
                  </div>

                  <div className="p-2.5 bg-brand-gold/10 rounded-xl flex justify-between items-center text-xs">
                    <span className="text-gray-300">Gốc + Lãi ước tính:</span>
                    <span className="text-brand-gold font-mono font-bold text-sm">~{monthlyPaymentTotal.toFixed(0)} Tr/tháng</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Client Contact Inputs */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                4. Thông tin để Minh Thu liên hệ tư vấn:
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Họ và tên *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nhập họ tên anh/chị"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full bg-premium-dark border border-white/10 focus:border-brand-red text-white text-xs rounded-xl p-3.5 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Số điện thoại (Zalo) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại"
                  value={clientPhone}
                  onChange={(e) => {
                    setClientPhone(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full bg-premium-dark border border-white/10 focus:border-brand-red text-white text-xs rounded-xl p-3.5 outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSending}
              className="w-full bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-[0_4px_25px_rgba(215,25,32,0.35)] hover:shadow-[0_4px_30px_rgba(215,25,32,0.65)] hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer text-sm uppercase tracking-wide disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Đang ghi nhận nhu cầu...
                </>
              ) : (
                <>
                  <Flame className="w-4 h-4 fill-white" />
                  🔴 NHẬN TƯ VẤN NGAY
                </>
              )}
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              🔒 Minh Thu cam kết bảo mật 100% số điện thoại và thông tin cá nhân.
            </p>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 space-y-5"
          >
            <div className="w-16 h-16 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-green-400 shadow-[0_0_20px_rgba(74,222,128,0.2)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-brand-gold uppercase tracking-wider font-bold">XÁC NHẬN THÀNH CÔNG</span>
              <h4 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                🎉 MINH THU ĐÃ NHẬN ĐƯỢC NHU CẦU CỦA ANH/CHỊ
              </h4>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl text-left border border-white/10 space-y-2 text-xs">
              <p className="text-brand-gold font-bold text-xs uppercase mb-2">
                Minh Thu sẽ hỗ trợ:
              </p>
              <div className="space-y-1.5 text-gray-200">
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Thông tin dự án anh/chị quan tâm: <strong className="text-white">{selectedProjects.join(', ')}</strong></span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Sản phẩm phù hợp với ngân sách (<strong className="text-white">{selectedBudget}</strong>, mục đích: <strong className="text-white">{selectedPurpose}</strong>)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Chính sách bán hàng đang áp dụng từ chủ đầu tư</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>So sánh các phương án nếu anh/chị đang phân vân</span>
                </div>
              </div>
            </div>

            {sendFeedback && (
              <div className={`p-3 rounded-xl text-xs text-left border ${
                sendFeedback.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                {sendFeedback.message}
              </div>
            )}

            <div className="flex flex-col gap-3 pt-2">
              <a
                href={getZaloPrefilledUrl()}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(74,222,128,0.25)] flex items-center justify-center gap-2 text-xs uppercase cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                💬 NHẮN ZALO CHO MINH THU NGAY
              </a>

              <a
                href={`tel:${contactData.phone}`}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-6 rounded-xl transition-all border border-white/10 flex items-center justify-center gap-2 text-xs cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-brand-red" />
                📞 GỌI TRỰC TIẾP: {contactData.phoneDisplay}
              </a>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setClientName('');
                  setClientPhone('');
                  setFormError('');
                }}
                className="text-xs text-gray-500 hover:text-gray-300 underline pt-2 cursor-pointer"
              >
                Gửi thêm một yêu cầu tư vấn khác
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

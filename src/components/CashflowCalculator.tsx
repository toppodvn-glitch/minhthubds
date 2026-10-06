import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ArrowRight, CheckCircle2, TrendingUp, DollarSign, Percent, Send, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import { projectsData, contactData } from '../data';

interface CashflowCalculatorProps {
  initialProject?: string;
  onSuccess: (data: { clientName: string; clientPhone: string; selectedProjects: string[] }) => void;
}

export default function CashflowCalculator({ initialProject, onSuccess }: CashflowCalculatorProps) {
  const [selectedProjectName, setSelectedProjectName] = useState(
    initialProject || 'Sun Centro Town'
  );

  // Sync if initialProject changes from outside
  useEffect(() => {
    if (initialProject) {
      setSelectedProjectName(initialProject);
    }
  }, [initialProject]);

  const activeProj = projectsData.find(p => p.name === selectedProjectName) || projectsData[0];

  const [budget, setBudget] = useState(3500); // triệu VND
  const [downPaymentPct, setDownPaymentPct] = useState(20); // %
  const [loanTerm, setLoanTerm] = useState(25); // năm
  const [expectedRent, setExpectedRent] = useState(22); // triệu VND / tháng

  // Update budget when project changes
  useEffect(() => {
    const avg = Math.round((activeProj.priceRangeMin + activeProj.priceRangeMax) / 2);
    setBudget(avg);

    // Default expected rent benchmark based on property type
    if (activeProj.id === 'sun-festo-town') {
      setExpectedRent(55);
    } else if (activeProj.id === 'the-bay-side') {
      setExpectedRent(28);
    } else if (activeProj.id === 'aria-bay-ha-long') {
      setExpectedRent(30);
    } else {
      setExpectedRent(20);
    }
  }, [selectedProjectName]);

  const [step, setStep] = useState(1);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial Math
  const equityNeeded = (budget * downPaymentPct) / 100;
  const loanAmount = budget - equityNeeded;
  const annualInterestRate = 0.095; // 9.5% after grace period
  const monthlyRate = annualInterestRate / 12;
  const totalMonths = loanTerm * 12;

  // Monthly mortgage payment
  const monthlyMortgage = totalMonths > 0 && loanAmount > 0
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    : 0;

  // Net estimated monthly cashflow (rental income - mortgage)
  const netMonthlyCashflow = expectedRent - monthlyMortgage;

  const formatCurrency = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(2).replace(/\.00$/, '')} Tỷ VNĐ`;
    }
    return `${val.toFixed(0)} Triệu VNĐ`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!clientName.trim()) {
      setFormError('Vui lòng nhập tên của anh/chị.');
      return;
    }

    const cleanPhone = clientPhone.replace(/[\s.-]/g, '');
    if (!cleanPhone || cleanPhone.length < 9) {
      setFormError('Vui lòng nhập số điện thoại hợp lệ để Minh Thu gửi bảng tính chi tiết.');
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
          project: selectedProjectName,
          budget,
          equityNeeded,
          loanAmount,
          loanTerm,
          monthlyPayment: monthlyMortgage,
          notes: `Doanh thu thuê dự kiến: ~${expectedRent} triệu/tháng`,
          formType: 'CASHFLOW_CALCULATOR'
        })
      });
    } catch (err) {
      console.warn('Network issue sending calculator lead:', err);
    } finally {
      setIsSubmitting(false);
      onSuccess({
        clientName: clientName.trim(),
        clientPhone: cleanPhone,
        selectedProjects: [selectedProjectName]
      });
    }
  };

  return (
    <section id="calculator" className="relative w-full py-4 px-1">
      <div className="w-full glass-card-ocean rounded-3xl p-4 sm:p-5 border border-white/15 bg-[#0A1322] shadow-2xl relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-brand-cyan/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-44 h-44 bg-brand-gold/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-[10px] font-mono font-bold uppercase tracking-wider mb-1.5">
            <Calculator className="w-3.5 h-3.5 text-brand-cyan" />
            <span>BẢNG TÍNH DÒNG TIỀN THỰC CHIẾN</span>
          </div>
          <h2 className="text-lg sm:text-xl font-display font-black text-white tracking-tight uppercase">
            BẢNG TÍNH VỐN & DÒNG TIỀN ĐẦU TƯ
          </h2>
          <div className="w-10 h-0.5 bg-gradient-to-r from-brand-blue via-brand-gold to-brand-cyan rounded-full my-2 mx-auto" />
          <p className="text-xs text-gray-300 max-w-sm mx-auto leading-relaxed">
            Hỗ trợ hình dung vốn ban đầu, tiến độ thanh toán, mức hỗ trợ vay ngân hàng và dòng tiền cho thuê dự kiến tại Hạ Long.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 text-[11px] font-mono text-gray-400">
          <span className={step >= 1 ? 'text-brand-gold font-bold' : ''}>1. Chọn Dự Án</span>
          <span className="text-gray-600">&bull;</span>
          <span className={step >= 2 ? 'text-brand-gold font-bold' : ''}>2. Thiết Lập Vốn & Vay</span>
          <span className="text-gray-600">&bull;</span>
          <span className={step >= 3 ? 'text-brand-gold font-bold' : ''}>3. Nhận Bảng Tính</span>
        </div>

        {/* Step 1: Select Project */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div>
              <label className="block text-[11px] font-bold text-brand-gold uppercase tracking-wider mb-1.5">
                Chọn Dự Án Dự Kiến Đầu Tư:
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {projectsData.map((p) => {
                  const isSelected = selectedProjectName === p.name;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProjectName(p.name)}
                      className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-brand-blue/25 border-brand-cyan text-white shadow-sm'
                          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold font-display">{p.name}</span>
                        <span className="text-[10px] font-mono text-brand-gold font-semibold">{p.priceEstimate}</span>
                      </div>
                      <p className="text-[10.5px] text-gray-400 mt-0.5 line-clamp-1">{p.type}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Project Highlight Notice */}
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 leading-relaxed font-sans">
              📍 <strong className="text-white">{activeProj.name}:</strong> {activeProj.tagline}. {activeProj.policyHighlight}
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-navy hover:brightness-110 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer uppercase tracking-wider shadow-md"
            >
              <span>Tiếp Theo: Thiết Lập Vốn & Vay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}

        {/* Step 2: Financial Setup Dashboard */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Budget Slider */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-white uppercase tracking-wider">
                  Giá Trị Căn Dự Kiến:
                </label>
                <span className="text-sm font-mono font-bold text-brand-gold">
                  {formatCurrency(budget)}
                </span>
              </div>
              <input
                type="range"
                min={activeProj.priceRangeMin}
                max={activeProj.priceRangeMax}
                step={50}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-brand-gold bg-white/10 rounded-lg appearance-none h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                <span>{formatCurrency(activeProj.priceRangeMin)}</span>
                <span>{formatCurrency(activeProj.priceRangeMax)}</span>
              </div>
            </div>

            {/* Down Payment & Loan Term Selectors */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Vốn Tự Có ({downPaymentPct}%)
                </label>
                <select
                  value={downPaymentPct}
                  onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                  className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none cursor-pointer font-sans"
                >
                  <option value={15}>15% (Chính sách đợt 1)</option>
                  <option value={20}>20% (Tiêu chuẩn)</option>
                  <option value={30}>30% (Khuyên dùng)</option>
                  <option value={50}>50% (Đòn bẩy an toàn)</option>
                  <option value={70}>70% (Tối thiểu vay)</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Thời Gian Vay ({loanTerm} năm)
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none cursor-pointer font-sans"
                >
                  <option value={10}>10 Năm (120 tháng)</option>
                  <option value={15}>15 Năm (180 tháng)</option>
                  <option value={20}>20 Năm (240 tháng)</option>
                  <option value={25}>25 Năm (300 tháng)</option>
                  <option value={35}>35 Năm (Tối đa)</option>
                </select>
              </div>
            </div>

            {/* Expected Rental Income */}
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-200 uppercase tracking-wider">
                  Thu Nhập Cho Thuê Ước Tính:
                </label>
                <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400">
                  ~{expectedRent} Tr/tháng
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={90}
                step={2}
                value={expectedRent}
                onChange={(e) => setExpectedRent(Number(e.target.value))}
                className="w-full accent-emerald-400 bg-white/10 rounded-lg appearance-none h-2 cursor-pointer"
              />
              <p className="text-[10px] text-gray-400 font-sans">
                * Tham khảo theo công suất phòng du lịch Hạ Long trung bình 55% - 75%.
              </p>
            </div>

            {/* Scientific Financial KPI Breakdown Tiles */}
            <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-[9.5px] text-gray-400 font-sans block uppercase">Vốn Cần Chuẩn Bị</span>
                <span className="text-sm font-bold text-brand-gold block">{formatCurrency(equityNeeded)}</span>
                <span className="text-[9px] text-gray-400 font-sans block">{downPaymentPct}% giá trị căn</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-[9.5px] text-gray-400 font-sans block uppercase">Ngân Hàng Cho Vay</span>
                <span className="text-sm font-bold text-white block">{formatCurrency(loanAmount)}</span>
                <span className="text-[9px] text-gray-400 font-sans block">{100 - downPaymentPct}% trong {loanTerm} năm</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5">
                <span className="text-[9.5px] text-gray-400 font-sans block uppercase">Gốc + Lãi Dự Kiến</span>
                <span className="text-sm font-bold text-brand-cyan block">~{monthlyMortgage.toFixed(1)} Tr/tháng</span>
                <span className="text-[9px] text-gray-400 font-sans block">Sau ưu đãi lãi suất</span>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-0.5">
                <span className="text-[9.5px] text-emerald-300 font-sans block uppercase font-bold">Dòng Tiền Ròng</span>
                <span className={`text-sm font-bold block ${netMonthlyCashflow >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {netMonthlyCashflow >= 0 ? `+${netMonthlyCashflow.toFixed(1)} Tr/th` : `${netMonthlyCashflow.toFixed(1)} Tr/th`}
                </span>
                <span className="text-[9px] text-emerald-200/80 font-sans block">
                  {netMonthlyCashflow >= 0 ? 'Thặng dư cho thuê' : 'Khoản bù tháng'}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold cursor-pointer"
              >
                Quay Lại
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-red-dark hover:brightness-110 active:scale-98 text-white text-xs font-bold flex items-center justify-center gap-1 cursor-pointer uppercase tracking-wider shadow-md"
              >
                <span>Nhận Bản Chi Tiết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Lead Input */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div className="p-3 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/25 text-xs text-gray-200 space-y-1">
              <p className="font-bold text-white">
                📊 Phương án tính toán: {selectedProjectName} ({formatCurrency(budget)})
              </p>
              <p className="text-gray-300 text-[11px]">
                Vốn chuẩn bị: <strong className="text-brand-gold">{formatCurrency(equityNeeded)}</strong> &bull; Vay: <strong>{formatCurrency(loanAmount)}</strong> trong {loanTerm} năm &bull; Gốc lãi ~{monthlyMortgage.toFixed(1)}tr/tháng.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2.5">
              {formError && (
                <div className="p-2 bg-red-500/15 border border-red-500/30 rounded-xl text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Họ và tên của anh/chị *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Anh Hoàng / Chị Mai"
                  value={clientName}
                  onChange={(e) => {
                    setClientName(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-300 uppercase tracking-wider mb-1">
                  Số điện thoại Zalo *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại để Minh Thu gửi bảng excel"
                  value={clientPhone}
                  onChange={(e) => {
                    setClientPhone(e.target.value);
                    if (formError) setFormError('');
                  }}
                  className="w-full bg-[#050B14] border border-white/15 text-white text-xs rounded-xl p-2.5 focus:border-brand-gold outline-none font-mono"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 py-3 px-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 text-xs font-semibold cursor-pointer"
                >
                  Quay Lại
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-2 py-3 px-3 rounded-xl bg-gradient-to-r from-brand-red to-brand-red-dark hover:brightness-110 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer uppercase tracking-wider disabled:opacity-60 shadow-lg shadow-brand-red/30"
                >
                  {isSubmitting ? (
                    <span>Đang gửi bảng tính...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 fill-white" />
                      <span>GỬI BẢNG TÍNH CHO TÔI</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}

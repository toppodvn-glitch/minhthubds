import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Check, ArrowRight, Sparkles, MessageCircle, PhoneCall, X, MapPin } from 'lucide-react';
import { projectsData, contactData } from '../data';
import { Project } from '../types';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadBudget, setLeadBudget] = useState('3–5 tỷ');
  const [leadPurpose, setLeadPurpose] = useState('Đầu tư');
  const [formError, setFormError] = useState('');

  const handleOpenConsult = (project: Project) => {
    setSelectedProject(project);
    setFormError('');
  };

  const handleClose = () => {
    setSelectedProject(null);
    setLeadName('');
    setLeadPhone('');
    setFormError('');
  };

  const handleSendLead = (e: FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) {
      setFormError('Vui lòng điền đủ Họ tên và Số điện thoại.');
      return;
    }
    
    // Build direct prefilled Zalo text message for Minh Thu
    const message = `Xin chào Minh Thu! Tôi là ${leadName} (${leadPhone}). Tôi đang quan tâm dự án ${selectedProject?.name} (Mục đích: ${leadPurpose}, Ngân sách: ${leadBudget}). Minh Thu vui lòng gửi cho tôi bảng giá, chính sách bán hàng và quỹ căn mới nhất nhé!`;
    const zaloUrl = `https://zalo.me/${contactData.phone}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(zaloUrl, '_blank');
    handleClose();
  };

  return (
    <section className="relative w-full py-8 px-4" id="danh-sach-du-an">
      {/* SECTION TITLE */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] text-gray-400 font-mono font-bold tracking-wider uppercase mb-2">
          <Building2 className="w-3.5 h-3.5 text-brand-red" />
          QUỸ CĂN & DỰ ÁN HẠ LONG
        </div>
        <h2 className="text-xl sm:text-2xl font-sans font-black text-white tracking-tight uppercase max-w-md">
          Các dự án Minh Thu đang phân phối
        </h2>
        <p className="text-xs text-gray-400 mt-2">
          6 dự án trọng điểm tiềm năng bậc nhất tại thị trường BĐS Hạ Long
        </p>
        <div className="w-12 h-1 bg-brand-red rounded mt-3" />
      </div>

      {/* 6 PROJECTS CARDS */}
      <div className="space-y-6">
        {projectsData.map((project, idx) => {
          const isNew = project.status === 'new';
          
          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              className="relative rounded-3xl overflow-hidden border glass-card-red border-brand-red/30 hover:border-brand-red/60 hover:shadow-[0_8px_30px_rgba(215,25,32,0.2)] transition-all"
            >
              {/* Cover Image */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0F] via-[#0B0B0F]/40 to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {isNew ? (
                    <span className="px-2.5 py-1 bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-[10px] uppercase font-bold rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
                      Mới Ra Mắt
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-green-500/20 border border-green-500/40 text-green-400 font-mono text-[10px] uppercase font-bold rounded-full flex items-center gap-1.5 backdrop-blur-md shadow-sm">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
                      Đang Triển Khai
                    </span>
                  )}
                  {project.category && (
                    <span className="px-2 py-1 bg-black/50 border border-white/15 text-gray-200 text-[10px] font-sans font-medium rounded-full backdrop-blur-md">
                      {project.category}
                    </span>
                  )}
                </div>

                {/* Developer */}
                <div className="absolute bottom-3 left-4">
                  <span className="text-[10px] text-brand-gold font-bold bg-black/60 border border-brand-gold/30 px-2 py-0.5 rounded backdrop-blur-md">
                    {project.developer}
                  </span>
                </div>

                {/* Price indicator */}
                {project.priceEstimate && (
                  <div className="absolute bottom-3 right-4">
                    <span className="text-[11px] font-mono font-bold text-white bg-brand-red px-2.5 py-1 rounded-xl shadow-md">
                      {project.priceEstimate}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-extrabold text-white font-sans flex items-center gap-1.5">
                    {project.name}
                    <Sparkles className="w-4 h-4 text-brand-gold fill-brand-gold/20" />
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-snug flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-brand-red flex-shrink-0" />
                    <span>{project.location}</span>
                  </p>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed font-sans">
                  {project.description}
                </p>

                {/* Highlight Checkmarks */}
                {project.highlights && (
                  <ul className="space-y-1.5 pt-2 border-t border-white/5">
                    {project.highlights.map((hlt, hidx) => (
                      <li key={hidx} className="flex items-start gap-2 text-[11px] text-gray-300 font-sans">
                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-gold mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                        <span className="leading-snug">{hlt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenConsult(project)}
                    className="w-full bg-white/5 hover:bg-brand-red hover:text-white border border-brand-gold/30 hover:border-brand-red text-xs font-bold text-brand-gold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm group"
                  >
                    <span>{project.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CONSULTATION OVERLAY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto py-10">
            {/* Dark glass backdrop layout */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Popup Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-sm glass-card-red rounded-3xl p-6 border border-white/15 shadow-2xl bg-[#0B0B0F] z-10 my-auto"
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-5 mt-1">
                <span className="text-[10px] text-brand-gold font-mono uppercase tracking-wider font-bold">
                  NHẬN BẢNG GIÁ & CHÍNH SÁCH
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                  {selectedProject.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Minh Thu sẽ hỗ trợ gửi quỹ căn, tiến độ thanh toán & ưu đãi chiết khấu trực tiếp qua Zalo.
                </p>
              </div>

              <form onSubmit={handleSendLead} className="space-y-3.5">
                {formError && (
                  <div className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center">
                    ⚠️ {formError}
                  </div>
                )}

                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Họ và tên của anh/chị *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập họ tên anh/chị"
                    value={leadName}
                    onChange={(e) => {
                      setLeadName(e.target.value);
                      if (formError) setFormError('');
                    }}
                    className="w-full bg-premium-dark border border-white/10 focus:border-brand-red text-white text-xs rounded-xl p-3 outline-none transition-all"
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
                    value={leadPhone}
                    onChange={(e) => {
                      setLeadPhone(e.target.value);
                      if (formError) setFormError('');
                    }}
                    className="w-full bg-premium-dark border border-white/10 focus:border-brand-red text-white text-xs rounded-xl p-3 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Mục đích mua
                    </label>
                    <select
                      value={leadPurpose}
                      onChange={(e) => setLeadPurpose(e.target.value)}
                      className="w-full bg-premium-dark border border-white/10 text-white text-xs rounded-xl p-2.5 outline-none cursor-pointer"
                    >
                      <option value="Ở">Ở</option>
                      <option value="Nghỉ dưỡng">Nghỉ dưỡng</option>
                      <option value="Đầu tư">Đầu tư</option>
                      <option value="Khai thác cho thuê">Khai thác cho thuê</option>
                      <option value="Tìm hiểu trước">Tìm hiểu trước</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Ngân sách dự kiến
                    </label>
                    <select
                      value={leadBudget}
                      onChange={(e) => setLeadBudget(e.target.value)}
                      className="w-full bg-premium-dark border border-white/10 text-white text-xs rounded-xl p-2.5 outline-none cursor-pointer"
                    >
                      <option value="Dưới 3 tỷ">Dưới 3 tỷ</option>
                      <option value="3–5 tỷ">3–5 tỷ</option>
                      <option value="5–10 tỷ">5–10 tỷ</option>
                      <option value="Trên 10 tỷ">Trên 10 tỷ</option>
                      <option value="Chưa xác định">Chưa xác định</option>
                    </select>
                  </div>
                </div>

                <div className="text-[11px] text-gray-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                  🛡️ <strong className="text-white">Cam kết từ Minh Thu:</strong> Thông tin rõ ràng – Tư vấn đúng nhu cầu – Đồng hành cùng khách hàng. Bảo mật thông tin tuyệt đối.
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(215,25,32,0.3)] flex items-center justify-center gap-2 text-xs cursor-pointer uppercase"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  GỬI YÊU CẦU CHO MINH THU QUA ZALO
                </button>

                <div className="text-center pt-1">
                  <span className="text-[10px] text-gray-500">Hoặc gọi trực tiếp:</span>
                  <a href={`tel:${contactData.phone}`} className="block text-sm font-extrabold text-brand-gold mt-0.5 hover:underline font-mono">
                    {contactData.phoneDisplay}
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}


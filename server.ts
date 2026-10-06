import express from "express";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API route to send SMTP email from contact submissions
app.post("/api/send-email", async (req, res) => {
  const {
    clientName,
    clientPhone,
    project,
    apartmentType,
    budget,
    equityNeeded,
    loanAmount,
    loanTerm,
    monthlyPayment,
  } = req.body;

  if (!clientName || !clientPhone) {
    return res.status(400).json({ error: "Missing clientName or clientPhone." });
  }

  let smtpUser = process.env.SMTP_USER || "taquang95@gmail.com";
  if (smtpUser && !smtpUser.includes("@")) {
    smtpUser = smtpUser.trim() + "@gmail.com";
  }
  const smtpPass = process.env.SMTP_PASS || "qvia gnrg uuzp ortc";
  const receiverEmail = process.env.SMTP_RECEIVER || "cskhbdshalong29062026@gmail.com, taquang95@gmail.com";

  // Check SMTP setup and alert developer/user gracefully
  if (!smtpUser || !smtpPass) {
    console.warn("⚠️ SMTP Credentials are not configured. Unable to send real email.");
    return res.status(400).json({
      success: false,
      errorCode: "SMTP_NOT_CONFIGURED",
      message: "SMTP chưa được cấu hình. Vui lòng thêm SMTP_USER và SMTP_PASS vào phần Bí mật (Secrets) hoặc file .env",
    });
  }

  try {
    // Lazy-initialize Nodemailer transport using Gmail SMTP secure connection
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const formatCurrency = (val: number) => {
      if (!val) return "0 VNĐ";
      if (val >= 1000) {
        return `${(val / 1000).toFixed(2).replace(/\.00$/, "")} Tỷ VNĐ`;
      }
      return `${val.toFixed(0)} Triệu VNĐ`;
    };

    // Design a beautifully stylized, responsive HTML email body in Vietnamese
    const htmlBody = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #e5e7eb; border-radius: 16px; background-color: #fafafa; color: #1f2937;">
        <!-- Header -->
        <div style="text-align: center; border-bottom: 2px solid #D71920; padding-bottom: 20px; margin-bottom: 25px;">
          <h2 style="color: #D71920; margin: 0; font-size: 22px; text-transform: uppercase; letter-spacing: -0.5px;">MINH THU BĐS HẠ LONG</h2>
          <p style="color: #6b7280; font-size: 11px; font-family: monospace; text-transform: uppercase; margin: 5px 0 0 0; letter-spacing: 2px;">Thông Báo Nhu Cầu Tư Vấn Mới</p>
        </div>

        <!-- Notification Note -->
        <p style="font-size: 15px; line-height: 1.6; color: #374151;">
          Chào <strong>Minh Thu</strong>, một khách hàng vừa gửi thông tin đăng ký nhu cầu BĐS Hạ Long từ website.
        </p>

        <!-- Customer Profiler -->
        <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-left: 5px solid #D71920; padding: 18px; border-radius: 10px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; color: #111827; letter-spacing: 0.5px;">👤 Thông tin khách hàng</h3>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr>
              <td style="padding: 6px 0; color: #6b7280; width: 40%;">Họ và tên:</td>
              <td style="padding: 6px 0; color: #111827; font-weight: bold;">${clientName}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Số điện thoại / Zalo:</td>
              <td style="padding: 6px 0; color: #D71920; font-weight: bold; font-family: monospace; font-size: 15px;">
                <a href="tel:${clientPhone}" style="color: #D71920; text-decoration: none;">${clientPhone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; color: #6b7280;">Kênh Chat nhanh:</td>
              <td style="padding: 6px 0;">
                <a href="https://zalo.me/${clientPhone.replace(/[\s.-]/g, "")}" style="color: #2563eb; text-decoration: underline; font-weight: 500;">Mở chat Zalo với khách ngay</a>
              </td>
            </tr>
          </table>
        </div>

        <!-- Calculated Parameters -->
        <div style="background-color: #111827; color: #f9fafb; padding: 20px; border-radius: 12px; margin: 20px 0;">
          <h3 style="margin: 0 0 12px 0; font-size: 13px; text-transform: uppercase; color: #f59e0b; letter-spacing: 1px; font-weight: bold;">📊 Chi Tiết Nhu Cầu BĐS</h3>
          <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Dự án quan tâm:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #ffffff;">${project || "Không xác định"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Mục đích mua:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #ffffff;">${req.body.purpose || "Chưa chọn"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Khoảng ngân sách:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #f59e0b; font-size: 14px;">${req.body.budgetStr || formatCurrency(budget)}</td>
            </tr>
            ${loanAmount ? `
            <tr style="border-bottom: 1px solid #374151;">
              <td style="padding: 10px 0; color: #9ca3af;">Khoản vay dự kiến:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #ffffff;">${formatCurrency(loanAmount)} (${loanTerm} năm)</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #9ca3af; font-weight: bold;">Gốc & Lãi ước tính:</td>
              <td style="padding: 10px 0; text-align: right; font-weight: bold; color: #10b981; font-size: 15px;">~${formatCurrency(monthlyPayment)}/tháng</td>
            </tr>
            ` : ''}
          </table>
        </div>

        <!-- Footer Note -->
        <div style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
          <p style="margin: 0 0 5px 0;">Hệ thống thông báo khách hàng tự động</p>
          <p style="margin: 0;">© ${new Date().getFullYear()} Minh Thu BĐS Hạ Long – Hotline: 0395 655 882</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"CRM Minh Thu BĐS Hạ Long" <${smtpUser}>`,
      to: receiverEmail,
      subject: `🔥 [Khách Đăng Ký BĐS Hạ Long] ${clientName} - ${clientPhone} | ${project}`,
      text: `Có khách hàng mới: ${clientName} (${clientPhone}). Dự án: ${project}.`,
      html: htmlBody,
    });


    return res.status(200).json({ success: true, message: "Email sent successfully to broker." });
  } catch (error: any) {
    console.error("❌ Failed to output SMTP email through Nodemailer:", error);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi kết nối máy chủ Mail SMTP. Vui lòng kiểm tra thông tin cấu hình tài khoản của bạn.",
      details: error.message,
    });
  }
});

// Vite middleware for development or serving compiled client assets in production
if (process.env.NODE_ENV !== "production") {
  import("vite").then(async (viteModule) => {
    const vite = await viteModule.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }).catch((err) => {
    console.error("Vite server loader error:", err);
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Express custom server listening at http://0.0.0.0:${PORT}`);
});

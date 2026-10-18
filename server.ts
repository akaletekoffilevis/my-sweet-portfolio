import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmailHtml(name: string, email: string, subject: string, whatsapp: string, message: string): string {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject || "Sans sujet");
  const safeWhatsapp = escapeHtml(whatsapp);
  const safeMessage = escapeHtml(message);
  const date = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const year = new Date().getFullYear();
  const MONO = "'Courier New','Courier',monospace";
  const SANS = "Helvetica,Arial,sans-serif";
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:${SANS};-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border:1px solid #e4e4e7;">
        <tr><td style="height:4px;background:#0ea5e9;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:24px 28px 0;">
          <p style="margin:0;color:#71717a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-family:${MONO};">Portfolio &middot; Nouveau message</p>
          <p style="margin:16px 0 0;color:#09090b;font-size:22px;font-weight:bold;letter-spacing:-0.02em;line-height:1.25;">${safeName}</p>
          <p style="margin:4px 0 0;color:#71717a;font-size:14px;">${safeSubject}</p>
        </td></tr>
        <tr><td style="padding:20px 28px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e4e4e7;">
            <tr>
              <td style="padding:10px 0;color:#71717a;font-size:13px;border-bottom:1px solid #f4f4f5;width:110px;">Email</td>
              <td style="padding:10px 0;font-size:13px;border-bottom:1px solid #f4f4f5;"><a href="mailto:${safeEmail}" style="color:#0284c7;text-decoration:none;">${safeEmail}</a></td>
            </tr>
            ${safeWhatsapp ? `<tr>
              <td style="padding:10px 0;color:#71717a;font-size:13px;border-bottom:1px solid #f4f4f5;">WhatsApp</td>
              <td style="padding:10px 0;font-size:13px;border-bottom:1px solid #f4f4f5;color:#18181b;">${safeWhatsapp}</td>
            </tr>` : ""}
          </table>
        </td></tr>
        <tr><td style="padding:22px 28px 0;">
          <p style="margin:0;color:#71717a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;font-family:${MONO};">Message</p>
          <p style="margin:10px 0 0;padding:16px 18px;background:#fafafa;border-left:2px solid #d4d4d8;color:#27272a;font-size:14px;line-height:1.7;white-space:pre-wrap;">${safeMessage}</p>
        </td></tr>
        <tr><td style="padding:22px 28px 26px;">
          <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(subject || "Votre message")}" style="display:inline-block;background:#0ea5e9;color:#ffffff;font-weight:bold;font-size:13px;padding:12px 24px;text-decoration:none;">R&eacute;pondre</a>
        </td></tr>
        <tr><td style="border-top:1px solid #e4e4e7;padding:16px 28px;">
          <p style="margin:0;color:#a1a1aa;font-size:11px;font-family:${MONO};">&copy; ${year} Koffi L&eacute;vis Akalete &middot; Niamey, Niger &middot; re&ccedil;u le ${date}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/messages", async (req, res) => {
    try {
      const { name, email, subject, message, whatsapp, _hp, _ts } = req.body;

      if (_hp) {
        return res.status(200).json({ success: true, message: "Message envoyé avec succès." });
      }

      if (_ts && Date.now() - Number(_ts) < 3000) {
        return res.status(429).json({ success: false, error: "Trop rapide. Veuillez réessayer." });
      }

      if (!name || !email || !message) {
        return res
          .status(400)
          .json({ success: false, error: "Champs requis manquants." });
      }

      let emailSent = false;
      let emailStatusDetail = "";

      const gmailUser = process.env.GMAIL_USER || "koffilevis21@gmail.com";
      const gmailAppPass = process.env.GMAIL_APP_PASSWORD;

      if (gmailAppPass) {
        try {
          const cleanPass = gmailAppPass.replace(/\s+/g, "");
          const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: { user: gmailUser, pass: cleanPass },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
          });

          const mailOptions = {
            from: `"${name.replace(/["\r\n]/g, "")} (Contact Portfolio)" <${gmailUser}>`,
            to: "koffilevis21@gmail.com",
            replyTo: email,
            subject: `Portfolio: ${subject || "Nouveau message de contact"}`,
            text: `Nouveau message de contact reçu de ${name} (${email}):\n\nSujet: ${subject || "Sans sujet"}\nWhatsApp: ${whatsapp || "Non renseigné"}\n\nMessage:\n${message}`,
            html: buildEmailHtml(
              name,
              email,
              subject || "",
              whatsapp || "",
              message,
            ),
          };

          await transporter.sendMail(mailOptions);
          emailSent = true;
          emailStatusDetail = "Sent successfully via Gmail SMTP.";
          console.log(
            `Email forwarded to koffilevis21@gmail.com from ${email}`,
          );
        } catch (mailErr: any) {
          console.error("SMTP failed:", mailErr);
          emailStatusDetail = `Email failed: ${mailErr.message}`;
        }
      } else {
        emailStatusDetail =
          "GMAIL_APP_PASSWORD not configured. Message logged.";
      }

      res.status(201).json({
        success: true,
        message: "Message envoyé avec succès.",
        emailSent,
        emailStatusDetail,
        data: {
          id: "msg-" + Math.floor(Math.random() * 899999 + 100000),
          name,
          email,
          subject: subject || "Sans sujet",
          message,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, () => {
    console.log(`Dev server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});

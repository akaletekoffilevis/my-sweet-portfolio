import type { IncomingMessage, ServerResponse } from "node:http";
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

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ success: false, error: "Method not allowed" }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => { body += chunk; });
  req.on("end", async () => {
    try {
      let parsed: Record<string, unknown>;
      try {
        parsed = JSON.parse(body);
      } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: false, error: "Requête JSON invalide." }));
        return;
      }
      const { name, email, subject, message, whatsapp, _hp, _ts } = parsed as {
        name: string;
        email: string;
        subject: string;
        message: string;
        whatsapp?: string;
        _hp?: string;
        _ts?: string;
      };

      if (_hp) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: true, message: "Message envoyé avec succès." }));
        return;
      }

      if (_ts && Date.now() - Number(_ts) < 3000) {
        res.statusCode = 429;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: false, error: "Trop rapide. Veuillez réessayer." }));
        return;
      }

      if (!name || !email || !message) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ success: false, error: "Champs requis manquants." }));
        return;
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
            greetingTimeout: 10000
          });

          await transporter.sendMail({
            from: `"${name.replace(/["\r\n]/g, "")} (Contact Portfolio)" <${gmailUser}>`,
            to: "koffilevis21@gmail.com",
            replyTo: email,
            subject: `Portfolio: ${subject || "Nouveau message de contact"}`,
            text: `Message de ${name} (${email}):\n\nSujet: ${subject || "Sans sujet"}\nWhatsApp: ${whatsapp || "Non renseigné"}\n\nMessage:\n${message}`,
            html: buildEmailHtml(name, email, subject || "", whatsapp || "", message)
          });
          emailSent = true;
          emailStatusDetail = "Sent successfully via Gmail SMTP.";
        } catch (mailErr: any) {
          emailStatusDetail = `Email failed: ${mailErr.message}`;
        }
      } else {
        emailStatusDetail = "GMAIL_APP_PASSWORD not configured. Message logged.";
      }

      res.statusCode = 201;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        success: true,
        message: "Message envoyé avec succès.",
        emailSent,
        emailStatusDetail,
        data: {
          id: "msg-" + Math.floor(Math.random() * 899999 + 100000),
          name, email,
          subject: subject || "Sans sujet",
          message,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (err: any) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  });
}

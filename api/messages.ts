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
  const safeSubject = escapeHtml(subject);
  const safeWhatsapp = escapeHtml(whatsapp);
  const safeMessage = escapeHtml(message);
  const date = new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
  const year = new Date().getFullYear();
  const MONO = "'Courier New','Courier',monospace";
  const SANS = "Helvetica,Arial,sans-serif";
  const row = (label: string, value: string, isLink = false) => `
                    <tr>
                      <td style="padding:11px 0;width:110px;vertical-align:top;color:#6e6e74;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;font-family:${MONO};border-bottom:1px solid #ececea;">${label}</td>
                      <td style="padding:11px 0 11px 16px;color:#26262b;font-size:14px;font-family:${SANS};border-bottom:1px solid #ececea;">${isLink ? `<a href="${value}" style="color:#b45309;text-decoration:none;">${value}</a>` : value}</td>
                    </tr>`;
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f0f0ed;font-family:${SANS};">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0ed;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e4e4df;">
        <tr><td style="height:6px;background:#f59e0b;font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr><td style="padding:30px 32px 22px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0;color:#6e6e74;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-family:${MONO};">Nouveau message &mdash; Portfolio</p>
                <p style="margin:8px 0 0;color:#111114;font-size:24px;font-weight:bold;letter-spacing:-0.5px;line-height:1.2;">${safeName}</p>
              </td>
              <td align="right" valign="top" style="color:#8a8a86;font-size:11px;font-family:${MONO};white-space:nowrap;">${date}</td>
            </tr>
          </table>
        </td></tr>
        <tr><td style="padding:0 32px;"><table width="100%" cellpadding="0" cellspacing="0"><tr><td style="border-top:3px solid #111114;font-size:0;line-height:0;">&nbsp;</td></tr></table></td></tr>
        <tr><td style="padding:26px 32px 6px;">
          <p style="margin:0;color:#b45309;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-family:${MONO};">01 &mdash; Exp&eacute;diteur</p>
        </td></tr>
        <tr><td style="padding:0 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">${row("Nom", safeName)}${row("Email", `mailto:${safeEmail}`, true)}${row("WhatsApp", safeWhatsapp || "Non renseign&eacute;")}${row("Sujet", safeSubject || "Sans sujet")}</table>
        </td></tr>
        <tr><td style="padding:24px 32px 8px;">
          <p style="margin:0;color:#b45309;font-size:10px;letter-spacing:2px;text-transform:uppercase;font-family:${MONO};">02 &mdash; Message</p>
        </td></tr>
        <tr><td style="padding:0 32px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="background:#f7f7f4;border-left:3px solid #f59e0b;padding:18px 20px;color:#26262b;font-size:14px;line-height:1.8;white-space:pre-wrap;font-family:${SANS};">${safeMessage}</td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:26px 32px 30px;">
          <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(subject || "Votre message")}" style="display:inline-block;background:#f59e0b;color:#111114;font-weight:bold;font-size:13px;letter-spacing:0.5px;padding:13px 28px;text-decoration:none;font-family:${SANS};">R&eacute;pondre &agrave; ${safeName}</a>
          <p style="margin:12px 0 0;color:#8a8a86;font-size:11px;font-family:${MONO};">Ou r&eacute;pondez directement &agrave; cet email.</p>
        </td></tr>
        <tr><td style="border-top:1px solid #e4e4df;padding:18px 32px;">
          <p style="margin:0;color:#6e6e74;font-size:10px;letter-spacing:1px;font-family:${MONO};">&copy; ${year} Koffi L&eacute;vis Akalete &mdash; Niamey, Niger</p>
          <p style="margin:4px 0 0;color:#8a8a86;font-size:10px;letter-spacing:1px;font-family:${MONO};">13.5127&deg; N, 2.1128&deg; E &middot; akaletekoffilevis.vercel.app</p>
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
            from: `"${escapeHtml(name)} (Contact Portfolio)" <${gmailUser}>`,
            to: "koffilevis21@gmail.com",
            replyTo: escapeHtml(email),
            subject: `Portfolio: ${escapeHtml(subject) || "Nouveau message de contact"}`,
            text: `Message de ${escapeHtml(name)} (${escapeHtml(email)}):\n\nSujet: ${escapeHtml(subject)}\nWhatsApp: ${escapeHtml(whatsapp) || "Non renseigné"}\n\nMessage:\n${escapeHtml(message)}`,
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

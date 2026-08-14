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
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0b1121;font-family:'Courier New','Courier',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0b1121;padding:40px 16px;">
    <tr><td align="center">
      <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

        <!-- ═══ HEADER ═══ -->
        <tr>
          <td style="padding-bottom:24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0;color:#f59e0b;font-size:20px;font-weight:bold;font-family:'Courier New',monospace;">
                    &gt; Koffi L&amp;eacute;vis Akalete
                  </p>
                  <p style="margin:4px 0 0 0;color:rgba(255,255,255,0.55);font-size:11px;font-family:'Courier New',monospace;">
                    Ambassadeur 10000 CODEURS | D&amp;eacute;veloppeur Full Stack Junior
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ═══ TERMINAL WINDOW ═══ -->
        <tr>
          <td style="background:#111827;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">
            <!-- Title bar -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;border-bottom:1px solid rgba(255,255,255,0.06);">
              <tr>
                <td style="padding:10px 16px;">
                  <table cellpadding="0" cellspacing="0"><tr>
                    <td><span style="display:inline-block;width:10px;height:10px;background:rgba(239,68,68,0.6);"></span></td>
                    <td style="width:6px;"></td>
                    <td><span style="display:inline-block;width:10px;height:10px;background:rgba(234,179,8,0.6);"></span></td>
                    <td style="width:6px;"></td>
                    <td><span style="display:inline-block;width:10px;height:10px;background:rgba(34,197,94,0.6);"></span></td>
                    <td style="padding-left:14px;color:rgba(255,255,255,0.55);font-size:12px;font-family:'Courier New',monospace;">contact-form.sh</td>
                  </tr></table>
                </td>
                <td align="right" style="padding-right:16px;color:rgba(255,255,255,0.3);font-size:10px;font-family:'Courier New',monospace;">
                  ${date}
                </td>
              </tr>
            </table>

            <!-- Content body -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:28px 28px 20px 28px;">
                  <!-- Title -->
                  <p style="margin:0 0 4px 0;color:#f59e0b;font-size:15px;font-weight:bold;font-family:'Courier New',monospace;">
                    // Nouveau Message Portfolio
                  </p>
                  <p style="margin:0 0 24px 0;color:rgba(255,255,255,0.5);font-size:11px;font-family:'Courier New',monospace;">
                    Message re&amp;ccedil;u depuis le formulaire de contact.
                  </p>

                  <!-- Separator -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                    <tr><td style="border-top:1px solid rgba(255,255,255,0.06);font-size:0;line-height:0;">&nbsp;</td></tr>
                  </table>

                  <!-- Data fields -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                    <tr>
                      <td style="padding:9px 0;color:rgba(255,255,255,0.45);font-size:11px;width:110px;vertical-align:top;font-family:'Courier New',monospace;border-bottom:1px solid rgba(255,255,255,0.04);">
                        <span style="color:#f59e0b;">$</span> Nom
                      </td>
                      <td style="padding:9px 0 9px 12px;color:#f8fafc;font-size:12px;font-family:'Courier New',monospace;border-bottom:1px solid rgba(255,255,255,0.04);">
                        ${safeName}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;color:rgba(255,255,255,0.45);font-size:11px;vertical-align:top;font-family:'Courier New',monospace;border-bottom:1px solid rgba(255,255,255,0.04);">
                        <span style="color:#f59e0b;">$</span> Email
                      </td>
                      <td style="padding:9px 0 9px 12px;color:#f59e0b;font-size:12px;font-family:'Courier New',monospace;border-bottom:1px solid rgba(255,255,255,0.04);">
                        <a href="mailto:${safeEmail}" style="color:#f59e0b;text-decoration:none;">${safeEmail}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;color:rgba(255,255,255,0.45);font-size:11px;vertical-align:top;font-family:'Courier New',monospace;border-bottom:1px solid rgba(255,255,255,0.04);">
                        <span style="color:#f59e0b;">$</span> WhatsApp
                      </td>
                      <td style="padding:9px 0 9px 12px;color:#f8fafc;font-size:12px;font-family:'Courier New',monospace;border-bottom:1px solid rgba(255,255,255,0.04);">
                        ${safeWhatsapp || "Non renseigné"}
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:9px 0;color:rgba(255,255,255,0.45);font-size:11px;vertical-align:top;font-family:'Courier New',monospace;border-bottom:1px solid rgba(255,255,255,0.04);">
                        <span style="color:#f59e0b;">$</span> Sujet
                      </td>
                      <td style="padding:9px 0 9px 12px;color:#f8fafc;font-size:12px;font-family:'Courier New',monospace;border-bottom:1px solid rgba(255,255,255,0.04);">
                        ${safeSubject || "Sans sujet"}
                      </td>
                    </tr>
                  </table>

                  <!-- Message label -->
                  <p style="margin:0 0 8px 0;color:rgba(255,255,255,0.45);font-size:11px;font-family:'Courier New',monospace;">
                    <span style="color:#f59e0b;">$</span> cat message.md
                  </p>

                  <!-- Message block -->
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:18px;background:#020617;border-left:3px solid #f59e0b;color:#e2e8f0;font-size:12px;line-height:1.7;white-space:pre-wrap;font-family:'Courier New',monospace;">${safeMessage}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Footer bar -->
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;border-top:1px solid rgba(255,255,255,0.06);">
              <tr>
                <td style="padding:12px 28px;">
                  <p style="margin:0;color:rgba(255,255,255,0.3);font-size:10px;font-family:'Courier New',monospace;">
                    <span style="color:rgba(34,197,94,0.6);">●</span> envoy&amp;eacute; via portfolio &mdash; ${date}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ═══ FOOTER ═══ -->
        <tr>
          <td style="padding-top:20px;">
            <p style="margin:0;color:rgba(255,255,255,0.25);font-size:10px;text-align:center;font-family:'Courier New',monospace;">
              Portfolio de Koffi L&amp;eacute;vis Akalete &mdash; Niamey, Niger
            </p>
          </td>
        </tr>

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
      const { name, email, subject, message, whatsapp, _hp, _ts } = JSON.parse(body);

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

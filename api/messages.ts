import type { IncomingMessage, ServerResponse } from "node:http";
import nodemailer from "nodemailer";

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
      const { name, email, subject, message, whatsapp } = JSON.parse(body);
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
            from: `"${name} (Contact Portfolio)" <${gmailUser}>`,
            to: "koffilevis21@gmail.com",
            replyTo: email,
            subject: `Portfolio: ${subject || "Nouveau message de contact"}`,
            text: `Message de ${name} (${email}):\n\nSujet: ${subject}\nWhatsApp: ${whatsapp || "Non renseigné"}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
                <h2 style="color:#f59e0b;">Nouveau Message Portfolio</h2>
                <p>Message de contact depuis votre portfolio.</p>
                <table style="width:100%;border-collapse:collapse;margin:20px 0;">
                  <tr><td style="padding:10px;font-weight:bold;">Nom:</td><td style="padding:10px;">${name}</td></tr>
                  <tr><td style="padding:10px;font-weight:bold;">Email:</td><td style="padding:10px;">${email}</td></tr>
                  <tr><td style="padding:10px;font-weight:bold;">WhatsApp:</td><td style="padding:10px;">${whatsapp || "Non renseigné"}</td></tr>
                  <tr><td style="padding:10px;font-weight:bold;">Sujet:</td><td style="padding:10px;">${subject || "Sans sujet"}</td></tr>
                </table>
                <div style="background:#f1f5f9;padding:15px;border-left:4px solid #f59e0b;">${message}</div>
              </div>
            `
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

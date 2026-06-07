import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // POST /api/messages - Contact form
  app.post("/api/messages", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: "Champs requis manquants." });
      }

      let emailSent = false;
      let emailStatusDetail = "";

      const gmailUser = process.env.GMAIL_USER || "koffilevis21@gmail.com";
      const gmailAppPass = process.env.GMAIL_APP_PASSWORD;

      if (gmailAppPass) {
        try {
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: { user: gmailUser, pass: gmailAppPass }
          });

          const mailOptions = {
            from: `"${name} (Contact Portfolio)" <${gmailUser}>`,
            to: "koffilevis21@gmail.com",
            replyTo: email,
            subject: `Portfolio: ${subject || "Nouveau message de contact"}`,
            text: `Nouveau message de contact recu de ${name} (${email}):\n\nSujet: ${subject}\n\nMessage:\n${message}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #f59e0b;">Nouveau Message Portfolio</h2>
                <p>Vous avez reçu un nouveau message de contact depuis votre portfolio.</p>
                <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                  <tr><td style="padding:10px; font-weight:bold;">Nom:</td><td style="padding:10px;">${name}</td></tr>
                  <tr><td style="padding:10px; font-weight:bold;">Email:</td><td style="padding:10px;">${email}</td></tr>
                  <tr><td style="padding:10px; font-weight:bold;">Sujet:</td><td style="padding:10px;">${subject || "Sans sujet"}</td></tr>
                </table>
                <div style="background:#f1f5f9; padding:15px; border-left:4px solid #f59e0b;">${message}</div>
              </div>
            `
          };

          await transporter.sendMail(mailOptions);
          emailSent = true;
          emailStatusDetail = "Sent successfully via Gmail SMTP.";
          console.log(`Email forwarded to koffilevis21@gmail.com from ${email}`);
        } catch (mailErr: any) {
          console.error("SMTP failed:", mailErr);
          emailStatusDetail = `Email failed: ${mailErr.message}`;
        }
      } else {
        emailStatusDetail = "GMAIL_APP_PASSWORD not configured. Message logged.";
      }

      res.status(201).json({
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
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  // Vite dev middleware
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dev server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});

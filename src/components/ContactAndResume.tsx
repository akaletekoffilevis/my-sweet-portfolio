import { useState, type FormEvent } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Send, CheckCircle2, Mail, FileText, Download, Github, Linkedin, Loader2, MapPin, Phone } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/akaletekoffilevis",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/akalete-koffi-levis",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: "mailto:koffilevis21@gmail.com",
    icon: Mail,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/22791535220",
    icon: WhatsAppIcon,
  },
];

export default function ContactAndResume() {
  const { profile, addMessage } = usePortfolio();

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    await addMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || "Sans Objet",
      message: formData.message
    });
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitSuccess(false), 6000);
  };

  return (
    <section className="py-20 px-6 border-b border-app-border-subtle" id="contact-resume-section">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title mb-2">Contact & CV</h2>
        <p className="section-subtitle mb-10">N'hésitez pas à me contacter</p>

        <div className="mx-auto max-w-3xl space-y-8">

          {/* CV Download Banner */}
          <a
            href="/cv_koffi_levis_akalete.pdf"
            download
            className="card-glow group flex items-center justify-between gap-6 bg-app-card rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-app-accent/10 flex items-center justify-center group-hover:bg-app-accent/20 transition-colors shrink-0">
                <FileText className="h-6 w-6 text-app-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-app-text-white text-base">Télécharger mon CV</h3>
                <p className="text-xs text-app-text-muted mt-0.5">PDF — Mis à jour récemment</p>
              </div>
            </div>
            <span className="btn-accent shrink-0 group-hover:scale-105 duration-200">
              <Download className="h-4 w-4" />
              PDF
            </span>
          </a>

          {/* Contact Form Card */}
          <div className="bg-app-card card-glow rounded-2xl p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-app-border-subtle">
              <div className="w-10 h-10 rounded-lg bg-app-accent/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-app-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-app-text-white">Envoyer un message</h3>
                <p className="text-xs text-app-text-muted mt-0.5">Je vous répondrai dans les plus brefs délais</p>
              </div>
            </div>

            {submitSuccess && (
              <div className="bg-emerald-900/15 border border-emerald-800/30 rounded-xl p-5 mb-6 flex items-start gap-3 animate-fade-in">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-emerald-300">Message envoyé avec succès !</p>
                  <p className="text-xs text-emerald-400/60 mt-0.5">Je vous répondrai dès que possible.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="group">
                  <label className="block text-xs font-medium text-app-text-muted mb-1.5 uppercase tracking-wider">Nom *</label>
                  <input type="text" required value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-app-bg border border-app-border-subtle rounded-xl px-4 py-3 text-sm text-app-text-white placeholder-app-text-muted/40 focus:border-app-accent focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all"
                    placeholder="Votre nom" />
                </div>
                <div className="group">
                  <label className="block text-xs font-medium text-app-text-muted mb-1.5 uppercase tracking-wider">Email *</label>
                  <input type="email" required value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-app-bg border border-app-border-subtle rounded-xl px-4 py-3 text-sm text-app-text-white placeholder-app-text-muted/40 focus:border-app-accent focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all"
                    placeholder="votre@email.com" />
                </div>
              </div>
              <div className="group">
                <label className="block text-xs font-medium text-app-text-muted mb-1.5 uppercase tracking-wider">Sujet</label>
                <input type="text" value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-app-bg border border-app-border-subtle rounded-xl px-4 py-3 text-sm text-app-text-white placeholder-app-text-muted/40 focus:border-app-accent focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all"
                  placeholder="Objet du message" />
              </div>
              <div className="group">
                <label className="block text-xs font-medium text-app-text-muted mb-1.5 uppercase tracking-wider">Message *</label>
                <textarea required rows={5} value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-app-bg border border-app-border-subtle rounded-xl px-4 py-3 text-sm text-app-text-white placeholder-app-text-muted/40 focus:border-app-accent focus:ring-1 focus:ring-app-accent/20 focus:outline-none transition-all resize-none"
                  placeholder="Votre message..." />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 bg-app-accent text-white rounded-xl font-medium hover:bg-app-accent-dark transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg shadow-app-accent/10">
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
              </button>
            </form>
          </div>

          {/* Contact Info + Social */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-app-bg border border-app-border-subtle rounded-2xl p-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-app-text-muted">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" />
                <span>{profile.phone || profile.socials.whatsapp}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" />
                <span>{profile.socials.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-app-border-subtle text-app-text-muted hover:border-app-accent hover:text-app-accent hover:bg-app-accent/5 transition-all duration-200"
                    title={link.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

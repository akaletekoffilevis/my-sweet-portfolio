import { useState, type FormEvent } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Send, CheckCircle2, Mail, FileText, Download, Github, Linkedin } from "lucide-react";

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setTimeout(() => {
      addMessage({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "Sans Objet",
        message: formData.message
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 600);
  };

  return (
    <section className="py-20 px-6 border-b border-app-border-subtle" id="contact-resume-section">
      <div className="mx-auto max-w-6xl">
        <h2 className="section-title mb-2">Contact & CV</h2>
        <p className="section-subtitle mb-10">N'hésitez pas à me contacter</p>

        {/* CV Download Banner */}
        <a
          href="/cv_koffi_levis_akalete.pdf"
          download
          className="group block bg-app-card border border-app-border-subtle hover:border-app-accent/50 rounded-2xl p-8 mb-12 transition-all duration-300"
        >
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-app-accent/10 rounded-xl flex items-center justify-center group-hover:bg-app-accent/20 transition-colors">
                <FileText className="h-7 w-7 text-app-accent" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-app-text-white">Télécharger mon CV</h3>
                <p className="text-sm text-app-text-soft mt-0.5">
                  Curriculum Vitae — Format PDF
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-app-accent text-white rounded-xl font-medium hover:bg-app-accent-dark transition text-sm group-hover:scale-105 duration-200">
              <Download className="h-4 w-4" />
              Télécharger (PDF)
            </span>
          </div>
        </a>

        {/* Contact Form - centered */}
        <div className="mx-auto max-w-2xl">
          <div className="bg-app-card card-glow rounded-2xl p-10">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="h-5 w-5 text-app-accent" />
              <h3 className="font-semibold text-app-text-white">Envoyer un message</h3>
            </div>

            {submitSuccess && (
              <div className="bg-green-900/20 border border-green-800 rounded-xl p-4 mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
                <p className="text-sm text-green-300">Message envoyé avec succès !</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-app-text-white mb-1.5">Nom *</label>
                  <input type="text" required value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-app-bg border border-app-border-subtle rounded-lg px-4 py-3 text-sm text-app-text-white focus:border-app-accent focus:outline-none"
                    placeholder="Votre nom" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-app-text-white mb-1.5">Email *</label>
                  <input type="email" required value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-app-bg border border-app-border-subtle rounded-lg px-4 py-3 text-sm text-app-text-white focus:border-app-accent focus:outline-none"
                    placeholder="votre@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-app-text-white mb-1.5">Sujet</label>
                <input type="text" value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-app-bg border border-app-border-subtle rounded-lg px-4 py-3 text-sm text-app-text-white focus:border-app-accent focus:outline-none"
                  placeholder="Objet du message" />
              </div>
              <div>
                <label className="block text-sm font-medium text-app-text-white mb-1.5">Message *</label>
                <textarea required rows={5} value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-app-bg border border-app-border-subtle rounded-lg px-4 py-3 text-sm text-app-text-white focus:border-app-accent focus:outline-none resize-none"
                  placeholder="Votre message..." />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full py-3.5 bg-app-accent text-white rounded-lg font-medium hover:bg-app-accent-dark transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                <Send className="h-4 w-4" />
                {isSubmitting ? "Envoi..." : "Envoyer le message"}
              </button>
            </form>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="flex justify-center items-center gap-4 mt-12">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center justify-center w-14 h-14 rounded-xl border border-app-border-subtle bg-app-card text-app-text-soft hover:border-app-accent hover:text-app-accent hover:bg-app-accent/5 hover:shadow-[0_0_16px_-4px_rgba(245,158,11,0.15)] transition-all duration-200"
                title={link.label}
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

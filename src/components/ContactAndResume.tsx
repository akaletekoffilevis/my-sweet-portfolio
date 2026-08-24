import { useState, type FormEvent } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Send, CheckCircle2, Mail, FileText, Download, Github, Linkedin, Loader2, MapPin, Phone } from "lucide-react";
import SectionHead from "./SectionHead";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

const socialLinks = [
  { label: "GitHub", href: "https://github.com/akaletekoffilevis", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com/in/akalete-koffi-levis", icon: Linkedin },
  { label: "Email", href: "mailto:koffilevis21@gmail.com", icon: Mail },
  { label: "WhatsApp", href: "https://wa.me/22791535220", icon: WhatsAppIcon },
];

const SUBJECTS = [
  "Collaboration / Projet",
  "Offre de stage / Emploi",
  "Mission Freelance",
  "Demande d'information",
  "Soutien technique / Bug",
  "Proposition de partenariat",
  "Review de code",
  "Contribution open-source",
  "Mentorat / Coaching",
  "Invitation à un événement",
  "Autre",
];

const inputClass =
  "w-full bg-transparent border border-app-hairline px-3.5 py-3 text-sm text-app-text-white placeholder:text-app-text-muted/80 focus:border-app-accent focus:outline-none transition-colors";

export default function ContactAndResume() {
  const { profile, addMessage } = usePortfolio();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", whatsapp: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formTimestamp] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _hp: honeypot, _ts: formTimestamp })
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "", whatsapp: "" });
        setTimeout(() => setSubmitSuccess(false), 6000);
      } else {
        setSubmitError(data.error || "Une erreur est survenue. Réessayez.");
      }
    } catch {
      setSubmitError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 sm:py-28 scroll-mt-20 relative" id="contact-resume-section">
      <div className="wrap relative">
        <SectionHead num="05" title="Contact & CV" meta="Réponse sous 24-48h" />

        <div className="grid12 row-gap-14">
          <div className="col-span-full lg:col-span-7 lg:border-r lg:border-app-hairline lg:pr-10 space-y-10">
            <div>
              <span className="kicker block mb-5">Formulaire</span>
              {submitSuccess && (
                <div className="border border-alert-ok-border bg-alert-ok-bg px-4 py-3.5 mb-6 flex items-start gap-3 animate-fade-in">
                  <CheckCircle2 className="h-4 w-4 text-alert-ok shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-medium text-alert-ok">Message envoyé avec succès.</p>
                    <p className="text-xs text-alert-ok/70 mt-0.5">Je vous répondrai dès que possible.</p>
                  </div>
                </div>
              )}

              {submitError && (
                <div className="border border-alert-err-border bg-alert-err-bg px-4 py-3.5 mb-6 flex items-start gap-3 animate-fade-in">
                  <span className="font-mono font-bold text-alert-err shrink-0">!</span>
                  <div>
                    <p className="text-sm font-medium text-alert-err">{submitError}</p>
                    <p className="text-xs text-alert-err/70 mt-0.5">Veuillez réessayer.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate={false} className="space-y-5 relative">
                <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="_hp">Ne pas remplir</label>
                  <input id="_hp" type="text" name="_hp" tabIndex={-1} autoComplete="off" value={honeypot} onChange={e => setHoneypot(e.target.value)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="kicker block mb-2">Nom <span className="text-app-accent">*</span></label>
                    <input id="contact-name" type="text" required value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={inputClass}
                      placeholder="Votre nom" />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="kicker block mb-2">Email <span className="text-app-accent">*</span></label>
                    <input id="contact-email" type="email" required value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className={inputClass}
                      placeholder="votre@email.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-whatsapp" className="kicker block mb-2">WhatsApp <span className="opacity-70">(optionnel)</span></label>
                    <input id="contact-whatsapp" type="tel" value={formData.whatsapp}
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                      className={inputClass}
                      placeholder="+227 XX XX XX XX" />
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className="kicker block mb-2">Sujet</label>
                    <select id="contact-subject" value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className={`${inputClass} appearance-none cursor-pointer`}>
                      <option value="" disabled className="bg-app-bg text-app-text-muted">Choisissez un sujet</option>
                      {SUBJECTS.map(s => (
                        <option key={s} value={s} className="bg-app-bg">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="kicker block mb-2">Message <span className="text-app-accent">*</span></label>
                  <textarea id="contact-message" required rows={5} value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className={`${inputClass} resize-none`}
                    placeholder="Votre message..." />
                </div>
                <button type="submit" disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-app-accent text-app-bg text-sm font-semibold tracking-wide hover:bg-app-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                  {isSubmitting ? "Envoi en cours…" : "Envoyer le message"}
                </button>
              </form>
            </div>

            <div className="pt-8 border-t border-app-hairline">
              <a href="/cv_koffi_levis_akalete.pdf" download
                className="group flex items-center justify-between gap-4 py-1 hover:bg-app-accent/5 transition-colors -mx-2 px-2"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <FileText className="h-7 w-7 text-app-accent shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-app-text-white group-hover:text-app-accent transition-colors">Curriculum Vitae — PDF</p>
                    <p className="folio mt-0.5">Parcours complet, formations et projets</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 border border-app-border-sec px-4 py-2.5 text-xs font-semibold text-app-text-white group-hover:border-app-accent group-hover:text-app-accent transition-colors shrink-0">
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  Télécharger
                </span>
              </a>
            </div>
          </div>

          <div className="col-span-full lg:col-span-4 lg:col-start-9 space-y-10">
            <div>
              <span className="kicker block mb-5">Coordonnées</span>
              <ul className="divide-y divide-app-hairline border-y border-app-hairline">
                <li className="py-3.5 flex items-center gap-3 text-sm text-app-text-body">
                  <MapPin className="h-4 w-4 text-app-accent/70 shrink-0" aria-hidden="true" />
                  {profile.location}
                </li>
                <li className="py-3.5 flex items-center gap-3 text-sm text-app-text-body">
                  <Phone className="h-4 w-4 text-app-accent/70 shrink-0" aria-hidden="true" />
                  <a href={`tel:${(profile.phone || profile.socials.whatsapp || "").replace(/\s/g, "")}`} className="hover:text-app-accent transition-colors">{profile.phone || profile.socials.whatsapp}</a>
                </li>
                <li className="py-3.5 flex items-center gap-3 text-sm text-app-text-body">
                  <Mail className="h-4 w-4 text-app-accent/70 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${profile.socials.email}`} className="hover:text-app-accent transition-colors break-all">{profile.socials.email}</a>
                </li>
              </ul>
            </div>

            <div>
              <span className="kicker block mb-5">Réseaux</span>
              <div className="grid grid-cols-2 gap-px bg-app-hairline border border-app-hairline">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="flex items-center gap-2.5 p-4 bg-app-bg text-app-text-muted hover:text-app-accent transition-colors"
                      aria-label={link.label}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      <span className="text-xs font-medium">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, type FormEvent } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { Send, CheckCircle2, Mail, FileText, Download, Github, Linkedin, Loader2, MapPin, Phone, Terminal } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
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

export default function ContactAndResume() {
  const { profile, addMessage } = usePortfolio();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", whatsapp: "" });
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
      message: formData.message,
      whatsapp: formData.whatsapp
    });
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "", whatsapp: "" });
    setTimeout(() => setSubmitSuccess(false), 6000);
  };

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-app-border-subtle relative overflow-hidden" id="contact-resume-section">
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.03]">
        <div className="absolute top-20 left-10 text-[10px] font-mono text-app-accent leading-relaxed" style={{ writingMode: "vertical-rl" }}>01010010 01000101 01000001 01000100 01011001</div>
        <div className="absolute bottom-20 right-10 text-[10px] font-mono text-app-accent leading-relaxed" style={{ writingMode: "vertical-rl" }}>00100100 01001111 01001011 01000101</div>
      </div>

      <div className="mx-auto max-w-screen-2xl relative">
        <h2 className="section-title mb-2">Contact & CV</h2>
        <p className="section-subtitle mb-6 sm:mb-10">N'hésitez pas à me contacter</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

          {/* Left column — Formulaire + CV */}
          <div className="space-y-6">
            {/* CV Download */}
            <div className="bg-app-bg border border-app-border-subtle overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-app-darker border-b border-app-border-subtle">
                <span className="w-2 h-2 bg-red-500/60" aria-hidden="true" />
                <span className="w-2 h-2 bg-yellow-500/60" aria-hidden="true" />
                <span className="w-2 h-2 bg-green-500/60" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-mono text-app-text-muted ml-1.5">resume.pdf</span>
              </div>
              <a href="/cv_koffi_levis_akalete.pdf" download
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 hover:bg-app-accent/5 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                  <FileText className="h-8 w-8 text-app-accent shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-mono text-app-text-white group-hover:text-app-accent transition-colors truncate">$ <span className="font-semibold">./download-cv.sh</span></p>
                    <p className="text-xs font-mono text-app-text-muted mt-0.5"># Curriculum Vitae — Format PDF</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-4 py-2 bg-app-accent/10 border border-app-accent/20 text-xs sm:text-sm font-mono text-app-accent hover:bg-app-accent/20 transition shrink-0 self-end sm:self-auto">
                  <Download className="h-4 w-4" />
                  Télécharger
                </span>
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-app-bg border border-app-border-subtle overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-app-darker border-b border-app-border-subtle">
                <span className="w-2 h-2 bg-red-500/60" aria-hidden="true" />
                <span className="w-2 h-2 bg-yellow-500/60" aria-hidden="true" />
                <span className="w-2 h-2 bg-green-500/60" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-mono text-app-text-muted ml-1.5">contact-form.sh</span>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-app-border-subtle/50">
                  <Terminal className="h-4 w-4 sm:h-5 sm:w-5 text-app-accent shrink-0" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-mono font-semibold text-app-text-white">
                      <span className="text-app-text-muted">root@portfolio</span>:<span className="text-app-accent">~</span>$ ./send-message
                    </h3>
                    <p className="text-[10px] sm:text-xs font-mono text-app-text-muted mt-0.5"># Je vous répondrai dans les plus brefs délais</p>
                  </div>
                </div>

                {submitSuccess && (
                  <div className="bg-emerald-900/15 border border-emerald-800/30 p-3 sm:p-4 mb-4 sm:mb-6 flex items-start gap-2 sm:gap-3 animate-fade-in">
                    <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm font-mono font-medium text-emerald-300">$ echo "Message envoyé avec succès !"</p>
                      <p className="text-[10px] sm:text-xs font-mono text-emerald-400/60 mt-0.5"># Je vous répondrai dès que possible.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-mono text-app-text-muted mb-1">
                        <span className="text-app-accent">$</span> NAME <span className="text-app-accent">*</span>
                      </label>
                      <input type="text" required value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-app-bg/50 border border-app-border-subtle px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-mono text-app-text-white placeholder-app-text-muted/50 focus:border-app-accent focus:ring-1 focus:ring-app-accent/10 focus:outline-none transition-all"
                        placeholder="Votre nom" />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-mono text-app-text-muted mb-1">
                        <span className="text-app-accent">$</span> EMAIL <span className="text-app-accent">*</span>
                      </label>
                      <input type="email" required value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-app-bg/50 border border-app-border-subtle px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-mono text-app-text-white placeholder-app-text-muted/50 focus:border-app-accent focus:ring-1 focus:ring-app-accent/10 focus:outline-none transition-all"
                        placeholder="votre@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-app-text-muted mb-1">
                      <span className="text-app-accent">$</span> WHATSAPP <span className="text-app-text-muted/50">(optionnel)</span>
                    </label>
                    <input type="tel" value={formData.whatsapp}
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full bg-app-bg/50 border border-app-border-subtle px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-mono text-app-text-white placeholder-app-text-muted/50 focus:border-app-accent focus:ring-1 focus:ring-app-accent/10 focus:outline-none transition-all"
                      placeholder="+227 XX XX XX XX" />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-app-text-muted mb-1">
                      <span className="text-app-accent">$</span> SUBJECT
                    </label>
                    <select value={formData.subject}
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-app-bg/50 border border-app-border-subtle px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-mono text-app-text-white focus:border-app-accent focus:ring-1 focus:ring-app-accent/10 focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-app-bg text-app-text-muted">Choisissez un sujet</option>
                      <option value="Collaboration / Projet" className="bg-app-bg">Collaboration / Projet</option>
                      <option value="Offre de stage / Emploi" className="bg-app-bg">Offre de stage / Emploi</option>
                      <option value="Mission Freelance" className="bg-app-bg">Mission Freelance</option>
                      <option value="Demande d'information" className="bg-app-bg">Demande d'information</option>
                      <option value="Soutien technique / Bug" className="bg-app-bg">Soutien technique / Bug</option>
                      <option value="Proposition de partenariat" className="bg-app-bg">Proposition de partenariat</option>
                      <option value="Review de code" className="bg-app-bg">Review de code</option>
                      <option value="Contribution open-source" className="bg-app-bg">Contribution open-source</option>
                      <option value="Mentorat / Coaching" className="bg-app-bg">Mentorat / Coaching</option>
                      <option value="Invitation à un événement" className="bg-app-bg">Invitation à un événement</option>
                      <option value="Demande de démo / Présentation" className="bg-app-bg">Demande de démo / Présentation</option>
                      <option value="Discussion technique" className="bg-app-bg">Discussion technique</option>
                      <option value="Suggestion d'amélioration" className="bg-app-bg">Suggestion d'amélioration</option>
                      <option value="Signaler un problème" className="bg-app-bg">Signaler un problème</option>
                      <option value="Autre" className="bg-app-bg">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-mono text-app-text-muted mb-1">
                      <span className="text-app-accent">$</span> MESSAGE <span className="text-app-accent">*</span>
                    </label>
                    <textarea required rows={4} value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-app-bg/50 border border-app-border-subtle px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm font-mono text-app-text-white placeholder-app-text-muted/50 focus:border-app-accent focus:ring-1 focus:ring-app-accent/10 focus:outline-none transition-all resize-none"
                      placeholder="Votre message..." />
                  </div>
                  <button type="submit" disabled={isSubmitting}
                    className="w-full py-3 sm:py-3.5 bg-app-accent/10 border border-app-accent/20 font-mono text-xs sm:text-sm text-app-accent hover:bg-app-accent/20 transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="text-app-text-muted">$</span> {isSubmitting ? "./send --processing" : "./send --execute"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Right column — Infos contact + Social */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-app-bg border border-app-border-subtle overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-app-darker border-b border-app-border-subtle">
                <span className="w-2 h-2 bg-red-500/60" aria-hidden="true" />
                <span className="w-2 h-2 bg-yellow-500/60" aria-hidden="true" />
                <span className="w-2 h-2 bg-green-500/60" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-mono text-app-text-muted ml-1.5">contact-info</span>
              </div>
              <div className="p-4 sm:p-6 space-y-4">
                <div className="space-y-3 text-xs sm:text-sm font-mono text-app-text-muted">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-app-accent/60 shrink-0" />
                    <span>{profile.location}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-app-accent/60 shrink-0" />
                    <span>{profile.phone || profile.socials.whatsapp}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-app-accent/60 shrink-0" />
                    <span>{profile.socials.email}</span>
                  </span>
                </div>

                <div className="border-t border-app-border-subtle pt-4">
                  <p className="text-[10px] sm:text-xs font-mono text-app-text-muted mb-3">
                    <span className="text-app-accent">$</span> cat certifications.md
                  </p>
                  <a
                    href="https://www.freecodecamp.org/certification/akalete_koffi_levis/foundational-c-sharp-with-microsoft"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 p-3 border border-app-border-subtle hover:border-app-accent/30 hover:bg-app-accent/5 transition-all"
                  >
                    <FileText className="h-4 w-4 text-app-accent shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-app-text-white truncate">Foundational C# with Microsoft</p>
                      <p className="text-[10px] font-mono text-app-text-muted">freeCodeCamp — Certificat vérifié</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-app-bg border border-app-border-subtle overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-app-darker border-b border-app-border-subtle">
                <span className="w-2 h-2 bg-red-500/60" aria-hidden="true" />
                <span className="w-2 h-2 bg-yellow-500/60" aria-hidden="true" />
                <span className="w-2 h-2 bg-green-500/60" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs font-mono text-app-text-muted ml-1.5">social-links</span>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith("mailto") ? undefined : "_blank"}
                        rel="noreferrer"
                        className="flex items-center gap-2 p-3 border border-app-border-subtle text-app-text-muted hover:border-app-accent hover:text-app-accent hover:bg-app-accent/5 transition-all duration-200"
                        title={link.label}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-xs font-mono">{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

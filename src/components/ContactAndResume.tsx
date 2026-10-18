import { useEffect, useRef, useState, type FormEvent, type ComponentType } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { useT } from "../i18n";
import {
  Send, CheckCircle2, Mail, FileText, Download, Github, Linkedin, Loader2,
  MapPin, Phone, Clock, AlertCircle,
} from "lucide-react";
import TiltCard from "./TiltCard";

/** Icône WhatsApp (Lucide n'en fournit pas d'officielle). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const MAX_MESSAGE = 600;

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type IconType = ComponentType<{ className?: string }>;

const BASE_FIELD =
  "w-full bg-transparent border px-3.5 py-3 text-sm text-app-text-white placeholder:text-app-text-muted/70 transition-colors " +
  "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-accent";

const fieldClass = (invalid?: string, extra = "") =>
  `${BASE_FIELD} ${invalid ? "border-alert-err-border" : "border-app-hairline focus:border-app-accent"} ${extra}`;

/** Message d'erreur de champ, relié par `aria-describedby` + annoncé par le lecteur d'écran. */
function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs text-alert-err">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" /> {msg}
    </p>
  );
}

export default function ContactAndResume() {
  const { profile } = usePortfolio();
  const t = useT();

  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", whatsapp: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formTimestamp] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");
  const phone = profile.phone || profile.socials.whatsapp || "";
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

  const validate = (d: typeof formData): Errors => {
    const e: Errors = {};
    if (!d.name.trim()) e.name = t.contact.errName;
    if (!d.email.trim()) e.email = t.contact.errEmail;
    else if (!emailOk(d.email)) e.email = t.contact.errEmailInvalid;
    if (!d.message.trim()) e.message = t.contact.errMessage;
    return e;
  };

  /** Met à jour un champ et revalide en direct si le champ a déjà été visité. */
  const setField = (key: keyof typeof formData, value: string) => {
    const next = { ...formData, [key]: value };
    setFormData(next);
    if (touched[key]) setErrors(validate(next));
  };

  const blur = (key: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(formData));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(formData);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });

    if (found.name) { nameRef.current?.focus(); return; }
    if (found.email) { emailRef.current?.focus(); return; }
    if (found.message) { messageRef.current?.focus(); return; }

    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _hp: honeypot, _ts: formTimestamp }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "", whatsapp: "" });
        setTouched({});
        setTimeout(() => setSubmitSuccess(false), 8000);
      } else {
        setSubmitError(data.error || t.contact.fallbackError);
      }
    } catch {
      setSubmitError(t.contact.netError);
    }
    setIsSubmitting(false);
  };

  /** Déplace le focus sur la confirmation : retour clair pour les lecteurs d'écran. */
  useEffect(() => {
    if (submitSuccess) statusRef.current?.focus();
  }, [submitSuccess]);

  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  const waHref = profile.socials.whatsapp
    ? `https://wa.me/${profile.socials.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(t.contact.whatsappMsg)}`
    : "";

  const channels: { key: string; label: string; value: string; href: string; icon: IconType; external: boolean }[] = [
    { key: "email", label: t.contact.email, value: profile.socials.email, href: `mailto:${profile.socials.email}`, icon: Mail, external: false },
    { key: "phone", label: t.contact.phone, value: phone, href: telHref, icon: Phone, external: false },
    ...(waHref
      ? [{ key: "whatsapp", label: t.contact.whatsapp, value: profile.socials.whatsapp || "", href: waHref, icon: WhatsAppIcon, external: true }]
      : []),
  ];

  const socials: { label: string; href: string; icon: IconType }[] = [
    { label: "GitHub", href: profile.socials.github, icon: Github },
    { label: "LinkedIn", href: profile.socials.linkedin, icon: Linkedin },
    { label: "Email", href: `mailto:${profile.socials.email}`, icon: Mail },
    ...(waHref ? [{ label: "WhatsApp", href: waHref, icon: WhatsAppIcon }] : []),
  ];

  const messageLen = formData.message.length;

  return (
    <section className="py-16 sm:py-24 relative" id="contact-resume-section">
      <div className="wrap relative">
        <div className="grid12 row-gap-14">
          {/* ══ 01 · FORMULAIRE ══ */}
          <div className="col-span-full lg:col-span-7 lg:border-r lg:border-app-hairline lg:pr-10">
            <p className="folio mb-6">{t.contact.formHint}</p>

            {submitSuccess && (
              <div
                ref={statusRef}
                tabIndex={-1}
                role="status"
                aria-live="polite"
                className="border border-alert-ok-border bg-alert-ok-bg px-4 py-4 mb-7 flex items-start gap-3 focus:outline-none"
              >
                <CheckCircle2 className="h-5 w-5 text-alert-ok shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-alert-ok">{t.contact.successTitle}</p>
                  <p className="text-xs text-alert-ok/70 mt-1">{t.contact.successSub}</p>
                </div>
              </div>
            )}

            {submitError && (
              <div
                role="alert"
                className="border border-alert-err-border bg-alert-err-bg px-4 py-4 mb-7 flex items-start gap-3"
              >
                <AlertCircle className="h-5 w-5 text-alert-err shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-medium text-alert-err">{submitError}</p>
                  <p className="text-xs text-alert-err/70 mt-1">{t.contact.errorSub}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5 relative">
              {/* Piège anti-spam : hors flux visuel, ignoré des technologies d'assistance. */}
              <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                <label htmlFor="_hp">{t.contact.honeypotLabel}</label>
                <input id="_hp" type="text" name="_hp" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="kicker block mb-2">
                    {t.contact.name} <span className="text-app-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={nameRef}
                    id="contact-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setField("name", e.target.value)}
                    onBlur={() => blur("name")}
                    className={fieldClass(errors.name)}
                    placeholder={t.contact.yourName}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                  />
                  <FieldError id="contact-name-error" msg={errors.name} />
                </div>

                <div>
                  <label htmlFor="contact-email" className="kicker block mb-2">
                    {t.contact.email} <span className="text-app-accent" aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={emailRef}
                    id="contact-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onBlur={() => blur("email")}
                    className={fieldClass(errors.email)}
                    placeholder={t.contact.yourEmail}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                  />
                  <FieldError id="contact-email-error" msg={errors.email} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-whatsapp" className="kicker block mb-2">
                    {t.contact.whatsapp} <span className="opacity-70">{t.contact.optional}</span>
                  </label>
                  <input
                    id="contact-whatsapp"
                    type="tel"
                    autoComplete="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setField("whatsapp", e.target.value)}
                    className={fieldClass()}
                    placeholder={t.contact.yourWhatsapp}
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="kicker block mb-2">{t.contact.subject}</label>
                  <select
                    id="contact-subject"
                    value={formData.subject}
                    onChange={(e) => setField("subject", e.target.value)}
                    className={fieldClass(undefined, "appearance-none cursor-pointer")}
                  >
                    <option value="" disabled className="bg-app-bg text-app-text-muted">{t.contact.chooseSubject}</option>
                    {t.contact.subjects.map((s) => (
                      <option key={s} value={s} className="bg-app-bg">{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <label htmlFor="contact-message" className="kicker">
                    {t.contact.message} <span className="text-app-accent" aria-hidden="true">*</span>
                  </label>
                  <span
                    className={`folio tabular-nums ${messageLen > MAX_MESSAGE ? "text-alert-err" : ""}`}
                    aria-hidden="true"
                  >
                    {messageLen}/{MAX_MESSAGE}
                  </span>
                </div>
                <textarea
                  ref={messageRef}
                  id="contact-message"
                  required
                  rows={6}
                  maxLength={MAX_MESSAGE}
                  value={formData.message}
                  onChange={(e) => setField("message", e.target.value)}
                  onBlur={() => blur("message")}
                  className={fieldClass(errors.message, "resize-y min-h-32")}
                  placeholder={t.contact.yourMessage}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "contact-message-error" : "contact-message-hint"}
                />
                <FieldError id="contact-message-error" msg={errors.message} />
                {!errors.message && <p id="contact-message-hint" className="folio mt-1.5">{t.contact.messageMax}</p>}
              </div>

              <div className="flex items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto min-h-11 px-7 py-3 bg-app-accent text-app-bg text-sm font-semibold tracking-wide hover:bg-app-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
                  {isSubmitting ? t.contact.sending : t.contact.send}
                </button>
                <span className="folio hidden sm:flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-app-accent" aria-hidden="true" /> {t.contact.replyTime}
                </span>
              </div>
            </form>
          </div>

          {/* ══ 02 · COORDONNÉES / 03 · RÉSEAUX / CV ══ */}
          <aside className="col-span-full lg:col-span-4 lg:col-start-9 space-y-10">
            <div>
              <div className="border-t-2 border-app-rule pt-3 flex items-baseline gap-3 mb-5">
                <span className="font-mono text-xs font-semibold text-app-accent tabular-nums">02</span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-app-text-white">{t.contact.details}</h3>
              </div>

              <ul className="divide-y divide-app-hairline border-y border-app-hairline">
                {channels.map((c) => {
                  const Icon = c.icon;
                  return (
                    <li key={c.key} className="flex items-center gap-3 py-3.5">
                      <Icon className="h-4 w-4 text-app-accent/70 shrink-0" aria-hidden="true" />
                      <span className="sr-only">{c.label} :</span>
                      <a
                        href={c.href}
                        target={c.external ? "_blank" : undefined}
                        rel={c.external ? "noreferrer" : undefined}
                        className="flex-1 min-w-0 text-sm text-app-text-body hover:text-app-accent transition-colors break-all"
                      >
                        {c.value}
                      </a>
                    </li>
                  );
                })}

                <li className="flex items-center gap-3 py-3.5">
                  <MapPin className="h-4 w-4 text-app-accent/70 shrink-0" aria-hidden="true" />
                  <span className="sr-only">{t.contact.details} :</span>
                  <span className="flex-1 min-w-0 text-sm text-app-text-body">{profile.location}</span>
                  <span className="folio shrink-0">{t.contact.timezone}</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="border-t-2 border-app-rule pt-3 flex items-baseline gap-3 mb-5">
                <span className="font-mono text-xs font-semibold text-app-accent tabular-nums">03</span>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-app-text-white">{t.contact.socials}</h3>
              </div>
              <div className="grid grid-cols-2 gap-px bg-app-hairline border border-app-hairline">
                {socials.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noreferrer"
                      className="flex items-center gap-2.5 min-h-11 p-3.5 bg-app-bg text-app-text-muted hover:text-app-accent transition-colors"
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span className="text-xs font-medium">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <TiltCard>
              <a
                href="/cv_koffi_levis_akalete.pdf"
                download
                className="group flex items-center justify-between gap-4 border border-app-hairline hover:border-app-accent/50 p-4 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <FileText className="h-7 w-7 text-app-accent shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-app-text-white group-hover:text-app-accent transition-colors">{t.contact.cvTitle}</p>
                    <p className="folio mt-0.5">{t.contact.cvDesc}</p>
                  </div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-2 border border-app-border-sec px-3.5 py-2.5 text-xs font-semibold text-app-text-white group-hover:border-app-accent group-hover:text-app-accent transition-colors">
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  {t.contact.download}
                </span>
              </a>
            </TiltCard>
          </aside>
        </div>

        {/* ══ CE QUI SE PASSE ENSUITE ══ */}
        <div className="mt-16 pt-10 border-t border-app-hairline">
          <div className="border-t-2 border-app-rule pt-3 mb-8">
            <h2 className="h-section text-app-text-white" data-optical>{t.contact.nextTitle}</h2>
          </div>
          <ol className="grid12 row-gap-8">
            {t.contact.nextSteps.map((step, i) => (
              <li key={step} className="col-span-full md:col-span-4 flex items-start gap-4">
                <span className="font-mono text-2xl font-bold text-app-accent/70 tabular-nums leading-none pt-0.5">
                  {i + 1}.
                </span>
                <p className="text-sm text-app-text-body leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

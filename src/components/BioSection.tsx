import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import { Mail, Linkedin, Github, MapPin, FileDown, ArrowRight } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function BioSection() {
  const { profile } = usePortfolio();

  return (
    <section className="pt-14 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 border-b border-app-hairline scroll-mt-20 relative" id="bio-section">
      <div className="wrap relative">

        <div className="grid12 row-gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="col-span-full flex items-center gap-4 flex-wrap"
          >
            <span className="kicker !text-app-accent">Portfolio — {profile.location.split("/")[0].trim()}</span>
            <span className="h-px flex-1 bg-app-hairline min-w-8 hidden sm:block" aria-hidden="true" />
            <span className="flex items-center gap-2 folio">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
              Disponible pour missions
            </span>
          </motion.div>

          <div className="col-span-full md:col-span-8 pt-6 sm:pt-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="display-hero text-app-text-white"
              data-optical
            >
              Koffi Lévis<br />Akalete<span className="cursor-blink" aria-hidden="true" />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 sm:mt-8 text-base sm:text-lg font-medium text-app-text-body max-w-xl leading-relaxed"
            >
              Développeur Full Stack Junior — <span className="text-app-accent">C#, .NET, Blazor</span>.
              Ambassadeur 10000 CODEURS, étudiant en Mathématiques-Informatique à Niamey.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact-resume-section"
                className="inline-flex items-center gap-2 px-5 py-3 bg-app-accent text-app-bg text-sm font-semibold tracking-wide hover:bg-app-accent-dark transition-colors"
              >
                Me contacter <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/cv_koffi_levis_akalete.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-3 border border-app-border-sec text-sm font-semibold tracking-wide text-app-text-white hover:border-app-accent hover:text-app-accent transition-colors"
              >
                <FileDown className="w-4 h-4" aria-hidden="true" /> Télécharger le CV
              </a>
              <div className="flex items-center gap-1 ml-0 sm:ml-2">
                <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label={`GitHub de ${profile.name}`}
                  className="p-2.5 text-app-text-muted hover:text-app-accent transition-colors">
                  <Github className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
                <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label={`LinkedIn de ${profile.name}`}
                  className="p-2.5 text-app-text-muted hover:text-app-accent transition-colors">
                  <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
                <a href={`mailto:${profile.socials.email}`} aria-label={`Envoyer un email à ${profile.name}`}
                  className="p-2.5 text-app-text-muted hover:text-app-accent transition-colors">
                  <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
                {profile.socials.whatsapp && (
                  <a href={`https://wa.me/${profile.socials.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank" rel="noreferrer" aria-label={`WhatsApp de ${profile.name}`}
                    className="p-2.5 text-app-text-muted hover:text-emerald-600 transition-colors">
                    <WhatsAppIcon className="h-[18px] w-[18px]" />
                  </a>
                )}
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="folio mt-8 flex items-center gap-1.5"
            >
              <MapPin className="w-3 h-3 text-app-accent/70 shrink-0" aria-hidden="true" /> {profile.location}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="col-span-full md:col-span-4 md:col-start-9 mt-12 md:mt-10 max-w-[340px] md:max-w-none md:justify-self-end w-full"
          >
            <figure>
              <div className="border border-app-hairline p-2 bg-app-card">
                <img
                  src={profile.avatarUrl}
                  alt={`Portrait de ${profile.name}, développeur Full Stack basé à Niamey`}
                  className="w-full aspect-square object-cover grayscale-[35%]"
                />
              </div>
              <figcaption className="folio mt-2.5 flex justify-between">
                <span>fig. 01 — portrait</span>
                <span>Niamey, NE</span>
              </figcaption>
            </figure>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="grid12 border-t border-app-hairline mt-14 sm:mt-20"
        >
          {profile.metrics.map((m, idx) => (
            <div
              key={idx}
              className={`col-span-full sm:col-span-4 py-6 sm:py-8 border-t border-app-hairline ${
                idx > 0 ? "sm:border-l sm:border-t-0 sm:border-app-hairline" : "sm:border-t-0"
              } ${idx > 0 ? "sm:pl-8" : ""} ${idx < 2 ? "sm:pr-8" : ""}`}
            >
              <div className="numeral-xl">{m.value}</div>
              <div className="kicker mt-3">{m.label}</div>
              <div className="text-xs sm:text-[13px] text-app-text-muted mt-1.5">{m.desc}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="grid12 mt-4 sm:mt-8"
        >
          <p className="col-span-full lg:col-span-9 text-sm sm:text-[15px] leading-[1.85] text-app-text-soft">
            {profile.bio}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

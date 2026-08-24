import { useState } from "react";
import { motion } from "motion/react";
import { Award, FileText, ExternalLink, ImageOff } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import type { Certification } from "../types";
import SectionHead from "./SectionHead";

function CertImage({ cert }: { cert: Certification }) {
  const [error, setError] = useState(false);
  const href = cert.url || cert.file;

  if (error) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 h-40 bg-app-darker border border-app-hairline hover:border-app-accent/40 transition-colors">
        <ImageOff className="h-7 w-7 text-app-accent/50" aria-hidden="true" />
        <span className="folio">Aperçu indisponible</span>
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir le certificat ${cert.title}`} className="block overflow-hidden border border-app-hairline group/img">
      <img
        src={cert.file}
        alt={`Certificat ${cert.title} — ${cert.issuer}`}
        className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
        loading="lazy"
        onError={() => setError(true)}
      />
    </a>
  );
}

export default function CertificationsSection() {
  const { certifications } = usePortfolio();

  return (
    <section className="py-20 sm:py-28 border-b border-app-hairline scroll-mt-20 relative" id="certifications-section">
      <div className="wrap relative">
        <SectionHead num="04" title="Certifications" meta={`${certifications.length} formations certifiées`} />

        <div className="grid12 row-gap-10 gap-y-10">
          {certifications.map((cert, idx) => {
            const href = cert.url || cert.file;
            return (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: (idx % 3) * 0.07 }}
                className={`col-span-full md:col-span-6 xl:col-span-4 flex flex-col ${
                  idx % 3 !== 0 ? "xl:border-l xl:border-app-hairline xl:pl-8" : ""
                }`}
              >
                {cert.kind === "image" ? (
                  <CertImage cert={cert} />
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 h-44 bg-app-darker border border-app-hairline hover:border-app-accent/40 transition-colors group/pdf">
                    <FileText className="h-8 w-8 text-app-text-muted group-hover/pdf:text-app-accent transition-colors" aria-hidden="true" />
                    <span className="folio">Document PDF</span>
                  </a>
                )}

                <div className="pt-4 flex flex-col flex-1">
                  <div className="folio flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-app-accent">
                      <Award className="h-3 w-3" aria-hidden="true" />
                      {cert.issuer}
                    </span>
                    <span>{cert.date}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold tracking-tight text-app-text-white leading-snug mt-2.5">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-app-accent transition-colors">{cert.title}</a>
                  </h3>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-mono text-app-text-muted hover:text-app-accent transition-colors"
                  >
                    {cert.url ? "Vérifier le certificat" : "Voir le PDF"} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

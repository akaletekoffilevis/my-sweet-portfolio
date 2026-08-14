import { useState } from "react";
import { motion } from "motion/react";
import { Award, FileText, ExternalLink, ImageOff } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import type { Certification } from "../types";

function CertImage({ cert }: { cert: Certification }) {
  const [error, setError] = useState(false);
  const href = cert.url || cert.file;

  if (error) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 py-12 sm:py-14 bg-app-darker hover:bg-app-accent/5 transition-colors">
        <ImageOff className="h-10 w-10 text-app-accent/40" aria-hidden="true" />
        <div>
          <p className="text-xs font-mono font-semibold text-app-text-white">Aperçu indisponible</p>
          <p className="text-[10px] font-mono text-app-text-muted">Cliquez pour ouvrir le document</p>
        </div>
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Ouvrir le certificat ${cert.title}`} className="block overflow-hidden">
      <img
        src={cert.file}
        alt={`Certificat ${cert.title} — ${cert.issuer}`}
        className="w-full object-cover max-h-44 sm:max-h-52 transition-transform duration-500 hover:scale-[1.02]"
        loading="lazy"
        onError={() => setError(true)}
      />
    </a>
  );
}

export default function CertificationsSection() {
  const { certifications } = usePortfolio();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-app-border-subtle scroll-mt-20" id="certifications-section">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="section-title mb-2">Certifications</h2>
        <p className="section-subtitle mb-6 sm:mb-10">Mes formations certifiées</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {certifications.map((cert, idx) => {
            const href = cert.url || cert.file;
            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: (idx % 3) * 0.07 }}
                className="bg-app-bg border border-app-border-subtle hover:border-app-accent/30 transition-all duration-300 overflow-hidden"
              >
                {cert.kind === "image" ? (
                  <CertImage cert={cert} />
                ) : (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 py-12 sm:py-14 bg-app-darker hover:bg-app-accent/5 transition-colors">
                    <FileText className="h-10 w-10 text-app-accent" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-mono font-semibold text-app-text-white">Document PDF</p>
                      <p className="text-[10px] font-mono text-app-text-muted">Disponible en téléchargement</p>
                    </div>
                  </a>
                )}

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-app-accent mb-1.5">
                    <Award className="h-3 w-3" aria-hidden="true" />
                    {cert.issuer}
                  </div>
                  <h3 className="text-xs sm:text-sm font-semibold text-app-text-white leading-snug mb-1.5">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-app-accent transition">{cert.title}</a>
                  </h3>
                  <p className="text-[10px] sm:text-xs text-app-text-muted mb-3">{cert.date}</p>

                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-app-accent hover:underline transition"
                  >
                    {cert.url ? "Vérifier le certificat" : "Voir le PDF"} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { Award, FileText, ExternalLink } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

export default function CertificationsSection() {
  const { certifications } = usePortfolio();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 border-b border-app-border-subtle scroll-mt-20" id="certifications-section">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="section-title mb-2">Certifications</h2>
        <p className="section-subtitle mb-6 sm:mb-10">Mes formations certifiées</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {certifications.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: (idx % 3) * 0.07 }}
              className="bg-app-bg border border-app-border-subtle hover:border-app-accent/20 transition-all duration-300 overflow-hidden"
            >
              {cert.kind === "image" ? (
                <img
                  src={cert.file}
                  alt={`Certificat ${cert.title} — ${cert.issuer}`}
                  className="w-full object-cover max-h-44 sm:max-h-52"
                  loading="lazy"
                />
              ) : (
                <div className="flex items-center justify-center gap-3 py-12 sm:py-14 bg-app-darker">
                  <FileText className="h-10 w-10 text-app-accent" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-mono font-semibold text-app-text-white">Document PDF</p>
                    <p className="text-[10px] font-mono text-app-text-muted">Disponible en téléchargement</p>
                  </div>
                </div>
              )}

              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-app-accent mb-1.5">
                  <Award className="h-3 w-3" aria-hidden="true" />
                  {cert.issuer}
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-app-text-white leading-snug mb-1.5">{cert.title}</h3>
                <p className="text-[10px] sm:text-xs text-app-text-muted mb-3">{cert.date}</p>

                {cert.kind === "image" && cert.url ? (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-app-accent hover:text-app-accent-dark transition"
                  >
                    Vérifier le certificat <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                ) : (
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-app-accent hover:text-app-accent-dark transition"
                  >
                    Voir le PDF <FileText className="h-3 w-3" aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

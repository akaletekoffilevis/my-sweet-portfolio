import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, FileText, ExternalLink, ImageOff, X, ChevronLeft, ChevronRight } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import { useT, tpl } from "../i18n";
import { useTilt } from "../hooks/useTilt";
import type { Certification } from "../types";
import SectionHead from "./SectionHead";
import { PdfThumb, PdfDocument } from "./PdfPreview";

const isPdf = (c: Certification) => c.kind === "pdf" || /\.pdf($|\?)/i.test(c.file);

/** Vignette cliquable d'un certificat : vraie image, ou page 1 du PDF rendue par pdf.js. */
function CertThumb({ cert, onOpen }: { cert: Certification; onOpen: () => void }) {
  const [error, setError] = useState(false);
  const t = useT();
  const label = tpl(t.certs.openCertAria, { title: cert.title });
  const alt = tpl(t.certs.alt, { title: cert.title, issuer: cert.issuer });

  // ── PDF : aperçu réel de la première page (squelette pendant le rendu) ──
  if (isPdf(cert) && !error) {
    return (
      <button
        onClick={onOpen}
        className="relative block w-full h-44 overflow-hidden border border-app-hairline bg-app-darker hover:border-app-accent/40 transition-colors cursor-pointer group/img"
        aria-label={label}
      >
        <PdfThumb
          src={cert.file}
          alt={alt}
          onError={() => setError(true)}
          className="absolute inset-x-0 top-0 w-full h-auto transition-transform duration-500 group-hover/img:scale-[1.02]"
        />
        <span className="absolute left-2 bottom-2 z-10 inline-flex items-center gap-1.5 px-2 py-1 bg-app-bg/90 border border-app-hairline folio">
          <FileText className="h-3 w-3 text-app-accent" aria-hidden="true" /> PDF
        </span>
      </button>
    );
  }

  if (error) {
    return (
      <button
        onClick={onOpen}
        className="w-full flex items-center justify-center gap-3 h-44 bg-app-darker border border-app-hairline hover:border-app-accent/40 transition-colors cursor-pointer group/pdf"
        aria-label={label}
      >
        <ImageOff className="h-8 w-8 text-app-text-muted group-hover/pdf:text-app-accent transition-colors" aria-hidden="true" />
        <span className="folio">{t.certs.previewUnavailable}</span>
      </button>
    );
  }

  return (
    <button onClick={onOpen} className="block w-full overflow-hidden border border-app-hairline group/img cursor-pointer" aria-label={label}>
      <img
        src={cert.file}
        alt={alt}
        className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
        loading="lazy"
        onError={() => setError(true)}
      />
    </button>
  );
}

/** Lightbox plein écran : aperçu du certificat (image ou PDF) avec navigation. */
function CertLightbox({
  certs,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  certs: Certification[];
  index: number;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = useT();
  const cert = certs[index];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev?.();
      else if (e.key === "ArrowRight") onNext?.();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose, onPrev, onNext]);

  if (!cert) return null;
  const href = cert.url || cert.file;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 print:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={tpl(t.certs.openCertAria, { title: cert.title })}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 26, rotateX: 3 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        exit={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1200 }}
        className="relative w-full sm:max-w-3xl max-h-[94vh] sm:max-h-[90vh] flex flex-col bg-app-bg border border-app-border-sec shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-app-hairline">
          <div className="min-w-0">
            <span className="kicker block truncate">{t.certs.lightboxTitle} — {cert.issuer} · {cert.date}</span>
            <h3 className="text-sm sm:text-base font-semibold text-app-text-white truncate">{cert.title}</h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onPrev && (
              <button
                onClick={onPrev}
                className="p-2 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-app-accent transition cursor-pointer"
                aria-label={t.certs.prev}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            {onNext && (
              <button
                onClick={onNext}
                className="p-2 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-app-accent transition cursor-pointer"
                aria-label={t.certs.next}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
            <button
              ref={closeRef}
              onClick={onClose}
              className="p-2 border border-app-hairline text-app-text-muted hover:text-app-accent hover:border-app-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-app-accent transition cursor-pointer"
              aria-label={t.certs.lightboxClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto bg-app-darker">
          {isPdf(cert) ? (
            <PdfDocument
              src={cert.file}
              alt={tpl(t.certs.alt, { title: cert.title, issuer: cert.issuer })}
              fallback={
                <div className="h-[65vh] sm:h-[72vh] flex flex-col items-center justify-center gap-3 text-app-text-muted">
                  <ImageOff className="h-8 w-8 text-app-accent/50" aria-hidden="true" />
                  <span className="folio">{t.certs.previewUnavailable}</span>
                  <a
                    href={cert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-app-accent hover:underline"
                  >
                    {t.certs.viewPdf} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              }
            />
          ) : (
            <img
              src={cert.file}
              alt={tpl(t.certs.alt, { title: cert.title, issuer: cert.issuer })}
              className="w-full h-auto max-h-[72vh] object-contain mx-auto"
            />
          )}
        </div>

        <div className="px-4 sm:px-6 py-3 border-t border-app-hairline flex justify-end gap-5">
          <a
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-app-text-muted hover:text-app-accent transition-colors"
          >
            {t.certs.viewPdf} <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
          {cert.url && (
            <a
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-app-text-muted hover:text-app-accent transition-colors"
            >
              {t.certs.verify} <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Carte certification : tilt 3D + halo, ouvre la lightbox. */
function CertCard({ cert, idx, onOpen }: { cert: Certification; idx: number; onOpen: () => void }) {
  const t = useT();
  const tilt = useTilt<HTMLDivElement>();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: (idx % 3) * 0.07 }}
      className={`col-span-full md:col-span-6 xl:col-span-4 flex flex-col ${
        idx % 3 !== 0 ? "xl:border-l xl:border-app-hairline xl:pl-8" : ""
      }`}
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="tilt-layer group flex flex-col flex-1"
      >
        <CertThumb cert={cert} onOpen={onOpen} />

        <div className="pt-4 flex flex-col flex-1">
          <div className="folio flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-app-accent">
              <Award className="h-3 w-3" aria-hidden="true" />
              {cert.issuer}
            </span>
            <span>{cert.date}</span>
          </div>
          <h3 className="text-[15px] font-semibold tracking-tight text-app-text-white leading-snug mt-2.5">
            <button onClick={onOpen} className="text-left hover:text-app-accent transition-colors cursor-pointer">
              {cert.title}
            </button>
          </h3>
          <button
            onClick={onOpen}
            className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-mono text-app-text-muted hover:text-app-accent transition-colors cursor-pointer text-left"
          >
            {cert.url ? t.certs.verify : t.certs.viewPdf} <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function CertificationsSection() {
  const { certifications } = usePortfolio();
  const t = useT();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 border-b border-app-hairline scroll-mt-20 relative" id="certifications-section">
      <div className="wrap relative">
        <SectionHead num="04" title={t.nav.certifications} meta={t.certs.meta} />

        <div className="grid12 row-gap-10 gap-y-10">
          {certifications.map((cert, idx) => (
            <CertCard key={cert.id} cert={cert} idx={idx} onOpen={() => setOpenIdx(idx)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openIdx !== null && (
          <CertLightbox
            certs={certifications}
            index={openIdx}
            onClose={() => setOpenIdx(null)}
            onPrev={openIdx > 0 ? () => setOpenIdx(openIdx - 1) : undefined}
            onNext={openIdx < certifications.length - 1 ? () => setOpenIdx(openIdx + 1) : undefined}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

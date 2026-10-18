import { useEffect, useState, type ReactNode } from "react";
import type * as pdfjsNS from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { FileText } from "lucide-react";

/** pdf.js chargé à la demande (uniquement quand un certificat PDF est affiché). */
let pdfjsReady: Promise<typeof pdfjsNS> | null = null;
function getPdfjs(): Promise<typeof pdfjsNS> {
  if (!pdfjsReady) {
    pdfjsReady = import("pdfjs-dist").then((m) => {
      m.GlobalWorkerOptions.workerSrc = workerUrl;
      return m;
    });
  }
  return pdfjsReady;
}

/** Cache page 1 -> dataURL (évite de re-rendre le même PDF à chaque visite). */
const thumbCache = new Map<string, string>();

/** Rend une page PDF dans un canvas puis la sérialise en image. */
async function renderPage(page: pdfjsNS.PDFPageProxy, targetWidth: number): Promise<string> {
  const base = page.getViewport({ scale: 1 });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const viewport = page.getViewport({ scale: (targetWidth / base.width) * dpr });
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas 2d indisponible");
  await page.render({ canvas, viewport }).promise;
  const url = canvas.toDataURL("image/png");
  canvas.width = 0;
  canvas.height = 0;
  return url;
}

async function loadThumb(src: string, width = 900): Promise<string> {
  const cached = thumbCache.get(src);
  if (cached) return cached;
  const pdfjs = await getPdfjs();
  const task = pdfjs.getDocument({ url: src });
  const doc = await task.promise;
  try {
    const url = await renderPage(await doc.getPage(1), width);
    thumbCache.set(src, url);
    return url;
  } finally {
    void task.destroy();
  }
}

/**
 * Vignette PDF : affiche réellement la première page du document
 * (squelette pendant le rendu, `onError` si le PDF est illisible).
 */
export function PdfThumb({
  src,
  alt,
  className = "",
  onError,
}: {
  src: string;
  alt: string;
  className?: string;
  onError?: () => void;
}) {
  const [url, setUrl] = useState<string | null>(() => thumbCache.get(src) ?? null);

  useEffect(() => {
    if (url) return;
    let cancelled = false;
    loadThumb(src)
      .then((u) => {
        if (!cancelled) setUrl(u);
      })
      .catch(() => {
        if (!cancelled) onError?.();
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, url]);

  if (!url) {
    return (
      <div className={`absolute inset-0 flex items-center justify-center gap-3 bg-app-darker ${className}`} aria-hidden="true">
        <FileText className="h-8 w-8 text-app-text-muted/50 animate-pulse" />
        <span className="folio">PDF…</span>
      </div>
    );
  }

  return <img src={url} alt={alt} className={className} loading="lazy" />;
}

/**
 * Document PDF complet pour la lightbox : rend chaque page en progression
 * (la page 1 apparaît immédiatement), avec repli localisé en cas d'échec.
 */
export function PdfDocument({
  src,
  alt,
  fallback,
}: {
  src: string;
  alt: string;
  fallback: ReactNode;
}) {
  const [pages, setPages] = useState<string[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await getPdfjs();
        const task = pdfjs.getDocument({ url: src });
        const doc = await task.promise;
        if (cancelled) {
          void task.destroy();
          return;
        }
        setTotal(doc.numPages);
        for (let i = 1; i <= doc.numPages; i++) {
          const page = await doc.getPage(i);
          const url = await renderPage(page, 1400);
          if (cancelled) {
            void task.destroy();
            return;
          }
          setPages((prev) => [...prev, url]);
        }
        void task.destroy();
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (failed) return <>{fallback}</>;

  if (pages.length === 0) {
    return (
      <div className="h-[65vh] sm:h-[72vh] flex flex-col items-center justify-center gap-3 text-app-text-muted" role="status">
        <FileText className="h-9 w-9 animate-pulse" aria-hidden="true" />
        <span className="folio">rendu du PDF…</span>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-5 space-y-4" role="status" aria-live="polite" aria-label={alt}>
      {pages.map((p, i) => (
        <img
          key={i}
          src={p}
          alt={`${alt} — page ${i + 1}${total ? `/${total}` : ""}`}
          className="w-full h-auto bg-white border border-app-hairline"
        />
      ))}
      {total !== null && pages.length < total && (
        <p className="folio text-center">
          {pages.length}/{total}
        </p>
      )}
    </div>
  );
}

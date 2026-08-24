import { useEffect } from "react";

export function useOpticalAlign() {
  useEffect(() => {
    let raf = 0;
    let cancelled = false;

    const align = () => {
      if (cancelled) return;
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      document.querySelectorAll<HTMLElement>("[data-optical]").forEach((el) => {
        el.style.marginLeft = "0px";
        const cs = getComputedStyle(el);
        let ch = (el.textContent || "").trim()[0];
        if (!ch) return;
        if (cs.textTransform === "uppercase") ch = ch.toUpperCase();
        ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        ctx.textAlign = "left";
        const abl = ctx.measureText(ch).actualBoundingBoxLeft;
        if (Number.isFinite(abl)) el.style.marginLeft = `${abl.toFixed(2)}px`;
      });
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(align);
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(schedule).catch(() => {});
    } else {
      schedule();
    }

    let t: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(schedule, 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}

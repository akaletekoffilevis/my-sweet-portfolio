import { useRef, useCallback } from "react";
import type { MouseEvent } from "react";

const MAX_TILT = 7; // degrés max d'inclinaison

/**
 * Effet 3D : incline l'élément vers le curseur (perspective + rotateX/rotateY)
 * et déplace le halo lumineux (--tgx / --tgy) sous le pointeur.
 * Retourne le ref à attacher à la cible et les handlers de survol.
 */
export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  // Accessibilité : pas d'effet 3D si l'utilisateur limite les animations.
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = useCallback((e: MouseEvent<T>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0 → 1
    const py = (e.clientY - rect.top) / rect.height;
    const rx = (0.5 - py) * MAX_TILT;
    const ry = (px - 0.5) * MAX_TILT;
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateY(-4px)`;
    el.style.setProperty("--tgx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--tgy", `${(py * 100).toFixed(1)}%`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

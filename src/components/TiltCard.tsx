import type { ReactNode } from "react";
import { useTilt } from "../hooks/useTilt";

/**
 * Carte à légère inclinaison 3D au survol (perspective).
 * Micro-interaction discrète, désactivée si l'utilisateur réduit les animations.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const tilt = useTilt<HTMLDivElement>();
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`tilt-layer group ${className}`}
    >
      {children}
    </div>
  );
}

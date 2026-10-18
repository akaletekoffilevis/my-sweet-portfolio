import { motion } from "motion/react";
import { usePortfolio } from "../context/PortfolioContext";
import {
  Server, Globe, SquareTerminal, Database, Wrench, Rocket, PanelTop, Smartphone, FlaskConical, GraduationCap,
  Sparkles, Languages, ShoppingBag, Laptop, RefreshCw, ClipboardCheck, PackageCheck,
} from "lucide-react";
import TiltCard from "./TiltCard";

const iconMap: Record<string, typeof Server> = {
  Server,
  Globe,
  SquareTerminal,
  Database,
  Wrench,
  Rocket,
  PanelTop,
  Smartphone,
  FlaskConical,
  GraduationCap,
  Sparkles,
  Languages,
  ShoppingBag,
  Laptop,
  RefreshCw,
  ClipboardCheck,
  PackageCheck,
};

export default function ServicesSection() {
  const { services } = usePortfolio();
  return (
    <section className="py-16 sm:py-24 border-b border-app-hairline scroll-mt-20 relative" id="services-section">
      <div className="wrap relative">
        <div className="grid12">
          {services.map((svc, idx) => {
            const Icon = (svc.icon && iconMap[svc.icon]) || Server;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.35, delay: (idx % 2) * 0.08 }}
                className={`col-span-full md:col-span-6 py-7 group ${
                  idx % 2 === 1 ? "md:border-l md:border-app-hairline md:pl-8" : "md:pr-8"
                } ${idx >= 2 ? "border-t border-app-hairline" : ""}`}
              >
                <TiltCard className="h-full w-full">
                  <div className="flex items-start justify-between gap-4">
                    <span className="folio text-app-accent">S.{String(idx + 1).padStart(2, "0")}</span>
                    <Icon
                      className="h-5 w-5 text-app-text-muted group-hover:text-app-accent transition-colors duration-300 shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold tracking-tight text-app-text-white mt-3 leading-snug group-hover:text-app-accent transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-app-text-muted mt-2">{svc.desc}</p>
                  <span className="kicker block mt-4">{svc.tech}</span>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

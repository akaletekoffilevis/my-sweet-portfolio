import { usePortfolio } from "../context/PortfolioContext";
import { Mail, Linkedin, Github, MapPin, Terminal } from "lucide-react";

export default function BioSection() {
  const { profile } = usePortfolio();

  return (
    <section className="py-20 px-6 border-b border-app-border-subtle relative overflow-hidden" id="bio-section">
      {/* Tech background pattern */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.025]">
        <div className="absolute top-10 left-10 text-[10px] font-mono text-app-accent leading-relaxed" style={{ writingMode: "vertical-rl" }}>01101111 01110000 01110100 01101001 01101111 01101110 01110011</div>
        <div className="absolute bottom-10 right-10 text-[10px] font-mono text-app-accent leading-relaxed" style={{ writingMode: "vertical-rl" }}>01101001 01101110 01101001 01110100</div>
      </div>

      <div className="mx-auto max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
            <div className="w-full max-w-xs">
              <div className="bg-app-bg border border-app-border-subtle rounded-xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-2 bg-app-darker border-b border-app-border-subtle">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="text-[10px] font-mono text-app-text-muted ml-2">avatar.png</span>
                </div>
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            <div className="text-center lg:text-left space-y-3 w-full">
              <h1 className="text-3xl font-bold text-app-text-white font-mono tracking-tight">{profile.name}</h1>
              <p className="text-app-accent font-mono text-sm">&gt; {profile.title}</p>
              <p className="text-xs font-mono text-app-text-soft flex items-center justify-center lg:justify-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-app-accent/60" /> <span className="text-app-text-muted">$</span> {profile.location}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a href={profile.socials.github} target="_blank" rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-app-border-subtle text-app-text-muted hover:border-app-accent hover:text-app-accent hover:shadow-[0_0_12px_-4px_rgba(245,158,11,0.12)] transition-all duration-200">
                <Github className="h-4 w-4" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-app-border-subtle text-app-text-muted hover:border-app-accent hover:text-app-accent hover:shadow-[0_0_12px_-4px_rgba(245,158,11,0.12)] transition-all duration-200">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href={`mailto:${profile.socials.email}`}
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-app-border-subtle text-app-text-muted hover:border-app-accent hover:text-app-accent hover:shadow-[0_0_12px_-4px_rgba(245,158,11,0.12)] transition-all duration-200">
                <Mail className="h-4 w-4" />
              </a>
              {profile.socials.whatsapp && (
                <a href={`https://wa.me/${profile.socials.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank" rel="noreferrer"
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-app-border-subtle text-app-text-muted hover:border-green-500 hover:text-green-500 transition-all duration-200">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-app-bg border border-app-border-subtle rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-app-darker border-b border-app-border-subtle">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <Terminal className="h-3.5 w-3.5 text-app-accent ml-2" />
                <span className="text-[10px] font-mono text-app-text-muted">about.sh</span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-mono text-app-accent">$</span>
                  <h2 className="text-sm font-mono font-semibold text-app-text-white">cat about.md</h2>
                </div>
                <p className="text-sm font-mono text-app-text-body leading-relaxed">{profile.bio}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {profile.metrics.map((m, idx) => (
                <div key={idx} className="bg-app-bg border border-app-border-subtle rounded-xl p-5 text-center">
                  <div className="text-lg font-bold font-mono text-app-accent">{m.value}</div>
                  <div className="text-[10px] font-mono text-app-text-muted mt-1.5 uppercase tracking-wider">{m.label}</div>
                  <div className="text-[10px] font-mono text-app-text-soft mt-0.5">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

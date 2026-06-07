import { usePortfolio } from "../context/PortfolioContext";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

export default function BioSection() {
  const { profile } = usePortfolio();

  return (
    <section className="py-20 px-6 border-b border-app-border-subtle" id="bio-section">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-4 flex flex-col items-center lg:items-start space-y-6">
            <div className="w-full max-w-xs">
              <div className="rounded-2xl overflow-hidden border border-app-border-subtle shadow-lg">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>

            <div className="text-center lg:text-left space-y-3">
              <h1 className="text-3xl font-bold text-app-text-white">{profile.name}</h1>
              <p className="text-app-accent font-medium">{profile.title}</p>
              <p className="text-sm text-app-text-soft flex items-center justify-center lg:justify-start gap-1">
                <MapPin className="w-4 h-4" /> {profile.location}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a href={profile.socials.github} target="_blank" rel="noreferrer"
                className="p-2.5 border border-app-border-subtle rounded-lg hover:border-app-accent text-app-text-soft hover:text-app-accent transition">
                <Github className="h-5 w-5" />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer"
                className="p-2.5 border border-app-border-subtle rounded-lg hover:border-app-accent text-app-text-soft hover:text-app-accent transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href={`mailto:${profile.socials.email}`}
                className="p-2.5 border border-app-border-subtle rounded-lg hover:border-app-accent text-app-text-soft hover:text-app-accent transition">
                <Mail className="h-5 w-5" />
              </a>
              {profile.socials.whatsapp && (
                <a href={`https://wa.me/${profile.socials.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank" rel="noreferrer"
                  className="p-2.5 border border-app-border-subtle rounded-lg hover:border-green-500 text-app-text-soft hover:text-green-500 transition">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-app-card border border-app-border-subtle rounded-2xl p-8">
              <h2 className="text-lg font-semibold text-app-text-white mb-4">À propos</h2>
              <p className="text-app-text-body leading-relaxed">{profile.bio}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {profile.metrics.map((m, idx) => (
                <div key={idx} className="bg-app-card border border-app-border-subtle rounded-xl p-5 text-center">
                  <div className="text-xl font-bold text-app-accent">{m.value}</div>
                  <div className="text-xs text-app-text-muted mt-1">{m.label}</div>
                  <div className="text-xs text-app-text-soft mt-0.5">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

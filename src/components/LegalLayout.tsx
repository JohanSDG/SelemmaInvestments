import { Link } from "@tanstack/react-router";
import { ArrowLeft, Scale } from "lucide-react";
import type { ReactNode } from "react";
import selemmaLogo1x from "@/assets/selemma-logo-128.png";
import selemmaLogo2x from "@/assets/selemma-logo-256.png";
import selemmaLogo3x from "@/assets/selemma-logo-hq.png";

const LEGAL_NAV = [
  { to: "/terminos", label: "Términos y Condiciones" },
  { to: "/privacidad", label: "Política de Privacidad (Habeas Data)" },
  { to: "/cookies", label: "Política de Cookies" },
  { to: "/reembolsos", label: "Política de Reembolso y Retracto" },
] as const;

export function LegalLayout({
  eyebrow,
  title,
  version,
  updatedAt,
  activePath,
  children,
}: {
  eyebrow: string;
  title: string;
  version: string;
  updatedAt: string;
  activePath: "/terminos" | "/privacidad" | "/cookies" | "/reembolsos";
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="border-b border-white/10 bg-navy/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
              <img
                src={selemmaLogo2x}
                srcSet={`${selemmaLogo1x} 1x, ${selemmaLogo2x} 2x, ${selemmaLogo3x} 3x`}
                alt="Selemma Investments"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] font-semibold tracking-[0.26em] text-white">SELEMMA</div>
              <div className="text-[8px] tracking-[0.32em] text-white/50">INVESTMENTS</div>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs text-white/70 transition hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-10 flex flex-wrap gap-2 border-b border-white/10 pb-6">
          {LEGAL_NAV.map((item) => {
            const isActive = item.to === activePath;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-sm border px-4 py-2 text-xs font-medium transition ${
                  isActive
                    ? "border-gold bg-gold text-navy"
                    : "border-white/15 bg-white/3 text-white/70 hover:border-gold/40 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mb-10 border-b border-white/10 pb-8">
          <span className="eyebrow text-gold">
            <span className="dot-gold" /> {eyebrow}
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/50">
            <span className="inline-flex items-center gap-1.5 text-gold/90">
              <Scale className="h-3.5 w-3.5" /> Versión vigente: {version}
            </span>
            <span>·</span>
            <span>Última actualización: {updatedAt}</span>
            <span>·</span>
            <span>Jurisdicción: República de Colombia &amp; Operaciones Internacionales</span>
          </div>
        </div>

        <article className="space-y-8 text-sm leading-relaxed text-white/75">
          {children}
        </article>
      </main>
    </div>
  );
}

export function LegalSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-sm border border-white/10 bg-white/2 p-6 md:p-8">
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-semibold tracking-[0.2em] text-gold">{number}</span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">{children}</div>
    </section>
  );
}


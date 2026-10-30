import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";

import selemmaLogo1x from "@/assets/selemma-logo-128.png";
import selemmaLogo2x from "@/assets/selemma-logo-256.png";
import selemmaLogo3x from "@/assets/selemma-logo-hq.png";

export function Nav() {
  const links = [
    { label: "Soluciones", href: "/#soluciones" },
    { label: "Diferenciadores", href: "/#diferenciadores" },
    { label: "Inversionistas", href: "/#inversores" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-[13px] font-semibold text-white" }}
            inactiveProps={{ className: "text-[13px] text-white/70 transition hover:text-white" }}
          >
            Home
          </Link>
          <Link
            to="/servicios-financieros"
            activeProps={{ className: "text-[13px] font-semibold text-gold" }}
            inactiveProps={{ className: "text-[13px] text-white/70 transition hover:text-white" }}
          >
            Servicios Financieros
          </Link>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/70 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <Link to="/contact" className="btn-pill btn-gold text-[12.5px]">
          Agendar Reunión de Inversión
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 text-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
                <img
                  src={selemmaLogo2x}
                  srcSet={`${selemmaLogo1x} 1x, ${selemmaLogo2x} 2x, ${selemmaLogo3x} 3x`}
                  alt="Selemma Investments"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.32em] text-white">SELEMMA</div>
                <div className="text-[8px] tracking-[0.38em] text-white/45">INVESTMENTS</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-white/50">
              Socio estratégico de capitales de mediano y alto patrimonio. A través de IA, cruzamos
              sus criterios de inversión con el panorama macroeconómico global para blindar su
              capital y garantizar el retorno objetivo de su inversión.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/35">Compañía</div>
            <ul className="mt-4 space-y-2 text-[13px]">
              <li>
                <a href="/#soluciones" className="hover:text-gold">
                  Soluciones
                </a>
              </li>
              <li>
                <a href="/#diferenciadores" className="hover:text-gold">
                  Diferenciadores
                </a>
              </li>
              <li>
                <a href="/#inversores" className="hover:text-gold">
                  Inversionistas
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/35">
              REDES DE CONTACTO
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/selemma.investments/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Selemma Investments"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-gold/40 hover:text-gold"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/selemma-investments"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Selemma Investments"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-gold/40 hover:text-gold"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:selemma.investments@gmail.com"
                aria-label="Escribir a selemma.investments@gmail.com"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition hover:border-gold/40 hover:text-gold"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-white/10 pt-6 text-[11px] leading-relaxed text-white/35">
          <p className="mb-4 max-w-4xl">
            <strong>Aviso Legal y Regulatorio (Colombia, EE.UU. e Internacional):</strong> La
            información publicada por Selemma Investments tiene fines estrictamente informativos e
            institucionales sobre consultoría y estructuración inmobiliaria privada. No constituye
            oferta pública de valores ni captación masiva de recursos (Decreto 2555 de 2010
            Colombia / U.S. Securities Act of 1933). Las marcas nominativas citadas en el
            ecosistema pertenecen a sus respectivos titulares y se mencionan con fines meramente
            referenciales del sector.
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              © {new Date().getFullYear()} Selemma Investments · Todos los derechos reservados.
            </div>
            <div className="flex flex-wrap items-center gap-5">
              <Link to="/terminos" className="hover:text-gold">
                Términos y Condiciones
              </Link>
              <Link to="/privacidad" className="hover:text-gold">
                Política de Privacidad (Habeas Data)
              </Link>
              <Link to="/cookies" className="hover:text-gold">
                Política de Cookies
              </Link>
              <Link to="/reembolsos" className="hover:text-gold">
                Política de Reembolso y Retracto
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

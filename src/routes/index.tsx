import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  LineChart,
  MapPinned,
  ShieldCheck,
  Landmark,
  Cpu,
  Percent,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";


import selemmaLogo from "@/assets/selemma-logo.jpeg";
import warehouseImg from "@/assets/warehouse.jpg";
import hotelImg from "@/assets/hotel.jpg";
import { RotatingGlobe } from "@/components/RotatingGlobe";
import { BrandCarousel } from "@/components/BrandCarousel";

export const Route = createFileRoute("/")({
  component: SelemmaHome,
  head: () => ({
    meta: [
      { title: "Selemma Investments · Inversión inmobiliaria off-market LATAM & USA" },
      {
        name: "description",
        content:
          "Socio estratégico en inversión inmobiliaria off-market en Latinoamérica y USA: activos exclusivos, ingeniería fiscal y gestión end-to-end.",
      },
      { property: "og:title", content: "Selemma Investments" },
      {
        property: "og:description",
        content:
          "Activos off-market de alta rentabilidad, ingeniería fiscal y gestión end-to-end para inversionistas en LATAM y USA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function SelemmaHome() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <Nav />
      <Hero />
      <BrandCarousel />
      <ValueProps />
      <Solutions />
      <Differentiators />
      <AudienceVision />
      <CtaBlock />
      <Footer />
    </div>
  );
}

function Nav() {
  const links = [
    { label: "Soluciones", href: "#soluciones" },
    { label: "Diferenciadores", href: "#diferenciadores" },
    { label: "Inversionistas", href: "#inversores" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
            <img src={selemmaLogo} alt="Selemma Investments" className="h-10 w-10 object-cover" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-semibold tracking-[0.26em] text-white">SELEMMA</div>
            <div className="text-[8px] tracking-[0.32em] text-white/50">INVESTMENTS</div>
          </div>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
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

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-navy pb-24 pt-36 lg:pt-44">
      {/* Rotating dotted globe centred on Latin America */}
      <div className="pointer-events-none absolute right-4 top-28 hidden h-[380px] w-[380px] text-gold/35 md:block lg:right-8 lg:top-24 lg:h-[430px] lg:w-[430px]">
        <RotatingGlobe className="h-full w-full" />
        <div
          className="absolute inset-0 -z-10 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(10,20,51,0.85) 0%, transparent 65%)" }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, var(--color-navy) 0%, color-mix(in oklab, var(--color-navy) 88%, transparent) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <span className="eyebrow text-gold">
          <span className="dot-gold" /> SELEMMA INVESTMENTS · LATAM &amp; USA
        </span>
        <h1 className="mt-7 max-w-3xl text-[32px] font-medium leading-[1.12] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[52px]">
          Inversión inmobiliaria.
          <span className="mt-1 block text-gold">Criterio para su patrimonio.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[14px] leading-[1.7] text-white/60 md:text-[15px]">
          Su objetivo es el punto de partida. Conectamos capital privado con activos
          off-market mediante análisis financiero, estrategia fiscal y acompañamiento
          integral.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <Link to="/contact" className="btn-pill btn-gold">
            Agendar Reunión de Inversión
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <a href="#soluciones" className="btn-pill btn-ghost-light">
            Nuestras soluciones
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <p className="mt-7 text-[11.5px] tracking-[0.02em] text-white/45">
          Capital privado · Empresas · Propietarios
        </p>
      </div>
    </section>
  );
}

function ValueProps() {
  return (
    <section className="bg-silver py-28 text-navy">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow text-navy/55">
              <span className="dot-gold" /> Nuestra propuesta
            </span>
            <h2 className="mt-6 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-navy md:text-[38px]">
              Antes del activo,
              <br />
              la estrategia.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-[15px] leading-[1.75] text-navy/65">
              Definimos con usted el retorno objetivo, el horizonte de inversión y las
              prioridades de su patrimonio. A partir de ese mandato evaluamos
              oportunidades y estructuramos una decisión con fundamentos.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-navy/10 pt-7">
              <div>
                <div className="text-[13px] font-semibold text-navy">Originación</div>
                <div className="mt-1 text-[13px] text-navy/55">Off-market</div>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-navy">Análisis</div>
                <div className="mt-1 text-[13px] text-navy/55">Financiero</div>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-navy">Estructuración</div>
                <div className="mt-1 text-[13px] text-navy/55">Patrimonial</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const solutions = [
  {
    n: "01",
    slug: "consultoria",
    icon: LineChart,
    title: "Servicio de Consultoría",
    body:
      "Análisis del activo, inteligencia de mercado y estructuración financiera para orientar sus decisiones patrimoniales.",
  },
  {
    n: "02",
    slug: "usuarios",
    icon: ShieldCheck,
    title: "Representación de Usuarios",
    body:
      "Búsqueda de espacios y negociación de condiciones de compra o arriendo alineadas con las necesidades de su empresa.",
  },
  {
    n: "03",
    slug: "propietarios",
    icon: Building2,
    title: "Representación de Propietarios",
    body:
      "Estrategia de comercialización y negociación para posicionar su inmueble ante compradores e inquilinos adecuados.",
  },
  {
    n: "04",
    slug: "off-market",
    icon: Landmark,
    title: "Servicio de Inversión Off-Market",
    body:
      "Originación, evaluación, adquisición y gestión de activos según su capital, retorno objetivo y horizonte de inversión.",
  },
];

function Solutions() {
  return (
    <section id="soluciones" className="bg-navy py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow text-gold">
              <span className="dot-gold" /> Cuatro líneas de solución
            </span>
            <h2 className="mt-6 text-[28px] font-medium leading-[1.15] tracking-[-0.02em] text-white md:text-[38px]">
              Una perspectiva integral.
              <span className="mt-1 block text-gold">Un mandato a su medida.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.7] text-white/55">
              Asesoría para inversionistas, empresas y propietarios en cada etapa de su
              decisión inmobiliaria.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-t border-white/10 lg:col-span-7">
            {solutions.map(({ n, slug, icon: Icon, title, body }) => (
              <Link
                key={n}
                to="/contact"
                search={{ s: slug }}
                className="group flex items-start gap-6 py-7 transition hover:bg-white/[0.02]"
              >
                <span className="pt-1 text-[11px] font-medium tracking-[0.2em] text-gold/80">
                  {n}
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4 text-gold" />
                    <h3 className="text-[17px] font-medium text-white transition group-hover:text-gold">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-2.5 max-w-xl text-[13.5px] leading-[1.65] text-white/55">
                    {body}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gold/75 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Differentiators() {
  return (
    <section id="diferenciadores" className="bg-white py-28 text-navy">
      <div className="mx-auto max-w-6xl px-6">
        <span className="eyebrow text-navy/50">
          <span className="dot-gold" /> Diferenciadores
        </span>
        <h2 className="mt-6 max-w-3xl text-[26px] font-semibold md:text-[34px]">
          Lo que <span className="text-gold">nadie más</span> ofrece en el mercado.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="card-light overflow-hidden">
            <img
              src={warehouseImg}
              alt="Bodegas industriales financiadas al 0% de interés"
              className="h-44 w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
            <div className="p-7">
              <div className="flex items-center gap-2 text-gold">
                <Percent className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.2em]">Único en el mercado</span>
              </div>
              <h3 className="mt-3 text-[17px] font-medium leading-snug">
                Financiación de Construcciones y Bodegas Industriales
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-navy/65">
                Sin intereses y licencias de construcción gratis, eliminando sobrecostos
                bancarios.
              </p>
            </div>
          </article>

          <article className="flex flex-col justify-between rounded-sm bg-navy-surface p-8 text-white">
            <div>
              <div className="flex items-center gap-2 text-gold">
                <Cpu className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.2em]">Plataforma IA</span>
              </div>
              <h3 className="mt-3 text-[17px] font-medium">Inteligencia artificial aplicada</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                Precisión técnica y sistematización del{" "}
                <span className="font-semibold text-gold">70%</span> del ciclo de venta.
                No esperamos a que lleguen los compradores: nuestra tecnología rastrea, perfila
                y contacta directamente a fondos e inversores de alto nivel validados para su
                proyecto.
              </p>
            </div>
          </article>

          <article className="card-light overflow-hidden">
            <img
              src={hotelImg}
              alt="Zonas de privilegio fiscal en LATAM y USA"
              className="h-44 w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
            <div className="p-7">
              <div className="flex items-center gap-2 text-gold">
                <MapPinned className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.2em]">Ubicación &amp; fiscalidad</span>
              </div>
              <h3 className="mt-3 text-[17px] font-medium">Zonas de privilegio fiscal</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-navy/65">
                Zonas de alto crecimiento con beneficios tributarios: valorización rápida y cargas
                fiscales reducidas legalmente.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function AudienceVision() {
  return (
    <section id="inversores" className="bg-silver py-28 text-navy">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="eyebrow text-navy/50">
              <span className="dot-gold" /> Perfil del inversionista
            </span>
            <h2 className="mt-6 text-[26px] font-semibold md:text-[34px]">
              Para quien piensa en <span className="text-gold">patrimonio</span>, no en pagos.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-navy/70">
              Trabajamos con inversionistas, empresarios y corporaciones multinacionales — fondos
              privados y públicos que buscan retorno real, ventajas fiscales y estrategia de largo
              plazo.
            </p>
          </div>

          <div className="relative flex flex-col justify-center rounded-sm border-t border-gold bg-navy-surface p-10 text-white">
            <span className="eyebrow text-gold">
              <span className="dot-gold" /> Nuestra visión
            </span>
            <h3 className="mt-6 text-[22px] font-semibold leading-snug text-white md:text-[28px]">
              Ser la compañía <span className="text-gold">líder</span> en innovación inmobiliaria
              de Latinoamérica.
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaBlock() {
  return (
    <section id="contacto" className="bg-white py-28 text-navy">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="mx-auto max-w-2xl text-[26px] font-semibold md:text-[34px]">
          Su próximo activo no está publicado.{" "}
          <span className="text-gold">Nosotros sabemos dónde está.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base text-navy/65">
          Agende una reunión estratégica confidencial y le mostraremos oportunidades reales.
        </p>
        <div className="mt-8 flex justify-center">
          <Link to="/contact" className="btn-pill btn-gold">
            Agendar Reunión de Inversión
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-8 text-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
                <img src={selemmaLogo} alt="Selemma Investments" className="h-10 w-10 object-cover" />
              </div>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.32em] text-white">SELEMMA</div>
                <div className="text-[8px] tracking-[0.38em] text-white/45">INVESTMENTS</div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-[13px] leading-relaxed text-white/50">
              Socio estratégico de capitales de mediano y alto patrimonio. A través de IA, cruzamos sus criterios de inversión con el panorama macroeconómico global para blindar su capital y garantizar el retorno objetivo de su inversión.
            </p>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/35">Compañía</div>
            <ul className="mt-4 space-y-2 text-[13px]">
              <li><a href="#soluciones" className="hover:text-gold">Soluciones</a></li>
              <li><a href="#diferenciadores" className="hover:text-gold">Diferenciadores</a></li>
              <li><a href="#inversores" className="hover:text-gold">Inversionistas</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/35">REDES DE CONTACTO</div>
            <ul className="mt-4 space-y-2 text-[13px]">
              <li>
                <Link to="/contact" className="hover:text-gold">
                </Link>
              </li>
              <li className="pt-1 text-white/40">{"\n"}</li>
              <li className="text-white/40">{"\n"}</li>
            </ul>
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
            <div>© {new Date().getFullYear()} Selemma Investments · Todos los derechos reservados.</div>
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

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  LineChart,
  MapPinned,
  ShieldCheck,
  Landmark,
  Cpu,
  Percent,
} from "lucide-react";

import warehouseImg from "@/assets/warehouse.jpg";
import hotelImg from "@/assets/hotel.jpg";
import { RotatingGlobe } from "@/components/RotatingGlobe";
import { BrandCarousel } from "@/components/BrandCarousel";
import { Nav, Footer } from "@/components/SiteLayout";

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
          <span className="dot-gold" /> SELEMMA INVESTMENTS
        </span>
        <h1 className="mt-7 max-w-3xl text-[32px] font-medium leading-[1.12] tracking-[-0.02em] text-white sm:text-[42px] lg:text-[52px]">
          Tu Inversión
          <span className="mt-1 block text-gold">con criterio para su patrimonio.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[14px] leading-[1.7] text-white/60 md:text-[15px]">
          Conectamos capital privado con activos off-market mediante análisis financiero,
          estrategia fiscal y acompañamiento integral.
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
    <section className="bg-silver py-14 md:py-16 text-navy">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <span className="eyebrow text-navy/55">
              <span className="dot-gold" /> Nuestra propuesta
            </span>
            <h2 className="mt-3.5 text-[22px] font-medium leading-[1.16] tracking-[-0.02em] text-navy md:text-[30px]">
              Antes del activo,
              <br />
              la estrategia.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="max-w-xl text-[13.5px] leading-[1.7] text-navy/65">
              Definimos con usted el retorno objetivo, el horizonte de inversión y las
              prioridades de su patrimonio. A partir de ese mandato evaluamos
              oportunidades y estructuramos una decisión con fundamentos.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-5 border-t border-navy/10 pt-5">
              <div>
                <div className="text-[12.5px] font-semibold text-navy">Originación</div>
                <div className="mt-0.5 text-[12px] text-navy/55">Off-market</div>
              </div>
              <div>
                <div className="text-[12.5px] font-semibold text-navy">Análisis</div>
                <div className="mt-0.5 text-[12px] text-navy/55">Financiero</div>
              </div>
              <div>
                <div className="text-[12.5px] font-semibold text-navy">Estructuración</div>
                <div className="mt-0.5 text-[12px] text-navy/55">Patrimonial</div>
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
    to: "/contact" as const,
    search: { s: "consultoria" },
    icon: LineChart,
    title: "Servicio de Consultoría",
    body:
      "Análisis de mercado, valoración y estructuración patrimonial para decisiones inmobiliarias con mayor claridad.",
  },
  {
    n: "02",
    to: "/contact" as const,
    search: { s: "usuarios" },
    icon: ShieldCheck,
    title: "Representación de Usuarios",
    body:
      "Búsqueda y negociación de espacios bajo un mandato que protege los intereses de su empresa.",
  },
  {
    n: "03",
    to: "/servicios-financieros" as const,
    search: undefined,
    icon: Landmark,
    title: "Diversificación de Portafolio",
    body:
      "Conectamos su capital con el mercado internacional de materias preciosas mediante alianzas estratégicas que garantizan seguridad y crecimiento corporativo.",
  },
];

function Solutions() {
  return (
    <section id="soluciones" className="bg-navy py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow text-gold">
              <span className="dot-gold" /> Tres líneas de solución
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
            {solutions.map(({ n, to, search, icon: Icon, title, body }) => (
              <Link
                key={n}
                to={to}
                search={search}
                className="group flex items-start gap-6 py-7 transition hover:bg-white/2"
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


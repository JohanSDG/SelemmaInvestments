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

import warehouseImg from "../assets/warehouse.jpg";
import hotelImg from "../assets/hotel.jpg";
import heroVideo from "../assets/video-principal.mp4";
import { BrandCarousel } from "../components/BrandCarousel";
import { Nav, Footer } from "../components/SiteLayout";

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
      <Trayectoria />
      <Solutions />
      <Differentiators />
      <AudienceVision />
      <CtaBlock />
      <Footer />
    </div>
  );
}

const TRAYECTORIA_STATS = [
  { value: "+10", label: "Años de experiencia" },
  { value: "+10 M", label: "Millones de dólares en venta" },
  { value: "6,500", label: "Market off properties exclusivas" },
  { value: "$1 Billón USD", label: "Valor total de activos" },
  { value: "+300", label: "Colaboradores externos dedicados" },
  { value: "4", label: "Países con presencia" },
];

function Trayectoria() {
  return (
    <section id="trayectoria" className="bg-silver py-20 text-navy md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-[26px] font-semibold leading-snug md:text-[32px]">
            Nuestra trayectoria como{" "}
            <span className="font-serif italic text-gold">consultora</span> de inversiones
            inmobiliarias
          </h2>
          <p className="mt-4 text-[13.5px] leading-relaxed text-navy/65">
            En Selemma Investments somos especialistas en proyectos inmobiliarios, de inversión y
            bienes raíces, con una trayectoria que nace en República Dominicana y luego se expande
            a los más relevantes destinos turísticos en Panamá, Estados Unidos y Colombia.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
          {TRAYECTORIA_STATS.map((s) => (
            <div
              key={s.label}
              className="flex min-h-[150px] flex-col justify-between rounded-sm border-t-2 border-gold bg-white p-6 shadow-sm md:min-h-[190px]"
            >
              <div className="font-serif text-[26px] italic text-navy md:text-[34px]">
                {s.value}
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link to="/nosotros" className="btn-pill btn-gold inline-flex items-center gap-2 text-[13px]">
            Más información
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="relative isolate flex aspect-video max-h-[calc(100vh-72px)] min-h-[460px] w-full items-center overflow-hidden bg-navy mt-[72px]">
      {/* Video principal (36 s) en bucle automático, mostrado completo (sin zoom excesivo) */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      {/* Contraste suave: solo lateral izquierdo (texto) y base */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(6,13,31,0.6) 0%, rgba(6,13,31,0.3) 35%, rgba(6,13,31,0) 60%), linear-gradient(0deg, rgba(6,13,31,0.4) 0%, rgba(6,13,31,0) 35%)",
        }}
      />

      <div className="relative w-full px-6 sm:px-10 lg:px-14">
        <span className="mb-4 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/90">
          <span className="h-px w-9 bg-white/70" /> SELEMMA INVESTMENTS
        </span>
        <h1 className="max-w-xl text-[26px] font-medium leading-[1.2] tracking-[-0.01em] text-white sm:text-[28px] lg:text-[34px]">
          Inversión con criterio{" "}<br />para su patrimonio.
        </h1>
        <div className="mt-5">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-white px-5 py-2.5 text-[12.5px] font-semibold text-navy shadow-lg transition hover:bg-white/90"
          >
            Agendar reunión
            <ArrowUpRight className="h-4 w-4" />
          </Link>
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
      "Búsqueda y negociación de espacios bajo un diagnóstico que protege los intereses de su inversión hacia el futuro de su retorno.",
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
              Una solución integral
              <span className="mt-1 block text-gold">para su decisión.</span>
            </h2>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.7] text-white/55">
              Consultoría para inversionistas, empresas y propietarios en cada etapa.
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
          <article className="card-light flex flex-col justify-between overflow-hidden">
            <div>
              <img
                src={warehouseImg}
                alt="Comunidad Privada de Inversionistas"
                className="h-44 w-full object-cover"
                loading="lazy"
                width={1400}
                height={1000}
              />
              <div className="p-7 pb-4">
                <div className="flex items-center gap-2 text-gold">
                  <Percent className="h-4 w-4" />
                  <span className="text-[10px] uppercase tracking-[0.2em]">CÍRCULO EXCLUSIVO</span>
                </div>
                <h3 className="mt-3 text-[17px] font-medium leading-snug">
                  Comunidad Privada de Inversionistas
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy/65">
                  Acceso directo a un espacio selecto con reportes semanales del mercado
                  inmobiliario y activos emergentes. Analizamos tendencias locales y globales para
                  anticipar cambios y acercarle oportunidades de alto potencial antes de que lleguen
                  al mercado abierto.
                </p>
              </div>
            </div>
            <div className="px-7 pb-7 pt-2">
              <a
                href="https://chat.whatsapp.com/JwT48Rewr2C5IwmSClJLlE"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-gold w-full justify-center text-xs"
              >
                Unirse al grupo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>

          <article className="flex flex-col justify-between rounded-sm bg-navy-surface p-8 text-white">
            <div>
              <div className="flex items-center gap-2 text-gold">
                <Cpu className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  TECNOLOGÍA &amp; CRITERIO
                </span>
              </div>
              <h3 className="mt-3 text-[17px] font-medium">
                Inteligencia Predictiva de Ubicación
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                Evaluamos el entorno de su próxima inversión mediante análisis avanzado: proyección
                de valorización, estilo de vida del sector, dinámica comercial y puntos clave. Le
                entregamos un diagnóstico claro y transparente con la probabilidad real de éxito
                frente al riesgo, permitiéndole decidir con total certeza.
              </p>
            </div>
          </article>

          <article className="card-light overflow-hidden">
            <img
              src={hotelImg}
              alt="Beneficios e Incentivos Fiscales"
              className="h-44 w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
            <div className="p-7">
              <div className="flex items-center gap-2 text-gold">
                <MapPinned className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.2em]">
                  OPTIMIZACIÓN PATRIMONIAL
                </span>
              </div>
              <h3 className="mt-3 text-[17px] font-medium">Beneficios e Incentivos Fiscales</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-navy/65">
                Estructuramos cada adquisición para aprovechar al máximo las ventajas tributarias y
                los incentivos legales según la ubicación del activo y su residencia. Protegemos y
                optimizamos su capital para que cada inversión rinda a su máxima capacidad.
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
    <section id="nosotros-resumen" className="bg-silver py-24 text-navy">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="eyebrow text-navy/50">
              <span className="dot-gold" /> Sobre Nosotros
            </span>
            <h2 className="mt-5 text-[26px] font-semibold leading-snug md:text-[34px]">
              Una relación de toda la vida como su{" "}
              <span className="text-gold">asesor de confianza.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-navy/70">
              En <strong>Selemma Properties e Investments</strong> estructuramos inversiones
              inmobiliarias y patrimoniales de alto valor en Latinoamérica, EE.UU. y Europa,
              integrando consultoría estratégica, inteligencia predictiva de ubicación y un proceso
              acompañado en 5 etapas.
            </p>
            <div className="mt-7">
              <Link
                to="/nosotros"
                className="btn-pill btn-gold inline-flex items-center gap-2 text-[13px]"
              >
                Conoce más sobre nosotros
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative flex flex-col justify-center rounded-sm border-t-2 border-gold bg-navy-surface p-9 text-white shadow-[0_18px_45px_rgba(6,13,31,0.14)] md:p-10">
            <span className="eyebrow text-gold">
              <span className="dot-gold" /> Nuestra visión
            </span>
            <h3 className="mt-5 text-[22px] font-semibold leading-snug text-white md:text-[28px]">
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


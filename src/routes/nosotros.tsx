import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Award,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Compass,
  FileCheck2,
  LineChart,
} from "lucide-react";

import { Nav, Footer } from "../components/SiteLayout";
import financialHeroImg from "../assets/financial-hero.jpg";
import warehouseImg from "../assets/warehouse.jpg";
import hotelImg from "../assets/hotel.jpg";
import johanSandovalImg from "../assets/johan-sandoval.png";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros · Consultoría e Inversión Patrimonial — Selemma Investments" },
      {
        name: "description",
        content:
          "Conozca a Selemma Properties e Investments: nuestro propósito en consultoría e inversión inmobiliaria, nuestro proceso lineal de 5 etapas y nuestros asesores financieros.",
      },
    ],
  }),
  component: NosotrosPage,
});

const CAROUSEL_SLIDES = [
  {
    image: warehouseImg,
    tag: "ORIGINACIÓN OFF-MARKET",
    title: "Inversión Inmobiliaria y Activos Productivos",
    caption:
      "Acceso directo a bodegas industriales, tierras de expansión y activos comerciales exclusivos en LATAM y EE.UU.",
  },
  {
    image: financialHeroImg,
    tag: "TECNOLOGÍA & CRITERIO",
    title: "Consultoría e Inteligencia Predictiva",
    caption:
      "Diagnóstico financiero riguroso, proyección de valorización por ubicación y estructuración tributaria a la medida.",
  },
  {
    image: hotelImg,
    tag: "PROTECCIÓN PATRIMONIAL",
    title: "Desarrollos Turísticos y Renta Fija en Oro",
    caption:
      "Diversificación estratégica combinando bienes raíces de alta renta con contratos internacionales respaldados en oro físico.",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Reunión Inicial",
    description:
      "La junta inicial tiene que ver con usted. Tomamos el tiempo necesario para entender cómo usted se siente acerca de inversiones y de asegurarnos que entendemos completamente su perfil de riesgo.",
    Icon: Compass,
    archPosition: "top" as const,
    archColor: "#C8A96A",
    badgeBg: "bg-[#C8A96A] text-gray-950",
  },
  {
    number: "02",
    title: "Segunda Reunión",
    description:
      "Durante nuestra segunda junta presentaremos nuestras recomendaciones para su plan financiero. Este incluye no solamente construcción y administración de cartera, pero también vincula educación, planificación patrimonial, necesidad de ingresos y cuestiones de seguro.",
    Icon: LineChart,
    archPosition: "bottom" as const,
    archColor: "#0B2240",
    badgeBg: "bg-[#0B2240] text-white",
  },
  {
    number: "03",
    title: "Proceso de Solicitud",
    description:
      "Una vez que usted está satisfecho con nuestras recomendaciones, nosotros reuniremos todos los documentos necesarios de apoyo y gestionamos el trámite de su solicitud hasta que se haya concluido con éxito.",
    Icon: FileCheck2,
    archPosition: "top" as const,
    archColor: "#9A7B3E",
    badgeBg: "bg-[#9A7B3E] text-white",
  },
  {
    number: "04",
    title: "Revisiones Periódicas",
    description:
      "Creemos que una vez escrito un plan financiero no hay que dejarle en un cajón y olvidarse de él. Cuando trabajamos con usted nos esforzamos continuamente para asegurarnos que usted se mantenga en el camino correcto y le impulsamos a lograr sus objetivos financieros mediante evaluaciones regulares y servicio continuo al cliente, incluyéndolos en grupos exclusivos de información semanal.",
    Icon: CalendarClock,
    archPosition: "bottom" as const,
    archColor: "#142E54",
    badgeBg: "bg-[#142E54] text-white",
  },
  {
    number: "05",
    title: "Resultado de su Inversión",
    description:
      "Etapa de consolidación y retorno patrimonial donde usted mismo dará el caso de uso correspondiente, validando con métricas reales cómo la estrategia ejecutada cumple con sus objetivos de renta, liquidez y valorización.",
    Icon: Award,
    archPosition: "top" as const,
    archColor: "#C8A96A",
    badgeBg: "bg-[#C8A96A] text-gray-950",
  },
];

function NosotrosPage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [visibleStepsCount, setVisibleStepsCount] = useState(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4800);
    return () => window.clearInterval(interval);
  }, []);

  // Activa la línea y la aparición cronológica rápida del 1 al 5 al llegar a la sección
  useEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setTimelineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!timelineVisible) return;
    const timers: number[] = [];
    PROCESS_STEPS.forEach((_, idx) => {
      const t = window.setTimeout(() => {
        setVisibleStepsCount(idx + 1);
      }, 180 + idx * 240);
      timers.push(t);
    });
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [timelineVisible]);

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      <Nav />

      <main className="bg-[#FBFBFD] text-gray-900">
        {/* Hero Banner */}
        <section className="relative isolate flex min-h-[320px] items-end overflow-hidden border-b-2 border-[#C8A96A]/70 pt-24 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:min-h-[360px] md:pb-14">
          <img
            src={financialHeroImg}
            alt="Selemma Investments — Nosotros"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,5,5,0.90) 0%, rgba(10,20,51,0.78) 55%, rgba(5,5,5,0.58) 100%)",
            }}
          />
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="inline-flex items-center gap-2.5 rounded-sm border border-[#C8A96A]/55 bg-black/35 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                SELEMMA INVESTMENTS
              </p>
            </div>
            <h1 className="mt-3.5 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Nosotros
            </h1>
          </div>
        </section>

        {/* 1. Descripción (~500 caracteres) + Carrusel de 3 imágenes */}
        <section className="bg-white py-14 md:py-20">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              {/* Columna Izquierda: Misión + Descripción de ~500 caracteres */}
              <div className="lg:col-span-6">
                <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A7B3E]">
                  SELEMMA PROPERTIES & INVESTMENTS
                </p>
                <h2 className="text-2xl font-normal leading-snug tracking-tight text-gray-900 md:text-[30px]">
                  Cada familia, inversionista y empresa posee valores, objetivos y prioridades
                  únicos.{" "}
                  <span className="font-bold text-gray-950">
                    Nuestra misión es desarrollar una relación de toda la vida como su asesor de
                    confianza.
                  </span>
                </h2>

                <div className="mt-5 rounded-sm border-l-4 border-[#C8A96A] bg-[#FAF8F4] p-5 shadow-sm ring-1 ring-gray-900/5">
                  <p className="text-[14px] leading-relaxed text-gray-700">
                    En <strong>Selemma Properties e Investments</strong> estructuramos inversiones
                    inmobiliarias y patrimoniales de alto valor en Latinoamérica, EE.UU. y Europa.
                    Integramos consultoría estratégica, inteligencia predictiva de ubicación y
                    optimización fiscal para conectar capital privado con activos{" "}
                    <em>off-market</em> —bodegas industriales, hoteles, tierras y desarrollos—
                    además de renta fija respaldada en oro físico. Blindamos su patrimonio con
                    análisis riguroso para asegurar decisiones rentables y transparentes.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-sm border border-gray-900 bg-gray-950 px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:border-[#C8A96A] hover:bg-[#0A1433]"
                  >
                    Agendar Diagnóstico
                    <ArrowUpRight className="h-4 w-4 text-gold" />
                  </Link>
                  <a
                    href="#proceso"
                    className="inline-flex items-center gap-2 rounded-sm border border-gray-300 bg-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-gray-800 transition hover:border-[#C8A96A] hover:text-[#8C6D32]"
                  >
                    Ver Nuestro Proceso
                  </a>
                </div>
              </div>

              {/* Columna Derecha: Carrusel de 3 imágenes basado en Selemma */}
              <div className="lg:col-span-6">
                <div className="relative overflow-hidden rounded-sm border-2 border-[#C8A96A]/75 bg-gray-950 shadow-[0_18px_45px_rgba(15,23,42,0.16)]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    {CAROUSEL_SLIDES.map((slide, index) => (
                      <div
                        key={slide.title}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                          index === activeSlide ? "z-10 opacity-100" : "z-0 opacity-0"
                        }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-full w-full object-cover"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(180deg, rgba(10,20,51,0.15) 0%, rgba(10,20,51,0.45) 50%, rgba(5,8,22,0.92) 100%)",
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                          <span className="inline-block rounded-sm border border-[#C8A96A]/60 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur-sm">
                            {slide.tag}
                          </span>
                          <h3 className="mt-2.5 text-lg font-bold tracking-tight text-white md:text-xl">
                            {slide.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-white/80 md:text-[13px]">
                            {slide.caption}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Controles laterales del carrusel */}
                    <button
                      type="button"
                      onClick={prevSlide}
                      aria-label="Imagen anterior"
                      className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition hover:border-gold hover:bg-black/70 hover:text-gold"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextSlide}
                      aria-label="Siguiente imagen"
                      className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-sm transition hover:border-gold hover:bg-black/70 hover:text-gold"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Barra inferior de indicadores del carrusel */}
                  <div className="flex items-center justify-between border-t border-white/10 bg-[#0A1433] px-5 py-3">
                    <div className="flex items-center gap-2">
                      {CAROUSEL_SLIDES.map((slide, idx) => (
                        <button
                          key={slide.title}
                          type="button"
                          onClick={() => setActiveSlide(idx)}
                          aria-label={`Ir a diapositiva ${idx + 1}`}
                          className={`h-2 rounded-full transition-all ${
                            idx === activeSlide
                              ? "w-7 bg-gold"
                              : "w-2 bg-white/30 hover:bg-white/55"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[11px] tracking-[0.2em] text-white/65">
                      0{activeSlide + 1} / 0{CAROUSEL_SLIDES.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Línea de Tiempo Lineal Cronológica (1 al 5) */}
        <section
          id="proceso"
          ref={timelineRef}
          className="relative overflow-hidden border-t border-gray-200/80 bg-gradient-to-b from-[#F4F5F8] via-[#F8F9FB] to-[#EEF1F6] py-16 md:py-24"
        >
          {/* Sutil mapa / retícula corporativa de fondo como en la imagen de referencia */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(#94A3B8 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#9A7B3E]">
                METODOLOGÍA PASO A PASO
              </p>
              <h2 className="mt-2 text-3xl font-normal tracking-tight text-gray-900 md:text-4xl">
                Nuestro Proceso de <span className="font-bold text-gray-950">Trabajo</span>
              </h2>
              <p className="mt-2.5 text-sm text-gray-600 md:text-[15px]">
                Recorrido cronológico e integral desde su primera sesión hasta la consolidación del
                resultado de su inversión.
              </p>
            </div>

            {/* Contenedor Lineal de las 5 Etapas */}
            <div className="relative mt-14 md:mt-20">
              {/* Línea horizontal animada que cruza cronológicamente del 1 al 5 en escritorio */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-6 left-6 z-0 hidden h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-gray-300/80 lg:block"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#C8A96A] via-[#0B2240] to-[#C8A96A] transition-all duration-[1400ms] ease-out"
                  style={{
                    width: timelineVisible ? `${(visibleStepsCount / PROCESS_STEPS.length) * 100}%` : "0%",
                  }}
                />
              </div>

              {/* Grid lineal de 5 cápsulas con arcos alternados (Arriba / Abajo) */}
              <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5 lg:gap-5">
                {PROCESS_STEPS.map((step, idx) => {
                  const isVisible = idx < visibleStepsCount;
                  const isTopArch = step.archPosition === "top";
                  const IconComponent = step.Icon;

                  return (
                    <div
                      key={step.number}
                      className={`group relative flex flex-col items-center transition-all duration-700 ease-out ${
                        isVisible
                          ? "translate-y-0 scale-100 opacity-100"
                          : "translate-y-8 scale-95 opacity-0"
                      }`}
                    >
                      {/* Arco curvo superior (Etapas impares: 01, 03, 05) */}
                      {isTopArch && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-3.5 -right-2 -left-2 z-0 h-[52%] rounded-t-[140px] border-t-[9px] border-r-[9px] border-l-[9px] transition-all duration-700"
                          style={{
                            borderColor: step.archColor,
                            opacity: isVisible ? 1 : 0,
                          }}
                        >
                          <span
                            className="absolute -bottom-1.5 -left-[9px] h-3 w-3 rounded-full"
                            style={{ backgroundColor: step.archColor }}
                          />
                          <span
                            className="absolute -right-[9px] -bottom-1.5 h-3 w-3 rounded-full"
                            style={{ backgroundColor: step.archColor }}
                          />
                        </div>
                      )}

                      {/* Arco curvo inferior (Etapas pares: 02, 04) */}
                      {!isTopArch && (
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-2 -bottom-3.5 -left-2 z-0 h-[52%] rounded-b-[140px] border-r-[9px] border-b-[9px] border-l-[9px] transition-all duration-700"
                          style={{
                            borderColor: step.archColor,
                            opacity: isVisible ? 1 : 0,
                          }}
                        >
                          <span
                            className="absolute -top-1.5 -left-[9px] h-3 w-3 rounded-full"
                            style={{ backgroundColor: step.archColor }}
                          />
                          <span
                            className="absolute -top-1.5 -right-[9px] h-3 w-3 rounded-full"
                            style={{ backgroundColor: step.archColor }}
                          />
                        </div>
                      )}

                      {/* Cápsula / Tarjeta Vertical de la Etapa */}
                      <article className="relative z-10 flex h-full min-h-[450px] w-full flex-col justify-between rounded-[110px] border border-gray-200/90 bg-gradient-to-b from-white via-white to-[#F7F8FA] px-5 py-9 text-center shadow-[0_18px_40px_rgba(15,23,42,0.10)] ring-1 ring-gray-900/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_24px_50px_rgba(15,23,42,0.15)]">
                        {/* Encabezado de la cápsula (Icono arriba en impares, STEP arriba en pares) */}
                        <div className="flex flex-col items-center">
                          {isTopArch ? (
                            <div
                              className="flex h-13 w-13 items-center justify-center rounded-full border border-[#C8A96A]/45 bg-[#FAF8F4] shadow-inner transition group-hover:scale-105"
                              style={{ color: step.archColor }}
                            >
                              <IconComponent className="h-6 w-6 stroke-[1.75]" />
                            </div>
                          ) : (
                            <div className="pt-1">
                              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8C6D32]">
                                ETAPA
                              </span>
                              <div
                                className="mt-0.5 text-2xl font-extrabold tracking-tight"
                                style={{ color: step.archColor }}
                              >
                                {step.number}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Cuerpo central: Título y Descripción completa legible */}
                        <div className="my-4 flex flex-1 flex-col justify-center px-1">
                          <h3 className="text-[15.5px] font-bold leading-snug tracking-tight text-gray-950">
                            {step.title}
                          </h3>
                          <div
                            className="mx-auto my-2.5 h-[2px] w-10 rounded-full"
                            style={{ backgroundColor: step.archColor }}
                          />
                          <p className="text-[12.2px] leading-relaxed text-gray-700">
                            {step.description}
                          </p>
                        </div>

                        {/* Pie de la cápsula (STEP abajo en impares, Icono abajo en pares) */}
                        <div className="flex flex-col items-center">
                          {isTopArch ? (
                            <div className="pb-1">
                              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#8C6D32]">
                                ETAPA
                              </span>
                              <div
                                className="mt-0.5 text-2xl font-extrabold tracking-tight"
                                style={{ color: step.archColor }}
                              >
                                {step.number}
                              </div>
                            </div>
                          ) : (
                            <div
                              className="flex h-13 w-13 items-center justify-center rounded-full border border-gray-200 bg-[#F4F6FA] shadow-inner transition group-hover:scale-105"
                              style={{ color: step.archColor }}
                            >
                              <IconComponent className="h-6 w-6 stroke-[1.75]" />
                            </div>
                          )}
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Conoce a Nuestros Asesores Financieros */}
        <section className="border-t border-gray-200/80 bg-white py-16 md:py-22">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="text-center">
              <h2 className="text-3xl font-normal tracking-tight text-gray-900 md:text-4xl">
                Conoce a <span className="font-bold text-gray-950">Nuestros</span>
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-600 md:text-base">
                Asesores Financieros
              </p>
            </div>

            <div className="mt-12 flex justify-center">
              <article className="w-full max-w-sm overflow-hidden rounded-sm border border-gray-200 border-b-4 border-b-[#C8A96A] bg-[#FBFBFD] shadow-[0_16px_45px_rgba(15,23,42,0.10)] transition hover:shadow-[0_20px_55px_rgba(15,23,42,0.14)]">
                {/* Contenedor de foto con insignia de LinkedIn en la esquina superior derecha */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#0A1433]">
                  <img
                    src={johanSandovalImg}
                    alt="Johan Steven Sandoval Gómez — CEO Global y Consultor Senior"
                    className="h-full w-full origin-top scale-[1.06] object-cover object-top"
                  />
                  <a
                    href="https://www.linkedin.com/company/selemma-investments"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn de Johan Steven Sandoval Gómez"
                    className="absolute top-0 right-0 flex h-12 w-10 items-center justify-center bg-[#0B3B68] text-sm font-bold text-white shadow-md transition hover:bg-[#C8A96A] hover:text-gray-950"
                  >
                    in
                  </a>
                </div>

                {/* Información del asesor */}
                <div className="p-6 md:p-7">
                  <h3 className="text-xl font-bold tracking-tight text-gray-950">
                    Johan Steven Sandoval Gómez
                  </h3>
                  <p className="mt-1 text-sm italic text-[#8C6D32]">
                    CEO Global y Consultor Senior
                  </p>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-gray-700">
                    Durante 10 años lleva en compañías multinacionales entendiendo el mercado
                    inmobiliario y sus dificultades, y como Ingeniero de Software simplificó las
                    dificultades de inversión para que sean seguras, con información adecuada y el
                    resultado esperado de acuerdo a la información.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

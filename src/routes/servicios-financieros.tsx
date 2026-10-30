import { createFileRoute } from "@tanstack/react-router";
import InversionAlternativa from "@/components/InversionAlternativa";
import financialHeroImg from "@/assets/financial-hero.jpg";
import { Nav, Footer } from "./index";

export const Route = createFileRoute("/servicios-financieros")({
  head: () => ({
    meta: [
      { title: "Servicios Financieros · Pagaré Renta Fija en Oro — Selemma Investments" },
      {
        name: "description",
        content:
          "Servicios financieros y gestión patrimonial de Selemma Investments: diversificación y refugio de capital en materias preciosas junto a London DE Group.",
      },
    ],
  }),
  component: ServiciosFinancierosPage,
});

function ServiciosFinancierosPage() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <Nav />

      <main className="bg-[#FBFBFD]">
        {/* Hero con imagen de fondo corporativa en proporción elegante y borde resaltado */}
        <section className="relative isolate flex min-h-[340px] items-end overflow-hidden border-b-2 border-[#C8A96A]/70 pt-24 pb-12 shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:min-h-[380px] md:pb-16">
          <img
            src={financialHeroImg}
            alt="Selemma Investments — Servicios Financieros"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,5,5,0.90) 0%, rgba(10,20,51,0.76) 55%, rgba(5,5,5,0.58) 100%)",
            }}
          />
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="inline-flex items-center gap-2.5 rounded-sm border border-[#C8A96A]/55 bg-black/35 px-3.5 py-1.5 backdrop-blur-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                SELEMMA INVESTMENTS
              </p>
            </div>
            <h1 className="mt-3.5 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Servicios Financieros
            </h1>
          </div>
        </section>

        {/* Descripción institucional leve de Selemma Investments con marco elegante y borde resaltado */}
        <section className="bg-white pt-14 pb-6 text-gray-900">
          <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
            <div className="relative rounded-sm border border-gray-200 border-l-4 border-l-[#C8A96A] bg-white p-8 shadow-[0_14px_45px_rgba(15,23,42,0.10)] ring-1 ring-gray-900/5 md:p-11">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-8">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9A7B3E]">
                    Gestión Patrimonial & Estructuración
                  </p>
                  <h2 className="text-2xl font-normal leading-snug tracking-tight text-gray-900 md:text-3xl">
                    Nos inspira lo más importante:
                    <span className="mt-1 block font-bold text-gray-950">
                      usted y sus objetivos patrimoniales.
                    </span>
                  </h2>
                  <div className="mt-4 space-y-3.5 text-[13.5px] leading-relaxed text-gray-700">
                    <p>
                      En <strong>Selemma Investments</strong> nuestros clientes son siempre la
                      prioridad número uno; cada recomendación y estructura se diseña alineada
                      exclusivamente con su mejor interés. Trabajamos para asegurar una asesoría
                      patrimonial calificada, evaluando integralmente su situación financiera
                      actual, su perfil de riesgo y sus metas de preservación y crecimiento a largo
                      plazo.
                    </p>
                    <p>
                      Como firma especializada en inversión estratégica, conectamos el capital
                      privado con activos reales de alto respaldo —combinando el sector inmobiliario
                      off-market con instrumentos internacionales de renta fija en materias
                      preciosas— bajo estrictos estándares de debida diligencia y seguridad
                      fiduciaria.
                    </p>
                  </div>
                </div>

                {/* Tarjetas laterales de respaldo institucional con borde resaltado */}
                <div className="grid gap-3 sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1">
                  <div className="rounded-sm border border-[#C8A96A]/55 bg-[#FAF8F4] px-4 py-3.5 shadow-xs">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8C6D32]">
                      Arquitectura Patrimonial
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-700">
                      Estructuras hechas a la medida del perfil y horizonte de cada inversionista.
                    </p>
                  </div>
                  <div className="rounded-sm border border-[#C8A96A]/55 bg-[#FAF8F4] px-4 py-3.5 shadow-xs">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8C6D32]">
                      Activos Refugio Tangibles
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-700">
                      Diversificación internacional con respaldo fiduciario de primer orden.
                    </p>
                  </div>
                  <div className="rounded-sm border border-[#C8A96A]/55 bg-[#FAF8F4] px-4 py-3.5 shadow-xs">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8C6D32]">
                      Debida Diligencia
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-gray-700">
                      Acompañamiento integral, rigor técnico y confidencialidad institucional.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección London DE Group — Pagaré Renta Fija en Oro */}
        <InversionAlternativa />
      </main>

      <Footer />
    </div>
  );
}

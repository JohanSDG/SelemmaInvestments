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

      <main>
        {/* Hero con imagen de fondo corporativa al estilo institucional */}
        <section className="relative isolate flex min-h-[420px] items-end overflow-hidden pt-28 pb-16 md:min-h-[480px] md:pb-24">
          <img
            src={financialHeroImg}
            alt="Selemma Investments — Servicios Financieros"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,5,5,0.88) 0%, rgba(10,20,51,0.72) 55%, rgba(5,5,5,0.55) 100%)",
            }}
          />
          <div className="mx-auto w-full max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-gold md:text-sm">
              SELEMMA INVESTMENTS
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Servicios Financieros
            </h1>
          </div>
        </section>

        {/* Descripción institucional leve de Selemma Investments (sin video) */}
        <section className="border-b border-gray-100 bg-white py-20 text-gray-900">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-normal leading-tight tracking-tight text-gray-900 md:text-4xl">
                Nos inspira lo más importante:
                <span className="mt-1 block font-bold text-gray-950">
                  usted y sus objetivos patrimoniales.
                </span>
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 md:text-base">
                <p>
                  En <strong>Selemma Investments</strong> nuestros clientes son siempre la prioridad
                  número uno; cada recomendación y estructura se diseña alineada exclusivamente con
                  su mejor interés. Trabajamos para asegurar una asesoría patrimonial calificada,
                  evaluando integralmente su situación financiera actual, su perfil de riesgo y sus
                  metas de preservación y crecimiento a largo plazo.
                </p>
                <p>
                  Como firma especializada en inversión estratégica, conectamos el capital privado
                  con activos reales de alto respaldo —combinando el sector inmobiliario off-market
                  con instrumentos internacionales de renta fija en materias preciosas— bajo
                  estrictos estándares de debida diligencia y seguridad fiduciaria.
                </p>
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

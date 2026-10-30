import { createFileRoute } from "@tanstack/react-router";
import InversionAlternativa from "@/components/InversionAlternativa";
import { Nav, Footer } from "./index";

export const Route = createFileRoute("/servicios-financieros")({
  head: () => ({
    meta: [
      { title: "Servicios Financieros · Pagaré Renta Fija en Oro — Selemma Investments" },
      {
        name: "description",
        content:
          "Diversificación y refugio de capital en materias preciosas: Pagaré de Renta Fija en Oro en alianza con London DE Group.",
      },
    ],
  }),
  component: ServiciosFinancierosPage,
});

function ServiciosFinancierosPage() {
  return (
    <div className="min-h-screen bg-navy text-white">
      <Nav />
      <main className="pt-20">
        <InversionAlternativa />
      </main>
      <Footer />
    </div>
  );
}


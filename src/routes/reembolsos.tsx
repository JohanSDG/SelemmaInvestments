import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { LEGAL_VERSIONS } from "@/lib/consent-audit";

export const Route = createFileRoute("/reembolsos")({
  head: () => ({
    meta: [
      { title: "Política de Reembolso y Derecho de Retracto — Selemma Investments" },
      {
        name: "description",
        content:
          "Política de Reembolso, Derecho de Retracto (Art. 47 Ley 1480 de 2011) y Reversión de Pagos (Art. 51 Ley 1480 de 2011) de Selemma Investments.",
      },
    ],
  }),
  component: ReembolsosPage,
});

function ReembolsosPage() {
  return (
    <LegalLayout
      eyebrow="Estatuto del Consumidor · Ley 1480 de 2011"
      title="Política de Reembolso, Retracto y Reversión de Pagos"
      version={LEGAL_VERSIONS.refund}
      updatedAt="29 de octubre de 2026"
      activePath="/reembolsos"
    >
      <LegalSection
        number="01"
        title="Gratuidad del Diagnóstico Inicial y Alcance de esta Política"
      >
        <p>
          El agendamiento de la reunión exploratoria o diagnóstico inicial a través del formulario
          de este sitio web no genera cobro automático en línea. En caso de que el cliente o
          inversionista contrate y pague honorarios por servicios de consultoría, estructuración
          financiera, avalúo técnico o estudios de mercado mediante canales digitales o no
          tradicionales, se aplicarán las reglas de reembolso, retracto y reversión descritas a
          continuación.
        </p>
      </LegalSection>

      <LegalSection
        number="02"
        title="Derecho de Retracto (Artículo 47 de la Ley 1480 de 2011 — Colombia)"
      >
        <p>
          En todos los contratos para la prestación de servicios de consultoría celebrados mediante
          sistemas de financiación o métodos no tradicionales o a distancia, el cliente podrá
          ejercer el <strong>Derecho de Retracto</strong> dentro de los{" "}
          <strong>cinco (5) días hábiles siguientes</strong> a la celebración del contrato o pago
          del anticipo, siempre y cuando la prestación del servicio no haya comenzado a ejecutarse
          con acuerdo del cliente.
        </p>
        <p>
          Ejercido oportunamente el retracto, Selemma Investments devolverá todas las sumas pagadas
          sin que proceda a hacer descuentos o retenciones por concepto alguno, en un plazo máximo
          de <strong>treinta (30) días calendario</strong> desde el momento en que se ejerció el
          derecho.
        </p>
      </LegalSection>

      <LegalSection
        number="03"
        title="Reversión del Pago en Medios Electrónicos (Artículo 51 Ley 1480 de 2011 y Decreto 587 de 2016)"
      >
        <p>
          Cuando el pago de un servicio de consultoría se haya realizado mediante tarjeta de
          crédito, débito o cualquier otro instrumento de pago electrónico, el pagador podrá
          solicitar la <strong>reversión del pago</strong> dentro de los{" "}
          <strong>cinco (5) días hábiles siguientes</strong> a la fecha en que tuvo noticia de
          alguna de las siguientes causales legales:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Cuando sea objeto de fraude.</li>
          <li>Cuando corresponda a una operación no solicitada.</li>
          <li>Cuando el servicio contratado no sea prestado en los términos pactados.</li>
          <li>Cuando el valor cargado no corresponda al valor del servicio contratado.</li>
        </ul>
      </LegalSection>

      <LegalSection
        number="04"
        title="Reglas de Cancelación y Reembolso en Contratos de Mandato y Estructuración a Medida"
      >
        <p>
          En servicios de consultoría corporativa o estructuración patrimonial donde la ejecución
          técnica ya haya iniciado con autorización expresa del cliente:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            Si la cancelación ocurre antes de la entrega del informe preliminar de factibilidad, se
            reembolsará el porcentaje no ejecutado tras descontar los costos técnicos y horas de
            análisis efectivamente causadas y soportadas.
          </li>
          <li>
            En contratos de corretaje o representación inmobiliaria sujetos a comisión de éxito
            (<em>Success Fee</em>), los honorarios solo se causan conforme a los hitos de cierre
            estipulados en el respectivo mandato escrito.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="05" title="Canal para Solicitar Reembolsos, Retractos o Reversiones">
        <p>
          Toda solicitud de reembolso, retracto o reversión deberá enviarse por escrito a{" "}
          <a href="mailto:selemma.investments@gmail.com" className="text-gold underline">
            selemma.investments@gmail.com
          </a>{" "}
          indicando el nombre completo del titular, soporte del pago, causal invocada y datos
          bancarios para la devolución. Recibirá confirmación de radicado en menos de veinticuatro
          (24) horas hábiles.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}


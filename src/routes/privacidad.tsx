import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { LEGAL_VERSIONS } from "@/lib/consent-audit";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad y Tratamiento de Datos — Selemma Investments" },
      {
        name: "description",
        content:
          "Política de Tratamiento de Datos Personales conforme a la Ley 1581 de 2012, Decreto 1377 de 2013 (SIC Colombia), GDPR y CCPA.",
      },
    ],
  }),
  component: PrivacidadPage,
});

function PrivacidadPage() {
  return (
    <LegalLayout
      eyebrow="Habeas Data · SIC Colombia · GDPR & CCPA"
      title="Política de Privacidad y Tratamiento de Datos Personales"
      version={LEGAL_VERSIONS.privacy}
      updatedAt="29 de octubre de 2026"
      activePath="/privacidad"
    >
      <LegalSection number="01" title="Responsable del Tratamiento de Datos Personales">
        <p>
          En cumplimiento del artículo 15 de la Constitución Política de Colombia, la{" "}
          <strong>Ley Estatutaria 1581 de 2012</strong>, el{" "}
          <strong>Decreto Único Reglamentario 1074 de 2015</strong> (que compila el Decreto 1377 de
          2013), las directrices de la{" "}
          <strong>Superintendencia de Industria y Comercio (SIC)</strong>, así como el{" "}
          <strong>Reglamento General de Protección de Datos (GDPR - UE 2016/679)</strong> y la{" "}
          <strong>CCPA/CPRA (California, EE.UU.)</strong>, se informa a los Titulares:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Responsable:</strong> Selemma Investments
          </li>
          <li>
            <strong>Correo oficial de Protección de Datos (Oficial de Privacidad):</strong>{" "}
            <a href="mailto:selemma.investments@gmail.com" className="text-gold underline">
              selemma.investments@gmail.com
            </a>
          </li>
          <li>
            <strong>Ámbito territorial:</strong> República de Colombia, Latinoamérica y Estados
            Unidos.
          </li>
        </ul>
      </LegalSection>

      <LegalSection
        number="02"
        title="Principio de Minimización: Datos Personales que Recolectamos"
      >
        <p>
          Aplicamos estrictamente el principio de minimización y finalidad. Solo solicitamos los
          datos estrictamente indispensables para atender su solicitud de diagnóstico o inversión:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Datos de identificación y contacto necesarios:</strong> Nombre completo,
            correo electrónico, número de teléfono/WhatsApp y país de residencia/interés.
          </li>
          <li>
            <strong>Datos contextuales de inversión (según línea elegida):</strong> Interés
            principal (consultoría, representación de usuarios/propietarios o inversión off-market)
            y comentarios voluntarios.
          </li>
          <li>
            <strong>Datos de trazabilidad de consentimiento (Accountability SIC):</strong> Fecha y
            hora exacta (ISO 8601), zona horaria, versión aceptada de los Términos y Política de
            Privacidad, ruta del formulario, navegador (User-Agent) y huella criptográfica SHA-256
            como prueba del consentimiento otorgado conforme al artículo 9 de la Ley 1581 de 2012.
          </li>
        </ul>
        <p>
          <strong>No recolectamos datos sensibles</strong> (origen racial, orientación política,
          religiosa, datos biométricos ni de salud) a través de nuestros formularios web.
        </p>
      </LegalSection>

      <LegalSection number="03" title="Finalidades del Tratamiento">
        <p>
          Los datos personales autorizados de manera previa, expresa e informada mediante casilla
          independiente serán tratados exclusivamente para:
        </p>
        <ol className="list-decimal space-y-1 pl-5">
          <li>
            Agendar y desarrollar la reunión o diagnóstico estratégico solicitado por el Titular.
          </li>
          <li>
            Presentar propuestas de consultoría, representación o activos inmobiliarios off-market
            acordes con el perfil e interés manifestado.
          </li>
          <li>
            Conservar la prueba verificable de la autorización de tratamiento de datos ante
            eventuales requerimientos de la Superintendencia de Industria y Comercio (SIC).
          </li>
          <li>
            Cumplir obligaciones legales de debida diligencia y prevención de lavado de activos
            cuando se celebre un mandato o contrato.
          </li>
        </ol>
      </LegalSection>

      <LegalSection number="04" title="Derechos de los Titulares (Habeas Data, GDPR y CCPA)">
        <p>
          De conformidad con el artículo 8 de la Ley 1581 de 2012 y normativas internacionales, el
          Titular tiene derecho en todo momento a:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a Selemma
            Investments.
          </li>
          <li>
            <strong>Solicitar prueba de la autorización</strong> otorgada (incluyendo fecha, hora,
            versión de la política y hash de verificación).
          </li>
          <li>
            <strong>Ser informado</strong> respecto del uso que se le ha dado a sus datos
            personales.
          </li>
          <li>
            <strong>Revocar la autorización y/o solicitar la supresión</strong> del dato cuando no
            seuxtaponga un deber legal o contractual de permanecer en la base de datos.
          </li>
          <li>
            <strong>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC)</strong>{" "}
            por infracciones a la Ley 1581 de 2012, una vez agotado el trámite de consulta o
            reclamo directo ante el Responsable.
          </li>
        </ul>
      </LegalSection>

      <LegalSection
        number="05"
        title="Procedimiento y Plazos Legales para Consultas y Reclamos"
      >
        <p>
          El Titular o sus causahabientes pueden ejercer sus derechos enviando una solicitud a{" "}
          <a href="mailto:selemma.investments@gmail.com" className="text-gold underline">
            selemma.investments@gmail.com
          </a>{" "}
          con el asunto <em>&ldquo;Ejercicio Habeas Data&rdquo;</em>:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Consultas (Art. 14 Ley 1581 de 2012):</strong> Se atenderán en un término
            máximo de <strong>diez (10) días hábiles</strong> contados a partir de la fecha de
            recibo.
          </li>
          <li>
            <strong>Reclamos, correcciones o supresiones (Art. 15 Ley 1581 de 2012):</strong> Se
            atenderán en un término máximo de <strong>quince (15) días hábiles</strong> contados a
            partir del día siguiente a la fecha de su recibo.
          </li>
        </ul>
      </LegalSection>

      <LegalSection
        number="06"
        title="Seguridad de la Información, Transferencia Internacional y Vigencia"
      >
        <p>
          La información se almacena en infraestructura en la nube con cifrado en tránsito (TLS
          1.3) y en reposo (Supabase / AWS), bajo estándares internacionales de seguridad. Los
          datos permanecerán almacenados únicamente durante el tiempo razonable y necesario para
          cumplir las finalidades autorizadas y los deberes legales de conservación documental en
          Colombia (Art. 28 de la Ley 962 de 2005).
        </p>
      </LegalSection>
    </LegalLayout>
  );
}


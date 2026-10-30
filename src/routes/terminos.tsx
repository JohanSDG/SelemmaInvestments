import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { LEGAL_VERSIONS } from "@/lib/consent-audit";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones — Selemma Investments" },
      {
        name: "description",
        content:
          "Términos y Condiciones de Uso, avisos regulatorios nacionales e internacionales y propiedad intelectual de Selemma Investments.",
      },
    ],
  }),
  component: TerminosPage,
});

function TerminosPage() {
  return (
    <LegalLayout
      eyebrow="Marco Contractual y Regulatorio"
      title="Términos y Condiciones de Uso"
      version={LEGAL_VERSIONS.terms}
      updatedAt="29 de octubre de 2026"
      activePath="/terminos"
    >
      <LegalSection number="01" title="Identificación del Titular y Aceptación">
        <p>
          El presente sitio web es operado por <strong>Selemma Investments</strong> (en adelante,
          &ldquo;Selemma&rdquo;), firma especializada en estructuración, consultoría y originación
          inmobiliaria privada en Latinoamérica y Estados Unidos, con canal oficial de atención
          legal y administrativa en{" "}
          <a href="mailto:selemma.investments@gmail.com" className="text-gold underline">
            selemma.investments@gmail.com
          </a>
          .
        </p>
        <p>
          El acceso, navegación o envío de formularios a través de esta plataforma implica el
          conocimiento y aceptación libre, previa y expresa de los presentes Términos y Condiciones,
          conforme a la <strong>Ley 527 de 1999</strong> (Comercio Electrónico y Mensajes de Datos)
          y la <strong>Ley 1480 de 2011</strong> (Estatuto del Consumidor de la República de
          Colombia).
        </p>
      </LegalSection>

      <LegalSection
        number="02"
        title="Naturaleza Informativa y Exclusión de Oferta Pública de Valores (Colombia, EE.UU. e Internacional)"
      >
        <p>
          <strong>Aviso Regulatorio Colombia (Decreto 2555 de 2010 / Superintendencia Financiera):</strong>{" "}
          La información contenida en este sitio web tiene carácter estrictamente informativo e
          institucional sobre servicios de consultoría, corretaje y representación inmobiliaria
          sobre activos reales. En ningún caso constituye oferta pública de valores, captación
          masiva y habitual de dineros del público, ni asesoría bursátil regulada.
        </p>
        <p>
          <strong>Aviso Regulatorio Estados Unidos e Internacional (SEC / Reg D &amp; Reg S):</strong>{" "}
          Nada de lo publicado en este portal constituye una oferta de venta ni una solicitud de
          compra de valores (<em>securities</em>) bajo el <em>U.S. Securities Act of 1933</em> o el{" "}
          <em>Investment Advisers Act of 1940</em>. Cualquier negocio jurídico sobre activos
          inmobiliarios se instrumenta de forma privada, bilateral y mediante contratos específicos
          sujetos a debida diligencia legal, tributaria y financiera.
        </p>
      </LegalSection>

      <LegalSection
        number="03"
        title="Prevención de Lavado de Activos (SARLAFT / SAGRILAFT / KYC / AML)"
      >
        <p>
          Toda vinculación comercial, mandato de búsqueda o estructuración inmobiliaria con Selemma
          Investments está sujeta a la verificación de identidad, origen de fondos y listas
          restrictivas nacionales e internacionales (OFAC, ONU, UIAF), en cumplimiento de las normas
          colombianas e internacionales contra el lavado de activos, financiación del terrorismo y
          proliferación de armas de destrucción masiva (SAGRILAFT / SARLAFT / USA PATRIOT Act).
        </p>
      </LegalSection>

      <LegalSection
        number="04"
        title="Propiedad Intelectual, Marcas Nominativas y Derechos de Imagen"
      >
        <p>
          El diseño, código fuente, logotipos de <strong>Selemma Investments</strong>, textos
          estratégicos y gráficos vectoriales están protegidos por la{" "}
          <strong>Ley 23 de 1982</strong>, la <strong>Decisión Andina 351 de 1993</strong> y la{" "}
          <strong>Decisión Andina 486 de 2000</strong> sobre Propiedad Industrial.
        </p>
        <p>
          <strong>Derechos sobre fotografías e ilustraciones:</strong> Las imágenes arquitectónicas
          empleadas en el sitio cuentan con licencia comercial mundial vigente e irrevocable
          (Unsplash Commercial License) o son de titularidad directa de Selemma Investments.
        </p>
        <p>
          <strong>Uso referencial de nombres del sector:</strong> Las denominaciones empresariales
          mencionadas de forma enunciativa en el ecosistema inmobiliario pertenecen a sus
          respectivos titulares registrales y se citan únicamente con fines descriptivos del
          sector institucional conforme al uso leal e informativo permitido por la ley, sin que
          ello implique agencia, filialidad o patrocinio salvo convenio expreso por escrito.
        </p>
      </LegalSection>

      <LegalSection number="05" title="Limitación de Responsabilidad y Proyecciones Financieras">
        <p>
          Las referencias a rentabilidades históricas, beneficios tributarios o zonas de privilegio
          fiscal dependen de la estructuración particular de cada activo y de la normativa vigente
          en cada jurisdicción (Colombia, EE.UU. u otros países de LATAM). Selemma Investments no
          garantiza rendimientos futuros fijos sin la suscripción previa de los contratos
          definitivos y el análisis técnico del activo correspondiente.
        </p>
      </LegalSection>

      <LegalSection number="06" title="Ley Aplicable, Jurisdicción y Solución de Controversias">
        <p>
          Estos Términos y Condiciones se rigen por las leyes de la{" "}
          <strong>República de Colombia</strong>. Para cualquier diferencia derivada del uso del
          sitio web, las partes acuerdan acudir en primera instancia al arreglo directo durante un
          plazo de quince (15) días hábiles, y en su defecto a la jurisdicción ordinaria o
          autoridades competentes de la República de Colombia, sin perjuicio de las normas
          imperativas de protección al consumidor aplicables en el domicilio del usuario.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}

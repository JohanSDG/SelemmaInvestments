import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout, LegalSection } from "@/components/LegalLayout";
import { LEGAL_VERSIONS } from "@/lib/consent-audit";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — Selemma Investments" },
      {
        name: "description",
        content:
          "Política de Cookies y Almacenamiento Local de Selemma Investments conforme a las guías de la SIC y normativa ePrivacy/GDPR.",
      },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Transparencia Técnica · SIC & ePrivacy"
      title="Política de Cookies y Almacenamiento Local"
      version={LEGAL_VERSIONS.cookies}
      updatedAt="29 de octubre de 2026"
      activePath="/cookies"
    >
      <LegalSection number="01" title="¿Qué son las Cookies y el Almacenamiento Local?">
        <p>
          Las cookies y tecnologías de almacenamiento local (<code>localStorage</code>) son
          pequeños registros de datos que el navegador guarda en su dispositivo para permitir el
          funcionamiento técnico del sitio web, recordar sus preferencias de privacidad y mantener
          la seguridad de la sesión.
        </p>
      </LegalSection>

      <LegalSection
        number="02"
        title="Dictamen Legal: ¿Se necesita consentimiento en este sitio web?"
      >
        <p>
          Conforme a la guía de la <strong>Superintendencia de Industria y Comercio (SIC)</strong>{" "}
          de Colombia y el artículo 5(3) de la Directiva ePrivacy / GDPR:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Cookies técnicas o estrictamente necesarias:</strong> Están exentas de
            consentimiento previo bloqueante porque son indispensables para prestar el servicio
            solicitado por el usuario y guardar la evidencia de su decisión de privacidad.
          </li>
          <li>
            <strong>Cookies analíticas o publicitarias de terceros:</strong> Requieren
            consentimiento previo, expreso e informado. Actualmente,{" "}
            <strong>
              Selemma Investments no instala cookies publicitarias ni rastreadores de terceros sin
              su autorización expresa
            </strong>{" "}
            en el banner de consentimiento.
          </li>
        </ul>
      </LegalSection>

      <LegalSection number="03" title="Inventario Técnico de Almacenamiento Utilizado">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-white/15 text-gold">
                <th className="py-2.5 pr-4">Identificador</th>
                <th className="py-2.5 pr-4">Tipo</th>
                <th className="py-2.5 pr-4">Finalidad</th>
                <th className="py-2.5">Duración</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-white/70">
              <tr>
                <td className="py-3 pr-4 font-mono text-white">selemma_cookie_consent_v1</td>
                <td className="py-3 pr-4">Técnica / Necesaria</td>
                <td className="py-3 pr-4">
                  Guarda su elección en el banner de cookies (fecha, hora y versión).
                </td>
                <td className="py-3">12 meses</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-white">selemma_sic_consent_receipts</td>
                <td className="py-3 pr-4">Técnica / Evidencia Legal</td>
                <td className="py-3 pr-4">
                  Conserva en su navegador el comprobante criptográfico SHA-256 de las casillas de
                  consentimiento aceptadas.
                </td>
                <td className="py-3">Persistente (control del usuario)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-mono text-white">sb-*-auth-token</td>
                <td className="py-3 pr-4">Técnica / Autenticación</td>
                <td className="py-3 pr-4">
                  Mantiene la sesión segura únicamente cuando el usuario inicia sesión de forma
                  explícita en <code>/login</code>.
                </td>
                <td className="py-3">Duración de la sesión</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection number="04" title="Cómo Gestionar o Revocar las Cookies">
        <p>
          Usted puede eliminar o bloquear las cookies y el almacenamiento local en cualquier
          momento desde la configuración de su navegador (Chrome, Safari, Firefox, Edge). También
          puede restablecer su preferencia de cookies en este sitio haciendo clic en el botón a
          continuación:
        </p>
        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.localStorage.removeItem("selemma_cookie_consent_v1");
                window.location.reload();
              }
            }}
            className="btn-pill btn-ghost-light text-xs"
          >
            Restablecer preferencias de cookies
          </button>
        </div>
      </LegalSection>
    </LegalLayout>
  );
}

import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { LEGAL_VERSIONS } from "@/lib/consent-audit";

const STORAGE_KEY = "selemma_cookie_consent_v1";

export interface CookieConsentRecord {
  decision: "essential_only" | "all";
  acceptedAtIso: string;
  policyVersion: string;
  timezone: string;
}

export function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  function saveDecision(decision: "essential_only" | "all") {
    const record: CookieConsentRecord = {
      decision,
      acceptedAtIso: new Date().toISOString(),
      policyVersion: LEGAL_VERSIONS.cookies,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch {
      // Ignore storage error
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Aviso de cookies y privacidad"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/25 bg-navy/95 px-6 py-4 text-white shadow-2xl backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <p className="max-w-3xl text-xs leading-relaxed text-white/75">
            Utilizamos cookies y almacenamiento local estrictamente necesarios para el
            funcionamiento técnico, la seguridad y el registro auditable de consentimientos
            legales. No activamos cookies analíticas ni de terceros sin su autorización
            expresa. Consulte nuestra{" "}
            <Link
              to="/cookies"
              className="font-medium text-gold underline underline-offset-2 hover:text-white"
            >
              Política de Cookies
            </Link>{" "}
            y{" "}
            <Link
              to="/privacidad"
              className="font-medium text-gold underline underline-offset-2 hover:text-white"
            >
              Política de Privacidad
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => saveDecision("essential_only")}
            className="btn-pill btn-ghost-light px-4 py-2 text-xs"
          >
            Solo necesarias
          </button>
          <button
            type="button"
            onClick={() => saveDecision("all")}
            className="btn-pill btn-gold px-4 py-2 text-xs"
          >
            Aceptar todas
          </button>
        </div>
      </div>
    </aside>
  );
}


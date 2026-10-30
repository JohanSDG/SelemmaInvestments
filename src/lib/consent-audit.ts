/**
 * Módulo de Trazabilidad y Prueba de Autorización (Accountability ante la SIC)
 * Cumplimiento del Art. 9 y Art. 12 de la Ley 1581 de 2012 y Decreto 1377 de 2013 (Colombia),
 * así como el Art. 7 del GDPR (UE).
 */

export const LEGAL_VERSIONS = {
  terms: "v1.0-2026-10-29",
  privacy: "v1.0-2026-10-29",
  cookies: "v1.0-2026-10-29",
  refund: "v1.0-2026-10-29",
} as const;

export const CONSENT_TEXTS = {
  terms:
    "Acepto de manera libre, expresa e informada los Términos y Condiciones de uso de Selemma Investments.",
  privacy:
    "Autorizo de manera previa, expresa e informada a Selemma Investments para el tratamiento de mis datos personales conforme a la Política de Privacidad y la Ley 1581 de 2012 (Habeas Data).",
} as const;

export interface ConsentAuditProof {
  consentId: string;
  acceptedAtIso: string;
  timezone: string;
  formPath: string;
  userAgent: string;
  acceptedTerms: boolean;
  termsVersion: string;
  termsText: string;
  acceptedPrivacy: boolean;
  privacyVersion: string;
  privacyText: string;
  proofHash: string;
}

async function sha256Hex(input: string): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const encoded = new TextEncoder().encode(input);
    const buffer = await crypto.subtle.digest("SHA-256", encoded);
    return Array.from(new Uint8Array(buffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  // Fallback deterministic hash if SubtleCrypto is unavailable
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (Math.imul(31, h) + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h).toString(16).padStart(16, "0");
}

export async function createConsentAuditProof(params: {
  email: string;
  formPath: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}): Promise<ConsentAuditProof> {
  const consentId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `sic-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

  const acceptedAtIso = new Date().toISOString();
  const timezone =
    typeof Intl !== "undefined"
      ? Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"
      : "UTC";
  const userAgent =
    typeof navigator !== "undefined" ? navigator.userAgent : "server";

  const canonical = JSON.stringify({
    consentId,
    email: params.email.trim().toLowerCase(),
    acceptedAtIso,
    timezone,
    formPath: params.formPath,
    acceptedTerms: params.acceptedTerms,
    termsVersion: LEGAL_VERSIONS.terms,
    termsText: CONSENT_TEXTS.terms,
    acceptedPrivacy: params.acceptedPrivacy,
    privacyVersion: LEGAL_VERSIONS.privacy,
    privacyText: CONSENT_TEXTS.privacy,
  });

  const proofHash = await sha256Hex(canonical);

  const proof: ConsentAuditProof = {
    consentId,
    acceptedAtIso,
    timezone,
    formPath: params.formPath,
    userAgent,
    acceptedTerms: params.acceptedTerms,
    termsVersion: LEGAL_VERSIONS.terms,
    termsText: CONSENT_TEXTS.terms,
    acceptedPrivacy: params.acceptedPrivacy,
    privacyVersion: LEGAL_VERSIONS.privacy,
    privacyText: CONSENT_TEXTS.privacy,
    proofHash,
  };

  if (typeof window !== "undefined") {
    try {
      const existing = JSON.parse(
        window.localStorage.getItem("selemma_sic_consent_receipts") || "[]",
      ) as ConsentAuditProof[];
      existing.push(proof);
      window.localStorage.setItem(
        "selemma_sic_consent_receipts",
        JSON.stringify(existing.slice(-25)),
      );
    } catch {
      // Ignore storage quota errors
    }
  }

  return proof;
}


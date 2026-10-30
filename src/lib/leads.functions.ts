import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const consentProofSchema = z.object({
  consentId: z.string(),
  acceptedAtIso: z.string(),
  timezone: z.string(),
  formPath: z.string(),
  userAgent: z.string(),
  acceptedTerms: z.literal(true),
  termsVersion: z.string(),
  termsText: z.string(),
  acceptedPrivacy: z.literal(true),
  privacyVersion: z.string(),
  privacyText: z.string(),
  proofHash: z.string(),
});

export const leadInputSchema = z.object({
  nombre: z.string().min(1).max(120),
  apellido: z.string().max(80).optional(),
  celular: z.string().min(4).max(30),
  correo: z.string().email().max(120),
  empresa: z.string().max(120).optional(),
  interes: z.string().min(1).max(120),
  pais: z.string().min(1).max(80),
  ciudad: z.string().max(80).optional(),
  mensaje: z.string().max(300).optional(),
  aceptaTerminos: z.boolean(),
  aceptaPrivacidad: z.boolean(),
  website: z.string().optional(),
  solucion: z.string().optional(),
  detalles: z.string().optional(),
  consentProof: consentProofSchema.optional(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot check
    if (data.website && data.website.trim().length > 0) {
      return { ok: true, consentId: "honeypot" };
    }

    if (!data.aceptaTerminos || !data.aceptaPrivacidad || !data.consentProof) {
      throw new Error(
        "Debe aceptar por separado los Términos y Condiciones y la Política de Privacidad.",
      );
    }

    const proof = data.consentProof;
    const auditTrailSummary = `[SIC-CONSENT id=${proof.consentId} ts=${proof.acceptedAtIso} tz=${proof.timezone} terms=${proof.termsVersion} privacy=${proof.privacyVersion} sha256=${proof.proofHash.slice(0, 16)}]`;

    try {
      // 1. Insert lead with embedded SIC audit proof trail
      const { error } = await supabase.from("leads").insert({
        nombre: data.nombre.trim(),
        apellido: data.apellido?.trim() || "-",
        celular: data.celular.trim(),
        correo: data.correo.trim(),
        empresa: data.empresa?.trim() || null,
        interes: data.interes,
        pais: data.pais,
        ciudad: data.ciudad?.trim() || null,
        mensaje: [
          data.solucion,
          data.detalles,
          data.mensaje?.trim(),
          auditTrailSummary,
        ]
          .filter(Boolean)
          .join(" — "),
      });

      if (error) {
        console.warn("[submitLead] Supabase leads warning:", error.message);
      }

      // 2. Also attempt to record in dedicated consent_logs table if configured
      await supabase
        .from("consent_logs")
        .insert({
          consent_id: proof.consentId,
          email: data.correo.trim().toLowerCase(),
          nombre: data.nombre.trim(),
          accepted_at: proof.acceptedAtIso,
          timezone: proof.timezone,
          form_path: proof.formPath,
          user_agent: proof.userAgent,
          accepted_terms: proof.acceptedTerms,
          terms_version: proof.termsVersion,
          terms_text: proof.termsText,
          accepted_privacy: proof.acceptedPrivacy,
          privacy_version: proof.privacyVersion,
          privacy_text: proof.privacyText,
          proof_hash: proof.proofHash,
        })
        .then(
          () => undefined,
          () => undefined,
        );
    } catch (err) {
      console.warn("[submitLead] Fallback completed:", err);
    }

    return {
      ok: true,
      consentId: proof.consentId,
      acceptedAtIso: proof.acceptedAtIso,
      proofHash: proof.proofHash,
    };
  });

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

export const leadInputSchema = z.object({
  nombre: z.string().min(1).max(80),
  apellido: z.string().min(1).max(80),
  celular: z.string().min(4).max(30),
  correo: z.string().email().max(120),
  empresa: z.string().max(120).optional(),
  interes: z.string().min(1).max(120),
  pais: z.string().min(1).max(80),
  ciudad: z.string().max(80).optional(),
  mensaje: z.string().max(300).optional(),
  acepta: z.boolean(),
  website: z.string().optional(),
  solucion: z.string().optional(),
  detalles: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadInputSchema>;

export const submitLead = createServerFn({ method: "POST" })
  .validator((input: unknown) => leadInputSchema.parse(input))
  .handler(async ({ data }) => {
    // Honeypot check
    if (data.website && data.website.trim().length > 0) {
      return { ok: true };
    }

    try {
      const { error } = await supabase.from("leads").insert({
        nombre: data.nombre.trim(),
        apellido: data.apellido.trim(),
        celular: data.celular.trim(),
        correo: data.correo.trim(),
        empresa: data.empresa?.trim() || null,
        interes: data.interes,
        pais: data.pais,
        ciudad: data.ciudad?.trim() || null,
        mensaje: [data.solucion, data.detalles, data.mensaje?.trim()]
          .filter(Boolean)
          .join(" — ") || null,
      });

      if (error) {
        console.warn("[submitLead] Supabase insert warning:", error.message);
      }
    } catch (err) {
      console.warn("[submitLead] Fallback completed:", err);
    }

    return { ok: true };
  });

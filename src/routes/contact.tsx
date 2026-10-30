import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { submitLead, type LeadInput } from "../lib/leads.functions";
import { COUNTRIES, getCountryByName } from "../lib/countries";
import { getSolution, SOLUTIONS } from "../lib/solutions";
import {
  createConsentAuditProof,
  LEGAL_VERSIONS,
  type ConsentAuditProof,
} from "../lib/consent-audit";
import selemmaLogo1x from "../assets/selemma-logo-128.png";
import selemmaLogo2x from "../assets/selemma-logo-256.png";
import selemmaLogo3x from "../assets/selemma-logo-hq.png";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Agende su diagnóstico — Selemma Investments" },
      {
        name: "description",
        content:
          "Agende una llamada estratégica confidencial con Selemma Investments. Cuéntenos su interés y prepararemos su propuesta patrimonial.",
      },
      { property: "og:title", content: "Agende su diagnóstico — Selemma Investments" },
      {
        property: "og:description",
        content:
          "Formulario para inversionistas y propietarios interesados en oportunidades inmobiliarias off-market.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { s?: string } =>
    typeof search["s"] === "string" ? { s: search["s"] as string } : {},
  component: ContactPage,
});

const INTERESES = [
  "Comprar propiedad",
  "Vender propiedad",
  "Alquilar oficina/espacio",
  "Inversión off-market",
  "Consultoría patrimonial",
  "Otro",
] as const;

const MAX_MESSAGE = 300;

function ContactPage() {
  const { s } = Route.useSearch();
  const [selectedSlug, setSelectedSlug] = useState<string>(s ?? "");
  const solution = getSolution(selectedSlug);
  const send = useServerFn(submitLead);
  const [form, setForm] = useState<LeadInput>({
    nombre: "",
    celular: "",
    correo: "",
    interes: "" as unknown as LeadInput["interes"],
    pais: "",
    mensaje: "",
    aceptaTerminos: false,
    aceptaPrivacidad: false,
    website: "",
  });
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [pais, setPais] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [savedProof, setSavedProof] = useState<ConsentAuditProof | null>(null);

  useEffect(() => {
    setSelectedSlug(s ?? "");
    setExtra({});
  }, [s]);

  const selectedCountry = getCountryByName(pais);

  const update = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  function handleCountryChange(newPais: string) {
    setPais(newPais);
    const countryObj = getCountryByName(newPais);
    if (countryObj) {
      const trimmed = phoneDigits.slice(0, countryObj.maxDigits);
      setPhoneDigits(trimmed);
      update("celular", trimmed ? `${countryObj.dialCode} ${trimmed}` : countryObj.dialCode);
    } else {
      update("celular", phoneDigits);
    }
  }

  function handlePhoneDigitsChange(rawInput: string) {
    const maxLen = selectedCountry ? selectedCountry.maxDigits : 15;
    let digitsOnly = rawInput.replace(/\D/g, "");
    if (selectedCountry && selectedCountry.dialCode.length > 1) {
      const codeDigits = selectedCountry.dialCode.replace(/\D/g, "");
      if (
        digitsOnly.length > maxLen &&
        codeDigits.length > 0 &&
        digitsOnly.startsWith(codeDigits)
      ) {
        digitsOnly = digitsOnly.slice(codeDigits.length);
      }
    }
    const limited = digitsOnly.slice(0, maxLen);
    setPhoneDigits(limited);
    update(
      "celular",
      selectedCountry
        ? limited
          ? `${selectedCountry.dialCode} ${limited}`
          : selectedCountry.dialCode
        : limited,
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const interes = solution ? solution.interes : form.interes;
    if (!interes) {
      setError("Seleccione su interés principal.");
      return;
    }
    if (solution) {
      const missing = solution.fields.find((f) => f.required && !extra[f.name]?.trim());
      if (missing) {
        setError(`Complete el campo: ${missing.label}.`);
        return;
      }
    }
    if (!pais || !selectedCountry) {
      setError("Seleccione su país para validar el indicativo y número de celular.");
      return;
    }
    if (
      phoneDigits.length < selectedCountry.minDigits ||
      phoneDigits.length > selectedCountry.maxDigits
    ) {
      const rangeMsg =
        selectedCountry.minDigits === selectedCountry.maxDigits
          ? `${selectedCountry.minDigits} dígitos`
          : `entre ${selectedCountry.minDigits} y ${selectedCountry.maxDigits} dígitos`;
      setError(
        `El número de celular para ${selectedCountry.name} (${selectedCountry.dialCode}) debe tener ${rangeMsg} (actualmente tiene ${phoneDigits.length}).`,
      );
      return;
    }
    if (!form.aceptaTerminos) {
      setError("Debe aceptar los Términos y Condiciones para continuar.");
      return;
    }
    if (!form.aceptaPrivacidad) {
      setError(
        "Debe aceptar la Política de Privacidad y autorizar el tratamiento de sus datos personales.",
      );
      return;
    }

    const fullCelular = `${selectedCountry.dialCode} ${phoneDigits}`;

    setStatus("loading");
    try {
      const detalles = solution
        ? solution.fields
          .filter((f) => extra[f.name]?.trim())
          .map((f) => `${f.label}: ${extra[f.name]!.trim()}`)
          .join(" | ")
        : "";

      const proof = await createConsentAuditProof({
        email: form.correo,
        formPath: typeof window !== "undefined" ? window.location.pathname + window.location.search : "/contact",
        acceptedTerms: true,
        acceptedPrivacy: true,
      });

      await send({
        data: {
          ...form,
          celular: fullCelular,
          interes,
          pais,
          solucion: solution ? solution.title : "",
          detalles,
          consentProof: {
            ...proof,
            acceptedTerms: true,
            acceptedPrivacy: true,
          },
        },
      });
      update("celular", fullCelular);
      setSavedProof(proof);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al enviar el formulario.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm">
              <img
                src={selemmaLogo2x}
                srcSet={`${selemmaLogo1x} 1x, ${selemmaLogo2x} 2x, ${selemmaLogo3x} 3x`}
                alt="Selemma"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold tracking-[0.18em]">SELEMMA</div>
              <div className="text-[10px] tracking-[0.3em] text-white/50">INVESTMENTS</div>
            </div>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <span className="eyebrow text-gold">
          <span className="dot-gold" /> {solution ? solution.eyebrow : "Diagnóstico estratégico"}
        </span>
        <h1 className="mt-6 text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
          {solution ? (
            <span className="text-gold">{solution.title}</span>
          ) : (
            <>
              Agende su <span className="text-gold">llamada confidencial</span>
            </>
          )}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/65">
          {solution
            ? solution.intro
            : "Solicitamos únicamente los datos indispensables para asignar un especialista patrimonial a su caso."}
        </p>

        {status === "success" ? (
          <div className="mt-12 rounded-sm border border-gold/30 bg-white/5 p-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h2 className="mt-4 text-2xl font-semibold">Solicitud recibida</h2>
            <p className="mt-3 text-sm text-white/70">
              Gracias, {form.nombre}. Le contactaremos en breve al {form.celular}.
            </p>
            {savedProof && (
              <div className="mx-auto mt-6 max-w-lg rounded-sm border border-white/10 bg-navy p-4 text-left text-xs text-white/60">
                <div className="flex items-center gap-2 font-semibold text-gold">
                  <ShieldCheck className="h-4 w-4" /> Constancia de Consentimiento (Trazabilidad SIC)
                </div>
                <p className="mt-1.5">
                  <strong>ID de Registro:</strong> {savedProof.consentId}
                </p>
                <p>
                  <strong>Fecha y Hora (ISO):</strong> {savedProof.acceptedAtIso} ({savedProof.timezone})
                </p>
                <p>
                  <strong>Versiones aceptadas:</strong> Términos ({savedProof.termsVersion}) · Privacidad ({savedProof.privacyVersion})
                </p>
                <p className="truncate">
                  <strong>Huella SHA-256:</strong> {savedProof.proofHash}
                </p>
              </div>
            )}
            <Link to="/" className="btn-pill btn-gold mt-8 inline-flex">
              Volver al inicio
            </Link>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 space-y-5 rounded-sm border border-white/10 bg-white/3 p-6 md:p-8"
          >
            <div className="hidden" aria-hidden="true">
              <label>
                No completar
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website ?? ""}
                  onChange={(e) => update("website", e.target.value)}
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Nombre completo *">
                <input
                  required
                  maxLength={120}
                  placeholder="Nombre y apellido"
                  value={form.nombre}
                  onChange={(e) => update("nombre", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Correo electrónico *">
                <input
                  required
                  type="email"
                  maxLength={120}
                  placeholder="nombre@empresa.com"
                  value={form.correo}
                  onChange={(e) => update("correo", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Celular / WhatsApp *">
                <div className="flex items-stretch">
                  <span
                    title={
                      selectedCountry
                        ? `Indicativo automático de ${selectedCountry.name}`
                        : "Seleccione un país para generar el indicativo"
                    }
                    className="inline-flex shrink-0 items-center justify-center rounded-l-sm border border-r-0 border-white/15 bg-gold/15 px-3.5 text-sm font-semibold text-gold select-none"
                  >
                    {selectedCountry ? selectedCountry.dialCode : "+--"}
                  </span>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    maxLength={selectedCountry ? selectedCountry.maxDigits : 15}
                    placeholder={
                      selectedCountry
                        ? selectedCountry.placeholder
                        : "Seleccione país e ingrese número"
                    }
                    value={phoneDigits}
                    onChange={(e) => handlePhoneDigitsChange(e.target.value)}
                    className={`${inputCls} rounded-l-none`}
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-2 text-[11px] leading-snug">
                  <span className="text-white/55">
                    {selectedCountry
                      ? selectedCountry.hint
                      : "Elija primero su país para generar el indicativo y límite de dígitos."}
                  </span>
                  {selectedCountry && (
                    <span
                      className={`shrink-0 font-semibold ${phoneDigits.length >= selectedCountry.minDigits &&
                          phoneDigits.length <= selectedCountry.maxDigits
                          ? "text-gold"
                          : "text-white/45"
                        }`}
                    >
                      {phoneDigits.length}/{selectedCountry.maxDigits} dígitos
                    </span>
                  )}
                </div>
              </Field>
              <Field label="País de residencia o inversión *">
                <select
                  required
                  value={pais}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="" disabled>
                    Seleccione su país…
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c.iso} value={c.name} className="bg-navy text-white">
                      {c.name} ({c.dialCode})
                    </option>
                  ))}
                </select>
                {selectedCountry && (
                  <p className="mt-1.5 text-[11px] text-gold/85">
                    Indicativo {selectedCountry.dialCode} aplicado automáticamente en Celular.
                  </p>
                )}
              </Field>
            </div>

            <div className="space-y-5 rounded-sm border border-gold/25 bg-gold/5 p-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Detalles de la solución
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { slug: "consultoria", label: "Servicio de Consultoría" },
                    { slug: "usuarios", label: "Representación de Usuarios" },
                  ]
                    .filter((opt) => !selectedSlug || selectedSlug === opt.slug)
                    .map((opt) => {
                      const active = selectedSlug === opt.slug;
                      return (
                        <button
                          key={opt.slug}
                          type="button"
                          onClick={() => {
                            setSelectedSlug(opt.slug);
                            setExtra({});
                          }}
                          className={`rounded-sm border px-3 py-1.5 text-[11px] font-semibold transition ${active
                              ? "border-gold bg-gold text-navy"
                              : "border-white/15 bg-white/4 text-white/70 hover:border-gold/40 hover:text-white"
                            }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                </div>
              </div>

              {solution ? (
                <div className="grid gap-5 md:grid-cols-2">
                  {solution.fields.map((f) => (
                    <Field key={f.name} label={`${f.label}${f.required ? " *" : ""}`}>
                      {f.type === "select" ? (
                        <select
                          required={f.required}
                          value={extra[f.name] ?? ""}
                          onChange={(e) =>
                            setExtra((p) => ({ ...p, [f.name]: e.target.value }))
                          }
                          className={`${inputCls} appearance-none`}
                        >
                          <option value="" disabled>
                            Seleccione…
                          </option>
                          {f.options?.map((o) => (
                            <option key={o} value={o} className="bg-navy text-white">
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          required={f.required}
                          maxLength={80}
                          placeholder={f.placeholder ?? ""}
                          value={extra[f.name] ?? ""}
                          onChange={(e) =>
                            setExtra((p) => ({ ...p, [f.name]: e.target.value }))
                          }
                          className={inputCls}
                        />
                      )}
                    </Field>
                  ))}
                </div>
              ) : (
                <Field label="Interés principal *">
                  <select
                    required
                    value={form.interes as string}
                    onChange={(e) => {
                      const val = e.target.value;
                      update("interes", val as LeadInput["interes"]);
                      if (val === "Consultoría patrimonial" && SOLUTIONS.consultoria) {
                        setSelectedSlug("consultoria");
                      } else if (val === "Alquilar oficina/espacio" && SOLUTIONS.usuarios) {
                        setSelectedSlug("usuarios");
                      }
                    }}
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled>
                      Seleccione una opción…
                    </option>
                    {INTERESES.map((i) => (
                      <option key={i} value={i} className="bg-navy text-white">
                        {i}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
            </div>

            <Field
              label={`Objetivo patrimonial (opcional — ${(form.mensaje ?? "").length}/${MAX_MESSAGE})`}
            >
              <textarea
                rows={3}
                maxLength={MAX_MESSAGE}
                value={form.mensaje ?? ""}
                onChange={(e) => update("mensaje", e.target.value)}
                className={`${inputCls} resize-none`}
                placeholder="Breve contexto sobre su horizonte o criterio de inversión…"
              />
            </Field>

            {/* Dos casillas separadas y desmarcadas por defecto — Cumplimiento SIC / Ley 1581 de 2012 */}
            <div className="space-y-3 rounded-sm border border-white/10 bg-white/2 p-4">
              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/80">
                <input
                  type="checkbox"
                  required
                  checked={form.aceptaTerminos}
                  onChange={(e) => update("aceptaTerminos", e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
                />
                <span>
                  Acepto los{" "}
                  <Link
                    to="/terminos"
                    target="_blank"
                    className="font-medium text-gold underline underline-offset-2 hover:text-white"
                  >
                    términos y condiciones
                  </Link>{" "}
                  de Selemma Investments (versión {LEGAL_VERSIONS.terms}). *
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/80">
                <input
                  type="checkbox"
                  required
                  checked={form.aceptaPrivacidad}
                  onChange={(e) => update("aceptaPrivacidad", e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-gold"
                />
                <span>
                  Acepto la{" "}
                  <Link
                    to="/privacidad"
                    target="_blank"
                    className="font-medium text-gold underline underline-offset-2 hover:text-white"
                  >
                    política de privacidad
                  </Link>{" "}
                  y autorizo de manera previa, expresa e informada el tratamiento de mis datos
                  personales conforme a la Ley 1581 de 2012 (versión {LEGAL_VERSIONS.privacy}). *
                </span>
              </label>
            </div>

            {error && (
              <div className="rounded-sm border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-pill btn-gold w-full justify-center disabled:opacity-70"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Registrando consentimiento y enviando…
                </>
              ) : (
                "Agendar diagnóstico"
              )}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

const inputCls =
  "w-full rounded-sm border border-white/15 bg-white/4 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-gold focus:bg-white/7";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/60">
        {label}
      </span>
      {children}
    </label>
  );
}

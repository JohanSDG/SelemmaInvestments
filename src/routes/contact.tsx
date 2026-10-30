import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead, type LeadInput } from "@/lib/leads.functions";
import { COUNTRIES } from "@/lib/countries";
import { getSolution } from "@/lib/solutions";
import logoAsset from "@/assets/selemma-logo.png.asset.json";

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
  const solution = getSolution(s);
  const send = useServerFn(submitLead);
  const [form, setForm] = useState<LeadInput>({
    nombre: "",
    apellido: "",
    celular: "",
    correo: "",
    empresa: "",
    interes: "" as unknown as LeadInput["interes"],
    pais: "",
    ciudad: "",
    mensaje: "",
    acepta: true,
    website: "",
  });
  const [extra, setExtra] = useState<Record<string, string>>({});
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

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
    if (!pais) {
      setError("Seleccione su país.");
      return;
    }
    if (!form.acepta) {
      setError("Debe aceptar el tratamiento de datos personales.");
      return;
    }
    setStatus("loading");
    try {
      const detalles = solution
        ? solution.fields
            .filter((f) => extra[f.name]?.trim())
            .map((f) => `${f.label}: ${extra[f.name]!.trim()}`)
            .join(" | ")
        : "";
      await send({
        data: {
          ...form,
          interes,
          pais,
          ciudad,
          solucion: solution ? solution.title : "",
          detalles,
        },
      });
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
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-white">
              <img src={logoAsset.url} alt="Selemma" className="h-10 w-10 object-cover" />
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
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-gold">
          <span className="dot-gold" /> {solution ? solution.eyebrow : "Diagnóstico estratégico"}
        </span>
        <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {solution ? (
            <>
              <span className="text-gold">{solution.title}</span>
            </>
          ) : (
            <>
              Agende su <span className="text-gold">llamada confidencial</span>
            </>
          )}
        </h1>
        <p className="mt-4 max-w-2xl text-white/70">
          {solution
            ? solution.intro
            : "Complete el formulario y un asesor patrimonial lo contactará para preparar una propuesta a la medida de su perfil."}
        </p>

        {status === "success" ? (
          <div className="mt-12 rounded-2xl border border-gold/30 bg-white/5 p-10 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-gold" />
            <h2 className="mt-4 text-2xl font-bold">Solicitud recibida</h2>
            <p className="mt-3 text-white/70">
              Gracias, {form.nombre}. Le contactaremos en breve al {form.celular}.
            </p>
            <Link
              to="/"
              className="btn-pill btn-gold mt-8 inline-flex"
            >
              Volver al inicio
            </Link>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
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
              <Field label="Nombre *">
                <input
                  required
                  maxLength={80}
                  value={form.nombre}
                  onChange={(e) => update("nombre", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Apellido *">
                <input
                  required
                  maxLength={80}
                  value={form.apellido}
                  onChange={(e) => update("apellido", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Celular *">
                <input
                  required
                  type="tel"
                  maxLength={30}
                  placeholder="+57 300 000 0000"
                  value={form.celular}
                  onChange={(e) => update("celular", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Correo electrónico *">
                <input
                  required
                  type="email"
                  maxLength={120}
                  value={form.correo}
                  onChange={(e) => update("correo", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Empresa o Inmobiliaria">
                <input
                  maxLength={120}
                  value={form.empresa ?? ""}
                  onChange={(e) => update("empresa", e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="País *">
                <select
                  required
                  value={pais}
                  onChange={(e) => {
                    setPais(e.target.value);
                    setCiudad("");
                  }}
                  className={`${inputCls} appearance-none`}
                >
                  <option value="" disabled>
                    Seleccione su país…
                  </option>
                  {COUNTRIES.map((c) => (
                    <option key={c.iso} value={c.name} className="bg-navy text-white">
                      {c.name}
                    </option>
                  ))}
                </select>
              </Field>
              {pais && (
                <Field label="Ciudad *">
                  <input
                    required
                    maxLength={80}
                    placeholder="Ej. Bogotá"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className={inputCls}
                  />
                </Field>
              )}

            </div>

            {solution ? (
              <div className="space-y-5 rounded-xl border border-gold/25 bg-gold/[0.05] p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Detalles de la solución
                </div>
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
              </div>
            ) : (
            <Field label="Interés principal *">
              <select
                required
                value={form.interes as string}
                onChange={(e) =>
                  update("interes", e.target.value as LeadInput["interes"])
                }
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

            <Field
              label={`Mensaje (${(form.mensaje ?? "").length}/${MAX_MESSAGE})`}
            >
              <textarea
                rows={4}
                maxLength={MAX_MESSAGE}
                value={form.mensaje ?? ""}
                onChange={(e) => update("mensaje", e.target.value)}
                className={`${inputCls} resize-none`}
                placeholder="Cuéntenos brevemente su objetivo patrimonial…"
              />
            </Field>

            <label className="flex items-start gap-3 text-sm text-white/80">
              <input
                type="checkbox"
                required
                checked={form.acepta}
                onChange={(e) => update("acepta", e.target.checked as true)}
                className="mt-1 h-4 w-4 accent-gold"
              />
              <span>
                Acepto el tratamiento de mis datos personales conforme a la política de
                privacidad y la Ley de Habeas Data. *
              </span>
            </label>

            {error && (
              <div className="rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
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
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
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
  "w-full rounded-lg border border-white/15 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-gold focus:bg-white/[0.07]";

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

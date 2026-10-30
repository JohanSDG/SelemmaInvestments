import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { lovable } from "../integrations/lovable/index";
import { createConsentAuditProof, LEGAL_VERSIONS } from "../lib/consent-audit";

function safeNext(value: unknown): string {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  return value;
}

export const Route = createFileRoute("/login")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({ next: safeNext(s.next) }),
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Selemma Investments" },
      {
        name: "description",
        content:
          "Accede a tu cuenta de Selemma Investments para autorizar integraciones y gestionar tus solicitudes de inversión.",
      },
      { property: "og:title", content: "Iniciar sesión — Selemma Investments" },
      {
        property: "og:description",
        content: "Accede a tu cuenta de Selemma Investments.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { next } = Route.useSearch();
  const navigate = useNavigate();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const go = () => {
    if (next.startsWith("/.lovable/")) {
      window.location.href = next;
      return;
    }
    void navigate({ to: next });
  };

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) go();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (mode === "signin") {
      setBusy(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      router.invalidate();
      go();
      return;
    }

    if (!aceptaTerminos) {
      return setError("Debe aceptar los Términos y Condiciones para registrarse.");
    }
    if (!aceptaPrivacidad) {
      return setError("Debe aceptar la Política de Privacidad para registrarse.");
    }

    setBusy(true);
    const proof = await createConsentAuditProof({
      email,
      formPath: "/login#signup",
      acceptedTerms: true,
      acceptedPrivacy: true,
    });

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/login?next=${encodeURIComponent(next)}`,
        data: {
          sic_consent_proof: proof,
        },
      },
    });
    setBusy(false);
    if (error) return setError(error.message);
    if (!data.session) {
      setInfo(
        `Revisa tu correo para confirmar la cuenta. ID de consentimiento SIC: ${proof.consentId}.`,
      );
      return;
    }
    go();
  }

  async function onGoogle() {
    setError(null);
    if (mode === "signup" && (!aceptaTerminos || !aceptaPrivacidad)) {
      return setError(
        "Marque las dos casillas de Términos y Política de Privacidad antes de crear su cuenta.",
      );
    }
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/login?next=${encodeURIComponent(next)}`,
    });
    if (result.error) return setError("No pudimos iniciar sesión con Google.");
    if (result.redirected) return;
    go();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-navy px-4 py-16 text-white">
      <div className="w-full max-w-md rounded-sm border border-white/10 bg-white/3 p-8">
        <h1 className="text-xl font-semibold text-white">
          {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        <p className="mt-2 text-xs text-white/60">
          Accede para autorizar integraciones y gestionar tus solicitudes con Selemma Investments.
        </p>

        <button
          onClick={onGoogle}
          className="mt-6 w-full rounded-sm border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:border-gold/40 hover:bg-white/10"
        >
          Continuar con Google
        </button>

        <div className="my-5 text-center text-[11px] uppercase tracking-widest text-white/40">
          o
        </div>

        <form onSubmit={onSubmit} className="space-y-3.5">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full rounded-sm border border-white/15 bg-white/4 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-gold"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-sm border border-white/15 bg-white/4 px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-gold"
          />

          {mode === "signup" && (
            <div className="space-y-2.5 rounded-sm border border-white/10 bg-white/2 p-3.5 text-xs text-white/80">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  required
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
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
                  ({LEGAL_VERSIONS.terms}). *
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  required
                  checked={aceptaPrivacidad}
                  onChange={(e) => setAceptaPrivacidad(e.target.checked)}
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
                  y el tratamiento de mis datos personales ({LEGAL_VERSIONS.privacy}). *
                </span>
              </label>
            </div>
          )}

          {error && (
            <p role="alert" className="text-xs text-red-300">
              {error}
            </p>
          )}
          {info && <p className="text-xs text-gold">{info}</p>}
          <button
            type="submit"
            disabled={busy}
            className="btn-pill btn-gold w-full justify-center disabled:opacity-60"
          >
            {busy ? "Procesando…" : mode === "signin" ? "Entrar" : "Registrarme"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
          }}
          className="mt-4 w-full text-center text-xs text-white/60 underline hover:text-gold"
        >
          {mode === "signin" ? "No tengo cuenta · Crear cuenta" : "Ya tengo cuenta · Iniciar sesión"}
        </button>
      </div>
    </main>
  );
}

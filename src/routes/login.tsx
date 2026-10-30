import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

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
    setBusy(true);
    setError(null);
    setInfo(null);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      router.invalidate();
      go();
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/login?next=${encodeURIComponent(next)}` },
    });
    setBusy(false);
    if (error) return setError(error.message);
    if (!data.session) {
      setInfo("Revisa tu correo para confirmar la cuenta y luego vuelve a iniciar sesión.");
      return;
    }
    go();
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/login?next=${encodeURIComponent(next)}`,
    });
    if (result.error) return setError("No pudimos iniciar sesión con Google.");
    if (result.redirected) return;
    go();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <h1 className="text-xl font-semibold text-foreground">
          {mode === "signin" ? "Iniciar sesión" : "Crear cuenta"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Accede para autorizar integraciones con Selemma Investments.
        </p>

        <button
          onClick={onGoogle}
          className="mt-6 w-full rounded-full border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          Continuar con Google
        </button>

        <div className="my-5 text-center text-xs uppercase tracking-widest text-muted-foreground">
          o
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"
          />
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          {info && <p className="text-sm text-muted-foreground">{info}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {busy ? "Procesando…" : mode === "signin" ? "Entrar" : "Registrarme"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-xs text-muted-foreground underline"
        >
          {mode === "signin" ? "No tengo cuenta" : "Ya tengo cuenta"}
        </button>
      </div>
    </main>
  );
}

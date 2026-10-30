export function reportLovableError(
  error: unknown,
  context?: Record<string, unknown>,
): void {
  if (typeof window !== "undefined") {
    console.error("[ErrorBoundary]", error, context);
  }
}


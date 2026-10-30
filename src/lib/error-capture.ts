let lastCapturedError: Error | undefined;

export function captureError(error: unknown): void {
  if (error instanceof Error) {
    lastCapturedError = error;
  } else if (error != null) {
    lastCapturedError = new Error(String(error));
  }
}

export function consumeLastCapturedError(): Error | undefined {
  const err = lastCapturedError;
  lastCapturedError = undefined;
  return err;
}


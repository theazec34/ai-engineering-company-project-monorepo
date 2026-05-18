"use client";

type AsyncState = "idle" | "loading" | "success" | "error";

interface AsyncFeedbackProps {
  state: AsyncState;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function AsyncFeedback({
  state,
  loadingMessage = "Cargando…",
  successMessage,
  errorMessage,
}: AsyncFeedbackProps) {
  if (state === "idle") return null;

  if (state === "loading") {
    return (
      <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
        <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-amber-600 border-t-transparent" />
        {loadingMessage}
      </p>
    );
  }

  if (state === "success" && successMessage) {
    return (
      <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900" role="status">
        {successMessage}
      </p>
    );
  }

  if (state === "error" && errorMessage) {
    return (
      <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900" role="alert">
        {errorMessage}
      </p>
    );
  }

  return null;
}

export type { AsyncState };

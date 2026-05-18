"use client";

import { useState } from "react";
import { createRecord } from "@/lib/api";
import type { RecordFormValues } from "@/types/record";
import { CandidateForm } from "./CandidateForm";

export function NewCandidatePanel() {
  const [open, setOpen] = useState(false);

  const handleCreate = async (values: RecordFormValues) => {
    await createRecord(values);
    setOpen(false);
    window.dispatchEvent(new CustomEvent("candidates:refresh"));
  };

  return (
    <section className="rounded-xl border border-[var(--brasa)]/15 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--carbon)]">
            Nueva candidatura
          </h2>
          <p className="text-sm text-stone-600">
            Registra candidatos que llegan por otros canales.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg bg-[var(--brasa)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brasa-dark)]"
        >
          {open ? "Ocultar formulario" : "Registrar candidato"}
        </button>
      </div>
      {open && (
        <div className="mt-4 border-t border-stone-100 pt-4">
          <CandidateForm
            mode="create"
            onSubmit={handleCreate}
            onCancel={() => setOpen(false)}
          />
        </div>
      )}
    </section>
  );
}

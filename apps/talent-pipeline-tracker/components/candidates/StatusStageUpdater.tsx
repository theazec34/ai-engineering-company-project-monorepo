"use client";

import { useState } from "react";
import { patchRecord } from "@/lib/api";
import { ALL_STAGES, ALL_STATUSES, getStageLabel, getStatusLabel } from "@/lib/labels";
import type { Record, RecordStage, RecordStatus } from "@/types/record";
import { AsyncFeedback, type AsyncState } from "@/components/ui/AsyncFeedback";

interface StatusStageUpdaterProps {
  record: Record;
  onUpdated: (record: Record) => void;
}

export function StatusStageUpdater({ record, onUpdated }: StatusStageUpdaterProps) {
  const [status, setStatus] = useState<RecordStatus>(record.status);
  const [stage, setStage] = useState<RecordStage>(record.stage);
  const [asyncState, setAsyncState] = useState<AsyncState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePatch = async (payload: { status?: RecordStatus; stage?: RecordStage }) => {
    setAsyncState("loading");
    setErrorMessage("");
    try {
      const updated = await patchRecord(record.id, payload);
      onUpdated(updated);
      setStatus(updated.status);
      setStage(updated.stage);
      setAsyncState("success");
    } catch (err) {
      setAsyncState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "No se pudo actualizar la candidatura.",
      );
    }
  };

  return (
    <section className="rounded-xl border border-[var(--brasa)]/15 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-[var(--carbon)]">
        Actualizar estado y etapa
      </h2>
      <AsyncFeedback
        state={asyncState}
        loadingMessage="Actualizando…"
        successMessage="Cambios guardados."
        errorMessage={errorMessage}
      />
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="patch-status" className="mb-1 block text-sm font-medium">
            Estado
          </label>
          <select
            id="patch-status"
            value={status}
            onChange={(e) => {
              const value = e.target.value as RecordStatus;
              setStatus(value);
              void handlePatch({ status: value });
            }}
            disabled={asyncState === "loading"}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm disabled:opacity-60"
          >
            {ALL_STATUSES.map((s) => (
              <option key={s} value={s}>
                {getStatusLabel(s)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="patch-stage" className="mb-1 block text-sm font-medium">
            Etapa
          </label>
          <select
            id="patch-stage"
            value={stage}
            onChange={(e) => {
              const value = e.target.value as RecordStage;
              setStage(value);
              void handlePatch({ stage: value });
            }}
            disabled={asyncState === "loading"}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm disabled:opacity-60"
          >
            {ALL_STAGES.map((s) => (
              <option key={s} value={s}>
                {getStageLabel(s)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

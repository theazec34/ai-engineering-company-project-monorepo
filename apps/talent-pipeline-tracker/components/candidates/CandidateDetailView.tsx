"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getRecord, updateRecord } from "@/lib/api";
import type { Record, RecordFormValues } from "@/types/record";
import { StageBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { AsyncFeedback, type AsyncState } from "@/components/ui/AsyncFeedback";
import { CandidateForm } from "./CandidateForm";
import { NotesPanel } from "./NotesPanel";
import { StatusStageUpdater } from "./StatusStageUpdater";

interface CandidateDetailViewProps {
  id: string;
}

export function CandidateDetailView({ id }: CandidateDetailViewProps) {
  const [record, setRecord] = useState<Record | null>(null);
  const [asyncState, setAsyncState] = useState<AsyncState>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const loadRecord = useCallback(async () => {
    setAsyncState("loading");
    setErrorMessage("");
    try {
      const data = await getRecord(id);
      setRecord(data);
      setAsyncState("success");
    } catch (err) {
      setAsyncState("error");
      setErrorMessage(
        err instanceof Error ? err.message : "No se pudo cargar la candidatura.",
      );
    }
  }, [id]);

  useEffect(() => {
    void loadRecord();
  }, [loadRecord]);

  const handleUpdate = async (values: RecordFormValues) => {
    const updated = await updateRecord(id, values);
    setRecord(updated);
    setEditing(false);
  };

  if (asyncState === "loading" && !record) {
    return <AsyncFeedback state="loading" loadingMessage="Cargando candidatura…" />;
  }

  if (asyncState === "error" || !record) {
    return (
      <div className="space-y-4">
        <AsyncFeedback state="error" errorMessage={errorMessage || "Candidatura no encontrada."} />
        <Link href="/" className="text-sm font-medium text-[var(--brasa)] hover:underline">
          ← Volver al listado
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/" className="text-sm font-medium text-[var(--brasa)] hover:underline">
            ← Volver al listado
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-[var(--carbon)]">{record.full_name}</h1>
          <p className="text-stone-600">{record.position}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <StatusBadge status={record.status} />
            <StageBadge stage={record.stage} />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setEditing((v) => !v)}
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium hover:bg-stone-50"
        >
          {editing ? "Cancelar edición" : "Editar datos"}
        </button>
      </div>

      {editing ? (
        <section className="rounded-xl border border-[var(--brasa)]/15 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold">Editar candidatura</h2>
          <CandidateForm
            mode="edit"
            initialRecord={record}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(false)}
          />
        </section>
      ) : (
        <section className="rounded-xl border border-[var(--brasa)]/15 bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[var(--carbon)]">Datos del candidato</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <DetailItem label="Correo" value={record.email} href={`mailto:${record.email}`} />
            <DetailItem label="Teléfono" value={record.phone} href={`tel:${record.phone}`} />
            <DetailItem label="Puesto" value={record.position} />
            <DetailItem
              label="Años de experiencia"
              value={String(record.experience_years)}
            />
            <DetailItem
              label="LinkedIn"
              value={record.linkedin_url ?? "—"}
              href={record.linkedin_url ?? undefined}
            />
            <DetailItem
              label="CV"
              value={record.cv_url ? "Ver documento" : "—"}
              href={record.cv_url ?? undefined}
            />
            <DetailItem
              label="Fecha de solicitud"
              value={new Date(record.applied_at).toLocaleString("es-ES")}
            />
            <DetailItem
              label="Última actualización"
              value={new Date(record.updated_at).toLocaleString("es-ES")}
            />
          </dl>
        </section>
      )}

      <StatusStageUpdater record={record} onUpdated={setRecord} />
      <NotesPanel recordId={record.id} />
    </div>
  );
}

function DetailItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-stone-500">{label}</dt>
      <dd className="mt-1 text-sm text-[var(--carbon)]">
        {href && value !== "—" ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brasa)] hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

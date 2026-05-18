"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getRecords } from "@/lib/api";
import type { Record } from "@/types/record";
import { StageBadge, StatusBadge } from "@/components/ui/StatusBadge";
import { AsyncFeedback, type AsyncState } from "@/components/ui/AsyncFeedback";

export function CandidatesList() {
  const searchParams = useSearchParams();
  const [records, setRecords] = useState<Record[]>([]);
  const [total, setTotal] = useState(0);
  const [asyncState, setAsyncState] = useState<AsyncState>("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const status = searchParams.get("status") ?? undefined;
  const stage = searchParams.get("stage") ?? undefined;
  const search = searchParams.get("search") ?? undefined;

  const loadRecords = useCallback(async () => {
    setAsyncState("loading");
    setErrorMessage("");
    try {
      const response = await getRecords({ status, stage, search, limit: 100 });
      setRecords(response.data);
      setTotal(response.total);
      setAsyncState("success");
    } catch (err) {
      setAsyncState("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "No se pudieron cargar las candidaturas.",
      );
    }
  }, [status, stage, search]);

  useEffect(() => {
    void loadRecords();
  }, [loadRecords]);

  useEffect(() => {
    const onRefresh = () => void loadRecords();
    window.addEventListener("candidates:refresh", onRefresh);
    return () => window.removeEventListener("candidates:refresh", onRefresh);
  }, [loadRecords]);

  if (asyncState === "loading" && records.length === 0) {
    return <AsyncFeedback state="loading" loadingMessage="Cargando candidaturas…" />;
  }

  if (asyncState === "error") {
    return (
      <div className="space-y-3">
        <AsyncFeedback state="error" errorMessage={errorMessage} />
        <button
          type="button"
          onClick={() => void loadRecords()}
          className="text-sm font-medium text-[var(--brasa)] hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-stone-300 bg-white px-6 py-10 text-center text-sm text-stone-600">
        No hay candidaturas con los filtros seleccionados.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-stone-600">
        Mostrando {records.length} de {total} candidaturas
      </p>
      <div className="overflow-hidden rounded-xl border border-[var(--brasa)]/15 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-stone-200 text-sm">
          <thead className="bg-[var(--crema-dark)]/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-[var(--carbon)]">
                Nombre
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-[var(--carbon)]">
                Puesto
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-[var(--carbon)]">
                Estado
              </th>
              <th scope="col" className="px-4 py-3 text-left font-semibold text-[var(--carbon)]">
                Etapa
              </th>
              <th scope="col" className="sr-only">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-[var(--crema)]/40">
                <td className="px-4 py-3 font-medium text-[var(--carbon)]">
                  <Link
                    href={`/candidates/${record.id}`}
                    className="text-[var(--brasa)] hover:underline"
                  >
                    {record.full_name}
                  </Link>
                  <p className="text-xs font-normal text-stone-500">{record.email}</p>
                </td>
                <td className="px-4 py-3 text-stone-700">{record.position}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={record.status} />
                </td>
                <td className="px-4 py-3">
                  <StageBadge stage={record.stage} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/candidates/${record.id}`}
                    className="text-sm font-medium text-[var(--brasa)] hover:underline"
                  >
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

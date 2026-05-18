"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ALL_STAGES, ALL_STATUSES, getStageLabel, getStatusLabel } from "@/lib/labels";

export function CandidateFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.replace(`/?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const value = String(formData.get("search") ?? "").trim();
    updateParams({ search: value || null });
  };

  const filterKey = searchParams.toString();

  return (
    <section
      className="rounded-xl border border-[var(--brasa)]/15 bg-white p-4 shadow-sm"
      aria-label="Filtros de candidaturas"
    >
      <form
        key={filterKey}
        onSubmit={handleSearchSubmit}
        className="flex flex-col gap-4 lg:flex-row lg:items-end"
      >
        <div className="flex-1">
          <label htmlFor="search" className="mb-1 block text-sm font-medium text-[var(--carbon)]">
            Buscar por nombre o correo
          </label>
          <div className="flex gap-2">
            <input
              id="search"
              name="search"
              type="search"
              defaultValue={searchParams.get("search") ?? ""}
              placeholder="Ej. María García o maria@email.com"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-[var(--brasa)] focus:outline-none focus:ring-2 focus:ring-[var(--brasa)]/20"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-[var(--brasa)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--brasa-dark)]"
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:w-auto">
          <div>
            <label htmlFor="status" className="mb-1 block text-sm font-medium text-[var(--carbon)]">
              Estado
            </label>
            <select
              id="status"
              value={searchParams.get("status") ?? ""}
              onChange={(e) => updateParams({ status: e.target.value || null })}
              className="w-full min-w-[180px] rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-[var(--brasa)] focus:outline-none focus:ring-2 focus:ring-[var(--brasa)]/20"
            >
              <option value="">Todos los estados</option>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {getStatusLabel(s)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="stage" className="mb-1 block text-sm font-medium text-[var(--carbon)]">
              Etapa
            </label>
            <select
              id="stage"
              value={searchParams.get("stage") ?? ""}
              onChange={(e) => updateParams({ stage: e.target.value || null })}
              className="w-full min-w-[200px] rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-[var(--brasa)] focus:outline-none focus:ring-2 focus:ring-[var(--brasa)]/20"
            >
              <option value="">Todas las etapas</option>
              {ALL_STAGES.map((s) => (
                <option key={s} value={s}>
                  {getStageLabel(s)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {(searchParams.get("status") || searchParams.get("stage") || searchParams.get("search")) && (
        <button
          type="button"
          onClick={() => router.replace("/", { scroll: false })}
          className="mt-3 text-sm font-medium text-[var(--brasa)] hover:underline"
        >
          Limpiar filtros
        </button>
      )}
    </section>
  );
}

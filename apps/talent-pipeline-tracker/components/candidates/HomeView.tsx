"use client";

import { Suspense } from "react";
import { CandidateFilters } from "./CandidateFilters";
import { CandidatesList } from "./CandidatesList";
import { NewCandidatePanel } from "./NewCandidatePanel";

function FiltersFallback() {
  return (
    <div className="h-32 animate-pulse rounded-xl bg-stone-200/60" aria-hidden />
  );
}

function ListFallback() {
  return (
    <div className="h-48 animate-pulse rounded-xl bg-stone-200/60" aria-hidden />
  );
}

export function HomeView() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[var(--carbon)]">Candidaturas</h1>
        <p className="mt-1 text-sm text-stone-600">
          Proceso de selección · Asistente de Dirección · Sede corporativa, Medellín
        </p>
      </header>

      <NewCandidatePanel />

      <Suspense fallback={<FiltersFallback />}>
        <CandidateFilters />
      </Suspense>

      <Suspense fallback={<ListFallback />}>
        <CandidatesList />
      </Suspense>
    </div>
  );
}

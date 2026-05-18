import { Suspense } from "react";
import { CandidateDetailView } from "@/components/candidates/CandidateDetailView";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CandidateDetailPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <p className="text-sm text-stone-600">Cargando candidatura…</p>
      }
    >
      <CandidateDetailView id={id} />
    </Suspense>
  );
}

import { Suspense } from "react";
import { HomeView } from "@/components/candidates/HomeView";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-sm text-stone-600">Cargando…</div>
      }
    >
      <HomeView />
    </Suspense>
  );
}

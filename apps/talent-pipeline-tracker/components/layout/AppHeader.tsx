import Link from "next/link";

export function AppHeader() {
  return (
    <header className="border-b border-[var(--brasa)]/20 bg-[var(--carbon)] text-[var(--crema)]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-0.5">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-[var(--dorado-light)]"
          >
            Brasaland Digital
          </Link>
          <p className="text-sm text-[var(--crema)]/70">
            Talent Pipeline Tracker · People &amp; Talent
          </p>
        </div>
        <nav aria-label="Principal">
          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--crema)]/90 transition hover:bg-white/10 hover:text-white"
          >
            Candidaturas
          </Link>
        </nav>
      </div>
    </header>
  );
}

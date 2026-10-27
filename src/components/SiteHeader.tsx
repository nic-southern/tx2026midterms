import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-line/80 bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex flex-col">
          <span className="font-[family-name:var(--font-display)] font-semibold text-lg tracking-tight text-ink sm:text-xl">
            Texas 2026 Guide
          </span>
          <span className="text-xs text-ink-muted group-hover:text-brand">
            Governor &amp; Senate · sourced · nonpartisan
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm sm:gap-3">
          <Link
            href="/governor"
            className="rounded-full px-3 py-1.5 text-ink-muted transition hover:bg-brand-soft hover:text-brand-deep"
          >
            Governor
          </Link>
          <Link
            href="/senate"
            className="rounded-full px-3 py-1.5 text-ink-muted transition hover:bg-brand-soft hover:text-brand-deep"
          >
            Senate
          </Link>
          <Link
            href="/methodology"
            className="rounded-full px-3 py-1.5 text-ink-muted transition hover:bg-brand-soft hover:text-brand-deep"
          >
            Methodology
          </Link>
        </nav>
      </div>
    </header>
  );
}

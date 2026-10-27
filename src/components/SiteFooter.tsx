import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          Built for undecided Texas voters. Not affiliated with any campaign or party.
        </p>
        <div className="flex gap-4">
          <Link href="/methodology" className="hover:text-brand-deep">
            How we stay neutral
          </Link>
          <Link href="/" className="hover:text-brand-deep">
            Home
          </Link>
        </div>
      </div>
    </footer>
  );
}

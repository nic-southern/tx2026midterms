import type { Source } from "../../content/schema";

export function SourceList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) {
    return (
      <p className="rounded-xl bg-warn-bg px-4 py-3 text-sm text-warn">
        No clear public source on file for this summary. Treat as incomplete.
      </p>
    );
  }

  const thin = sources.length < 2;

  return (
    <div className="space-y-3">
      {thin ? (
        <p className="rounded-xl bg-warn-bg px-4 py-3 text-sm text-warn">
          Limited sourcing — consider reading the linked material directly.
        </p>
      ) : null}
      <ul className="grid gap-2 sm:grid-cols-2">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl border border-line bg-surface px-4 py-3 transition hover:border-brand hover:shadow-[var(--shadow)]"
            >
              <div className="text-xs uppercase tracking-wide text-ink-muted">
                {source.publisher} · {source.date}
              </div>
              <div className="mt-1 text-sm font-medium text-ink">{source.title}</div>
              <div className="mt-2 text-xs text-brand-deep">Open source →</div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

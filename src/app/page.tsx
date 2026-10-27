import Link from "next/link";
import { getAllRaces } from "@/lib/content";

export default function HomePage() {
  const races = getAllRaces();

  return (
    <div className="space-y-14">
      <section className="animate-rise relative overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-12 shadow-[var(--shadow)] sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(31,111,235,0.18),transparent_40%)]" />
        <div className="relative max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">
            November 3, 2026
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] font-semibold text-4xl leading-[1.05] text-ink sm:text-6xl">
            Texas 2026 Midterm Guide
          </h1>
          <p className="mt-5 text-lg text-ink-muted">
            A calm place to see the big issues, each major-party candidate&apos;s
            stance, and the sources behind them — then check where you sit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/governor/quiz"
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
            >
              Start with Governor quiz
            </Link>
            <Link
              href="/senate/compare"
              className="rounded-full border-2 border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand-deep"
            >
              Browse Senate compare
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        {races.map((race) => (
          <article
            key={race.id}
            className="rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow)]"
          >
            <p className="text-xs uppercase tracking-wide text-ink-muted">
              {race.office}
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-3xl text-ink">
              {race.title}
            </h2>
            <p className="mt-3 text-sm text-ink-muted">{race.blurb}</p>
            <p className="mt-4 text-sm text-ink">
              {race.candidates.map((c) => c.name).join(" · ")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Link
                href={`/${race.id}/quiz`}
                className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep"
              >
                Take the quiz
              </Link>
              <Link
                href={`/${race.id}/compare`}
                className="rounded-full border-2 border-line bg-surface px-4 py-2 text-sm font-semibold text-ink hover:border-brand hover:text-brand-deep"
              >
                Compare issues
              </Link>
              <Link
                href={`/${race.id}`}
                className="rounded-full px-4 py-2 text-sm text-brand-deep"
              >
                Race hub →
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="rounded-3xl border border-dashed border-line bg-brand-soft/40 px-6 py-8">
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
          How this works
        </h2>
        <ol className="mt-4 grid gap-3 text-sm text-ink-muted sm:grid-cols-3">
          <li>
            <strong className="block text-ink">1. Pick a race</strong>
            Governor or U.S. Senate — major-party nominees only.
          </li>
          <li>
            <strong className="block text-ink">2. Quiz or browse</strong>
            Answer issue prompts, or jump straight into the side-by-side matrix.
          </li>
          <li>
            <strong className="block text-ink">3. Read the sources</strong>
            Every stance opens citations so you can verify for yourself.
          </li>
        </ol>
        <Link
          href="/methodology"
          className="mt-6 inline-flex text-sm font-medium text-brand-deep hover:underline"
        >
          Read our neutrality rules →
        </Link>
      </section>
    </div>
  );
}

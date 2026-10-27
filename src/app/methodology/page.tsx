import type { Metadata } from "next";
import { getAllRaces } from "@/lib/content";

export const metadata: Metadata = {
  title: "Methodology",
};

export default function MethodologyPage() {
  const races = getAllRaces();

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="text-sm uppercase tracking-[0.16em] text-brand-deep">
          Transparency
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-4xl text-ink">
          Methodology
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          This guide is a curated, citation-first viewer. It is not a poll, not
          an endorsement, and not affiliated with any campaign.
        </p>
      </header>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
          What we include
        </h2>
        <p>
          Only declared major-party (Republican and Democratic) candidates for
          Texas governor and U.S. Senate in the November 3, 2026 general
          election.
        </p>
        <ul className="list-disc space-y-1 pl-5">
          {races.map((race) => (
            <li key={race.id}>
              <strong className="text-ink">{race.title}:</strong>{" "}
              {race.candidates.map((c) => `${c.name} (${c.party})`).join(", ")}
              . Last updated {race.lastUpdated}.
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
          Neutrality rules
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Summaries paraphrase public positions without loaded adjectives.</li>
          <li>
            Prefer primary sources (campaign pages, legislation, recorded votes)
            over commentary when available.
          </li>
          <li>Both candidates in a race share the same issue list and quiz prompts.</li>
          <li>
            If a clear public position is thin or missing, we say so rather than
            inventing one.
          </li>
        </ul>
      </section>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
          How the quiz scores
        </h2>
        <p>
          Each answer maps to a position on a −2 to +2 scale for that issue. We
          compare your answer to each candidate&apos;s coded position, skip
          missing stances, and convert average distance into an overlap
          percentage. Closer numbers mean closer alignment with the coded
          summaries — not a recommendation to vote for anyone.
        </p>
      </section>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
          Updating content
        </h2>
        <p>
          All race data lives in JSON files in the repository (
          <code className="rounded bg-brand-soft px-1.5 py-0.5 text-ink">
            content/governor.json
          </code>{" "}
          and{" "}
          <code className="rounded bg-brand-soft px-1.5 py-0.5 text-ink">
            content/senate.json
          </code>
          ). Edit, commit, and republish. Invalid JSON fails the production
          build.
        </p>
      </section>
    </article>
  );
}

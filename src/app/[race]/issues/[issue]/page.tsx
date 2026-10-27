import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PartyBadge } from "@/components/PartyBadge";
import { SourceList } from "@/components/SourceList";
import { getRace, getStance } from "@/lib/content";

type Props = { params: Promise<{ race: string; issue: string }> };

export async function generateStaticParams() {
  const races = ["governor", "senate"] as const;
  const { getRace } = await import("@/lib/content");
  return races.flatMap((raceId) => {
    const race = getRace(raceId);
    if (!race) return [];
    return race.issues.map((issue) => ({ race: raceId, issue: issue.id }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { race: raceId, issue: issueId } = await params;
  const race = getRace(raceId);
  const issue = race?.issues.find((i) => i.id === issueId);
  return { title: issue ? `${issue.title} · ${race?.title}` : "Issue" };
}

export default async function IssuePage({ params }: Props) {
  const { race: raceId, issue: issueId } = await params;
  const race = getRace(raceId);
  if (!race) notFound();
  const issue = race.issues.find((i) => i.id === issueId);
  if (!issue) notFound();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/${race.id}/compare`}
          className="text-sm text-brand-deep hover:underline"
        >
          ← Back to compare
        </Link>
        <p className="mt-4 text-sm uppercase tracking-[0.16em] text-brand-deep">
          {race.title}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-4xl text-ink">
          {issue.title}
        </h1>
        <p className="mt-3 max-w-3xl text-ink-muted">{issue.summary}</p>
        {issue.whyItMatters ? (
          <p className="mt-3 max-w-3xl text-sm text-ink-muted">
            <strong className="text-ink">Why it matters:</strong> {issue.whyItMatters}
          </p>
        ) : null}
        <p className="mt-4 text-xs text-ink-muted">
          Continuum: {issue.axisLow} (−2) ↔ {issue.axisHigh} (+2)
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {race.candidates.map((candidate) => {
          const stance = getStance(race, candidate.id, issue.id);
          return (
            <section
              key={candidate.id}
              className="rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow)]"
            >
              <div className="flex items-center gap-2">
                <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
                  {candidate.name}
                </h2>
                <PartyBadge party={candidate.party} />
              </div>
              <p className="mt-1 text-xs text-ink-muted">
                Coded position:{" "}
                {stance?.position === null || stance?.position === undefined
                  ? "unknown"
                  : stance.position}
              </p>
              <p className="mt-4 leading-relaxed text-ink">
                {stance?.summary ?? "No clear public position on file."}
              </p>
              <div className="mt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                  Sources
                </h3>
                <div className="mt-3">
                  <SourceList sources={stance?.sources ?? []} />
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

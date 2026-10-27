"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Race } from "../../content/schema";
import { clearAnswers, useQuizAnswers } from "@/lib/quiz-storage";
import { scoreRace } from "@/lib/scoring";
import { PartyBadge } from "./PartyBadge";

export function ResultsClient({ race }: { race: Race }) {
  const router = useRouter();
  const answers = useQuizAnswers(race.id);

  const matches = useMemo(() => scoreRace(race, answers), [answers, race]);

  if (Object.keys(answers).length === 0) {
    return (
      <div className="rounded-3xl border border-line bg-surface p-8">
        <h1 className="font-[family-name:var(--font-display)] font-semibold text-3xl text-ink">
          No answers yet
        </h1>
        <p className="mt-3 text-ink-muted">
          Take the short stance quiz to see how your views overlap with each
          candidate.
        </p>
        <Link
          href={`/${race.id}/quiz`}
          className="mt-6 inline-flex rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          Start the quiz
        </Link>
      </div>
    );
  }

  const issueTitle = (id: string) =>
    race.issues.find((i) => i.id === id)?.title ?? id;

  return (
    <div className="space-y-8">
      <div className="animate-rise">
        <p className="text-sm uppercase tracking-[0.16em] text-brand-deep">
          Your overlap
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-4xl text-ink">
          Closest overlap with your answers
        </h1>
        <p className="mt-3 max-w-2xl text-ink-muted">
          Percentages measure distance between your quiz answers and each
          candidate&apos;s coded positions. This is not an endorsement or a
          prediction.
        </p>
      </div>

      <div className="grid gap-4">
        {matches.map((match, index) => {
          const candidate = race.candidates.find((c) => c.id === match.candidateId);
          if (!candidate) return null;
          return (
            <article
              key={candidate.id}
              className="animate-rise rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow)]"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
                      {candidate.name}
                    </h2>
                    <PartyBadge party={candidate.party} />
                  </div>
                  {index === 0 ? (
                    <p className="mt-1 text-sm text-brand-deep">
                      Highest overlap on answered issues
                    </p>
                  ) : null}
                </div>
                <div className="text-right">
                  <div className="font-[family-name:var(--font-display)] font-semibold text-3xl text-ink">
                    {match.percent}%
                  </div>
                  <div className="text-xs text-ink-muted">overlap</div>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-soft">
                <div
                  className="animate-grow h-full rounded-full bg-brand"
                  style={{ width: `${match.percent}%` }}
                />
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Closest issues
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {match.aligned.length === 0 ? (
                      <span className="text-sm text-ink-muted">None marked close</span>
                    ) : (
                      match.aligned.map((id) => (
                        <Link
                          key={id}
                          href={`/${race.id}/issues/${id}`}
                          className="rounded-full bg-brand-soft px-3 py-1 text-xs text-brand-deep"
                        >
                          {issueTitle(id)}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Bigger gaps
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {match.differed.length === 0 ? (
                      <span className="text-sm text-ink-muted">No large gaps</span>
                    ) : (
                      match.differed.map((id) => (
                        <Link
                          key={id}
                          href={`/${race.id}/issues/${id}`}
                          className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted"
                        >
                          {issueTitle(id)}
                        </Link>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href={`/${race.id}/compare`}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          Open full compare
        </Link>
        <button
          type="button"
          onClick={() => {
            clearAnswers(race.id);
            router.push(`/${race.id}/quiz`);
          }}
          className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-ink"
        >
          Retake quiz
        </button>
      </div>
    </div>
  );
}

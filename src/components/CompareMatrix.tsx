import Link from "next/link";
import type { Race } from "../../content/schema";
import { getStance } from "@/lib/content";
import { PartyBadge } from "./PartyBadge";

export function CompareMatrix({ race }: { race: Race }) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-line bg-surface shadow-[var(--shadow)]">
      <table className="min-w-[720px] w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-brand-soft/40">
            <th className="sticky left-0 z-10 bg-brand-soft/90 px-4 py-4 text-sm font-medium text-ink-muted backdrop-blur">
              Issue
            </th>
            {race.candidates.map((c) => (
              <th key={c.id} className="px-4 py-4 align-bottom">
                <div className="font-[family-name:var(--font-display)] font-semibold text-lg text-ink">
                  {c.name}
                </div>
                <div className="mt-1">
                  <PartyBadge party={c.party} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {race.issues.map((issue) => (
            <tr key={issue.id} className="border-b border-line last:border-0">
              <th className="sticky left-0 z-10 bg-surface px-4 py-5 align-top backdrop-blur">
                <Link
                  href={`/${race.id}/issues/${issue.id}`}
                  className="font-medium text-ink hover:text-brand-deep"
                >
                  {issue.title}
                </Link>
                <p className="mt-1 text-xs font-normal text-ink-muted">
                  {issue.axisLow} ↔ {issue.axisHigh}
                </p>
              </th>
              {race.candidates.map((c) => {
                const stance = getStance(race, c.id, issue.id);
                return (
                  <td key={c.id} className="px-4 py-5 align-top text-sm text-ink-muted">
                    <p className="leading-relaxed text-ink">
                      {stance?.summary ?? "No clear public position on file."}
                    </p>
                    <Link
                      href={`/${race.id}/issues/${issue.id}`}
                      className="mt-3 inline-flex text-xs font-medium text-brand-deep hover:underline"
                    >
                      {stance?.sources.length ?? 0} source
                      {(stance?.sources.length ?? 0) === 1 ? "" : "s"} →
                    </Link>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

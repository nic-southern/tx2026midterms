import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getRace, partyLabel } from "@/lib/content";
import { PartyBadge } from "@/components/PartyBadge";

type Props = { params: Promise<{ race: string }> };

export async function generateStaticParams() {
  return [{ race: "governor" }, { race: "senate" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { race: id } = await params;
  const race = getRace(id);
  return { title: race?.title ?? "Race" };
}

export default async function RaceHubPage({ params }: Props) {
  const { race: id } = await params;
  const race = getRace(id);
  if (!race) notFound();

  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.16em] text-brand-deep">
          {race.office} · Election {race.electionDate}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-4xl text-ink sm:text-5xl">
          {race.title}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{race.blurb}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${race.id}/quiz`}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
          >
            Take the stance quiz
          </Link>
          <Link
            href={`/${race.id}/compare`}
            className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium"
          >
            Open issue compare
          </Link>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {race.candidates.map((c) => (
          <article
            key={c.id}
            className="rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow)]"
          >
            <PartyBadge party={c.party} />
            <h2 className="mt-3 font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
              {c.name}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">{partyLabel(c.party)} nominee</p>
            {c.website ? (
              <a
                href={c.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex text-sm text-brand-deep hover:underline"
              >
                Campaign website →
              </a>
            ) : null}
          </article>
        ))}
      </section>

      <section>
        <h2 className="font-[family-name:var(--font-display)] font-semibold text-2xl text-ink">
          Issues covered
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {race.issues.map((issue) => (
            <Link
              key={issue.id}
              href={`/${race.id}/issues/${issue.id}`}
              className="rounded-2xl border border-line bg-surface px-4 py-4 transition hover:border-brand"
            >
              <div className="font-medium text-ink">{issue.title}</div>
              <p className="mt-1 text-sm text-ink-muted">{issue.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

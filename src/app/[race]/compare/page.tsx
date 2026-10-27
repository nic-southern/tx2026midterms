import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { CompareMatrix } from "@/components/CompareMatrix";
import { getRace } from "@/lib/content";

type Props = { params: Promise<{ race: string }> };

export async function generateStaticParams() {
  return [{ race: "governor" }, { race: "senate" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { race: id } = await params;
  const race = getRace(id);
  return { title: race ? `${race.title} compare` : "Compare" };
}

export default async function ComparePage({ params }: Props) {
  const { race: id } = await params;
  const race = getRace(id);
  if (!race) notFound();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link href={`/${race.id}`} className="text-sm text-brand-deep hover:underline">
            ← {race.title}
          </Link>
          <h1 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-4xl text-ink">
            Issue compare
          </h1>
          <p className="mt-2 max-w-2xl text-ink-muted">
            Side-by-side summaries for each issue. Open a row for full sources.
          </p>
        </div>
        <Link
          href={`/${race.id}/quiz`}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep"
        >
          Take the quiz
        </Link>
      </div>
      <CompareMatrix race={race} />
    </div>
  );
}

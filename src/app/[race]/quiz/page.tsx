import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { QuizClient } from "@/components/QuizClient";
import { getRace } from "@/lib/content";

type Props = { params: Promise<{ race: string }> };

export async function generateStaticParams() {
  return [{ race: "governor" }, { race: "senate" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { race: id } = await params;
  const race = getRace(id);
  return { title: race ? `${race.title} quiz` : "Quiz" };
}

export default async function QuizPage({ params }: Props) {
  const { race: id } = await params;
  const race = getRace(id);
  if (!race) notFound();

  return (
    <div className="space-y-6">
      <Link href={`/${race.id}`} className="text-sm text-brand-deep hover:underline">
        ← {race.title}
      </Link>
      <QuizClient race={race} />
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Position, Race } from "../../content/schema";
import { clearAnswers, setAnswer, useQuizAnswers } from "@/lib/quiz-storage";

export function QuizClient({ race }: { race: Race }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const answers = useQuizAnswers(race.id);

  const item = race.quiz[step];
  const progress = ((step + 1) / race.quiz.length) * 100;
  const selected = item ? answers[item.issueId] : undefined;

  const issueTitle = useMemo(() => {
    return race.issues.find((i) => i.id === item?.issueId)?.title ?? "";
  }, [race.issues, item?.issueId]);

  if (!item) {
    return (
      <div className="rounded-3xl border border-line bg-surface p-8 text-ink-muted">
        Loading quiz…
      </div>
    );
  }

  function choose(value: Position) {
    setAnswer(race.id, item.issueId, value);
  }

  function next() {
    if (step >= race.quiz.length - 1) {
      router.push(`/${race.id}/results`);
      return;
    }
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  return (
    <div className="animate-rise overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[var(--shadow)]">
      <div className="h-1.5 w-full bg-brand-soft">
        <div
          className="h-full bg-brand transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[220px] bg-[linear-gradient(160deg,#0b4fbf_0%,#1f6feb_45%,#7eb6ff_100%)] p-8 text-white lg:min-h-full">
          <p className="text-sm uppercase tracking-[0.18em] text-white/70">
            Question {step + 1} of {race.quiz.length}
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] font-semibold text-3xl leading-tight sm:text-4xl">
            Where do you sit?
          </h1>
          <p className="mt-4 max-w-sm text-white/85">
            Answer honestly. We compare your choices to each candidate&apos;s
            sourced position — we do not endorse anyone.
          </p>
          <button
            type="button"
            onClick={() => {
              clearAnswers(race.id);
              setStep(0);
            }}
            className="mt-8 text-sm text-white/70 underline-offset-2 hover:text-white hover:underline"
          >
            Reset answers
          </button>
        </div>

        <div className="p-6 sm:p-10">
          <p className="text-sm font-medium text-brand-deep">{issueTitle}</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] font-semibold text-2xl text-ink sm:text-3xl">
            {item.prompt}
          </h2>
          <div className="mt-8 grid gap-3">
            {item.options.map((option) => {
              const active = selected === option.value;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => choose(option.value)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition sm:text-base ${
                    active
                      ? "border-brand bg-brand-soft text-brand-deep shadow-sm"
                      : "border-line bg-paper/60 text-ink hover:border-brand/50"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="rounded-full px-4 py-2 text-sm text-ink-muted disabled:opacity-40"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={selected === undefined}
              className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-deep transition hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step >= race.quiz.length - 1 ? "See results" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

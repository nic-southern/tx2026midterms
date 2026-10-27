"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Position } from "../../content/schema";
import type { Answers } from "./scoring";

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeAnswers(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function key(raceId: string) {
  return `tx2026midterm:quiz:${raceId}`;
}

export function loadAnswers(raceId: string): Answers {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(key(raceId));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Answers;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveAnswers(raceId: string, answers: Answers) {
  localStorage.setItem(key(raceId), JSON.stringify(answers));
  emit();
}

export function clearAnswers(raceId: string) {
  localStorage.removeItem(key(raceId));
  emit();
}

export function setAnswer(
  raceId: string,
  issueId: string,
  value: Position,
): Answers {
  const next = { ...loadAnswers(raceId), [issueId]: value };
  saveAnswers(raceId, next);
  return next;
}

export function useQuizAnswers(raceId: string): Answers {
  const getSnapshot = useCallback(() => loadAnswers(raceId), [raceId]);
  const getServerSnapshot = useCallback(() => ({} as Answers), []);
  return useSyncExternalStore(subscribeAnswers, getSnapshot, getServerSnapshot);
}

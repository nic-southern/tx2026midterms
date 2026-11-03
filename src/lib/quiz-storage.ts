"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Position } from "../../content/schema";
import type { Answers } from "./scoring";

const listeners = new Set<() => void>();

/** Stable empty snapshot. A fresh object each read retriggers React forever. */
const EMPTY_ANSWERS: Answers = {};

const snapshots = new Map<string, { raw: string | null; value: Answers }>();

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

function readRaw(raceId: string): string | null {
  try {
    return localStorage.getItem(key(raceId));
  } catch {
    return null;
  }
}

function parseAnswers(raw: string | null): Answers {
  if (!raw) return EMPTY_ANSWERS;
  try {
    const parsed = JSON.parse(raw) as Answers;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return EMPTY_ANSWERS;
    }
    return parsed;
  } catch {
    return EMPTY_ANSWERS;
  }
}

function snapshotFor(raceId: string, raw: string | null): Answers {
  const cached = snapshots.get(raceId);
  if (cached && cached.raw === raw) return cached.value;
  const value = parseAnswers(raw);
  snapshots.set(raceId, { raw, value });
  return value;
}

export function loadAnswers(raceId: string): Answers {
  if (typeof window === "undefined") return EMPTY_ANSWERS;
  return snapshotFor(raceId, readRaw(raceId));
}

export function saveAnswers(raceId: string, answers: Answers) {
  const raw = JSON.stringify(answers);
  localStorage.setItem(key(raceId), raw);
  snapshots.set(raceId, { raw, value: answers });
  emit();
}

export function clearAnswers(raceId: string) {
  localStorage.removeItem(key(raceId));
  snapshots.set(raceId, { raw: null, value: EMPTY_ANSWERS });
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

function getServerSnapshot(): Answers {
  return EMPTY_ANSWERS;
}

export function useQuizAnswers(raceId: string): Answers {
  const getSnapshot = useCallback(() => loadAnswers(raceId), [raceId]);
  return useSyncExternalStore(subscribeAnswers, getSnapshot, getServerSnapshot);
}

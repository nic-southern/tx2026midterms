import type { Position, Race } from "../../content/schema";
import { getStance } from "./content";

export type Answers = Record<string, Position>;

export type CandidateMatch = {
  candidateId: string;
  percent: number;
  comparedIssues: string[];
  aligned: string[];
  differed: string[];
};

export function scoreRace(race: Race, answers: Answers): CandidateMatch[] {
  return race.candidates.map((candidate) => {
    const comparedIssues: string[] = [];
    const aligned: string[] = [];
    const differed: string[] = [];
    let totalDistance = 0;

    for (const [issueId, userPos] of Object.entries(answers)) {
      const stance = getStance(race, candidate.id, issueId);
      if (!stance || stance.position === null) continue;
      comparedIssues.push(issueId);
      const distance = Math.abs(userPos - stance.position);
      totalDistance += distance;
      if (distance <= 1) aligned.push(issueId);
      else differed.push(issueId);
    }

    const meanDistance =
      comparedIssues.length === 0 ? 4 : totalDistance / comparedIssues.length;
    const percent = Math.round((1 - meanDistance / 4) * 100);

    return {
      candidateId: candidate.id,
      percent,
      comparedIssues,
      aligned,
      differed,
    };
  }).sort((a, b) => b.percent - a.percent);
}

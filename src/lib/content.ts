import { RaceSchema, type Race, type RaceId, type Stance } from "../../content/schema";
import governorData from "../../content/governor.json";
import senateData from "../../content/senate.json";

const races: Record<RaceId, Race> = {
  governor: RaceSchema.parse(governorData),
  senate: RaceSchema.parse(senateData),
};

export function getRace(id: string): Race | null {
  if (id === "governor" || id === "senate") return races[id];
  return null;
}

export function getAllRaces(): Race[] {
  return [races.governor, races.senate];
}

export function getStance(
  race: Race,
  candidateId: string,
  issueId: string,
): Stance | undefined {
  return race.stances.find(
    (s) => s.candidateId === candidateId && s.issueId === issueId,
  );
}

export function requireRace(id: string): Race {
  const race = getRace(id);
  if (!race) throw new Error(`Unknown race: ${id}`);
  return race;
}

export function partyLabel(party: "R" | "D"): string {
  return party === "R" ? "Republican" : "Democrat";
}

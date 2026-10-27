import { z } from "zod";

export const PositionSchema = z.union([
  z.literal(-2),
  z.literal(-1),
  z.literal(0),
  z.literal(1),
  z.literal(2),
]);

export const SourceTypeSchema = z.enum([
  "campaign",
  "legislation",
  "news",
  "voting-record",
  "other",
]);

export const SourceSchema = z.object({
  title: z.string().min(1),
  publisher: z.string().min(1),
  url: z.string().url(),
  date: z.string().min(1),
  type: SourceTypeSchema,
});

export const CandidateSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  party: z.enum(["R", "D"]),
  website: z.string().url().optional(),
  photo: z.string().optional(),
});

export const IssueSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  whyItMatters: z.string().optional(),
  axisLow: z.string().min(1),
  axisHigh: z.string().min(1),
});

export const StanceSchema = z.object({
  candidateId: z.string().min(1),
  issueId: z.string().min(1),
  /** -2 aligns with issue.axisLow; +2 with issue.axisHigh. null = no clear public position. */
  position: PositionSchema.nullable(),
  summary: z.string().min(1),
  sources: z.array(SourceSchema),
});

export const QuizOptionSchema = z.object({
  label: z.string().min(1),
  value: PositionSchema,
});

export const QuizItemSchema = z.object({
  issueId: z.string().min(1),
  prompt: z.string().min(1),
  options: z.array(QuizOptionSchema).min(2),
});

export const RaceSchema = z
  .object({
    id: z.enum(["governor", "senate"]),
    title: z.string().min(1),
    office: z.string().min(1),
    electionDate: z.string().min(1),
    lastUpdated: z.string().min(1),
    blurb: z.string().min(1),
    candidates: z.array(CandidateSchema).min(2),
    issues: z.array(IssueSchema).min(1),
    stances: z.array(StanceSchema).min(1),
    quiz: z.array(QuizItemSchema).min(1),
  })
  .superRefine((race, ctx) => {
    const candidateIds = new Set(race.candidates.map((c) => c.id));
    const issueIds = new Set(race.issues.map((i) => i.id));

    for (const stance of race.stances) {
      if (!candidateIds.has(stance.candidateId)) {
        ctx.addIssue({
          code: "custom",
          message: `Unknown candidateId "${stance.candidateId}" in stances`,
          path: ["stances"],
        });
      }
      if (!issueIds.has(stance.issueId)) {
        ctx.addIssue({
          code: "custom",
          message: `Unknown issueId "${stance.issueId}" in stances`,
          path: ["stances"],
        });
      }
    }

    for (const item of race.quiz) {
      if (!issueIds.has(item.issueId)) {
        ctx.addIssue({
          code: "custom",
          message: `Unknown issueId "${item.issueId}" in quiz`,
          path: ["quiz"],
        });
      }
    }
  });

export type Position = z.infer<typeof PositionSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type Candidate = z.infer<typeof CandidateSchema>;
export type Issue = z.infer<typeof IssueSchema>;
export type Stance = z.infer<typeof StanceSchema>;
export type QuizItem = z.infer<typeof QuizItemSchema>;
export type Race = z.infer<typeof RaceSchema>;
export type RaceId = Race["id"];

# Texas 2026 Midterm Guide

Unbiased, sourced viewer for the Texas **Governor** and **U.S. Senate** races (Nov 3, 2026). Major-party candidates only. Quiz + issue compare, citations on every stance.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Update content & republish

All editorial content lives in JSON:

- [`content/governor.json`](content/governor.json)
- [`content/senate.json`](content/senate.json)

Schema / validation: [`content/schema.ts`](content/schema.ts) (Zod). Invalid data fails `npm run build`.

1. Edit the JSON (stances, sources, quiz prompts, candidates).
2. Run `npm run build` locally to validate.
3. Commit and redeploy (Vercel or your host).

### Stance coding

Each issue has `axisLow` (−2) and `axisHigh` (+2). Candidate `position` values are integers from −2 to 2, or `null` if unknown. Quiz options use the same scale so overlap scoring stays consistent.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS v4
- Zod for build-time content validation
- Client quiz answers in `localStorage` (no accounts)

## Deploy on Vercel

```bash
npm i -g vercel   # if needed
vercel
```

Or connect the Git repo in the Vercel dashboard and deploy on push.

## Neutrality

See [/methodology](/methodology) in the app. Summaries should paraphrase with citations; prefer primary sources; never invent positions.

## Temporary preview

A temporary Vercel deployment was published during setup (anonymous; expires ~60 minutes unless claimed):

- Preview: https://swift-pumice-wxzqd8u.tmp.now
- Claim to keep: https://vercel.com/claim-deployment?code=92505508-4e6d-4c87-930d-2b43c6e77a9e

For a durable project, run `npx vercel login` then `npx vercel --prod`, or connect the Git repo in the Vercel dashboard.

import { partyLabel } from "@/lib/content";

export function PartyBadge({ party }: { party: "R" | "D" }) {
  const color =
    party === "R"
      ? "bg-republican/10 text-republican"
      : "bg-democrat/10 text-democrat";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
    >
      {partyLabel(party)}
    </span>
  );
}

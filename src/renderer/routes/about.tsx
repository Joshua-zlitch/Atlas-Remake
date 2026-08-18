import { createFileRoute } from "@tanstack/react-router";
import { Orb, type OrbState } from "@/components/atlas/Orb";
import { PageHeader } from "@/components/atlas/PageHeader";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Atlas" },
      {
        name: "description",
        content:
          "Atlas is an offline-first desktop companion built around a single presence: the Orb.",
      },
      { property: "og:title", content: "About Atlas" },
      { property: "og:description", content: "An offline-first desktop companion, built calm." },
    ],
  }),
  component: About,
});

const states: { state: OrbState; label: string; copy: string }[] = [
  { state: "idle", label: "Idle", copy: "Breathing softly. Present, never demanding." },
  { state: "listening", label: "Listening", copy: "The glow widens as Atlas takes you in." },
  { state: "thinking", label: "Thinking", copy: "Rings turn slowly. Considered, never frantic." },
  { state: "speaking", label: "Speaking", copy: "Light pulses gently with each phrase." },
  { state: "processing", label: "Processing", copy: "Light travels the inner rings while it works." },
];

function About() {
  return (
    <div className="px-10 py-8">
      <PageHeader
        title="About Atlas"
        description="Your intelligent desktop companion. Offline-first, privacy-respecting and designed to stay calm even when the work is not."
      />

      <div className="atlas-panel mb-6 flex items-center gap-10 p-10 animate-rise">
        <Orb size={180} state="idle" />
        <div className="max-w-xl">
          <h2 className="font-display text-2xl font-semibold">The Orb is Atlas</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
            Atlas has no logo. The Orb carries the identity instead — a glass sphere with a deep
            blue core, translucent rings and layered light. It shifts through five states so you
            always know what Atlas is doing, without a single word of status text.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-5">
        {states.map((s, i) => (
          <div
            key={s.state}
            className="atlas-panel atlas-lift flex flex-col items-center p-6 text-center animate-rise"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <Orb size={112} state={s.state} />
            <p className="mt-3 text-[14px] font-medium">{s.label}</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">{s.copy}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

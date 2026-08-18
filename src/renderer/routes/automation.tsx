import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Play, Timer } from "lucide-react";
import { toast } from "sonner";
import { workflows } from "@/data/prototype";
import { PageHeader } from "@/components/atlas/PageHeader";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/automation")({
  head: () => ({
    meta: [
      { title: "Automation — Atlas" },
      {
        name: "description",
        content: "Quiet routines that run on your machine: summaries, backups and focus mode.",
      },
      { property: "og:title", content: "Automation — Atlas" },
      { property: "og:description", content: "Quiet local routines that run on schedule." },
    ],
  }),
  component: Automation,
});

function Automation() {
  const [state, setState] = useState(() =>
    Object.fromEntries(workflows.map((w) => [w.id, w.enabled])),
  );

  return (
    <div className="px-10 py-8">
      <PageHeader
        title="Automation"
        description="Small, dependable routines that run quietly in the background. Everything executes locally and can be paused at any time."
      />

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        {workflows.map((w, i) => (
          <article
            key={w.id}
            className="atlas-panel atlas-lift p-6 animate-rise"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-[17px] font-semibold">{w.name}</h3>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted-foreground">
                  {w.description}
                </p>
              </div>
              <Switch
                checked={state[w.id]}
                onCheckedChange={(v) => {
                  setState((s) => ({ ...s, [w.id]: v }));
                  toast(v ? "Automation enabled" : "Automation paused", { description: w.name });
                }}
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {w.schedule}
              </span>
              <span className="flex items-center gap-1.5">
                <Play className="h-3.5 w-3.5" /> Last run {w.lastRun}
              </span>
              <span className="flex items-center gap-1.5">
                <Timer className="h-3.5 w-3.5" /> {w.duration}
              </span>
              <span
                className={
                  state[w.id]
                    ? "ml-auto flex items-center gap-2 text-success"
                    : "ml-auto flex items-center gap-2 text-muted-foreground"
                }
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: state[w.id] ? "var(--success)" : "var(--muted-foreground)" }}
                />
                {state[w.id] ? "Active" : "Paused"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

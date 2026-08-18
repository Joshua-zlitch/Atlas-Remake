import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Play, Timer } from "lucide-react";
import { toast } from "sonner";
import { workflows } from "@/data/prototype";
import { PageHeader } from "@/components/atlas/PageHeader";
import { Switch } from "@/components/ui/switch";
import { invokeCapability } from "@/lib/atlas";

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

import { useEffect, useState } from "react";
import { AutomationItem } from "@shared/types";

function Automation() {
  const [items, setItems] = useState<AutomationItem[]>(workflows as unknown as AutomationItem[]);

  useEffect(() => {
    invokeCapability<undefined, AutomationItem[]>("automation:list").then((res) => {
      if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setItems(res.data);
      }
    });
  }, []);

  const handleToggle = async (wId: string, wName: string, enable: boolean) => {
    setItems((list) => list.map((w) => (w.id === wId ? { ...w, enabled: enable } : w)));
    const res = await invokeCapability("automation:toggle", { workflowId: wId, enabled: enable });
    toast(enable ? "Automation enabled" : "Automation paused", {
      description: res.error?.message || `${wName} routine status updated`,
    });
  };

  const handleRun = async (wId: string, wName: string) => {
    const res = await invokeCapability("automation:run", { workflowId: wId });
    if (res.success) {
      toast("Routine Triggered", { description: `${wName} executed successfully.` });
    } else {
      toast("Trigger Failed", { description: res.error?.message || "Failed to run routine" });
    }
  };

  return (
    <div className="px-10 py-8">
      <PageHeader
        title="Automation"
        description="Small, dependable routines that run quietly in the background. Everything executes locally and can be paused at any time."
      />

      <div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
        {items.map((w, i) => (
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
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleRun(w.id, w.name)}
                  className="rounded-lg border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:border-primary/40 hover:text-foreground"
                >
                  Run Now
                </button>
                <Switch
                  checked={w.enabled}
                  onCheckedChange={(v) => handleToggle(w.id, w.name, v)}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-[12px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> {w.schedule}
              </span>
              <span className="flex items-center gap-1.5">
                <Play className="h-3.5 w-3.5" /> Last run {w.lastRun || "Never"}
              </span>
              <span
                className={
                  w.enabled
                    ? "ml-auto flex items-center gap-2 text-success"
                    : "ml-auto flex items-center gap-2 text-muted-foreground"
                }
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: w.enabled ? "var(--success)" : "var(--muted-foreground)" }}
                />
                {w.enabled ? "Active" : "Paused"}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

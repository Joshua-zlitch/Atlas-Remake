import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ShieldCheck } from "lucide-react";
import { guardianMetrics, guardianSeries } from "@/data/prototype";
import { PageHeader } from "@/components/atlas/PageHeader";
import { Orb } from "@/components/atlas/Orb";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/guardian")({
  head: () => ({
    meta: [
      { title: "Guardian — Atlas" },
      {
        name: "description",
        content: "Atlas Guardian watches system health, storage, security and the local database.",
      },
      { property: "og:title", content: "Guardian — Atlas" },
      { property: "og:description", content: "System health at a glance, checked locally." },
    ],
  }),
  component: Guardian,
});

const toneClass = { success: "bg-success", warning: "bg-warning", danger: "bg-danger" } as const;

function Guardian() {
  return (
    <div className="px-10 py-8">
      <PageHeader
        title="Guardian"
        description="Continuous, local-only monitoring of the machine Atlas lives on. No telemetry ever leaves this device."
      />

      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="atlas-panel atlas-lift col-span-1 flex items-center gap-5 p-6">
          <Orb size={92} state="processing" reflection={false} />
          <div>
            <p className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
              Atlas Status
            </p>
            <p className="mt-1.5 font-display text-2xl font-semibold">Healthy</p>
            <p className="mt-2 flex items-center gap-2 text-[12px] text-success">
              <ShieldCheck className="h-3.5 w-3.5" /> All checks passed
            </p>
          </div>
        </div>

        <div className="atlas-panel atlas-lift col-span-2 p-6">
          <h3 className="mb-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Load · last 6 hours
          </h3>
          <div className="h-[168px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={guardianSeries} margin={{ left: -24, right: 4, top: 4 }}>
                <defs>
                  <linearGradient id="cpuFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="memFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-soft)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--accent-soft)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="t"
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  fill="url(#cpuFill)"
                />
                <Area
                  type="monotone"
                  dataKey="mem"
                  stroke="var(--accent-soft)"
                  strokeWidth={2}
                  fill="url(#memFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-5">
        {guardianMetrics.map((m, i) => (
          <div
            key={m.id}
            className="atlas-panel atlas-lift p-5 animate-rise"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <p className="text-[12px] uppercase tracking-[0.14em] text-muted-foreground">
              {m.label}
            </p>
            <p className="mt-2 font-display text-3xl font-semibold">
              {m.value}
              <span className="text-lg text-muted-foreground">{m.unit}</span>
            </p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className={cn("h-full rounded-full transition-[width] duration-1000", toneClass[m.tone])}
                style={{ width: `${m.value}%`, transitionTimingFunction: "var(--ease-calm)" }}
              />
            </div>
            <p className="mt-3 text-[12px] text-muted-foreground">{m.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

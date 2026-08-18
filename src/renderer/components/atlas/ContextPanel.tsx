import {
  Pin,
  Activity,
  ShieldCheck,
  Workflow,
  CalendarDays,
  PanelRight,
  FolderKanban,
  MessageSquare,
  FileText,
  Brain,
  BarChart3,
  Clock,
} from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import {
  memories,
  memoryCategories,
  recentActivity,
  upcomingEvents,
  workflows,
  guardianMetrics,
  recentConversations,
  projectFiles,
} from "@/data/prototype";
import { cn } from "@/lib/utils";
import { useProjects } from "./project-store";

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="atlas-panel atlas-lift p-4">
      <header className="mb-3 flex items-center gap-2">
        <Icon className="h-[15px] w-[15px] text-primary" />
        <h3 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h3>
      </header>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <li className="flex items-center justify-between gap-3 text-[13px]">
      <span>{label}</span>
      <span className="text-[11.5px] text-muted-foreground">{value}</span>
    </li>
  );
}

function ActivitySection() {
  return (
    <Section icon={Activity} title="Recent Activity">
      <ul className="space-y-2.5">
        {recentActivity.map((a) => (
          <li key={a.id} className="flex items-start justify-between gap-3 text-[13px]">
            <div>
              <p>{a.label}</p>
              <p className="text-[12px] text-muted-foreground">{a.detail}</p>
            </div>
            <span className="shrink-0 text-[11px] text-muted-foreground">{a.time}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function GuardianSection() {
  return (
    <Section icon={ShieldCheck} title="Guardian Status">
      <div className="flex items-center gap-2 text-[13px]">
        <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_10px_var(--success)]" />
        <span>All systems healthy</span>
      </div>
      <p className="mt-2 text-[12px] text-muted-foreground">Last scan 26 minutes ago</p>
    </Section>
  );
}

function HomeContext() {
  const { projects } = useProjects();
  const active = workflows.filter((w) => w.enabled).length;
  const pinned = projects.filter((p) => p.pinned);

  return (
    <>
      <Section icon={CalendarDays} title="Today's Summary">
        <p className="text-[13px] leading-relaxed text-muted-foreground">
          Three memories captured, one automation completed and no Guardian alerts. Your focus
          window starts in 40 minutes.
        </p>
      </Section>

      <Section icon={Pin} title="Pinned Projects">
        <ul className="space-y-2">
          {pinned.map((p) => (
            <li
              key={p.id}
              className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-surface-2/40 px-3 py-2 text-[13px]"
            >
              <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
              <span className="truncate">{p.name}</span>
            </li>
          ))}
        </ul>
      </Section>

      <GuardianSection />

      <Section icon={Workflow} title="Automation">
        <p className="text-[13px]">
          <span className="text-primary">{active}</span> of {workflows.length} workflows enabled
        </p>
        <p className="mt-2 text-[12px] text-muted-foreground">Next run · Daily Summary at 19:30</p>
      </Section>

      <ActivitySection />
    </>
  );
}

function ProjectsContext() {
  const { active } = useProjects();
  const convos = recentConversations.filter((c) => c.projectId === active.id);
  const files = projectFiles.filter((f) => f.projectId === active.id);

  return (
    <>
      <Section icon={FolderKanban} title="Project Statistics">
        <ul className="space-y-2">
          <Row label="Conversations" value={active.counts.conversations} />
          <Row label="Memories" value={active.counts.memories} />
          <Row label="Files" value={active.counts.files} />
          <Row label="Automations" value={active.counts.automations} />
        </ul>
      </Section>

      <Section icon={FileText} title="Recent Files">
        <ul className="space-y-2">
          {files.map((f) => (
            <Row key={f.id} label={f.name} value={f.size} />
          ))}
          {files.length === 0 && (
            <li className="text-[12.5px] text-muted-foreground">No files in this project yet.</li>
          )}
        </ul>
      </Section>

      <Section icon={MessageSquare} title="Recent Conversations">
        <ul className="space-y-2">
          {convos.map((c) => (
            <Row key={c.id} label={c.title} value={c.time} />
          ))}
          {convos.length === 0 && (
            <li className="text-[12.5px] text-muted-foreground">No conversations yet.</li>
          )}
        </ul>
      </Section>

      <Section icon={Pin} title="Pinned Items">
        <ul className="space-y-2">
          {memories
            .filter((m) => m.pinned)
            .map((m) => (
              <li
                key={m.id}
                className="rounded-xl border border-border/70 bg-surface-2/40 px-3 py-2 text-[13px]"
              >
                {m.title}
              </li>
            ))}
        </ul>
      </Section>
    </>
  );
}

function MemoryContext() {
  return (
    <>
      <Section icon={Pin} title="Pinned Memories">
        <ul className="space-y-2">
          {memories
            .filter((m) => m.pinned)
            .map((m) => (
              <li
                key={m.id}
                className="rounded-xl border border-border/70 bg-surface-2/40 px-3 py-2 text-[13px] transition-colors hover:border-primary/40"
              >
                {m.title}
              </li>
            ))}
        </ul>
      </Section>

      <Section icon={Brain} title="Related Memories">
        <ul className="space-y-2">
          {memories.slice(2, 5).map((m) => (
            <Row key={m.id} label={m.title} value={m.category} />
          ))}
        </ul>
      </Section>

      <Section icon={Clock} title="Timeline">
        <ul className="space-y-2">
          {memories.slice(0, 4).map((m) => (
            <Row key={m.id} label={m.title} value={m.date} />
          ))}
        </ul>
      </Section>

      <Section icon={FolderKanban} title="Categories">
        <div className="flex flex-wrap gap-2">
          {memoryCategories.slice(1).map((c) => (
            <span
              key={c}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>

      <Section icon={BarChart3} title="Statistics">
        <ul className="space-y-2">
          <Row label="Total memories" value={memories.length} />
          <Row label="Pinned" value={memories.filter((m) => m.pinned).length} />
          <Row label="High importance" value={memories.filter((m) => m.importance === "High").length} />
        </ul>
      </Section>
    </>
  );
}

function GuardianContext() {
  return (
    <>
      <GuardianSection />
      <Section icon={BarChart3} title="Resources">
        <ul className="space-y-2">
          {guardianMetrics.map((m) => (
            <Row key={m.id} label={m.label} value={`${m.value}${m.unit}`} />
          ))}
        </ul>
      </Section>
      <Section icon={Activity} title="Alerts">
        <p className="text-[13px] text-muted-foreground">
          No open alerts. Storage crossed 65% and is being watched.
        </p>
      </Section>
      <ActivitySection />
    </>
  );
}

function AutomationContext() {
  return (
    <>
      <Section icon={Workflow} title="Schedules">
        <ul className="space-y-2">
          {workflows.map((w) => (
            <Row key={w.id} label={w.name} value={w.schedule} />
          ))}
        </ul>
      </Section>
      <Section icon={Activity} title="Running Workflows">
        <p className="text-[13px] text-muted-foreground">
          None running. {workflows.filter((w) => w.enabled).length} scheduled and idle.
        </p>
      </Section>
      <Section icon={CalendarDays} title="Upcoming Tasks">
        <ul className="space-y-2">
          {upcomingEvents.map((e) => (
            <Row key={e.id} label={e.label} value={e.time} />
          ))}
        </ul>
      </Section>
      <Section icon={Clock} title="Execution Logs">
        <ul className="space-y-2">
          {workflows.map((w) => (
            <Row key={w.id} label={w.lastRun} value={w.duration} />
          ))}
        </ul>
      </Section>
    </>
  );
}

export function ContextPanel({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const { title, body } = (() => {
    if (pathname.startsWith("/projects")) return { title: "Project", body: <ProjectsContext /> };
    if (pathname.startsWith("/memory")) return { title: "Memory", body: <MemoryContext /> };
    if (pathname.startsWith("/guardian")) return { title: "Guardian", body: <GuardianContext /> };
    if (pathname.startsWith("/automation"))
      return { title: "Automation", body: <AutomationContext /> };
    return { title: "Context", body: <HomeContext /> };
  })();

  return (
    <aside
      className="relative h-full shrink-0 overflow-hidden border-l border-border bg-sidebar/60 backdrop-blur-xl transition-[width] duration-500"
      style={{ width: collapsed ? 52 : 328, transitionTimingFunction: "var(--ease-calm)" }}
    >
      <button
        onClick={onToggle}
        aria-label="Toggle context panel"
        className="absolute right-3 top-4 z-10 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
      >
        <PanelRight className="h-4 w-4" />
      </button>

      <div
        className={cn(
          "h-full space-y-3 overflow-y-auto p-3 pt-4 transition-opacity duration-300",
          collapsed && "pointer-events-none opacity-0",
        )}
        style={{ width: 328 }}
      >
        <h2 className="px-1 pb-1 font-display text-sm font-semibold">{title}</h2>
        {body}
      </div>
    </aside>
  );
}

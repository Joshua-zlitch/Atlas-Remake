import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Pin,
  Archive,
  Star,
  LayoutGrid,
  List as ListIcon,
  MessageSquare,
  Brain,
  FileText,
  Workflow,
  ShieldCheck,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/atlas/PageHeader";
import { useProjects } from "@/components/atlas/project-store";
import { projectStatuses, type Project } from "@/data/prototype";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Atlas" },
      {
        name: "description",
        content:
          "Every conversation, memory, file and automation in Atlas belongs to a project. Organise your work locally.",
      },
      { property: "og:title", content: "Projects — Atlas" },
      {
        property: "og:description",
        content: "The primary organisational unit of Atlas: projects and their workspaces.",
      },
    ],
  }),
  component: Projects,
});

const statusTone: Record<string, string> = {
  Active: "text-success border-success/30 bg-success/10",
  Planning: "text-warning border-warning/30 bg-warning/10",
  Paused: "text-muted-foreground border-border bg-secondary/40",
  Archived: "text-muted-foreground border-border bg-secondary/30",
};

const guardianTone: Record<string, string> = {
  Healthy: "bg-success",
  Attention: "bg-warning",
  Offline: "bg-muted-foreground",
};

const sorts = ["Last opened", "Name", "Conversations"] as const;

function Stat({ icon: Icon, value }: { icon: React.ElementType; value: number }) {
  return (
    <span className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
      <Icon className="h-[13px] w-[13px]" />
      {value}
    </span>
  );
}

function Projects() {
  const { projects, active, setActiveId, createProject, togglePin, toggleArchive, toggleFavorite } =
    useProjects();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("All");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Last opened");
  const [view, setView] = useState<"card" | "list">("card");

  const filtered = useMemo(() => {
    const list = projects.filter(
      (p) =>
        (status === "All" ? !p.archived : p.status === status) &&
        (p.name + p.description).toLowerCase().includes(query.toLowerCase()),
    );
    const sorted = [...list].sort((a, b) => {
      if (sort === "Name") return a.name.localeCompare(b.name);
      if (sort === "Conversations") return b.counts.conversations - a.counts.conversations;
      return 0;
    });
    return [...sorted].sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [projects, query, status, sort]);

  const open = (p: Project) => {
    setActiveId(p.id);
    toast(`${p.name} is active`, { description: "Workspace context switched." });
  };

  return (
    <div className="px-10 py-8">
      <PageHeader
        title="Projects"
        description="The primary unit of work in Atlas. Conversations, memories, files and automations all live inside a project."
        action={
          <button
            onClick={() => {
              createProject(`Project ${projects.length + 1}`);
              toast("Project created", { description: "Now the active workspace." });
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
          >
            <Plus className="h-4 w-4" /> Create project
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="atlas-panel flex w-72 items-center gap-2.5 px-3.5 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {projectStatuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12px] transition-all duration-300",
                status === s
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSort(sorts[(sorts.indexOf(sort) + 1) % sorts.length])}
          className="ml-auto flex items-center gap-2 rounded-xl border border-border px-3 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
        >
          <ArrowUpDown className="h-3.5 w-3.5" /> {sort}
        </button>

        <div className="flex items-center gap-1 rounded-xl border border-border p-1">
          {([
            ["card", LayoutGrid],
            ["list", ListIcon],
          ] as const).map(([v, Icon]) => (
            <button
              key={v}
              onClick={() => setView(v)}
              aria-label={`${v} view`}
              className={cn(
                "rounded-lg p-1.5 transition-colors",
                view === v
                  ? "bg-secondary/80 text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      {view === "card" ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              onClick={() => open(p)}
              className={cn(
                "atlas-panel atlas-lift cursor-pointer p-5 animate-rise",
                p.id === active.id && "border-primary/45",
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="mb-3 flex items-start gap-3">
                <span
                  className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ background: p.color, boxShadow: `0 0 10px ${p.color}` }}
                />
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[15px] font-semibold leading-snug">{p.name}</h3>
                  <p className="mt-1 text-[11.5px] text-muted-foreground">
                    Last opened {p.lastOpened}
                  </p>
                </div>
                {p.pinned && <Pin className="h-4 w-4 shrink-0 text-primary" />}
              </div>

              <p className="text-[13px] leading-relaxed text-muted-foreground">{p.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Stat icon={MessageSquare} value={p.counts.conversations} />
                <Stat icon={Brain} value={p.counts.memories} />
                <Stat icon={FileText} value={p.counts.files} />
                <Stat icon={Workflow} value={p.counts.automations} />
              </div>

              <div className="mt-5 flex items-center gap-2 text-[11px]">
                <span className={cn("rounded-full border px-2.5 py-1", statusTone[p.status])}>
                  {p.status}
                </span>
                <span className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                  <span className={cn("h-1.5 w-1.5 rounded-full", guardianTone[p.guardian])} />
                  {p.guardian}
                </span>
                <div className="ml-auto flex items-center gap-1">
                  {[
                    { icon: Star, on: p.favorite, fn: () => toggleFavorite(p.id), label: "Favorite" },
                    { icon: Pin, on: p.pinned, fn: () => togglePin(p.id), label: "Pin" },
                    { icon: Archive, on: p.archived, fn: () => toggleArchive(p.id), label: "Archive" },
                  ].map(({ icon: Icon, on, fn, label }) => (
                    <button
                      key={label}
                      aria-label={label}
                      onClick={(e) => {
                        e.stopPropagation();
                        fn();
                      }}
                      className={cn(
                        "rounded-lg p-1.5 transition-colors hover:bg-secondary",
                        on ? "text-primary" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-[14px] w-[14px]" />
                    </button>
                  ))}
                </div>
              </div>
            </article>
          ))}
          {filtered.length === 0 && (
            <p className="text-[14px] text-muted-foreground">No projects match that search.</p>
          )}
        </div>
      ) : (
        <div className="atlas-panel overflow-hidden animate-rise">
          <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border px-5 py-2.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <span>Project</span>
            <span>Contents</span>
            <span>Guardian</span>
            <span>Last opened</span>
          </div>
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => open(p)}
              className={cn(
                "grid w-full grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-border/60 px-5 py-3 text-left transition-colors last:border-0 hover:bg-secondary/40",
                p.id === active.id && "bg-secondary/30",
              )}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
                <span className="truncate text-[13.5px]">{p.name}</span>
                {p.pinned && <Pin className="h-3.5 w-3.5 shrink-0 text-primary" />}
                <span className={cn("rounded-full border px-2 py-0.5 text-[10.5px]", statusTone[p.status])}>
                  {p.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Stat icon={MessageSquare} value={p.counts.conversations} />
                <Stat icon={Brain} value={p.counts.memories} />
                <Stat icon={FileText} value={p.counts.files} />
              </div>
              <span className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
                <ShieldCheck className="h-[13px] w-[13px]" />
                {p.guardian}
              </span>
              <span className="text-[11.5px] text-muted-foreground">{p.lastOpened}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-5 py-4 text-[13px] text-muted-foreground">No projects match.</p>
          )}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 xl:grid-cols-2">
        {[
          { title: "Recent projects", list: [...projects].filter((p) => !p.archived).slice(0, 4) },
          { title: "Favorite projects", list: projects.filter((p) => p.favorite) },
        ].map((group) => (
          <section key={group.title} className="atlas-panel p-5">
            <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.list.map((p) => (
                <li key={p.id}>
                  <button
                    onClick={() => open(p)}
                    className="flex w-full items-center gap-2.5 rounded-xl border border-border/70 bg-surface-2/40 px-3 py-2 text-left text-[13px] transition-colors hover:border-primary/40"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                    <span className="truncate">{p.name}</span>
                    <span className="ml-auto text-[11px] text-muted-foreground">{p.lastOpened}</span>
                  </button>
                </li>
              ))}
              {group.list.length === 0 && (
                <li className="text-[12.5px] text-muted-foreground">Nothing here yet.</li>
              )}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

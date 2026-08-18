import { useEffect, useRef, useState } from "react";
import { Search, Minus, Square, X, Bell, ChevronDown, Plus, Check } from "lucide-react";
import { searchSuggestions } from "@/data/prototype";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useProjects } from "./project-store";

function ProjectSwitcher() {
  const { projects, active, setActiveId, createProject } = useProjects();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  return (
    <div ref={wrap} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex max-w-[220px] items-center gap-2 rounded-xl border border-border bg-surface/70 px-3 py-1.5 text-[12.5px] transition-colors hover:border-primary/40",
          open && "border-primary/50",
        )}
      >
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: active.color, boxShadow: `0 0 8px ${active.color}` }}
        />
        <span className="truncate">{active.name}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      </button>

      {open && (
        <div className="atlas-panel absolute left-0 top-11 z-50 w-64 overflow-hidden p-1.5 animate-rise">
          <p className="px-3 py-1.5 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Workspace
          </p>
          {projects
            .filter((p) => !p.archived)
            .map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveId(p.id);
                  setOpen(false);
                  toast(`Switched to ${p.name}`, {
                    description: "Memory, automations and context updated.",
                  });
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: p.color }}
                />
                <span className="truncate">{p.name}</span>
                {p.id === active.id && <Check className="ml-auto h-3.5 w-3.5 text-primary" />}
              </button>
            ))}
          <div className="my-1 h-px bg-border" />
          <button
            onClick={() => {
              createProject(`Project ${projects.length + 1}`);
              setOpen(false);
              toast("Project created", { description: "Now the active workspace." });
            }}
            className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" /> Create project
          </button>
        </div>
      )}
    </div>
  );
}

export function TitleBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const results = searchSuggestions.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <header className="flex h-12 shrink-0 items-center gap-4 border-b border-border bg-background/70 px-3 backdrop-blur-xl">
      <div className="flex shrink-0 items-center gap-3">
        <span className="text-[12px] tracking-[0.18em] text-muted-foreground">ATLAS</span>
        <ProjectSwitcher />
      </div>

      <div ref={wrap} className="relative mx-auto w-full max-w-[520px]">
        <div
          className={cn(
            "flex items-center gap-2.5 rounded-xl border border-border bg-surface/70 px-3.5 py-1.5 transition-all duration-300",
            open && "border-primary/50 shadow-[0_0_0_3px_var(--ring)]",
          )}
          style={{ transitionTimingFunction: "var(--ease-calm)" }}
        >
          <Search className="h-[15px] w-[15px] text-muted-foreground" />
          <input
            value={query}
            onFocus={() => setOpen(true)}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Atlas"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
          <kbd className="rounded-md border border-border whitespace-nowrap px-1.5 py-0.5 text-[10px] text-muted-foreground">
            Ctrl K
          </kbd>
        </div>

        {open && (
          <div className="atlas-panel absolute left-0 right-0 top-11 z-50 overflow-hidden p-1.5 animate-rise">
            {results.length === 0 && (
              <p className="px-3 py-3 text-[13px] text-muted-foreground">No suggestions</p>
            )}
            {results.map((s, i) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground animate-rise"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <Search className="h-[13px] w-[13px]" />
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex w-24 items-center justify-end gap-1">
        <button
          onClick={() => toast("Guardian running", { description: "Background scan started." })}
          aria-label="Notifications"
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Bell className="h-[15px] w-[15px]" />
        </button>
        {[Minus, Square, X].map((Icon, i) => (
          <button
            key={i}
            aria-label="Window control"
            className={cn(
              "rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
              i === 2 && "hover:bg-danger/20 hover:text-danger",
            )}
          >
            <Icon className="h-[13px] w-[13px]" />
          </button>
        ))}
      </div>
    </header>
  );
}

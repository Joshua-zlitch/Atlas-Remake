import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  FolderKanban,
  Brain,
  ShieldCheck,
  Workflow,
  Settings as SettingsIcon,
  Info,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Orb } from "./Orb";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/memory", label: "Memory", icon: Brain },
  { to: "/guardian", label: "Guardian", icon: ShieldCheck },
  { to: "/automation", label: "Automation", icon: Workflow },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
  { to: "/about", label: "About", icon: Info },
] as const;

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className="flex h-full shrink-0 flex-col border-r border-border bg-sidebar/80 backdrop-blur-xl transition-[width] duration-500"
      style={{ width: collapsed ? 76 : 248, transitionTimingFunction: "var(--ease-calm)" }}
    >
      <div className="flex items-center gap-3 px-4 py-5">
        <Orb size={34} state="idle" reflection={false} className="shrink-0" />
        {!collapsed && (
          <div className="min-w-0 flex-1 animate-rise">
            <p className="font-display text-[15px] font-semibold tracking-tight">Atlas</p>
            <p className="truncate text-[11px] text-muted-foreground">Desktop Companion</p>
          </div>
        )}
        <button
          onClick={onToggle}
          aria-label="Toggle sidebar"
          className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <PanelLeft className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3">
        {items.map(({ to, label, icon: Icon }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              title={label}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300",
                active
                  ? "bg-secondary/80 text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
              style={{ transitionTimingFunction: "var(--ease-calm)" }}
            >
              <span
                className={cn(
                  "absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-primary transition-all duration-300",
                  active ? "opacity-100" : "opacity-0",
                )}
              />
              <Icon className={cn("h-[18px] w-[18px] shrink-0", active && "text-primary")} />
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 flex items-center gap-3 rounded-xl border border-border bg-surface/60 p-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-medium text-primary">
          A
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-[13px] font-medium">Local User</p>
            <p className="truncate text-[11px] text-muted-foreground">Offline profile</p>
          </div>
        )}
      </div>
    </aside>
  );
}

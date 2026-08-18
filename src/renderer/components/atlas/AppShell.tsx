import { useEffect, useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { ContextPanel } from "./ContextPanel";
import { TitleBar } from "./TitleBar";
import { Splash } from "./Splash";
import { ProjectProvider } from "./project-store";
import { Toaster } from "@/components/ui/sonner";

export function AppShell({ children }: { children: ReactNode }) {
  const [booting, setBooting] = useState(true);
  const [hiding, setHiding] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contextCollapsed, setContextCollapsed] = useState(false);

  useEffect(() => {
    const a = setTimeout(() => setHiding(true), 2100);
    const b = setTimeout(() => setBooting(false), 2900);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  return (
    <ProjectProvider>
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 20% -10%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%), radial-gradient(700px 420px at 100% 110%, color-mix(in oklab, var(--accent-soft) 8%, transparent), transparent 70%)",
        }}
      />
      <div className="relative flex h-full flex-col">
        <TitleBar />
        <div className="flex min-h-0 flex-1">
          <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((v) => !v)} />
          <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
          <ContextPanel
            collapsed={contextCollapsed}
            onToggle={() => setContextCollapsed((v) => !v)}
          />
        </div>
      </div>
      <Toaster position="bottom-right" />
      {booting && <Splash hiding={hiding} />}
    </div>
    </ProjectProvider>
  );
}

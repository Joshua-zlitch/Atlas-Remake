import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/atlas/PageHeader";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fetchAppVersion } from "@/lib/atlas";
import { AppVersionInfo } from "@shared/types";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Atlas" },
      {
        name: "description",
        content: "Tune Atlas: appearance, memory, voice, AI behaviour, Guardian and privacy.",
      },
      { property: "og:title", content: "Settings — Atlas" },
      { property: "og:description", content: "Tune how Atlas looks, remembers and behaves." },
    ],
  }),
  component: Settings,
});

const categories = [
  "General",
  "Appearance",
  "Memory",
  "Voice",
  "AI",
  "Guardian",
  "Privacy",
  "Automation",
  "About",
] as const;

type Category = (typeof categories)[number];

function Row({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-8 border-b border-border/60 px-6 py-5 last:border-0">
      <div className="min-w-0">
        <p className="text-[14px] font-medium">{title}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

function Toggle({ defaultOn = true, label }: { defaultOn?: boolean; label: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <Switch
      checked={on}
      onCheckedChange={(v) => {
        setOn(v);
        toast(label, { description: v ? "Enabled" : "Disabled" });
      }}
    />
  );
}

function Dropdown({ options, initial }: { options: string[]; initial: string }) {
  return (
    <Select defaultValue={initial}>
      <SelectTrigger className="w-52 rounded-xl border-border bg-surface-2/60 text-[13px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-xl">
        {options.map((o) => (
          <SelectItem key={o} value={o} className="text-[13px]">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const content: Record<Category, { title: string; rows: React.ReactNode }> = {
  General: {
    title: "General",
    rows: (
      <>
        <Row title="Launch at startup" description="Open Atlas quietly when Windows starts." control={<Toggle label="Launch at startup" />} />
        <Row title="Start minimised" description="Begin in the tray instead of a full window." control={<Toggle defaultOn={false} label="Start minimised" />} />
        <Row title="Language" description="Interface language for all panels." control={<Dropdown options={["English", "Deutsch", "Français", "Español"]} initial="English" />} />
      </>
    ),
  },
  Appearance: {
    title: "Appearance",
    rows: (
      <>
        <Row title="Theme" description="Atlas is designed for low-light workspaces." control={<Dropdown options={["Midnight", "Deep Blue", "System"]} initial="Midnight" />} />
        <Row title="Orb intensity" description="How strongly the Orb glows while idle." control={<div className="w-52"><Slider defaultValue={[62]} /></div>} />
        <Row title="Reduced motion" description="Soften breathing and ring animations." control={<Toggle defaultOn={false} label="Reduced motion" />} />
      </>
    ),
  },
  Memory: {
    title: "Memory",
    rows: (
      <>
        <Row title="Automatic capture" description="Let Atlas save important details as you work." control={<Toggle label="Automatic capture" />} />
        <Row title="Retention" description="How long unpinned memories are kept." control={<Dropdown options={["30 days", "6 months", "1 year", "Forever"]} initial="1 year" />} />
        <Row title="Importance threshold" description="Minimum confidence before a memory is stored." control={<div className="w-52"><Slider defaultValue={[45]} /></div>} />
      </>
    ),
  },
  Voice: {
    title: "Voice",
    rows: (
      <>
        <Row title="Wake phrase" description="Say it to bring Atlas forward." control={<Dropdown options={["Hey Atlas", "Atlas", "Disabled"]} initial="Hey Atlas" />} />
        <Row title="Speaking voice" description="Tone used when Atlas replies aloud." control={<Dropdown options={["Calm", "Neutral", "Warm"]} initial="Calm" />} />
        <Row title="Speech rate" description="Pace of spoken responses." control={<div className="w-52"><Slider defaultValue={[50]} /></div>} />
      </>
    ),
  },
  AI: {
    title: "AI",
    rows: (
      <>
        <Row title="Local model" description="Runs entirely on this machine." control={<Dropdown options={["Atlas Core 8B", "Atlas Core 3B", "Atlas Mini"]} initial="Atlas Core 8B" />} />
        <Row title="Response length" description="How much detail Atlas offers by default." control={<Dropdown options={["Concise", "Balanced", "Detailed"]} initial="Balanced" />} />
        <Row title="Creativity" description="Lower values keep answers grounded." control={<div className="w-52"><Slider defaultValue={[32]} /></div>} />
      </>
    ),
  },
  Guardian: {
    title: "Guardian",
    rows: (
      <>
        <Row title="Background monitoring" description="Track CPU, memory, storage and security." control={<Toggle label="Background monitoring" />} />
        <Row title="Scan frequency" description="How often Guardian inspects the system." control={<Dropdown options={["Every 15 min", "Hourly", "Daily"]} initial="Hourly" />} />
        <Row title="Alert threshold" description="Warn when usage passes this level." control={<div className="w-52"><Slider defaultValue={[80]} /></div>} />
      </>
    ),
  },
  Privacy: {
    title: "Privacy",
    rows: (
      <>
        <Row title="Offline mode" description="Block every outbound connection." control={<Toggle label="Offline mode" />} />
        <Row title="Encrypt local database" description="Memories are sealed at rest." control={<Toggle label="Encryption" />} />
        <Row title="Anonymous diagnostics" description="Never enabled without your consent." control={<Toggle defaultOn={false} label="Diagnostics" />} />
      </>
    ),
  },
  Automation: {
    title: "Automation",
    rows: (
      <>
        <Row title="Run workflows on battery" description="Allow routines while unplugged." control={<Toggle defaultOn={false} label="Run on battery" />} />
        <Row title="Concurrency" description="Maximum workflows running at once." control={<Dropdown options={["1", "2", "4"]} initial="2" />} />
        <Row title="Notify on completion" description="Show a toast when a routine finishes." control={<Toggle label="Completion notices" />} />
      </>
    ),
  },
  About: {
    title: "About",
    rows: (
      <>
        <Row title="Version" description="Atlas Prototype v0.1 · local build" control={<span className="text-[13px] text-muted-foreground">0.1.0</span>} />
        <Row title="Snapshot" description="Create an encrypted archive of your workspace." control={<button onClick={() => toast("Snapshot created", { description: "atlas-2026-07-28.snap" })} className="rounded-xl border border-border px-4 py-2 text-[13px] transition-colors hover:border-primary/40">Create</button>} />
      </>
    ),
  },
};

function Settings() {
  const [active, setActive] = useState<Category>("General");
  const [versionInfo, setVersionInfo] = useState<AppVersionInfo | null>(null);

  useEffect(() => {
    fetchAppVersion().then(setVersionInfo);
  }, []);

  const dynamicContent = {
    ...content,
    About: {
      title: "About",
      rows: (
        <>
          <Row
            title="Version"
            description={`ATLAS Desktop v${versionInfo?.version || "0.1.0"} · Electron ${versionInfo?.electronVersion || "34.2.0"} (${versionInfo?.platform || "win32"})`}
            control={<span className="text-[13px] text-muted-foreground">{versionInfo?.version || "0.1.0"}</span>}
          />
          <Row
            title="Runtime System"
            description={`Node ${versionInfo?.nodeVersion || "22.0.0"} · Chrome ${versionInfo?.chromeVersion || "132.0.0.0"}`}
            control={<span className="text-[13px] text-muted-foreground font-mono">electron-main</span>}
          />
          <Row
            title="Snapshot"
            description="Create an encrypted archive of your workspace."
            control={
              <button
                onClick={() => toast("Snapshot created", { description: "atlas-2026-08-18.snap" })}
                className="rounded-xl border border-border px-4 py-2 text-[13px] transition-colors hover:border-primary/40"
              >
                Create
              </button>
            }
          />
        </>
      ),
    },
  };

  return (
    <div className="px-10 py-8">
      <PageHeader
        title="Settings"
        description="Atlas stays out of the way until you need it. Everything here is stored on this device."
      />

      <div className="flex gap-6">
        <nav className="flex w-52 shrink-0 flex-col gap-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-xl px-4 py-2.5 text-left text-[13px] transition-all duration-300",
                active === c
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </nav>

        <section key={active} className="atlas-panel min-w-0 flex-1 animate-rise">
          <h2 className="border-b border-border/60 px-6 py-4 font-display text-[16px] font-semibold">
            {dynamicContent[active].title}
          </h2>
          {dynamicContent[active].rows}
        </section>
      </div>
    </div>
  );
}

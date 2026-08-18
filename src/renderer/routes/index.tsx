import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Mic,
  Paperclip,
  ArrowUp,
  Play,
  Pin,
  MessageSquare,
  ShieldCheck,
  Workflow,
  Brain,
  Zap,
  FolderKanban,
} from "lucide-react";
import { toast } from "sonner";
import { Orb, type OrbState } from "@/components/atlas/Orb";
import { useProjects } from "@/components/atlas/project-store";
import {
  memories,
  quickActions,
  recentConversations,
  upcomingEvents,
  workflows,
} from "@/data/prototype";
import { cn } from "@/lib/utils";
import { invokeCapability } from "@/lib/atlas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atlas — Your Intelligent Desktop Companion" },
      {
        name: "description",
        content:
          "A calm, offline-first AI companion for your desktop. Think, organize, automate and remember — privately.",
      },
      { property: "og:title", content: "Atlas — Your Intelligent Desktop Companion" },
      {
        property: "og:description",
        content: "A calm, offline-first AI companion for your desktop.",
      },
    ],
  }),
  component: Home,
});

interface Message {
  id: number;
  role: "user" | "atlas";
  text: string;
}

function DashCard({
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
        <h2 className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

function Home() {
  const { projects, active, setActiveId } = useProjects();
  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [orbState, setOrbState] = useState<OrbState>("idle");
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async () => {
    const text = value.trim();
    if (!text) return;
    const id = Date.now();
    setMessages((m) => [...m, { id, role: "user", text }]);
    setValue("");
    setOrbState("thinking");
    setTyping(true);

    const res = await invokeCapability("ai:chat", { prompt: text });

    setTyping(false);
    if (res.success && res.data) {
      setOrbState("speaking");
      setMessages((m) => [...m, { id: id + 1, role: "atlas", text: String(res.data) }]);
      setTimeout(() => setOrbState("idle"), 2600);
    } else {
      setOrbState("idle");
      const errDetail = res.error?.message || "AI-01 LLM Runtime is scheduled for implementation in Phase 3.";
      setMessages((m) => [
        ...m,
        {
          id: id + 1,
          role: "atlas",
          text: `[Capability Unavailable] ${errDetail}`,
        },
      ]);
    }
  };

  const handleAttachment = async () => {
    const res = await invokeCapability("filesystem:attach");
    toast("Attachment", {
      description: res.error?.message || "AT-13 Files & Attachments scheduled for Phase 4.",
    });
  };

  const handleVoice = async () => {
    setOrbState("listening");
    const res = await invokeCapability("voice:listen");
    toast("Voice Input", {
      description: res.error?.message || "AT-14 Voice scheduled for Phase 4.",
    });
    setTimeout(() => setOrbState("idle"), 1500);
  };

  const empty = messages.length === 0;

  return (
    <div className="flex h-full flex-col items-center px-10 py-8">
      <div
        ref={scroller}
        className={cn(
          "flex w-full max-w-3xl flex-1 flex-col overflow-y-auto",
          "justify-start",
          empty ? "pt-2" : "gap-5 pb-6",
        )}
      >
        {empty ? (
          <>
            <div className="flex flex-col items-center pt-2 text-center animate-rise">
              <Orb size={200} state={orbState} />
              <h1 className="mt-5 font-display text-[36px] font-light leading-tight">
                Hello. I'm <span className="font-semibold">Atlas</span>.
              </h1>
              <p className="mt-2.5 text-[15px] text-muted-foreground">
                Working in <span className="text-foreground">{active.name}</span>. What should we do
                next?
              </p>
            </div>

            <div className="mt-8 space-y-4 pb-4">
              <DashCard icon={Play} title="Continue Working">
                <button
                  onClick={() =>
                    toast("Resuming", { description: `${recentConversations[0].title}` })
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-border/70 bg-surface-2/40 px-3.5 py-3 text-left transition-colors hover:border-primary/40"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: active.color, boxShadow: `0 0 10px ${active.color}` }}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px]">
                      {recentConversations[0].title}
                    </span>
                    <span className="block truncate text-[12px] text-muted-foreground">
                      {recentConversations[0].snippet}
                    </span>
                  </span>
                  <span className="ml-auto shrink-0 text-[11px] text-muted-foreground">
                    {recentConversations[0].time}
                  </span>
                </button>
              </DashCard>

              <DashCard icon={Zap} title="Quick Actions">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((q) => (
                    <button
                      key={q.id}
                      onClick={() => toast(q.label, { description: "Prototype only." })}
                      className="flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-[12px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                    >
                      {q.label}
                      <kbd className="rounded-md border border-border px-1.5 py-0.5 text-[10px]">
                        {q.hint}
                      </kbd>
                    </button>
                  ))}
                </div>
              </DashCard>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <DashCard icon={FolderKanban} title="Recent Projects">
                  <ul className="space-y-2">
                    {projects
                      .filter((p) => !p.archived)
                      .slice(0, 4)
                      .map((p) => (
                        <li key={p.id}>
                          <button
                            onClick={() => {
                              setActiveId(p.id);
                              toast(`${p.name} is active`);
                            }}
                            className="flex w-full items-center gap-2.5 rounded-xl border border-border/70 bg-surface-2/40 px-3 py-2 text-left text-[13px] transition-colors hover:border-primary/40"
                          >
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: p.color }}
                            />
                            <span className="truncate">{p.name}</span>
                            <span className="ml-auto text-[11px] text-muted-foreground">
                              {p.lastOpened}
                            </span>
                          </button>
                        </li>
                      ))}
                  </ul>
                </DashCard>

                <DashCard icon={Pin} title="Pinned Projects">
                  <ul className="space-y-2">
                    {projects
                      .filter((p) => p.pinned)
                      .map((p) => (
                        <li
                          key={p.id}
                          className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-surface-2/40 px-3 py-2 text-[13px]"
                        >
                          <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                          <span className="truncate">{p.name}</span>
                          <span className="ml-auto text-[11px] text-muted-foreground">
                            {p.counts.conversations} chats
                          </span>
                        </li>
                      ))}
                  </ul>
                </DashCard>

                <DashCard icon={MessageSquare} title="Recent Conversations">
                  <ul className="space-y-2 text-[13px]">
                    {recentConversations.map((c) => (
                      <li key={c.id} className="flex items-center justify-between gap-3">
                        <span className="truncate">{c.title}</span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">{c.time}</span>
                      </li>
                    ))}
                  </ul>
                </DashCard>

                <DashCard icon={Brain} title="Memory Highlights">
                  <ul className="space-y-2 text-[13px]">
                    {memories.slice(0, 4).map((m) => (
                      <li key={m.id} className="flex items-center justify-between gap-3">
                        <span className="truncate">{m.title}</span>
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {m.category}
                        </span>
                      </li>
                    ))}
                  </ul>
                </DashCard>

                <DashCard icon={ShieldCheck} title="Guardian Status">
                  <div className="flex items-center gap-2 text-[13px]">
                    <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_10px_var(--success)]" />
                    All systems healthy
                  </div>
                  <p className="mt-2 text-[12px] text-muted-foreground">
                    Last scan 26 minutes ago · storage at 67%
                  </p>
                </DashCard>

                <DashCard icon={Workflow} title="Upcoming Automations">
                  <ul className="space-y-2 text-[13px]">
                    {workflows
                      .filter((w) => w.enabled)
                      .map((w) => (
                        <li key={w.id} className="flex items-center justify-between gap-3">
                          <span className="truncate">{w.name}</span>
                          <span className="shrink-0 text-[11px] text-muted-foreground">
                            {w.schedule}
                          </span>
                        </li>
                      ))}
                  </ul>
                </DashCard>
              </div>

              <DashCard icon={Zap} title="Today's Summary">
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Three memories captured, one automation completed and no Guardian alerts.{" "}
                  {upcomingEvents[0].label} is next — {upcomingEvents[0].time}.
                </p>
              </DashCard>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center py-6">
              <Orb size={110} state={orbState} />
            </div>
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn("flex animate-rise", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[78%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed",
                    m.role === "user"
                      ? "bg-primary/20 text-foreground"
                      : "atlas-panel text-muted-foreground",
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start animate-rise">
                <div className="atlas-panel flex items-center gap-1.5 px-4 py-3.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-primary"
                      style={{ animation: `atlas-glow 1.2s ease-in-out ${i * 0.18}s infinite` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full max-w-3xl pt-4">
        <div
          className="atlas-panel flex items-end gap-2 p-2.5 transition-all duration-300 focus-within:border-primary/45"
          style={{ transitionTimingFunction: "var(--ease-calm)" }}
        >
          <button
            aria-label="Attach file"
            onClick={handleAttachment}
            className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Paperclip className="h-[17px] w-[17px]" />
          </button>
          <textarea
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => orbState === "idle" && setOrbState("listening")}
            onBlur={() => orbState === "listening" && setOrbState("idle")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ask Atlas anything..."
            className="max-h-40 flex-1 resize-none bg-transparent px-1 py-2.5 text-[14px] outline-none placeholder:text-muted-foreground"
          />
          <button
            aria-label="Voice input"
            onClick={handleVoice}
            className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Mic className="h-[17px] w-[17px]" />
          </button>
          <button
            aria-label="Send"
            onClick={send}
            className="rounded-xl bg-primary p-2.5 text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
          >
            <ArrowUp className="h-[17px] w-[17px]" />
          </button>
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Atlas runs locally. Nothing leaves your device.
        </p>
      </div>
    </div>
  );
}

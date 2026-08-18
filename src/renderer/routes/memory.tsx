import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Pin, Plus } from "lucide-react";
import { toast } from "sonner";
import { memories, memoryCategories } from "@/data/prototype";
import { PageHeader } from "@/components/atlas/PageHeader";
import { cn } from "@/lib/utils";
import { invokeCapability } from "@/lib/atlas";

export const Route = createFileRoute("/memory")({
  head: () => ({
    meta: [
      { title: "Memory — Atlas" },
      {
        name: "description",
        content: "Everything Atlas remembers for you, stored locally and searchable in seconds.",
      },
      { property: "og:title", content: "Memory — Atlas" },
      { property: "og:description", content: "Everything Atlas remembers, stored locally." },
    ],
  }),
  component: Memory,
});

const importanceTone: Record<string, string> = {
  High: "text-danger border-danger/30 bg-danger/10",
  Medium: "text-warning border-warning/30 bg-warning/10",
  Low: "text-success border-success/30 bg-success/10",
};

import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { MemoryRecord } from "@shared/types";

function Memory() {
  const [items, setItems] = useState<MemoryRecord[]>(memories as unknown as MemoryRecord[]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const loadMemories = () => {
    invokeCapability<undefined, MemoryRecord[]>("memory:list").then((res) => {
      if (res.success && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setItems(res.data);
      }
    });
  };

  useEffect(() => {
    loadMemories();
  }, []);

  const handleNewMemory = async () => {
    const title = window.prompt("Enter Memory Title:", "User Note");
    if (!title) return;
    const body = window.prompt("Enter Memory Content:", "Remembered note for Atlas.");
    if (!body) return;

    const res = await invokeCapability<{ title: string; body: string; category: string; importance: string }, MemoryRecord>("memory:add", {
      title,
      body,
      category: category === "All" ? "Projects" : category,
      importance: "Medium",
    });

    if (res.success && res.data) {
      toast("Memory Saved", { description: `Added memory '${res.data.title}'` });
      loadMemories();
    } else {
      toast("Error", { description: res.error?.message || "Failed to add memory" });
    }
  };

  const handleDeleteMemory = async (id: string, title: string) => {
    const res = await invokeCapability<{ id: string }, { deleted: boolean }>("memory:delete", { id });
    if (res.success) {
      toast("Memory Deleted", { description: `Removed '${title}'` });
      loadMemories();
    } else {
      toast("Error", { description: res.error?.message || "Failed to delete memory" });
    }
  };

  const filtered = useMemo(
    () =>
      items.filter(
        (m) =>
          (category === "All" || m.category === category) &&
          (m.title + m.body).toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query, category],
  );

  return (
    <div className="px-10 py-8">
      <PageHeader
        title="Memory"
        description="Everything Atlas remembers for you. Stored locally, organised by importance and always yours to edit."
        action={
          <button
            onClick={handleNewMemory}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-medium text-primary-foreground transition-all duration-300 hover:brightness-110 hover:shadow-[var(--shadow-glow)]"
          >
            <Plus className="h-4 w-4" /> New memory
          </button>
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="atlas-panel flex w-80 items-center gap-2.5 px-3.5 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search memories"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {memoryCategories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12px] transition-all duration-300",
                category === c
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        {filtered.map((m, i) => (
          <article
            key={m.id}
            className="atlas-panel atlas-lift p-5 animate-rise"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h3 className="text-[15px] font-semibold leading-snug">{m.title}</h3>
              <div className="flex items-center gap-2">
                {m.pinned && <Pin className="h-4 w-4 shrink-0 text-primary" />}
                <button
                  onClick={() => handleDeleteMemory(m.id, m.title)}
                  className="text-muted-foreground hover:text-danger transition-colors p-1"
                  title="Delete Memory"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{m.body}</p>
            <div className="mt-5 flex items-center gap-2 text-[11px]">
              <span className={cn("rounded-full border px-2.5 py-1", importanceTone[m.importance])}>
                {m.importance}
              </span>
              <span className="rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                {m.category}
              </span>
              <span className="ml-auto text-muted-foreground">{m.date}</span>
            </div>
          </article>
        ))}
        {filtered.length === 0 && (
          <p className="text-[14px] text-muted-foreground">No memories match that search.</p>
        )}
      </div>
    </div>
  );
}

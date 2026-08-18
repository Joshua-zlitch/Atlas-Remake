export const memories = [
  { id: "m1", title: "Project Atlas architecture locked", body: "Three-panel shell, offline-first core, Orb as the single identity element.", importance: "High", category: "Projects", date: "Jul 24, 2026", pinned: true },
  { id: "m2", title: "User prefers offline software", body: "Avoid cloud dependencies. Always surface local-only processing in the UI.", importance: "High", category: "Preferences", date: "Jul 19, 2026", pinned: true },
  { id: "m3", title: "Remember meeting tomorrow", body: "Design review with the hardware team, 10:30. Bring the Orb state matrix.", importance: "Medium", category: "Reminders", date: "Jul 27, 2026", pinned: false },
  { id: "m4", title: "Weekly backup window", body: "Snapshots run Sunday 02:00. Keep the last four archives on local disk.", importance: "Low", category: "System", date: "Jul 12, 2026", pinned: false },
  { id: "m5", title: "Writing tone", body: "Calm, concise, never salesy. Short sentences. No exclamation marks.", importance: "Medium", category: "Preferences", date: "Jul 08, 2026", pinned: false },
  { id: "m6", title: "Focus hours", body: "Deep work 09:00 – 12:00. Suppress non-critical notifications in this window.", importance: "Medium", category: "Routines", date: "Jun 30, 2026", pinned: false },
] as const;

export const memoryCategories = ["All", "Projects", "Preferences", "Reminders", "Routines", "System"];

export const guardianMetrics = [
  { id: "cpu", label: "CPU", value: 18, unit: "%", detail: "8 cores · 2.4 GHz average", tone: "success" as const },
  { id: "memory", label: "Memory", value: 42, unit: "%", detail: "6.8 GB of 16 GB in use", tone: "success" as const },
  { id: "storage", label: "Storage", value: 67, unit: "%", detail: "312 GB of 465 GB used", tone: "warning" as const },
  { id: "security", label: "Security", value: 100, unit: "%", detail: "Local encryption active", tone: "success" as const },
  { id: "database", label: "Database", value: 24, unit: "%", detail: "1,284 memories · 84 MB", tone: "success" as const },
];

export const guardianSeries = [
  { t: "12:00", cpu: 14, mem: 38 },
  { t: "13:00", cpu: 22, mem: 41 },
  { t: "14:00", cpu: 19, mem: 40 },
  { t: "15:00", cpu: 31, mem: 45 },
  { t: "16:00", cpu: 26, mem: 44 },
  { t: "17:00", cpu: 17, mem: 42 },
  { t: "18:00", cpu: 18, mem: 42 },
];

export const workflows = [
  { id: "w1", name: "Morning Routine", description: "Summarises overnight activity and prepares the day's focus list.", schedule: "Weekdays · 08:00", lastRun: "Today, 08:00", duration: "1.4s", enabled: true },
  { id: "w2", name: "Daily Summary", description: "Collects notes, decisions and open threads into one evening digest.", schedule: "Daily · 19:30", lastRun: "Yesterday, 19:30", duration: "2.1s", enabled: true },
  { id: "w3", name: "Weekly Backup", description: "Creates an encrypted local snapshot of memories and settings.", schedule: "Sundays · 02:00", lastRun: "Jul 26, 02:00", duration: "38s", enabled: true },
  { id: "w4", name: "Focus Mode", description: "Silences notifications and pauses background indexing during deep work.", schedule: "Manual", lastRun: "Jul 27, 09:00", duration: "0.2s", enabled: false },
];

export const recentActivity = [
  { id: "a1", label: "Memory saved", detail: "Project Atlas architecture", time: "4m ago" },
  { id: "a2", label: "Guardian scan", detail: "No issues found", time: "26m ago" },
  { id: "a3", label: "Automation ran", detail: "Morning Routine", time: "Today, 08:00" },
  { id: "a4", label: "Snapshot created", detail: "atlas-2026-07-26.snap", time: "Sun, 02:00" },
];

export const upcomingEvents = [
  { id: "e1", label: "Design review", time: "Tomorrow · 10:30" },
  { id: "e2", label: "Hardware sync", time: "Thu · 15:00" },
  { id: "e3", label: "Weekly backup", time: "Sun · 02:00" },
];

export const searchSuggestions = [
  "Open Guardian health report",
  "Pinned memories about Atlas",
  "Run Morning Routine",
  "Storage usage this week",
  "Appearance settings",
];

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  status: "Active" | "Planning" | "Paused" | "Archived";
  lastOpened: string;
  pinned: boolean;
  favorite: boolean;
  archived: boolean;
  guardian: "Healthy" | "Attention" | "Offline";
  counts: { conversations: number; memories: number; files: number; automations: number };
}

export const projects: Project[] = [
  {
    id: "p1",
    name: "Project Atlas",
    description: "The desktop companion itself — shell, Orb identity and offline core.",
    color: "var(--orb-speaking)",
    status: "Active",
    lastOpened: "2 minutes ago",
    pinned: true,
    favorite: true,
    archived: false,
    guardian: "Healthy",
    counts: { conversations: 24, memories: 138, files: 62, automations: 4 },
  },
  {
    id: "p2",
    name: "Game Development",
    description: "Engine notes, shader experiments and the level design backlog.",
    color: "var(--orb-thinking)",
    status: "Active",
    lastOpened: "Today, 09:12",
    pinned: true,
    favorite: false,
    archived: false,
    guardian: "Attention",
    counts: { conversations: 17, memories: 96, files: 214, automations: 2 },
  },
  {
    id: "p3",
    name: "Research",
    description: "Long-form reading, citations and weekly synthesis digests.",
    color: "var(--orb-listening)",
    status: "Active",
    lastOpened: "Yesterday, 18:40",
    pinned: false,
    favorite: true,
    archived: false,
    guardian: "Healthy",
    counts: { conversations: 41, memories: 302, files: 88, automations: 3 },
  },
  {
    id: "p4",
    name: "College",
    description: "Coursework, deadlines and lecture transcripts indexed locally.",
    color: "var(--orb-processing)",
    status: "Planning",
    lastOpened: "Jul 28, 14:05",
    pinned: false,
    favorite: false,
    archived: false,
    guardian: "Healthy",
    counts: { conversations: 12, memories: 74, files: 130, automations: 1 },
  },
  {
    id: "p5",
    name: "Personal",
    description: "Routines, journals and the quiet things that keep the week steady.",
    color: "var(--orb-idle)",
    status: "Paused",
    lastOpened: "Jul 24, 21:30",
    pinned: false,
    favorite: false,
    archived: false,
    guardian: "Healthy",
    counts: { conversations: 9, memories: 51, files: 20, automations: 2 },
  },
  {
    id: "p6",
    name: "Hardware Prototype",
    description: "Retired enclosure study for the Atlas desk unit.",
    color: "var(--orb-thinking)",
    status: "Archived",
    lastOpened: "Jun 11, 10:00",
    pinned: false,
    favorite: false,
    archived: true,
    guardian: "Offline",
    counts: { conversations: 6, memories: 22, files: 44, automations: 0 },
  },
];

export const projectStatuses = ["All", "Active", "Planning", "Paused", "Archived"] as const;

export const recentConversations = [
  { id: "c1", projectId: "p1", title: "Orb state matrix review", snippet: "Idle should stay ringless.", time: "4m ago", messages: 18 },
  { id: "c2", projectId: "p2", title: "Shader banding fix", snippet: "Dither in linear space instead.", time: "Today, 09:20", messages: 11 },
  { id: "c3", projectId: "p3", title: "Weekly synthesis", snippet: "Three themes across nine papers.", time: "Yesterday", messages: 27 },
  { id: "c4", projectId: "p4", title: "Deadline sweep", snippet: "Two submissions land Friday.", time: "Jul 28", messages: 7 },
];

export const projectFiles = [
  { id: "f1", projectId: "p1", name: "orb-states.md", size: "14 KB", time: "4m ago" },
  { id: "f2", projectId: "p1", name: "shell-layout.fig", size: "8.2 MB", time: "Today" },
  { id: "f3", projectId: "p2", name: "level-01.blend", size: "142 MB", time: "Today" },
  { id: "f4", projectId: "p3", name: "citations.bib", size: "62 KB", time: "Yesterday" },
];

export const quickActions = [
  { id: "q1", label: "New conversation", hint: "Ctrl N" },
  { id: "q2", label: "Capture memory", hint: "Ctrl M" },
  { id: "q3", label: "Run Guardian scan", hint: "Ctrl G" },
  { id: "q4", label: "Create project", hint: "Ctrl P" },
];

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { projects as seedProjects, type Project } from "@/data/prototype";

interface ProjectStore {
  projects: Project[];
  active: Project;
  setActiveId: (id: string) => void;
  createProject: (name: string) => void;
  togglePin: (id: string) => void;
  toggleArchive: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

const ProjectContext = createContext<ProjectStore | null>(null);

const palette = [
  "var(--orb-speaking)",
  "var(--orb-thinking)",
  "var(--orb-listening)",
  "var(--orb-processing)",
  "var(--orb-idle)",
];

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(seedProjects);
  const [activeId, setActiveId] = useState(seedProjects[0].id);

  const active = useMemo(
    () => projects.find((p) => p.id === activeId) ?? projects[0],
    [projects, activeId],
  );

  const createProject = useCallback((name: string) => {
    const id = `p${Date.now()}`;
    setProjects((list) => [
      {
        id,
        name,
        description: "New project. Conversations, memories and files will collect here.",
        color: palette[list.length % palette.length],
        status: "Planning",
        lastOpened: "Just now",
        pinned: false,
        favorite: false,
        archived: false,
        guardian: "Healthy",
        counts: { conversations: 0, memories: 0, files: 0, automations: 0 },
      },
      ...list,
    ]);
    setActiveId(id);
  }, []);

  const patch = (id: string, fn: (p: Project) => Project) =>
    setProjects((list) => list.map((p) => (p.id === id ? fn(p) : p)));

  const store: ProjectStore = {
    projects,
    active,
    setActiveId,
    createProject,
    togglePin: (id) => patch(id, (p) => ({ ...p, pinned: !p.pinned })),
    toggleFavorite: (id) => patch(id, (p) => ({ ...p, favorite: !p.favorite })),
    toggleArchive: (id) =>
      patch(id, (p) => ({
        ...p,
        archived: !p.archived,
        status: p.archived ? "Active" : "Archived",
      })),
  };

  return <ProjectContext.Provider value={store}>{children}</ProjectContext.Provider>;
}

export function useProjects() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjects must be used inside ProjectProvider");
  return ctx;
}

import { AutomationItem } from '../../shared/types.js';

export class AT11AutomationEngine {
  private workflows: Map<string, AutomationItem> = new Map();

  constructor() {
    const seed: AutomationItem[] = [
      {
        id: 'w1',
        name: 'Morning Digest',
        description: 'Summarises memory items, reminders and system health.',
        schedule: 'Every weekday · 08:00',
        enabled: true,
        lastRun: 'Today · 08:00',
      },
      {
        id: 'w2',
        name: 'Workspace Backup',
        description: 'Creates a local encrypted snapshot of workspace files.',
        schedule: 'Daily · 23:00',
        enabled: true,
        lastRun: 'Yesterday · 23:00',
      },
    ];
    seed.forEach((w) => this.workflows.set(w.id, w));
  }

  public listWorkflows(): AutomationItem[] {
    return Array.from(this.workflows.values()).map((w) => ({ ...w }));
  }

  public toggleWorkflow(id: string, enabled: boolean): AutomationItem {
    const target = this.workflows.get(id);
    if (!target) {
      throw new Error(`Workflow '${id}' not found`);
    }
    target.enabled = enabled;
    return { ...target };
  }

  public runWorkflow(id: string): { success: boolean; id: string; executedAt: string } {
    const target = this.workflows.get(id);
    if (!target) {
      throw new Error(`Workflow '${id}' not found`);
    }
    target.lastRun = 'Just now';
    return { success: true, id, executedAt: new Date().toISOString() };
  }
}

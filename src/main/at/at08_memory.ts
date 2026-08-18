import { MemoryRecord } from '../../shared/types.js';

export class AT08MemoryStore {
  private memories: Map<string, MemoryRecord> = new Map();

  constructor() {
    // Seed initial local memories
    const seed: MemoryRecord[] = [
      {
        id: 'mem-1',
        title: 'Project Atlas architecture locked',
        body: 'Three-panel shell, offline-first core, Orb as the single identity element.',
        category: 'Projects',
        importance: 'High',
        createdAt: new Date().toISOString(),
      },
      {
        id: 'mem-2',
        title: 'Morning Routine Schedule',
        body: 'Morning routine runs at 08:00 on weekdays.',
        category: 'Reminders',
        importance: 'Medium',
        createdAt: new Date().toISOString(),
      },
    ];
    seed.forEach((m) => this.memories.set(m.id, m));
  }

  public listMemories(category?: string): MemoryRecord[] {
    const all = Array.from(this.memories.values());
    if (category && category !== 'All') {
      return all.filter((m) => m.category === category);
    }
    return all;
  }

  public getMemory(id: string): MemoryRecord | undefined {
    return this.memories.get(id);
  }

  public addMemory(record: Omit<MemoryRecord, 'id' | 'createdAt'>): MemoryRecord {
    const id = 'mem-' + Date.now();
    const newRecord: MemoryRecord = {
      ...record,
      id,
      createdAt: new Date().toISOString(),
    };
    this.memories.set(id, newRecord);
    return newRecord;
  }

  public deleteMemory(id: string): boolean {
    return this.memories.delete(id);
  }
}

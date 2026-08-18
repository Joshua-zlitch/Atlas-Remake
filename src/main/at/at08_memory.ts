import { MemoryRecord } from '../../shared/types.js';
import { LocalStorageManager } from '../persistence/storage.js';

export class AT08MemoryStore {
  private storage: LocalStorageManager<MemoryRecord[]>;

  constructor(filename: string = 'memory.json') {
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
    this.storage = new LocalStorageManager<MemoryRecord[]>(filename, seed);
  }

  public listMemories(category?: string): MemoryRecord[] {
    const all = this.storage.load();
    if (category && category !== 'All') {
      return all.filter((m) => m.category === category);
    }
    return all;
  }

  public getMemory(id: string): MemoryRecord | undefined {
    const all = this.storage.load();
    return all.find((m) => m.id === id);
  }

  public addMemory(record: Omit<MemoryRecord, 'id' | 'createdAt'>): MemoryRecord {
    const all = this.storage.load();
    const id = 'mem-' + Date.now();
    const newRecord: MemoryRecord = {
      ...record,
      id,
      createdAt: new Date().toISOString(),
    };
    all.push(newRecord);
    this.storage.save(all);
    return newRecord;
  }

  public deleteMemory(id: string): boolean {
    const all = this.storage.load();
    const index = all.findIndex((m) => m.id === id);
    if (index !== -1) {
      all.splice(index, 1);
      this.storage.save(all);
      return true;
    }
    return false;
  }
}

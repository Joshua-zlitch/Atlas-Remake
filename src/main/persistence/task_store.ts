import { LocalStorageManager } from './storage.js';
import { TaskRecord } from '../../shared/types.js';

export class TaskStore {
  private storage: LocalStorageManager<TaskRecord[]>;

  constructor(filename: string = 'tasks.json') {
    const seed: TaskRecord[] = [
      {
        id: 'task-1',
        title: 'Initial Phase 4 Persistence Audit',
        status: 'COMPLETED',
        category: 'System',
        createdAt: new Date().toISOString(),
        completedAt: new Date().toISOString(),
      },
    ];
    this.storage = new LocalStorageManager<TaskRecord[]>(filename, seed);
  }

  public getTasks(): TaskRecord[] {
    return this.storage.load();
  }

  public addTask(title: string, category: string): TaskRecord {
    const tasks = this.getTasks();
    const newTask: TaskRecord = {
      id: 'task-' + Date.now(),
      title,
      status: 'PENDING',
      category,
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    this.storage.save(tasks);
    return newTask;
  }

  public updateTaskStatus(id: string, status: TaskRecord['status']): TaskRecord {
    const tasks = this.getTasks();
    const target = tasks.find((t) => t.id === id);
    if (!target) {
      throw new Error(`Task '${id}' not found`);
    }
    target.status = status;
    if (status === 'COMPLETED') {
      target.completedAt = new Date().toISOString();
    }
    this.storage.save(tasks);
    return target;
  }
}

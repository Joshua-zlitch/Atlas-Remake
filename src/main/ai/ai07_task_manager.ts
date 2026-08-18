import { TaskStore } from '../persistence/task_store.js';
import { TaskRecord } from '../../shared/types.js';
import { ExecutionPlan, PlanStep } from './ai05_planner.js';

export class AI07TaskManager {
  constructor(private taskStore: TaskStore) {}

  public createTaskFromPlan(plan: ExecutionPlan): TaskRecord {
    return this.taskStore.addTask(plan.goal, 'AI-Plan');
  }

  public getTasks(): TaskRecord[] {
    return this.taskStore.getTasks();
  }

  public updateStepProgress(taskId: string, step: PlanStep, success: boolean): TaskRecord {
    const status = success ? 'RUNNING' : 'FAILED';
    return this.taskStore.updateTaskStatus(taskId, status);
  }

  public completeTask(taskId: string): TaskRecord {
    return this.taskStore.updateTaskStatus(taskId, 'COMPLETED');
  }

  public failTask(taskId: string): TaskRecord {
    return this.taskStore.updateTaskStatus(taskId, 'FAILED');
  }
}

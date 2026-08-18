export interface PlanStep {
  id: string;
  stepIndex: number;
  title: string;
  capabilityId: string;
  params: Record<string, unknown>;
  dependsOnStepId?: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
}

export interface ExecutionPlan {
  id: string;
  goal: string;
  steps: PlanStep[];
  createdAt: string;
}

export class AI05Planner {
  public createPlan(goal: string): ExecutionPlan {
    if (!goal || !goal.trim()) {
      throw new Error('Goal must be a non-empty string');
    }

    const planId = 'plan-' + Date.now();
    const steps: PlanStep[] = [];

    const lowerGoal = goal.toLowerCase();
    if (lowerGoal.includes('check system') || lowerGoal.includes('system status')) {
      steps.push({
        id: `${planId}-step-1`,
        stepIndex: 1,
        title: 'Query System Info & Health Status',
        capabilityId: 'system:health',
        params: {},
        status: 'PENDING',
      });
      steps.push({
        id: `${planId}-step-2`,
        stepIndex: 2,
        title: 'Check Guardian Oversight Metrics',
        capabilityId: 'guardian:health',
        params: {},
        dependsOnStepId: `${planId}-step-1`,
        status: 'PENDING',
      });
    } else {
      steps.push({
        id: `${planId}-step-1`,
        stepIndex: 1,
        title: 'Inspect Active Workspace Files',
        capabilityId: 'filesystem:list',
        params: { path: '.' },
        status: 'PENDING',
      });
    }

    return {
      id: planId,
      goal,
      steps,
      createdAt: new Date().toISOString(),
    };
  }
}

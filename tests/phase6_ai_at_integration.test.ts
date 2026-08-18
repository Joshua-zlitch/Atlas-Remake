import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ATRuntime } from '../src/main/at/index';
import { AIRuntime } from '../src/main/ai/index';

describe('Phase 6 AI ↔ AT Integration Test Suite', () => {
  let at: ATRuntime;
  let ai: AIRuntime;
  const workerId = process.env.VITEST_WORKER_ID || '1';
  const testDir = path.join(process.cwd(), '.atlas-test-data', workerId);

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    at = new ATRuntime();
    ai = new AIRuntime(at);
  });

  it('AI-06 -> AT-02 Filesystem: should read, list, and write files safely within workspace', async () => {
    const listRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-list',
      capabilityId: 'filesystem:list',
      params: { path: '.' },
    });
    expect(listRes.success).toBe(true);
    expect(Array.isArray(listRes.data)).toBe(true);

    const writeRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-write',
      capabilityId: 'filesystem:write',
      params: { path: 'test-file.txt', content: 'ATLAS Phase 6 Integration Test' },
    });
    expect(writeRes.success).toBe(true);
    expect(writeRes.permissionDecision).toBe('ALLOWED');

    const readRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-read',
      capabilityId: 'filesystem:read',
      params: { path: 'test-file.txt' },
    });
    expect(readRes.success).toBe(true);
    expect(readRes.data).toBe('ATLAS Phase 6 Integration Test');

    // Clean up created file
    const targetPath = path.join(process.cwd(), 'test-file.txt');
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
  });

  it('Workspace Security: should reject path traversal attempt by AI-06', async () => {
    const traversalRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-traversal',
      capabilityId: 'filesystem:read',
      params: { path: '../../../etc/passwd' },
    });

    expect(traversalRes.success).toBe(false);
    expect(traversalRes.error?.code).toBe('WORKSPACE_DENIAL');
    expect(traversalRes.permissionDecision).toBe('DENIED');
  });

  it('AT-16 Permission Integration: should enforce permission policy and deny unauthorized capabilities', async () => {
    at.permissions.setCapabilityPolicy('terminal:exec', 'DENIED');

    const termRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-term',
      capabilityId: 'terminal:exec',
      params: { command: 'node -v' },
    });

    expect(termRes.permissionDecision).toBe('DENIED');
    expect(termRes.success).toBe(false);
    expect(termRes.error?.code).toBe('PERMISSION_DENIED');
  });

  it('AT-17 Event Runtime Integration: should emit tool events during execution lifecycle', async () => {
    const eventsReceived: string[] = [];
    at.events.on('*', (e) => {
      eventsReceived.push(e.type);
    });

    await ai.toolOrchestrator.executeTool({
      toolId: 't-event-test',
      capabilityId: 'system:health',
      params: {},
    });

    expect(eventsReceived).toContain('tool:started');
    expect(eventsReceived).toContain('permission:decision');
    expect(eventsReceived).toContain('tool:completed');
  });

  it('AI-08 Reasoning Verification: should perform empirical evidence check for write and terminal execution', async () => {
    // 1. Filesystem write verification
    const writeRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-write-verify',
      capabilityId: 'filesystem:write',
      params: { path: 'verify-test.txt', content: 'Empirical verification payload' },
    });

    const writeVerification = ai.verifier.verifyToolExecution(writeRes);
    expect(writeVerification.verified).toBe(true);
    expect(writeVerification.confidenceScore).toBe(1.0);

    // 2. Terminal execution verification
    const termRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-term-verify',
      capabilityId: 'terminal:exec',
      params: { command: 'node -v' },
    });

    const termVerification = ai.verifier.verifyToolExecution(termRes);
    expect(termVerification.verified).toBe(true);
    expect(termVerification.confidenceScore).toBe(1.0);

    // Clean up
    const targetPath = path.join(process.cwd(), 'verify-test.txt');
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath);
    }
  });

  it('AI-06 -> AT-03 Process, AT-05 App Control, AT-10 Search, AT-11 Automation, AT-12 Notifications, AT-13 Attachments', async () => {
    const procRes = await ai.toolOrchestrator.executeTool({ toolId: 't-proc', capabilityId: 'process:list' });
    expect(procRes.success).toBe(true);

    const appRes = await ai.toolOrchestrator.executeTool({ toolId: 't-app', capabilityId: 'app:launch', params: { appName: 'Calculator' } });
    expect(appRes.success).toBe(true);

    const searchRes = await ai.toolOrchestrator.executeTool({ toolId: 't-search', capabilityId: 'search:query', params: { query: 'Atlas' } });
    expect(searchRes.success).toBe(true);

    const autoRes = await ai.toolOrchestrator.executeTool({ toolId: 't-auto', capabilityId: 'automation:list' });
    expect(autoRes.success).toBe(true);

    const notifRes = await ai.toolOrchestrator.executeTool({ toolId: 't-notif', capabilityId: 'notifications:send', params: { title: 'P6', body: 'Integration' } });
    expect(notifRes.success).toBe(true);

    const attRes = await ai.toolOrchestrator.executeTool({ toolId: 't-att', capabilityId: 'filesystem:attach', params: { filePath: 'package.json' } });
    expect(attRes.success).toBe(true);
  });

  it('Full End-to-End AI ↔ AT Pipeline Integration Test', async () => {
    // 1. User Goal -> AI-05 Planner
    const plan = ai.planner.createPlan('Check system status');
    expect(plan.steps.length).toBeGreaterThan(0);

    // 2. AI-07 Task Manager
    const task = ai.taskManager.createTaskFromPlan(plan);
    expect(task.id).toBeDefined();

    // 3. AI-06 Tool Orchestrator Step Execution
    const step = plan.steps[0];
    const toolRes = await ai.toolOrchestrator.executeTool({
      toolId: step.id,
      capabilityId: step.capabilityId,
      params: step.params,
    });

    // 4. AI-08 Reasoning Verification
    const verification = ai.verifier.verifyToolExecution(toolRes);
    expect(verification.verified).toBe(true);

    // 5. AI-07 Task Progress & Persistence
    ai.taskManager.updateStepProgress(task.id, step, verification.verified);
    const completedTask = ai.taskManager.completeTask(task.id);
    expect(completedTask.status).toBe('COMPLETED');
  });
});

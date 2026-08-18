import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ATRuntime } from '../src/main/at/index';
import { AIRuntime } from '../src/main/ai/index';
import { LocalStorageManager } from '../src/main/persistence/storage';

describe('Phase 9 Full Integration Test Suite', () => {
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

  it('Step 3 & 23: Complete End-to-End Pipeline (User -> Chat -> Plan -> Tool -> Permission -> AT -> Event -> Verify -> Task -> Persistence)', async () => {
    // 1. User submits goal
    const goal = 'Create phase9-summary.txt with full integration report content';
    
    // 2. AI Planner creates plan
    const plan = ai.planner.createPlan(goal);
    expect(plan.steps.length).toBeGreaterThan(0);

    // 3. AI Task Manager creates task record from plan
    const task = ai.taskManager.createTaskFromPlan(plan);
    expect(task.status).toBe('PENDING');

    // 4. Register event listener for AT-17 Event Runtime
    const eventsCaptured: string[] = [];
    const unsubStarted = at.events.on('tool:started', () => eventsCaptured.push('tool:started'));
    const unsubCompleted = at.events.on('tool:completed', () => eventsCaptured.push('tool:completed'));

    // 5. Tool Orchestrator executes tool (filesystem:write)
    ai.taskManager.updateStepProgress(task.id, plan.steps[0], true);
    const toolRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-phase9-write',
      capabilityId: 'filesystem:write',
      params: { path: 'phase9-summary.txt', content: 'ATLAS Phase 9 Full Integration Verified Successfully.' },
    });
    expect(toolRes.success).toBe(true);

    // 6. AI-08 Reasoning & Verification verifies empirical evidence
    const verifyRes = ai.verifier.verifyToolExecution(toolRes);
    expect(verifyRes.verified).toBe(true);

    // 7. Update Task Manager state to COMPLETED
    const updatedTask = ai.taskManager.completeTask(task.id);
    expect(updatedTask?.status).toBe('COMPLETED');

    // 8. Verify Event propagation
    expect(eventsCaptured).toContain('tool:started');
    expect(eventsCaptured).toContain('tool:completed');

    // 9. Verify ConversationStore persistence
    const userMsg = { id: Date.now(), role: 'user' as const, text: goal };
    const assistantMsg = { id: Date.now() + 1, role: 'atlas' as const, text: 'File created and verified.' };
    at.conversations.appendMessage('conv-default', userMsg);
    at.conversations.appendMessage('conv-default', assistantMsg);

    const conv = at.conversations.getConversation('conv-default');
    expect(conv?.messages.length).toBeGreaterThanOrEqual(2);

    // 10. Clean up event listeners
    unsubStarted();
    unsubCompleted();

    // Clean up created file
    const targetFile = path.join(process.cwd(), 'phase9-summary.txt');
    if (fs.existsSync(targetFile)) {
      fs.unlinkSync(targetFile);
    }
  });

  it('Step 5: Terminal End-to-End Execution (Command -> AT-16 -> AT-04 -> Exit Code -> Output)', async () => {
    at.permissions.setCapabilityPolicy('terminal:exec', 'ALLOWED');
    const termRes = await at.terminal.executeCommand('node -v');
    expect(termRes.exitCode).toBe(0);
    expect(termRes.stdout).toContain('v');

    const verify = ai.verifier.verifyToolExecution({
      toolId: 't-term',
      capabilityId: 'terminal:exec',
      success: true,
      data: termRes,
    });
    expect(verify.verified).toBe(true);
  });

  it('Step 6: Permission Denial Control (AI -> AT-16 DENIED -> No AT Execution)', async () => {
    at.permissions.setCapabilityPolicy('filesystem:write', 'DENIED');
    
    const deniedRes = await ai.toolOrchestrator.executeTool({
      toolId: 't-denied',
      capabilityId: 'filesystem:write',
      params: { path: 'unauthorized.txt', content: 'Unauthorized write' },
    });

    expect(deniedRes.success).toBe(false);
    expect(deniedRes.error?.code).toBe('PERMISSION_DENIED');
    expect(fs.existsSync(path.join(process.cwd(), 'unauthorized.txt'))).toBe(false);
  });

  it('Step 7: Workspace Isolation Security (workspace-A vs workspace-B traversal rejection)', () => {
    const wsCheck = at.workspace.validatePathInWorkspace('../other-workspace/secret.json');
    expect(wsCheck.valid).toBe(false);
  });

  it('Step 8 & 9: Memory & Context Integration Lifecycle', async () => {
    const addMem = await at.dispatch('memory:add', {
      title: 'Integration Memory',
      body: 'Testing full context memory loop',
      category: 'System',
      importance: 'High',
    });
    expect(addMem.success).toBe(true);

    const memList = await at.dispatch('memory:list');
    expect(memList.data.some((m: any) => m.title === 'Integration Memory')).toBe(true);

    at.contextStore.setContext('sys_state', 'Phase 9 Active');
    const builtContext = ai.contextEngine.buildPromptContext('user prompt');
    expect(builtContext.systemInstruction).toContain('Integration Memory');
    expect(builtContext.systemInstruction).toContain('Phase 9 Active');
  });

  it('Step 21: Full Restart Recovery (Store -> Reload -> State Integrity)', () => {
    // 1. Populate state in initial runtime
    at.conversations.appendMessage('conv-default', { id: 101, role: 'user', text: 'Pre-restart message' });
    at.settings.updateSettings({ orbIntensity: 92 });
    at.memory.addMemory({ title: 'Pre-restart Memory', body: 'Persisting across restart', category: 'General', importance: 'Medium' });

    // 2. Re-instantiate ATRuntime (simulating application restart)
    const restartedAT = new ATRuntime();

    // 3. Verify state integrity post-restart
    const recoveredConv = restartedAT.conversations.getConversation('conv-default');
    expect(recoveredConv?.messages.some((m) => m.text === 'Pre-restart message')).toBe(true);

    const recoveredSettings = restartedAT.settings.getSettings();
    expect(recoveredSettings.orbIntensity).toBe(92);

    const recoveredMemories = restartedAT.memory.listMemories();
    expect(recoveredMemories.some((m) => m.title === 'Pre-restart Memory')).toBe(true);
  });

  it('Step 22: Corruption Recovery (Corrupted JSON -> .bak Backup -> Default Restoration)', () => {
    const corruptFile = path.join(testDir, 'corrupt_test.json');

    // Create corrupted file
    fs.mkdirSync(path.dirname(corruptFile), { recursive: true });
    fs.writeFileSync(corruptFile, '{ invalid json content ...');

    const storage = new LocalStorageManager<{ val: string }>('corrupt_test.json', { val: 'default' });

    // Load must recover cleanly without crash
    const loaded = storage.load();
    expect(loaded.val).toBe('default');

    // Verify .bak backup was generated
    const bakFile = corruptFile + '.bak';
    expect(fs.existsSync(bakFile)).toBe(true);
  });
});

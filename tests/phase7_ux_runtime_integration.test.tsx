import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { ATRuntime } from '../src/main/at/index';
import { AIRuntime } from '../src/main/ai/index';

describe('Phase 7 UX ↔ Runtime Integration Test Suite', () => {
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

  it('Chat UI Pipeline: should route chat messages to AI and persist conversation history', async () => {
    // 1. Send user message through AI Runtime dispatch (testing same capability used by index.tsx)
    const res = await ai.dispatch('ai:chat', { prompt: 'What is Atlas Guardian?' });
    expect(res.success).toBe(true);
    expect(res.data).toBeDefined();

    // 2. Verify conversation store history persistence
    const conv = at.conversations.getConversation('conv-default');
    expect(conv?.messages.some((m) => m.text === 'What is Atlas Guardian?')).toBe(true);
  });

  it('Guardian UI Capabilities: should provide live CPU, memory, and health status', async () => {
    const sysInfoRes = await at.dispatch('system:info');
    expect(sysInfoRes.success).toBe(true);
    expect(sysInfoRes.data.cpus).toBeGreaterThan(0);
    expect(sysInfoRes.data.totalMemoryMb).toBeGreaterThan(0);

    const guardianRes = await at.dispatch('guardian:health');
    expect(guardianRes.success).toBe(true);
    expect(guardianRes.data.healthy).toBe(true);
  });

  it('Automation UI Capabilities: should list, toggle, and trigger workflows via IPC', async () => {
    const listRes = await at.dispatch('automation:list');
    expect(listRes.success).toBe(true);
    const workflows = listRes.data as any[];
    expect(workflows.length).toBeGreaterThan(0);

    const toggleRes = await at.dispatch('automation:toggle', { workflowId: workflows[0].id, enabled: false });
    expect(toggleRes.success).toBe(true);
    expect(toggleRes.data.enabled).toBe(false);

    const runRes = await at.dispatch('automation:run', { workflowId: workflows[0].id });
    expect(runRes.success).toBe(true);
    expect(runRes.data.executedAt).toBeDefined();
  });

  it('Memory UI Capabilities: should list, add, and delete persistent memories', async () => {
    const initialList = await at.dispatch('memory:list');
    expect(initialList.success).toBe(true);

    const addRes = await at.dispatch('memory:add', {
      title: 'UX Integration Test Memory',
      body: 'Testing Memory UI IPC capabilities',
      category: 'Projects',
      importance: 'High',
    });
    expect(addRes.success).toBe(true);

    const updatedList = await at.dispatch('memory:list');
    expect(updatedList.data.some((m: any) => m.title === 'UX Integration Test Memory')).toBe(true);

    const deleteRes = await at.dispatch('memory:delete', { id: addRes.data.id });
    expect(deleteRes.success).toBe(true);
  });

  it('Settings UI Capabilities: should fetch and persist settings updates via IPC', async () => {
    const settingsRes = await at.dispatch('settings:get');
    expect(settingsRes.success).toBe(true);

    const updateRes = await at.dispatch('settings:set', { orbIntensity: 85, autoSummary: false });
    expect(updateRes.success).toBe(true);
    expect(updateRes.data.orbIntensity).toBe(85);
    expect(updateRes.data.autoSummary).toBe(false);
  });

  it('Event Runtime Clean Subscription: should register and emit events without duplicate handlers', () => {
    let callCount = 0;
    const cleanup = at.events.on('tool:completed', () => {
      callCount++;
    });

    at.events.emitEvent('tool:completed', 'test', {});
    expect(callCount).toBe(1);

    cleanup();
    at.events.emitEvent('tool:completed', 'test', {});
    expect(callCount).toBe(1);
  });
});

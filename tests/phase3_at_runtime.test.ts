import { describe, it, expect, beforeEach } from 'vitest';
import { atRuntime, ATRuntime } from '../src/main/at/index';
import { AT01WorkspaceManager } from '../src/main/at/at01_workspace';
import { AT02FilesystemManager } from '../src/main/at/at02_filesystem';
import { AT16PermissionAuthority } from '../src/main/at/at16_permissions';
import { AT17EventRuntime } from '../src/main/at/at17_event_runtime';

describe('Phase 3 AT Runtime Foundation Test Suite', () => {
  let runtime: ATRuntime;

  beforeEach(() => {
    runtime = new ATRuntime();
  });

  it('AT-01 Workspace: should initialize default workspace and validate paths', () => {
    const activeWs = runtime.workspace.getActiveWorkspace();
    expect(activeWs.id).toBe('ws-default');
    expect(activeWs.active).toBe(true);

    const validCheck = runtime.workspace.validatePathInWorkspace('package.json');
    expect(validCheck.valid).toBe(true);

    const invalidCheck = runtime.workspace.validatePathInWorkspace('../../../etc/passwd');
    expect(invalidCheck.valid).toBe(false);
  });

  it('AT-02 Filesystem: should list workspace directory and prevent path traversal', async () => {
    const files = await runtime.filesystem.listDirectory('.');
    expect(files.length).toBeGreaterThan(0);
    expect(files.some((f) => f.name === 'package.json')).toBe(true);

    await expect(runtime.filesystem.readFile('../../../etc/passwd')).rejects.toThrow('Path traversal denied');
  });

  it('AT-16 Permissions: should evaluate permission requests correctly', () => {
    const permAuthority = new AT16PermissionAuthority();
    const readResult = permAuthority.evaluateRequest({ capabilityId: 'filesystem:read', resource: 'file.txt', action: 'read' });
    expect(readResult.decision).toBe('ALLOWED');

    permAuthority.setCapabilityPolicy('terminal:exec', 'DENIED');
    const execResult = permAuthority.evaluateRequest({ capabilityId: 'terminal:exec', resource: 'ls', action: 'execute' });
    expect(execResult.decision).toBe('DENIED');
  });

  it('AT-17 Event Runtime: should emit and record runtime events', () => {
    const events = new AT17EventRuntime();
    let received = false;

    events.on('test:evt', (e) => {
      received = true;
      expect(e.payload).toEqual({ hello: 'world' });
    });

    events.emitEvent('test:evt', 'test-source', { hello: 'world' });
    expect(received).toBe(true);
    expect(events.getHistory().length).toBe(1);
  });

  it('AT-09 Context Store & AT-08 Memory: should manage context and persistent memories', () => {
    runtime.contextStore.setContext('user:theme', 'dark');
    expect(runtime.contextStore.getContext('user:theme')).toBe('dark');

    const newMem = runtime.memory.addMemory({
      title: 'Phase 3 Verification',
      body: 'AT Runtime Foundation is complete.',
      category: 'Projects',
      importance: 'High',
    });
    expect(newMem.id).toBeDefined();
    expect(runtime.memory.listMemories().some((m) => m.title === 'Phase 3 Verification')).toBe(true);
  });

  it('AT-06 System Information & AT-07 Guardian: should report health status', () => {
    const sysInfo = runtime.systemInfo.getSystemInfo();
    expect(sysInfo.platform).toBeDefined();
    expect(sysInfo.cpus).toBeGreaterThan(0);

    const guardianHealth = runtime.guardian.getHealthCheck();
    expect(guardianHealth.healthy).toBe(true);
    expect(guardianHealth.active).toBe(true);
  });

  it('AT-03 Process & AT-04 Terminal: should handle process and command operations safely', async () => {
    const processes = runtime.process.listProcesses();
    expect(processes.length).toBeGreaterThan(0);

    const termResult = await runtime.terminal.executeCommand('node -v');
    expect(termResult.exitCode).toBe(0);
    expect(termResult.stdout).toContain('v');
  });

  it('AT-10 Search & AT-11 Automation & AT-12 Notifications: should perform search and workflow actions', async () => {
    const searchResults = await runtime.search.search('Atlas');
    expect(searchResults.length).toBeGreaterThan(0);

    const workflows = runtime.automation.listWorkflows();
    expect(workflows.length).toBeGreaterThan(0);

    const toggleResult = runtime.automation.toggleWorkflow(workflows[0].id, false);
    expect(toggleResult.enabled).toBe(false);

    const notif = runtime.notifications.notify('Test', 'Phase 3 notification');
    expect(notif.success).toBe(true);
  });

  it('AT-13 Attachments, AT-14 Voice, AT-15 Vision: should return correct status', async () => {
    const attachment = await runtime.attachments.attachFile('package.json');
    expect(attachment.name).toBe('package.json');

    const voiceRes = runtime.voice.listen();
    expect(voiceRes.success).toBe(false);
    expect(voiceRes.error.code).toBe('CAPABILITY_UNAVAILABLE');

    const visionRes = runtime.vision.captureScreen();
    expect(visionRes.success).toBe(false);
    expect(visionRes.error.code).toBe('CAPABILITY_UNAVAILABLE');
  });

  it('ATRuntime Unified Dispatch: should dispatch IPC capability calls', async () => {
    const wsRes = await runtime.dispatch('workspace:info');
    expect(wsRes.success).toBe(true);
    expect(wsRes.data.id).toBe('ws-default');

    const memRes = await runtime.dispatch('memory:list');
    expect(memRes.success).toBe(true);
    expect(Array.isArray(memRes.data)).toBe(true);

    const invalidRes = await runtime.dispatch('unknown:capability');
    expect(invalidRes.success).toBe(false);
    expect(invalidRes.error?.code).toBe('CAPABILITY_UNAVAILABLE');
  });
});

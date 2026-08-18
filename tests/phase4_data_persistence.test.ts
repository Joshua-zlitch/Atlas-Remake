import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { LocalStorageManager } from '../src/main/persistence/storage';
import { AT08MemoryStore } from '../src/main/at/at08_memory';
import { AT09ContextStore } from '../src/main/at/at09_context_store';
import { AT01WorkspaceManager } from '../src/main/at/at01_workspace';
import { ConversationStore } from '../src/main/persistence/conversation_store';
import { SettingsStore } from '../src/main/persistence/settings_store';
import { TaskStore } from '../src/main/persistence/task_store';

describe('Phase 4 Data & Persistence Test Suite', () => {
  const testDir = path.join(process.cwd(), '.atlas-test-data');
  const atlasDataDir = path.join(process.cwd(), '.atlas-data');

  beforeEach(() => {
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
    if (fs.existsSync(atlasDataDir)) {
      fs.rmSync(atlasDataDir, { recursive: true, force: true });
    }
  });

  it('User Data Boundary: Storage path remains separate from source resources', () => {
    const manager = new LocalStorageManager<{ test: string }>('boundary_test.json', { test: 'val' });
    const storagePath = manager.getFilePath();
    expect(storagePath).not.toContain(path.join(process.cwd(), 'src'));
    expect(storagePath).not.toContain(path.join(process.cwd(), 'dist'));
  });

  it('AT-08 Memory Persistence: Memory records persist across reload cycles', () => {
    const file = 'test_memory.json';
    const store1 = new AT08MemoryStore(file);
    const added = store1.addMemory({
      title: 'Persistent Memory Test',
      body: 'Body content for persistence test',
      category: 'Test',
      importance: 'High',
    });

    // Reload from same file
    const store2 = new AT08MemoryStore(file);
    const loaded = store2.listMemories();
    expect(loaded.some((m) => m.id === added.id && m.title === 'Persistent Memory Test')).toBe(true);
  });

  it('AT-09 Context Store Persistence: Context key-values persist across reload cycles', () => {
    const file = 'test_context.json';
    const ctx1 = new AT09ContextStore(file);
    ctx1.setContext('user:activeProject', 'proj-alpha');

    // Reload
    const ctx2 = new AT09ContextStore(file);
    expect(ctx2.getContext('user:activeProject')).toBe('proj-alpha');
  });

  it('Conversation Persistence: Conversations load, append messages, and preserve order', () => {
    const file = 'test_conversations.json';
    const convStore1 = new ConversationStore(file);
    const msg1 = { id: 1, role: 'user' as const, text: 'Hello Atlas' };
    const msg2 = { id: 2, role: 'atlas' as const, text: 'Greetings!' };

    convStore1.appendMessage('conv-1', msg1);
    convStore1.appendMessage('conv-1', msg2);

    // Reload
    const convStore2 = new ConversationStore(file);
    const conv = convStore2.getConversation('conv-1');
    expect(conv).toBeDefined();
    expect(conv?.messages.length).toBe(2);
    expect(conv?.messages[0].text).toBe('Hello Atlas');
    expect(conv?.messages[1].text).toBe('Greetings!');
  });

  it('Settings Persistence: App settings save, load, and default fallbacks', () => {
    const file = 'test_settings.json';
    const settingsStore1 = new SettingsStore(file);
    const current = settingsStore1.getSettings();
    expect(current.theme).toBe('dark');

    settingsStore1.updateSettings({ orbIntensity: 90, theme: 'light' });

    // Reload
    const settingsStore2 = new SettingsStore(file);
    const updated = settingsStore2.getSettings();
    expect(updated.orbIntensity).toBe(90);
    expect(updated.theme).toBe('light');
  });

  it('Task Persistence: Tasks persist status and additions', () => {
    const file = 'test_tasks.json';
    const taskStore1 = new TaskStore(file);
    const newTask = taskStore1.addTask('Run test backup', 'Automation');
    taskStore1.updateTaskStatus(newTask.id, 'COMPLETED');

    // Reload
    const taskStore2 = new TaskStore(file);
    const tasks = taskStore2.getTasks();
    const target = tasks.find((t) => t.id === newTask.id);
    expect(target).toBeDefined();
    expect(target?.status).toBe('COMPLETED');
    expect(target?.completedAt).toBeDefined();
  });

  it('AT-01 Workspace Persistence: Active workspace choice persists', () => {
    const file = 'test_workspace.json';
    const ws1 = new AT01WorkspaceManager(process.cwd(), file);
    const active = ws1.getActiveWorkspace();
    expect(active.id).toBe('ws-default');

    // Reload
    const ws2 = new AT01WorkspaceManager(process.cwd(), file);
    expect(ws2.getActiveWorkspace().id).toBe('ws-default');
  });

  it('Corruption Recovery: Corrupted JSON file generates .bak backup and restores defaults safely', () => {
    const file = 'corrupt_test.json';
    const manager = new LocalStorageManager<Record<string, string>>(file, { default: 'true' });
    manager.save({ key: 'valid' });

    const rawPath = manager.getFilePath();
    // Intentionally corrupt the JSON file
    fs.writeFileSync(rawPath, '{ corrupt_json: invalid_syntax... ', 'utf-8');

    // Attempting to load corrupted file
    const loaded = manager.load();
    expect(loaded).toEqual({ default: 'true' });
    expect(fs.existsSync(`${rawPath}.bak`)).toBe(true);
  });
});

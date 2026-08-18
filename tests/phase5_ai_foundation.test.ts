import { describe, it, expect, beforeEach } from 'vitest';
import fs from 'fs';
import path from 'path';
import { AIRuntime } from '../src/main/ai/index';
import { ATRuntime } from '../src/main/at/index';
import { AI09ConfigurationManager } from '../src/main/ai/ai09_configuration';
import { AI01LLMRuntime } from '../src/main/ai/ai01_llm_runtime';
import { AI03ContextEngine } from '../src/main/ai/ai03_context_engine';
import { AI04MemoryIntelligence } from '../src/main/ai/ai04_memory_intelligence';
import { AI05Planner } from '../src/main/ai/ai05_planner';
import { AI06ToolOrchestrator } from '../src/main/ai/ai06_tool_orchestrator';
import { AI07TaskManager } from '../src/main/ai/ai07_task_manager';
import { AI08ReasoningVerification } from '../src/main/ai/ai08_reasoning_verification';

describe('Phase 5 AI Foundation Test Suite', () => {
  let at: ATRuntime;
  let ai: AIRuntime;
  const atlasDataDir = path.join(process.cwd(), '.atlas-data');

  beforeEach(() => {
    if (fs.existsSync(atlasDataDir)) {
      fs.rmSync(atlasDataDir, { recursive: true, force: true });
    }
    at = new ATRuntime();
    ai = new AIRuntime(at);
  });

  it('AI-09 Configuration: should load defaults and persist updates', () => {
    const configManager = new AI09ConfigurationManager(at.settings);
    const cfg = configManager.getConfig();
    expect(cfg.modelName).toBe('llama3:8b-instruct');
    expect(cfg.temperature).toBe(0.7);

    configManager.updateConfig({ temperature: 0.2 });
    expect(configManager.getConfig().temperature).toBe(0.2);
  });

  it('AI-01 LLM Runtime: should report availability and handle offline state safely', async () => {
    const isOnline = await ai.llm.checkAvailability();
    expect(typeof isOnline).toBe('boolean');

    if (!isOnline) {
      await expect(ai.llm.generateInference({ prompt: 'Hello' })).rejects.toThrow('Local model endpoint');
    }
  });

  it('AI-02 Conversation: should manage user message and assistant fallback response', async () => {
    const assistantMsg = await ai.conversation.handleUserMessage('conv-default', 'What is Atlas?');
    expect(assistantMsg.role).toBe('atlas');
    expect(assistantMsg.text).toBeDefined();

    const storedConv = at.conversations.getConversation('conv-default');
    expect(storedConv?.messages.some((m) => m.text === 'What is Atlas?')).toBe(true);
  });

  it('AI-03 Context Engine: should build prompt context with injected memories and context store items', () => {
    at.contextStore.setContext('env', 'development');
    const ctxEngine = new AI03ContextEngine(at.contextStore, at.memory);
    const built = ctxEngine.buildPromptContext('Help me test context');

    expect(built.systemInstruction).toContain('ATLAS AI Assistant');
    expect(built.systemInstruction).toContain('Context [env]');
    expect(built.injectedContextKeys).toContain('env');
  });

  it('AI-04 Memory Intelligence: should evaluate memory candidates and retrieve memories', () => {
    const memoryIntel = new AI04MemoryIntelligence(at.memory);
    const evalResult = memoryIntel.evaluateForMemory('Please remember that my favorite color is blue');

    expect(evalResult.isMemoryCandidate).toBe(true);
    expect(evalResult.title).toBeDefined();

    const stored = memoryIntel.storeMemoryCandidate(evalResult.title!, 'Favorite color is blue');
    expect(stored.id).toBeDefined();

    const retrieved = memoryIntel.retrieveRelevantMemories('favorite color');
    expect(retrieved.length).toBeGreaterThan(0);
  });

  it('AI-05 Planner: should decompose user goals into structured plans', () => {
    const planner = new AI05Planner();
    const plan = planner.createPlan('Check system status');

    expect(plan.id).toBeDefined();
    expect(plan.steps.length).toBeGreaterThan(0);
    expect(plan.steps[0].capabilityId).toBe('system:health');
  });

  it('AI-06 Tool Orchestrator & Security: should enforce AT-16 permissions and route tool execution', async () => {
    const orchestrator = new AI06ToolOrchestrator(at);

    // Test Allowed tool call
    const resAllowed = await orchestrator.executeTool({
      toolId: 't1',
      capabilityId: 'system:health',
      params: {},
    });
    expect(resAllowed.permissionDecision).toBe('ALLOWED');
    expect(resAllowed.success).toBe(true);

    // Test Denied tool call
    at.permissions.setCapabilityPolicy('terminal:exec', 'DENIED');
    const resDenied = await orchestrator.executeTool({
      toolId: 't2',
      capabilityId: 'terminal:exec',
      params: { command: 'dir' },
    });
    expect(resDenied.permissionDecision).toBe('DENIED');
    expect(resDenied.success).toBe(false);
    expect(resDenied.error?.code).toBe('PERMISSION_DENIED');
  });

  it('AI-07 Task Manager: should create task records from plans and track progress', () => {
    const taskMgr = new AI07TaskManager(at.tasks);
    const plan = ai.planner.createPlan('Check system status');
    const taskRecord = taskMgr.createTaskFromPlan(plan);

    expect(taskRecord.id).toBeDefined();
    expect(taskRecord.status).toBe('PENDING');

    const updated = taskMgr.updateStepProgress(taskRecord.id, plan.steps[0], true);
    expect(updated.status).toBe('RUNNING');

    const completed = taskMgr.completeTask(taskRecord.id);
    expect(completed.status).toBe('COMPLETED');
  });

  it('AI-08 Reasoning & Verification: should evaluate empirical evidence from tool executions', () => {
    const verifier = new AI08ReasoningVerification();

    const validVerification = verifier.verifyToolExecution({
      toolId: 't1',
      capabilityId: 'system:health',
      success: true,
      data: { online: true },
      permissionDecision: 'ALLOWED',
    });
    expect(validVerification.verified).toBe(true);
    expect(validVerification.confidenceScore).toBe(1.0);

    const noPayloadVerification = verifier.verifyToolExecution({
      toolId: 't2',
      capabilityId: 'system:health',
      success: true,
      data: undefined,
      permissionDecision: 'ALLOWED',
    });
    expect(noPayloadVerification.verified).toBe(false);
    expect(noPayloadVerification.confidenceScore).toBeLessThan(0.5);
  });

  it('End-to-End AI Pipeline: should execute goal -> plan -> tool -> permission -> verify -> task update cycle', async () => {
    // 1. Goal
    const goal = 'Check system status';

    // 2. AI-05 Planner
    const plan = ai.planner.createPlan(goal);
    expect(plan.steps.length).toBeGreaterThan(0);

    // 3. AI-07 Task Manager
    const task = ai.taskManager.createTaskFromPlan(plan);

    // 4. AI-06 Tool Orchestrator execution of step 1
    const step1 = plan.steps[0];
    const toolResult = await ai.toolOrchestrator.executeTool({
      toolId: step1.id,
      capabilityId: step1.capabilityId,
      params: step1.params,
    });

    // 5. AI-08 Verification
    const verification = ai.verifier.verifyToolExecution(toolResult);
    expect(verification.verified).toBe(true);

    // 6. AI-07 Task update
    ai.taskManager.updateStepProgress(task.id, step1, verification.verified);
    const finalTask = ai.taskManager.completeTask(task.id);
    expect(finalTask.status).toBe('COMPLETED');
  });
});

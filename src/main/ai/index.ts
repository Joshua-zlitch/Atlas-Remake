import { ATRuntime, atRuntime } from '../at/index.js';
import { AI09ConfigurationManager } from './ai09_configuration.js';
import { AI01LLMRuntime } from './ai01_llm_runtime.js';
import { AI02ConversationManager } from './ai02_conversation.js';
import { AI03ContextEngine } from './ai03_context_engine.js';
import { AI04MemoryIntelligence } from './ai04_memory_intelligence.js';
import { AI05Planner } from './ai05_planner.js';
import { AI06ToolOrchestrator } from './ai06_tool_orchestrator.js';
import { AI07TaskManager } from './ai07_task_manager.js';
import { AI08ReasoningVerification } from './ai08_reasoning_verification.js';

export class AIRuntime {
  public config: AI09ConfigurationManager;
  public llm: AI01LLMRuntime;
  public conversation: AI02ConversationManager;
  public contextEngine: AI03ContextEngine;
  public memoryIntelligence: AI04MemoryIntelligence;
  public planner: AI05Planner;
  public toolOrchestrator: AI06ToolOrchestrator;
  public taskManager: AI07TaskManager;
  public verifier: AI08ReasoningVerification;

  constructor(targetATRuntime: ATRuntime = atRuntime) {
    this.config = new AI09ConfigurationManager(targetATRuntime.settings);
    this.llm = new AI01LLMRuntime(this.config);
    this.conversation = new AI02ConversationManager(targetATRuntime.conversations, this.llm, this.config);
    this.contextEngine = new AI03ContextEngine(targetATRuntime.contextStore, targetATRuntime.memory);
    this.memoryIntelligence = new AI04MemoryIntelligence(targetATRuntime.memory);
    this.planner = new AI05Planner();
    this.toolOrchestrator = new AI06ToolOrchestrator(targetATRuntime);
    this.taskManager = new AI07TaskManager(targetATRuntime.tasks);
    this.verifier = new AI08ReasoningVerification();
  }

  public async dispatch(capabilityId: string, params?: any): Promise<{ success: boolean; data?: any; error?: { code: string; message: string } }> {
    try {
      switch (capabilityId) {
        case 'ai:chat': {
          const prompt = params?.prompt || params?.text;
          const msg = await this.conversation.handleUserMessage(params?.conversationId || 'conv-default', prompt);
          return { success: true, data: msg.text };
        }
        case 'ai:plan': {
          const plan = this.planner.createPlan(params?.goal);
          const task = this.taskManager.createTaskFromPlan(plan);
          return { success: true, data: { plan, taskId: task.id } };
        }
        case 'ai:execute-tool': {
          const toolRes = await this.toolOrchestrator.executeTool(params);
          const verification = this.verifier.verifyToolExecution(toolRes);
          return {
            success: toolRes.success && verification.verified,
            data: { toolRes, verification },
            error: toolRes.error,
          };
        }
        case 'ai:config': {
          if (params && Object.keys(params).length > 0) {
            return { success: true, data: this.config.updateConfig(params) };
          }
          return { success: true, data: this.config.getConfig() };
        }
        default:
          return {
            success: false,
            error: {
              code: 'AI_CAPABILITY_UNAVAILABLE',
              message: `AI capability '${capabilityId}' is not registered in Phase 5 AI Runtime`,
            },
          };
      }
    } catch (err: unknown) {
      return {
        success: false,
        error: {
          code: 'AI_EXECUTION_ERROR',
          message: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }
}

export const aiRuntime = new AIRuntime();

import { ConversationStore } from '../persistence/conversation_store.js';
import { ConversationRecord, ChatMessage } from '../../shared/types.js';
import { AI01LLMRuntime } from './ai01_llm_runtime.js';
import { AI09ConfigurationManager } from './ai09_configuration.js';

export class AI02ConversationManager {
  constructor(
    private conversationStore: ConversationStore,
    private llmRuntime: AI01LLMRuntime,
    private configManager: AI09ConfigurationManager
  ) {}

  public getConversation(id: string = 'conv-default'): ConversationRecord | undefined {
    return this.conversationStore.getConversation(id);
  }

  public async handleUserMessage(conversationId: string = 'conv-default', text: string): Promise<ChatMessage> {
    if (!text || !text.trim()) {
      throw new Error('Message text must be a non-empty string');
    }

    const userMsg: ChatMessage = {
      id: Date.now(),
      role: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    // Append user message to store
    this.conversationStore.appendMessage(conversationId, userMsg);

    const cfg = this.configManager.getConfig();
    let replyText: string;

    try {
      const inference = await this.llmRuntime.generateInference({
        prompt: text,
        systemPrompt: cfg.systemPromptPrefix,
      });
      replyText = inference.text;
    } catch (err: unknown) {
      replyText = `[Capability Unavailable] ${err instanceof Error ? err.message : String(err)}`;
    }

    const assistantMsg: ChatMessage = {
      id: Date.now() + 1,
      role: 'atlas',
      text: replyText,
      timestamp: new Date().toISOString(),
    };

    // Append assistant message to store
    this.conversationStore.appendMessage(conversationId, assistantMsg);
    return assistantMsg;
  }
}

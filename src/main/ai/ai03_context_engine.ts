import { AT09ContextStore } from '../at/at09_context_store.js';
import { AT08MemoryStore } from '../at/at08_memory.js';
import { ChatMessage } from '../../shared/types.js';

export interface ConstructedContext {
  prompt: string;
  systemInstruction: string;
  injectedContextKeys: string[];
  injectedMemoriesCount: number;
}

export class AI03ContextEngine {
  constructor(
    private contextStore: AT09ContextStore,
    private memoryStore: AT08MemoryStore
  ) {}

  public buildPromptContext(prompt: string, history: ChatMessage[] = [], maxContextLength: number = 4000): ConstructedContext {
    const keys = this.contextStore.listKeys();
    const contextItems: string[] = [];

    keys.forEach((key) => {
      const val = this.contextStore.getContext(key);
      if (val) {
        contextItems.push(`Context [${key}]: ${JSON.stringify(val)}`);
      }
    });

    const memories = this.memoryStore.listMemories();
    const relevantMemories = memories.slice(0, 3).map((m) => `Memory [${m.title}]: ${m.body}`);

    const systemInstruction = `You are ATLAS AI Assistant.\nSystem Context:\n${contextItems.join('\n')}\nRelevant Memory:\n${relevantMemories.join('\n')}`;

    let combinedPrompt = prompt;
    if (history.length > 0) {
      const historySnippets = history.slice(-6).map((m) => `${m.role.toUpperCase()}: ${m.text}`).join('\n');
      combinedPrompt = `Recent Conversation:\n${historySnippets}\n\nUSER: ${prompt}`;
    }

    if (combinedPrompt.length > maxContextLength) {
      combinedPrompt = combinedPrompt.substring(combinedPrompt.length - maxContextLength);
    }

    return {
      prompt: combinedPrompt,
      systemInstruction,
      injectedContextKeys: keys,
      injectedMemoriesCount: relevantMemories.length,
    };
  }
}

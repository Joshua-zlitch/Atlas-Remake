import { LocalStorageManager } from './storage.js';
import { ConversationRecord, ChatMessage } from '../../shared/types.js';

export class ConversationStore {
  private storage: LocalStorageManager<ConversationRecord[]>;

  constructor(filename: string = 'conversations.json') {
    const seed: ConversationRecord[] = [
      {
        id: 'conv-default',
        title: 'General Chat',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      },
    ];
    this.storage = new LocalStorageManager<ConversationRecord[]>(filename, seed);
  }

  public getConversations(): ConversationRecord[] {
    return this.storage.load();
  }

  public getConversation(id: string): ConversationRecord | undefined {
    const list = this.getConversations();
    return list.find((c) => c.id === id);
  }

  public appendMessage(conversationId: string, message: ChatMessage): ConversationRecord {
    const list = this.getConversations();
    let conv = list.find((c) => c.id === conversationId);

    if (!conv) {
      conv = {
        id: conversationId,
        title: 'Conversation ' + conversationId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        messages: [],
      };
      list.push(conv);
    }

    conv.messages.push(message);
    conv.updatedAt = new Date().toISOString();
    this.storage.save(list);
    return conv;
  }
}

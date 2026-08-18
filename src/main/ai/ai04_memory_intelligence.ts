import { AT08MemoryStore } from '../at/at08_memory.js';
import { MemoryRecord } from '../../shared/types.js';

export class AI04MemoryIntelligence {
  constructor(private memoryStore: AT08MemoryStore) {}

  public evaluateForMemory(text: string): { isMemoryCandidate: boolean; title?: string; category?: string } {
    if (!text) return { isMemoryCandidate: false };
    const lower = text.toLowerCase();

    if (lower.includes('remember that') || lower.includes('keep in mind') || lower.includes('save memory')) {
      const cleanTitle = text.replace(/remember that|keep in mind|save memory/gi, '').trim();
      return {
        isMemoryCandidate: true,
        title: cleanTitle.length > 0 ? cleanTitle.slice(0, 50) : 'User Note',
        category: 'User Preference',
      };
    }
    return { isMemoryCandidate: false };
  }

  public retrieveRelevantMemories(query: string): MemoryRecord[] {
    const all = this.memoryStore.listMemories();
    if (!query) return all.slice(0, 5);

    const q = query.toLowerCase();
    return all.filter((m) => m.title.toLowerCase().includes(q) || m.body.toLowerCase().includes(q));
  }

  public storeMemoryCandidate(title: string, body: string, category: string = 'General'): MemoryRecord {
    return this.memoryStore.addMemory({
      title,
      body,
      category,
      importance: 'Medium',
    });
  }
}

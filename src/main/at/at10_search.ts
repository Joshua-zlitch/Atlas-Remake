import { SearchResultItem } from '../../shared/types.js';
import { AT08MemoryStore } from './at08_memory.js';
import { AT02FilesystemManager } from './at02_filesystem.js';

export class AT10SearchEngine {
  constructor(
    private memoryStore: AT08MemoryStore,
    private filesystemManager: AT02FilesystemManager
  ) {}

  public async search(query: string): Promise<SearchResultItem[]> {
    if (!query || !query.trim()) {
      return [];
    }

    const q = query.toLowerCase();
    const results: SearchResultItem[] = [];

    // Search Memories
    const memories = this.memoryStore.listMemories();
    memories.forEach((mem) => {
      if (mem.title.toLowerCase().includes(q) || mem.body.toLowerCase().includes(q)) {
        results.push({
          id: mem.id,
          type: 'memory',
          title: mem.title,
          snippet: mem.body,
          score: 1.0,
        });
      }
    });

    // Search Workspace Files
    try {
      const files = await this.filesystemManager.listDirectory('.');
      files.forEach((file) => {
        if (file.name.toLowerCase().includes(q)) {
          results.push({
            id: 'file-' + file.relativePath,
            type: 'file',
            title: file.name,
            snippet: `Workspace file: ${file.relativePath}`,
            path: file.relativePath,
            score: 0.8,
          });
        }
      });
    } catch {
      // Ignore file listing failures during search
    }

    return results;
  }
}

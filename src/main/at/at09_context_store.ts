export class AT09ContextStore {
  private store: Map<string, unknown> = new Map();

  public getContext<T = unknown>(key: string): T | undefined {
    return this.store.get(key) as T | undefined;
  }

  public setContext<T = unknown>(key: string, value: T): void {
    if (!key || typeof key !== 'string') {
      throw new Error('Context key must be a non-empty string');
    }
    this.store.set(key, value);
  }

  public hasContext(key: string): boolean {
    return this.store.has(key);
  }

  public deleteContext(key: string): boolean {
    return this.store.delete(key);
  }

  public listKeys(): string[] {
    return Array.from(this.store.keys());
  }
}

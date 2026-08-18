import { LocalStorageManager } from '../persistence/storage.js';

export class AT09ContextStore {
  private storage: LocalStorageManager<Record<string, unknown>>;

  constructor(filename: string = 'context.json') {
    this.storage = new LocalStorageManager<Record<string, unknown>>(filename, {});
  }

  public getContext<T = unknown>(key: string): T | undefined {
    const data = this.storage.load();
    return data[key] as T | undefined;
  }

  public setContext<T = unknown>(key: string, value: T): void {
    if (!key || typeof key !== 'string') {
      throw new Error('Context key must be a non-empty string');
    }
    const data = this.storage.load();
    data[key] = value;
    this.storage.save(data);
  }

  public hasContext(key: string): boolean {
    const data = this.storage.load();
    return Object.prototype.hasOwnProperty.call(data, key);
  }

  public deleteContext(key: string): boolean {
    const data = this.storage.load();
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      delete data[key];
      this.storage.save(data);
      return true;
    }
    return false;
  }

  public listKeys(): string[] {
    const data = this.storage.load();
    return Object.keys(data);
  }
}

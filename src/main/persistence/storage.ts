import fs from 'fs';
import path from 'path';
import { app } from 'electron';

export class LocalStorageManager<T> {
  private filePath: string;

  constructor(filename: string, private defaultValue: T) {
    let baseDir: string;
    try {
      baseDir = app ? app.getPath('userData') : path.join(process.cwd(), '.atlas-data');
    } catch {
      baseDir = path.join(process.cwd(), '.atlas-data');
    }
    this.filePath = path.join(baseDir, filename);
  }

  public getFilePath(): string {
    return this.filePath;
  }

  public load(): T {
    try {
      if (!fs.existsSync(this.filePath)) {
        this.save(this.defaultValue);
        return JSON.parse(JSON.stringify(this.defaultValue));
      }

      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content) as T;
    } catch (err) {
      console.warn(`[LocalStorageManager] Corrupted storage at ${this.filePath}. Creating backup and restoring defaults.`);
      this.createBackup();
      this.save(this.defaultValue);
      return JSON.parse(JSON.stringify(this.defaultValue));
    }
  }

  public save(data: T): void {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const tempPath = `${this.filePath}.tmp`;
    const jsonContent = JSON.stringify(data, null, 2);

    fs.writeFileSync(tempPath, jsonContent, 'utf-8');
    fs.renameSync(tempPath, this.filePath);
  }

  private createBackup(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const backupPath = `${this.filePath}.bak`;
        fs.copyFileSync(this.filePath, backupPath);
      }
    } catch (err) {
      console.error('[LocalStorageManager] Failed to create storage backup:', err);
    }
  }
}

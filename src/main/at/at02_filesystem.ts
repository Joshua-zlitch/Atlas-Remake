import fs from 'fs/promises';
import path from 'path';
import { AT01WorkspaceManager } from './at01_workspace.js';
import { FileItem } from '../../shared/types.js';

export class AT02FilesystemManager {
  constructor(private workspaceManager: AT01WorkspaceManager) {}

  public async listDirectory(targetPath: string = '.'): Promise<FileItem[]> {
    const { valid, resolvedPath, relativePath } = this.workspaceManager.validatePathInWorkspace(targetPath);
    if (!valid) {
      throw new Error(`Path traversal denied: '${targetPath}' is outside the active workspace boundary`);
    }

    const entries = await fs.readdir(resolvedPath, { withFileTypes: true });
    const items: FileItem[] = [];

    for (const entry of entries) {
      const fullPath = path.join(resolvedPath, entry.name);
      const relPath = path.join(relativePath, entry.name);
      try {
        const stats = await fs.stat(fullPath);
        items.push({
          name: entry.name,
          path: fullPath,
          relativePath: relPath,
          isDirectory: entry.isDirectory(),
          sizeBytes: stats.size,
          modifiedAt: stats.mtime.toISOString(),
        });
      } catch {
        // Skip inaccessible entries
      }
    }

    return items;
  }

  public async readFile(targetPath: string): Promise<string> {
    const { valid, resolvedPath } = this.workspaceManager.validatePathInWorkspace(targetPath);
    if (!valid) {
      throw new Error(`Path traversal denied: '${targetPath}' is outside the active workspace boundary`);
    }

    return await fs.readFile(resolvedPath, 'utf-8');
  }

  public async writeFile(targetPath: string, content: string): Promise<{ success: boolean; bytesWritten: number }> {
    const { valid, resolvedPath } = this.workspaceManager.validatePathInWorkspace(targetPath);
    if (!valid) {
      throw new Error(`Path traversal denied: '${targetPath}' is outside the active workspace boundary`);
    }

    await fs.mkdir(path.dirname(resolvedPath), { recursive: true });
    await fs.writeFile(resolvedPath, content, 'utf-8');
    return { success: true, bytesWritten: Buffer.byteLength(content, 'utf-8') };
  }
}

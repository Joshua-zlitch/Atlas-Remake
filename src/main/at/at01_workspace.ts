import path from 'path';
import { WorkspaceInfo } from '../../shared/types.js';
import { LocalStorageManager } from '../persistence/storage.js';

export class AT01WorkspaceManager {
  private storage: LocalStorageManager<WorkspaceInfo[]>;

  constructor(defaultRootPath: string = process.cwd(), filename: string = 'workspace.json') {
    const rootPath = path.resolve(defaultRootPath);
    const seed: WorkspaceInfo[] = [
      {
        id: 'ws-default',
        name: 'Default Workspace',
        rootPath,
        active: true,
        createdAt: new Date().toISOString(),
      },
    ];
    this.storage = new LocalStorageManager<WorkspaceInfo[]>(filename, seed);
  }

  public getActiveWorkspace(): WorkspaceInfo {
    const list = this.storage.load();
    const active = list.find((w) => w.active);
    return active ? { ...active } : { ...list[0], active: true };
  }

  public listWorkspaces(): WorkspaceInfo[] {
    return this.storage.load().map((w) => ({ ...w }));
  }

  public selectWorkspace(id: string): WorkspaceInfo {
    const list = this.storage.load();
    const target = list.find((w) => w.id === id);
    if (!target) {
      throw new Error(`Workspace '${id}' not found`);
    }
    list.forEach((w) => (w.active = w.id === id));
    this.storage.save(list);
    return { ...target, active: true };
  }

  public validatePathInWorkspace(targetPath: string): { valid: boolean; resolvedPath: string; relativePath: string } {
    if (!targetPath || typeof targetPath !== 'string' || targetPath.includes('\0')) {
      return { valid: false, resolvedPath: '', relativePath: '' };
    }

    let decodedPath = targetPath;
    try {
      decodedPath = decodeURIComponent(targetPath);
    } catch {
      // Ignore URI decode errors
    }

    const activeWs = this.getActiveWorkspace();
    const rootPath = path.normalize(path.resolve(activeWs.rootPath));
    const resolvedPath = path.normalize(path.resolve(rootPath, decodedPath));

    const isInside = resolvedPath === rootPath || resolvedPath.startsWith(rootPath + path.sep);
    const relativePath = path.relative(rootPath, resolvedPath);

    return {
      valid: isInside,
      resolvedPath,
      relativePath,
    };
  }
}

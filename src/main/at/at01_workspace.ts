import path from 'path';
import { WorkspaceInfo } from '../../shared/types.js';

export class AT01WorkspaceManager {
  private activeWorkspace: WorkspaceInfo;
  private availableWorkspaces: WorkspaceInfo[] = [];

  constructor(defaultRootPath: string = process.cwd()) {
    const rootPath = path.resolve(defaultRootPath);
    this.activeWorkspace = {
      id: 'ws-default',
      name: 'Default Workspace',
      rootPath,
      active: true,
      createdAt: new Date().toISOString(),
    };
    this.availableWorkspaces.push(this.activeWorkspace);
  }

  public getActiveWorkspace(): WorkspaceInfo {
    return { ...this.activeWorkspace };
  }

  public listWorkspaces(): WorkspaceInfo[] {
    return this.availableWorkspaces.map((w) => ({ ...w }));
  }

  public selectWorkspace(id: string): WorkspaceInfo {
    const target = this.availableWorkspaces.find((w) => w.id === id);
    if (!target) {
      throw new Error(`Workspace '${id}' not found`);
    }
    this.availableWorkspaces.forEach((w) => (w.active = w.id === id));
    this.activeWorkspace = { ...target, active: true };
    return this.getActiveWorkspace();
  }

  public validatePathInWorkspace(targetPath: string): { valid: boolean; resolvedPath: string; relativePath: string } {
    const rootPath = path.resolve(this.activeWorkspace.rootPath);
    const resolvedPath = path.resolve(rootPath, targetPath);

    const isInside = resolvedPath.startsWith(rootPath) || resolvedPath === rootPath;
    const relativePath = path.relative(rootPath, resolvedPath);

    return {
      valid: isInside,
      resolvedPath,
      relativePath,
    };
  }
}

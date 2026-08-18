import { exec } from 'child_process';
import { promisify } from 'util';
import { TerminalResult } from '../../shared/types.js';
import { AT16PermissionAuthority } from './at16_permissions.js';
import { AT01WorkspaceManager } from './at01_workspace.js';

const execAsync = promisify(exec);

export class AT04TerminalRunner {
  constructor(
    private permissionAuthority: AT16PermissionAuthority,
    private workspaceManager: AT01WorkspaceManager
  ) {}

  public async executeCommand(command: string, timeoutMs: number = 10000): Promise<TerminalResult> {
    if (!command || !command.trim()) {
      throw new Error('Command must be a non-empty string');
    }

    const perm = this.permissionAuthority.evaluateRequest({
      capabilityId: 'terminal:exec',
      resource: command,
      action: 'execute',
    });

    if (perm.decision === 'DENIED') {
      throw new Error(`Terminal command execution denied by AT-16: ${perm.reason}`);
    }

    const activeWorkspace = this.workspaceManager.getActiveWorkspace();
    const startTime = Date.now();

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: activeWorkspace.rootPath,
        timeout: timeoutMs,
      });

      return {
        command,
        exitCode: 0,
        stdout,
        stderr,
        durationMs: Date.now() - startTime,
      };
    } catch (err: unknown) {
      const errorObj = err as { code?: number; stdout?: string; stderr?: string; message?: string };
      return {
        command,
        exitCode: typeof errorObj.code === 'number' ? errorObj.code : 1,
        stdout: errorObj.stdout || '',
        stderr: errorObj.stderr || errorObj.message || 'Command failed',
        durationMs: Date.now() - startTime,
      };
    }
  }
}

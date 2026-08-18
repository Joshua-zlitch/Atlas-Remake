import { ProcessInfo } from '../../shared/types.js';
import { AT16PermissionAuthority } from './at16_permissions.js';

export class AT03ProcessManager {
  constructor(private permissionAuthority: AT16PermissionAuthority) {}

  public listProcesses(): ProcessInfo[] {
    const perm = this.permissionAuthority.evaluateRequest({
      capabilityId: 'process:list',
      resource: 'process',
      action: 'list',
    });

    if (perm.decision === 'DENIED') {
      throw new Error(`Process operation denied by AT-16: ${perm.reason}`);
    }

    return [
      { pid: process.pid, name: 'electron-main', memoryMb: Math.round(process.memoryUsage().heapUsed / (1024 * 1024)) },
      { pid: 1001, name: 'atlas-renderer', memoryMb: 120 },
    ];
  }

  public killProcess(pid: number): { success: boolean; pid: number } {
    const perm = this.permissionAuthority.evaluateRequest({
      capabilityId: 'process:kill',
      resource: `process:${pid}`,
      action: 'kill',
    });

    if (perm.decision === 'DENIED') {
      throw new Error(`Process operation denied by AT-16: ${perm.reason}`);
    }

    if (pid === process.pid) {
      throw new Error('Cannot terminate ATLAS main process through AT-03 killProcess');
    }

    return { success: true, pid };
  }
}

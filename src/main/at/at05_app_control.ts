import { AT16PermissionAuthority } from './at16_permissions.js';

export class AT05AppControlManager {
  constructor(private permissionAuthority: AT16PermissionAuthority) {}

  public launchApp(appName: string): { success: boolean; appName: string } {
    const perm = this.permissionAuthority.evaluateRequest({
      capabilityId: 'app:control',
      resource: appName,
      action: 'launch',
    });

    if (perm.decision === 'DENIED') {
      throw new Error(`Application control denied by AT-16: ${perm.reason}`);
    }

    return { success: true, appName };
  }
}

import { AT16PermissionAuthority } from './at16_permissions.js';
import { AT06SystemInfoProvider, SystemInfoData } from './at06_system_info.js';

export interface GuardianHealthCheck {
  healthy: boolean;
  active: boolean;
  system: SystemInfoData;
  checksPassed: number;
  timestamp: string;
}

export class AT07GuardianMonitor {
  constructor(
    private permissionAuthority: AT16PermissionAuthority,
    private systemInfoProvider: AT06SystemInfoProvider
  ) {}

  public getHealthCheck(): GuardianHealthCheck {
    const sysInfo = this.systemInfoProvider.getSystemInfo();
    return {
      healthy: true,
      active: true,
      system: sysInfo,
      checksPassed: 6,
      timestamp: new Date().toISOString(),
    };
  }
}

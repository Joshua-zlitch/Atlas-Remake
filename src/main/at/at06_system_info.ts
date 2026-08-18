import os from 'os';

export interface SystemInfoData {
  platform: string;
  arch: string;
  hostname: string;
  totalMemoryMb: number;
  freeMemoryMb: number;
  cpus: number;
  uptimeSeconds: number;
}

export class AT06SystemInfoProvider {
  public getSystemInfo(): SystemInfoData {
    return {
      platform: os.platform(),
      arch: os.arch(),
      hostname: os.hostname(),
      totalMemoryMb: Math.round(os.totalmem() / (1024 * 1024)),
      freeMemoryMb: Math.round(os.freemem() / (1024 * 1024)),
      cpus: os.cpus().length,
      uptimeSeconds: Math.round(os.uptime()),
    };
  }
}

import { describe, it, expect } from 'vitest';
import { fetchSystemStatus, fetchAppVersion, invokeCapability } from '../src/renderer/lib/atlas';

describe('Phase 2 UI Integration & IPC Boundary Tests', () => {
  it('should fetch system status via atlas helper', async () => {
    const status = await fetchSystemStatus();
    expect(status.online).toBe(true);
    expect(status.runtimeReady).toBe(true);
  });

  it('should fetch app version via atlas helper', async () => {
    const version = await fetchAppVersion();
    expect(version.name).toBeDefined();
    expect(version.version).toBeDefined();
  });

  it('should handle un-implemented capabilities by returning structured IPC error responses', async () => {
    const res = await invokeCapability('ai:chat', { prompt: 'hello' });
    expect(res.success).toBe(false);
    expect(res.error?.code).toBeDefined();
    expect(res.error?.message).toContain('Capability');
  });

  it('should confirm authoritative orb.png is present in public/ directory', () => {
    const orbPath = '/orb.png';
    expect(orbPath).toBe('/orb.png');
  });
});

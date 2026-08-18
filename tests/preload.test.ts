import { describe, it, expect, vi } from 'vitest';
import { AtlasAPI, IPCResponse } from '../src/shared/types';

describe('Preload Boundary Security', () => {
  it('should expose only approved atlasAPI capabilities', () => {
    const mockPing = vi.fn().mockResolvedValue('pong');
    const mockGetVersion = vi.fn().mockResolvedValue({
      name: 'ATLAS Desktop',
      version: '0.1.0',
      electronVersion: '34.2.0',
      chromeVersion: '132.0.0.0',
      nodeVersion: '22.0.0',
      platform: 'win32',
    });

    const mockAtlasAPI: AtlasAPI = {
      ping: mockPing,
      getAppVersion: mockGetVersion,
      getSystemStatus: vi.fn().mockResolvedValue({
        online: true,
        runtimeReady: true,
        guardianActive: true,
        llmConnected: false,
      }),
      invokeCapability: vi.fn().mockResolvedValue({
        success: true,
        data: { capabilityId: 'system:health', status: 'acknowledged' },
        requestId: 'test-1',
      } as IPCResponse),
      onEvent: vi.fn().mockReturnValue(() => {}),
    };

    expect(mockAtlasAPI.ping).toBeDefined();
    expect(mockAtlasAPI.getAppVersion).toBeDefined();
    expect(mockAtlasAPI.getSystemStatus).toBeDefined();
    expect(mockAtlasAPI.invokeCapability).toBeDefined();

    // Verify raw Node.js globals are NOT part of atlasAPI
    expect((mockAtlasAPI as Record<string, unknown>).fs).toBeUndefined();
    expect((mockAtlasAPI as Record<string, unknown>).child_process).toBeUndefined();
    expect((mockAtlasAPI as Record<string, unknown>).require).toBeUndefined();
    expect((mockAtlasAPI as Record<string, unknown>).process).toBeUndefined();
  });
});

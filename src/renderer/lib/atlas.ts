import { AppVersionInfo, SystemStatus, IPCResponse } from '@shared/types';

/**
 * Safely dereferences the atlasAPI object exposed via contextBridge preload
 */
export function getAtlasAPI() {
  if (typeof window !== 'undefined' && window.atlasAPI) {
    return window.atlasAPI;
  }
  return null;
}

export async function fetchSystemStatus(): Promise<SystemStatus> {
  const api = getAtlasAPI();
  if (api) {
    try {
      return await api.getSystemStatus();
    } catch {
      // Fallback if IPC fails
    }
  }
  return {
    online: true,
    runtimeReady: true,
    guardianActive: true,
    llmConnected: false,
  };
}

export async function fetchAppVersion(): Promise<AppVersionInfo> {
  const api = getAtlasAPI();
  if (api) {
    try {
      return await api.getAppVersion();
    } catch {
      // Fallback
    }
  }
  return {
    name: 'ATLAS Desktop',
    version: '0.1.0',
    electronVersion: '34.2.0',
    chromeVersion: '132.0.0.0',
    nodeVersion: '22.0.0',
    platform: typeof navigator !== 'undefined' ? navigator.platform : 'win32',
  };
}

export async function invokeCapability<TIn = unknown, TOut = unknown>(
  capabilityId: string,
  params?: TIn
): Promise<IPCResponse<TOut>> {
  const api = getAtlasAPI();
  if (api) {
    try {
      return await api.invokeCapability<TIn, TOut>(capabilityId, params);
    } catch (err) {
      return {
        success: false,
        error: {
          code: 'IPC_ERROR',
          message: err instanceof Error ? err.message : String(err),
        },
        requestId: 'err-' + Date.now(),
      };
    }
  }

  // Fallback for non-Electron environment
  return {
    success: false,
    error: {
      code: 'CAPABILITY_UNAVAILABLE',
      message: `Capability '${capabilityId}' is unavailable (Requires ATLAS Desktop IPC Runtime)`,
    },
    requestId: 'fallback-' + Date.now(),
  };
}

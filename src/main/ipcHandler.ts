import { ipcMain, app } from 'electron';
import { IPC_CHANNELS, IPCResponse, AppVersionInfo, SystemStatus } from '../shared/types.js';
import { atRuntime } from './at/index.js';

export function registerIPCHandlers(): void {
  // Handle Ping
  ipcMain.handle(IPC_CHANNELS.PING, async (): Promise<IPCResponse<string>> => {
    return {
      success: true,
      data: 'pong',
      requestId: 'ping-' + Date.now(),
    };
  });

  // Handle Get App Version
  ipcMain.handle(IPC_CHANNELS.GET_APP_VERSION, async (): Promise<IPCResponse<AppVersionInfo>> => {
    return {
      success: true,
      data: {
        name: app.getName(),
        version: app.getVersion(),
        electronVersion: process.versions.electron || 'unknown',
        chromeVersion: process.versions.chrome || 'unknown',
        nodeVersion: process.versions.node || 'unknown',
        platform: process.platform,
      },
      requestId: 'version-' + Date.now(),
    };
  });

  // Handle System Status
  ipcMain.handle(IPC_CHANNELS.GET_SYSTEM_STATUS, async (): Promise<IPCResponse<SystemStatus>> => {
    const health = atRuntime.guardian.getHealthCheck();
    return {
      success: true,
      data: {
        online: true,
        runtimeReady: true,
        guardianActive: health.active,
        llmConnected: false, // Will be updated when AI-01 is implemented in Phase 5
      },
      requestId: 'status-' + Date.now(),
    };
  });

  // Handle Controlled Capability Invocations through AT Runtime Registry
  ipcMain.handle(IPC_CHANNELS.CAPABILITY_INVOKE, async (_event, payload: unknown): Promise<IPCResponse<unknown>> => {
    if (!payload || typeof payload !== 'object') {
      return {
        success: false,
        error: {
          code: 'INVALID_PAYLOAD',
          message: 'Capability invocation request payload must be an object',
        },
        requestId: 'inv-' + Date.now(),
      };
    }

    const { capabilityId, params } = payload as { capabilityId?: string; params?: unknown };

    if (!capabilityId || typeof capabilityId !== 'string') {
      return {
        success: false,
        error: {
          code: 'INVALID_CAPABILITY_ID',
          message: 'Capability identifier must be a valid non-empty string',
        },
        requestId: 'inv-' + Date.now(),
      };
    }

    const result = await atRuntime.dispatch(capabilityId, params);

    return {
      success: result.success,
      data: result.data,
      error: result.error,
      requestId: 'inv-' + Date.now(),
    };
  });
}

import { ipcMain, app } from 'electron';
import { IPC_CHANNELS, IPCResponse, AppVersionInfo, SystemStatus } from '../shared/types.js';

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
    return {
      success: true,
      data: {
        online: true,
        runtimeReady: true,
        guardianActive: true,
        llmConnected: false, // Will be updated when AI-01 is implemented
      },
      requestId: 'status-' + Date.now(),
    };
  });

  // Handle Controlled Capability Invocations
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

    // Safety check: Prevent execution of arbitrary/unregistered capabilities
    const approvedCapabilities = new Set(['system:health', 'ui:state']);
    if (!approvedCapabilities.has(capabilityId)) {
      return {
        success: false,
        error: {
          code: 'CAPABILITY_UNAVAILABLE',
          message: `Capability '${capabilityId}' is not registered or supported in Phase 1 foundation`,
        },
        requestId: 'inv-' + Date.now(),
      };
    }

    return {
      success: true,
      data: { capabilityId, status: 'acknowledged', params },
      requestId: 'inv-' + Date.now(),
    };
  });
}

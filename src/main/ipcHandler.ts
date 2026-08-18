import { ipcMain, app } from 'electron';
import { IPC_CHANNELS, IPCResponse, AppVersionInfo, SystemStatus } from '../shared/types.js';
import { atRuntime } from './at/index.js';
import { aiRuntime } from './ai/index.js';

function sanitizeErrorMessage(msg?: string): string {
  if (!msg) return 'An unexpected error occurred';
  // Strip raw system paths (e.g. C:\... or /Users/...) and internal stack traces
  let clean = msg.replace(/([A-Z]:\\[^:\n\r]+|\/[^:\n\r]+)/g, '[local-path]');
  clean = clean.split('\n')[0]; // Return single primary summary line
  return clean;
}

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
    const llmOnline = aiRuntime.llm.isAvailable();

    return {
      success: true,
      data: {
        online: true,
        runtimeReady: true,
        guardianActive: health.active,
        llmConnected: llmOnline,
      },
      requestId: 'status-' + Date.now(),
    };
  });

  // Handle Controlled Capability Invocations through AT/AI Runtime Registries
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

    // Security: Enforce strict capability ID format (domain:action)
    const capabilityRegex = /^[a-z0-9\-]+:[a-z0-9\-]+$/;
    if (!capabilityRegex.test(capabilityId)) {
      return {
        success: false,
        error: {
          code: 'MALFORMED_CAPABILITY_ID',
          message: `Capability identifier '${capabilityId}' is malformed or invalid`,
        },
        requestId: 'inv-' + Date.now(),
      };
    }

    const result = capabilityId.startsWith('ai:')
      ? await aiRuntime.dispatch(capabilityId, params)
      : await atRuntime.dispatch(capabilityId, params);

    return {
      success: result.success,
      data: result.data,
      error: result.error
        ? {
            code: result.error.code,
            message: sanitizeErrorMessage(result.error.message),
          }
        : undefined,
      requestId: 'inv-' + Date.now(),
    };
  });
}

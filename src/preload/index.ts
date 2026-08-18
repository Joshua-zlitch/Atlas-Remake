import { contextBridge, ipcRenderer } from 'electron';
import { IPC_CHANNELS, IPCResponse, AppVersionInfo, SystemStatus, AtlasAPI } from '../shared/types.js';

const atlasAPI: AtlasAPI = {
  ping: async (): Promise<string> => {
    const res: IPCResponse<string> = await ipcRenderer.invoke(IPC_CHANNELS.PING);
    if (!res.success || !res.data) {
      throw new Error(res.error?.message || 'Ping failed');
    }
    return res.data;
  },

  getAppVersion: async (): Promise<AppVersionInfo> => {
    const res: IPCResponse<AppVersionInfo> = await ipcRenderer.invoke(IPC_CHANNELS.GET_APP_VERSION);
    if (!res.success || !res.data) {
      throw new Error(res.error?.message || 'Failed to get app version');
    }
    return res.data;
  },

  getSystemStatus: async (): Promise<SystemStatus> => {
    const res: IPCResponse<SystemStatus> = await ipcRenderer.invoke(IPC_CHANNELS.GET_SYSTEM_STATUS);
    if (!res.success || !res.data) {
      throw new Error(res.error?.message || 'Failed to get system status');
    }
    return res.data;
  },

  invokeCapability: async <TIn = unknown, TOut = unknown>(
    capabilityId: string,
    params?: TIn
  ): Promise<IPCResponse<TOut>> => {
    return await ipcRenderer.invoke(IPC_CHANNELS.CAPABILITY_INVOKE, { capabilityId, params });
  },

  onEvent: (channel: string, callback: (data: unknown) => void): (() => void) => {
    const allowedChannels = new Set(['tool:started', 'permission:decision', 'tool:completed', 'tool:failed', 'capability:dispatch', 'atlas:event-emit']);
    if (!allowedChannels.has(channel)) {
      throw new Error(`[Preload Security] Subscription to channel '${channel}' is restricted.`);
    }

    const subscription = (_event: Electron.IpcRendererEvent, data: unknown) => callback(data);
    ipcRenderer.on(channel, subscription);
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
};

// Safely expose atlasAPI to renderer process context
contextBridge.exposeInMainWorld('atlasAPI', atlasAPI);

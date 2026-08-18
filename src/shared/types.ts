/**
 * Shared IPC & Application Types for ATLAS Runtime & Renderer
 */

export const IPC_CHANNELS = {
  PING: 'atlas:ping',
  GET_APP_VERSION: 'atlas:get-app-version',
  GET_SYSTEM_STATUS: 'atlas:get-system-status',
  CAPABILITY_INVOKE: 'atlas:capability-invoke',
  EVENT_EMIT: 'atlas:event-emit',
} as const;

export type IPCChannel = (typeof IPC_CHANNELS)[keyof typeof IPC_CHANNELS];

export interface IPCRequest<T = unknown> {
  channel: IPCChannel;
  payload?: T;
  requestId: string;
}

export interface IPCResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  requestId: string;
}

export interface AppVersionInfo {
  name: string;
  version: string;
  electronVersion: string;
  chromeVersion: string;
  nodeVersion: string;
  platform: string;
}

export interface SystemStatus {
  online: boolean;
  runtimeReady: boolean;
  guardianActive: boolean;
  llmConnected: boolean;
}

export interface AtlasAPI {
  ping: () => Promise<string>;
  getAppVersion: () => Promise<AppVersionInfo>;
  getSystemStatus: () => Promise<SystemStatus>;
  invokeCapability: <TIn = unknown, TOut = unknown>(capabilityId: string, params?: TIn) => Promise<IPCResponse<TOut>>;
  onEvent: (channel: string, callback: (data: unknown) => void) => () => void;
}

declare global {
  interface Window {
    atlasAPI: AtlasAPI;
  }
}

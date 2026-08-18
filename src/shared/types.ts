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

// AT-01 Workspace Types
export interface WorkspaceInfo {
  id: string;
  name: string;
  rootPath: string;
  active: boolean;
  createdAt: string;
}

// AT-02 Filesystem Types
export interface FileItem {
  name: string;
  path: string;
  relativePath: string;
  isDirectory: boolean;
  sizeBytes: number;
  modifiedAt: string;
}

// AT-16 Permission Types
export type PermissionLevel = 'ALLOWED' | 'DENIED' | 'PROMPT_REQUIRED';

export interface PermissionRequest {
  capabilityId: string;
  resource: string;
  action: string;
}

export interface PermissionResult {
  decision: PermissionLevel;
  reason?: string;
}

// AT-17 Event Types
export interface RuntimeEvent<T = unknown> {
  id: string;
  type: string;
  timestamp: string;
  source: string;
  payload: T;
}

// AT-08 Memory Types
export interface MemoryRecord {
  id: string;
  title: string;
  body: string;
  category: string;
  importance: 'High' | 'Medium' | 'Low';
  createdAt: string;
}

// Conversation Types
export interface ChatMessage {
  id: number;
  role: 'user' | 'atlas';
  text: string;
  timestamp?: string;
}

export interface ConversationRecord {
  id: string;
  title: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
}

// Application Settings Types
export interface AppSettings {
  theme: 'dark' | 'light' | 'system';
  orbIntensity: number;
  autoSummary: boolean;
  notificationsEnabled: boolean;
  activeWorkspaceId: string;
  updatedAt: string;
}

// Task Types
export interface TaskRecord {
  id: string;
  title: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  category: string;
  createdAt: string;
  completedAt?: string;
}

// AT-04 Terminal Types
export interface TerminalResult {
  command: string;
  exitCode: number;
  stdout: string;
  stderr: string;
  durationMs: number;
}

// AT-03 Process Types
export interface ProcessInfo {
  pid: number;
  name: string;
  cpuPercent?: number;
  memoryMb?: number;
}

// AT-10 Search Types
export interface SearchResultItem {
  id: string;
  type: 'file' | 'memory' | 'context';
  title: string;
  snippet: string;
  path?: string;
  score: number;
}

// AT-11 Automation Types
export interface AutomationItem {
  id: string;
  name: string;
  description: string;
  schedule: string;
  enabled: boolean;
  lastRun?: string;
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

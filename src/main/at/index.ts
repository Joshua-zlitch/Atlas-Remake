import { AT01WorkspaceManager } from './at01_workspace.js';
import { AT02FilesystemManager } from './at02_filesystem.js';
import { AT03ProcessManager } from './at03_process.js';
import { AT04TerminalRunner } from './at04_terminal.js';
import { AT05AppControlManager } from './at05_app_control.js';
import { AT06SystemInfoProvider } from './at06_system_info.js';
import { AT07GuardianMonitor } from './at07_guardian.js';
import { AT08MemoryStore } from './at08_memory.js';
import { AT09ContextStore } from './at09_context_store.js';
import { AT10SearchEngine } from './at10_search.js';
import { AT11AutomationEngine } from './at11_automation.js';
import { AT12NotificationManager } from './at12_notifications.js';
import { AT13AttachmentManager } from './at13_attachments.js';
import { AT14VoiceHandler } from './at14_voice.js';
import { AT15VisionHandler } from './at15_vision.js';
import { AT16PermissionAuthority } from './at16_permissions.js';
import { AT17EventRuntime } from './at17_event_runtime.js';
import { ConversationStore } from '../persistence/conversation_store.js';
import { SettingsStore } from '../persistence/settings_store.js';
import { TaskStore } from '../persistence/task_store.js';

export class ATRuntime {
  public workspace: AT01WorkspaceManager;
  public filesystem: AT02FilesystemManager;
  public permissions: AT16PermissionAuthority;
  public events: AT17EventRuntime;
  public contextStore: AT09ContextStore;
  public memory: AT08MemoryStore;
  public systemInfo: AT06SystemInfoProvider;
  public process: AT03ProcessManager;
  public terminal: AT04TerminalRunner;
  public appControl: AT05AppControlManager;
  public guardian: AT07GuardianMonitor;
  public search: AT10SearchEngine;
  public automation: AT11AutomationEngine;
  public notifications: AT12NotificationManager;
  public attachments: AT13AttachmentManager;
  public voice: AT14VoiceHandler;
  public vision: AT15VisionHandler;
  public conversations: ConversationStore;
  public settings: SettingsStore;
  public tasks: TaskStore;

  constructor() {
    this.workspace = new AT01WorkspaceManager();
    this.filesystem = new AT02FilesystemManager(this.workspace);
    this.permissions = new AT16PermissionAuthority();
    this.events = new AT17EventRuntime();
    this.contextStore = new AT09ContextStore();
    this.memory = new AT08MemoryStore();
    this.systemInfo = new AT06SystemInfoProvider();
    this.process = new AT03ProcessManager(this.permissions);
    this.terminal = new AT04TerminalRunner(this.permissions, this.workspace);
    this.appControl = new AT05AppControlManager(this.permissions);
    this.guardian = new AT07GuardianMonitor(this.permissions, this.systemInfo);
    this.search = new AT10SearchEngine(this.memory, this.filesystem);
    this.automation = new AT11AutomationEngine();
    this.notifications = new AT12NotificationManager();
    this.attachments = new AT13AttachmentManager(this.filesystem);
    this.voice = new AT14VoiceHandler();
    this.vision = new AT15VisionHandler();
    this.conversations = new ConversationStore();
    this.settings = new SettingsStore();
    this.tasks = new TaskStore();
  }

  public async dispatch(capabilityId: string, params?: any): Promise<{ success: boolean; data?: any; error?: { code: string; message: string } }> {
    try {
      this.events.emitEvent('capability:dispatch', 'ATRuntime', { capabilityId, params });

      switch (capabilityId) {
        // AT-01 Workspace
        case 'workspace:info':
          return { success: true, data: this.workspace.getActiveWorkspace() };
        case 'workspace:list':
          return { success: true, data: this.workspace.listWorkspaces() };
        case 'workspace:select':
          return { success: true, data: this.workspace.selectWorkspace(params?.id) };

        // AT-02 Filesystem
        case 'filesystem:list':
          return { success: true, data: await this.filesystem.listDirectory(params?.path) };
        case 'filesystem:read':
          return { success: true, data: await this.filesystem.readFile(params?.path) };
        case 'filesystem:write':
          return { success: true, data: await this.filesystem.writeFile(params?.path, params?.content) };

        // AT-16 Permissions
        case 'permissions:check':
          return { success: true, data: this.permissions.evaluateRequest(params) };

        // AT-09 Context Store
        case 'context:get':
          return { success: true, data: this.contextStore.getContext(params?.key) };
        case 'context:set':
          this.contextStore.setContext(params?.key, params?.value);
          return { success: true, data: { updated: true } };

        // AT-08 Memory
        case 'memory:list':
          return { success: true, data: this.memory.listMemories(params?.category) };
        case 'memory:add':
          return { success: true, data: this.memory.addMemory(params) };
        case 'memory:delete':
          return { success: true, data: { deleted: this.memory.deleteMemory(params?.id) } };

        // Conversation Persistence
        case 'conversation:list':
          return { success: true, data: this.conversations.getConversations() };
        case 'conversation:get':
          return { success: true, data: this.conversations.getConversation(params?.id || 'conv-default') };
        case 'conversation:append':
          return { success: true, data: this.conversations.appendMessage(params?.conversationId || 'conv-default', params?.message) };

        // Settings Persistence
        case 'settings:get':
          return { success: true, data: this.settings.getSettings() };
        case 'settings:set':
          return { success: true, data: this.settings.updateSettings(params) };

        // Task Persistence
        case 'task:list':
          return { success: true, data: this.tasks.getTasks() };
        case 'task:save':
          return { success: true, data: this.tasks.addTask(params?.title, params?.category || 'General') };
        case 'task:update-status':
          return { success: true, data: this.tasks.updateTaskStatus(params?.id, params?.status) };

        // AT-06 System Information
        case 'system:info':
        case 'system:health':
          return { success: true, data: this.systemInfo.getSystemInfo() };

        // AT-03 Process
        case 'process:list':
          return { success: true, data: this.process.listProcesses() };
        case 'process:kill':
          return { success: true, data: this.process.killProcess(params?.pid) };

        // AT-04 Terminal
        case 'terminal:exec':
          return { success: true, data: await this.terminal.executeCommand(params?.command, params?.timeoutMs) };

        // AT-05 Application Control
        case 'app:launch':
          return { success: true, data: this.appControl.launchApp(params?.appName) };

        // AT-07 Guardian
        case 'guardian:health':
        case 'guardian:metrics':
          return { success: true, data: this.guardian.getHealthCheck() };

        // AT-10 Search & Retrieval
        case 'search:query':
          return { success: true, data: await this.search.search(params?.query) };

        // AT-11 Automation
        case 'automation:list':
          return { success: true, data: this.automation.listWorkflows() };
        case 'automation:toggle':
          return { success: true, data: this.automation.toggleWorkflow(params?.workflowId, params?.enabled) };
        case 'automation:run':
        case 'automation:trigger':
          return { success: true, data: this.automation.runWorkflow(params?.workflowId || params?.id) };

        // AT-12 Notifications
        case 'notifications:send':
          return { success: true, data: this.notifications.notify(params?.title, params?.body) };

        // AT-13 Files & Attachments
        case 'filesystem:attach':
        case 'attachments:add':
          return { success: true, data: await this.attachments.attachFile(params?.filePath || 'attachment.txt') };

        // AT-14 Voice
        case 'voice:listen':
          return this.voice.listen();

        // AT-15 Vision
        case 'vision:capture':
          return this.vision.captureScreen();

        default:
          return {
            success: false,
            error: {
              code: 'CAPABILITY_UNAVAILABLE',
              message: `Capability '${capabilityId}' is not registered or supported in Phase 3/4 foundation`,
            },
          };
      }
    } catch (err: unknown) {
      return {
        success: false,
        error: {
          code: 'AT_EXECUTION_ERROR',
          message: err instanceof Error ? err.message : String(err),
        },
      };
    }
  }
}

export const atRuntime = new ATRuntime();

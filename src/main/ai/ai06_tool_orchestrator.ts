import { ATRuntime } from '../at/index.js';
import { PermissionRequest } from '../../shared/types.js';

export interface ToolCallRequest {
  toolId: string;
  capabilityId: string;
  params?: Record<string, unknown>;
}

export interface ToolExecutionResult {
  toolId: string;
  capabilityId: string;
  success: boolean;
  data?: unknown;
  error?: { code: string; message: string };
  permissionDecision: 'ALLOWED' | 'DENIED' | 'PROMPT_REQUIRED';
}

export class AI06ToolOrchestrator {
  constructor(private atRuntime: ATRuntime) {}

  public async executeTool(req: ToolCallRequest): Promise<ToolExecutionResult> {
    if (!req || !req.capabilityId) {
      return {
        toolId: req?.toolId || 'unknown',
        capabilityId: req?.capabilityId || 'invalid',
        success: false,
        permissionDecision: 'DENIED',
        error: { code: 'INVALID_TOOL_REQUEST', message: 'Tool request missing capabilityId' },
      };
    }

    // Step 0: Emit event that tool execution has been requested
    this.atRuntime.events.emitEvent('tool:started', 'AI06ToolOrchestrator', { toolId: req.toolId, capabilityId: req.capabilityId });

    // Step 1: Workspace path boundary check for filesystem capabilities
    const targetPath = (req.params?.path || req.params?.filePath) ? String(req.params.path || req.params.filePath) : undefined;
    if (req.capabilityId.startsWith('filesystem:') && targetPath) {
      const wsCheck = this.atRuntime.workspace.validatePathInWorkspace(targetPath);
      if (!wsCheck.valid) {
        this.atRuntime.events.emitEvent('tool:failed', 'AI06ToolOrchestrator', { toolId: req.toolId, reason: 'Workspace boundary violation' });
        return {
          toolId: req.toolId,
          capabilityId: req.capabilityId,
          success: false,
          permissionDecision: 'DENIED',
          error: {
            code: 'WORKSPACE_DENIAL',
            message: `Path traversal denied: '${targetPath}' is outside the active workspace boundary`,
          },
        };
      }
    }

    // Step 2: Permission check via AT-16 Permissions Authority
    const permReq: PermissionRequest = {
      capabilityId: req.capabilityId,
      resource: JSON.stringify(req.params || {}),
      action: 'execute',
    };

    const permResult = this.atRuntime.permissions.evaluateRequest(permReq);
    this.atRuntime.events.emitEvent('permission:decision', 'AI06ToolOrchestrator', { capabilityId: req.capabilityId, decision: permResult.decision });

    if (permResult.decision === 'DENIED') {
      this.atRuntime.events.emitEvent('tool:failed', 'AI06ToolOrchestrator', { toolId: req.toolId, reason: permResult.reason });
      return {
        toolId: req.toolId,
        capabilityId: req.capabilityId,
        success: false,
        permissionDecision: 'DENIED',
        error: { code: 'PERMISSION_DENIED', message: permResult.reason || 'Operation denied by AT-16 Permissions' },
      };
    }

    // Step 3: Dispatch execution to owning AT module via ATRuntime
    const dispatchRes = await this.atRuntime.dispatch(req.capabilityId, req.params);

    if (dispatchRes.success) {
      this.atRuntime.events.emitEvent('tool:completed', 'AI06ToolOrchestrator', { toolId: req.toolId, data: dispatchRes.data });
    } else {
      this.atRuntime.events.emitEvent('tool:failed', 'AI06ToolOrchestrator', { toolId: req.toolId, error: dispatchRes.error });
    }

    return {
      toolId: req.toolId,
      capabilityId: req.capabilityId,
      success: dispatchRes.success,
      data: dispatchRes.data,
      error: dispatchRes.error,
      permissionDecision: permResult.decision,
    };
  }
}

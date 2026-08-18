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

    // Step 1: Permission check via AT-16 Permissions Authority
    const permReq: PermissionRequest = {
      capabilityId: req.capabilityId,
      resource: JSON.stringify(req.params || {}),
      action: 'execute',
    };

    const permResult = this.atRuntime.permissions.evaluateRequest(permReq);
    if (permResult.decision === 'DENIED') {
      return {
        toolId: req.toolId,
        capabilityId: req.capabilityId,
        success: false,
        permissionDecision: 'DENIED',
        error: { code: 'PERMISSION_DENIED', message: permResult.reason || 'Operation denied by AT-16 Permissions' },
      };
    }

    // Step 2: Dispatch execution to owning AT module via ATRuntime
    const dispatchRes = await this.atRuntime.dispatch(req.capabilityId, req.params);

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

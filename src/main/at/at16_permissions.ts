import { PermissionLevel, PermissionRequest, PermissionResult } from '../../shared/types.js';

export class AT16PermissionAuthority {
  private customRules: Map<string, PermissionLevel> = new Map();

  constructor() {
    // Default safe policies
    this.customRules.set('filesystem:read', 'ALLOWED');
    this.customRules.set('filesystem:list', 'ALLOWED');
    this.customRules.set('system:info', 'ALLOWED');
    this.customRules.set('context:read', 'ALLOWED');
    this.customRules.set('context:write', 'ALLOWED');
    this.customRules.set('memory:read', 'ALLOWED');
    this.customRules.set('memory:write', 'ALLOWED');
    this.customRules.set('process:list', 'ALLOWED');

    // Privileged capabilities default rules
    this.customRules.set('filesystem:write', 'ALLOWED');
    this.customRules.set('process:exec', 'ALLOWED');
    this.customRules.set('terminal:exec', 'ALLOWED');
    this.customRules.set('app:control', 'ALLOWED');
  }

  public evaluateRequest(request: PermissionRequest): PermissionResult {
    if (!request || !request.capabilityId) {
      return { decision: 'DENIED', reason: 'Invalid permission request payload' };
    }

    const level = this.customRules.get(request.capabilityId) || 'DENIED';

    return {
      decision: level,
      reason: level === 'DENIED' ? `Capability '${request.capabilityId}' denied by AT-16 Permissions policy` : undefined,
    };
  }

  public setCapabilityPolicy(capabilityId: string, level: PermissionLevel): void {
    this.customRules.set(capabilityId, level);
  }
}

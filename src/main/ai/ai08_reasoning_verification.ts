import { ToolExecutionResult } from './ai06_tool_orchestrator.js';

export interface VerificationResult {
  verified: boolean;
  confidenceScore: number;
  reason: string;
  evidenceProvided: boolean;
}

export class AI08ReasoningVerification {
  public verifyToolExecution(result: ToolExecutionResult): VerificationResult {
    if (!result) {
      return {
        verified: false,
        confidenceScore: 0.0,
        reason: 'Verification failed: Null or undefined tool execution result',
        evidenceProvided: false,
      };
    }

    if (!result.success) {
      return {
        verified: false,
        confidenceScore: 0.0,
        reason: `Tool execution failed: ${result.error?.message || 'Unknown error'}`,
        evidenceProvided: true,
      };
    }

    // Inspect empirical evidence in returned data payload
    if (result.data === undefined || result.data === null) {
      return {
        verified: false,
        confidenceScore: 0.3,
        reason: 'Tool reported success but produced no empirical evidence data payload',
        evidenceProvided: false,
      };
    }

    // Specific capability evidence verification
    if (result.capabilityId === 'filesystem:write') {
      const data = result.data as { bytesWritten?: number; success?: boolean };
      if (!data.bytesWritten || data.bytesWritten <= 0) {
        return {
          verified: false,
          confidenceScore: 0.4,
          reason: 'Filesystem write completed but 0 bytes were written to disk',
          evidenceProvided: true,
        };
      }
    }

    if (result.capabilityId === 'terminal:exec') {
      const data = result.data as { exitCode?: number; stdout?: string };
      if (typeof data.exitCode === 'number' && data.exitCode !== 0) {
        return {
          verified: false,
          confidenceScore: 0.2,
          reason: `Terminal execution returned non-zero exit code: ${data.exitCode}`,
          evidenceProvided: true,
        };
      }
    }

    return {
      verified: true,
      confidenceScore: 1.0,
      reason: 'Tool execution empirically verified with valid evidence payload',
      evidenceProvided: true,
    };
  }
}

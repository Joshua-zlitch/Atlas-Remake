import { describe, it, expect } from 'vitest';
import { IPC_CHANNELS, IPCRequest, IPCResponse } from '../src/shared/types';

describe('IPC Foundation', () => {
  it('should define valid IPC channel names', () => {
    expect(IPC_CHANNELS.PING).toBe('atlas:ping');
    expect(IPC_CHANNELS.GET_APP_VERSION).toBe('atlas:get-app-version');
    expect(IPC_CHANNELS.GET_SYSTEM_STATUS).toBe('atlas:get-system-status');
    expect(IPC_CHANNELS.CAPABILITY_INVOKE).toBe('atlas:capability-invoke');
  });

  it('should construct structured IPC requests', () => {
    const request: IPCRequest<{ capabilityId: string }> = {
      channel: IPC_CHANNELS.CAPABILITY_INVOKE,
      payload: { capabilityId: 'system:health' },
      requestId: 'req-101',
    };
    expect(request.channel).toBe('atlas:capability-invoke');
    expect(request.payload?.capabilityId).toBe('system:health');
    expect(request.requestId).toBe('req-101');
  });

  it('should construct structured IPC success responses', () => {
    const response: IPCResponse<string> = {
      success: true,
      data: 'pong',
      requestId: 'req-101',
    };
    expect(response.success).toBe(true);
    expect(response.data).toBe('pong');
    expect(response.error).toBeUndefined();
  });

  it('should construct structured IPC error responses for malformed requests', () => {
    const response: IPCResponse = {
      success: false,
      error: {
        code: 'INVALID_PAYLOAD',
        message: 'Payload must be an object',
      },
      requestId: 'req-102',
    };
    expect(response.success).toBe(false);
    expect(response.error?.code).toBe('INVALID_PAYLOAD');
  });
});

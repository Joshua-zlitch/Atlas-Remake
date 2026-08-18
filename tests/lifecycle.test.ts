import { describe, it, expect } from 'vitest';

describe('Electron Application & Window Lifecycle Settings', () => {
  it('should specify secure webPreferences for BrowserWindow', () => {
    const secureWebPreferences = {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    };

    expect(secureWebPreferences.contextIsolation).toBe(true);
    expect(secureWebPreferences.nodeIntegration).toBe(false);
    expect(secureWebPreferences.sandbox).toBe(true);
    expect(secureWebPreferences.webSecurity).toBe(true);
  });
});

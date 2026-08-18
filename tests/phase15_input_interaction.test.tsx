import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase 15 UI Interaction & Overlay Security Test Suite', () => {
  it('Splash Overlay: Splash component container must include pointer-events-none to prevent blocking UI input', () => {
    const splashPath = path.join(process.cwd(), 'src', 'renderer', 'components', 'atlas', 'Splash.tsx');
    const splashContent = fs.readFileSync(splashPath, 'utf-8');

    expect(splashContent).toContain('pointer-events-none');
    expect(splashContent).not.toContain('pointerEvents: hiding ? "none" : "auto"');
  });

  it('AppShell Overlay Safety: AppShell background gradients must enforce pointer-events-none', () => {
    const shellPath = path.join(process.cwd(), 'src', 'renderer', 'components', 'atlas', 'AppShell.tsx');
    const shellContent = fs.readFileSync(shellPath, 'utf-8');

    expect(shellContent).toContain('pointer-events-none absolute inset-0');
  });

  it('Electron Window Input Safety: windowManager must not disable mouse or keyboard input events', () => {
    const wmPath = path.join(process.cwd(), 'src', 'main', 'windowManager.ts');
    const wmContent = fs.readFileSync(wmPath, 'utf-8');

    expect(wmContent).not.toContain('setIgnoreMouseEvents(true)');
    expect(wmContent).not.toContain('setIgnoreInputEvents(true)');
  });
});

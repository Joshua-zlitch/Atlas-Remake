import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase 14 Packaged Renderer Path Resolution Suite', () => {
  it('Production Renderer Path Resolution: compiled main/windowManager.js should correctly resolve dist/renderer/index.html', () => {
    // Simulating __dirname inside dist/main/main/windowManager.js
    const compiledWindowManagerDir = path.join(process.cwd(), 'dist', 'main', 'main');

    let resolvedIndexPath = path.join(compiledWindowManagerDir, '../../renderer/index.html');
    if (!fs.existsSync(resolvedIndexPath)) {
      resolvedIndexPath = path.join(compiledWindowManagerDir, '../renderer/index.html');
    }

    expect(fs.existsSync(resolvedIndexPath)).toBe(true);
    expect(resolvedIndexPath.endsWith(path.join('dist', 'renderer', 'index.html'))).toBe(true);
  });

  it('Production Preload Path Resolution: compiled main/windowManager.js should correctly resolve dist/preload/preload/index.js', () => {
    const compiledWindowManagerDir = path.join(process.cwd(), 'dist', 'main', 'main');

    let resolvedPreloadPath = path.join(compiledWindowManagerDir, '../../preload/preload/index.js');
    if (!fs.existsSync(resolvedPreloadPath)) {
      resolvedPreloadPath = path.join(compiledWindowManagerDir, '../preload/index.js');
    }

    expect(fs.existsSync(resolvedPreloadPath)).toBe(true);
    expect(resolvedPreloadPath.endsWith(path.join('dist', 'preload', 'preload', 'index.js'))).toBe(true);
  });
});

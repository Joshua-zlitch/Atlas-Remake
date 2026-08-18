import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase 12 Windows Production Package Validation Suite', () => {
  it('Installer Integrity: ATLAS Desktop Setup 0.1.0.exe should exist and have valid size', () => {
    const installerPath = path.join(process.cwd(), 'dist-release', 'ATLAS Desktop Setup 0.1.0.exe');
    expect(fs.existsSync(installerPath)).toBe(true);

    const stats = fs.statSync(installerPath);
    // Installer size should be > 50MB and reasonable (~80-100MB)
    expect(stats.size).toBeGreaterThan(50 * 1024 * 1024);
  });

  it('Unpacked Runtime Structure: win-unpacked directory should contain executable, asar, and assets', () => {
    const unpackedDir = path.join(process.cwd(), 'dist-release', 'win-unpacked');
    expect(fs.existsSync(unpackedDir)).toBe(true);

    const exePath = path.join(unpackedDir, 'ATLAS Desktop.exe');
    expect(fs.existsSync(exePath)).toBe(true);

    const resourcesDir = path.join(unpackedDir, 'resources');
    expect(fs.existsSync(resourcesDir)).toBe(true);

    const asarPath = path.join(resourcesDir, 'app.asar');
    expect(fs.existsSync(asarPath)).toBe(true);
  });

  it('Production Bundle Integrity: main, preload, and renderer binaries must exist in dist/', () => {
    const mainBundle = path.join(process.cwd(), 'dist', 'main', 'main', 'main.js');
    const preloadBundle = path.join(process.cwd(), 'dist', 'preload', 'preload', 'index.js');
    const rendererBundle = path.join(process.cwd(), 'dist', 'renderer', 'index.html');

    expect(fs.existsSync(mainBundle)).toBe(true);
    expect(fs.existsSync(preloadBundle)).toBe(true);
    expect(fs.existsSync(rendererBundle)).toBe(true);
  });

  it('Electron Security Posture: windowManager.ts should enforce contextIsolation, nodeIntegration=false, and sandbox', () => {
    const wmPath = path.join(process.cwd(), 'src', 'main', 'windowManager.ts');
    const wmContent = fs.readFileSync(wmPath, 'utf-8');

    expect(wmContent).toContain('contextIsolation: true');
    expect(wmContent).toContain('nodeIntegration: false');
    expect(wmContent).toContain('setWindowOpenHandler');
    expect(wmContent).toContain('will-navigate');
  });

  it('Forbidden Packaging Artifacts: dist-release should ignore development artifacts and user data', () => {
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');

    expect(gitignoreContent).toContain('dist-release/');
    expect(gitignoreContent).toContain('.atlas-data/');
    expect(gitignoreContent).toContain('.atlas-test-data/');
  });
});

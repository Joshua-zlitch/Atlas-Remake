import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase 11 Windows Packaging Test Suite', () => {
  it('Windows Packaging Configuration: package.json should define package:win script and NSIS target', () => {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

    expect(pkg.scripts['package:win']).toBeDefined();
    expect(pkg.build).toBeDefined();
    expect(pkg.build.win).toBeDefined();

    const winTargets = pkg.build.win.target as Array<{ target: string; arch: string[] }>;
    expect(winTargets.some((t) => t.target === 'nsis')).toBe(true);
    expect(winTargets.some((t) => t.target === 'dir')).toBe(true);

    expect(pkg.build.nsis).toBeDefined();
    expect(pkg.build.nsis.oneClick).toBe(false);
    expect(pkg.build.nsis.allowToChangeInstallationDirectory).toBe(true);
    expect(pkg.build.nsis.createDesktopShortcut).toBe(true);
    expect(pkg.build.nsis.createStartMenuShortcut).toBe(true);
  });

  it('Application & Executable Metadata: package.json should specify correct name, product name, and version', () => {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

    expect(pkg.name).toBe('atlas-desktop');
    expect(pkg.version).toBe('0.1.0');
    expect(pkg.build.productName).toBe('ATLAS Desktop');
    expect(pkg.build.appId).toBe('com.joshuazlitch.atlas');
  });

  it('Packaging Content Exclusions: gitignore should exclude dist-release directory', () => {
    const gitignorePath = path.join(process.cwd(), '.gitignore');
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');

    expect(gitignoreContent).toContain('dist-release/');
  });

  it('Production Bundle Artifacts Check: dist directory should contain compiled main, preload, and renderer assets', () => {
    const mainJs = path.join(process.cwd(), 'dist', 'main', 'main', 'main.js');
    const preloadJs = path.join(process.cwd(), 'dist', 'preload', 'preload', 'index.js');
    const rendererHtml = path.join(process.cwd(), 'dist', 'renderer', 'index.html');

    expect(fs.existsSync(mainJs)).toBe(true);
    expect(fs.existsSync(preloadJs)).toBe(true);
    expect(fs.existsSync(rendererHtml)).toBe(true);
  });
});

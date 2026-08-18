import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Phase 10 Production Build & Packaging Test Suite', () => {
  it('Production Bundle Artifacts: should compile main, preload, and renderer outputs cleanly', () => {
    const mainBundle = fs.existsSync(path.join(process.cwd(), 'dist', 'main', 'main', 'main.js'))
      ? path.join(process.cwd(), 'dist', 'main', 'main', 'main.js')
      : path.join(process.cwd(), 'dist', 'main', 'main.js');

    const preloadBundle = fs.existsSync(path.join(process.cwd(), 'dist', 'preload', 'preload', 'index.js'))
      ? path.join(process.cwd(), 'dist', 'preload', 'preload', 'index.js')
      : path.join(process.cwd(), 'dist', 'preload', 'index.js');

    const rendererBundle = path.join(process.cwd(), 'dist', 'renderer', 'index.html');

    expect(fs.existsSync(mainBundle)).toBe(true);
    expect(fs.existsSync(preloadBundle)).toBe(true);
    expect(fs.existsSync(rendererBundle)).toBe(true);
  });

  it('Authoritative Asset Resolution: should contain public/orb.png identity asset', () => {
    const orbAsset = path.join(process.cwd(), 'public', 'orb.png');
    expect(fs.existsSync(orbAsset)).toBe(true);

    const stats = fs.statSync(orbAsset);
    expect(stats.size).toBeGreaterThan(0);
  });

  it('Packaging Configuration Metadata: package.json should specify appId, productName, and test package script', () => {
    const pkgPath = path.join(process.cwd(), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

    expect(pkg.name).toBe('atlas-desktop');
    expect(pkg.main).toBe('dist/main/main.js');
    expect(pkg.scripts['package:test']).toBeDefined();
    expect(pkg.build).toBeDefined();
    expect(pkg.build.appId).toBe('com.joshuazlitch.atlas');
    expect(pkg.build.productName).toBe('ATLAS Desktop');
    expect(pkg.build.directories.output).toBe('dist-release');
  });

  it('User Data Isolation: production distribution build must exclude local test data and user stores', () => {
    const distPath = path.join(process.cwd(), 'dist');
    expect(fs.existsSync(path.join(distPath, '.atlas-data'))).toBe(false);
    expect(fs.existsSync(path.join(distPath, '.atlas-test-data'))).toBe(false);
    expect(fs.existsSync(path.join(distPath, 'userData'))).toBe(false);
  });

  it('Relative Asset Path Resolution: renderer index.html should reference relative assets (base: ./)', () => {
    const htmlPath = path.join(process.cwd(), 'dist', 'renderer', 'index.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    // Relative asset references start with ./ or ./assets
    expect(htmlContent).toContain('./assets');
    expect(htmlContent).not.toContain('http://localhost');
  });
});

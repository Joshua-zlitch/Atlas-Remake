# Atlas-Remake

ATLAS Desktop Application built with Electron, React 19, Vite, Tailwind v4, and TypeScript.

## Project Architecture & Baseline

- **Renderer:** React 19 + TanStack Router (Client SPA) + Radix UI + Tailwind v4
- **Runtime:** Electron Main Process + Preload API Boundary
- **Security:** `contextIsolation: true`, `nodeIntegration: false`, `sandbox: true`, validated IPC channel request routing
- **Testing:** Vitest test suite (`npm run test`)
- **Type Checking:** Strict TypeScript compilation (`npm run type-check`)

## Setup & Running

```bash
# Install dependencies
npm install

# Start development server & Electron
npm run dev

# Run type check
npm run type-check

# Run Vitest test suite
npm run test

# Build production bundles
npm run build
```

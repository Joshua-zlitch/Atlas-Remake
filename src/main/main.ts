import { app, BrowserWindow } from 'electron';
import { createMainWindow } from './windowManager.js';
import { registerIPCHandlers } from './ipcHandler.js';

async function initApp() {
  await app.whenReady();

  // Register IPC channel handlers
  registerIPCHandlers();

  // Launch Main BrowserWindow
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

initApp().catch((err) => {
  console.error('Failed to initialize ATLAS Main Process:', err);
  process.exit(1);
});

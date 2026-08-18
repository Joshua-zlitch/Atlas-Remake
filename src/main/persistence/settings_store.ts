import { LocalStorageManager } from './storage.js';
import { AppSettings } from '../../shared/types.js';

export class SettingsStore {
  private storage: LocalStorageManager<AppSettings>;

  constructor(filename: string = 'settings.json') {
    const defaultSettings: AppSettings = {
      theme: 'dark',
      orbIntensity: 62,
      autoSummary: true,
      notificationsEnabled: true,
      activeWorkspaceId: 'ws-default',
      updatedAt: new Date().toISOString(),
    };
    this.storage = new LocalStorageManager<AppSettings>(filename, defaultSettings);
  }

  public getSettings(): AppSettings {
    return this.storage.load();
  }

  public updateSettings(partial: Partial<AppSettings>): AppSettings {
    const current = this.getSettings();
    const updated: AppSettings = {
      ...current,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    this.storage.save(updated);
    return updated;
  }
}

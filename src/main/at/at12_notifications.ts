import { Notification } from 'electron';

export class AT12NotificationManager {
  public notify(title: string, body: string): { success: boolean; title: string } {
    try {
      if (typeof Notification !== 'undefined' && Notification.isSupported && Notification.isSupported()) {
        new Notification({ title, body }).show();
      }
    } catch {
      // Ignore notification failures in non-GUI / headless environments
    }
    return { success: true, title };
  }
}

import { AT02FilesystemManager } from './at02_filesystem.js';

export interface AttachmentRecord {
  id: string;
  name: string;
  relativePath: string;
  sizeBytes: number;
  attachedAt: string;
}

export class AT13AttachmentManager {
  private attachments: Map<string, AttachmentRecord> = new Map();

  constructor(private filesystemManager: AT02FilesystemManager) {}

  public async attachFile(filePath: string): Promise<AttachmentRecord> {
    const files = await this.filesystemManager.listDirectory('.');
    const existing = files.find((f) => f.relativePath === filePath || f.name === filePath);

    const record: AttachmentRecord = {
      id: 'att-' + Date.now(),
      name: existing ? existing.name : filePath,
      relativePath: existing ? existing.relativePath : filePath,
      sizeBytes: existing ? existing.sizeBytes : 0,
      attachedAt: new Date().toISOString(),
    };

    this.attachments.set(record.id, record);
    return record;
  }

  public listAttachments(): AttachmentRecord[] {
    return Array.from(this.attachments.values());
  }
}

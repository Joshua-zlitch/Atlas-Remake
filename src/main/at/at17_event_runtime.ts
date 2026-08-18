import { EventEmitter } from 'events';
import { RuntimeEvent } from '../../shared/types.js';

export class AT17EventRuntime {
  private emitter = new EventEmitter();
  private eventHistory: RuntimeEvent[] = [];

  constructor() {
    this.emitter.setMaxListeners(50);
  }

  public emitEvent<T = unknown>(type: string, source: string, payload: T): RuntimeEvent<T> {
    const event: RuntimeEvent<T> = {
      id: 'evt-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      type,
      source,
      timestamp: new Date().toISOString(),
      payload,
    };

    this.eventHistory.push(event as RuntimeEvent);
    if (this.eventHistory.length > 100) {
      this.eventHistory.shift();
    }

    this.emitter.emit(type, event);
    this.emitter.emit('*', event);
    return event;
  }

  public on(type: string, listener: (event: RuntimeEvent) => void): () => void {
    this.emitter.on(type, listener);
    return () => {
      this.emitter.off(type, listener);
    };
  }

  public getHistory(): RuntimeEvent[] {
    return [...this.eventHistory];
  }
}

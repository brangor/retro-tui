import type { TuiEvent, LogData, ProgressData, TableData, StatusData } from './types.ts';

export interface EmitterOptions {
  channel: string;
  url?: string;
}

/**
 * RetroEmitter — lightweight HTTP client for sending events to the push server.
 * Fire-and-forget. No state. No WebSocket. Just POSTs JSON.
 */
export class RetroEmitter {
  private channel: string;
  private url: string;

  constructor(options: EmitterOptions) {
    this.channel = options.channel;
    this.url = options.url ?? 'http://localhost:3001/push';
  }

  async log(id: string, message: string, level?: LogData['level']): Promise<void> {
    const data: LogData = { message };
    if (level) data.level = level;
    await this.emit('log', id, data);
  }

  async progress(id: string, value: number, opts?: { label?: string; total?: number; current?: number }): Promise<void> {
    const data: ProgressData = { value, ...opts };
    await this.emit('progress', id, data);
  }

  async table(id: string, data: TableData): Promise<void> {
    await this.emit('table', id, data);
  }

  async status(id: string, state: StatusData['state'], message: string): Promise<void> {
    await this.emit('status', id, { state, message });
  }

  async clear(id: string): Promise<void> {
    await this.emit('clear', id, {});
  }

  async dismiss(id: string): Promise<void> {
    await this.emit('dismiss', id, {});
  }

  async emit(type: string, id: string, data: Record<string, unknown>): Promise<void> {
    const event: TuiEvent = { channel: this.channel, type, id, data };
    await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event),
    });
  }
}

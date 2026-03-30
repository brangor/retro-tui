import { describe, it, expect, vi, beforeEach } from 'vitest';
import { RetroEmitter } from '../../src/protocol/emitter.ts';

// Mock global fetch
const mockFetch = vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ ok: true, delivered: 1 }),
});
vi.stubGlobal('fetch', mockFetch);

describe('RetroEmitter', () => {
  let emitter: RetroEmitter;

  beforeEach(() => {
    mockFetch.mockClear();
    emitter = new RetroEmitter({ channel: 'test-app' });
  });

  it('sends a log event', async () => {
    await emitter.log('main', 'Hello world');
    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3001/push');
    const body = JSON.parse(options.body);
    expect(body).toEqual({
      channel: 'test-app',
      type: 'log',
      id: 'main',
      data: { message: 'Hello world' },
    });
  });

  it('sends a log event with level', async () => {
    await emitter.log('main', 'Oops', 'error');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.data).toEqual({ message: 'Oops', level: 'error' });
  });

  it('sends a progress event', async () => {
    await emitter.progress('track-1', 0.5, { label: 'Song', total: 10, current: 5 });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body).toEqual({
      channel: 'test-app',
      type: 'progress',
      id: 'track-1',
      data: { value: 0.5, label: 'Song', total: 10, current: 5 },
    });
  });

  it('sends a progress event with minimal data', async () => {
    await emitter.progress('dl', 0.75);
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.data).toEqual({ value: 0.75 });
  });

  it('sends a table event', async () => {
    const columns = ['Name', 'Status'];
    const rows = [{ Name: 'A', Status: 'OK' }];
    await emitter.table('summary', { columns, rows });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.data).toEqual({ columns, rows });
  });

  it('sends a status event', async () => {
    await emitter.status('auth', 'success', 'Logged in');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.data).toEqual({ state: 'success', message: 'Logged in' });
  });

  it('sends a clear event', async () => {
    await emitter.clear('main');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body).toEqual({
      channel: 'test-app',
      type: 'clear',
      id: 'main',
      data: {},
    });
  });

  it('sends a dismiss event', async () => {
    await emitter.dismiss('summary');
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.type).toBe('dismiss');
    expect(body.id).toBe('summary');
  });

  it('sends a custom event via emit()', async () => {
    await emitter.emit('canvas-draw', 'sketch-1', { x: 10, y: 20 });
    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body).toEqual({
      channel: 'test-app',
      type: 'canvas-draw',
      id: 'sketch-1',
      data: { x: 10, y: 20 },
    });
  });

  it('uses custom URL when provided', async () => {
    const custom = new RetroEmitter({ channel: 'x', url: 'http://example.com/push' });
    await custom.log('id', 'hi');
    expect(mockFetch.mock.calls[0][0]).toBe('http://example.com/push');
  });
});

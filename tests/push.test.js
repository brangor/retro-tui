import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock global fetch before importing
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const { push, log, createPush } = await import('../src/push/index.js');

describe('push helper', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true, delivered: 1 }),
    });
  });

  it('push() sends a POST to the push server', async () => {
    await push('game', 'Hello');

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, opts] = mockFetch.mock.calls[0];
    expect(url).toBe('http://localhost:3001/push');
    expect(opts.method).toBe('POST');
    const body = JSON.parse(opts.body);
    expect(body.channel).toBe('game');
    expect(body.type).toBe('log');
    expect(body.data).toBe('Hello');
  });

  it('push() accepts a custom type', async () => {
    await push('game', 'oops', 'error');

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.type).toBe('error');
  });

  it('log() is an alias for push with type=log', async () => {
    await log('build', 'Starting...');

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.channel).toBe('build');
    expect(body.type).toBe('log');
    expect(body.data).toBe('Starting...');
  });

  it('createPush() returns a channel-bound push function', async () => {
    const game = createPush('game');
    await game('Card dealt');

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.channel).toBe('game');
    expect(body.data).toBe('Card dealt');
  });

  it('createPush() with custom server URL', async () => {
    const game = createPush('game', { url: 'http://example.com/push' });
    await game('Hello');

    expect(mockFetch.mock.calls[0][0]).toBe('http://example.com/push');
  });

  it('push() throws on non-ok response', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ error: 'Missing channel' }),
    });

    await expect(push('', 'test')).rejects.toThrow('Missing channel');
  });
});

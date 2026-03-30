// tests/protocol/event-router.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventRouter } from '../../src/protocol/event-router.ts';
import type { TuiEvent } from '../../src/protocol/types.ts';

function mockComponent() {
  return { handleEvent: vi.fn() };
}

describe('EventRouter', () => {
  let router: EventRouter;

  beforeEach(() => {
    router = new EventRouter();
  });

  it('routes an event to a registered component', () => {
    const comp = mockComponent();
    router.register('log-1', comp as any);
    const event: TuiEvent = { channel: 'app', type: 'log', id: 'log-1', data: { message: 'hi' } };
    router.route(event);
    expect(comp.handleEvent).toHaveBeenCalledWith(event);
  });

  it('does not throw for unregistered id', () => {
    const event: TuiEvent = { channel: 'app', type: 'log', id: 'unknown', data: { message: 'hi' } };
    expect(() => router.route(event)).not.toThrow();
  });

  it('calls onCreate callback for unregistered id', () => {
    const onCreate = vi.fn().mockReturnValue(mockComponent());
    router = new EventRouter({ onCreate });
    const event: TuiEvent = { channel: 'app', type: 'log', id: 'new-1', data: { message: 'hi' } };
    router.route(event);
    expect(onCreate).toHaveBeenCalledWith(event);
  });

  it('auto-registers component returned from onCreate', () => {
    const comp = mockComponent();
    const onCreate = vi.fn().mockReturnValue(comp);
    router = new EventRouter({ onCreate });
    const event: TuiEvent = { channel: 'app', type: 'log', id: 'new-1', data: { message: 'hi' } };
    router.route(event);
    expect(comp.handleEvent).toHaveBeenCalledWith(event);

    const event2: TuiEvent = { channel: 'app', type: 'log', id: 'new-1', data: { message: 'hi again' } };
    router.route(event2);
    expect(onCreate).toHaveBeenCalledTimes(1);
    expect(comp.handleEvent).toHaveBeenCalledTimes(2);
  });

  it('handles dismiss by unregistering the component', () => {
    const comp = mockComponent();
    router.register('panel-1', comp as any);
    const event: TuiEvent = { channel: 'app', type: 'dismiss', id: 'panel-1', data: {} };
    router.route(event);
    expect(comp.handleEvent).toHaveBeenCalledWith(event);
    expect(router.has('panel-1')).toBe(false);
  });

  it('unregister removes a component', () => {
    const comp = mockComponent();
    router.register('x', comp as any);
    expect(router.has('x')).toBe(true);
    router.unregister('x');
    expect(router.has('x')).toBe(false);
  });
});

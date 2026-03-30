import { describe, it, expect } from 'vitest';
import { validateEvent, type TuiEvent } from '../../src/protocol/types.ts';

describe('protocol types', () => {
  it('validates a well-formed event', () => {
    const event: TuiEvent = {
      channel: 'my-app',
      type: 'log',
      id: 'main-log',
      data: { message: 'Hello world' },
    };
    expect(validateEvent(event)).toBe(true);
  });

  it('rejects event missing channel', () => {
    const event = { type: 'log', id: 'x', data: {} };
    expect(validateEvent(event as TuiEvent)).toBe(false);
  });

  it('rejects event missing type', () => {
    const event = { channel: 'x', id: 'x', data: {} };
    expect(validateEvent(event as TuiEvent)).toBe(false);
  });

  it('rejects event missing id', () => {
    const event = { channel: 'x', type: 'log', data: {} };
    expect(validateEvent(event as TuiEvent)).toBe(false);
  });

  it('rejects event missing data', () => {
    const event = { channel: 'x', type: 'log', id: 'x' };
    expect(validateEvent(event as TuiEvent)).toBe(false);
  });

  it('accepts custom event types', () => {
    const event: TuiEvent = {
      channel: 'my-app',
      type: 'canvas-draw',
      id: 'sketch-1',
      data: { x: 10, y: 20 },
    };
    expect(validateEvent(event)).toBe(true);
  });
});

import { describe, it } from 'vitest';
import { expect } from '@open-wc/testing';
import { ToolState } from '../../src/state/tool-state.ts';

describe('ToolState', () => {
  it('should initialize with config', () => {
    const state = new ToolState({
      groups: {
        brush: { exclusive: true },
      },
      tools: [
        { id: 'pencil', group: 'brush', icon: '✏️' },
        { id: 'eraser', group: 'brush', icon: '🧹' },
      ],
    });

    expect(state.tools).to.have.length(2);
    expect(state.activeTool).to.be.null;
  });
});

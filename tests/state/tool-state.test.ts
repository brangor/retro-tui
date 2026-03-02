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

  it('should enforce exclusive tool groups (radio behavior)', () => {
    const state = new ToolState({
      groups: { brush: { exclusive: true } },
      tools: [
        { id: 'pencil', group: 'brush' },
        { id: 'eraser', group: 'brush' },
      ],
    });

    state.selectTool('pencil');
    expect(state.activeTool).to.equal('pencil');

    state.selectTool('eraser');
    expect(state.activeTool).to.equal('eraser');
  });

  it('should allow multiple active tools in non-exclusive groups', () => {
    const state = new ToolState({
      groups: { symmetry: { exclusive: false } },
      tools: [
        { id: 'sym-h', group: 'symmetry' },
        { id: 'sym-v', group: 'symmetry' },
      ],
    });

    state.toggleTool('sym-h');
    expect(state.activeTools).to.include('sym-h');

    state.toggleTool('sym-v');
    expect(state.activeTools).to.include('sym-h');
    expect(state.activeTools).to.include('sym-v');
  });

  it('should toggle off a non-exclusive tool', () => {
    const state = new ToolState({
      groups: { symmetry: { exclusive: false } },
      tools: [
        { id: 'sym-h', group: 'symmetry' },
      ],
    });

    state.toggleTool('sym-h');
    expect(state.activeTools).to.include('sym-h');

    state.toggleTool('sym-h');
    expect(state.activeTools).to.not.include('sym-h');
  });

  it('should report active state for exclusive tools', () => {
    const state = new ToolState({
      groups: { brush: { exclusive: true } },
      tools: [
        { id: 'pencil', group: 'brush' },
        { id: 'eraser', group: 'brush' },
      ],
    });

    state.selectTool('pencil');
    expect(state.isActive('pencil')).to.be.true;
    expect(state.isActive('eraser')).to.be.false;
  });

  it('should report active state for non-exclusive tools', () => {
    const state = new ToolState({
      groups: { symmetry: { exclusive: false } },
      tools: [
        { id: 'sym-h', group: 'symmetry' },
        { id: 'sym-v', group: 'symmetry' },
      ],
    });

    state.toggleTool('sym-h');
    expect(state.isActive('sym-h')).to.be.true;
    expect(state.isActive('sym-v')).to.be.false;
  });

  it('should update palette color', () => {
    const state = new ToolState({
      groups: {},
      tools: [],
    });

    state.setColor('#ff0000');
    expect(state.palette.currentColor).to.equal('#ff0000');
  });
});

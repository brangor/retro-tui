// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { ansiToHtml, stripAnsi } from '../src/utils/ansi.js';

describe('ansiToHtml', () => {
  // Existing behavior (regression safety)
  it('converts foreground colors', () => {
    const result = ansiToHtml('\x1b[31mred text\x1b[0m');
    expect(result).toContain('class="ansi-red"');
    expect(result).toContain('red text');
  });

  it('converts bold', () => {
    const result = ansiToHtml('\x1b[1mbold\x1b[0m');
    expect(result).toContain('class="ansi-bold"');
  });

  it('escapes HTML', () => {
    const result = ansiToHtml('<script>alert("xss")</script>');
    expect(result).toContain('&lt;script&gt;');
    expect(result).not.toContain('<script>');
  });

  it('returns empty string for falsy input', () => {
    expect(ansiToHtml('')).toBe('');
    expect(ansiToHtml(null)).toBe('');
    expect(ansiToHtml(undefined)).toBe('');
  });

  // Background colors
  it('converts standard background colors (40-47)', () => {
    const result = ansiToHtml('\x1b[41mred bg\x1b[0m');
    expect(result).toContain('ansi-bg-red');
    expect(result).toContain('red bg');
  });

  it('converts bright background colors (100-107)', () => {
    const result = ansiToHtml('\x1b[102mbright green bg\x1b[0m');
    expect(result).toContain('ansi-bg-green');
  });

  it('combines foreground and background', () => {
    const result = ansiToHtml('\x1b[31;42mred on green\x1b[0m');
    expect(result).toContain('ansi-red');
    expect(result).toContain('ansi-bg-green');
  });

  // Reverse video
  it('converts reverse video (code 7)', () => {
    const result = ansiToHtml('\x1b[7mreversed\x1b[0m');
    expect(result).toContain('ansi-reverse');
    expect(result).toContain('reversed');
  });

  it('combines reverse with foreground color', () => {
    const result = ansiToHtml('\x1b[31;7mred reversed\x1b[0m');
    expect(result).toContain('ansi-red');
    expect(result).toContain('ansi-reverse');
  });

  // 256-color mode
  it('converts 256-color foreground (38;5;N)', () => {
    const result = ansiToHtml('\x1b[38;5;196mred256\x1b[0m');
    expect(result).toContain('style="color:');
    expect(result).toContain('red256');
  });

  it('converts 256-color background (48;5;N)', () => {
    const result = ansiToHtml('\x1b[48;5;21mbluebg\x1b[0m');
    expect(result).toContain('style="background-color:');
    expect(result).toContain('bluebg');
  });

  // Truecolor mode
  it('converts truecolor foreground (38;2;R;G;B)', () => {
    const result = ansiToHtml('\x1b[38;2;255;128;0morange\x1b[0m');
    expect(result).toContain('style="color: rgb(255,128,0)"');
    expect(result).toContain('orange');
  });

  it('converts truecolor background (48;2;R;G;B)', () => {
    const result = ansiToHtml('\x1b[48;2;0;0;128mnavybg\x1b[0m');
    expect(result).toContain('style="background-color: rgb(0,0,128)"');
    expect(result).toContain('navybg');
  });
});

describe('stripAnsi', () => {
  it('removes all ANSI codes', () => {
    expect(stripAnsi('\x1b[31;42mbold\x1b[0m')).toBe('bold');
  });
});

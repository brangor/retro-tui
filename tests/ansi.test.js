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

/**
 * `ESC[m` — reset with an OMITTED parameter — is what real terminal programs emit.
 * `git log --color` uses it for every reset; the SGR spec treats a missing parameter
 * as 0. Every test above writes `ESC[0m` explicitly, which is why this went unnoticed:
 * the parser's regex required one or more digits, so a bare reset matched nothing,
 * survived into the output as a literal escape character, and left every span unclosed.
 *
 * Found by feeding real `git log --color` output to ansiToHtml while building the
 * vault-tui activity view — the first consumer to hand this parser output it did not
 * generate itself.
 */
describe('ansiToHtml — bare reset (ESC[m)', () => {
  it('treats an omitted parameter as reset, per the SGR spec', () => {
    const result = ansiToHtml('\x1b[31mred\x1b[m plain');
    expect(result).toContain('class="ansi-red"');
    expect(result).toContain('plain');
  });

  it('leaves no literal escape character in the output', () => {
    const result = ansiToHtml('\x1b[33myellow\x1b[m');
    expect(result).not.toContain('\x1b');
  });

  it('closes every span it opens', () => {
    const result = ansiToHtml('\x1b[33ma\x1b[m\x1b[1;36mb\x1b[m');
    const open = (result.match(/<span/g) ?? []).length;
    const close = (result.match(/<\/span>/g) ?? []).length;
    expect(open).toBe(close);
    expect(open).toBeGreaterThan(0);
  });

  /** The exact shape `git log --color --oneline --decorate` emits. */
  it('renders a real git log line without leaking escapes', () => {
    const line =
      '\x1b[33m5f5a3be\x1b[m\x1b[33m (\x1b[m\x1b[1;36mHEAD\x1b[m\x1b[33m -> \x1b[m\x1b[1;32mmain\x1b[m\x1b[33m)\x1b[m subject';
    const result = ansiToHtml(line);
    expect(result).not.toContain('\x1b');
    expect(result).toContain('5f5a3be');
    expect(result).toContain('subject');
    expect((result.match(/<span/g) ?? []).length).toBe((result.match(/<\/span>/g) ?? []).length);
  });
});

describe('stripAnsi', () => {
  it('removes all ANSI codes', () => {
    expect(stripAnsi('\x1b[31;42mbold\x1b[0m')).toBe('bold');
  });
});

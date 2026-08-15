import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-statusbar.ts';
import { StatusItem } from '../src/components/tui-statusbar.ts';

/** Flatten a Lit component's static styles into one CSS string. */
const cssOf = (ctor) => {
  const styles = Array.isArray(ctor.styles) ? ctor.styles : [ctor.styles];
  return styles.map((s) => s?.cssText ?? '').join('\n');
};

describe('tui-statusbar', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-statusbar></tui-statusbar>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-statusbar></tui-statusbar>`);
    expect(el.shadowRoot).to.exist;
  });
});

describe('tui-status-item', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-status-item></tui-status-item>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-status-item></tui-status-item>`);
    expect(el.shadowRoot).to.exist;
  });

  it('reflects label attribute', async () => {
    const el = await fixture(html`<tui-status-item label="Mode"></tui-status-item>`);
    expect(el.label).to.equal('Mode');
    const labelSpan = el.shadowRoot.querySelector('.label');
    expect(labelSpan.textContent).to.equal('Mode');
  });

  it('reflects value attribute', async () => {
    const el = await fixture(html`<tui-status-item value="Normal"></tui-status-item>`);
    expect(el.value).to.equal('Normal');
    const valueSpan = el.shadowRoot.querySelector('.value');
    expect(valueSpan.textContent).to.equal('Normal');
  });

  it('reflects highlight to the host', async () => {
    const el = await fixture(html`<tui-status-item highlight></tui-status-item>`);
    expect(el.highlight).to.equal(true);
    expect(el.hasAttribute('highlight')).to.equal(true);
  });

  // jsdom does not resolve custom properties through shadow DOM, so this reads the
  // rule rather than the computed colour. The point of the assertion is that
  // [highlight] paints something *other* than the default: until 5.0.0 it set the
  // same --color-secondary as .value, so the attribute rendered no difference.
  it('paints the highlighted value a different token from the default', () => {
    const css = cssOf(StatusItem).replace(/\s+/g, ' ');
    const colorIn = (selector) =>
      css.match(new RegExp(`${selector}\\s*{[^}]*?color:\\s*(var\\(--[\\w-]+\\))`))?.[1];

    const base = colorIn('(?<!\\]\\) )\\.value');
    const highlighted = colorIn(':host\\(\\[highlight\\]\\) \\.value');

    expect(highlighted).to.equal('var(--color-warning)');
    expect(base).to.equal('var(--color-secondary)');
    expect(highlighted).to.not.equal(base);
  });
});

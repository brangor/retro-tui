import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-app.js';

describe('tui-app', () => {
  it('renders without errors', async () => {
    const el = await fixture(html`<tui-app title="Test App"></tui-app>`);
    expect(el).to.exist;
  });

  it('has shadow root', async () => {
    const el = await fixture(html`<tui-app title="Test App"></tui-app>`);
    expect(el.shadowRoot).to.exist;
  });

  it('reflects title attribute', async () => {
    const el = await fixture(html`<tui-app title="My App"></tui-app>`);
    expect(el.getAttribute('title')).to.equal('My App');
    expect(el.title).to.equal('My App');
  });

  it('reflects subtitle attribute', async () => {
    const el = await fixture(html`<tui-app title="My App" subtitle="v1.0"></tui-app>`);
    expect(el.getAttribute('subtitle')).to.equal('v1.0');
    expect(el.subtitle).to.equal('v1.0');
  });
});

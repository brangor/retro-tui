import { describe, it } from 'vitest';
import { fixture, html, expect } from '@open-wc/testing';
import '../src/components/tui-app.ts';

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

  it('slotted main child receives flex stretch styling', async () => {
    const el = await fixture(html`
      <tui-app title="Test">
        <div slot="main" id="inner">content</div>
      </tui-app>
    `);
    await el.updateComplete;

    // jsdom doesn't resolve ::slotted via getComputedStyle, so verify the
    // rule exists in the component's shadow root styles via textContent.
    const styleEls = el.shadowRoot.querySelectorAll('style');
    const cssText = Array.from(styleEls).map(s => s.textContent).join('\n');
    expect(cssText).to.include('::slotted(*)');
    expect(cssText).to.include('flex: 1');
    expect(cssText).to.include('min-height: 0');
    expect(cssText).to.include('min-width: 0');
  });
});

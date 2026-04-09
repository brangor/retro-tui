import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type TiledPreset = 'monitor' | 'viewer' | 'console' | 'console-split' | 'triad';
type TiledLabels = 'caption' | 'titlebar' | '';

interface ParsedGrid {
  areas: string;       // CSS grid-template-areas value
  rows: string;        // CSS grid-template-rows value
  cols: string;        // CSS grid-template-columns value
  slotNames: string[]; // Unique area names for slot generation
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRESETS
// ═══════════════════════════════════════════════════════════════════════════════

const PRESETS: Record<TiledPreset, string> = {
  'monitor':       'status status | main aside-1 | main aside-2',
  'viewer':        'primary secondary | detail detail',
  'console':       'main | footer',
  'console-split': 'main aside | footer footer',
  'triad':         'left center right',
};

// ═══════════════════════════════════════════════════════════════════════════════
// PARSING
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Parse a pipe-separated areas shorthand into CSS grid values.
 *
 * Input:  "header header | main sidebar | footer footer"
 * Output: {
 *   areas: '"header header" "main sidebar" "footer footer"',
 *   rows:  'auto 1fr auto',
 *   cols:  '1fr 1fr',
 *   slotNames: ['header', 'main', 'sidebar', 'footer']
 * }
 */
export function parseAreas(shorthand: string): ParsedGrid {
  const rows = shorthand.split('|').map(r => r.trim()).filter(Boolean);
  const grid = rows.map(row => row.split(/\s+/));

  // CSS grid-template-areas: quoted row strings
  const areas = grid.map(cols => `"${cols.join(' ')}"`).join(' ');

  // Max columns across all rows
  const maxCols = Math.max(...grid.map(cols => cols.length));
  const colTemplate = Array(maxCols).fill('1fr').join(' ');

  // Unique slot names (preserve order of first appearance)
  const seen = new Set<string>();
  const slotNames: string[] = [];
  for (const row of grid) {
    for (const name of row) {
      if (!seen.has(name)) {
        seen.add(name);
        slotNames.push(name);
      }
    }
  }

  // Row sizing rules:
  // - Full-width top row → auto (size to content)
  // - Full-width bottom row → fixed height, scrollable (log panels)
  // - All other rows → 1fr
  const rowTemplate = grid.map((cols, i) => {
    const isFullWidth = new Set(cols).size === 1;
    if (isFullWidth && i === 0) return 'auto';
    if (isFullWidth && i === grid.length - 1) return '120px';
    return '1fr';
  }).join(' ');

  return { areas, rows: rowTemplate, cols: colTemplate, slotNames };
}

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-tiled> - CSS grid layout with named slots and preset templates
 *
 * A pure layout component. Compose with tui-titlebar and tui-status-strip
 * for app shell chrome.
 *
 * @attr {string} preset - Named layout: 'monitor' | 'viewer' | 'console' | 'console-split' | 'triad'
 * @attr {string} areas - Custom grid-template-areas shorthand. '|' separates rows. Overrides preset.
 *                        When used with preset, acts as ordered display labels mapped to the preset's slot names.
 *                        e.g. preset="console-split" areas="DOWNLOAD | HISTORY | CONSOLE"
 * @attr {string} gap - CSS grid gap value (default: '1px')
 * @attr {string} labels - Zone label style: 'caption' (small overlay) | 'titlebar' (full bar) | '' (none)
 */
@customElement('tui-tiled')
export class Tiled extends LitElement {
  @property({ type: String, reflect: true })
  preset: TiledPreset | '' = '';

  @property({ type: String })
  areas = '';

  @property({ type: String })
  gap = '1px';

  @property({ type: String })
  labels: TiledLabels = '';

  static styles = [
    sharedStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--surface-base);
      }

      .grid {
        flex: 1;
        display: grid;
        background: var(--border-default);
        min-height: 0;
      }

      .zone {
        position: relative;
        background: var(--surface-base);
        min-height: 0;
        overflow: auto;
      }

      .zone-label {
        position: absolute;
        top: 2px;
        left: 4px;
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        opacity: 0.5;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        pointer-events: none;
        z-index: 1;
      }

      .zone-titlebar {
        display: flex;
        align-items: center;
        padding: 0 var(--spacing-sm);
        height: 1.75rem;
        min-height: 1.75rem;
        background: var(--surface-elevated);
        border-bottom: var(--border-width, 1px) solid var(--border-default);
        font-size: var(--font-size-caption, 0.6rem);
        color: var(--text-muted);
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-family: var(--font-mono);
      }

      .zone.has-titlebar {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .zone.has-titlebar slot {
        flex: 1;
        overflow: auto;
        display: block;
      }
    `,
  ];

  private _getGrid(): ParsedGrid | null {
    const shorthand = this.preset ? PRESETS[this.preset] : this.areas;
    if (!shorthand) return null;
    return parseAreas(shorthand);
  }

  // When preset + areas are both set, treat areas as ordered display labels
  // mapped 1:1 onto the preset's slot names.
  private _getDisplayLabels(slotNames: string[]): Record<string, string> {
    if (!this.preset || !this.areas) return {};
    const displayNames = this.areas.split('|').flatMap(r => r.trim().split(/\s+/)).filter(Boolean);
    const map: Record<string, string> = {};
    slotNames.forEach((slot, i) => {
      if (displayNames[i]) map[slot] = displayNames[i];
    });
    return map;
  }

  render() {
    const grid = this._getGrid();
    if (!grid) return nothing;

    const gridStyle = `
      grid-template-areas: ${grid.areas};
      grid-template-rows: ${grid.rows};
      grid-template-columns: ${grid.cols};
      gap: ${this.gap};
    `;

    const displayLabels = this._getDisplayLabels(grid.slotNames);

    return html`
      <div class="grid" style=${gridStyle}>
        ${grid.slotNames.map(name => {
          const label = displayLabels[name] ?? name;
          return html`
            <div class="zone ${this.labels === 'titlebar' ? 'has-titlebar' : ''}" style="grid-area: ${name};">
              ${this.labels === 'titlebar' ? html`<div class="zone-titlebar">${label}</div>` : nothing}
              ${this.labels === 'caption' ? html`<span class="zone-label">${label}</span>` : nothing}
              <slot name=${name}></slot>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-tiled': Tiled;
  }
}

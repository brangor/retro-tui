import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

type BorderStyle = 'single' | 'double' | 'heavy' | 'none';
type RowData = Record<string, unknown>;

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * <tui-table> - ASCII-bordered data table
 * 
 * @attr {string} border - Border style: single | double | heavy | none
 * 
 * @method setData(columns, rows) - Set table data
 */
@customElement('tui-table')
export class Table extends LitElement {
  @property({ type: String })
  border: BorderStyle = 'single';

  @state()
  private _columns: string[] = [];

  @state()
  private _rows: RowData[] = [];

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
      }

      .table {
        width: 100%;
        font-size: 0.8rem;
      }

      .row {
        display: flex;
        border-bottom: var(--border-width) solid var(--border-default);
      }

      .row:last-child {
        border-bottom: none;
      }

      .cell {
        flex: 1;
        padding: 0.4rem 0.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .header {
        background: var(--surface-base);
        border-bottom: var(--border-width) solid var(--text-muted);
      }

      .header .cell {
        color: var(--color-primary);
        font-weight: normal;
      }

      .empty {
        color: var(--text-muted);
        font-style: italic;
        padding: var(--spacing-sm);
      }

      /* Value styling */
      .cell.status-ok { color: var(--color-secondary); }
      .cell.status-warn { color: var(--color-secondary); }
      .cell.status-error { color: var(--color-error); }
      .cell.number { 
        font-variant-numeric: tabular-nums;
        text-align: right;
      }
    `,
  ];

  /**
   * Set table data
   * @param columns - Column headers
   * @param rows - Row data
   */
  setData(columns: string[], rows: RowData[]): void {
    this._columns = columns;
    this._rows = rows;
  }

  /**
   * Add or update a row by key
   * @param key - Row identifier (first column value)
   * @param data - Row data
   */
  upsertRow(key: string, data: RowData): void {
    const existingIndex = this._rows.findIndex(r => r[this._columns[0]] === key);
    if (existingIndex >= 0) {
      this._rows = [
        ...this._rows.slice(0, existingIndex),
        data,
        ...this._rows.slice(existingIndex + 1),
      ];
    } else {
      this._rows = [...this._rows, data];
    }
  }

  private getCellClass(value: unknown): string {
    if (typeof value === 'number') return 'number';
    if (value === '✓' || value === 'OK' || value === 'online') return 'status-ok';
    if (value === '⚠' || value === 'WARN' || value === 'degraded') return 'status-warn';
    if (value === '✗' || value === 'ERROR' || value === 'offline') return 'status-error';
    return '';
  }

  render() {
    if (this._columns.length === 0) {
      return html`<div class="empty">No data</div>`;
    }

    return html`
      <div class="table">
        <div class="row header">
          ${this._columns.map(col => html`<div class="cell">${col}</div>`)}
        </div>
        ${this._rows.map(row => html`
          <div class="row">
            ${this._columns.map(col => html`
              <div class="cell ${this.getCellClass(row[col])}">${row[col] ?? ''}</div>
            `)}
          </div>
        `)}
      </div>
    `;
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// TYPE AUGMENTATION
// ═══════════════════════════════════════════════════════════════════════════════

declare global {
  interface HTMLElementTagNameMap {
    'tui-table': Table;
  }
}

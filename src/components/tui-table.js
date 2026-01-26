import { LitElement, html, css } from 'lit';
import { sharedStyles } from '../styles/shared.js';

/**
 * <tui-table> - ASCII-bordered data table
 * 
 * @attr {string} border - Border style: single | double | heavy | none
 * 
 * @method setData(columns, rows) - Set table data
 */
export class Table extends LitElement {
  static properties = {
    border: { type: String },
    _columns: { state: true },
    _rows: { state: true },
  };

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

  constructor() {
    super();
    this.border = 'single';
    this._columns = [];
    this._rows = [];
  }

  /**
   * Set table data
   * @param {string[]} columns - Column headers
   * @param {Array<Record<string, any>>} rows - Row data
   */
  setData(columns, rows) {
    this._columns = columns;
    this._rows = rows;
  }

  /**
   * Add or update a row by key
   * @param {string} key - Row identifier (first column value)
   * @param {Record<string, any>} data - Row data
   */
  upsertRow(key, data) {
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

  getCellClass(value) {
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

if (!customElements.get('tui-table')) {
  customElements.define('tui-table', Table);
}

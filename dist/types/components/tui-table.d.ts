import { LitElement } from 'lit';
import { type BorderStyle } from '../utils/borders.js';
import type { TuiEvent } from '../protocol/types';
type RowData = Record<string, unknown>;
/**
 * <tui-table> - ASCII-bordered data table
 *
 * @attr {string} border - Border style: single | double | heavy | none
 *
 * @method setData(columns, rows) - Set table data
 */
export declare class Table extends LitElement {
    border: BorderStyle;
    private _columns;
    private _rows;
    static styles: import("lit").CSSResult[];
    /**
     * Set table data
     * @param columns - Column headers
     * @param rows - Row data
     */
    setData(columns: string[], rows: RowData[]): void;
    /**
     * Add or update a row by key
     * @param key - Row identifier (first column value)
     * @param data - Row data
     */
    upsertRow(key: string, data: RowData): void;
    /** Accept a protocol event */
    handleEvent(event: TuiEvent): void;
    private getCellClass;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'tui-table': Table;
    }
}
export {};

import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { sharedStyles } from '../styles/shared.js';

type SidebarSide = 'left' | 'right' | 'top' | 'bottom';

/**
 * <tui-sidebar> - Simple container for docked panels
 * 
 * A minimal layout region that stacks panels. No header, no chrome.
 * Panels docked here retain their own collapse controls.
 * 
 * @attr {string} side - Which edge: 'left' | 'right' | 'top' | 'bottom'
 * @attr {number} size - Width (left/right) or height (top/bottom) in pixels
 * 
 * @slot - Panels to stack in the sidebar
 */
@customElement('tui-sidebar')
export class Sidebar extends LitElement {
  @property({ type: String, reflect: true })
  side: SidebarSide = 'left';

  @property({ type: Number })
  size = 200;

  @state()
  private _dropIndex: number | null = null;

  static styles = [
    sharedStyles,
    css`
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
      }

      /* Orientation based on side */
      :host([side="left"]),
      :host([side="right"]) {
        height: 100%;
      }

      :host([side="top"]),
      :host([side="bottom"]) {
        width: 100%;
      }

      .content {
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: auto;
        gap: 1px;
        min-height: 0;
        position: relative;
      }

      :host([side="top"]) .content,
      :host([side="bottom"]) .content {
        flex-direction: row;
      }

      .drop-indicator {
        position: absolute;
        left: 4px;
        right: 4px;
        height: 3px;
        background: var(--color-primary, #bd93f9);
        border-radius: 2px;
        pointer-events: none;
        z-index: 10;
      }
    `,
  ];

  /**
   * Get all panel elements in this sidebar
   */
  private _getPanels(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    if (!slot) return [];
    return slot.assignedElements().filter(el => el.tagName.toLowerCase() === 'tui-panel') as HTMLElement[];
  }

  /**
   * Calculate drop index based on cursor Y position
   */
  calculateDropIndex(cursorY: number): number {
    const panels = this._getPanels();
    
    for (let i = 0; i < panels.length; i++) {
      const rect = panels[i].getBoundingClientRect();
      const midpoint = rect.top + rect.height / 2;
      if (cursorY < midpoint) {
        return i;
      }
    }
    
    return panels.length; // Insert at end
  }

  /**
   * Show drop indicator at specified index
   */
  showDropIndicator(index: number): void {
    this._dropIndex = index;
  }

  /**
   * Hide drop indicator
   */
  hideDropIndicator(): void {
    this._dropIndex = null;
  }

  /**
   * Insert panel at specified index in the sidebar
   */
  insertPanelAt(panel: HTMLElement, index: number): void {
    const panels = this._getPanels();
    
    // Check if panel is already in this sidebar
    const currentIndex = panels.indexOf(panel as HTMLElement);
    
    // Adjust index if moving within same sidebar and moving down
    let adjustedIndex = index;
    if (currentIndex !== -1 && currentIndex < index) {
      adjustedIndex = index - 1;
    }
    
    // Remove from current position if in this sidebar
    if (currentIndex !== -1) {
      panel.remove();
    }
    
    // Get fresh panel list after removal
    const updatedPanels = this._getPanels();
    
    panel.setAttribute('docked', this.side);
    
    if (adjustedIndex >= updatedPanels.length) {
      this.appendChild(panel);
    } else {
      this.insertBefore(panel, updatedPanels[adjustedIndex]);
    }
    
    this.hideDropIndicator();
  }

  /**
   * Get the top position for the drop indicator
   */
  private _getDropIndicatorTop(): number {
    const panels = this._getPanels();
    
    if (this._dropIndex === null) return 0;
    
    if (this._dropIndex === 0) {
      return 0;
    }
    
    if (this._dropIndex >= panels.length) {
      // After last panel
      const lastPanel = panels[panels.length - 1];
      if (lastPanel) {
        const contentRect = this.shadowRoot?.querySelector('.content')?.getBoundingClientRect();
        const panelRect = lastPanel.getBoundingClientRect();
        if (contentRect) {
          return panelRect.bottom - contentRect.top;
        }
      }
      return 0;
    }
    
    // Before panel at dropIndex
    const panel = panels[this._dropIndex];
    const contentRect = this.shadowRoot?.querySelector('.content')?.getBoundingClientRect();
    if (panel && contentRect) {
      const panelRect = panel.getBoundingClientRect();
      return panelRect.top - contentRect.top - 2;
    }
    
    return 0;
  }

  connectedCallback(): void {
    super.connectedCallback();
    // Apply fixed size
    if (this.side === 'left' || this.side === 'right') {
      this.style.width = `${this.size}px`;
    } else {
      this.style.height = `${this.size}px`;
    }
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('size')) {
      if (this.side === 'left' || this.side === 'right') {
        this.style.width = `${this.size}px`;
      } else {
        this.style.height = `${this.size}px`;
      }
    }
  }

  render() {
    return html`
      <div class="content">
        <slot></slot>
        ${this._dropIndex !== null ? html`
          <div class="drop-indicator" style="top: ${this._getDropIndicatorTop()}px"></div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tui-sidebar': Sidebar;
  }
}

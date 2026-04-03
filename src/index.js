// TUI Component Library
// Terminal-aesthetic UI components built with Lit

// Layout (opinionated compositions)
export { App } from './components/tui-app.ts';
export { Workspace } from './components/tui-workspace.ts';
export { Sidebar } from './components/tui-sidebar.ts';

// Atoms (primitives)
export { Panel } from './components/tui-panel.ts';
export { Output } from './components/tui-output.ts';
export { Table } from './components/tui-table.ts';
export { Console } from './components/tui-console.ts';
export { Text } from './components/tui-text.ts';
export { Menu, MenuItem, MenuAction, MenuDivider } from './components/tui-menu.ts';
export { Statusbar, StatusItem } from './components/tui-statusbar.ts';
export { Modal } from './components/tui-modal.ts';
export { Button } from './components/tui-button.ts';
export { Toolbar, Tool } from './components/tui-toolbar.ts';
export { Toast, tuiToast } from './components/tui-toast.ts';
export { Card } from './components/tui-card.ts';
export { Palette } from './components/tui-palette.ts';
export { Canvas } from './components/tui-canvas.ts';
export { Link } from './components/tui-link.ts';
export { ActionList } from './components/tui-action-list.ts';
export { Stat } from './components/tui-stat.ts';
export { StatusStrip, StripItem } from './components/tui-status-strip.ts';
export { Titlebar } from './components/tui-titlebar.ts';
export { ZoneLayout } from './components/tui-zone-layout.ts';

// Form
export { Input } from './components/tui-input.ts';
export { Checkbox } from './components/tui-checkbox.ts';
export { Radio } from './components/tui-radio.ts';
export { CheckboxGroup } from './components/tui-checkbox-group.ts';
export { RadioGroup } from './components/tui-radio-group.ts';

// Tool State
export { ToolState, toolContext } from './state/tool-state.ts';

// Projections
export { getProjection } from './projections/index.ts';
export { RectangularProjection } from './projections/rectangular.ts';
export { IsometricProjection } from './projections/isometric.ts';
export { TriangularProjection } from './projections/triangular.ts';

// Utilities
export { ansiToHtml } from './utils/ansi.js';
export { RetroPush } from './utils/push-client.js';
export { renderGrid, isometricOrder } from './utils/canvas-renderer.js';
export { BORDER_CHARS, getBorderChars, titleDecoration, STATE_BORDERS } from './utils/borders.ts';

// Protocol
export { validateEvent } from './protocol/types.ts';
export { RetroEmitter } from './protocol/emitter.ts';
export { EventRouter } from './protocol/event-router.ts';

// New components
export { Progress } from './components/tui-progress.ts';
export { Status } from './components/tui-status.ts';

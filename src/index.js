// TUI Component Library
// Terminal-aesthetic UI components built with Lit

// Auto-inject design tokens (theme-terminal-classic by default).
// Override by adding a theme class to <body>: class="theme-vibrant-scifi"
import './styles/inject-tokens.ts';

// Layout (opinionated compositions)
export { App } from './components/tui-app';
export { Workspace } from './components/tui-workspace';
export { Sidebar } from './components/tui-sidebar';

// Atoms (primitives)
export { Panel } from './components/tui-panel';
export { Output } from './components/tui-output';
export { Table } from './components/tui-table';
export { Console } from './components/tui-console';
export { Text } from './components/tui-text';
export { Menu, MenuItem, MenuAction, MenuDivider } from './components/tui-menu';
export { Statusbar, StatusItem } from './components/tui-statusbar';
export { Modal } from './components/tui-modal';
export { Button } from './components/tui-button';
export { Toolbar, Tool } from './components/tui-toolbar';
export { Toast, tuiToast } from './components/tui-toast';
export { Card } from './components/tui-card';
export { Palette } from './components/tui-palette';
export { Canvas } from './components/tui-canvas';
export { Grid } from './components/tui-grid';
export { Link } from './components/tui-link';
export { ActionList } from './components/tui-action-list';
export { Stat } from './components/tui-stat';
export { StatusStrip, StripItem } from './components/tui-status-strip';
export { Titlebar } from './components/tui-titlebar';
export { Tiled, parseAreas } from './components/tui-tiled';

// Form
export { Input } from './components/tui-input';
export { Checkbox } from './components/tui-checkbox';
export { Radio } from './components/tui-radio';
export { CheckboxGroup } from './components/tui-checkbox-group';
export { RadioGroup } from './components/tui-radio-group';

// Tool State
export { ToolState, toolContext } from './state/tool-state';

// Projections
export { getProjection } from './projections/index';
export { RectangularProjection } from './projections/rectangular';
export { IsometricProjection } from './projections/isometric';
export { TriangularProjection } from './projections/triangular';

// Utilities
export { ansiToHtml } from './utils/ansi.js';
export { RetroPush } from './utils/push-client.js';
export { renderGrid, isometricOrder } from './utils/canvas-renderer.js';
export { createGrid, overlay, bodyToGrid, compose, createMoodCycler } from './utils/sprite';
export { BORDER_CHARS, getBorderChars, titleDecoration, STATE_BORDERS } from './utils/borders';

// Protocol
export { validateEvent } from './protocol/types';
export { RetroEmitter } from './protocol/emitter';
export { EventRouter } from './protocol/event-router';

// New components
export { Progress } from './components/tui-progress';
export { Status } from './components/tui-status';

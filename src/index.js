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

// Utilities
export { ansiToHtml } from './utils/ansi.js';
export { RetroPush } from './utils/push-client.js';

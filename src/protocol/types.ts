/** Standard event types that map to retro-tui components */
export type StandardEventType =
  | 'log'
  | 'progress'
  | 'table'
  | 'status'
  | 'prompt'
  | 'clear'
  | 'dismiss';

export interface LogData {
  message: string;
  // Deliberately 'warn', not 'warning': this is a log level following the
  // console.warn/syslog convention, not the visual semantic vocabulary used by
  // component `color`/`state` attributes. See docs/api/semantic-colors.md.
  level?: 'info' | 'warn' | 'error';
}

export interface ProgressData {
  value: number;
  label?: string;
  total?: number;
  current?: number;
}

export interface TableData {
  columns: string[];
  rows: Record<string, unknown>[];
}

export interface TableUpsertData {
  key: string;
  row: Record<string, unknown>;
}

export interface StatusData {
  state: 'success' | 'error' | 'info' | 'warning' | 'pending';
  message: string;
}

export interface CheckboxData {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
}

export interface RadioData {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
}

export interface InputData {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
}

export interface PromptData {
  message: string;
  options?: string[];
}

/** The protocol event envelope — every message follows this shape */
export interface TuiEvent {
  channel: string;
  type: string;
  id: string;
  data: Record<string, unknown>;
  timestamp?: number;
}

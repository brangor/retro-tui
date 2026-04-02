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
  state: 'success' | 'error' | 'info' | 'warn' | 'pending';
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

/** Validates that an object has the required event envelope fields */
export function validateEvent(event: TuiEvent): boolean {
  return (
    typeof event.channel === 'string' && event.channel.length > 0 &&
    typeof event.type === 'string' && event.type.length > 0 &&
    typeof event.id === 'string' && event.id.length > 0 &&
    event.data != null && typeof event.data === 'object'
  );
}

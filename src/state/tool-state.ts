import { createContext } from '@lit/context';

export interface ToolDefinition {
  id: string;
  group: string;
  icon?: string;
  name?: string;
  hotkey?: string;
}

export interface GroupDefinition {
  exclusive: boolean;
}

export interface ToolConfig {
  groups: Record<string, GroupDefinition>;
  tools: ToolDefinition[];
}

export class ToolState {
  activeTool: string | null = null;
  activeTools: string[] = [];
  groups: Record<string, GroupDefinition>;
  tools: ToolDefinition[];
  palette = {
    currentColor: '#000000',
    colors: [] as string[],
  };

  constructor(config: ToolConfig) {
    this.groups = config.groups;
    this.tools = config.tools;
  }
}

export const toolContext = createContext<ToolState>('tool-state');

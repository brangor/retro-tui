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

  selectTool(toolId: string): ToolState {
    const tool = this.tools.find((t) => t.id === toolId);
    if (!tool) return this;

    const group = this.groups[tool.group];
    if (!group) return this;

    if (group.exclusive) {
      this.activeTool = toolId;
    } else {
      if (!this.activeTools.includes(toolId)) {
        this.activeTools = [...this.activeTools, toolId];
      }
    }

    return this;
  }

  toggleTool(toolId: string): ToolState {
    const tool = this.tools.find((t) => t.id === toolId);
    if (!tool) return this;

    const group = this.groups[tool.group];
    if (!group) return this;

    if (group.exclusive) {
      return this.selectTool(toolId);
    }

    const isActive = this.activeTools.includes(toolId);
    this.activeTools = isActive
      ? this.activeTools.filter((id) => id !== toolId)
      : [...this.activeTools, toolId];

    return this;
  }

  isActive(toolId: string): boolean {
    return this.activeTool === toolId || this.activeTools.includes(toolId);
  }

  setColor(color: string): ToolState {
    this.palette = { ...this.palette, currentColor: color };
    return this;
  }
}

export const toolContext = createContext<ToolState>('tool-state');

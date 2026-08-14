/**
 * The semantic colour vocabulary.
 *
 * Every component that accepts a `color` attribute accepts exactly these values,
 * so the vocabulary is learned once and works everywhere. Each maps to a design
 * token, which is what makes theming work — a component styled `warning` follows
 * the active theme, where one styled `yellow` could not.
 *
 * Literal colour names (cyan, green, magenta, yellow, red) were removed in 4.0.0:
 * they were aliases for these tokens, resolved inconsistently between components,
 * and misdescribed themselves under any theme. See docs/api/semantic-colors.md.
 */
export const SEMANTIC_COLORS = [
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
  'info',
  'muted',
] as const;

export type SemanticColor = (typeof SEMANTIC_COLORS)[number] | '';

/** The CSS custom property each semantic value resolves to. */
export const SEMANTIC_TOKENS: Record<(typeof SEMANTIC_COLORS)[number], string> = {
  primary: '--color-primary',
  secondary: '--color-secondary',
  success: '--color-success',
  warning: '--color-warning',
  error: '--color-error',
  info: '--color-info',
  muted: '--text-muted',
};

/** How a selected element indicates selection. */
export type SelectionStyle = 'invert' | 'border' | '';

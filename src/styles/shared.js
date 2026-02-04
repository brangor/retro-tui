import { css } from 'lit';

// Shared CSS variables and base styles
export const sharedStyles = css`
  :host {
    --bg: #0d1117;
    --bg-light: #161b22;
    --border: #30363d;
    --text: #c9d1d9;
    --text-dim: #8b949e;
    --cyan: #58a6ff;
    --green: #3fb950;
    --yellow: #d29922;
    --magenta: #bc8cff;
    --red: #f85149;
    
    display: block;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace;
  }

  /* ANSI color classes */
  .ansi-black { color: #484848; }
  .ansi-red { color: var(--color-error); }
  .ansi-green { color: var(--color-secondary); }
  .ansi-yellow { color: var(--color-secondary); }
  .ansi-blue { color: var(--color-primary); }
  .ansi-magenta { color: var(--color-primary); }
  .ansi-cyan { color: #56d4dd; }
  .ansi-white { color: var(--text-primary); }
  .ansi-bold { font-weight: bold; }
  .ansi-dim { opacity: 0.7; }
`;

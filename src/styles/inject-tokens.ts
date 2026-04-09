import tokensCSS from './tokens.css?inline';

const SHEET_KEY = '__retro_tui_tokens__';

if (typeof document !== 'undefined' && !(document as any)[SHEET_KEY]) {
  // Inject design tokens via a real <style> tag — works everywhere,
  // no CSSStyleSheet constructor or adoptedStyleSheets needed.
  const style = document.createElement('style');
  style.textContent = tokensCSS;
  (document.head || document.documentElement).appendChild(style);

  // Apply baseline styles directly on <html> so all content inherits
  // readable defaults. This is the ThemeProvider — just import "retro-tui".
  const root = document.documentElement;
  root.style.setProperty('color', 'var(--text-primary)');
  root.style.setProperty('background', 'var(--surface-base)');
  root.style.setProperty('font-family', 'var(--font-mono)');
  root.style.setProperty('color-scheme', 'dark');

  (document as any)[SHEET_KEY] = true;
}

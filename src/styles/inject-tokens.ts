import tokensCSS from './tokens.css?inline';

const SHEET_KEY = '__retro_tui_tokens__';

if (typeof document !== 'undefined' && !(document as any)[SHEET_KEY]) {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(tokensCSS);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  (document as any)[SHEET_KEY] = true;
}

/**
 * Convert ANSI escape codes to HTML with span classes/styles.
 * @param {string} text - Text with ANSI escape codes
 * @returns {string} HTML string with styled spans
 */
export function ansiToHtml(text: string): string;
/**
 * Strip ANSI codes from text
 * @param {string} text - Text with ANSI escape codes
 * @returns {string} Plain text without ANSI codes
 */
export function stripAnsi(text: string): string;

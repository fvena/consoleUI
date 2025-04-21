import type { StripStylesFunction } from "../core/types";

/**
 * Strips ANSI escape codes from terminal text
 * @param text - The text to strip ANSI escape codes from
 * @returns The text without ANSI escape codes
 */
export const stripAnsiStyles: StripStylesFunction = (text: string): string => {
  // eslint-disable-next-line no-control-regex -- This is a valid regex for stripping ANSI escape codes
  const pattern = /[\u001B\u009B]\[\d+m/g;
  return text.replaceAll(pattern, "");
};

/**
 * Strips CSS styles from browser text
 * @param text - The text to strip CSS styles from
 * @returns The text without CSS styles
 */
export const stripCssStyles: StripStylesFunction = (text: string): string => {
  const pattern = /__STYLE_([A-Z0-9_#]+?)__/g;
  return text.replaceAll(pattern, "");
};

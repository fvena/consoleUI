import type { StyleOptions } from "./types";

/**
 * Default options for individual style functions
 *
 * @remarks
 * These options are used as defaults when creating custom styles
 * with makeStyle. They can be overridden by providing specific
 * options to makeStyle.
 *
 * @example
 * ```typescript
 * const style = makeStyle({ ...DEFAULT_STYLE_OPTIONS, color: 'red' });
 * ```
 */
export const DEFAULT_STYLE_OPTIONS: StyleOptions = {
  backgroundColor: undefined,
  bold: false,
  color: undefined,
  dim: false,
  enabled: true,
  hidden: false,
  italic: false,
  strikethrough: false,
  underline: false,
};

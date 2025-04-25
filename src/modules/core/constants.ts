import type { ConsoleUIOptions } from "./types";

/**
 * Default options for ConsoleUI instances
 *
 * @remarks
 * These options affect the global behavior of all styling functions
 * in a ConsoleUI instance. They can be overridden when creating
 * a new instance.
 *
 * @example
 * ```typescript
 * const ui = createConsoleUI({ ...DEFAULT_OPTIONS, enabled: false });
 * ```
 */
export const DEFAULT_OPTIONS: ConsoleUIOptions = {
  enabled: true,
};

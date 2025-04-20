import type {
  ConsoleUI,
  ConsoleUIOptions,
  Style,
  StyleFunction,
  StyleOptions,
} from "../core/types";
import { DEFAULT_OPTIONS } from "../core/constants";

/**
 * Factory function to create a new ConsoleUI instance
 *
 * This function creates a new ConsoleUI API instance with the specified style creators.
 * It provides a flexible way to create console styling functionality that can work
 * in different environments (terminal, browser) by accepting environment-specific
 * style creation functions.
 *
 * @param createStyle - Function to create a basic style function for a specific style type
 * @param makeStyle - Function to create a custom style function with advanced options
 * @returns A factory function that creates a configured ConsoleUI instance
 *
 * @remarks
 * The factory pattern used here allows for:
 * - Environment-specific style implementations
 * - Consistent API across different environments
 * - Global configuration through options
 *
 * @example
 * ```typescript
 * // Create a ConsoleUI factory with environment-specific implementations
 * const factory = createConsoleUI(terminalStyle, terminalMakeStyle);
 *
 * // Create an instance with default options
 * const defaultUI = factory();
 *
 * // Create an instance with custom options
 * const customUI = factory({ enabled: false });
 * ```
 */
export function createConsoleUI(
  createStyle: (styleType: Style, enabled: boolean) => StyleFunction,
  makeStyle: (options: StyleOptions) => StyleFunction,
) {
  /**
   * Creates a ConsoleUI instance with the specified options
   *
   * @param options - Optional configuration for the ConsoleUI instance
   * @returns A fully configured ConsoleUI instance with all available styles
   */
  return (options: Partial<ConsoleUIOptions> = {}): ConsoleUI => {
    // Merge provided options with defaults
    const options_ = { ...DEFAULT_OPTIONS, ...options };

    // Create and return the complete API with all available styles
    return {
      // Base colors
      bgBlack: createStyle("bgBlack", options_.enabled),
      bgBlackBright: createStyle("bgBlackBright", options_.enabled),
      bgBlue: createStyle("bgBlue", options_.enabled),
      bgBlueBright: createStyle("bgBlueBright", options_.enabled),
      bgCyan: createStyle("bgCyan", options_.enabled),
      bgCyanBright: createStyle("bgCyanBright", options_.enabled),
      bgGray: createStyle("bgGray", options_.enabled),
      bgGreen: createStyle("bgGreen", options_.enabled),
      bgGreenBright: createStyle("bgGreenBright", options_.enabled),
      bgMagenta: createStyle("bgMagenta", options_.enabled),
      bgMagentaBright: createStyle("bgMagentaBright", options_.enabled),
      bgRed: createStyle("bgRed", options_.enabled),
      bgRedBright: createStyle("bgRedBright", options_.enabled),
      bgWhite: createStyle("bgWhite", options_.enabled),
      bgWhiteBright: createStyle("bgWhiteBright", options_.enabled),
      bgYellow: createStyle("bgYellow", options_.enabled),
      bgYellowBright: createStyle("bgYellowBright", options_.enabled),
      black: createStyle("black", options_.enabled),
      blackBright: createStyle("blackBright", options_.enabled),
      blue: createStyle("blue", options_.enabled),
      blueBright: createStyle("blueBright", options_.enabled),
      cyan: createStyle("cyan", options_.enabled),
      cyanBright: createStyle("cyanBright", options_.enabled),
      gray: createStyle("gray", options_.enabled),
      green: createStyle("green", options_.enabled),
      greenBright: createStyle("greenBright", options_.enabled),
      magenta: createStyle("magenta", options_.enabled),
      magentaBright: createStyle("magentaBright", options_.enabled),
      makeStyle: (options: StyleOptions) => makeStyle(options),
      red: createStyle("red", options_.enabled),
      redBright: createStyle("redBright", options_.enabled),
      reset: createStyle("reset", options_.enabled),
      white: createStyle("white", options_.enabled),
      whiteBright: createStyle("whiteBright", options_.enabled),
      yellow: createStyle("yellow", options_.enabled),
      yellowBright: createStyle("yellowBright", options_.enabled),
    };
  };
}

/**
 * Available background colors for text styling in the console
 * These colors are supported in both terminal and browser environments
 */
export type BackgroundColor =
  | "bgBlack"
  | "bgBlackBright"
  | "bgBlue"
  | "bgBlueBright"
  | "bgCyan"
  | "bgCyanBright"
  | "bgGray"
  | "bgGreen"
  | "bgGreenBright"
  | "bgMagenta"
  | "bgMagentaBright"
  | "bgRed"
  | "bgRedBright"
  | "bgWhite"
  | "bgWhiteBright"
  | "bgYellow"
  | "bgYellowBright";

/**
 * Available colors for text styling in the console
 * These colors are supported in both terminal and browser environments
 */
export type Color =
  | "black"
  | "blackBright"
  | "blue"
  | "blueBright"
  | "cyan"
  | "cyanBright"
  | "gray"
  | "green"
  | "greenBright"
  | "magenta"
  | "magentaBright"
  | "red"
  | "redBright"
  | "white"
  | "whiteBright"
  | "yellow"
  | "yellowBright";

/**
 * All available text styles
 */
export type Style = "reset" | BackgroundColor | Color;

/**
 * Maps color names to their corresponding style codes
 *
 * @remarks
 * In terminal environments, these map to ANSI color codes
 * In browser environments, these map to CSS color values
 */
export type Colors = Record<BackgroundColor | Color, string>;

/**
 * Maps style names to their corresponding style codes
 */
export type Styles = Record<Style, string>;

/**
 * A function that applies styling to text
 *
 * @param text - The text to style (can be string, number, or boolean)
 * @returns The styled text with appropriate style codes applied
 */
export type StyleFunction = (text: string) => string;

/**
 * The main ConsoleUI API interface
 * Provides a complete set of styling functions and utilities
 */
export interface ConsoleUI extends Record<Style, StyleFunction> {
  /**
   * Creates a custom style function with specified options
   *
   * @param options - Configuration for the style function
   * @returns A function that applies the configured styles
   *
   * @example
   * ```typescript
   * const warning = ui.makeStyle({ color: 'yellow', enabled: true });
   * console.log(warning('Warning message'));
   * ```
   */
  makeStyle: (options: StyleOptions) => StyleFunction;
}

/**
 * Global configuration options for the ConsoleUI instance
 * Controls the default behavior of all styling functions
 *
 * @remarks
 * These options affect all style functions created by the instance
 * Individual style functions can override these settings
 */
export interface ConsoleUIOptions {
  /**
   * Master switch for styling functionality
   * When false, all styling functions return text without modification
   *
   * @defaultValue true
   */
  enabled: boolean;
}

/**
 * Configuration options for creating custom styles
 * Used with the makeStyle function to create specialized styling functions
 */
export interface StyleOptions {
  /**
   * The background color to apply to the text.
   */
  backgroundColor?: BackgroundColor;

  /**
   * The color to apply to the text.
   */
  color?: Color;

  /**
   * Controls whether this specific style is enabled
   * Overrides the global enabled setting for this style
   *
   * @defaultValue true
   */
  enabled?: boolean;
}

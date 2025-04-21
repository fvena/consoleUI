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
 * Available text formatting styles
 */
export type TextFormat = "bold" | "dim" | "hidden" | "italic" | "strikethrough" | "underline";

/**
 * All available text styles
 */
export type Style = "reset" | BackgroundColor | Color | TextFormat;

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
 * Configuration options for creating custom styles
 * Used with the makeStyle function to create specialized styling functions
 */
export interface StyleOptions {
  /**
   * The background color to apply to the text.
   */
  backgroundColor?: BackgroundColor;

  /**
   * Apply bold formatting to the text
   * @defaultValue false
   */
  bold?: boolean;

  /**
   * The color to apply to the text.
   */
  color?: Color;

  /**
   * Apply dim formatting to the text
   * @defaultValue false
   */
  dim?: boolean;

  /**
   * Controls whether this specific style is enabled
   * Overrides the global enabled setting for this style
   *
   * @defaultValue true
   */
  enabled?: boolean;

  /**
   * Apply hidden formatting to the text
   * @defaultValue false
   */
  hidden?: boolean;

  /**
   * Apply italic formatting to the text
   * @defaultValue false
   */
  italic?: boolean;

  /**
   * Apply strikethrough formatting to the text
   * @defaultValue false
   */
  strikethrough?: boolean;

  /**
   * Apply underline formatting to the text
   * @defaultValue false
   */
  underline?: boolean;
}

/**
 * The main ConsoleUI API interface
 * Provides a complete set of styling functions and utilities
 */
export interface ConsoleUI extends Record<Style, StyleFunction> {
  /**
   * Creates a box with specified options
   * @param content - The content to place inside the box
   * @param options - The options for the box
   * @returns The styled box
   */
  box: (content: string, borderColor?: Color) => string;

  /**
   * Creates a function that applies a hex color to text
   * @param color - The hex color code to apply
   * @param text - The text to style
   * @returns The styled text
   *
   * @example
   * ```typescript
   * const customColor = ui.hex('#FF0000');
   * console.log(customColor('Hello, world!'));
   * ```
   */
  hex: (color: string, isForeground?: boolean) => StyleFunction;

  /**
   * Creates a function that applies a box style to text
   * @param options - The options for the box style
   * @returns A function that applies the box style to text
   */
  makeBox: (options: BoxOptions) => StyleFunction;

  /**
   * Creates a custom style function with specified options
   *
   * @param options - Configuration for the style function
   * @returns A function that applies the configured styles
   *
   * @example
   * ```typescript
   * const warning = ui.makeStyle({ color: 'yellow', bold: true, enabled: true });
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

export type BorderStyle = "double" | "rounded" | "single";

export type TextAlign = "center" | "left" | "right";

export interface BoxOptions {
  align?: TextAlign;
  borderColor?: Color;
  borderStyle?: BorderStyle;
  horizontalPadding?: number;
  verticalPadding?: number;
  width?: number;
}

export interface BoxStyle {
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  topLeft: string;
  topRight: string;
  vertical: string;
}

/**
 * Function to strip style characters from text
 * Each environment will implement this differently
 * Terminal: strips ANSI escape codes
 * Browser: strips CSS style markers
 */
export type StripStylesFunction = (text: string) => string;

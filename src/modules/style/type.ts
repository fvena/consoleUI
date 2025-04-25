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

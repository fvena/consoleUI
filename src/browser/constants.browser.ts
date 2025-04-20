import type { Colors, Styles } from "../core/types";

/**
 * CSS color values for browser text styling
 */
export const CSS_COLORS = {
  // Background colors
  bgBlack: "background-color: #000000; padding: 2px 4px; border-radius: 2px",
  bgBlackBright: "background-color: #808080; padding: 2px 4px; border-radius: 2px",
  bgBlue: "background-color: #0000FF; padding: 2px 4px; border-radius: 2px",
  bgBlueBright: "background-color: #0066FF; padding: 2px 4px; border-radius: 2px",
  bgCyan: "background-color: #00FFFF; padding: 2px 4px; border-radius: 2px",
  bgCyanBright: "background-color: #00FFFF; padding: 2px 4px; border-radius: 2px",
  bgGray: "background-color: #808080; padding: 2px 4px; border-radius: 2px",
  bgGreen: "background-color: #008000; padding: 2px 4px; border-radius: 2px",
  bgGreenBright: "background-color: #00FF00; padding: 2px 4px; border-radius: 2px",
  bgMagenta: "background-color: #FF00FF; padding: 2px 4px; border-radius: 2px",
  bgMagentaBright: "background-color: #FF40FF; padding: 2px 4px; border-radius: 2px",
  bgRed: "background-color: #FF0000; padding: 2px 4px; border-radius: 2px",
  bgRedBright: "background-color: #FF4040; padding: 2px 4px; border-radius: 2px",
  bgWhite: "background-color: #FFFFFF; padding: 2px 4px; border-radius: 2px",
  bgWhiteBright: "background-color: #FFFFFF; padding: 2px 4px; border-radius: 2px",
  bgYellow: "background-color: #FFFF00; padding: 2px 4px; border-radius: 2px",
  bgYellowBright: "background-color: #FFFF40; padding: 2px 4px; border-radius: 2px",

  // Base colors
  black: "color: #000000",
  blackBright: "color: #808080",
  blue: "color: #0000FF",
  blueBright: "color: #0066FF",
  cyan: "color: #00FFFF",
  cyanBright: "color: #00FFFF",
  gray: "color: #808080",
  green: "color: #008000",
  greenBright: "color: #00FF00",
  magenta: "color: #FF00FF",
  magentaBright: "color: #FF40FF",
  red: "color: #FF0000",
  redBright: "color: #FF4040",
  white: "color: #FFFFFF",
  whiteBright: "color: #FFFFFF",
  yellow: "color: #FFFF00",
  yellowBright: "color: #FFFF40",
} as const satisfies Colors;

/**
 * CSS styles for text formatting
 */
export const CSS_FORMATS = {
  bold: "font-weight: bold",
  dim: "opacity: 0.5",
  hidden: "visibility: hidden",
  italic: "font-style: italic",
  strikethrough: "text-decoration: line-through",
  underline: "text-decoration: underline",
} as const;

/**
 * CSS style for resetting text formatting
 */
export const RESET = "";

/**
 * All CSS styles supported by the library
 */
export const STYLES = {
  ...CSS_COLORS,
  ...CSS_FORMATS,
  reset: RESET,
} as const satisfies Styles;

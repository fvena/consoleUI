import type { Colors, Styles } from "./type";

export const BACKGROUND_STYLE = "padding: 2px 4px; border-radius: 2px";

/**
 * CSS color values for browser text styling
 */
export const CSS_COLORS = {
  // Background colors
  bgBlack: `background-color: #000000; ${BACKGROUND_STYLE}`,
  bgBlackBright: `background-color: #808080; ${BACKGROUND_STYLE}`,
  bgBlue: `background-color: #0000FF; ${BACKGROUND_STYLE}`,
  bgBlueBright: `background-color: #0066FF; ${BACKGROUND_STYLE}`,
  bgCyan: `background-color: #00FFFF; ${BACKGROUND_STYLE}`,
  bgCyanBright: `background-color: #00FFFF; ${BACKGROUND_STYLE}`,
  bgGray: `background-color: #808080; ${BACKGROUND_STYLE}`,
  bgGreen: `background-color: #008000; ${BACKGROUND_STYLE}`,
  bgGreenBright: `background-color: #00FF00; ${BACKGROUND_STYLE}`,
  bgMagenta: `background-color: #FF00FF; ${BACKGROUND_STYLE}`,
  bgMagentaBright: `background-color: #FF40FF; ${BACKGROUND_STYLE}`,
  bgRed: `background-color: #FF0000; ${BACKGROUND_STYLE}`,
  bgRedBright: `background-color: #FF4040; ${BACKGROUND_STYLE}`,
  bgWhite: `background-color: #FFFFFF; ${BACKGROUND_STYLE}`,
  bgWhiteBright: `background-color: #FFFFFF; ${BACKGROUND_STYLE}`,
  bgYellow: `background-color: #FFFF00; ${BACKGROUND_STYLE}`,
  bgYellowBright: `background-color: #FFFF40; ${BACKGROUND_STYLE}`,

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
  monospace: "font-family: 'Courier New', Courier, monospace",
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

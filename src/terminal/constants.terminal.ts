import type { Colors, Styles } from "../core/types";

/**
 * ANSI color codes for terminal text styling
 */
export const ANSI_COLORS = {
  // Background colors
  bgBlack: "\u001B[40m",
  bgBlackBright: "\u001B[100m",
  bgBlue: "\u001B[44m",
  bgBlueBright: "\u001B[104m",
  bgCyan: "\u001B[46m",
  bgCyanBright: "\u001B[106m",
  bgGray: "\u001B[100m",
  bgGreen: "\u001B[42m",
  bgGreenBright: "\u001B[102m",
  bgMagenta: "\u001B[45m",
  bgMagentaBright: "\u001B[105m",
  bgRed: "\u001B[41m",
  bgRedBright: "\u001B[101m",
  bgWhite: "\u001B[47m",
  bgWhiteBright: "\u001B[107m",
  bgYellow: "\u001B[43m",
  bgYellowBright: "\u001B[103m",

  // Base colors
  black: "\u001B[30m",
  blackBright: "\u001B[90m",
  blue: "\u001B[34m",
  blueBright: "\u001B[94m",
  cyan: "\u001B[36m",
  cyanBright: "\u001B[96m",
  gray: "\u001B[90m",
  green: "\u001B[32m",
  greenBright: "\u001B[92m",
  magenta: "\u001B[35m",
  magentaBright: "\u001B[95m",
  red: "\u001B[31m",
  redBright: "\u001B[91m",
  white: "\u001B[37m",
  whiteBright: "\u001B[97m",
  yellow: "\u001B[33m",
  yellowBright: "\u001B[93m",
} as const satisfies Colors;

/**
 * ANSI code for resetting text formatting
 */
export const RESET = "\u001B[0m";

/**
 * All ANSI styles supported by the library
 */
export const STYLES = {
  ...ANSI_COLORS,
  reset: RESET,
} as const satisfies Styles;

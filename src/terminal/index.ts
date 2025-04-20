/**
 * Terminal environment implementation for ConsoleUI.
 *
 * This module provides styling capabilities for console output in terminal environments.
 * It exports style functions that generate ANSI escape codes and a log function that processes
 * these codes to display styled console output.
 *
 * @example
 * ```typescript
 * import { red, blue, bold, underline } from '@franvena/consoleui/terminal';
 *
 * console.log(red('Error message'));     // Prints in red
 * console.log(blue('Info message'));     // Prints in blue
 * console.log(bold('Important text'));   // Prints in bold
 * console.log(underline('Highlighted')); // Prints underlined
 * ```
 *
 * @throws TypeError If used in a non-Node.js environment
 */

import { createConsoleUI } from "../core/factory-console-ui";
import { createStyle, hex as hex_, makeStyle as makeStyle_ } from "./style-terminal";

/**
 * Runtime environment verification.
 * Ensures the module is being used in a Node.js environment.
 *
 * @throws TypeError If used in a non-Node.js environment
 */
if (typeof process === "undefined") {
  throw new TypeError(
    'You are trying to use Terminal styles in a browser environment. For browser environment, use "@franvena/consoleui/browser" instead.',
  );
}

/**
 * Creates the ConsoleUI instance configured for terminal environment
 */
const consoleUI = createConsoleUI(createStyle, makeStyle_, hex_);
const api = consoleUI();

export default api;
export { consoleUI };

/**
 * Pre-configured style functions for common terminal colors and formats
 * Each function applies the corresponding ANSI color or format to the input text
 *
 * @remarks
 * Import and use these functions directly to apply colors and formats to your terminal output:
 *
 * ```typescript
 * import { red, blue, bold, underline } from '@franvena/consoleui/terminal';
 *
 * console.log(red('Error message'));     // Prints in red
 * console.log(blue('Info message'));     // Prints in blue
 * console.log(bold('Important text'));   // Prints in bold
 * console.log(underline('Highlighted')); // Prints underlined
 * ```
 */
export const {
  bgBlack,
  bgBlackBright,
  bgBlue,
  bgBlueBright,
  bgCyan,
  bgCyanBright,
  bgGray,
  bgGreen,
  bgGreenBright,
  bgMagenta,
  bgMagentaBright,
  bgRed,
  bgRedBright,
  bgWhite,
  bgWhiteBright,
  bgYellow,
  bgYellowBright,
  black,
  blackBright,
  blue,
  blueBright,
  bold,
  cyan,
  cyanBright,
  dim,
  gray,
  green,
  greenBright,
  hex,
  hidden,
  italic,
  magenta,
  magentaBright,
  makeStyle,
  red,
  redBright,
  strikethrough,
  underline,
  white,
  whiteBright,
  yellow,
  yellowBright,
} = api;

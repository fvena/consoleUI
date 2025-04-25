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

import { createConsoleUI } from "./modules/core";
import { createBox } from "./modules/box";
import { stripAnsiStyles } from "./utils/strip-styles";
import { isNode } from "./utils/enviroment";
import { createStyle, hex as hex_, makeStyle as makeStyle_ } from "./modules/style/terminal";

/**
 * Runtime environment verification.
 * Ensures the module is being used in a Node.js environment.
 *
 * @throws TypeError If used in a non-Node.js environment
 */
if (!isNode()) {
  throw new TypeError(
    'You are trying to use Terminal styles in a browser environment. For browser environment, use "@franvena/consoleui/browser" instead.',
  );
}

/**
 * Creates components factory with environment-specific styling
 */
const { box: box_, makeBox: makeBox_ } = createBox(createStyle, stripAnsiStyles);

/**
 * Creates the ConsoleUI instance configured for terminal environment
 */
const consoleUI = createConsoleUI(createStyle, makeStyle_, makeBox_, hex_, box_);
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
  box,
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
  makeBox,
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

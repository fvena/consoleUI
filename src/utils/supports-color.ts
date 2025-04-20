/**
 * This module provides functionality to determine whether the current environment
 * supports ANSI color codes for terminal output styling.
 */

/**
 * Checks if the current environment supports ANSI colors.
 * @returns true if the environment supports colors, false otherwise
 */
export function supportsColor(): boolean {
  // Early return for non-Node.js environments (like browsers)
  if (typeof process === "undefined" || !process.stdout.isTTY) {
    return true;
  }

  // Check if NO_COLOR environment variable is set
  if (process.env.NO_COLOR !== undefined) {
    return false;
  }

  // Check if FORCE_COLOR environment variable is set
  if (process.env.FORCE_COLOR !== undefined) {
    return true;
  }

  // Check if Windows (modern Windows terminals support colors)
  // Windows 10+ terminals like Windows Terminal support ANSI colors
  if (process.platform === "win32") {
    return true;
  }

  // Check if running in a color-supporting terminal
  // Most modern terminals support colors, except for "dumb" terminals
  return process.env.TERM !== undefined && process.env.TERM !== "dumb";
}

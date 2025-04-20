/**
 * Color utilities for handling hexadecimal color codes and conversions
 */

/**
 * Validates and normalizes a hexadecimal color code
 * @param hex - The hexadecimal color code to validate
 * @returns The normalized hex color code or undefined if invalid
 */
export function validateHex(hex: string): string | undefined {
  if (!hex || typeof hex !== "string" || !hex.startsWith("#")) return undefined;

  // Remove #
  hex = hex.replace(/^#/, "");

  // Check valid formats: RGB, RRGGBB
  if (!/^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex)) {
    throw new Error(`Invalid hex color code: ${hex}`);
  }

  // Convert shorthand (3 digits) to full form (6 digits)
  if (hex.length === 3) {
    // We can safely use split('') here as we're only dealing with ASCII hex characters (0-9, A-F).
    // Using spread operator or Intl.Segmenter would be overkill for this specific case.
    hex = hex
      // eslint-disable-next-line unicorn/prefer-spread -- Safe usage with hex characters only
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return `#${hex.toUpperCase()}`;
}

/**
 * Interface for RGBA color components
 */
export interface RGBColor {
  b: number;
  g: number;
  r: number;
}

/**
 * Converts a hexadecimal color to RGB components
 * @param hex - The hexadecimal color code
 * @returns An object with r, g, b, a components or undefined if invalid
 */
export function hexToRgb(hex: string): RGBColor {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);

  return { b, g, r };
}

/**
 * Converts RGB values to the closest ANSI 256 color code
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns The closest ANSI 256 color code
 */
export function rgbToAnsi256(r: number, g: number, b: number): number {
  // Standard 16 colors
  if (r === g && g === b) {
    if (r < 8) return 16;
    if (r > 248) return 231;
    return Math.round(((r - 8) / 247) * 24) + 232;
  }

  // RGB 6x6x6 cube (216 colors)
  const ansi =
    16 + 36 * Math.round((r / 255) * 5) + 6 * Math.round((g / 255) * 5) + Math.round((b / 255) * 5);

  return ansi;
}

/**
 * Converts RGB values to the closest basic ANSI color code (0-15)
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns The closest basic ANSI color code
 */
export function rgbToAnsiBasic(r: number, g: number, b: number): number {
  const colors = [
    [0, 0, 0], // black
    [128, 0, 0], // red
    [0, 128, 0], // green
    [128, 128, 0], // yellow
    [0, 0, 128], // blue
    [128, 0, 128], // magenta
    [0, 128, 128], // cyan
    [192, 192, 192], // white/gray
    [128, 128, 128], // bright black
    [255, 0, 0], // bright red
    [0, 255, 0], // bright green
    [255, 255, 0], // bright yellow
    [0, 0, 255], // bright blue
    [255, 0, 255], // bright magenta
    [0, 255, 255], // bright cyan
    [255, 255, 255], // bright white
  ] as const;

  let minDistance = Infinity;
  let closestIndex = 0;

  for (const [index, color] of colors.entries()) {
    const [red, green, blue] = color;
    const distance = Math.sqrt(
      Math.pow(red - r, 2) + Math.pow(green - g, 2) + Math.pow(blue - b, 2),
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestIndex = index;
    }
  }

  return closestIndex;
}

/**
 * Detects the terminal's color support level
 * @returns The color support level (basic, 256, or truecolor)
 */
export type ColorSupport = "256" | "basic" | "truecolor";
export function detectColorSupport(): ColorSupport {
  const term = process.env.TERM ?? "";
  const colorTerm = process.env.COLORTERM ?? "";

  if (colorTerm === "truecolor" || colorTerm === "24bit") {
    return "truecolor";
  }

  if (term.includes("256") || process.env.TERM_PROGRAM === "iTerm.app") {
    return "256";
  }

  return "basic";
}

import type { Style, StyleFunction, StyleOptions } from "../core/types";
import { isColor } from "../utils/guards";
import { DEFAULT_STYLE_OPTIONS } from "../core/constants";
import { ANSI_COLORS, STYLES } from "./constants.terminal";

/**
 * Creates a style function for terminal text styling
 *
 * @param style - The style type to apply (e.g., 'red', 'bold', 'italic')
 * @param enabled - Whether the style should be applied (defaults to true)
 * @returns A function that applies the specified style to input text
 * @throws TypeError If the input text is not a string, number, or boolean
 * @throws Error If the style parameter is not a valid style from STYLES
 *
 * @remarks
 * Usage example:
 * ```typescript
 * const redStyle = createStyle('red');
 * console.log(redStyle('Error message')); // Will print in red
 *
 * const disabledStyle = createStyle('blue', false);
 * console.log(disabledStyle('Normal text')); // Will print without styling
 * ```
 */
export function createStyle(style: Style, enabled = true): StyleFunction {
  return (text: string) => {
    if (!enabled) return text;
    if (!text) return "";

    // Input validation and type coercion
    if (typeof text !== "string") {
      if (typeof text === "number" || typeof text === "boolean") {
        text = String(text);
      } else {
        throw new TypeError(
          "The text passed to the style function must be a string, number, or boolean.",
        );
      }
    }

    // Style validation
    if (!isColor(style, STYLES)) {
      throw new Error(
        `The style ${style} passed does not match any of the supported styles. Ensure it is one of the following supported values: ${Object.keys(STYLES).join(", ")}`,
      );
    }

    // Handle nested style resets
    const resetEscaped = STYLES.reset.replaceAll(/[[\]]/g, String.raw`\$&`);
    const processedText = text.replaceAll(
      new RegExp(resetEscaped, "g"),
      `${STYLES.reset}${STYLES[style]}`,
    );

    return `${STYLES[style]}${processedText}${STYLES.reset}`;
  };
}

/**
 * Creates a style function with multiple styling options for the terminal environment
 * This is a higher-level function that provides a more flexible way to apply styles
 * compared to createStyle.
 *
 * @param options - Style configuration options
 *   - enabled: Whether styling should be applied (defaults to true)
 *   - color: The text color to apply (optional)
 *   - backgroundColor: The background color to apply (optional)
 * @returns A function that applies the specified styles to input text
 *
 * @remarks
 * Usage example:
 * ```typescript
 * const customStyle = makeStyle({ color: 'blue', backgroundColor: 'bgWhite', enabled: true });
 * console.log(customStyle('Info message')); // Will print in blue on white background
 *
 * const disabledStyle = makeStyle({ enabled: false });
 * console.log(disabledStyle('Normal text')); // Will print without styling
 * ```
 */
export function makeStyle(options: StyleOptions): StyleFunction {
  const options_ = { ...DEFAULT_STYLE_OPTIONS, ...options };

  return (text: string) => {
    if (!text) return "";
    if (!options_.enabled) return text;

    let styledText = text;

    if (options_.backgroundColor && isColor(options_.backgroundColor, ANSI_COLORS)) {
      styledText = createStyle(options_.backgroundColor)(styledText);
    }

    if (options_.color && isColor(options_.color, ANSI_COLORS)) {
      styledText = createStyle(options_.color)(styledText);
    }

    return styledText;
  };
}

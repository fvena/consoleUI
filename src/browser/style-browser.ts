import type { Style, StyleFunction, StyleOptions } from "../core/types";
import { isColor } from "../utils/guards";
import { DEFAULT_STYLE_OPTIONS } from "../core/constants";
import { camelToUpperSnake, upperSnakeToCamel } from "../utils/case-transform";
import { CSS_COLORS, STYLES } from "./constants.browser";

/**
 * Creates a style function for the browser environment.
 * The function wraps text with special markers that will be processed by the log function.
 *
 * @param style - The style type to apply (e.g., 'red', 'bold', 'italic')
 * @param enabled - Whether the style is enabled (defaults to true)
 * @returns A function that applies the specified style to input text
 * @throws Error If the style is not supported in the browser environment
 *
 * @example
 * ```typescript
 * const redText = createStyle('red');
 * console.log(redText('This will be red')); // Outputs red text
 *
 * const disabledStyle = createStyle('blue', false);
 * console.log(disabledStyle('This will be normal')); // Outputs normal text
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

    const startMarker = `__STYLE_${camelToUpperSnake(style)}__`;
    const endMarker = "__STYLE_RESET__";
    return `${startMarker}${text}${endMarker}`;
  };
}

/**
 * Creates a style function with multiple styling options for the browser environment.
 * This is a higher-level function that provides a more flexible way to apply styles
 * compared to createStyle.
 *
 * @param options - Configuration object for styling:
 *   - enabled: Whether styling should be applied (defaults to true)
 *   - color: The text color to apply (optional)
 *   - backgroundColor: The background color to apply (optional)
 *   - bold: Apply bold formatting (optional)
 *   - italic: Apply italic formatting (optional)
 *   - underline: Apply underline formatting (optional)
 *   - strikethrough: Apply strikethrough formatting (optional)
 *   - dim: Apply dim formatting (optional)
 *   - hidden: Apply hidden formatting (optional)
 * @returns A function that applies the specified styles to input text
 *
 * @remarks
 * Usage example:
 * ```typescript
 * const customStyle = makeStyle({
 *   color: 'blue',
 *   backgroundColor: 'bgWhite',
 *   bold: true,
 *   underline: true,
 *   enabled: true
 * });
 * console.log(customStyle('Info message')); // Will print in blue on white background, bold and underlined
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

    // Apply background color if specified
    if (options_.backgroundColor && isColor(options_.backgroundColor, CSS_COLORS)) {
      styledText = createStyle(options_.backgroundColor)(styledText);
    }

    // Apply text color if specified
    if (options_.color && isColor(options_.color, CSS_COLORS)) {
      styledText = createStyle(options_.color)(styledText);
    }

    // Apply text formatting options
    if (options_.bold) {
      styledText = createStyle("bold")(styledText);
    }

    if (options_.italic) {
      styledText = createStyle("italic")(styledText);
    }

    if (options_.underline) {
      styledText = createStyle("underline")(styledText);
    }

    if (options_.strikethrough) {
      styledText = createStyle("strikethrough")(styledText);
    }

    if (options_.dim) {
      styledText = createStyle("dim")(styledText);
    }

    if (options_.hidden) {
      styledText = createStyle("hidden")(styledText);
    }

    return styledText;
  };
}

/**
 * Processes and logs styled text to the console.
 * This function is the core of the browser styling system, converting style markers
 * to CSS styles and handling nested styling. It supports multiple concurrent styles
 * and proper style reset handling.
 *
 * @param input - The text to process and log, containing style markers
 *
 * @example
 * ```typescript
 * // Single style
 * log('__STYLE_RED__Hello__STYLE_RESET__'); // Outputs "Hello" in red
 *
 * // Nested styles
 * log('__STYLE_RED__Hello __STYLE_BOLD__World__STYLE_RESET____STYLE_RESET__');
 * // Outputs "Hello" in red and "World" in red and bold
 * ```
 *
 * @remarks
 * - The function processes style markers in the format __STYLE_NAME__ and __STYLE_RESET__
 * - Invalid style markers are preserved as literal text
 * - Empty or non-string inputs are logged as-is
 * - Styles can be nested and will be properly combined
 */
export function log(input: string): void {
  if (!input || typeof input !== "string") {
    console.log(input);
    return;
  }

  // Expresión regular para encontrar etiquetas de estilo
  const tagRegex = /__STYLE_([A-Z_]+?)__/g;

  // Variables para construir el console.log
  const currentStyles: Style[] = []; // Pila de estilos activos
  const styleValidityStack: boolean[] = []; // Pila para rastrear validez de estilos
  let consoleString = ""; // String final para console.log
  const styleArguments: string[] = []; // Argumentos de estilo para console.log
  let lastIndex = 0;

  // Procesamos todas las coincidencias de etiquetas
  input.replaceAll(tagRegex, (match, styleName: string, index: number) => {
    // Añadimos el texto antes de la etiqueta al string de salida
    consoleString += input.slice(lastIndex, index);

    // Convertimos el nombre del estilo a camelCase
    const styleKey = upperSnakeToCamel(styleName) as Style;

    // Si es un estilo válido (existe en STYLES y no es reset)
    if (styleKey in STYLES && styleKey !== "reset") {
      // Añadimos una directiva %c para el estilo
      consoleString += "%c";
      // Actualizamos los estilos actuales
      currentStyles.push(styleKey);
      styleValidityStack.push(true);
      // Añadimos el estilo combinado a los argumentos
      styleArguments.push(combineStyles(currentStyles));
    } else if (styleKey === "reset") {
      // Verificamos si el último estilo fue válido
      const lastStyleValid = styleValidityStack.pop();
      if (lastStyleValid === true) {
        // Para reset, eliminamos el último estilo activo
        currentStyles.pop();
        // Añadimos una directiva %c y el estilo combinado (o vacío si no hay estilos)
        consoleString += "%c";
        styleArguments.push(combineStyles(currentStyles));
      } else {
        // Si el estilo no era válido o no hay estilos, añadimos el reset como texto literal
        consoleString += match;
      }
    } else {
      // Si el estilo es inválido, lo añadimos como texto literal
      consoleString += match;
      styleValidityStack.push(false);
    }

    lastIndex = index + match.length;
    return match;
  });

  // Añadimos cualquier texto restante después de la última etiqueta
  consoleString += input.slice(lastIndex);

  // Ejecutamos console.log con el string formateado y los argumentos de estilo
  console.log(consoleString, ...styleArguments);
}

/**
 * Combines multiple styles into a single CSS string.
 * This internal utility function handles the combination of multiple CSS styles,
 * ensuring that later styles override earlier ones for the same CSS property.
 *
 * @param styles - Array of style names to combine
 * @returns A CSS string combining all the specified styles
 *
 * @remarks
 * - Later styles in the array take precedence over earlier ones
 * - Invalid or undefined styles are ignored
 * - Returns an empty string if no valid styles are provided
 */
function combineStyles(styles: Style[]): string {
  if (styles.length === 0) return "";

  // Mapa para almacenar la última propiedad CSS aplicada
  const cssProperties: Record<string, string> = {};

  // Procesamos los estilos en orden, manteniendo solo el último para cada propiedad
  for (const style of styles) {
    const styleValue = STYLES[style];
    if (styleValue) {
      const cssProperty = styleValue.split(":")[0]?.trim();
      if (cssProperty) {
        cssProperties[cssProperty] = styleValue;
      }
    }
  }

  // Combinamos las propiedades CSS en un solo string
  return Object.values(cssProperties)
    .filter((style) => style !== "")
    .join("; ");
}

import type { Color, Colors } from "../modules/style/type";

/**
 * Type guard that checks if a value is a valid color in the provided color map
 *
 * @param value - The value to check, can be of any type
 * @param colors - The color map to validate against
 * @returns Type predicate indicating if the value is a valid Color
 */
export function isColor(value: unknown, colors: Colors): value is Color {
  return typeof value === "string" && value in colors;
}

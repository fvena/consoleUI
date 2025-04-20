/**
 * Utility functions for transforming between different string case formats.
 */

/**
 * Converts a camelCase string to an UPPER_SNAKE_CASE string.
 *
 * @param camelCase - The camelCase string to convert
 * @returns The string in UPPER_SNAKE_CASE format
 */
export function camelToUpperSnake(camelCase: string): string {
  if (!camelCase) return "";
  const withUnderscores = camelCase.replaceAll(/([A-Z])/g, "_$1");
  const upperCase = withUnderscores.toUpperCase();
  return upperCase.startsWith("_") ? upperCase.slice(1) : upperCase;
}

/**
 * Converts an UPPER_SNAKE_CASE string to camelCase format.
 *
 * @param upperSnake - The UPPER_SNAKE_CASE string to convert
 * @returns The string in camelCase format
 */
export function upperSnakeToCamel(upperSnake: string): string {
  if (!upperSnake) return "";

  const lowerCase = upperSnake.toLowerCase();
  return lowerCase.replaceAll(/_([a-z])/g, (_, char: string) => char.toUpperCase());
}

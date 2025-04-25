import type { BoxOptions } from "../box/types";
import type { TreeFunction, TreeNode, TreeOptions } from "../tree/types";
import type { Color, Style, StyleFunction, StyleOptions } from "../style/type";

/**
 * The main ConsoleUI API interface
 * Provides a complete set of styling functions and utilities
 */
export interface ConsoleUI extends Record<Style, StyleFunction> {
  /**
   * Creates a box with specified options
   * @param content - The content to place inside the box
   * @param options - The options for the box
   * @returns The styled box
   */
  box: (content: string, borderColor?: Color) => string;

  /**
   * Creates a function that applies a hex color to text
   * @param color - The hex color code to apply
   * @param text - The text to style
   * @returns The styled text
   *
   * @example
   * ```typescript
   * const customColor = ui.hex('#FF0000');
   * console.log(customColor('Hello, world!'));
   * ```
   */
  hex: (color: string, isForeground?: boolean) => StyleFunction;

  /**
   * Creates a function that applies a box style to text
   * @param options - The options for the box style
   * @returns A function that applies the box style to text
   *
   * @example
   * ```typescript
   * const box = ui.makeBox({ align: 'center' });
   * console.log(box('Hello, world!'));
   * ```
   */
  makeBox: (options: BoxOptions) => StyleFunction;

  /**
   * Creates a custom style function with specified options
   *
   * @param options - Configuration for the style function
   * @returns A function that applies the configured styles
   *
   * @example
   * ```typescript
   * const warning = ui.makeStyle({ color: 'yellow', bold: true, enabled: true });
   * console.log(warning('Warning message'));
   * ```
   */
  makeStyle: (options: StyleOptions) => StyleFunction;

  /**
   * Creates a function that applies a tree style to text
   * @param options - The options for the tree style
   * @returns A function that applies the tree style to text
   *
   * @example
   * ```typescript
   * const tree = ui.makeTree({ indentSize: 2 });
   * console.log(tree(treeNodes));
   * ```
   */
  makeTree: (options: TreeOptions) => TreeFunction;

  /**
   * Creates a function that applies a tree style to text
   * @param nodes - The nodes to display in the tree
   * @returns A function that applies the tree style to text
   *
   * @example
   * ```typescript
   * const tree = ui.tree(treeNodes);
   * console.log(tree);
   * ```
   */
  tree: (nodes: TreeNode[]) => string;
}

/**
 * Global configuration options for the ConsoleUI instance
 * Controls the default behavior of all styling functions
 *
 * @remarks
 * These options affect all style functions created by the instance
 * Individual style functions can override these settings
 */
export interface ConsoleUIOptions {
  /**
   * Master switch for styling functionality
   * When false, all styling functions return text without modification
   *
   * @defaultValue true
   */
  enabled: boolean;
}

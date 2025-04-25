import type { Color } from "../style/types";

/**
 * A function that applies styling to a tree
 *
 * @param nodes - The nodes to style
 * @returns The styled tree
 */
export type TreeFunction = (nodes: TreeNode[]) => string;

/**
 * Node type for tree structures
 */
export interface TreeNode {
  /**
   * The children of the node
   */
  children?: TreeNode[];
  /**
   * Optional custom icon to override default folder/file icons
   */
  icon?: string;
  /**
   * The label of the node
   */
  label: string;
}

/**
 * Tree component options
 */
export interface TreeOptions {
  /**
   * Color of the tree lines
   */
  color?: Color;
  /**
   * Whether to show icons for nodes with/without children
   */
  showIcons?: boolean;
}

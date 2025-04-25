import type { Color, StyleFunction } from "../style/type";
import type { TreeNode, TreeOptions } from "./types";
import { isBrowser } from "../../utils/enviroment";
import { DEFAULT_OPTIONS, DEFAULT_SYMBOLS } from "./constants";

/**
 * Creates the tree component factory with environment-specific styling
 * @param createStyle - Function to create environment-specific styles
 * @returns Tree component functions for the specified environment
 */
export function createTree(createStyle: (color: Color) => StyleFunction) {
  /**
   * Creates a tree visualization with the specified content and options
   * @param content - The tree content to visualize (string or TreeNode)
   * @param color - The color of the tree lines
   * @returns The styled tree string
   */
  function tree(content: TreeNode | TreeNode[], showIcons = true, color?: Color): string {
    const treeOptions: Required<TreeOptions> = {
      ...DEFAULT_OPTIONS,
      showIcons,
      ...(color ? { color } : {}),
    };

    return makeTree(treeOptions)(content);
  }

  /**
   * Creates a reusable tree style function
   * @param options - The tree options
   * @returns A function that creates a tree with the specified style
   */
  function makeTree(options: TreeOptions): (content: TreeNode | TreeNode[]) => string {
    const treeOptions: Required<TreeOptions> = { ...DEFAULT_OPTIONS, ...options };

    return (content: TreeNode | TreeNode[]): string => {
      let result = "";

      if (Array.isArray(content)) {
        // Handle array of nodes
        for (const [index, node] of content.entries()) {
          const isLast = index === content.length - 1;
          result += renderNode(node, treeOptions, 0, isLast, "");
        }
      } else {
        // Handle single node
        result = renderNode(content, treeOptions, 0, true, "");
      }

      return result;
    };
  }

  /**
   * Renders a tree node with the specified depth
   * @param node - The tree node to render
   * @param treeOptions - The tree options
   * @param depth - The current depth of the node
   * @param isLast - Whether this is the last child node
   * @param prefix - The prefix to add before this node
   * @returns The styled tree node string
   */
  function renderNode(
    node: TreeNode,
    treeOptions: Required<TreeOptions>,
    depth = 0,
    isLast = true,
    prefix = "",
  ): string {
    const isRoot = depth === 0;
    const hasChildren = node.children && node.children.length > 0;

    // Style the node symbol
    const treeColor = createStyle(treeOptions.color);
    let nodeSymbol = "";
    if (!isRoot) {
      nodeSymbol = isLast ? DEFAULT_SYMBOLS.corner : DEFAULT_SYMBOLS.branch;
    }
    let styledNodeSymbol = "";

    // Wrap the node symbol with monospace font style in browser environments,
    // because the font style is not monospace by default in the terminal,
    // and the tree is not aligned properly.
    if (isBrowser()) {
      const monospaceStart = "__STYLE_MONOSPACE__";
      const monospaceEnd = "__STYLE_RESET__";
      styledNodeSymbol = monospaceStart + prefix + treeColor(nodeSymbol) + monospaceEnd;
    } else {
      styledNodeSymbol = prefix + treeColor(nodeSymbol);
    }

    // Use custom icon if provided, otherwise use default icons based on node type
    let icon = "";
    if (treeOptions.showIcons) {
      icon = node.icon ?? (hasChildren ? DEFAULT_SYMBOLS.folderIcon : DEFAULT_SYMBOLS.fileIcon);
      icon += " "; // Add a space after the icon
    }

    // Line for the current node
    let result = styledNodeSymbol + icon + node.label + "\n";

    // Add vertical lines for children nodes if any
    if (hasChildren && node.children) {
      // Adjust child prefix based on whether this is the root node
      const childPrefix = isRoot
        ? ""
        : prefix + (isLast ? "    " : treeColor(DEFAULT_SYMBOLS.vertical));

      for (const [index, child] of node.children.entries()) {
        const isLastChild = index === node.children.length - 1;
        result += renderNode(child, treeOptions, depth + 1, isLastChild, childPrefix);
      }
    }

    return result;
  }

  return { makeTree, tree };
}

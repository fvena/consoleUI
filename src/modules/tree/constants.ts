import type { TreeOptions } from "./types";

/**
 * Default tree symbols
 */
export const DEFAULT_SYMBOLS = {
  branch: "├── ",
  corner: "└── ",
  fileIcon: "📄",
  folderIcon: "📁",
  horizontal: "─",
  leaf: "└── ",
  vertical: "│   ",
};

/**
 * Default options for the tree component
 */
export const DEFAULT_OPTIONS: Required<TreeOptions> = {
  color: "gray",
  showIcons: true,
};

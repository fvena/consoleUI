import type { BorderStyle, BoxOptions, BoxStyle } from "./types";
/**
 * The border styles for the box component
 */
export const BORDER_STYLES: Record<BorderStyle, BoxStyle> = {
  double: {
    bottomLeft: "╚",
    bottomRight: "╝",
    horizontal: "═",
    topLeft: "╔",
    topRight: "╗",
    vertical: "║",
  },
  rounded: {
    bottomLeft: "╰",
    bottomRight: "╯",
    horizontal: "─",
    topLeft: "╭",
    topRight: "╮",
    vertical: "│",
  },
  single: {
    bottomLeft: "└",
    bottomRight: "┘",
    horizontal: "─",
    topLeft: "┌",
    topRight: "┐",
    vertical: "│",
  },
};

/**
 * The default options for the box component
 */
export const DEFAULT_OPTIONS: Required<BoxOptions> = {
  align: "left",
  borderColor: "gray",
  borderStyle: "rounded",
  horizontalPadding: 1,
  verticalPadding: 0,
  width: 80,
};

import type {
  BorderStyle,
  BoxOptions,
  BoxStyle,
  Color,
  StripStylesFunction,
  StyleFunction,
} from "../core/types";
import { isBrowser } from "../utils/enviroment";
import { wrapText } from "../utils/wrap-text";
const BORDER_STYLES: Record<BorderStyle, BoxStyle> = {
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

const DEFAULT_OPTIONS: Required<BoxOptions> = {
  align: "left",
  borderColor: "gray",
  borderStyle: "rounded",
  horizontalPadding: 1,
  verticalPadding: 0,
  width: 80,
};

/**
 * Creates the box component factory with environment-specific styling
 * @param createStyle - Function to create environment-specific styles
 * @param stripStyles - Function to strip style characters
 * @returns Box component functions for the specific environment
 */
export function createBox(
  createStyle: (color: Color) => StyleFunction,
  stripStyles: StripStylesFunction,
) {
  /**
   * Creates a box with the specified content and options
   * @param content - The content to place inside the box
   * @param borderColor - The color of the border
   * @returns The styled box string
   */
  function box(content: string, borderColor?: Color): string {
    const boxOptions: Required<BoxOptions> = {
      ...DEFAULT_OPTIONS,
      ...(borderColor ? { borderColor } : {}),
    };

    return makeBox(boxOptions)(content);
  }

  /**
   * Creates a reusable box style function
   * @param options - The box options
   * @returns A function that creates a box with the specified style
   */
  function makeBox(options: BoxOptions): StyleFunction {
    const boxOptions: Required<BoxOptions> = { ...DEFAULT_OPTIONS, ...options };
    const borderStyle = BORDER_STYLES[boxOptions.borderStyle];
    const horizontalPadding = " ".repeat(boxOptions.horizontalPadding);
    const borderColor = createStyle(boxOptions.borderColor);
    const contentWidth = boxOptions.width - boxOptions.horizontalPadding * 2 - 2; // Account for borders and horizontal padding

    return (content: string): string => {
      // Split content into lines and wrap each line to contentWidth
      const inputLines = content.split("\n");
      const lines: string[] = [];
      for (const line of inputLines) {
        lines.push(...wrapText(line, contentWidth, stripStyles));
      }

      const boxWidth = boxOptions.width;
      const horizontalLine = borderStyle.horizontal.repeat(boxWidth - 2);

      const top = borderColor(borderStyle.topLeft + horizontalLine + borderStyle.topRight);
      const bottom = borderColor(borderStyle.bottomLeft + horizontalLine + borderStyle.bottomRight);

      const paddedLines = lines.map((line) => {
        const strippedLine = stripStyles(line);
        const remainingSpace = contentWidth - strippedLine.length;

        let alignedLine = line;
        if (boxOptions.align === "center" && remainingSpace > 0) {
          const leftPadding = Math.floor(remainingSpace / 2);
          const rightPadding = remainingSpace - leftPadding;
          alignedLine = " ".repeat(leftPadding) + line + " ".repeat(rightPadding);
        } else if (boxOptions.align === "right" && remainingSpace > 0) {
          alignedLine = " ".repeat(remainingSpace) + line;
        } else {
          // Left alignment (default)
          alignedLine = line + " ".repeat(remainingSpace);
        }

        return (
          borderColor(borderStyle.vertical) +
          horizontalPadding +
          alignedLine +
          horizontalPadding +
          borderColor(borderStyle.vertical)
        );
      });

      // Add vertical padding
      const emptyLine =
        borderColor(borderStyle.vertical) +
        " ".repeat(boxWidth - 2) +
        borderColor(borderStyle.vertical);
      const verticalPadding = Array.from({ length: boxOptions.verticalPadding }, () => emptyLine);

      const allLines = [top, ...verticalPadding, ...paddedLines, ...verticalPadding, bottom];

      // Wrap the entire box with monospace font style
      if (isBrowser()) {
        const monospaceStart = "__STYLE_MONOSPACE__";
        const monospaceEnd = "__STYLE_RESET__";
        return monospaceStart + allLines.join("\n") + monospaceEnd;
      }
      return allLines.join("\n");
    };
  }

  return { box, makeBox };
}

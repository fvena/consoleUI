import type { StripStylesFunction } from "../core/types";

/**
 * Wraps text to a specified width
 * @param text - The text to wrap
 * @param width - The maximum width
 * @param stripStyles - Function to strip style characters
 * @returns Array of lines
 */
export function wrapText(text: string, width: number, stripStyles: StripStylesFunction): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  let currentLineLength = 0;

  for (const word of words) {
    // Get actual length without style characters
    const wordLength = stripStyles(word).length;

    // Handle words longer than width by splitting them
    if (wordLength > width) {
      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
        currentLineLength = 0;
      }

      // Split long word into chunks of maximum width
      let remainingWord = word;
      while (stripStyles(remainingWord).length > 0) {
        const chunk = remainingWord.slice(0, Math.max(width, remainingWord.length));
        const nextChunk = remainingWord.slice(Math.max(width, remainingWord.length));
        lines.push(chunk);
        remainingWord = nextChunk;
      }
      continue;
    }

    // Check if adding the word would exceed width
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testLineLength = currentLineLength + (currentLine ? 1 : 0) + wordLength;

    if (testLineLength > width) {
      lines.push(currentLine);
      currentLine = word;
      currentLineLength = wordLength;
    } else {
      currentLine = testLine;
      currentLineLength = testLineLength;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

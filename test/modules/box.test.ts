import type { Color } from "../../src/modules/style/type";
import { describe, expect, it } from "vitest";
import { createBox } from "../../src/modules/box";

/**
 * Creates a mock style function for testing that ignores color and returns text unchanged
 * @param _color - The color parameter (intentionally unused in tests)
 * @returns A mock style function
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Parameter is required by type but unused in mock
function createMockStyle(_color: Color) {
  return function mockStyle(text: string): string {
    // We ignore the color parameter in tests as we're just testing the box structure
    return text;
  };
}

const { box, makeBox } = createBox(createMockStyle, () => "");

describe("Box Component", () => {
  describe("box", () => {
    it("should create a box with default options", () => {
      const result = box("Hello");
      expect(result).toMatchSnapshot();
    });

    it("should create a box with custom border color", () => {
      const result = box("Hello", "blue");
      expect(result).toMatchSnapshot();
    });

    it("should create a box with custom options", () => {
      const result = box("Hello", "red");
      expect(result).toMatchSnapshot();
    });

    it("should handle multi-line content", () => {
      const result = box("Line 1\nLine 2\nLine 3");
      expect(result).toMatchSnapshot();
    });

    it("should handle empty content", () => {
      const result = box("");
      expect(result).toMatchSnapshot();
    });

    it("should wrap text at default width", () => {
      const longText =
        "This is a very long text that should be wrapped automatically at the default width of 80 characters because it exceeds that limit significantly";
      const result = box(longText);
      expect(result).toMatchSnapshot();
    });
  });

  describe("makeBox", () => {
    it("should create a reusable box style", () => {
      const customBox = makeBox({
        borderColor: "green",
        borderStyle: "rounded",
        horizontalPadding: 0,
        verticalPadding: 0,
      });

      const result = customBox("Hello");
      expect(result).toMatchSnapshot();
    });

    it("should handle different content with same style", () => {
      const customBox = makeBox({
        borderColor: "yellow",
        borderStyle: "single",
        horizontalPadding: 1,
        verticalPadding: 1,
      });

      const result1 = customBox("First");
      const result2 = customBox("Second");

      expect(result1).toMatchSnapshot("First content");
      expect(result2).toMatchSnapshot("Second content");
    });

    it("should handle multi-line content with custom style", () => {
      const customBox = makeBox({
        borderColor: "magenta",
        borderStyle: "double",
        horizontalPadding: 2,
        verticalPadding: 2,
      });

      const result = customBox("Line 1\nLine 2\nLine 3");
      expect(result).toMatchSnapshot();
    });

    it("should respect custom width", () => {
      const customBox = makeBox({
        borderColor: "cyan",
        width: 40,
      });

      const longText =
        "This text should be wrapped at 40 characters width instead of the default 80";
      const result = customBox(longText);
      expect(result).toMatchSnapshot();
    });

    it("should handle very long words", () => {
      const customBox = makeBox({
        width: 20,
      });

      const textWithLongWord = "Normal ThisIsAVeryLongWordThatShouldBeSplitAcrossMultipleLines end";
      const result = customBox(textWithLongWord);
      expect(result).toMatchSnapshot();
    });

    it("should handle multiple paragraphs with wrapping", () => {
      const customBox = makeBox({
        width: 30,
      });

      const multiParagraph =
        "First paragraph that should wrap.\n\nSecond paragraph that should also wrap across multiple lines.";
      const result = customBox(multiParagraph);
      expect(result).toMatchSnapshot();
    });
  });
});

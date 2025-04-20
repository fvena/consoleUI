import { describe, expect, it } from "vitest";
import { createStyle, makeStyle } from "../../src/terminal/style-terminal";
import { ANSI_COLORS, STYLES } from "../../src/terminal/constants.terminal";

describe("Style Terminal", () => {
  describe("createStyle", () => {
    it("should wrap text with ANSI style codes when enabled", () => {
      const styleFunction = createStyle("red", true);
      expect(styleFunction("Hello")).toBe(`${ANSI_COLORS.red}Hello${STYLES.reset}`);
    });

    it("should return plain text when disabled", () => {
      const styleFunction = createStyle("red", false);
      expect(styleFunction("Hello")).toBe("Hello");
    });

    it("should handle empty string input", () => {
      const styleFunction = createStyle("red", true);
      expect(styleFunction("")).toBe("");
    });

    it("should handle special characters in text", () => {
      const styleFunction = createStyle("red", true);
      expect(styleFunction("Hello\nWorld!@#$%")).toBe(
        `${ANSI_COLORS.red}Hello\nWorld!@#$%${STYLES.reset}`,
      );
    });

    it("should handle nested style calls on the same text", () => {
      const redStyle = createStyle("red", true);
      const blueStyle = createStyle("blue", true);
      const styledText = blueStyle(redStyle("Hello"));
      expect(styledText).toBe(
        `${ANSI_COLORS.blue}${ANSI_COLORS.red}Hello${STYLES.reset}${ANSI_COLORS.blue}${STYLES.reset}`,
      );
    });

    it("should handle nested style calls with different styles", () => {
      const blackStyle = createStyle("black", true);
      const backgroundRedStyle = createStyle("bgRed", true);
      const styledText = backgroundRedStyle(blackStyle("Hello"));
      const styledText2 = blackStyle(backgroundRedStyle("Hello"));
      expect(styledText).toBe(
        `${ANSI_COLORS.bgRed}${ANSI_COLORS.black}Hello${STYLES.reset}${ANSI_COLORS.bgRed}${STYLES.reset}`,
      );
      expect(styledText2).toBe(
        `${ANSI_COLORS.black}${ANSI_COLORS.bgRed}Hello${STYLES.reset}${ANSI_COLORS.black}${STYLES.reset}`,
      );
    });

    it("should maintain proper style order with multiple overlapping styles", () => {
      const redStyle = createStyle("red", true);
      const blueStyle = createStyle("blue", true);
      const greenStyle = createStyle("green", true);
      const styledText = redStyle(
        `First ${blueStyle(`Second ${greenStyle("Third")} reset`)} reset`,
      );
      expect(styledText).toBe(
        `${ANSI_COLORS.red}First ${ANSI_COLORS.blue}Second ${ANSI_COLORS.green}Third${STYLES.reset}${ANSI_COLORS.red}${ANSI_COLORS.blue} reset${STYLES.reset}${ANSI_COLORS.red} reset${STYLES.reset}`,
      );
    });

    it("should handle undefined style parameter", () => {
      // @ts-expect-error - This is a test for undefined style parameter
      const styleFunction = createStyle(undefined, true);
      expect(() => styleFunction("Hello")).toThrow();
    });

    it("should handle unsupported style parameter", () => {
      // @ts-expect-error - This is a test for unsupported style parameter
      const styleFunction = createStyle("unsupported", true);
      expect(() => styleFunction("Hello")).toThrow();
    });

    it("should handle non-string input types", () => {
      const styleFunction = createStyle("red", true);
      // @ts-expect-error - This is a test for non-string input types
      expect(styleFunction(123)).toBe(`${ANSI_COLORS.red}123${STYLES.reset}`);
      // @ts-expect-error - This is a test for non-string input types
      expect(styleFunction(true)).toBe(`${ANSI_COLORS.red}true${STYLES.reset}`);
      // @ts-expect-error - This is a test for non-string input types
      // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for non-string input types
      expect(styleFunction(undefined)).toBe("");
    });
  });

  describe("makeStyle", () => {
    it("should apply ANSI color codes when enabled", () => {
      const styleFunction = makeStyle({ color: "red" });
      expect(styleFunction("Hello")).toBe("\u001B[31mHello\u001B[0m");
    });

    it("should disable the style if enabled is false", () => {
      const styleFunction = makeStyle({ color: "red", enabled: false });
      expect(styleFunction("Hello")).toBe("Hello");
    });

    it("should handle invalid color names", () => {
      // @ts-expect-error - This is a test for invalid color names
      const styleFunction = makeStyle({ color: "invalidColor" });
      expect(styleFunction("Hello")).toBe("Hello");
    });

    it("should handle undefined options", () => {
      // @ts-expect-error - This is a test for undefined options
      // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for undefined options
      const styleFunction = makeStyle(undefined);
      expect(styleFunction("Hello")).toBe("Hello");
    });

    it("should handle empty string input", () => {
      const styleFunction = makeStyle({ color: "red" });
      expect(styleFunction("")).toBe("");
    });

    it("should handle non-string input types", () => {
      const styleFunction = makeStyle({ color: "red" });
      // @ts-expect-error - This is a test for non-string input types
      expect(styleFunction(123)).toBe("\u001B[31m123\u001B[0m");
      // @ts-expect-error - This is a test for non-string input types
      expect(styleFunction(true)).toBe("\u001B[31mtrue\u001B[0m");
      // @ts-expect-error - This is a test for non-string input types
      // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for non-string input types
      expect(styleFunction(undefined)).toBe("");
    });

    it("should apply background color when specified", () => {
      const styleFunction = makeStyle({ backgroundColor: "bgRed" });
      expect(styleFunction("Hello")).toBe("\u001B[41mHello\u001B[0m");
    });

    it("should apply both text and background colors when specified", () => {
      const styleFunction = makeStyle({ backgroundColor: "bgRed", color: "blue" });
      expect(styleFunction("Hello")).toBe("\u001B[34m\u001B[41mHello\u001B[0m\u001B[34m\u001B[0m");
    });

    it("should handle invalid background color names", () => {
      // @ts-expect-error - This is a test for invalid background color names
      const styleFunction = makeStyle({ backgroundColor: "invalidBackground" });
      expect(styleFunction("Hello")).toBe("Hello");
    });
  });
});

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createStyle, log, makeStyle } from "../../src/browser/style-browser";
import { CSS_COLORS } from "../../src/browser/constants.browser";

describe("Style Browser", () => {
  describe("createStyle", () => {
    it("should wrap text with style markers when enabled", () => {
      const styleFunction = createStyle("red", true);
      expect(styleFunction("Hello")).toBe("__STYLE_RED__Hello__STYLE_RESET__");
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
        "__STYLE_RED__Hello\nWorld!@#$%__STYLE_RESET__",
      );
    });

    it("should handle nested style calls on the same text", () => {
      const redStyle = createStyle("red", true);
      const blueStyle = createStyle("blue", true);
      const styledText = blueStyle(redStyle("Hello"));
      expect(styledText).toBe("__STYLE_BLUE____STYLE_RED__Hello__STYLE_RESET____STYLE_RESET__");
    });

    it("should handle nested style calls with different styles", () => {
      const blackStyle = createStyle("black", true);
      const backgroundRedStyle = createStyle("bgRed", true);
      const styledText = backgroundRedStyle(blackStyle("Hello"));
      const styledText2 = blackStyle(backgroundRedStyle("Hello"));
      expect(styledText).toBe("__STYLE_BG_RED____STYLE_BLACK__Hello__STYLE_RESET____STYLE_RESET__");
      expect(styledText2).toBe(
        "__STYLE_BLACK____STYLE_BG_RED__Hello__STYLE_RESET____STYLE_RESET__",
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
        "__STYLE_RED__First __STYLE_BLUE__Second __STYLE_GREEN__Third__STYLE_RESET__ reset__STYLE_RESET__ reset__STYLE_RESET__",
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
      expect(styleFunction(123)).toBe("__STYLE_RED__123__STYLE_RESET__");
      // @ts-expect-error - This is a test for non-string input types
      expect(styleFunction(true)).toBe("__STYLE_RED__true__STYLE_RESET__");
      // @ts-expect-error - This is a test for non-string input types
      // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for non-string input types
      expect(styleFunction(undefined)).toBe("");
    });
  });

  describe("makeStyle", () => {
    it("should wrap text with style markers when enabled", () => {
      const styleFunction = makeStyle({ color: "red" });
      expect(styleFunction("Hello")).toBe("__STYLE_RED__Hello__STYLE_RESET__");
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
      expect(styleFunction(123)).toBe("__STYLE_RED__123__STYLE_RESET__");
      // @ts-expect-error - This is a test for non-string input types
      expect(styleFunction(true)).toBe("__STYLE_RED__true__STYLE_RESET__");
      // @ts-expect-error - This is a test for non-string input types
      // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for non-string input types
      expect(styleFunction(undefined)).toBe("");
    });

    it("should apply background color when specified", () => {
      const styleFunction = makeStyle({ backgroundColor: "bgRed" });
      expect(styleFunction("Hello")).toBe("__STYLE_BG_RED__Hello__STYLE_RESET__");
    });

    it("should apply both text and background colors when specified", () => {
      const styleFunction = makeStyle({ backgroundColor: "bgRed", color: "blue" });
      expect(styleFunction("Hello")).toBe(
        "__STYLE_BLUE____STYLE_BG_RED__Hello__STYLE_RESET____STYLE_RESET__",
      );
    });

    it("should handle invalid background color names", () => {
      // @ts-expect-error - This is a test for invalid background color names
      const styleFunction = makeStyle({ backgroundColor: "invalidBackground" });
      expect(styleFunction("Hello")).toBe("Hello");
    });
  });

  describe("log", () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {
        // Do nothing
      });
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    it("should call console.log with styled text and styles array", () => {
      const text = "__STYLE_RED__Error__STYLE_RESET__";
      log(text);
      expect(consoleSpy).toHaveBeenCalledWith("%cError%c", CSS_COLORS.red, "");
    });

    it("should call console.log with multiple styles", () => {
      const text = "__STYLE_RED__Hello__STYLE_RESET__ __STYLE_GREEN__World__STYLE_RESET__!!!";
      log(text);
      expect(consoleSpy).toHaveBeenCalledWith(
        "%cHello%c %cWorld%c!!!",
        CSS_COLORS.red,
        "",
        CSS_COLORS.green,
        "",
      );
    });

    it("should call console.log with plain text if no style markers are found", () => {
      log("No styles");
      expect(consoleSpy).toHaveBeenCalledWith("No styles");
    });

    it("should handle empty string input", () => {
      log("");
      expect(consoleSpy).toHaveBeenCalledWith("");
    });

    it("should handle null or undefined input", () => {
      // @ts-expect-error - This is a test for undefined input
      // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for undefined input
      log(undefined);
      expect(consoleSpy).toHaveBeenCalledWith(undefined);
    });

    it("should handle non-string types (numbers, objects, arrays)", () => {
      // @ts-expect-error - This is a test for non-string types
      log(123);
      // @ts-expect-error - This is a test for non-string types
      log({ key: "value" });
      // @ts-expect-error - This is a test for non-string types
      log([1, 2, 3]);
      expect(consoleSpy).toHaveBeenNthCalledWith(1, 123);
      expect(consoleSpy).toHaveBeenNthCalledWith(2, { key: "value" });
      expect(consoleSpy).toHaveBeenNthCalledWith(3, [1, 2, 3]);
    });

    it("should handle special characters in styled text", () => {
      const text = "__STYLE_RED__Hello\nWorld!@#$%__STYLE_RESET__";
      log(text);
      expect(consoleSpy).toHaveBeenCalledWith("%cHello\nWorld!@#$%%c", CSS_COLORS.red, "");
    });

    it("should handle invalid style markers", () => {
      log("__STYLE_INVALID__Hello__STYLE_RESET__");
      log("__STYLE__Hello__STYLE_RESET__");
      log("__STYLE_RED_Hello__STYLE_RESET__");
      log("__STYLE_INVALID__Hello __STYLE_RED__World__STYLE_RESET____STYLE_RESET__");
      expect(consoleSpy).toHaveBeenNthCalledWith(1, "__STYLE_INVALID__Hello__STYLE_RESET__");
      expect(consoleSpy).toHaveBeenNthCalledWith(2, "__STYLE__Hello__STYLE_RESET__");
      expect(consoleSpy).toHaveBeenNthCalledWith(3, "__STYLE_RED_Hello__STYLE_RESET__");
      expect(consoleSpy).toHaveBeenNthCalledWith(
        4,
        "__STYLE_INVALID__Hello %cWorld%c__STYLE_RESET__",
        CSS_COLORS.red,
        "",
      );
    });

    it("should handle nested style markers", () => {
      const text = "__STYLE_RED____STYLE_BLUE__Hello__STYLE_RESET____STYLE_RESET__";
      log(text);
      expect(consoleSpy).toHaveBeenCalledWith(
        "%c%cHello%c%c",
        CSS_COLORS.red,
        CSS_COLORS.blue,
        CSS_COLORS.red,
        "",
      );
    });

    it("should maintain proper style order with multiple overlapping styles", () => {
      const text = "__STYLE_RED__First__STYLE_BLUE__Second__STYLE_RESET__Third__STYLE_RESET__";
      log(text);
      expect(consoleSpy).toHaveBeenCalledWith(
        "%cFirst%cSecond%cThird%c",
        CSS_COLORS.red,
        CSS_COLORS.blue,
        CSS_COLORS.red,
        "",
      );
    });
  });
});

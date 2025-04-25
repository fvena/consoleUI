import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createStyle, hex, log, makeStyle } from "../../src/modules/style/browser";
import { CSS_COLORS, CSS_FORMATS } from "../../src/modules/style/constants.browser";

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
    describe("color styles", () => {
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

    describe("text formatting", () => {
      it("should apply bold formatting when specified", () => {
        const styleFunction = makeStyle({ bold: true });
        expect(styleFunction("Hello")).toBe("__STYLE_BOLD__Hello__STYLE_RESET__");
      });

      it("should apply italic formatting when specified", () => {
        const styleFunction = makeStyle({ italic: true });
        expect(styleFunction("Hello")).toBe("__STYLE_ITALIC__Hello__STYLE_RESET__");
      });

      it("should apply underline formatting when specified", () => {
        const styleFunction = makeStyle({ underline: true });
        expect(styleFunction("Hello")).toBe("__STYLE_UNDERLINE__Hello__STYLE_RESET__");
      });

      it("should apply strikethrough formatting when specified", () => {
        const styleFunction = makeStyle({ strikethrough: true });
        expect(styleFunction("Hello")).toBe("__STYLE_STRIKETHROUGH__Hello__STYLE_RESET__");
      });

      it("should apply dim formatting when specified", () => {
        const styleFunction = makeStyle({ dim: true });
        expect(styleFunction("Hello")).toBe("__STYLE_DIM__Hello__STYLE_RESET__");
      });

      it("should apply hidden formatting when specified", () => {
        const styleFunction = makeStyle({ hidden: true });
        expect(styleFunction("Hello")).toBe("__STYLE_HIDDEN__Hello__STYLE_RESET__");
      });

      it("should combine multiple text formats", () => {
        const styleFunction = makeStyle({ bold: true, underline: true });
        expect(styleFunction("Hello")).toBe(
          "__STYLE_UNDERLINE____STYLE_BOLD__Hello__STYLE_RESET____STYLE_RESET__",
        );
      });

      it("should combine text formats with colors", () => {
        const styleFunction = makeStyle({ bold: true, color: "red" });
        expect(styleFunction("Hello")).toBe(
          "__STYLE_BOLD____STYLE_RED__Hello__STYLE_RESET____STYLE_RESET__",
        );
      });

      it("should combine text formats with background colors", () => {
        const styleFunction = makeStyle({ backgroundColor: "bgBlue", bold: true });
        expect(styleFunction("Hello")).toBe(
          "__STYLE_BOLD____STYLE_BG_BLUE__Hello__STYLE_RESET____STYLE_RESET__",
        );
      });

      it("should combine all style types", () => {
        const styleFunction = makeStyle({
          backgroundColor: "bgYellow",
          bold: true,
          color: "red",
          italic: true,
        });
        expect(styleFunction("Hello")).toBe(
          "__STYLE_ITALIC____STYLE_BOLD____STYLE_RED____STYLE_BG_YELLOW__Hello__STYLE_RESET____STYLE_RESET____STYLE_RESET____STYLE_RESET__",
        );
      });
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

    describe("color styles", () => {
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

    describe("text formatting", () => {
      it("should apply bold formatting", () => {
        log("__STYLE_BOLD__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith("%cHello%c", CSS_FORMATS.bold, "");
      });

      it("should apply italic formatting", () => {
        log("__STYLE_ITALIC__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith("%cHello%c", CSS_FORMATS.italic, "");
      });

      it("should apply underline formatting", () => {
        log("__STYLE_UNDERLINE__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith("%cHello%c", CSS_FORMATS.underline, "");
      });

      it("should apply strikethrough formatting", () => {
        log("__STYLE_STRIKETHROUGH__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith("%cHello%c", CSS_FORMATS.strikethrough, "");
      });

      it("should apply dim formatting", () => {
        log("__STYLE_DIM__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith("%cHello%c", CSS_FORMATS.dim, "");
      });

      it("should apply hidden formatting", () => {
        log("__STYLE_HIDDEN__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith("%cHello%c", CSS_FORMATS.hidden, "");
      });

      it("should combine multiple text formats", () => {
        log("__STYLE_BOLD____STYLE_UNDERLINE__Hello__STYLE_RESET____STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith(
          "%c%cHello%c%c",
          CSS_FORMATS.bold,
          `${CSS_FORMATS.bold}; ${CSS_FORMATS.underline}`,
          CSS_FORMATS.bold,
          "",
        );
      });

      it("should combine text formats with colors", () => {
        log("__STYLE_BOLD____STYLE_RED__Hello__STYLE_RESET____STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith(
          "%c%cHello%c%c",
          CSS_FORMATS.bold,
          `${CSS_FORMATS.bold}; ${CSS_COLORS.red}`,
          CSS_FORMATS.bold,
          "",
        );
      });

      it("should combine text formats with background colors", () => {
        log("__STYLE_BOLD____STYLE_BG_BLUE__Hello__STYLE_RESET____STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith(
          "%c%cHello%c%c",
          CSS_FORMATS.bold,
          `${CSS_FORMATS.bold}; ${CSS_COLORS.bgBlue}`,
          CSS_FORMATS.bold,
          "",
        );
      });

      it("should combine all style types", () => {
        log(
          "__STYLE_BOLD____STYLE_ITALIC____STYLE_RED____STYLE_BG_YELLOW__Hello__STYLE_RESET____STYLE_RESET____STYLE_RESET____STYLE_RESET__",
        );
        expect(consoleSpy).toHaveBeenCalledWith(
          "%c%c%c%cHello%c%c%c%c",
          CSS_FORMATS.bold,
          `${CSS_FORMATS.bold}; ${CSS_FORMATS.italic}`,
          `${CSS_FORMATS.bold}; ${CSS_FORMATS.italic}; ${CSS_COLORS.red}`,
          `${CSS_FORMATS.bold}; ${CSS_FORMATS.italic}; ${CSS_COLORS.red}; ${CSS_COLORS.bgYellow}`,
          `${CSS_FORMATS.bold}; ${CSS_FORMATS.italic}; ${CSS_COLORS.red}`,
          `${CSS_FORMATS.bold}; ${CSS_FORMATS.italic}`,
          CSS_FORMATS.bold,
          "",
        );
      });
    });

    describe("hex", () => {
      it("should apply hex color to text", () => {
        log("__STYLE_#FF0000__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith("%cHello%c", "color: #FF0000", "");
      });

      it("should apply hex color to background", () => {
        log("__STYLE_#FF0000_BG__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith(
          "%cHello%c",
          "background-color: #FF0000; padding: 2px 4px; border-radius: 2px",
          "",
        );
      });

      it("should apply hex color to text and background", () => {
        log("__STYLE_#FF0000_BG__Hello__STYLE_RESET__");
        expect(consoleSpy).toHaveBeenCalledWith(
          "%cHello%c",
          "background-color: #FF0000; padding: 2px 4px; border-radius: 2px",
          "",
        );
      });
    });
  });

  describe("hex color", () => {
    it("should apply hex color to text", () => {
      const customHex = hex("#FF0000");
      expect(customHex("Hello")).toBe("__STYLE_#FF0000__Hello__STYLE_RESET__");
    });

    it("should apply background hex color to text", () => {
      const customHex = hex("#FF0000", true);
      expect(customHex("Hello")).toBe("__STYLE_#FF0000_BG__Hello__STYLE_RESET__");
    });

    it("should apply hex color to text and background", () => {
      const colorHex = hex("#FFFFFF");
      const backgroundHex = hex("#FF0000", true);
      expect(colorHex(backgroundHex("Hello"))).toBe(
        "__STYLE_#FFFFFF____STYLE_#FF0000_BG__Hello__STYLE_RESET____STYLE_RESET__",
      );
    });

    it("should handle invalid hex colors", () => {
      const customHex = hex("invalidHex");
      expect(customHex("Hello")).toBe("Hello");
    });

    it("should handle empty hex colors", () => {
      const customHex = hex("");
      expect(customHex("Hello")).toBe("Hello");
    });

    it("should handle undefined hex colors", () => {
      // @ts-expect-error - This is a test for non-string input types
      // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for undefined hex colors
      const customHex = hex(undefined);
      expect(customHex("Hello")).toBe("Hello");
    });

    it("should handle non-string hex colors", () => {
      // @ts-expect-error - This is a test for non-string input types
      const customHex = hex(123);
      expect(customHex("Hello")).toBe("Hello");
    });
  });
});

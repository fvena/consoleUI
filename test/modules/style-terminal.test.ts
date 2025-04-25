import { describe, expect, it, vi } from "vitest";
import { createStyle, hex, makeStyle } from "../../src/modules/style/terminal";
import { ANSI_COLORS, ANSI_FORMATS, STYLES } from "../../src/modules/style/constants.terminal";
import * as colorUtilities from "../../src/utils/color";

vi.mock("../../src/utils/color", async () => {
  const actual = await vi.importActual<typeof colorUtilities>("../../src/utils/color");
  return {
    ...actual,
    detectColorSupport: vi.fn().mockReturnValue("256"),
  };
});

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
    describe("color styles", () => {
      it("should apply ANSI color codes when enabled", () => {
        const styleFunction = makeStyle({ color: "red" });
        expect(styleFunction("Hello")).toBe(`${ANSI_COLORS.red}Hello${STYLES.reset}`);
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
        expect(styleFunction(123)).toBe(`${ANSI_COLORS.red}123${STYLES.reset}`);
        // @ts-expect-error - This is a test for non-string input types
        expect(styleFunction(true)).toBe(`${ANSI_COLORS.red}true${STYLES.reset}`);
        // @ts-expect-error - This is a test for non-string input types
        // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for non-string input types
        expect(styleFunction(undefined)).toBe("");
      });

      it("should apply background color when specified", () => {
        const styleFunction = makeStyle({ backgroundColor: "bgRed" });
        expect(styleFunction("Hello")).toBe(`${ANSI_COLORS.bgRed}Hello${STYLES.reset}`);
      });

      it("should apply both text and background colors when specified", () => {
        const styleFunction = makeStyle({ backgroundColor: "bgRed", color: "blue" });
        expect(styleFunction("Hello")).toBe(
          `${ANSI_COLORS.blue}${ANSI_COLORS.bgRed}Hello${STYLES.reset}${ANSI_COLORS.blue}${STYLES.reset}`,
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
        expect(styleFunction("Hello")).toBe(`${ANSI_FORMATS.bold}Hello${STYLES.reset}`);
      });

      it("should apply italic formatting when specified", () => {
        const styleFunction = makeStyle({ italic: true });
        expect(styleFunction("Hello")).toBe(`${ANSI_FORMATS.italic}Hello${STYLES.reset}`);
      });

      it("should apply underline formatting when specified", () => {
        const styleFunction = makeStyle({ underline: true });
        expect(styleFunction("Hello")).toBe(`${ANSI_FORMATS.underline}Hello${STYLES.reset}`);
      });

      it("should apply strikethrough formatting when specified", () => {
        const styleFunction = makeStyle({ strikethrough: true });
        expect(styleFunction("Hello")).toBe(`${ANSI_FORMATS.strikethrough}Hello${STYLES.reset}`);
      });

      it("should apply dim formatting when specified", () => {
        const styleFunction = makeStyle({ dim: true });
        expect(styleFunction("Hello")).toBe(`${ANSI_FORMATS.dim}Hello${STYLES.reset}`);
      });

      it("should apply hidden formatting when specified", () => {
        const styleFunction = makeStyle({ hidden: true });
        expect(styleFunction("Hello")).toBe(`${ANSI_FORMATS.hidden}Hello${STYLES.reset}`);
      });

      it("should combine multiple text formats", () => {
        const styleFunction = makeStyle({ bold: true, underline: true });
        expect(styleFunction("Hello")).toBe(
          `${ANSI_FORMATS.underline}${ANSI_FORMATS.bold}Hello${STYLES.reset}${ANSI_FORMATS.underline}${STYLES.reset}`,
        );
      });

      it("should combine text formats with colors", () => {
        const styleFunction = makeStyle({ bold: true, color: "red" });
        expect(styleFunction("Hello")).toBe(
          `${ANSI_FORMATS.bold}${ANSI_COLORS.red}Hello${STYLES.reset}${ANSI_FORMATS.bold}${STYLES.reset}`,
        );
      });

      it("should combine text formats with background colors", () => {
        const styleFunction = makeStyle({ backgroundColor: "bgBlue", bold: true });
        expect(styleFunction("Hello")).toBe(
          `${ANSI_FORMATS.bold}${ANSI_COLORS.bgBlue}Hello${STYLES.reset}${ANSI_FORMATS.bold}${STYLES.reset}`,
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
          `${ANSI_FORMATS.italic}${ANSI_FORMATS.bold}${ANSI_COLORS.red}${ANSI_COLORS.bgYellow}Hello${STYLES.reset}${ANSI_FORMATS.italic}${ANSI_FORMATS.bold}${ANSI_COLORS.red}${STYLES.reset}${ANSI_FORMATS.italic}${ANSI_FORMATS.bold}${STYLES.reset}${ANSI_FORMATS.italic}${STYLES.reset}`,
        );
      });
    });
  });

  describe("hex color", () => {
    it("should use truecolor when supported", () => {
      vi.mocked(colorUtilities.detectColorSupport).mockReturnValue("truecolor");
      const customHex = hex("#FFAACC");
      expect(customHex("Hello")).toBe(`\u001B[38;2;255;170;204mHello${STYLES.reset}`);
    });

    it("should use 256 color when supported", () => {
      vi.mocked(colorUtilities.detectColorSupport).mockReturnValue("256");
      const customHex = hex("#FFAACC");
      expect(customHex("Hello")).toBe(`\u001B[38;5;218mHello${STYLES.reset}`);
    });

    it("should use basic colors when only basic support is available", () => {
      vi.mocked(colorUtilities.detectColorSupport).mockReturnValue("basic");
      const customHex = hex("#FFAACC"); // Pure red
      expect(customHex("Hello")).toBe(`\u001B[37mHello${STYLES.reset}`);
    });

    it("should apply hex color codes to background", () => {
      vi.mocked(colorUtilities.detectColorSupport).mockReturnValue("truecolor");
      const customHex = hex("#FFAACC", true);
      expect(customHex("Hello")).toBe(`\u001B[48;2;255;170;204mHello${STYLES.reset}`);
    });

    it("should apply hex color codes to text and background", () => {
      vi.mocked(colorUtilities.detectColorSupport).mockReturnValue("truecolor");
      const hexColor = hex("#FFAACC");
      const backgroundHex = hex("#00FF00", true);
      expect(hexColor(backgroundHex("Hello"))).toBe(
        `\u001B[38;2;255;170;204m\u001B[48;2;0;255;0mHello${STYLES.reset}${STYLES.reset}`,
      );
    });

    it("should handle invalid hex color codes", () => {
      const customHex = hex("invalidColor");
      expect(customHex("Hello")).toBe("Hello");
    });

    it("should handle undefined hex color codes", () => {
      // @ts-expect-error - This is a test for undefined hex colors
      // eslint-disable-next-line unicorn/no-useless-undefined -- This is a test for undefined hex colors
      const customHex = hex(undefined);
      expect(customHex("Hello")).toBe("Hello");
    });

    it("should handle non-string hex color codes", () => {
      // @ts-expect-error - This is a test for non-string input types
      const customHex = hex(123);
      expect(customHex("Hello")).toBe("Hello");
    });
  });
});

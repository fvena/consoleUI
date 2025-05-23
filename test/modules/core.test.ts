import { describe, expect, it, vi } from "vitest";
import { createConsoleUI } from "../../src/modules/core";

describe("createConsoleUI", () => {
  const mockCreateStyle = vi
    .fn()
    .mockImplementation((style: string) => (text: string) => `[${style}]${text}`);
  const mockMakeStyle = vi.fn().mockReturnValue((txt: string) => `styled-${txt}`);
  const mockHex = vi.fn().mockReturnValue((txt: string) => `hex-${txt}`);
  const mockMakeBox = vi.fn().mockReturnValue((txt: string) => `box-${txt}`);
  const mockBox = vi.fn().mockReturnValue((txt: string) => `box-${txt}`);
  const mockMakeTree = vi.fn().mockReturnValue((txt: string) => `tree-${txt}`);
  const mockTree = vi.fn().mockReturnValue((txt: string) => `tree-${txt}`);

  it("should return an object with all style methods", () => {
    const api = createConsoleUI(
      mockCreateStyle,
      mockMakeStyle,
      mockHex,
      mockMakeBox,
      mockBox,
      mockMakeTree,
      mockTree,
    )({
      enabled: true,
    });

    expect(api.red("Hello")).toBe("[red]Hello");
    expect(api.makeStyle({ color: "blue" })("test")).toBe("styled-test");
    expect(mockCreateStyle).toHaveBeenCalledWith("red", true);
    expect(mockMakeStyle).toHaveBeenCalled();
  });
});

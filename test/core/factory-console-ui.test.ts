import { describe, expect, it, vi } from "vitest";
import { createConsoleUI } from "../../src/core/factory-console-ui";

describe("createConsoleUI", () => {
  const mockCreateStyle = vi
    .fn()
    .mockImplementation((style: string) => (text: string) => `[${style}]${text}`);
  const mockMakeStyle = vi.fn().mockReturnValue((txt: string) => `styled-${txt}`);
  const mockHex = vi.fn().mockReturnValue((txt: string) => `hex-${txt}`);

  it("should return an object with all style methods", () => {
    const api = createConsoleUI(mockCreateStyle, mockMakeStyle, mockHex)({ enabled: true });

    expect(api.red("Hello")).toBe("[red]Hello");
    expect(api.makeStyle({ color: "blue" })("test")).toBe("styled-test");
    expect(mockCreateStyle).toHaveBeenCalledWith("red", true);
    expect(mockMakeStyle).toHaveBeenCalled();
  });
});

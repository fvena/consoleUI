import type { Color } from "../../src/modules/style/type";
import type { TreeNode } from "../../src/modules/tree/types";
import { describe, expect, it } from "vitest";
import { createTree } from "../../src/modules/tree";

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

const { makeTree, tree } = createTree(createMockStyle);

describe("Tree Component", () => {
  describe("tree", () => {
    it("should render an empty array for empty nodes", () => {
      const node: TreeNode[] = [];
      expect(tree(node)).toEqual("");
    });

    it("should render a single node without children", () => {
      const node = [
        {
          label: "Root",
        },
      ];
      expect(tree(node)).toEqual("📄 Root\n");
    });

    it("should render a single node with children", () => {
      const node = [
        {
          children: [{ label: "Child" }],
          label: "Root",
        },
      ];
      expect(tree(node)).toEqual("📁 Root\n└── 📄 Child\n");
    });

    it("should render a deep nested structure", () => {
      const node = [
        {
          children: [
            {
              children: [{ label: "Grandchild" }],
              label: "Child",
            },
          ],
          label: "Root",
        },
      ];
      expect(tree(node)).toEqual("📁 Root\n└── 📁 Child\n    └── 📄 Grandchild\n");
    });

    it("should render a deep nested structure with multiple children", () => {
      const node = [
        {
          children: [
            {
              children: [{ label: "Grandchild" }],
              label: "Child",
            },
            {
              children: [{ label: "Child 2" }],
              label: "Child 2",
            },
          ],
          label: "Root",
        },
      ];
      expect(tree(node)).toEqual(
        "📁 Root\n├── 📁 Child\n│   └── 📄 Grandchild\n└── 📁 Child 2\n    └── 📄 Child 2\n",
      );
    });

    it("should render a colored tree", () => {
      const node = [
        {
          children: [{ label: "Child" }],
          label: "Root",
        },
      ];
      expect(tree(node, true, "blue")).toEqual("📁 Root\n└── 📄 Child\n");
    });

    it("should render a tree with disabled icons", () => {
      const node = [
        {
          children: [{ label: "Child" }],
          label: "Root",
        },
      ];
      expect(tree(node, false, "blue")).toEqual("Root\n└── Child\n");
    });

    it("should render a tree with custom icons", () => {
      const node = [
        {
          children: [
            {
              icon: "💾",
              label: "Child",
            },
          ],
          icon: "🚀",
          label: "Root",
        },
      ];
      expect(tree(node)).toEqual("🚀 Root\n└── 💾 Child\n");
    });
  });

  describe("makeTree", () => {
    it("should create a reusable tree style", () => {
      const customTree = makeTree({
        color: "blue",
        showIcons: true,
      });

      const node = [
        {
          label: "Root",
        },
      ];
      expect(customTree(node)).toEqual("📄 Root\n");
    });
  });
});

# ConsolaUI - Project Requirements Document

## 1. Project Overview

ConsolaUI is a library designed to enhance console output with styles, colors, and visual components. It aims to provide developers with tools to create visually appealing console interfaces in both terminal environments and browser developer tools, while maintaining optimal performance and minimal footprint.

### 1.1 Vision

Create a lightweight, modular, and easy-to-use library for styling and enhancing console output in both terminal and browser environments with a focus on performance, developer experience, and cross-environment compatibility.

### 1.2 Target Environments

- Node.js terminal environments
- Browser console environments

## 2. Functional Requirements

### 2.1 Core Functionality

#### 2.1.1 Text Styling

- Apply colors to text (foreground and background)
- Support for custom colors using hexadecimal codes
- Apply text formatting (bold, italic, underline, etc.)
- Support anidamiento (nesting) of styles
- Support for creating custom, reusable styles

#### 2.1.2 Visual Components

- Box/container components with customizable borders and padding
- Tables with configurable formatting and borders
- Tree-view for hierarchical data
- Separators and headers
- Spinners and loading indicators
- Banners and notifications

### 2.2 Cross-Environment Support

- Support for Node.js terminal using ANSI escape codes
- Support for browser console using CSS styling
- Consistent API across both environments

## 3. Technical Requirements

### 3.1 Architecture

#### 3.1.1 Modular Structure

The library is organized with a clear separation between environments:

```
consoleUI/
├── src/
│   ├── core/                 # Core types and factory functions
│   │   ├── types.ts         # Shared type definitions
│   │   ├── constants.ts     # Shared constants
│   │   └── factory-console-ui.ts  # Main factory function
│   ├── utils/               # Shared utilities
│   ├── terminal/            # Terminal-specific implementation
│   └── browser/             # Browser-specific implementation
├── test/                    # Test files matching src structure
│   ├── core/
│   ├── terminal/
│   └── browser/
├── playground/              # Development testing environments
│   ├── terminal/           # Terminal playground
│   └── browser/            # Browser playground
└── package.json
```

#### 3.1.2 Design Patterns

- **Factory Pattern**: Core factory function creates environment-specific implementations
- **Pure Functions**: Emphasis on pure functions for better testability and tree-shaking
- **Zero Dependencies**: No runtime dependencies for optimal performance
- **Tree-Shaking**: Modular design allows effective dead code elimination

### 3.2 API Design

#### 3.2.1 Style Functions

```typescript
// Direct usage
import { red, bold, green } from "@franvena/consoleui/terminal";

console.log(red("Error message"));
console.log(bold("Important notice"));
```

#### 3.2.2 Component Functions

```typescript
// Direct usage
import { box, table } from "@franvena/consoleui/terminal";

console.log(box("Content in a box", { borderColor: "blue" }));
console.log(
  table([
    ["Name", "Age"],
    ["John", "30"],
  ]),
);
```

#### 3.2.3 Factory Functions

```typescript
// Creating custom, reusable components
import { makeStyle, makeBox } from "@franvena/consoleui/terminal";

const errorStyle = makeStyle({ color: "red", bold: true });
const warningBox = makeBox({ borderColor: "yellow", padding: 2 });

console.log(errorStyle("Error message"));
console.log(warningBox("Warning content"));
```

### 3.3 Technical Constraints

- **Size**: Maximum bundle size of 5KB for each environment (terminal/browser)
- **Dependencies**: Zero runtime dependencies
- **Node.js Compatibility**: Node.js 22.11.0 or higher
- **Browser Compatibility**: Modern browsers with ES6+ support
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Tree-Shaking**: Support for tree-shaking in modern bundlers

## 4. Implementation Approach

### 4.1 Shared vs. Environment-Specific Code

ConsolaUI uses a factory-based approach to minimize code duplication:

1. **Core Factory Function**:

   - Creates environment-specific implementations
   - Manages shared configuration
   - Handles feature detection

2. **Environment-Specific Implementations**:
   - Terminal: ANSI escape code generation
   - Browser: CSS-based styling
   - Environment-specific optimizations

### 4.2 Implementation Example: Box Component

```typescript
// src/core/types.ts
export interface ConsoleUI extends Record<Style, StyleFunction> {
  hex: (color: string, isForeground?: boolean) => StyleFunction;
  makeStyle: (options: StyleOptions) => StyleFunction;
  // More style methods...

  box: (content: string, borderColor?: Color) => string;
  makeBox: (options: BoxOptions) => (content: string) => string;
}

export interface BoxOptions {
  borderColor?: Color;
  padding?: number;
}

// src/core/constants.ts
export const DEFAULT_BOX_OPTIONS: BoxOptions = {
  borderColor: "gray",
  padding: 1,
};

// src/core/factory-console-ui.ts
export function createConsoleUI(
  createStyle: (styleType: Style, enabled: boolean) => StyleFunction,
  makeStyle: (options: StyleOptions) => StyleFunction,
  makeBox: (options: BoxOptions) => StyleFunction,
  hex: (color: string, isForeground?: boolean) => StyleFunction,
  box: (content: string, borderColor?: Color) => StyleFunction,
) {
  return (options: Partial<ConsoleUIOptions> = {}): ConsoleUI => {
    // Merge provided options with defaults
    const options_ = { ...DEFAULT_OPTIONS, ...options };

    // Create and return the complete API with all available styles
    return {
      // Base colors
      bgBlack: createStyle("bgBlack", options_.enabled),
      bgBlackBright: createStyle("bgBlackBright", options_.enabled),
      // More style methods...

      box,
      makeBox,
    };
  };
}

// src/components/box.ts
export function makeBox(options: BoxOptions): StyleFunction {
  return (text: string) => {
    // create box logic
    // ...
  };
}

export function box(content: string, borderColor?: Color): StyleFunction {
  return (text: string) => {
    return makeBox({ borderColor, content })(text);
  };
}

// src/terminal/index.ts
import { createConsoleUI } from "../core/factory-console-ui";
import { createStyle, hex as hex_, makeStyle as makeStyle_ } from "./style-terminal";
import { box as box_, makeBox as makeBox_ } from "../components/box";

const consoleUI = createConsoleUI(createStyle, makeStyle_, makeBox_, hex_, box_);

export const {
  bgBlack,
  bgBlackBright,
  // More style methods..
  makeBox,
  box,
} = api;

// src/browser/index.ts
import { createConsoleUI } from "../core/factory-console-ui";
import { createStyle, hex as hex_, makeStyle as makeStyle_ } from "./style-browser";
import { box as box_, makeBox as makeBox_ } from "../components/box";

const consoleUI = createConsoleUI(createStyle, makeStyle_, makeBox_, hex_, box_);

export const {
  bgBlack,
  bgBlackBright,
  // More style methods..
  makeBox,
  box,
} = api;

// test/browser/box.test.ts
import { describe, expect, it, vi } from "vitest";
import { log } from "../../src/browser/style-browser";
import { box, makeBox } from "../../src/components/box";
import { CSS_COLORS, CSS_FORMATS } from "../../src/browser/constants.browser";

describe("Box Component", () => {
  describe("makeStyle", () => {
    // ...
  });

  describe("box", () => {
    // ...
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

    describe("makeStyle", () => {
      // ...
    });

    describe("box", () => {
      // ...
    });
  });
});

// test/terminal/box.test.ts
import { describe, expect, it, vi } from "vitest";
import { box, makeBox } from "../../src/components/box";
import { ANSI_COLORS, ANSI_FORMATS, STYLES } from "../../src/terminal/constants.terminal";
import * as colorUtilities from "../../src/utils/color";

vi.mock("../../src/utils/color", async () => {
  const actual = await vi.importActual<typeof colorUtilities>("../../src/utils/color");
  return {
    ...actual,
    detectColorSupport: vi.fn().mockReturnValue("256"),
  };
});

describe("Box Component", () => {
  describe("makeStyle", () => {
    // ...
  });

  describe("box", () => {
    // ...
  });
});

// playground/terminal/src/index.ts
import {
  bgBlack,
  bgBlackBright,
  // More style methods..
  makeBox,
  box,
} from "@franvena/consoleui/terminal";

// ...

// 10. Box Component
printSection("Box Component");
console.log("Box component with default options:");
console.log(box("Default box"));
console.log(box("Box with border color", "green"));
console.log(box(`Box with multiple lines\nSecond line\nThird line`));

console.log("\nCreate your own reusable styles with makeBox:");
const customBox = makeBox({ borderColor: "blue", padding: 2 });
console.log(customBox("Custom box"));

console.log("\nBox component with nested styles:");
console.log(box(`${bold("Bold content")} inside a box`));

console.log("\nBox component with multiple lines:");
console.log(box(`Box with multiple lines\nSecond line\nThird line`));

// playground/browser/src/main.js
import {
  bgBlack,
  bgBlackBright,
  // More style methods..
  makeBox,
  box,
} from "@franvena/consoleui/browser";

// ...

// 10. Box Component
printSection("Box Component");
log("Box component with default options:");
log(box("Default box"));
log(box("Box with border color", "green"));
log(box(`Box with multiple lines\nSecond line\nThird line`));

log("\nCreate your own reusable styles with makeBox:");
const customBox = makeBox({ borderColor: "blue", padding: 2 });
log(customBox("Custom box"));

log("\nBox component with nested styles:");
log(box(`${bold("Bold content")} inside a box`));

log("\nBox component with multiple lines:");
log(box(`Box with multiple lines\nSecond line\nThird line`));

// README.md
## Available Features

### Make Box
// Description and usage

### Box
// Description and usage
```

### 4.3 Color and Style Support

The library supports:

- Standard ANSI colors (16 colors)
- 256 color mode
- RGB/True color support
- Hex color codes with automatic fallback
- Basic text formatting (bold, italic, underline, etc.)
- Background colors
- Automatic capability detection
- Graceful degradation in limited environments

## 5. Non-Functional Requirements

### 5.1 Performance

- Zero runtime dependencies
- Tree-shakeable modules
- Maximum bundle size of 10KB per environment
- Efficient string manipulation algorithms
- Minimal memory footprint

### 5.2 Usability

- Intuitive factory-based API
- Comprehensive TypeScript definitions
- Environment-specific exports
- Automatic capability detection
- Graceful degradation

### 5.3 Documentation

- Comprehensive API documentation
- Environment-specific guides
- Interactive examples
- Clear installation and usage instructions
- Detailed migration guides for major versions

## 6. Project Status and Features

### 6.1 Completed Features

#### Core Infrastructure

- ✅ Project setup with TypeScript
- ✅ Zero-dependency architecture
- ✅ Environment-specific builds
- ✅ Comprehensive test suite
- ✅ CI/CD pipeline with semantic release
- ✅ Bundle size monitoring
- ✅ Development playgrounds

#### Terminal Features

- ✅ Basic color support (16 colors)
- ✅ 256 color mode
- ✅ RGB/True color support
- ✅ Text formatting (bold, italic, etc.)
- ✅ Background colors
- ✅ Automatic capability detection

#### Browser Features

- ✅ CSS-based styling
- ✅ Color support
- ✅ Text formatting
- ✅ Background colors
- ✅ Console group support

### 6.2 Upcoming Features

#### Phase 1: Enhanced Components

- ✅ Box component with borders and padding
- Table component with formatting options
- Tree view for hierarchical data
- Progress indicators and spinners

#### Phase 2: Advanced Features

- Custom color palettes
- Theme support
- Layout system
- Interactive components

#### Phase 3: Developer Experience

- Interactive documentation
- Visual playground
- Component gallery
- Performance profiling tools

## 7. Quality Assurance

### 7.1 Testing Strategy

- Unit tests for all components
- Integration tests for environment-specific features
- Visual regression tests for components
- Performance benchmarks
- Cross-environment compatibility tests

### 7.2 Code Quality

- ESLint for code quality
- Prettier for code formatting
- Husky for git hooks
- Conventional commits
- Semantic versioning
- Automated changelog generation

### 7.3 Performance Monitoring

- Bundle size limits (10KB per environment)
- Performance benchmarks in CI
- Memory usage monitoring
- Tree-shaking verification

## 8. Conclusion

ConsolaUI has evolved into a focused, high-performance library for terminal and browser console styling. The project has successfully achieved its core goals of:

1. **Zero Dependencies**: Maintaining zero runtime dependencies while providing rich functionality
2. **Performance**: Keeping bundle size under 10KB per environment with efficient implementations
3. **Cross-Environment**: Providing consistent APIs across terminal and browser environments
4. **Developer Experience**: Delivering comprehensive TypeScript support and intuitive APIs
5. **Maintainability**: Establishing a robust development workflow with automated quality checks

The factory-based architecture has proven successful in maintaining clean separation between environments while maximizing code reuse. The project's commitment to zero dependencies and small bundle size has resulted in a lightweight yet powerful library that meets modern development needs.

Moving forward, the focus will be on expanding the component ecosystem while maintaining the project's core principles of performance, simplicity, and developer experience.

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
- Tree view for hierarchical data
- Separators and headers
- Future components planned:
  - Tables with configurable formatting and borders
  - Spinners and loading indicators
  - Banners and notifications

### 2.2 Cross-Environment Support

- Support for Node.js terminal using ANSI escape codes
- Support for browser console using CSS styling
- Consistent API across both environments

## 3. Technical Requirements

### 3.1 Architecture

#### 3.1.1 Modular Structure

The library is organized with a clear separation of concerns:

```
consoleUI/
├── src/
│   ├── modules/           # Core functionality modules
│   │   ├── core/         # Core types and interfaces
│   │   ├── style/        # Style implementation
│   │   ├── box/          # Box component
│   │   └── tree/         # Tree component
│   ├── utils/            # Shared utilities
│   ├── browser.ts        # Browser-specific implementation
│   └── terminal.ts       # Terminal-specific implementation
├── test/                 # Test files matching src structure
├── playground/           # Development testing environments
│   ├── terminal/        # Terminal playground
│   └── browser/         # Browser playground
└── package.json
```

#### 3.1.2 Design Patterns

- **Functional Programming**: Pure functions and immutable data structures
- **Factory Pattern**: Environment-specific implementations via factory functions
- **Module Pattern**: Clear separation between public API and implementation
- **Builder Pattern**: Flexible component configuration
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
import { box, tree } from "@franvena/consoleui/terminal";

console.log(box("Content in a box", { borderColor: "blue" }));
console.log(tree([{ label: "Root", children: [{ label: "Child 1" }, { label: "Child 2" }] }]));
```

#### 3.2.3 Factory Functions

```typescript
// Creating custom, reusable components
import { makeStyle, makeBox, makeTree } from "@franvena/consoleui/terminal";

const errorStyle = makeStyle({ color: "red", bold: true });
const warningBox = makeBox({ borderColor: "yellow", padding: 2 });
const customTree = makeTree({ color: "red" });

console.log(errorStyle("Error message"));
console.log(warningBox("Warning content"));
console.log(customTree(treeNodes));
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

ConsolaUI uses a modular approach to minimize code duplication:

1. **Core Modules**:

   - Shared types and interfaces
   - Component implementations (box, tree)
   - Style definitions and utilities
   - Environment-agnostic functionality

2. **Environment-Specific Implementations**:
   - Terminal: ANSI escape code generation (`terminal.ts`)
   - Browser: CSS-based styling (`browser.ts`)
   - Environment-specific optimizations

### 4.2 Implementation Example: Core Types

```typescript
// src/modules/core/types.ts
export interface ConsoleUI extends Record<Style, StyleFunction> {
  /**
   * Creates a box with specified options
   */
  box: (content: string, borderColor?: Color) => string;

  /**
   * Creates a function that applies a hex color to text
   */
  hex: (color: string, isForeground?: boolean) => StyleFunction;

  /**
   * Creates a function that applies a box style to text
   */
  makeBox: (options: BoxOptions) => StyleFunction;

  /**
   * Creates a custom style function with specified options
   */
  makeStyle: (options: StyleOptions) => StyleFunction;

  /**
   * Creates a function that applies a tree style to text
   */
  makeTree: (options: TreeOptions) => TreeFunction;

  /**
   * Creates a function that applies a tree style to text
   */
  tree: (nodes: TreeNode[]) => string;
}

export interface ConsoleUIOptions {
  /**
   * Master switch for styling functionality
   */
  enabled: boolean;
}
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
- Maximum bundle size of 5KB per environment
- Efficient string manipulation algorithms
- Minimal memory footprint
- Optimized component rendering
- Lazy initialization of heavy features
- Smart capability detection

### 5.2 Usability

- Intuitive functional API
- Comprehensive TypeScript definitions
- Environment-specific exports
- Automatic capability detection
- Graceful degradation
- Flexible component configuration
- Consistent behavior across environments
- Clear error messages

### 5.3 Documentation

- Comprehensive API documentation with TSDoc
- Environment-specific guides
- Interactive examples in playground
- Clear installation and usage instructions
- Detailed migration guides for major versions
- Component usage examples
- Type documentation
- Best practices guide

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
- ✅ Modular architecture

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
- ✅ Box component
- ✅ Tree component

### 6.2 Upcoming Features

#### Phase 1: Enhanced Components

- ✅ Box component with borders and padding
- ✅ Tree view for hierarchical data
- Table component with formatting options
- Progress indicators and spinners
- Banners and notifications

#### Phase 2: Advanced Features

- Custom color palettes
- Theme support
- Layout system
- Interactive components
- Animation support
- Custom component API

#### Phase 3: Developer Experience

- Interactive documentation
- Visual playground
- Component gallery
- Performance profiling tools
- Debug mode
- Component inspector

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

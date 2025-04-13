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

The library will be organized with a clear separation between environments:

```
consolaui/
├── src/
│   ├── core/                 # Shared types and utilities
│   ├── renderers/            # Platform-specific rendering strategies
│   │   ├── terminal.ts       # Terminal/ANSI renderer
│   │   └── browser.ts        # Browser/CSS renderer
│   ├── components/           # Shared component logic
│   │   ├── box.ts
│   │   ├── table.ts
│   │   └── ...
│   ├── terminal/             # Terminal-specific exports
│   │   └── index.ts
│   └── browser/              # Browser-specific exports
│       └── index.ts
└── package.json
```

#### 3.1.2 Design Patterns

- **Strategy Pattern / Dependency Injection**: Use renderers that implement the same interface but with environment-specific implementations.
- **Factory Functions**: Provide factory functions (prefixed with `make`) for creating custom, reusable components.
- **Pure Functions**: Prioritize pure functions over stateful objects for better testability and composition.

### 3.2 API Design

#### 3.2.1 Style Functions

```typescript
// Direct usage
import { red, bold, green } from "consolaui/terminal";

console.log(red("Error message"));
console.log(bold("Important notice"));
```

#### 3.2.2 Component Functions

```typescript
// Direct usage
import { box, table } from "consolaui/terminal";

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
import { makeStyle, makeBox } from "consolaui/terminal";

const errorStyle = makeStyle({ color: "red", bold: true });
const warningBox = makeBox({ borderColor: "yellow", padding: 2 });

console.log(errorStyle("Error message"));
console.log(warningBox("Warning content"));
```

### 3.3 Technical Constraints

- **Size**: Minimize bundle size for browser environments
- **Dependencies**: Minimize external dependencies
- **Compatibility**: Support Node.js 14+ and modern browsers
- **TypeScript**: Utilize TypeScript for type safety and developer experience

## 4. Implementation Approach

### 4.1 Shared vs. Environment-Specific Code

ConsolaUI will use a dependency injection approach to minimize code duplication:

1. **Shared Component Logic**:

   - Component structure calculation
   - Layout algorithms
   - Option processing

2. **Environment-Specific Renderers**:
   - Terminal: ANSI escape code generation
   - Browser: CSS style generation

### 4.2 Implementation Example: Box Component

```typescript
// core/types.ts
export interface StyleRenderer {
  red(text: string): string;
  bold(text: string): string;
  // More style methods...

  applyBorderColor(text: string, color: string): string;
}

export interface BoxOptions {
  borderColor?: string;
  padding?: number;
  title?: string;
}

// components/box.ts
export function createBoxModule(renderer: StyleRenderer) {
  function box(content: string, options: BoxOptions = {}) {
    // Shared box calculation logic
    // ...

    // Apply environment-specific styling via the injected renderer
    if (options.borderColor) {
      result = renderer.applyBorderColor(result, options.borderColor);
    }

    return result;
  }

  function makeBox(options: BoxOptions = {}) {
    return (content: string) => box(content, options);
  }

  return { box, makeBox };
}

// terminal/index.ts
import { TerminalRenderer } from "../renderers/terminal";
import { createBoxModule } from "../components/box";

const renderer = new TerminalRenderer();
const boxModule = createBoxModule(renderer);

export const box = boxModule.box;
export const makeBox = boxModule.makeBox;
```

### 4.3 Color and Style Support

The library will support:

- 16 basic colors (8 standard + 8 bright)
- Custom colors using hexadecimal codes (e.g., #FF5733)
- Basic formatting (bold, italic, underline, etc.)
- Background colors
- Color detection based on terminal capabilities

## 5. Non-Functional Requirements

### 5.1 Performance

- Minimal runtime overhead
- Efficient string manipulation
- Lazy evaluation where possible

### 5.2 Usability

- Clear, consistent API
- Comprehensive TypeScript definitions
- Intuitive factory functions for customization

### 5.3 Documentation

- Clear API documentation with examples
- Separate documentation for terminal and browser usage
- Visual examples of all components

## 6. Comparison with Existing Solutions

ConsolaUI aims to improve upon existing solutions like the analyzed "Consola" library by:

1. **Clearer separation of concerns**: Explicit terminal vs. browser imports
2. **More focused functionality**: Better at doing fewer things exceptionally well
3. **Lighter footprint**: Minimal dependencies and bundle size
4. **Consistent API**: Same patterns across all components
5. **Better TypeScript integration**: Comprehensive type definitions

## 7. Project Phases and Feature-based Development

### 7.1 Definition of Done (DoD) for Each Feature

For each individual feature developed, the following criteria must be met before considering it complete:

1. **Functionality complete**: Code implements all required functionality
2. **Tests written and passing**: Unit tests, integration tests where applicable
3. **Playground verification**: Feature tested in both terminal and browser playgrounds
4. **Documentation updated**: API documentation and examples for the feature
5. **PR review passed**: Code review completed with all feedback addressed
6. **Version tagged**: Feature included in a versioned release (following semantic versioning)
7. **Release notes updated**: Changes documented in release notes
8. **Performance verified**: Feature meets performance requirements
9. **API consistency checked**: Feature follows established API patterns

This feature-based approach ensures rapid, continuous delivery of value after each feature is completed.

### 7.2 Phase 0: Project Foundation

- Set up project infrastructure (TypeScript, build tools, linting) [DoD, Release v0.1.0]
- Create terminal playground [DoD, Release v0.1.1]
- Create browser console playground [DoD, Release v0.1.2]
- Establish testing framework and methodologies [DoD, Release v0.1.3]
- Configure CI/CD pipeline [DoD, Release v0.1.4]
- Set up documentation infrastructure [DoD, Release v0.1.5]

### 7.3 Phase 1: Core Styling Features

Each feature follows the DoD process and results in a new release:

- Basic color functions (red, green, blue, etc.) [DoD, Release v0.2.0]
- Text formatting (bold, italic, underline) [DoD, Release v0.2.1]
- Style composition and nesting [DoD, Release v0.2.2]
- Hexadecimal color support [DoD, Release v0.2.3]
- Terminal renderer complete [DoD, Release v0.2.4]
- Browser renderer complete [DoD, Release v0.2.5]
- Background colors [DoD, Release v0.2.6]
- Factory functions for custom styles [DoD, Release v0.2.7]

### 7.4 Phase 2: Basic Component Features

Each feature follows the DoD process and results in a new release:

- Simple box component [DoD, Release v0.3.0]
- Box with customizable borders [DoD, Release v0.3.1]
- Box with title support [DoD, Release v0.3.2]
- Simple table component [DoD, Release v0.3.3]
- Table with styling options [DoD, Release v0.3.4]
- Table with header/footer support [DoD, Release v0.3.5]
- Horizontal separator component [DoD, Release v0.3.6]
- Header component [DoD, Release v0.3.7]

### 7.5 Phase 3: Advanced Component Features

Each feature follows the DoD process and results in a new release:

- Simple tree-view component [DoD, Release v0.4.0]
- Advanced tree-view with custom styling [DoD, Release v0.4.1]
- Basic spinner component [DoD, Release v0.4.2]
- Multiple spinner styles [DoD, Release v0.4.3]
- Progress bar component [DoD, Release v0.4.4]
- Banner component [DoD, Release v0.4.5]
- Notification components (success, error, warning, info) [DoD, Release v0.4.6]
- Production-ready v1.0.0 release [DoD, Release v1.0.0]

This granular, feature-by-feature approach ensures that:

1. Value is delivered continuously with each small feature completion
2. Users can adopt and provide feedback on individual features early
3. The team can pivot or reprioritize quickly based on user feedback
4. Quality remains consistent across all features
5. Documentation stays current with implemented functionality
6. Performance and API consistency are verified throughout development

## 8. Conclusion

ConsolaUI will provide a focused, high-quality library for terminal styling and visual components. By prioritizing performance, developer experience, and cross-environment compatibility, it aims to become the go-to solution for developers looking to enhance their command-line interfaces.

The explicit separation between terminal and browser environments, combined with shared component logic through dependency injection, will ensure code reuse while maintaining optimal implementations for each platform.

# ConsoleUI

<p align="center">
  <img src="https://raw.githubusercontent.com/fvena/typescript-library-template-pro/main/docs/public/logo.png" alt="ConsoleUI" width="180"/>
</p>

<h3 align="center">A lightweight, high-performance UI toolkit for terminal and browser consoles</h3>

<p align="center">
Create beautiful styled outputs with zero performance impact. ConsoleUI provides styling, colors, boxes, tables, spinners, and trees in a single tree-shakable package with zero dependencies, ensuring consistent results across all environments.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@franvena/consoleui"><img src="https://img.shields.io/npm/v/@franvena/consoleui.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@franvena/consoleui"><img src="https://img.shields.io/npm/dm/@franvena/consoleui.svg?color=blue" alt="Downloads"></a>
  <img src="https://img.shields.io/endpoint?url=https://fvena.github.io/consoleUI/badges/browser-badge.json" alt="Browser Size">
  <img src="https://img.shields.io/endpoint?url=https://fvena.github.io/consoleUI/badges/terminal-badge.json" alt="Terminal Size">
</p>

## Why ConsoleUI?

Current console styling libraries often force developers to juggle multiple packages for different needs - one for colors, another for spinners, and yet another for tables. This leads to inconsistent APIs, bloated dependencies, and varying performance characteristics. ConsoleUI solves these problems by providing:

- **Unified API**: Same patterns across all components, works identically in Node.js and browsers
- **Zero Dependencies**: No external dependencies, reducing security risks and bundle size
- **Tree-Shaking Support**: Import only what you need, keeping your bundle lean
- **Type Safety**: Comprehensive TypeScript definitions for better development experience
- **Cross-Environment**: Consistent behavior between terminal and browser environments
- **High Performance**: Optimized for minimal overhead and maximum speed

## Quick Start

```bash
# npm
npm install @franvena/consoleui

# pnpm
pnpm add @franvena/consoleui

# yarn
yarn add @franvena/consoleui
```

### Terminal

```typescript
import { red, greenBright, box } from "@franvena/consoleui/terminal";

// Basic colors
console.log(red("Error: Something went wrong!"));

// Bright colors
console.log(greenBright("Success: Operation completed!"));

// Boxes
console.log(box("Important message", { padding: 1 }));
```

### Browser

```typescript
import { red, greenBright, box, log } from "@franvena/consoleui/browser";

// Basic colors
log(red("Error: Something went wrong!"));

// Bright colors
log(greenBright("Success: Operation completed!"));
```

## Documentation

Visit our [documentation website](https://consoleui.dev) for:

- [Getting Started Guide](https://consoleui.dev/guide/getting-started)
- [API Reference](https://consoleui.dev/api/)
- [Examples](https://consoleui.dev/examples/)
- [Playground](https://consoleui.dev/playground/)

## Use Cases

ConsoleUI is perfect for:

- **CLI Applications**: Create beautiful, information-rich terminal interfaces
- **Development Tools**: Enhance logging and debugging output
- **DevOps Scripts**: Build readable diagnostic and monitoring tools
- **Web Applications**: Debug with style in browser consoles
- **Libraries**: Provide consistent and beautiful console output

## Available Features

### Colors and Styling

- Basic colors: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`
- Bright variants: `blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`

  ```typescript
  // Terminal
  console.log(red("Error: Something went wrong!"));
  console.log(greenBright("Success: Operation completed!"));

  // Browser
  log(red("Error: Something went wrong!"));
  log(greenBright("Success: Operation completed!"));
  ```

- Basic backgrounds: `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite`
- Bright backgrounds: `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`

  ```typescript
  // Terminal
  console.log(bgRed("Error: Something went wrong!"));
  console.log(bgGreenBright("Success: Operation completed!"));

  // Browser
  log(bgRed("Error: Something went wrong!"));
  log(bgGreenBright("Success: Operation completed!"));
  ```

- Modifiers: `bold`, `dim`, `italic`, `underline`, `inverse`

  ```typescript
  // Terminal
  console.log(bold("Bold text"));
  console.log(dim("Dim text"));
  console.log(italic("Italic text"));
  console.log(underline("Underlined text"));
  console.log(inverse("Inverse text"));

  // Browser
  log(bold("Bold text"));
  log(dim("Dim text"));
  log(italic("Italic text"));
  log(underline("Underlined text"));
  log(inverse("Inverse text"));
  ```

### Hex Colors

Function `hex` allows you to use hex colors in the terminal and browser.

```typescript
const orange = hex("#FFA500");
const orangeBg = hex("#FFA500", true);

// Terminal
console.log(orange("Orange text"));
console.log(orangeBg("Orange background"));
console.log(orange(orangeBg("Orange text on orange background")));

// Browser
log(orange("Orange text"));
log(orangeBg("Orange background"));
log(orange(orangeBg("Orange text on orange background")));
```

### Make Style

Function `makeStyle` allows you to create reusable styles.

```typescript
const errorStyle = makeStyle({
  backgroundColor: "bgRed",
  bold: true,
  color: "black",
});

// Terminal
console.log(errorStyle("Error: Something went wrong!"));

// Browser
log(errorStyle("Error: Something went wrong!"));
```

### Components

- `box`: Create bordered boxes with customizable styles
- `table`: Display data in formatted tables
- `tree`: Show hierarchical data structures
- `spinner`: Show loading indicators
- `progress`: Display progress bars

## Box Component

The box component allows you to create visually appealing boxes around your content with customizable borders, colors, and layout options.

### Basic Usage

```typescript
import { box, makeBox } from "@franvena/consoleui";

// Simple box with default styling
console.log(box("Hello World"));

// Box with custom border color
console.log(box("Important Message", "red"));

// Box with custom styling
const customBox = makeBox({
  borderColor: "blue",
  borderStyle: "rounded",
  padding: 2,
  width: 60,
});

console.log(customBox("Your content here"));
```

### Options

The box component supports the following options:

- `borderColor`: The color of the box border (default: 'gray')

  - Supports all standard colors: 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'

- `borderStyle`: The style of the box border (default: 'rounded')

  - 'single': ┌─┐
  - 'double': ╔═╗
  - 'rounded': ╭─╮

- `horizontalPadding`: Internal padding between content and border (default: 1)
- `verticalPadding`: Internal padding between content and border (default: 0)
- `width`: Maximum width of the box in characters (default: 80)

  - Content will be automatically wrapped to fit within this width
  - Includes borders and padding in the calculation
  - Useful for maintaining consistent layouts and handling long content

- `align`: Alignment of the box content (default: 'left')
  - 'left': Aligns content to the left
  - 'center': Centers content within the box
  - 'right': Aligns content to the right

### Examples

```typescript
// Box with custom width
console.log(
  makeBox({ width: 40 })(
    "This is a long message that will be automatically wrapped to fit within 40 characters",
  ),
);

// Narrow box with colored border
console.log(
  makeBox({
    borderColor: "blue",
    width: 20,
  })("Content in a narrow box"),
);

// Box with multiple paragraphs
console.log(
  makeBox({
    borderColor: "green",
    width: 50,
  })("First paragraph with wrapped content.\n\nSecond paragraph that also wraps."),
);

// Reusable warning box
const warningBox = makeBox({
  borderColor: "yellow",
  borderStyle: "rounded",
  width: 60,
});

console.log(warningBox("Warning: Long message that will be wrapped..."));
```

### Notes

- The box component automatically handles:

  - Text wrapping to maintain the specified width
  - Multi-line content with proper border alignment
  - Very long words by splitting them across lines
  - Proper spacing and padding
  - Consistent appearance across terminal and browser environments

- The actual width might be adjusted to:
  - Accommodate minimum content width
  - Respect console/terminal width limitations
  - Account for borders and padding

## Contributing

We love your input! Check out our [Contributing Guide](CONTRIBUTING.md) for ways to get started. Every contribution helps:

- Reporting bugs
- Suggesting features
- Improving documentation
- Reviewing pull requests
- Submitting pull requests

## License

[MIT](./LICENSE) © [Francisco Vena](https://github.com/fvena)

---

<p align="center">
  <a href="https://github.com/fvena/consoleUI">
    ⭐ Star us on GitHub
  </a>
</p>

# ConsoleUI

<p align="center">
  <img src="https://raw.githubusercontent.com/fvena/typescript-library-template-pro/main/docs/public/logo.png" alt="ConsoleUI" width="180"/>
</p>

<h3 align="center">A lightweight, high-performance UI toolkit for terminal and browser consoles</h3>

<p align="center">
Create beautiful styled outputs with zero performance impact. ConsoleUI provides styling, colors, boxes, tables, spinners, and trees in a single tree-shakable package with zero dependencies, ensuring consistent results across all environments.
</p>

<p align="center">
  <a href="https://github.com/fvena/consoleUI/actions"><img src="https://github.com/fvena/consoleUI/workflows/CI%2FCD/badge.svg" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/@franvena/consoleui"><img src="https://img.shields.io/npm/v/@franvena/consoleui.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@franvena/consoleui"><img src="https://img.shields.io/npm/dm/@franvena/consoleui.svg" alt="Downloads"></a>
  <a href="https://github.com/fvena/consoleUI/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/consolaui.svg" alt="License"></a>
  <a href="https://github.com/fvena/consoleUI"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
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
- Bright variants: `blackBright`, `redBright`, etc.
- Backgrounds: `bgRed`, `bgGreen`, etc.
- Modifiers: `bold`, `dim`, `italic`, `underline`, `inverse`

### Components

- `box`: Create bordered boxes with customizable styles
- `table`: Display data in formatted tables
- `tree`: Show hierarchical data structures
- `spinner`: Show loading indicators
- `progress`: Display progress bars

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

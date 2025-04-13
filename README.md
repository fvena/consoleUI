<br /><!-- markdownlint-disable-line -->

<p align="right">
  <a href="https://github.com/fvena/typescript-library-template-pro">
    ⭐ &nbsp;&nbsp;<strong>Star this template if you find it useful</strong> ↗️
  </a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/fvena/typescript-library-template-pro/main/docs/public/logo.png" alt="ConsoleUI" width="180"/>

  <h1 align="center">ConsoleUI</h1>
  <div align="center">A lightweight, high-performance UI toolkit for terminal and browser consoles. Create beautiful styled outputs with zero performance impact. ConsoleUI provides styling, colors, boxes, tables, spinners, and trees in a single tree-shakable package with zero dependencies, ensuring consistent results across all environments.</div>
</p>

<br/>

<div align="center">

<!-- markdownlint-disable MD042 -->

![GitHub package.json version](https://img.shields.io/github/package-json/v/fvena/consoleUI)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![Build Status](https://github.com/fvena/consoleUI/workflows/CI%2FCD/badge.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

<!-- markdownlint-enable MD042 -->

</div>

## Features

- ⚡️ **Blazing fast**: Engineered for zero-overhead performance
- 🪶 **Ultralight**: Tree-shakable imports ensure minimal footprint
- 🧩 **All-in-one**: Unified API for all your console styling needs
- 🔄 **Cross-environment**: Works identically in Node.js and browsers
- 🛠️ **Zero dependencies**: No bloat, just pure functionality

## Overview

ConsoleUI solves the common problem of developers needing to juggle multiple libraries for console styling needs. Instead of importing separate packages for colors, spinners, boxes, and tables—each with their own dependencies, API patterns, and performance characteristics—ConsoleUI provides everything in one cohesive package.

### Why ConsoleUI?

- **Consistent Experience**: The same API works seamlessly across terminal and browser consoles
- **Modular Design**: Import only what you need with full tree-shaking support
- **Performance First**: Built with performance as a priority, not an afterthought
- **Developer Friendly**: Intuitive API with comprehensive TypeScript definitions
- **Modern Architecture**: Built on modern JavaScript practices and patterns

### Visual Examples

![Terminal Styling Example](https://via.placeholder.com/800x400?text=Terminal+Styling+Example)
![Browser Console Example](https://via.placeholder.com/800x400?text=Browser+Console+Example)

## Quick Start

```bash
npm install consoleui
```

```javascript
// Terminal environment
import { red, bold, box } from "consoleui/terminal";

console.log(red("Error message"));
console.log(bold("Important notice"));
console.log(box("Content in a box", { borderColor: "blue" }));

// Browser environment
import { red, bold, box } from "consoleui/browser";

console.log(red("Error message"));
console.log(bold("Important notice"));
console.log(box("Content in a box", { borderColor: "blue" }));
```

## Why Choose ConsoleUI Over Alternatives?

| Feature               | ConsoleUI                              | Other Libraries                        |
| --------------------- | -------------------------------------- | -------------------------------------- |
| **Unified API**       | ✅ Same patterns across all components | ❌ Different APIs per library          |
| **Cross-environment** | ✅ Works in both terminal and browser  | ❌ Often terminal-only or browser-only |
| **Tree-shaking**      | ✅ Import only what you need           | ❌ Often all-or-nothing imports        |
| **Performance**       | ✅ Optimized for minimal overhead      | ❌ Performance varies widely           |
| **Dependencies**      | ✅ Zero external dependencies          | ❌ Often multiple nested dependencies  |
| **Bundle size**       | ✅ Minimal footprint                   | ❌ Combines multiple libraries' weight |
| **TypeScript**        | ✅ Comprehensive type definitions      | ❌ Inconsistent type support           |

## Who Uses ConsoleUI?

ConsoleUI is perfect for:

- **CLI Application Developers**: Create beautiful, information-rich terminal interfaces
- **DevOps Teams**: Build readable diagnostic and monitoring tools
- **Web Developers**: Debug with style in browser consoles
- **Library Authors**: Enhance your library's console output
- **Enterprise Applications**: Standardize console styling across your organization

## Documentation

[Full documentation website →](https://consoleui.dev)

## Contributing

We welcome contributions of all kinds! See our [contributing guide](CONTRIBUTING.md) for details.

## License

This template is [MIT licensed](./LICENSE) - use it freely for personal and commercial projects.

---

<p align="center">
  Your ⭐ motivates continued development and maintenance
</p>

import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/consoleUI/",
  description:
    "A lightweight, high-performance UI toolkit for terminal and browser consoles. Create beautiful styled outputs with zero performance impact. ConsoleUI provides styling, colors, boxes, tables, spinners, and trees in a single tree-shakable package with zero dependencies, ensuring consistent results across all environments.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { link: "/", text: "Home" },
      { link: "/markdown-examples", text: "Examples" },
    ],

    sidebar: [
      {
        items: [
          { link: "/markdown-examples", text: "Markdown Examples" },
          { link: "/api-examples", text: "Runtime API Examples" },
        ],
        text: "Examples",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
  title: "consoleUI",
});

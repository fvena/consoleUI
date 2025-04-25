import {
  bgBlack,
  bgBlackBright,
  bgBlue,
  bgBlueBright,
  bgCyan,
  bgCyanBright,
  bgGray,
  bgGreen,
  bgGreenBright,
  bgMagenta,
  bgMagentaBright,
  bgRed,
  bgRedBright,
  bgWhite,
  bgWhiteBright,
  bgYellow,
  bgYellowBright,
  black,
  blackBright,
  blue,
  blueBright,
  bold,
  box,
  cyan,
  cyanBright,
  dim,
  gray,
  green,
  greenBright,
  hex,
  hidden,
  italic,
  magenta,
  magentaBright,
  makeBox,
  makeStyle,
  makeTree,
  red,
  redBright,
  strikethrough,
  tree,
  underline,
  white,
  whiteBright,
  yellow,
  yellowBright,
} from "@franvena/consoleui/terminal";

/**
 * ConsoleUI Terminal Examples
 * This file demonstrates the various features and capabilities of the ConsoleUI terminal styling library.
 */

// Helper function to create section headers
const printSection = (title: string) => {
  console.log("\n" + "=".repeat(80));
  console.log(yellowBright(title));
  console.log("=".repeat(80) + "\n");
};

// 1. Basic Colors
printSection("Basic Colors");
console.log("Basic colors are perfect for simple text highlighting:");
console.log(`- ${black("black")} - Default black text`);
console.log(`- ${red("red")} - For errors and warnings`);
console.log(`- ${green("green")} - For success messages`);
console.log(`- ${yellow("yellow")} - For warnings and highlights`);
console.log(`- ${blue("blue")} - For information`);
console.log(`- ${magenta("magenta")} - For special content`);
console.log(`- ${cyan("cyan")} - For system messages`);
console.log(`- ${white("white")} - For regular content`);
console.log(`- ${gray("gray")} - For subtle text`);

// 2. Bright Colors
printSection("Bright Colors");
console.log("Bright variants provide more vibrant options:");
console.log(`- ${blackBright("blackBright")} - Brighter black (gray)`);
console.log(`- ${redBright("redBright")} - Vibrant red`);
console.log(`- ${greenBright("greenBright")} - Vibrant green`);
console.log(`- ${yellowBright("yellowBright")} - Vibrant yellow`);
console.log(`- ${blueBright("blueBright")} - Vibrant blue`);
console.log(`- ${magentaBright("magentaBright")} - Vibrant magenta`);
console.log(`- ${cyanBright("cyanBright")} - Vibrant cyan`);
console.log(`- ${whiteBright("whiteBright")} - Vibrant white`);

// 3. Background Colors
printSection("Background Colors");
console.log("Background colors are perfect for highlighting text:");
console.log(`- ${white(bgBlack("bgBlack"))} - Default black background`);
console.log(`- ${black(bgRed("bgRed"))} - For errors and warnings`);
console.log(`- ${black(bgGreen("bgGreen"))} - For success messages`);
console.log(`- ${black(bgYellow("bgYellow"))} - For warnings and highlights`);
console.log(`- ${black(bgBlue("bgBlue"))} - For information`);
console.log(`- ${black(bgMagenta("bgMagenta"))} - For special content`);
console.log(`- ${black(bgCyan("bgCyan"))} - For system messages`);
console.log(`- ${black(bgWhite("bgWhite"))} - For regular content`);
console.log(`- ${black(bgGray("bgGray"))} - For subtle text`);
console.log();
console.log("Bright variants provide more vibrant options:");
console.log(`- ${white(bgBlackBright("bgBlackBright"))} - Brighter black (gray)`);
console.log(`- ${black(bgRedBright("bgRedBright"))} - Vibrant red`);
console.log(`- ${black(bgGreenBright("bgGreenBright"))} - Vibrant green`);
console.log(`- ${black(bgYellowBright("bgYellowBright"))} - Vibrant yellow`);
console.log(`- ${black(bgBlueBright("bgBlueBright"))} - Vibrant blue`);
console.log(`- ${black(bgMagentaBright("bgMagentaBright"))} - Vibrant magenta`);
console.log(`- ${black(bgCyanBright("bgCyanBright"))} - Vibrant cyan`);
console.log(`- ${black(bgWhiteBright("bgWhiteBright"))} - Vibrant white`);

// 4. Text Formatting
printSection("Text Formatting");
console.log("Text formatting options for enhanced typography:");
console.log(`- ${bold("bold")} - For strong emphasis`);
console.log(`- ${italic("italic")} - For italicized text`);
console.log(`- ${underline("underline")} - For underlining text`);
console.log(`- ${strikethrough("strikethrough")} - For crossed-out text`);
console.log(`- ${dim("dim")} - For less prominent text`);
console.log(`- ${hidden("hidden")} - For hidden text (hover to see)`);

console.log("\nCombining text formats with colors:");
console.log(`- ${bold(blue("Bold blue text"))}`);
console.log(`- ${italic(green("Italic green text"))}`);
console.log(`- ${underline(red("Underlined red text"))}`);

console.log("\nCombining text formats with background colors:");
console.log(`- ${bold(yellow("Bold text on yellow"))}`);
console.log(`- ${italic(blue("Italic text on blue"))}`);

console.log("\nComplex combinations:");
console.log(`- ${bold(italic(magenta("Bold italic magenta")))}`);
console.log(`- ${bold(underline(bgGreen(black("Bold underline on green"))))}`);
console.log(`- ${italic(strikethrough(red("Italic strikethrough red")))}`);

// 5. Hex Colors
printSection("Hex Colors");
console.log("Hex colors are perfect for customizing text and background colors:");
const hexColor = hex("#FF4500");
const hexColorBg = hex("#FFB84D", true);
console.log(`- ${hexColor("Red")}`);
console.log(`- ${hexColorBg("Green background")}`);
console.log(`- ${hexColor(hexColorBg("Red on green background"))}`);

// 6. Nested Styles
printSection("Nested Styles");
console.log("You can nest different colors for complex styling:");
console.log(`Simple nesting: ${red("Red")} with ${blue("blue")} and ${green("green")}`);
console.log(`Deep nesting: ${red(`Red ${blue(`with blue ${green("and green")} inside`)} text`)}`);
console.log(`Alternative nesting: ${red(blue(green("Red → Blue → Green")))}`);

// 7. Custom Styles
printSection("Custom Styles");
console.log("Create your own reusable styles with makeStyle:");

const errorStyle = makeStyle({ backgroundColor: "bgRed", bold: true, color: "black" });
const warningStyle = makeStyle({ backgroundColor: "bgYellow", bold: true, color: "black" });
const successStyle = makeStyle({ backgroundColor: "bgGreen", bold: true, color: "black" });
const infoStyle = makeStyle({ backgroundColor: "bgBlue", bold: true, color: "black" });

console.log(`${errorStyle("Error:")} Something went wrong`);
console.log(`${warningStyle("Warning:")} Please check your input`);
console.log(`${successStyle("Success:")} Operation completed`);
console.log(`${infoStyle("Info:")} System is running`);

// 8. Disabled Styles
printSection("Disabled Styles");
console.log("You can create styles with disabled colors:");
const disabledStyle = makeStyle({ color: "red", enabled: false });
console.log(`Normal: ${red("This is red")}`);
console.log(`Disabled: ${disabledStyle("This would be red if enabled")}`);

// 9. Practical Examples
printSection("Practical Examples");
console.log("Real-world usage examples:");

// Branding
console.log(bgBlueBright(black("ConsoleUI")));
console.log(black(bgRed("Hello") + bgBlue("World")));

// Log levels
console.log(
  `${gray("[2024-03-19 10:30:00]")} ${errorStyle("ERROR")} Failed to connect to database`,
);
console.log(`${gray("[2024-03-19 10:30:01]")} ${warningStyle("WARN")} High memory usage detected`);
console.log(`${gray("[2024-03-19 10:30:02]")} ${infoStyle("INFO")} Server started on port 3000`);
console.log(`${gray("[2024-03-19 10:30:03]")} ${successStyle("SUCCESS")} Backup completed`);

// Progress indication
console.log("\nTask Progress:");
console.log(`[${green("■".repeat(5))}${gray("□".repeat(5))}] 50% Complete`);

// Status indicators
console.log("\nService Status:");
console.log(`Database: ${green("●")} Connected`);
console.log(`Cache: ${yellow("●")} Syncing`);
console.log(`API: ${red("●")} Offline`);

// JSON highlighting
console.log("\nJSON Output:");
console.log(`${gray("{")}
  ${cyan('"status"')}: ${green('"success"')},
  ${cyan('"data"')}: ${gray("{")}
    ${cyan('"id"')}: ${yellow("123")},
    ${cyan('"name"')}: ${green('"Test"')}
  ${gray("}")}
${gray("}")}`);

// 10. Box Component
printSection("Box Component");
console.log("Box component with default options:");
console.log(box("Default box"));
console.log(box("Box with border color", "green"));
console.log(box(`Box with multiple lines\nSecond line\nThird line`));

console.log("\nCreate your own reusable styles with makeBox:");
const customBox = makeBox({
  align: "center",
  borderColor: "blue",
  horizontalPadding: 4,
  verticalPadding: 2,
});
console.log(customBox(bold(blueBright("Custom box"))));

console.log("\nBox component with nested styles:");
console.log(box(`${bgRed(black(bold("Bold content")))} inside a box`, "red"));

console.log("\nBox component with multiple lines:");
console.log(box(`Box with multiple lines\nSecond line\nThird line`));

// Box Component Examples
console.log("\n=== Box Component Examples ===\n");

// Default box
console.log("Default box:");
console.log(box("Hello World"));

// Custom border color
console.log("\nBox with custom border color:");
console.log(box("Important Message", "red"));

// Box with custom width
console.log("\nBox with custom width (40 characters):");
console.log(
  makeBox({ width: 40 })(
    "This is a long message that will be automatically wrapped to fit within 40 characters",
  ),
);

// Box with very narrow width
console.log("\nBox with narrow width (20 characters):");
console.log(
  makeBox({ borderColor: "blue", width: 20 })(
    "This text demonstrates how content is wrapped in a narrow box",
  ),
);

// Box with multiple paragraphs
console.log("\nBox with multiple paragraphs and custom width:");
console.log(
  makeBox({ borderColor: "green", width: 50 })(
    "First paragraph with some long content that needs to be wrapped.\n\nSecond paragraph that also contains long content that will be automatically wrapped to maintain readability.",
  ),
);

// Reusable styled box
const warningBox = makeBox({
  borderColor: "yellow",
  borderStyle: "double",
  width: 60,
});

console.log("\nReusable warning box:");
console.log(
  warningBox(
    "Warning: This is a long warning message that will be automatically wrapped to maintain a clean and consistent layout in your console output.",
  ),
);

// 11. Tree Component
printSection("Tree Component");

// Example file system tree
const fileSystemTree = {
  children: [
    {
      children: [
        {
          children: [{ label: "tree.ts" }, { label: "box.ts" }, { label: "spinner.ts" }],
          label: "components",
        },
        {
          children: [
            { label: "enviroment.ts" },
            { label: "strip-styles.ts" },
            { label: "wrap-text.ts" },
          ],
          label: "utils",
        },
        { label: "index.ts" },
      ],
      label: "src",
    },
    {
      label: "package.json",
    },
    {
      label: "tsconfig.json",
    },
  ],
  label: bgRed(black(bold("project"))),
};

const menuTree = [
  {
    children: [{ label: "New" }, { label: "Open" }, { label: "Save" }, { label: "Exit" }],
    label: "File",
  },
  {
    children: [
      { label: "Undo" },
      { label: "Redo" },
      { label: "Cut" },
      { label: "Copy" },
      { label: "Paste" },
    ],
    label: "Edit",
  },
  {
    children: [{ label: "Documentation" }, { label: "About" }],
    label: "Help",
  },
];

const customIconsTree = {
  children: [
    {
      children: [
        { icon: "⚛️ ", label: "React App" },
        { icon: "🟢", label: "Vue App" },
        { icon: "🔴", label: "Angular App" },
      ],
      icon: "🌐",
      label: "Frontend",
    },
    {
      children: [
        { icon: "📡", label: "Node API" },
        { icon: "💾", label: "Database" },
      ],
      icon: "🖥️ ",
      label: "Backend",
    },
    { icon: "📚", label: "Documentation" },
  ],
  icon: "🚀",
  label: "Projects",
};

// Reusable tree style
const customTree = makeTree({
  color: "red",
  showIcons: false,
});

console.log("\nFile System Tree:\n");
console.log(customTree(fileSystemTree));

console.log("\nMenu Tree:\n");
console.log(tree(menuTree));

console.log("\nCustom Icons Tree:\n");
console.log(tree(customIconsTree));

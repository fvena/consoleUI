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
  log,
  magenta,
  magentaBright,
  makeBox,
  makeStyle,
  red,
  redBright,
  strikethrough,
  underline,
  white,
  whiteBright,
  yellow,
  yellowBright,
} from "@franvena/consoleui/browser";

/**
 * ConsoleUI Browser Examples
 * This file demonstrates the various features and capabilities of the ConsoleUI browser styling library.
 * Open your browser's console to see the styled output.
 */

// Helper function to create section headers
const printSection = (title) => {
  log("\n" + "=".repeat(80));
  log(green(title));
  log("=".repeat(80) + "\n");
};

// 1. Basic Colors
printSection("Basic Colors");
log("Basic colors are perfect for simple text highlighting:");
log(`- ${black("black")} - Default black text`);
log(`- ${red("red")} - For errors and warnings`);
log(`- ${green("green")} - For success messages`);
log(`- ${yellow("yellow")} - For warnings and highlights`);
log(`- ${blue("blue")} - For information`);
log(`- ${magenta("magenta")} - For special content`);
log(`- ${cyan("cyan")} - For system messages`);
log(`- ${white("white")} - For regular content`);
log(`- ${gray("gray")} - For subtle text`);

// 2. Bright Colors
printSection("Bright Colors");
log("Bright variants provide more vibrant options:");
log(`- ${blackBright("blackBright")} - Brighter black (gray)`);
log(`- ${redBright("redBright")} - Vibrant red`);
log(`- ${greenBright("greenBright")} - Vibrant green`);
log(`- ${yellowBright("yellowBright")} - Vibrant yellow`);
log(`- ${blueBright("blueBright")} - Vibrant blue`);
log(`- ${magentaBright("magentaBright")} - Vibrant magenta`);
log(`- ${cyanBright("cyanBright")} - Vibrant cyan`);
log(`- ${whiteBright("whiteBright")} - Vibrant white`);

// 3. Background Colors
printSection("Background Colors");
log("Background colors are perfect for highlighting text:");
log(`- ${white(bgBlack("bgBlack"))} - Default black background`);
log(`- ${black(bgRed("bgRed"))} - For errors and warnings`);
log(`- ${black(bgGreen("bgGreen"))} - For success messages`);
log(`- ${black(bgYellow("bgYellow"))} - For warnings and highlights`);
log(`- ${black(bgBlue("bgBlue"))} - For information`);
log(`- ${black(bgMagenta("bgMagenta"))} - For special content`);
log(`- ${black(bgCyan("bgCyan"))} - For system messages`);
log(`- ${black(bgWhite("bgWhite"))} - For regular content`);
log(`- ${black(bgGray("bgGray"))} - For subtle text`);
log();
log("Bright variants provide more vibrant options:");
log(`- ${white(bgBlackBright("bgBlackBright"))} - Brighter black (gray)`);
log(`- ${black(bgRedBright("bgRedBright"))} - Vibrant red`);
log(`- ${black(bgGreenBright("bgGreenBright"))} - Vibrant green`);
log(`- ${black(bgYellowBright("bgYellowBright"))} - Vibrant yellow`);
log(`- ${black(bgBlueBright("bgBlueBright"))} - Vibrant blue`);
log(`- ${black(bgMagentaBright("bgMagentaBright"))} - Vibrant magenta`);
log(`- ${black(bgCyanBright("bgCyanBright"))} - Vibrant cyan`);
log(`- ${black(bgWhiteBright("bgWhiteBright"))} - Vibrant white`);

// 4. Text Formatting
printSection("Text Formatting");
log("Text formatting options for enhanced typography:");
log(`- ${bold("bold")} - For strong emphasis`);
log(`- ${italic("italic")} - For italicized text`);
log(`- ${underline("underline")} - For underlining text`);
log(`- ${strikethrough("strikethrough")} - For crossed-out text`);
log(`- ${dim("dim")} - For less prominent text`);
log(`- ${hidden("hidden")} - For hidden text (hover to see)`);

log("\nCombining text formats with colors:");
log(`- ${bold(blue("Bold blue text"))}`);
log(`- ${italic(green("Italic green text"))}`);
log(`- ${underline(red("Underlined red text"))}`);

log("\nCombining text formats with background colors:");
log(`- ${bold(bgYellow("Bold text on yellow"))}`);
log(`- ${italic(bgBlue("Italic text on blue"))}`);

log("\nComplex combinations:");
log(`- ${bold(italic(magenta("Bold italic magenta")))}`);
log(`- ${bold(underline(bgGreen(white("Bold underline on green"))))}`);
log(`- ${italic(strikethrough(red("Italic strikethrough red")))}`);

// 5. Hex Colors
printSection("Hex Colors");
log("Hex colors are perfect for customizing text and background colors:");
const hexColor = hex("#FF4500");
const hexColorBg = hex("#FFB84D", true);
log(`- ${hexColor("Red")}`);
log(`- ${hexColorBg("Green background")}`);
log(`- ${hexColor(hexColorBg("Red on green background"))}`);

// 6. Nested Styles
printSection("Nested Styles");
log("You can nest different colors for complex styling:");
log(`Simple nesting: ${red("Red")} with ${blue("blue")} and ${green("green")}`);
log(`Deep nesting: ${red(`Red ${blue(`with blue ${green("and green")} inside`)} text`)}`);
log(`Alternative nesting: ${red(blue(green("Red → Blue → Green")))}`);

// 7. Custom Styles
printSection("Custom Styles");
log("Create your own reusable styles with makeStyle:");

const errorStyle = makeStyle({ backgroundColor: "bgRed", bold: true, color: "black" });
const warningStyle = makeStyle({ backgroundColor: "bgYellow", bold: true, color: "black" });
const successStyle = makeStyle({ backgroundColor: "bgGreen", bold: true, color: "black" });
const infoStyle = makeStyle({ backgroundColor: "bgBlue", bold: true, color: "black" });

log(`${errorStyle("Error:")} Something went wrong`);
log(`${warningStyle("Warning:")} Please check your input`);
log(`${successStyle("Success:")} Operation completed`);
log(`${infoStyle("Info:")} System is running`);

// 8. Disabled Styles
printSection("Disabled Styles");
log("You can create styles with disabled colors:");
const disabledStyle = makeStyle({ color: "red", enabled: false });
log(`Normal: ${red("This is red")}`);
log(`Disabled: ${disabledStyle("This would be red if enabled")}`);

// 9. Practical Examples
printSection("Practical Examples");
log("Real-world usage examples:");

// Branding
log(bgBlueBright(black("ConsoleUI")));
log(black(bgRedBright("Hello") + bgBlueBright("World")));

// Log levels
log(`${gray("[2024-03-19 10:30:00]")} ${errorStyle("ERROR")} Failed to connect to database`);
log(`${gray("[2024-03-19 10:30:01]")} ${warningStyle("WARN")} High memory usage detected`);
log(`${gray("[2024-03-19 10:30:02]")} ${infoStyle("INFO")} Server started on port 3000`);
log(`${gray("[2024-03-19 10:30:03]")} ${successStyle("SUCCESS")} Backup completed`);

// Progress indication
log("\nTask Progress:");
log(`[${green("■".repeat(5))}${gray("□".repeat(5))}] 50% Complete`);

// Status indicators
log("\nService Status:");
log(`Database: ${green("●")} Connected`);
log(`Cache: ${yellow("●")} Syncing`);
log(`API: ${red("●")} Offline`);

// JSON highlighting
log("\nJSON Output:");
log(`${gray("{")}
  ${cyan('"status"')}: ${green('"success"')},
  ${cyan('"data"')}: ${gray("{")}
    ${cyan('"id"')}: ${yellow("123")},
    ${cyan('"name"')}: ${green('"Test"')}
  ${gray("}")}
${gray("}")}`);

// 9. Browser-specific Examples
printSection("Browser-specific Examples");

// Console group example
log("\nConsole Groups:");
console.group("User Authentication");
log(`${infoStyle("→")} Checking credentials...`);
log(`${successStyle("✓")} User authenticated`);
log(`${infoStyle("→")} Loading profile...`);
log(`${successStyle("✓")} Profile loaded`);
console.groupEnd();

// Performance logging
log("\nPerformance Metrics:");
log(`${gray("[")}${blue("PERF")}${gray("]")} Page load: ${green("1.2s")}`);
log(`${gray("[")}${blue("PERF")}${gray("]")} API response: ${green("300ms")}`);
log(`${gray("[")}${blue("PERF")}${gray("]")} Render time: ${blue("800ms")}`);

// Network status
log("\nNetwork Status:");
log(`${gray("[")}${green("200")}${gray("]")} ${gray("GET")} /api/users`);
log(`${gray("[")}${yellow("304")}${gray("]")} ${gray("GET")} /api/cache`);
log(`${gray("[")}${red("404")}${gray("]")} ${gray("GET")} /api/missing`);
log(`${gray("[")}${red("500")}${gray("]")} ${gray("POST")} /api/error`);

// 10. Box Component
printSection("Box Component");
log("Box component with default options:");
log(box("Default box"));
log(box("Box with border color", "green"));
log(box(`${bold("Box with multiple lines")}\nSecond line\nThird line`));

log("\nCreate your own reusable styles with makeBox:");
const customBox = makeBox({
  align: "center",
  borderColor: "blue",
  horizontalPadding: 4,
  verticalPadding: 2,
});
log(customBox(`${bold(blueBright("Custom box"))}`));

log("\nBox component with nested styles:");
log(box(`${black(bold(bgRed("Bold content")))} inside a box`, "red"));

log("\nBox component with multiple lines:");
log(box(`Box with multiple lines\nSecond line\nThird line`));

// Box Component Examples
log("=== Box Component Examples ===\n");

// Default box
log("Default box:");
log(box("Hello World"));

// Custom border color
log("\nBox with custom border color:");
log(box("Important Message", "red"));

// Box with custom width
log("\nBox with custom width (40 characters):");
log(
  makeBox({ width: 40 })(
    "This is a long message that will be automatically wrapped to fit within 40 characters",
  ),
);

// Box with very narrow width
log("\nBox with narrow width (20 characters):");
log(
  makeBox({ borderColor: "blue", width: 20 })(
    "This text demonstrates how content is wrapped in a narrow box",
  ),
);

// Box with multiple paragraphs
log("\nBox with multiple paragraphs and custom width:");
log(
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

log("\nReusable warning box:");
log(
  warningBox(
    "Warning: This is a long warning message that will be automatically wrapped to maintain a clean and consistent layout in your console output.",
  ),
);

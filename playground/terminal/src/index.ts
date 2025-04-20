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
  cyan,
  cyanBright,
  gray,
  green,
  greenBright,
  magenta,
  magentaBright,
  makeStyle,
  red,
  redBright,
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

// 4. Nested Styles
printSection("Nested Styles");
console.log("You can nest different colors for complex styling:");
console.log(`Simple nesting: ${red("Red")} with ${blue("blue")} and ${green("green")}`);
console.log(`Deep nesting: ${red(`Red ${blue(`with blue ${green("and green")} inside`)} text`)}`);
console.log(`Alternative nesting: ${red(blue(green("Red → Blue → Green")))}`);

// 5. Custom Styles
printSection("Custom Styles");
console.log("Create your own reusable styles with makeStyle:");

const errorStyle = makeStyle({ backgroundColor: "bgRed", color: "black" });
const warningStyle = makeStyle({ backgroundColor: "bgYellow", color: "black" });
const successStyle = makeStyle({ backgroundColor: "bgGreen", color: "black" });
const infoStyle = makeStyle({ backgroundColor: "bgBlue", color: "black" });

console.log(`${errorStyle("Error:")} Something went wrong`);
console.log(`${warningStyle("Warning:")} Please check your input`);
console.log(`${successStyle("Success:")} Operation completed`);
console.log(`${infoStyle("Info:")} System is running`);

// 6. Disabled Styles
printSection("Disabled Styles");
console.log("You can create styles with disabled colors:");
const disabledStyle = makeStyle({ color: "red", enabled: false });
console.log(`Normal: ${red("This is red")}`);
console.log(`Disabled: ${disabledStyle("This would be red if enabled")}`);

// 7. Practical Examples
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

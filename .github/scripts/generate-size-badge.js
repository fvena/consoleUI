import fs from "node:fs";

const data = JSON.parse(fs.readFileSync("size-limit-output.json", "utf8"));

const makeBadge = ({ name, size }) => ({
  color: "blue",
  label: name === "terminal" ? "terminal size" : "browser size",
  message: (size / 1024).toFixed(2) + " kB",
  schemaVersion: 1,
});

fs.mkdirSync("./public/badges", { recursive: true });

for (const entry of data) {
  const name = entry.name || "unknown";
  const badge = makeBadge({ name, size: entry.size });
  fs.writeFileSync(`./public/badges/${name}-badge.json`, JSON.stringify(badge, undefined, 2));
}

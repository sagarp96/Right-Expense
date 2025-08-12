import fs from "fs";

// Read the current file
const filePath =
  "/Users/sagarpanwar/repos/Projects/Finance-App/src/lib/Data/Categories_Data.tsx";
let content = fs.readFileSync(filePath, "utf8");

// Fix the malformed chartColor entries
content = content.replace(/color:\s*"[^"]*",\s*\n\s*chartColor:/g, (match) => {
  const lines = match.split("\n");
  const colorLine = lines[0];
  const chartColorPart = lines[1].trim();
  return colorLine + "\n    " + chartColorPart;
});

// Write the corrected content
fs.writeFileSync(filePath, content);
console.log("Fixed chartColor indentation!");

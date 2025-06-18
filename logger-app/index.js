const path = require("path");
const fs = require("fs");

const input = process.argv.slice(2);
const text = input.join(" ");
const date = new Date().toISOString();
const message = `${text} ${date} \n`;

if (!text) {
  console.log("No text");
  process.exit();
}

const filePath = path.join(__dirname, "log.txt");

fs.appendFile(filePath, message, { encoding: "utf-8" }, () => {
  console.log("Text has been append successfully");
});

const fs = require("fs");

const writeData = fs.writeFileSync("./module2/hello.txt", "hello sweet");

const data = fs.readFileSync("./module2/hello.txt", { encoding: "utf-8" });

console.log(data);

const fs = require("fs");

const writeDataSync = fs.writeFileSync("./module2/hello.txt", "hello sweet");

const readDataSync = fs.readFileSync("./module2/hello.txt", {
  encoding: "utf-8",
});

const writeData = fs.writeFile(
  "./module2/hello.txt",
  "hello world",
  { encoding: "utf-8" },
  (error) => {
    if (error) {
      console.log("There was an error of writefile");
    }
  }
);

const readData = fs.readFile(
  "./module2/hello.txt",
  { encoding: "utf-8" },
  (error, data) => {
    if (error) {
      console.log("There was an error");
      return;
    }
    console.log(data);
  }
);

console.log("3");

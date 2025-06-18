const fs = require("fs");

// const writeDataSync = fs.writeFileSync("./module2/hello.txt", "hello sweet");

// const readDataSync = fs.readFileSync("./module2/hello.txt", {
//   encoding: "utf-8",
// });

// const writeData = fs.writeFile(
//   "./module2/hello.txt",
//   "hello world",
//   { encoding: "utf-8" },
//   (error) => {
//     if (error) {
//       console.log("There was an error of writefile");
//     }
//   }
// );

// const readData = fs.readFile(
//   "./module2/hello.txt",
//   { encoding: "utf-8" },
//   (error, data) => {
//     if (error) {
//       console.log("There was an error");
//       return;
//     }
//     console.log(data);
//   }
// );

// console.log("3");

const readStream = fs.createReadStream("./module2/helloread.txt", {
  encoding: "utf-8",
});
const writeStream = fs.createWriteStream("./module2/hellowrite.txt", {
  encoding: "utf-8",
});

writeStream.on("error", (error) => {
  if (error) {
    throw Error("Error", error);
  }
});
writeStream.on("finish", () => {
  console.log("Written successfuly");
});

readStream.on("data", (data) => {
  writeStream.write(data, (error) => {
    console.log(`There was an error ${error}`);
  });
  console.log("Received a chunk of data:", data);
});
readStream.on("error", (error) => {
  if (error) {
    throw Error("Error", error);
  }
});
readStream.on("end", () => {
  console.log("Finished reading the file.");
  writeStream.end();
});

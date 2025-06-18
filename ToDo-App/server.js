const http = require("http");

const server = http.createServer((req, res) => {
  res.end("Welcome to ToDo-App server");
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listening to port 5000");
});

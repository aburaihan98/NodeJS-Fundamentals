const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/todos" && req.method === "GET") {
    res.writeHead(200, {
      "content-type": "text/plain",
      //   email: "r@gmail.com",
    });
    // res.statusCode = 201;
    // res.setHeader("content-type", "text/plain");
    // res.setHeader("email", "r@gmail.com");
    res.end("Welcome to ToDo-App server");
  } else if (req.url === "/todos/create-todo" && req.method === "POST") {
    res.end("Todo created");
  } else {
    res.end("Route not pound");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listening to port 5000");
});

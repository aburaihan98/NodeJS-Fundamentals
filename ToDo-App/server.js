const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  // Get all todos
  if (req.url === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, {
      "content-type": "application/json",
      //   email: "r@gmail.com",
    });
    // res.statusCode = 201;
    // res.setHeader("content-type", "text/plain");
    // res.setHeader("email", "r@gmail.com");
    res.end(data);
    // post a todo
  } else if (req.url === "/todos/create-todo" && req.method === "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });
    req.on("end", () => {
      const { title, body } = JSON.parse(data);
      const date = new Date().toLocaleString();

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parseAllTodos = JSON.parse(allTodos);

      parseAllTodos.push({ title, body, date });

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.end(JSON.stringify({ title, body, date }, null, 2));
    });
  } else {
    res.end("Route not pound");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listening to port 5000");
});

const http = require("http");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./db/todo.json");

const server = http.createServer((req, res) => {
  const { pathname, searchParams } = new URL(
    req.url,
    `http://${req.headers.host}`
  );

  // Get all todos
  if (pathname === "/todos" && req.method === "GET") {
    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    res.writeHead(200, {
      "content-type": "application/json",
      //   email: "r@gmail.com",
    });
    // res.statusCode = 201;
    // res.setHeader("content-type", "text/plain");
    // res.setHeader("email", "r@gmail.com");
    res.end(data);
    // single todo
  } else if (pathname === "/todo" && req.method === "GET") {
    const title = searchParams.get("title");

    const data = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parseData = JSON.parse(data);

    const singleTodo = parseData.find((todo) => todo.title === title);

    res.writeHead(200, {
      "content-type": "application/json",
    });

    res.end(JSON.stringify(singleTodo));
    // post a todo
  } else if (pathname === "/todos/create-todo" && req.method === "POST") {
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
  } else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
    const title = searchParams.get("title");
    let data = "";
    req.on("data", (chunk) => {
      data = data + chunk;
    });
    req.on("end", () => {
      const { body } = JSON.parse(data);

      const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
      const parseAllTodos = JSON.parse(allTodos);

      const todoIndex = parseAllTodos.findIndex((todo) => todo.title === title);

      parseAllTodos[todoIndex].body = body;

      fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
        encoding: "utf-8",
      });

      res.end(
        JSON.stringify(
          {
            title,
            body,
            createdAt: parseAllTodos[todoIndex].createdAt,
          },
          null,
          2
        )
      );
    });
  } else if (pathname === "/todos/delete-todo" && req.method === "DELETE") {
    const title = searchParams.get("title");

    const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
    const parseAllTodos = JSON.parse(allTodos);

    const todoIndex = parseAllTodos.findIndex((todo) => todo.title === title);

    parseAllTodos.splice(todoIndex, 1);

    fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), {
      encoding: "utf-8",
    });

    res.end(
      JSON.stringify({
        message: "Todo has been deleted",
      })
    );
  } else {
    res.end("Route not pound");
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("Server listening to port 5000");
});

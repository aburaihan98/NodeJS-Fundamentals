import express, { Application, Request, Response } from "express";
const app: Application = express();
import fs from "fs";
import path from "path";

app.use(express.json());

const filePath = path.join(__dirname, "../db/todo.json");

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to todo app");
});
app.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});
app.post("/todos/create-todo", (req: Request, res: Response) => {
  const { title, body } = req.body;
  console.log(title, body);
  console.log("allah");
});

export default app;

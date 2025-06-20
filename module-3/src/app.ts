import express, { Application, Request, Response } from "express";
const app: Application = express();
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../db/todo.json");

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to todo app");
});
app.get("/todos", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  res.json(data);
});
app.get("/todos/create-todo", (req: Request, res: Response) => {
  const data = req.body;
  res.json(data);
});

export default app;

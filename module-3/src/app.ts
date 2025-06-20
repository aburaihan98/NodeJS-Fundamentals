import express, { Application, NextFunction, Request, Response } from "express";
import { todosRouter } from "./app/todos/todos.routes";
const app: Application = express();

app.use(express.json());
app.use("/todos", todosRouter);

app.get(
  "/",
  (req: Request, res: Response, next: NextFunction) => {
    console.log("Allah");
    next();
  },
  (req: Request, res: Response) => {
    res.send("Welcome to todo app");
  }
);
// app.get("/todos", );

export default app;

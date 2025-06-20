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

app.get("/error", (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(Allah);
  } catch (error) {
    next(error);
  }
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    message: "Route not found",
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).send({
      message: "Global error handler",
    });
  }
});

export default app;

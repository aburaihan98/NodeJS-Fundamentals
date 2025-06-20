import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { client } from "../../config/mongoDB";

const filePath = path.join(__dirname, "../../../db/todo.json");

export const todosRouter = express.Router();

todosRouter.get("/", async (req: Request, res: Response) => {
  const db = client.db("todosDB");
  const collection = db.collection("todos");

  const todos = await collection.find().toArray();

  res.send(todos);
});
todosRouter.post("/create-todo", async (req: Request, res: Response) => {
  const { title, description, priority } = req.body;

  const db = client.db("todosDB");
  const collection = db.collection("todos");

  await collection.insertOne({
    title: title,
    description: description,
    priority: priority,
    isCompleted: false,
  });

  const todos = await collection.find().toArray();

  res.send(todos);
});

import express, { Request, Response } from "express";
import path from "path";
import { client } from "../../config/mongoDB";
import { ObjectId } from "mongodb";

const filePath = path.join(__dirname, "../../../db/todo.json");

export const todosRouter = express.Router();

todosRouter.get("/", async (req: Request, res: Response) => {
  const db = client.db("todosDB");
  const collection = db.collection("todos");

  const todos = await collection.find().toArray();

  res.send(todos);
});
todosRouter.get("/:id", async (req: Request, res: Response) => {
  const db = client.db("todosDB");
  const collection = db.collection("todos");

  const id = req.params.id;

  const query = {
    _id: new ObjectId(id),
  };

  const todo = await collection.findOne(query);

  res.send(todo);
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
todosRouter.put("/update-todo/:id", async (req: Request, res: Response) => {
  const db = client.db("todosDB");
  const collection = db.collection("todos");

  const id = req.params.id;
  const updateData = req.body;

  const query = {
    _id: new ObjectId(id),
  };

  const updateDoc = { $set: updateData };

  const result = await collection.updateOne(query, updateDoc, { upsert: true });

  res.json(result);
});
todosRouter.delete("/delete-todo/:id", async (req: Request, res: Response) => {
  const db = client.db("todosDB");
  const collection = db.collection("todos");

  const id = req.params.id;

  const result = await collection.deleteOne({
    _id: new ObjectId(id),
  });

  res.json(result);
});

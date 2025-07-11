"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoDB_1 = require("../../config/mongoDB");
const mongodb_1 = require("mongodb");
const filePath = path_1.default.join(__dirname, "../../../db/todo.json");
exports.todosRouter = express_1.default.Router();
exports.todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = mongoDB_1.client.db("todosDB");
    const collection = db.collection("todos");
    const todos = yield collection.find().toArray();
    res.send(todos);
}));
exports.todosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = mongoDB_1.client.db("todosDB");
    const collection = db.collection("todos");
    const id = req.params.id;
    const query = {
        _id: new mongodb_1.ObjectId(id),
    };
    const todo = yield collection.findOne(query);
    res.send(todo);
}));
exports.todosRouter.post("/create-todo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority } = req.body;
    const db = mongoDB_1.client.db("todosDB");
    const collection = db.collection("todos");
    yield collection.insertOne({
        title: title,
        description: description,
        priority: priority,
        isCompleted: false,
    });
    const todos = yield collection.find().toArray();
    res.send(todos);
}));
exports.todosRouter.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = mongoDB_1.client.db("todosDB");
    const collection = db.collection("todos");
    const id = req.params.id;
    const updateData = req.body;
    const query = {
        _id: new mongodb_1.ObjectId(id),
    };
    const updateDoc = { $set: updateData };
    const result = yield collection.updateOne(query, updateDoc, { upsert: true });
    res.json(result);
}));
exports.todosRouter.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = mongoDB_1.client.db("todosDB");
    const collection = db.collection("todos");
    const id = req.params.id;
    const result = yield collection.deleteOne({
        _id: new mongodb_1.ObjectId(id),
    });
    res.json(result);
}));

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const filePath = path_1.default.join(__dirname, "../db/todo.json");
const todosRouter = express_1.default.Router();
app.use(express_1.default.json());
app.use("/", todosRouter);
app.use("/", todosRouter);
app.get("/", (req, res) => {
    res.send("Welcome to todo app");
});
app.get("/todos", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
app.post("/todos/create-todo", (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    console.log("allah");
});
exports.default = app;

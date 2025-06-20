"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const filePath = path_1.default.join(__dirname, "../db/todo.json");
var todosRouter = express_1.default.Router;
();
todosRouter.get("/", (req, res) => {
    const data = fs_1.default.readFileSync(filePath, { encoding: "utf-8" });
    res.json(data);
});
todosRouter.post("/create-todo", (req, res) => {
    const { title, body } = req.body;
    console.log(title, body);
    console.log("allah");
});

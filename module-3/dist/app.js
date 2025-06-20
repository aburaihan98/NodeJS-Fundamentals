"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_routes_1 = require("./app/todos/todos.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/todos", todos_routes_1.todosRouter);
app.get("/", (req, res, next) => {
    console.log("Allah");
    next();
}, (req, res) => {
    res.send("Welcome to todo app");
});
app.get("/error", (req, res, next) => {
    try {
        console.log(Allah);
    }
    catch (error) {
        next(error);
    }
});
app.use((req, res, next) => {
    res.status(404).send({
        message: "Route not found",
    });
});
app.use((error, req, res, next) => {
    if (error) {
        res.status(500).send({
            message: "Global error handler",
        });
    }
});
exports.default = app;

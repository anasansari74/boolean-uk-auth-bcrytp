"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express_1.default();
// Routers
const router_1 = __importDefault(require("./resources/user/router"));
const router_2 = __importDefault(require("./resources/auth/router"));
// Middle wares
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(cookieParser());
//App routes
app.use(router_2.default);
app.use("/user", router_1.default);
app.all("*", (req, res) => {
    res.status(404).json("No route match");
});
module.exports = app;

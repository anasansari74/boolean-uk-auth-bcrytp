"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require("express");
const express_1 = __importDefault(require("express"));
// import cors from "cors";
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express_1.default();
// Routers
const router_1 = __importDefault(require("./resources/auth/router"));
const router_2 = __importDefault(require("./resources/user/router"));
const router_3 = __importDefault(require("./resources/post/router"));
const authGenerator_1 = require("./utils/authGenerator");
// Middle wares
app.use(logger("dev"));
app.use(express_1.default.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost3000", credentials: true }));
//App routes
app.use((req, res, next) => {
    const token = req.cookies.token;
    const userData = authGenerator_1.verifyToken(token);
    console.log(userData);
    next();
});
app.use(router_1.default);
app.use("/user", router_2.default);
app.use("/post", router_3.default);
app.all("*", (req, res) => {
    res.status(404).json("No route match");
});
module.exports = app;

// const express = require("express");
import express from "express";

// import cors from "cors";
const cors = require("cors");

const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// Routers

import authRouter from "./resources/auth/router";
import userRouter from "./resources/user/router";
import postRouter from "./resources/post/router";
import { verifyToken } from "./utils/authGenerator";

// Middle wares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost3000", credentials: true }));

//App routes

app.use((req, res, next) => {
  const token = req.cookies.token;

  const userData = verifyToken(token);
  console.log(userData);

  next();
});

app.use(authRouter);

app.use("/user", userRouter);
app.use("/post", postRouter);

app.all("*", (req, res) => {
  res.status(404).json("No route match");
});

module.exports = app;

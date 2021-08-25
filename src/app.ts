// const express = require("express");
import express from "express";

const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// Routers

import authRouter from "./resources/auth/router";
import userRouter from "./resources/user/router";

// Middle wares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

//App routes

app.use(authRouter);

app.use("/user", userRouter);

app.all("*", (req, res) => {
  res.status(404).json("No route match");
});

module.exports = app;

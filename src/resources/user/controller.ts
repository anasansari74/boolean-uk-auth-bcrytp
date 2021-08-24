// I'm importing the patched version of prisma model from service
import userClient from "./service";
// import dbClient from "../../utils/database";

import { Request, Response } from "express";

export const allUsers = async (req: Request, res: Response) => {
  try {
    const result = await userClient.findMany();

    if (result) res.json({ data: result });
    if (!result) res.json({ msg: "Users not found" });
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

export const createUser = async (req: Request, res: Response) => {
  const newUser = req.body;

  try {
    // This is my modified create version, with password hashing
    const result = await userClient.createWithHash(newUser);

    if (result) res.json({ data: result });
    if (!result) res.json({ msg: "User not found" });
  } catch (e) {
    console.log(e);
    res.json(e.message);
  }
};

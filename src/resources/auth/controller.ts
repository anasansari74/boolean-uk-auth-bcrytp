import { Request, Response } from "express";

import { User } from "@prisma/client";

import { findUserWithValidation } from "./service";

import { createToken } from "../../utils/authGenerator";

export const loginUser = async (req: Request, res: Response) => {
  // Get user credentials
  const userCreds: User = req.body;

  try {
    // Check if credentials are valid
    const loggedUser = findUserWithValidation(userCreds);

    // handle result
    const token = createToken({
      id: (await loggedUser).id,
      username: (await loggedUser).username,
    });
    console.log("token", token);

    res.cookie("token:", token, { httpOnly: true });
    res.json({
      user: {
        username: (await loggedUser).username,
      },
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

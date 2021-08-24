import dbClient from "../../utils/database";

import { User } from "@prisma/client";

import { hash } from "bcrypt";

const createWithHash = async (newUser: User) => {
  // Grab user plain text password
  const plainText = newUser.password;

  // Hash it using bcrypt, it will return a promise
  const hashedPlainText = await hash(plainText, 10);

  // Make sure to save the hashed password
  const savedUser = await dbClient.user.create({
    data: { ...newUser, password: hashedPlainText },
  });

  return savedUser;
};

const userClient = {
  ...dbClient.user,
  createWithHash,
};

export default userClient;

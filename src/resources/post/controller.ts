import dbClient from "../../utils/database";

import { Request, Response } from "express";

export async function getAllPosts(req: Request, res: Response) {
  const posts = await dbClient.post.findMany({
    include: { user: { select: { username: true } } },
  });
}

import { Router } from "express";
import { allUsers, createUser } from "./controller";

const router = Router();

router.get("/", allUsers);

router.post("/", createUser);

export default router;

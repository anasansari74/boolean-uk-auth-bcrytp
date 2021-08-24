import { Router } from "express";
import { loginUser } from "./controller";

const router = Router();

// Login

router.route("/login").post(loginUser);

export default router;

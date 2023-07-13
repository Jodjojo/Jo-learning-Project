import express from "express";
import { signup } from "../controllers/userController.js";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("login", login);

export default router;

import express from "express";
import { signup } from "../controllers/userController.js";
import { login } from "../controllers/loginController.js";
const router = express.Router();

router.post("/signup", signup);

// login route
router.get("/login", login);

export default router;

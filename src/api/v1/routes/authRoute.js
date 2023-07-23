import { Router } from "express";
import { validateSignup } from "../middlewares";
import { userSignup } from "../controllers/authController.js";
const authRoutes = Router();

authRoutes.post("/signup", validateSignup, userSignup);

export default authRoutes;

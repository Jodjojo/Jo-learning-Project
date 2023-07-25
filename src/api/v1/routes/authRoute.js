import express from "express";
import {
	validateSignup,
	checkEmailUnique,
	validateLogin,
} from "../middlewares/validation/userSignup.js";
import { userSignup, login } from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", checkEmailUnique, validateSignup, userSignup);

router.post("/login", validateLogin, login);
export default router;

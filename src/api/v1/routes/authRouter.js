import express from "express";
import {
	validateSignup,
	checkEmailUnique,
} from "../middlewares/validation/userSignup.js";
import { userSignup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validateSignup, checkEmailUnique, userSignup);

export default router;

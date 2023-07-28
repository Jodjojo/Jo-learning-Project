/**
 * Validate the request body for user signup
 */
import Joi from "joi";
import { getUserbyField } from "../../../../models/UserModel.js";
import { errorHandler } from "./errorHandler.js";
export const checkEmailUnique = async (req, res, next) => {
	const existingUser = await getUserbyField("email", req.body.email);
	if (existingUser) {
		return res.status(409).json({ error: "The email is already taken" });
	}
	next(errorHandler);
};

export const validateSignup = async (req, res, next) => {
	const schema = Joi.object({
		firstname: Joi.string().required().max(40),
		lastname: Joi.string().required().max(40),
		email: Joi.string().email().required().max(50),
		password: Joi.string().required().max(50),
	});

	const { error } = schema.validate(req.body);

	const { password } = req.body;
	if (error) {
		next(errorHandler);
	}
};

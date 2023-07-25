/**
 * Validate the request body for user signup
 */

// api/v1/validators/signupValidator.js
// You'll need to implement the email uniqueness validation here
import { pool } from "../../../../config/database.js";
import Joi from "joi";
import winstonLogger from "../../../../utils/logger.js";
export const checkEmailUnique = async (req, res, next) => {
	const { email } = req.body;

	try {
		const result = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (result.rows.length > 0) {
			return res.status(409).json({ error: "The email is already taken" });
		}

		next();
	} catch (error) {
		winstonLogger.info("Error checking unique email:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

export const validateSignup = async (req, res, next) => {
	// Validate required fields
	const schema = Joi.object({
		firstname: Joi.string().required().max(40),
		lastname: Joi.string().required().max(40),
		email: Joi.string().email().required().max(50),
		password: Joi.string().required().max(50),
	});

	const { error } = schema.validate(req.body);

	if (error) {
		return res.status(422).json({
			error: `Please enter the ${error.details[0].context.key} of maximum 40}`,
		});
	}

	next();
};

/**
 * Handle user signup request
 * @param {*} req - request
 * @param {*} res - response
 */

import { createUser } from "../../../models/UserModel.js";
import logger from "../../../utils/logger.js";
import { generateToken } from "../jsonwebtoken.js";
import { errorHandler } from "../middlewares/validation/errorHandler.js";

export const userSignup = async (req, res, next) => {
	const { firstname, lastname, email } = req.body;
	const hashedPassword = req.hashedPassword;

	try {
		const user = await createUser(firstname, lastname, email, hashedPassword);
		const token = generateToken(user.id);

		return res.status(200).json({
			user: user,
			token,
		});
	} catch (error) {
		next(errorHandler);
	}
};

/**
 * Handle user signup request
 * @param {*} req - request
 * @param {*} res - response
 */

import { createUser } from "../../../models/UserModel.js";
import { generateToken } from "../jsonwebtoken.js";

export const userSignup = async (req, res) => {
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
		console.error("Error during user signup:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

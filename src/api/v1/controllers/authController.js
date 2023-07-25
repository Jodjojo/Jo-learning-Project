/**
 * Handle user signup request
 * @param {*} req - request
 * @param {*} res - response
 */

import { generateToken } from "../jsonwebtoken.js";
import { createUser, loginUser } from "../../../models/UserModel.js";

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

export const login = async (req, res) => {
	const { email, password } = req.body;

	console.log(email, password);
	try {
		const user = await loginUser(email, password);
		console.log(user);

		if (!user) {
			return res.status(401).json({ error: "user not found" });
		}

		return res.status(200).json(user);
	} catch (error) {
		console.error("Error during login:", error.message);
		return res.status(500).json({ error: "Internal server error" });
	}
};

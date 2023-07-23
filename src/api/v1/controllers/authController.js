/**
 * Handle user signup request
 * @param {*} req - request
 * @param {*} res - response
 */

import { validateSignup } from "../middlewares/validation/userSignup.js";

export const userSignup = async (req, res) => {
	validateSignup();

	try {
		// Create the user in the database
		const user = await createUser(firstname, lastname, email, password);

		return res.status(200).json({
			firstName: user.firstname,
			lastName: user.lastname,
			email: user.email,
		});
	} catch (error) {
		console.error("Error during user signup:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

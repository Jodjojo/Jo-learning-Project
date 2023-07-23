/**
 * Handle user signup request
 * @param {*} req - request
 * @param {*} res - response
 */

import { checkEmailUnique } from "../middlewares/validation/userSignup.js";
import { createUser } from "../../../models/UserModel.js";

export const userSignup = async (req, res) => {
	const { firstname, lastname, email, password } = req.body;

	try {
		const isEmailUnique = await checkEmailUnique(email);
		if (!isEmailUnique) {
			return res.status(409).json({ error: "The email is already taken" });
		}
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

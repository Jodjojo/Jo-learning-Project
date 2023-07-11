import { createUser } from "../models/userModel.js";
import pool from "../db.js";

const signup = async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	// Check for required fields
	if (!firstName) {
		return res.status(422).json({ error: "Please enter the firstName" });
	}
	if (!lastName) {
		return res.status(422).json({ error: "Please enter the lastName" });
	}
	if (!email) {
		return res.status(422).json({ error: "Please enter the email" });
	}
	if (!password) {
		return res.status(422).json({ error: "Please enter the password" });
	}

	try {
		// Check for unique email
		const existingUser = await pool.query(
			"SELECT * FROM users WHERE email = $1",
			[email]
		);
		if (existingUser.rows.length > 0) {
			return res.status(409).json({ error: "The email is already taken" });
		}

		// Create a new user
		const newUser = await createUser(firstName, lastName, email, password);

		// Return success response
		res.status(200).json({ firstName, lastName, email });
	} catch (error) {
		console.error("Error during user signup:", error);
		res.status(500).json({ error: "An error occurred during user signup" });
	}
};

export { signup };

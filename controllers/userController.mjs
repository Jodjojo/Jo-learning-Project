import User from "../models/userModel.mjs";
import connection from "../dbConfig.mjs";

// Array to store registered users (for demo purposes)
const users = [];
let signup;

export default signup = (req, res) => {
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

	// Check for unique email
	connection.query(
		"SELECT * FROM users WHERE email = ?",
		[email],
		(err, results) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: "Internal server error" });
			}

			if (results.length > 0) {
				return res.status(409).json({ error: "This email is already taken!" });
			}

			// Create a new user
			const newUser = new User(firstName, lastName, email, password);
			connection.query(
				"INSERT INTO users (firstName, lastName, email, password) VALUES (?,?,?,?)",
				[newUser.firstName, newUser.lastName, newUser.email, newUser.password],
				(err, results) => {
					if (err) {
						console.error(err);
						return res.status(500).json({ error: "Internal server error" });
					}
					// Return success response
					res.status(200).json({
						firstName: newUser.firstName,
						lastName: newUser.lastName,
						email: newUser.lastName,
					});
				}
			);
		}
	);
};

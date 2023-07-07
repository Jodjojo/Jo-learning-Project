import User from "../models/userModel.mjs";

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
	const existingUser = users.find((user) => user.email === email);
	if (existingUser) {
		return res.status(409).json({ error: "The email is already taken" });
	}

	// Create a new user
	const newUser = new User(firstName, lastName, email, password);
	users.push(newUser);

	// Return success response
	res.status(200).json({ firstName, lastName, email });
};

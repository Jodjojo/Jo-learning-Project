/**
 * Validate the request body for user signup
 */

// api/v1/validators/signupValidator.js
// You'll need to implement the email uniqueness validation here

export const validateSignup = async (req, res, next) => {
	const { firstname, lastname, email, password } = req.body;

	// Check if email is unique
	// You'll need to implement the function to check email uniqueness in the userModel.js file

	// Validate required fields
	if (!firstname) {
		return res.status(422).json({ error: "Please enter the firstName" });
	}

	if (!lastname) {
		return res.status(422).json({ error: "Please enter the lastName" });
	}

	if (!email) {
		return res.status(422).json({ error: "Please enter the email" });
	}

	if (!password) {
		return res.status(422).json({ error: "Please enter the password" });
	}

	next();
};

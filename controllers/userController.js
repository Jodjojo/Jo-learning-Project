const User = require("../models/userModel");

const signUp = async (req, res, next) => {
	try {
		const newUser = await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
		});

		res.status(201).json({
			status: "success",
			data: {
				user: newUser,
			},
		});
	} catch (err) {
		res.status(422).json({
			status: "fail",
			message: err,
		});
	}
};

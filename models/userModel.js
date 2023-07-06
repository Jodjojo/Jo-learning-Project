const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please enter your Firstname"],
	},
	lastName: {
		type: String,
		required: [true, "Please enter your Lastname"],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please Provide a valid email"],
	},
	password: {
		type: String,
		required: [true, "Please enter your password"],
		message: "Password must contain more than 8 characters",
		minlength: [8, "password must have more or equal to 8 characters"],
		select: false,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;

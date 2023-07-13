import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db";

import dotenv from "dotenv";
dotenv.config();

const generateAuthToken = (user) => {
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});

	return token;
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await pool.query("SELECT * FROM users WHERE email =$1", [
			email,
		]);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		const user = result.rows[0];

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid0) {
			return res.status(401).json({ error: "Incorrect password" });
		}
		const token = generateAuthToken(user);

		return res.status(200).json({ message: "Login Successful", user });
	} catch (error) {
		console.error("Error during login", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

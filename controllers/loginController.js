import pool from "../db.js";
import { generateToken } from "../jsonwebtoken.js";

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const result = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "User not found" });
		}

		const user = result.rows[0];

		if (user.password !== password) {
			return res.status(401).json({ error: "Incorrect password" });
		}

		const token = generateToken({ userId: user.id });

		return res.status(200).json({ message: "Login successful", token });
	} catch (error) {
		console.error("Error during login:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

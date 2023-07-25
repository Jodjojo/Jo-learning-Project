// api/v1/models/userModel.js
import { pool } from "../config/database.js";
import bcrypt from "bcrypt";

export const createUser = async (firstname, lastname, email, password) => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const query =
			"INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
		const values = [firstname, lastname, email, hashedPassword];
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		throw error;
	}
};

export const loginUser = async (email, password) => {
	try {
		const query = "SELECT * FROM users WHERE email = $1";
		const result = await pool.query(query, [email]);
		const user = result.rows[0];
		// console.log(user);

		if (!user) {
			throw new Error("User not found");
		}

		bcrypt.compare(user.password, password, function (err, res) {
			if (password != user.password) {
				res.json({ success: false, message: "passwords do not match", err });
			} else {
				// Send JWT
				return {
					firstName: user.first_name,
					lastName: user.last_name,
					email: user.email,
				};
			}
		});
	} catch (error) {
		throw error;
	}
};

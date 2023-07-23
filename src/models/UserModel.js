// api/v1/models/userModel.js
import { pool } from "../config/database.js";

export const createUser = async (firstname, lastname, email, password) => {
	const query =
		"INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
	const values = [firstname, lastname, email, password];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		return res.status(409).json({ error: "The email is already taken" });
	}
};

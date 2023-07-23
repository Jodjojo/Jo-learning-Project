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

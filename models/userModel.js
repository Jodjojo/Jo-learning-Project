import pool from "../db.js";

export const createUser = async (firstName, lastName, email, password) => {
	const query =
		"INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
	const values = [firstName, lastName, email, password];

	try {
		const result = await pool.query(query, values);
		return result.rows[0];
	} catch (error) {
		throw error;
	}
};

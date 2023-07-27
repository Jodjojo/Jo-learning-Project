import { dbConnection } from "../config/database.js";
import logger from "../utils/logger.js";

export const createUser = async (firstname, lastname, email, password) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	req.hashedPassword = hashedPassword;
	const query =
		"INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
	const values = [firstname, lastname, email, hashedPassword];

	next();

	try {
		const result = await dbConnection.query(query, values);
		return result.rows[0];
	} catch (error) {
		logger.error(error);
		return error;
	}
};

export const getUserbyField = async (field, value) => {
	try {
		const result = await dbConnection.query(
			`SELECT * FROM users WHERE ${field} = $1 LIMIT 1`,
			[value]
		);

		return result.rows.length > 0 ? result.rows[0] : null;
	} catch (error) {
		logger.error(error);
	}
};

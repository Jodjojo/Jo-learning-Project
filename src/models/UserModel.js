// api/v1/models/userModel.js
import { pool } from "../config/database.js";
import bcrypt from "bcrypt";
import winstonLogger from "../utils/logger.js";

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
		winstonLogger.info(user);

		if (!user) {
			throw new Error("User not found");
		}

		// check user password validity
		bcrypt.compare(password, user.password).then(function (err, result) {
			if (err) {
				throw new Error(err);
			} else if (result) {
				winstonLogger.info(result);
			}
		});

		return user; // Return the user after successful password validation
	} catch (error) {
		throw error;
	}
};

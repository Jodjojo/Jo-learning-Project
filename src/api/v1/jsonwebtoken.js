import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (userId) => {
	const secretKey = process.env.SECRET_KEY;
	return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

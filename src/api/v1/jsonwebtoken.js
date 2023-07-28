import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/constants";

export const generateToken = (userId) => {
	const secretKey = SECRET_KEY;
	return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
};

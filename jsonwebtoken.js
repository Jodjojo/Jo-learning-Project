import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config;

const secretKey = process.env.JWT_SECRET;

export const generateToken = (payload) => {
	return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

export const verifyToken = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({ error: "No token provided" });
	}

	try {
		const decoded = jwt.verify(token, secretKey);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		return res.status(403).json({ error: "Invalid token" });
	}
};

import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
	const token = req.headers["authorization"];
};

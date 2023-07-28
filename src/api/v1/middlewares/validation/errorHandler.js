import logger from "../../../../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
	// Default error status code and message
	let statusCode = 500;
	let message = "Internal Server Error";

	// Check if the error has a status code and message
	if (err.statusCode && err.message) {
		statusCode = err.statusCode;
		message = err.message;
	}

	// Log the error for debugging
	logger.error(err);

	// Send the error response
	res.status(statusCode).json({ error: message });
};

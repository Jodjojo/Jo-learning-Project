import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config(); // Load the environment variables from .env file

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

export default connection;

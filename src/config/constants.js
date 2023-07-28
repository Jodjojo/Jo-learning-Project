import dotenv from "dotenv";

dotenv.config();

const { DEV_DATABASE_URL, DATABASE_URL, DEBUG, PORT, SECRET_KEY } = process.env;

const NODE_ENV = process.env.NODE_ENV || "development";

export { NODE_ENV, DEV_DATABASE_URL, DATABASE_URL, DEBUG, PORT, SECRET_KEY };

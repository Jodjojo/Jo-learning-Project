import pg from "pg";
import logger from "../utils/logger.js";
import { DEV_DATABASE_URL, DATABASE_URL, NODE_ENV } from "./constants.js";

const { Pool } = pg;

const databaseConfig = {
	development: DEV_DATABASE_URL,
	production: DATABASE_URL,
};

logger.info(`ENVIRONMENT:: ${NODE_ENV}`);

const pool = new Pool({
	connectionString: databaseConfig[NODE_ENV],
});

pool.on("connect", () => {
	logger.info("CONNECTED TO DATABASE");
});

pool.on("error", (err) => {
	logger.error("ERROR:", err.stack);
	process.exit(-1);
});

export const dbConnection = {
	query: async (queryString) => {
		const client = await pool.connect();
		try {
			const res = await client.query(queryString);
			logger.info("DB RESPONSE:", res);
			return res;
		} finally {
			client.release();
		}
	},
};

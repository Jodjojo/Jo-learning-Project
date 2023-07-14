import { dbConnection } from "../../config/database.js";
import logger from "../../utils/logger.js";

/**
 * Put all SQL here and
 */
const query = `
    CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(40),
        lastname VARCHAR(40),
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        isActive BOOLEAN DEFAULT false,
        created_at TIMESTAMPTZ DEFAULT current_timestamp,
        updated_at TIMESTAMPTZ DEFAULT current_timestamp
    );
`;

const dbMigrate = async () => {
    await dbConnection.query(query);

    logger.info('migration complete');
  
    // exit the process successfully
    process.exit(0);
}

dbMigrate();
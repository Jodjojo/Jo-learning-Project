import { dbConnection } from "../../config/database.js";

/**
 * Put all SQL here and
 */
const query = `
    CREATE TABLE Users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        firstname VARCHAR(40),
        lastname VARCHAR(40),
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        isActive BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

const dbMigrate = async () => {
    await dbConnection.query(query);

    logger.info('migration complete');
  
    // exit the process successfully
    process.exit(0);
}

dbMigrate();
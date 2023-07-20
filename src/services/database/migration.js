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
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Products (
    id SERIAL PRIMARY KEY,
    sellerID INTEGER REFERENCES Users(id),
    description VARCHAR(200) NOT NULL,
    priceInDollars VARCHAR(12) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Companies (
    id SERIAL PRIMARY KEY,
    bio VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Admins (
    id SERIAL PRIMARY KEY,
    userID INTEGER REFERENCES Users(id),
    companyID INTEGER REFERENCES Companies(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ProductImages (
    id SERIAL PRIMARY KEY,
    url VARCHAR(200),
    productID INTEGER REFERENCES Products(id),
    userID INTEGER REFERENCES Users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Customers (
    userID INTEGER PRIMARY KEY REFERENCES Users(id),
    bio VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS DeliveryAddresses (
    id SERIAL PRIMARY KEY,
    customerID INTEGER REFERENCES Customers(userID),
    isDefault BOOLEAN DEFAULT false,
    fullAddress VARCHAR(200) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS CouponCodes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(10) UNIQUE,
    companyID INTEGER REFERENCES Companies(id),
    productID INTEGER REFERENCES Products(id),
    expiry VARCHAR(200),
    discountAmount VARCHAR(10),
    repeats INTEGER,
    discountPercentage INTEGER,
    minSessionPurchase VARCHAR(12),
    maxSessionPurchase VARCHAR(12),
    minLifetimePurchase VARCHAR(12),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Orders (
    id SERIAL PRIMARY KEY,
    customerID INTEGER REFERENCES Customers(userID),
    productID INTEGER REFERENCES Products(id),
    quantity INTEGER,
    variant VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const dbMigrate = async () => {
	await dbConnection.query(query);

	logger.info("migration complete");

	// exit the process successfully
	process.exit(0);
};

dbMigrate();

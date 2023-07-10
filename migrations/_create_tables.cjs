exports.up = async function (knex) {
	await knex.schema.dropTableIfExists("orders");
	await knex.schema.dropTableIfExists("couponCodes");
	await knex.schema.dropTableIfExists("deliveryAddresses");
	await knex.schema.dropTableIfExists("customers");
	await knex.schema.dropTableIfExists("productImages");
	await knex.schema.dropTableIfExists("admins");
	await knex.schema.dropTableIfExists("companies");
	await knex.schema.dropTableIfExists("products");
	await knex.schema.dropTableIfExists("users");

	// Create Users table
	await knex.schema.createTable("users", (table) => {
		table.increments("id").primary();
		table.string("firstName", 40);
		table.string("lastName", 40);
		table.string("email", 50).unique().notNullable();
		table.string("password", 50).notNullable();
		table.boolean("isActive").defaultTo(false);
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});

	// Create Products table
	await knex.schema.createTable("products", (table) => {
		table.increments("id").primary();
		table.integer("sellerID").references("id").inTable("users");
		table.string("description", 200).notNullable();
		table.string("priceInDollars", 12).notNullable();
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});

	// Create Companies table
	await knex.schema.createTable("companies", (table) => {
		table.increments("id").primary();
		table.string("bio", 200);
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});

	// Create Admins table
	await knex.schema.createTable("admins", (table) => {
		table.increments("id").primary();
		table.integer("userID").references("id").inTable("users");
		table.integer("companyID").references("id").inTable("companies");
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});

	// Create ProductImages table
	await knex.schema.createTable("productImages", (table) => {
		table.increments("id").primary();
		table.string("url", 200);
		table.integer("productID").references("id").inTable("products");
		table.integer("userID").references("id").inTable("users");
		table.timestamp("createdAt").defaultTo(knex.fn.now());
	});

	// Create Customers table
	await knex.schema.createTable("customers", (table) => {
		table.integer("userID").primary().references("id").inTable("users");
		table.string("bio", 200);
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});

	// Create DeliveryAddresses table
	await knex.schema.createTable("deliveryAddresses", (table) => {
		table.increments("id").primary();
		table.integer("customerID").references("userID").inTable("customers");
		table.boolean("isDefault").defaultTo(false);
		table.string("fullAddress", 200).notNullable();
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});

	// Create CouponCodes table
	await knex.schema.createTable("couponCodes", (table) => {
		table.increments("id").primary();
		table.string("code", 10).unique();
		table.string("companyID", 10);
		table.string("productID", 10);
		table.string("expiry");
		table.string("discountAmount", 10);
		table.integer("repeats");
		table.integer("discountPercentage");
		table.string("minSessionPurchase", 12);
		table.string("maxSessionPurchase", 12);
		table.string("minLifetimePurchase", 12);
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});

	// Create Orders table
	await knex.schema.createTable("orders", (table) => {
		table.increments("id").primary();
		table.integer("customerID").references("userID").inTable("customers");
		table.integer("productID").references("id").inTable("products");
		table.integer("quantity");
		table.string("variant", 200);
	});
};

exports.down = async function (knex) {
	// Drop tables in reverse order
	await knex.schema.dropTableIfExists("orders");
	await knex.schema.dropTableIfExists("couponCodes");
	await knex.schema.dropTableIfExists("deliveryAddresses");
	await knex.schema.dropTableIfExists("customers");
	await knex.schema.dropTableIfExists("productImages");
	await knex.schema.dropTableIfExists("admins");
	await knex.schema.dropTableIfExists("companies");
	await knex.schema.dropTableIfExists("products");
	await knex.schema.dropTableIfExists("users");
};

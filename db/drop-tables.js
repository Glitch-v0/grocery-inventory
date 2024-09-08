const { Client } = require("pg");
require("dotenv").config();

// SQL queries to drop tables
const dropTables = `
DROP TABLE IF EXISTS regional_prices;
DROP TABLE IF EXISTS item_categories;
DROP TABLE IF EXISTS warehouses;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;
`;

// Function to drop tables
const dropAllTables = async () => {
  console.log("Dropping tables...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    await client.connect();
    await client.query(dropTables);
    console.log("Tables dropped successfully.");
  } catch (error) {
    console.error("Error dropping tables:", error);
    await client.query("ROLLBACK");
  } finally {
    await client.end();
  }
};

// Run the function
dropAllTables().catch(error => {
  console.error("Unexpected error:", error);
  process.exit(1);
});

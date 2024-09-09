const { Client } = require("pg");
require("dotenv").config();

async function main() {
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    await client.connect();

    // Query the regional_prices table
    const res = await client.query(
      "SELECT * FROM regional_prices ORDER BY item_id, region_id",
    );

    // Generate the INSERT statement
    const insertStatements = res.rows
      .map((row) => `(${row.item_id}, ${row.region_id}, ${row.price})`)
      .join(",\n");

    const insertQuery = `INSERT INTO regional_prices (item_id, region_id, price) VALUES\n${insertStatements};`;

    // Print the generated INSERT statement
    console.log(insertQuery);
  } catch (err) {
    console.error("Error querying the database:", err);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});

const { Client } = require('pg');
require('dotenv').config();

async function main() {
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING,
    });

    try {
        await client.connect();

        // Query the item_categories table
        const res = await client.query('SELECT * FROM item_categories');

        // Generate the INSERT statement
        const insertStatements = res.rows.map(row => `(${row.item_id}, ${row.category_id})`).join(',\n');

        const insertQuery = `INSERT INTO item_categories (item_id, category_id) VALUES\n${insertStatements};`;

        // Print the generated INSERT statement
        console.log(insertQuery);

    } catch (err) {
        console.error('Error querying the database:', err);
    } finally {
        await client.end();
    }
}

main().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
});

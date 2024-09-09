const { Client } = require("pg");
const readline = require('readline');
require("dotenv").config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function getItems(client) {
  const res = await client.query('SELECT id, name FROM items ORDER BY id');
  return res.rows;
}

async function insertRegionalPrices(client, itemId, prices) {
  const query = `
    INSERT INTO regional_prices (item_id, region_id, price) VALUES
    ($1, 1, $2),  -- Southeastern
    ($1, 2, $3),  -- Southwestern (20% increase)
    ($1, 3, $4),  -- Northeastern (22% increase)
    ($1, 4, $5);  -- Northwestern (18% increase)
  `;
  await client.query(query, [itemId, prices.SE, prices.SW, prices.NE, prices.NW]);
}

async function main() {
  console.log("Assigning regional prices to items...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    await client.connect();
    const items = await getItems(client);

    for (const item of items) {
      await new Promise((resolve) => {
        rl.question(`Enter price for Southeastern region for "${item.name}": `, async (sePrice) => {
          const sePriceNum = parseFloat(sePrice);

          const prices = {
            SE: sePriceNum,
            SW: (sePriceNum * 1.20).toFixed(2),
            NE: (sePriceNum * 1.22).toFixed(2),
            NW: (sePriceNum * 1.18).toFixed(2),
          };

          await insertRegionalPrices(client, item.id, prices);
          console.log(`Assigned prices for "${item.name}" - SE: ${prices.SE}, SW: ${prices.SW}, NE: ${prices.NE}, NW: ${prices.NW}`);
          resolve();
        });
      });
    }

    console.log('All items have been assigned regional prices.');
  } catch (err) {
    console.error('Error running script:', err);
  } finally {
    await client.end();
    rl.close();
  }
}

main().catch(err => {
  console.error('Unexpected error:', err);
  process.exit(1);
});

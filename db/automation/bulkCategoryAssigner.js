const readline = require("readline");
const { Client } = require("pg");
require("dotenv").config();

async function getItems(client) {
  const res = await client.query("SELECT id, name FROM items ORDER BY id");
  return res.rows;
}

async function getCategories(client) {
  const res = await client.query("SELECT id, name FROM categories ORDER BY id");
  return res.rows;
}

async function insertItemCategory(client, itemId, categoryId) {
  await client.query(
    "INSERT INTO item_categories (item_id, category_id) VALUES ($1, $2)",
    [itemId, categoryId],
  );
}

async function promptUser(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log("Assigning categories to items...");
  const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
  });

  try {
    await client.connect();
    const items = await getItems(client);
    const categories = await getCategories(client);

    for (const item of items) {
      console.log(`Which category does "${item.name}" belong to?`);
      categories.forEach((category, index) => {
        console.log(`${index + 1}. ${category.name}`);
      });

      const answer = await promptUser(`Enter the number of the category: `);
      const selectedCategoryIndex = parseInt(answer) - 1;

      if (
        selectedCategoryIndex >= 0 &&
        selectedCategoryIndex < categories.length
      ) {
        const selectedCategoryId = categories[selectedCategoryIndex].id;
        await insertItemCategory(client, item.id, selectedCategoryId);
        console.log(
          `Assigned "${item.name}" to category "${categories[selectedCategoryIndex].name}"`,
        );
      } else {
        console.log(`Invalid selection for item "${item.name}".`);
      }
    }

    console.log("All items have been assigned categories.");
  } catch (err) {
    console.error("Error running script:", err);
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});

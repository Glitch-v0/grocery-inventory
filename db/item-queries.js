const pool = require("./pool");

async function addItem(name) {
  const { rows } = await pool.query(
    "INSERT INTO items (name) VALUES ($1) RETURNING *",
    [name],
  );
  return rows;
}

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM items ORDER BY name");
  return rows;
}

async function getItemByID(itemID) {
  const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [
    itemID,
  ]);
  return rows[0];
}

async function getItemDetails(itemID) {
  const query = `
    SELECT 
        items.id,
        items.name,
        categories.id,
        categories.name as category,
        regions.id,
        regions.name as region_name,
        regional_prices.price
    FROM 
        items
    LEFT JOIN 
        item_categories ON items.id = item_categories.item_id
    LEFT JOIN 
        categories ON item_categories.category_id = categories.id
    LEFT JOIN 
        regional_prices ON items.id = regional_prices.item_id
    LEFT JOIN 
        regions ON regional_prices.region_id = regions.id
    WHERE 
        items.id = $1;
`;

  const { rows } = await pool.query(query, [itemID]);
  return rows;
}

async function updateItem(name, itemID, categories, regionPrices) {
  await pool.query("UPDATE items SET name = $1 WHERE id = $2", [name, itemID]);
  for (const category of categories) {
    await pool.query(
      "INSERT INTO item_categories (item_id, category_id) VALUES ($1, $2)",
      [itemID, category],
    );
  }
  for (const price of regionPrices) {
    await pool.query(
      "INSERT INTO regional_prices (item_id, region_id, price) VALUES ($1, $2, $3)",
      [itemID, region, 0],
    );
  }
}

async function deleteItem(itemID) {
  await pool.query("DELETE FROM items WHERE id = $1", [itemID]);
}

module.exports = {
  addItem,
  getAllItems,
  getItemByID,
  getItemDetails,
  updateItem,
  deleteItem,
};

const pool = require("./pool");

async function removeItemCategories(item_id) {
  await pool.query(`DELETE FROM item_categories WHERE item_id = $1`, [item_id]);
}

async function createItemCategory(item_id, category_id) {
  await pool.query(
    "INSERT INTO item_categories (item_id, category_id) VALUES ($1, $2)",
    [item_id, category_id],
  );
}

async function updatePrice(price, item_id, region_id) {
  await pool.query(
    `UPDATE regional_prices SET price = $1 WHERE item_id = $2 AND region_id = $3`,
    [price, item_id, region_id],
  );
}

module.exports = {
  createItemCategory,
  removeItemCategories,
  updatePrice,
};

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

async function deletePrice(item_id, region_id) {
  await pool.query(
    `DELETE FROM regional_prices WHERE item_id = $1 AND region_id = $2`,
    [item_id, region_id],
  );
}

async function createPrice(price, item_id, region_id) {
  await pool.query(
    `INSERT INTO regional_prices (price, item_id, region_id) VALUES ($1, $2, $3)`,
    [price, item_id, region_id],
  );
}

module.exports = {
  createItemCategory,
  removeItemCategories,
  deletePrice,
  createPrice,
};

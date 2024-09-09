const pool = require("./pool");

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY name");
  return rows;
}

async function getCategoriesByItemID(itemID) {
  const query = `
    SELECT name, id
    FROM categories
    JOIN item_categories ON categories.id = item_categories.category_id
    WHERE item_categories.item_id = $1;
    `;
  const { rows } = await pool.query(query, [itemID]);
  return rows;
}

async function addCategory(name) {
  const { rows } = await pool.query(
    "INSERT INTO categories (name) VALUES ($1) RETURNING *",
    [name],
  );
  return rows;
}

async function updateCategory(name, id) {
  await pool.query("UPDATE categories SET name = $1 WHERE id = $2", [name, id]);
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

module.exports = {
  addCategory,
  getCategories,
  getCategoriesByItemID,
  updateCategory,
  deleteCategory,
};

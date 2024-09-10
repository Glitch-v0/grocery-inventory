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
        items.id as item_id,
        items.name,
        regions.id as region_id,
        regions.name as region_name,
        regional_prices.price
    FROM 
        items
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

async function updateItemName(name, itemID) {
  const { rows } = await pool.query(
    "UPDATE items SET name = $1 WHERE id = $2",
    [name, itemID],
  );
  return rows;
}

async function deleteItem(itemID) {
  const { rows } = await pool.query("DELETE FROM items WHERE id = $1", [
    itemID,
  ]);
  return rows;
}

module.exports = {
  addItem,
  getAllItems,
  getItemByID,
  getItemDetails,
  updateItemName,
  deleteItem,
};

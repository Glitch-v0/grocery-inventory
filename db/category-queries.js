const pool = require("./pool")

async function getCategories() {
    const { rows } = await pool.query("SELECT * FROM categories ORDER BY name");
    return rows
}

async function getCategoriesByItemID(itemID) {
    const query = `
    SELECT name, id
    FROM categories
    JOIN item_categories ON categories.id = item_categories.category_id
    WHERE item_categories.item_id = $1;
    `;
    const { rows } = await pool.query(query, [itemID]);
    return rows
}

module.exports = {
    getCategories,
    getCategoriesByItemID
}
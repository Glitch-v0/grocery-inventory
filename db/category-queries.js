const pool = require("./pool")

async function getCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows
}

module.exports = {
    getCategories
}
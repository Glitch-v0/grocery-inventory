const pool = require("./pool")

async function getList() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

async function getItemByID(itemID){
    const { rows } = await pool.query("SELECT * FROM items WHERE id = $1", [itemID]);
    return rows[0];
}

module.exports = {
    getList,
    getItemByID
}
const pool = require("./pool");

async function getRegions() {
    const { rows } = await pool.query("SELECT * FROM regions");
    return rows;
}

module.exports = {
    getRegions
}
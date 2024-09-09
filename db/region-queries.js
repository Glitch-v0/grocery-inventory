const pool = require("./pool");

async function getRegions() {
  const { rows } = await pool.query("SELECT * FROM regions");
  return rows;
}

async function updateRegion(name, id) {
  await pool.query("UPDATE regions SET name = $1 WHERE id = $2", [name, id]);
}

async function addRegion(name) {
  await pool.query("INSERT INTO regions (name) VALUES ($1)", [name]);
}

async function deleteRegion(id) {
  await pool.query("DELETE FROM regions WHERE id = $1", [id]);
}

module.exports = {
  addRegion,
  getRegions,
  updateRegion,
  deleteRegion,
};

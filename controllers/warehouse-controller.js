const express = require("express");
const router = express.Router();
const db = require("../db/warehouse-queries");

async function getWarehouses (req, res) {
    const warehouseList = await db.getWarehouses();
    res.render("warehouse", {warehouses: warehouseList});
}

module.exports = {
    getWarehouses
}
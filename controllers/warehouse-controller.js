const express = require("express");
const router = express.Router();
const db = require("../db/warehouse-queries");
const stringsMethods = require('../utils/stringMethods');

async function getWarehouses (req, res) {
    const warehouseList = await db.getWarehouses();
    res.render("warehouse", {warehouses: warehouseList, error: null});
}

async function updateWarehouse(req, res) {
    let newName = req.body.newName;
    console.log(newName)
    newName = stringsMethods.removeNonAlphanumericAndAmpersand(newName)
    newName = stringsMethods.toTitleCase(newName)
    const categoryID = parseInt(req.params.id);
    try {
        await db.updateWarehouse(newName, categoryID);
        res.redirect("/warehouses");
    } catch {
        const warehouseList = await db.getWarehouses();
        res.render("warehouse", {warehouses: warehouseList, error: err});
    }
    console.log(categoryID)
}

module.exports = {
    getWarehouses,
    updateWarehouse
}
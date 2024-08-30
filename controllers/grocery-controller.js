//set up controller
const express = require("express");
const router = express.Router();
const db = require("../db/queries");

async function getGroceryList (req, res) {
    const groceryList = await db.getList();
    res.render("index", {groceryItems: groceryList});
}

async function getGroceryItem (req, res) {
    const itemID = req.params.id;
    const groceryItem = await db.getItem(itemID); // returns 4 rows
    console.log(groceryItem)
    res.render("grocery-item", {itemStats: groceryItem});
}

module.exports = {
    getGroceryList,
    getGroceryItem
}
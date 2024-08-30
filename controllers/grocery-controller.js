//set up controller
const express = require("express");
const router = express.Router();
const db = require("../db/queries");

async function getGroceryList (req, res) {
    const groceryList = await db.getList();
    res.render("index", {groceryItems: groceryList});
}

async function getGroceryItem (req, res) {
    const itemID = parseInt(req.params.id);
    console.log("Received ID:", req.params.id);
    if (!itemID) {
        return res.render("error", {errorCode: 404, errorMessage: "Invalid Page"});
    }
    const groceryItem = await db.getItem(itemID); // returns 4 rows
    if (groceryItem.length === 0) {
        // Handle the case where no rows are found
        res.render("error", {errorCode: 404, errorMessage: "Item not found"});
      }
    res.render("grocery-item", {itemStats: groceryItem});
}

async function getCategory (req, res) {
    const categoryList = await db.getCategory();
    res.render("category", {itemCategories: categoryList});
}

module.exports = {
    getGroceryList,
    getGroceryItem,
    getCategory
}
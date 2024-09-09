const express = require("express");
const router = express.Router();
const itemDB = require("../db/item-queries");
const categoryDB = require("../db/category-queries.js");

async function getGroceryList (req, res) {
    const groceryList = await itemDB.getList();
    res.render("items", {groceryItems: groceryList, error: null});
}

async function getGroceryItem (req, res) {
    const itemID = parseInt(req.params.id);
    if (!itemID) {
        return res.render("error", {errorCode: 404, errorMessage: "Invalid Page"});
    }
    const groceryItem = await itemDB.getItemByID(itemID); // returns 4 rows
    const categoryList = await categoryDB.getCategories();
    if (groceryItem.length === 0) {
        // Handle the case where no rows are found
        res.render("error", {errorCode: 404, errorMessage: "Item not found"});
      }
    res.render("grocery-item", {itemStats: groceryItem, categories: categoryList});
}

async function updateGroceryItem (req, res) {
    const itemID = parseInt(req.params.id);
    if (!itemID) {
        return res.render("error", {errorCode: 404, errorMessage: "Invalid Page"});
    }
    const groceryItem = await itemDB.getItemByID(itemID); // returns 4 rows
    if (groceryItem.length === 0) {
        // Handle the case where no rows are found
        res.render("error", {errorCode: 404, errorMessage: "Item not found"});
      }
    res.render("grocery-item", {itemStats: groceryItem, error: null});
}

module.exports ={
    getGroceryList,
    getGroceryItem,
    updateGroceryItem
}
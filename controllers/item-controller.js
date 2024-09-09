const express = require("express");
const router = express.Router();
const itemDB = require("../db/item-queries");
const categoryDB = require("../db/category-queries.js");

async function getItems (req, res) {
    const groceryList = await itemDB.getList();
    res.render("items", {groceryItems: groceryList, error: null});
}

async function getItemDetails (req, res) {
    const itemID = parseInt(req.params.id);
    if (!itemID) {
        return res.render("error", {errorCode: 404, errorMessage: "Invalid Page"});
    }
    const itemDetails = await itemDB.getItemDetails(itemID); // returns 4 rows
    const itemCategories = await categoryDB.getCategoriesByItemID(itemID);
    const categoryList = await categoryDB.getCategories();
    console.log({itemDetails})
    console.log(itemCategories)
    if (itemDetails.length === 0) {
        // Handle the case where no rows are found
        res.render("error", {errorCode: 404, errorMessage: "Item not found"});
      }
    res.render("item-details", {itemStats: itemDetails, categories: categoryList, itemCategories: itemCategories, error: null});
}

async function updateItem (req, res) {
    const itemID = parseInt(req.params.id);
    if (!itemID) {
        return res.render("error", {errorCode: 404, errorMessage: "Invalid Page"});
    }
    const groceryItem = await itemDB.getItemByID(itemID); // returns 4 rows
    if (groceryItem.length === 0) {
        // Handle the case where no rows are found
        res.render("error", {errorCode: 404, errorMessage: "Item not found"});
      }
    res.render("item-details", {itemStats: groceryItem, error: null});
}

module.exports ={
    getItems,
    getItemDetails,
    updateItem
}
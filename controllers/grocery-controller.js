//set up controller
const express = require("express");
const router = express.Router();
const db = require("../db/queries");

async function getGroceryList (req, res) {
    const groceryList = await db.getItems();
    res.render("index", {groceryItems: groceryList});
}

async function viewGroceryItem (req, res) {
    const groceryItem = await db.getItem();
    res.render("index", {groceryItems: groceryList});
}

module.exports = {
    getGroceryList
}
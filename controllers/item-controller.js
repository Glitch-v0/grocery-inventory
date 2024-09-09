const express = require("express");
const router = express.Router();
const itemDB = require("../db/item-queries");
const categoryDB = require("../db/category-queries.js");
const regionDB = require("../db/region-queries");

async function addItem(req, res) {
  const itemName = req.body.newItem;
  const addedItem = await itemDB.addItem(itemName);
  console.log(addedItem[0].id);
  const currentItemList = await itemDB.getAllItems();
  res.redirect(`items/${addedItem[0].id}`);
}

async function getItems(req, res) {
  const groceryList = await itemDB.getAllItems();
  res.render("items", { itemList: groceryList, error: null });
}

async function getItemDetails(req, res) {
  const itemID = parseInt(req.params.id);
  if (!itemID) {
    return res.render("error", {
      errorCode: 404,
      errorMessage: "Invalid Page",
    });
  }
  const itemDetails = await itemDB.getItemDetails(itemID); // returns all details of item for each region
  // console.log({ itemDetails });
  const itemCategories = await categoryDB.getCategoriesByItemID(itemID); // to determine how many categories to display
  // console.log({ itemCategories });
  const categoryList = await categoryDB.getCategories(); // to show different options to select
  const regionList = await regionDB.getRegions(); // to show all region options for pricing
  // console.log({ regionList });
  if (itemDetails.length === 0) {
    // Handle the case where no rows are found
    res.render("error", { errorCode: 404, errorMessage: "Item not found" });
  }
  res.render("item-details", {
    id: itemID,
    itemStats: itemDetails,
    categories: categoryList,
    itemCategories: itemCategories,
    regions: regionList,
    error: null,
  });
}

async function updateItem(req, res) {
  console.log(req.body);
  const itemID = parseInt(req.params.id);
  if (!itemID) {
    return res.render("error", {
      errorCode: 404,
      errorMessage: "Invalid Page",
    });
  }
  res.redirect("/items");
}

async function deleteItem(req, res) {
  const itemID = parseInt(req.params.id);
  if (!itemID) {
    return res.render("error", {
      errorCode: 404,
      errorMessage: "Invalid Page",
    });
  }
  const deletedItem = await itemDB.deleteItem(itemID);
  const currentItemList = await itemDB.getAllItems();
  res.render("items", { itemList: currentItemList, error: null });
}

module.exports = {
  addItem,
  getItems,
  getItemDetails,
  updateItem,
  deleteItem,
};
